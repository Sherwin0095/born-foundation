// Automated Regression, Security & Safeguarding Verification Suite
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: buffer.toString("utf-8"),
          buffer,
        });
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log("=========================================================");
  console.log("BORN FOUNDATION — REGRESSION, SECURITY & SAFEGUARDING SUITE");
  console.log("=========================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName}${details ? ` (${details})` : ""}`);
      failed++;
    }
  }

  // 1. Design System & CSS Safeguards
  console.log("--- 1. Design System & CSS Regression Checks ---");
  const globalsCss = fs.readFileSync(
    path.resolve(process.cwd(), "src/app/globals.css"),
    "utf-8"
  );
  assert(
    globalsCss.includes("--color-forest-green: #285746"),
    "Design tokens define forest-green (#285746)"
  );
  assert(
    globalsCss.includes("--color-warm-gold-light: #E5CD96"),
    "Accessible light gold accent token defined for dark surfaces"
  );
  assert(
    globalsCss.includes("color: inherit;") && globalsCss.includes("@layer base"),
    "Headings wrapped in @layer base with color: inherit"
  );
  assert(
    globalsCss.includes(".page-container"),
    "Shared .page-container layout primitive defined"
  );
  assert(
    globalsCss.includes("prefers-reduced-motion"),
    "Reduced-motion accessibility rule included"
  );

  // 2. Public Routes & Anti-Fabrication Content Audit
  console.log("\n--- 2. Public Routes, Security Headers & Anti-Fabrication Checks ---");
  const publicRoutes = [
    { path: "/", title: "Every Child Deserves a", securityCheck: true },
    { path: "/about", title: "About BORN FOUNDATION" },
    { path: "/programmes", title: "Our Programmes" },
    { path: "/programmes/education-learning-support", title: "Education &amp; Learning Support" },
    { path: "/programmes/women-community-development", title: "Women &amp; Community Development" },
    { path: "/gallery", title: "Community Photo Gallery" },
    { path: "/impact", title: "Impact &amp; Transparency" },
    { path: "/get-involved", title: "Get Involved" },
    { path: "/support", title: "Support Our Work" },
    { path: "/stories", title: "Stories &amp; Updates" },
    { path: "/contact", title: "Contact Us" },
    { path: "/faq", title: "Frequently Asked Questions" },
    { path: "/safeguarding", title: "Child Safeguarding Policy" },
    { path: "/privacy", title: "Privacy Policy" },
    { path: "/terms", title: "Terms of Use" },
    { path: "/accessibility", title: "Accessibility Statement" },
    { path: "/login", title: "Staff Administration" },
    { path: "/access-denied", title: "Access Denied" },
    { path: "/sitemap.xml", title: "<urlset" },
    { path: "/robots.txt", title: "Disallow: /admin" },
  ];

  for (const route of publicRoutes) {
    try {
      const res = await fetchUrl(`${BASE_URL}${route.path}`);
      assert(res.status === 200, `Route ${route.path} returns HTTP 200`, `got ${res.status}`);
      assert(
        res.body.includes(route.title),
        `Route ${route.path} renders expected marker "${route.title}"`
      );
      if (!route.path.startsWith("/login") && !route.path.endsWith(".xml") && !route.path.endsWith(".txt")) {
        assert(
          !res.body.includes("info@bornfoundation.org"),
          `Route ${route.path} does not leak fabricated info@ email`
        );
        assert(
          !res.body.includes("safeguarding@bornfoundation.org"),
          `Route ${route.path} does not leak fabricated safeguarding@ email`
        );
      }
      if (route.securityCheck) {
        assert(
          res.headers["x-frame-options"] === "DENY",
          "Security header X-Frame-Options: DENY present"
        );
        assert(
          res.headers["x-content-type-options"] === "nosniff",
          "Security header X-Content-Type-Options: nosniff present"
        );
        assert(
          Boolean(res.headers["content-security-policy"]),
          "Security header Content-Security-Policy present"
        );
      }
    } catch (err) {
      assert(false, `Route ${route.path} reachable`, err.message);
    }
  }

  // Verify click-to-call telephone present on contact page
  const contactRes = await fetchUrl(`${BASE_URL}/contact`);
  assert(
    contactRes.body.includes("tel:+919986495292"),
    "Contact page provides click-to-call link for +91 99864 95292"
  );

  // 3. Sanitised Media Derivatives & Private Isolation Checks
  console.log("\n--- 3. Approved Gallery Assets & EXIF/Private Archive Checks ---");
  const galleryFiles = [
    "/images/gallery/womens-community-circle-1200.webp",
    "/images/gallery/learning-kits-facilitators-1200.webp",
    "/images/gallery/community-flag-ceremony-1200.webp",
  ];
  for (const imgPath of galleryFiles) {
    const res = await fetchUrl(`${BASE_URL}${imgPath}`);
    assert(res.status === 200, `Approved asset ${imgPath} serves HTTP 200`);
    assert(
      res.headers["content-type"]?.includes("image/webp"),
      `Approved asset ${imgPath} serves image/webp`
    );
    const meta = await sharp(res.buffer).metadata();
    assert(!meta.exif && !meta.iptc && !meta.xmp, `Asset ${imgPath} contains zero EXIF/GPS/XMP metadata`);
  }

  // Unauthenticated access to private inventory MUST return 401
  const privRes = await fetchUrl(`${BASE_URL}/api/admin/media-inventory`);
  assert(
    privRes.status === 401,
    "Unauthenticated GET /api/admin/media-inventory rejected with HTTP 401",
    `got ${privRes.status}`
  );

  // 4. Form Validation & Safeguarding Input Checks
  console.log("\n--- 4. API Validation, Spam Honeypot & Consent Checks ---");
  const badContact = await fetchUrl(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert(badContact.status === 400, "Contact API rejects empty payload with 400");

  const goodContact = await fetchUrl(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Automated Verification",
      email: "verify@example.org",
      subject: "General Enquiry",
      message: "Running automated regression verification for contact API.",
    }),
  });
  assert(goodContact.status === 201, "Contact API accepts valid enquiry with 201");

  const unconsentedVolunteer = await fetchUrl(`${BASE_URL}/api/volunteer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Volunteer Candidate",
      email: "vol@example.org",
      areaOfInterest: "Education & Learning Support",
      safeguardingAcknowledged: false,
    }),
  });
  assert(
    unconsentedVolunteer.status === 400,
    "Volunteer API rejects submission without safeguarding acknowledgement (400)"
  );

  const validVolunteer = await fetchUrl(`${BASE_URL}/api/volunteer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Volunteer Candidate",
      email: "vol@example.org",
      areaOfInterest: "Education & Learning Support",
      safeguardingAcknowledged: true,
    }),
  });
  assert(validVolunteer.status === 201, "Volunteer API accepts screened expression of interest (201)");

  console.log("\n=========================================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("=========================================================");

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
