/**
 * Headless Chromium Responsive Verification & Visual Baseline Harness
 * Uses installed Edge/Chrome via Chrome DevTools Protocol (zero extra dependencies)
 * to inspect DOM telemetry, layout overflow, image integrity, console errors,
 * keyboard/mobile navigation, gallery lightbox, and capture visual baselines
 * across viewports 320px to 1920px.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const SHOT_DIR = path.resolve(process.cwd(), "tests/visual-baselines");

function findBrowser() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  return candidates.find((p) => fs.existsSync(p));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
    this.events = [];
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    };
  }
  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browserPath = findBrowser();
  if (!browserPath) {
    console.error("Chrome/Edge binary not found on host.");
    process.exit(1);
  }

  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const profileDir = path.resolve(process.cwd(), ".private/cdp-profile");
  fs.mkdirSync(profileDir, { recursive: true });

  const port = 9229;
  const proc = spawn(
    browserPath,
    [
      `--remote-debugging-port=${port}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profileDir}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let client;
  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const pages = await res.json();
        const page = pages.find((p) => p.type === "page");
        if (page) {
          wsUrl = page.webSocketDebuggerUrl;
          break;
        }
      } catch {
        await sleep(250);
      }
    }
    if (!wsUrl) throw new Error("Timed out connecting to DevTools WebSocket");

    client = new CDPClient(wsUrl);
    await client.connect();
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Performance.enable");
    await client.send("Accessibility.enable");

    const consoleErrors = [];
    const routesToCheck = [
      "/",
      "/about",
      "/programmes",
      "/gallery",
      "/impact",
      "/get-involved",
      "/support",
      "/stories",
      "/contact",
      "/faq",
      "/safeguarding",
    ];
    const viewports = [
      { width: 320, height: 700, name: "320" },
      { width: 360, height: 760, name: "360" },
      { width: 390, height: 844, name: "390" },
      { width: 768, height: 1024, name: "768" },
      { width: 1024, height: 768, name: "1024" },
      { width: 1280, height: 800, name: "1280" },
      { width: 1440, height: 900, name: "1440" },
      { width: 1920, height: 1080, name: "1920" },
    ];

    const report = {
      checkedAt: new Date().toISOString(),
      overflowFailures: [],
      brokenImages: [],
      consoleErrors: [],
      routeMetrics: [],
      interactions: {},
    };

    // 1. Check all routes across desktop (1280) & mobile (390) + homepage across all 8 viewports
    for (const vp of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });

      const targets =
        vp.width === 1280 || vp.width === 390 ? routesToCheck : ["/"];

      for (const route of targets) {
        client.events = [];
        await client.send("Page.navigate", { url: `${BASE_URL}${route}` });
        await sleep(700);

        // Scroll sequentially with instant behavior so lazy images intersect and decode cleanly
        await client.send("Runtime.evaluate", {
          awaitPromise: true,
          expression: `(async () => {
            const imgs = Array.from(document.querySelectorAll("img"));
            for (const img of imgs) {
              img.scrollIntoView({ behavior: "instant", block: "center" });
              await new Promise(r => setTimeout(r, 150));
            }
            window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
            await new Promise(r => setTimeout(r, 150));
            window.scrollTo({ top: 0, behavior: "instant" });
            await Promise.all(imgs.map(img => img.complete && img.naturalWidth > 0 ? Promise.resolve() : new Promise(res => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
              setTimeout(res, 3000);
            })));
            await new Promise(r => setTimeout(r, 150));
          })()`,
        });

        const evalRes = await client.send("Runtime.evaluate", {
          returnByValue: true,
          expression: `(() => {
            const imgs = Array.from(document.querySelectorAll("img"));
            const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
            const docEl = document.documentElement;
            const overflow = docEl.scrollWidth > window.innerWidth;
            const h1 = document.querySelector("h1");
            const h1Color = h1 ? getComputedStyle(h1).color : null;
            return {
              scrollWidth: docEl.scrollWidth,
              innerWidth: window.innerWidth,
              overflow,
              imgCount: imgs.length,
              brokenImgs,
              h1Text: h1?.textContent?.trim() || "",
              h1Color,
            };
          })()`,
        });

        const metrics = evalRes.result.value;
        if (metrics.overflow) {
          report.overflowFailures.push({ route, viewport: vp.width, ...metrics });
        }
        if (metrics.brokenImgs.length > 0) {
          report.brokenImages.push({ route, viewport: vp.width, broken: metrics.brokenImgs });
        }

        const pageErrs = client.events.filter(
          (e) =>
            e.method === "Runtime.exceptionThrown" ||
            (e.method === "Runtime.consoleAPICalled" && e.params.type === "error")
        );
        if (pageErrs.length > 0) {
          consoleErrors.push({ route, viewport: vp.width, count: pageErrs.length });
        }

        report.routeMetrics.push({ route, viewport: vp.width, ...metrics });

        // Capture visual screenshots on key combinations
        if (
          (route === "/" && ["320", "390", "768", "1024", "1280", "1440"].includes(vp.name)) ||
          (["/about", "/programmes", "/gallery", "/get-involved", "/contact"].includes(route) &&
            ["390", "1280"].includes(vp.name))
        ) {
          const shot = await client.send("Page.captureScreenshot", { format: "png" });
          const safeName = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
          fs.writeFileSync(
            path.join(SHOT_DIR, `${safeName}-${vp.name}.png`),
            Buffer.from(shot.data, "base64")
          );
        }
      }
    }

    // 2. Interactive Journey Tests (Mobile Menu, Gallery Lightbox, Contact Validation)
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await client.send("Page.navigate", { url: `${BASE_URL}/` });
    await sleep(600);
    await client.send("Runtime.evaluate", {
      expression: `document.querySelector('button[aria-controls="mobile-navigation"]')?.click()`,
    });
    await sleep(300);
    const mobileMenuOpen = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `Boolean(document.getElementById("mobile-navigation"))`,
    });
    const mobileMenuShot = await client.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(SHOT_DIR, "mobile-drawer-390.png"),
      Buffer.from(mobileMenuShot.data, "base64")
    );
    report.interactions.mobileMenuOpens = mobileMenuOpen.result.value;

    // Gallery grid & lightbox test on 1280
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await client.send("Page.navigate", { url: `${BASE_URL}/gallery` });
    await sleep(600);
    await client.send("Runtime.evaluate", {
      expression: `window.scrollTo({ top: 380, behavior: "instant" })`,
    });
    await sleep(300);
    const galleryMidShot = await client.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(SHOT_DIR, "gallery-grid-1280.png"),
      Buffer.from(galleryMidShot.data, "base64")
    );
    await client.send("Runtime.evaluate", {
      expression: `document.querySelector('button[aria-label*="Open larger view"]')?.click()`,
    });
    await sleep(300);
    const lightboxOpen = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `Boolean(document.querySelector('[role="dialog"][aria-modal="true"]'))`,
    });
    const lightboxShot = await client.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(SHOT_DIR, "gallery-lightbox-1280.png"),
      Buffer.from(lightboxShot.data, "base64")
    );
    report.interactions.galleryLightboxOpens = lightboxOpen.result.value;

    // Contact form validation + submit test
    await client.send("Page.navigate", { url: `${BASE_URL}/contact` });
    await sleep(600);
    await client.send("Runtime.evaluate", {
      expression: `document.querySelector('form button[type="submit"]')?.click()`,
    });
    await sleep(200);
    const formValidationShown = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `document.querySelectorAll('[role="alert"]').length >= 2`,
    });
    report.interactions.contactValidationRejectsEmpty = formValidationShown.result.value;

    // Performance & Accessibility tree check on Home (1280)
    await client.send("Page.navigate", { url: `${BASE_URL}/` });
    await sleep(600);
    const perfRes = await client.send("Performance.getMetrics");
    const metricMap = Object.fromEntries(perfRes.metrics.map((m) => [m.name, m.value]));
    const a11yChecks = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const imgsMissingAlt = Array.from(document.querySelectorAll("img")).filter(i => !i.hasAttribute("alt") || i.getAttribute("alt").trim() === "").length;
        const buttonsMissingLabel = Array.from(document.querySelectorAll("button")).filter(b => !b.textContent.trim() && !b.getAttribute("aria-label")).length;
        const hasMainLandmark = Boolean(document.querySelector("main#main-content"));
        const hasSkipLink = Boolean(document.querySelector("a.skip-to-content"));
        return { imgsMissingAlt, buttonsMissingLabel, hasMainLandmark, hasSkipLink };
      })()`,
    });
    report.performanceMetrics = {
      DOMContentLoaded: metricMap.DomContentLoaded,
      FirstMeaningfulPaint: metricMap.FirstMeaningfulPaint,
      LayoutDuration: metricMap.LayoutDuration,
      JSHeapUsedMB: metricMap.JSHeapUsedSize ? Math.round((metricMap.JSHeapUsedSize / (1024 * 1024)) * 100) / 100 : null,
    };
    report.accessibilityChecks = a11yChecks.result.value;

    report.consoleErrors = consoleErrors;
    fs.writeFileSync(
      path.join(SHOT_DIR, "browser-verification-report.json"),
      JSON.stringify(report, null, 2)
    );

    console.log("Browser Verification Summary:");
    console.log(" - Checked routes/viewports:", report.routeMetrics.length);
    console.log(" - Horizontal overflow failures:", report.overflowFailures.length);
    console.log(" - Broken images:", report.brokenImages.length);
    console.log(" - Console errors:", report.consoleErrors.length);
    console.log(" - Mobile menu opens:", report.interactions.mobileMenuOpens);
    console.log(" - Gallery lightbox opens:", report.interactions.galleryLightboxOpens);
    console.log(" - Contact validation works:", report.interactions.contactValidationRejectsEmpty);

    if (
      report.overflowFailures.length > 0 ||
      report.brokenImages.length > 0 ||
      !report.interactions.mobileMenuOpens ||
      !report.interactions.galleryLightboxOpens ||
      !report.interactions.contactValidationRejectsEmpty
    ) {
      console.error("Browser verification detected failures! Inspect browser-verification-report.json.");
      process.exit(1);
    }
  } finally {
    client?.close();
    proc.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
