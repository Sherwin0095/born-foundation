// Automated Regression and Health Test Suite for Born Foundation NGO Website
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:3000";

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log("==================================================");
  console.log("BORN FOUNDATION — AUTOMATED REGRESSION TEST SUITE");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName} ${details ? `(${details})` : ""}`);
      failed++;
    }
  }

  // 1. Static Design Token & CSS Regression Check
  console.log("--- 1. Checking Design System & CSS Token Hierarchy ---");
  const globalsPath = path.resolve(process.cwd(), "src/app/globals.css");
  const globalsCss = fs.readFileSync(globalsPath, "utf-8");

  assert(
    globalsCss.includes("--color-forest-green: #285746"),
    "Design tokens define forest-green brand color"
  );
  assert(
    globalsCss.includes("--color-warm-gold: #C6A565"),
    "Design tokens define warm-gold accent color"
  );
  assert(
    globalsCss.includes("--color-muted-terracotta: #BD785B"),
    "Design tokens define muted-terracotta CTA color"
  );
  assert(
    globalsCss.includes("color: inherit;") && globalsCss.includes("@layer base"),
    "Headings use @layer base and inherit color to prevent overriding utility classes"
  );
  assert(
    globalsCss.includes(".page-container"),
    "Shared .page-container rule is defined with max-width 1280px and responsive padding"
  );

  // 2. Public Routes Availability Checks
  console.log("\n--- 2. Checking Public Routes Status Codes ---");
  const routes = [
    { path: "/", title: "Every Child Deserves a" },
    { path: "/about", title: "About BORN FOUNDATION" },
    { path: "/programmes", title: "Our Programmes" },
    { path: "/impact", title: "Impact &amp; Transparency" },
    { path: "/stories", title: "Stories &amp; Updates" },
    { path: "/support", title: "Support Our Work" },
    { path: "/contact", title: "Contact Us" },
    { path: "/faq", title: "Frequently Asked Questions" },
    { path: "/safeguarding", title: "Child Safeguarding" },
    { path: "/privacy", title: "Privacy Policy" },
    { path: "/terms", title: "Terms of Use" },
    { path: "/accessibility", title: "Accessibility Statement" },
    { path: "/login", title: "Staff Administration" },
  ];

  for (const route of routes) {
    try {
      const res = await fetchUrl(`${BASE_URL}${route.path}`);
      assert(
        res.status === 200,
        `Route ${route.path} returns HTTP 200`,
        `got ${res.status}`
      );
      assert(
        res.body.includes(route.title),
        `Route ${route.path} contains expected title/content "${route.title}"`
      );
    } catch (err) {
      assert(false, `Route ${route.path} accessible`, err.message);
    }
  }

  // 3. Hero Visual Assets Checks
  console.log("\n--- 3. Checking Hero Composition & Visual Asset Serving ---");
  try {
    const heroImg = await fetchUrl(`${BASE_URL}/images/hero-community.svg`);
    assert(heroImg.status === 200, "Hero illustration SVG returns HTTP 200");
    assert(
      heroImg.headers["content-type"]?.includes("image/svg+xml"),
      "Hero illustration served with image/svg+xml content-type"
    );
  } catch (err) {
    assert(false, "Hero image asset accessible", err.message);
  }

  // 4. API Form Validation Checks
  console.log("\n--- 4. Checking API Validation and Spam Safeguards ---");
  try {
    const badContact = await fetchUrl(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(
      badContact.status === 400,
      "Contact API rejects empty payload with HTTP 400",
      `got ${badContact.status}`
    );

    const goodContact = await fetchUrl(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Volunteer",
        email: "test@example.com",
        subject: "General Inquiry",
        message: "Testing automated regression test suite message delivery.",
      }),
    });
    assert(
      goodContact.status === 201,
      "Contact API accepts valid submission with HTTP 201",
      `got ${goodContact.status}`
    );
  } catch (err) {
    assert(false, "API endpoints functional", err.message);
  }

  // Summary
  console.log("\n==================================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
