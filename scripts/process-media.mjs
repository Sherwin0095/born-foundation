/**
 * BORN FOUNDATION — Media Processing & Child Safeguarding Pipeline
 *
 * Responsibilities:
 * 1. Reads original photographs exclusively from private staging (.private/source-archive).
 * 2. Generates EXIF/metadata-stripped WebP private review previews in .private/media-previews
 *    for ALL source images (never exposed to public/ or Git).
 * 3. Inspects EXIF/GPS metadata removal and records dimensions, SHA-256 hashes, and safeguarding review flags.
 * 4. Produces approved, non-identifying, EXIF-stripped responsive public derivatives
 *    (800w and 1200w WebP + fallback JPEG) in public/images/gallery/ ONLY for assets cleared
 *    without exposing identifiable minors.
 * 5. Writes the private asset inventory (.private/media-inventory.json).
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, ".private", "source-archive");
const PREVIEW_DIR = path.join(ROOT, ".private", "media-previews");
const PUBLIC_GALLERY_DIR = path.join(ROOT, "public", "images", "gallery");
const INVENTORY_PATH = path.join(ROOT, ".private", "media-inventory.json");

const SOURCE_INVENTORY = [
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.34 PM (1).jpeg",
    id: "bf-media-01",
    slug: "classroom-meal-sharing",
    category: "nutrition",
    categoryLabel: "Nutrition & Wellbeing",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Shared Meal Gathering in Community Hall",
    altText: "Children seated in a painted community room sharing a meal on steel plates.",
    caption: "Community nutrition session held in an indoor centre room.",
    reviewNote: "Multiple identifiable children visible frontally; requires verified parental/guardian publication consent before public release.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.34 PM.jpeg",
    id: "bf-media-02",
    slug: "flag-hoisting-celebration",
    category: "cultural",
    categoryLabel: "Cultural & Recreational",
    hasIdentifiableChildren: true,
    safeguardingRisk: "medium",
    publicApproved: true,
    publicCropSlug: "community-flag-ceremony",
    publicTransform: {
      extract: { left: 100, top: 150, width: 1100, height: 745 },
      blurs: [],
    },
    title: "Courtyard Flag Hoisting & Community Observance",
    altText: "Adult community facilitators hoisting a decorated flagpole inside the turquoise courtyard while women look on.",
    caption: "National day observance led by adult community facilitators inside the courtyard (cropped above young attendees to protect privacy).",
    reviewNote: "Full image contains young attendees in foreground (held in private preview). Public derivative crops tightly to upper architectural arches, adult facilitators, and women in background.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.35 PM (1).jpeg",
    id: "bf-media-03",
    slug: "stationery-kit-distribution",
    category: "education",
    categoryLabel: "Education & Learning",
    hasIdentifiableChildren: true,
    safeguardingRisk: "medium",
    publicApproved: true,
    publicCropSlug: "learning-kits-facilitators",
    // Tight crop showing right side: adult facilitators + boxes of pencil stationery kits + BORN FOUNDATION banner (excluding minor on left)
    publicTransform: {
      extract: { left: 500, top: 150, width: 1100, height: 825 },
      blurs: [],
    },
    title: "Learning Supplies & Stationery Preparation",
    altText: "Born Foundation community staff and educators organising boxed stationery and pencil kits at a learning centre table beneath the foundation banner.",
    caption: "Educators and community volunteers preparing writing supplies and pencil kits at a learning centre.",
    reviewNote: "Full image contains one minor at far left edge (held in private preview). Public derivative crops strictly to the adult staff, learning kit table, and foundation banner.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.35 PM (2).jpeg",
    id: "bf-media-04",
    slug: "youth-cultural-programme",
    category: "cultural",
    categoryLabel: "Cultural & Recreational",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Group Presentation & Summer Activity",
    altText: "Young participants standing together presenting during a group summer gathering.",
    caption: "Group presentation during a children's seasonal gathering.",
    reviewNote: "Multiple identifiable adolescents and children facing the camera; requires guardian consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.35 PM.jpeg",
    id: "bf-media-05",
    slug: "warm-meal-distribution",
    category: "nutrition",
    categoryLabel: "Nutrition & Wellbeing",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Volunteer Serving Freshly Prepared Rice Meal",
    altText: "A community volunteer serving a warm rice meal onto steel plates for seated children.",
    caption: "Volunteer serving nutritious warm meals during a group programme.",
    reviewNote: "Identifiable children's side-frontal faces visible along left wall; held in private safeguarding review.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.36 PM (1).jpeg",
    id: "bf-media-06",
    slug: "creative-drawing-circle",
    category: "education",
    categoryLabel: "Education & Learning",
    hasIdentifiableChildren: true,
    safeguardingRisk: "medium",
    publicApproved: false,
    title: "Creative Drawing & Art Activity Circle",
    altText: "Children seated in a circle drawing and colouring on paper sheets with pencils and crayons.",
    caption: "Hands-on drawing and creative expression session inside a community room.",
    reviewNote: "Several children's faces visible along upper/right perimeter; held pending guardian approval.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.36 PM (2).jpeg",
    id: "bf-media-07",
    slug: "independence-day-cultural-dance",
    category: "cultural",
    categoryLabel: "Cultural & Recreational",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Independence Day Cultural Dance Performance",
    altText: "Children performing a group dance in front of the national flag and tricolour drapes.",
    caption: "Children performing during an Independence Day cultural observance.",
    reviewNote: "Clear frontal faces of multiple children; requires parental/guardian consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.36 PM.jpeg",
    id: "bf-media-08",
    slug: "reusable-water-bottles-distribution",
    category: "nutrition",
    categoryLabel: "Nutrition & Wellbeing",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Clean Hydration Support at Kumbalagodu Centre",
    altText: "Children holding reusable water bottles in front of the Born Foundation Child Development Center banner.",
    caption: "Participants holding reusable drinking water bottles at a foundation centre.",
    reviewNote: "Direct close-range portrait of minors; strictly held until documented guardian consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.37 PM (1).jpeg",
    id: "bf-media-09",
    slug: "science-museum-excursion",
    category: "experiences",
    categoryLabel: "Educational Experiences",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Educational Visit to Science Gallery",
    altText: "Children and adult chaperones gathered under the 'Science for Kids' gallery arch during an educational trip.",
    caption: "Supervised educational outing to a science learning gallery in Bengaluru.",
    reviewNote: "Clear frontal faces of ~20 children; held in private safeguarding review.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.37 PM (2).jpeg",
    id: "bf-media-10",
    slug: "womens-community-participation",
    category: "women-community",
    categoryLabel: "Women & Community Development",
    hasIdentifiableChildren: false, // Left rear-head child cropped out; distant doorway infant masked cleanly with feathered blur
    safeguardingRisk: "low",
    publicApproved: true,
    publicCropSlug: "womens-community-circle",
    publicTransform: {
      extract: { left: 175, top: 15, width: 1425, height: 700 },
      // Feathered circular soft focus strictly over the small infant held near the doorway
      featheredBlurs: [{ cx: 912, cy: 300, rx: 32, ry: 34, sigma: 16 }],
    },
    title: "Women's Community Participation Session",
    altText: "Women seated in an open discussion circle with community facilitators inside a neighbourhood hall.",
    caption: "Women participating in a community outreach and support discussion in Bengaluru.",
    reviewNote: "Adult community participation circle. Left-edge child outside frame and distant background infant softly anonymised for child privacy prior to publication.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.37 PM.jpeg",
    id: "bf-media-11",
    slug: "outdoor-breakfast-gathering",
    category: "nutrition",
    categoryLabel: "Nutrition & Wellbeing",
    hasIdentifiableChildren: true,
    safeguardingRisk: "medium",
    publicApproved: false,
    title: "Outdoor Morning Meal Sharing",
    altText: "Older youths seated in a circle outdoors sharing breakfast during an excursion.",
    caption: "Communal breakfast shared outdoors during a group activity.",
    reviewNote: "Two youths in upper row show recognisable partial profiles; held pending consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.38 PM (1).jpeg",
    id: "bf-media-12",
    slug: "group-excursion-coach",
    category: "experiences",
    categoryLabel: "Educational Experiences",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Children & Chaperones Boarding Excursion Coach",
    altText: "Children and female community educators waving beside a chartered bus ahead of a day trip.",
    caption: "Supervised group excursion with educators and children.",
    reviewNote: "Clear frontal faces of many children; held pending documented parental consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.38 PM.jpeg",
    id: "bf-media-13",
    slug: "school-backpack-distribution",
    category: "education",
    categoryLabel: "Education & Learning",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "School Bag & Supplies Support with Families",
    altText: "Staff member handing a school bag and notebooks to a mother and child alongside stacks of packaged backpacks.",
    caption: "Distribution of school backpacks and learning materials with parents present.",
    reviewNote: "Clear frontal faces of mother, child, and community families; held pending family publication consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.38 PM (2).jpeg",
    id: "bf-media-14",
    slug: "centre-mentoring-gathering",
    category: "child-development",
    categoryLabel: "Child Development & Care",
    hasIdentifiableChildren: true,
    safeguardingRisk: "medium",
    publicApproved: false,
    title: "Community Centre Mentoring & Gathering",
    altText: "Adult speaker and educator addressing children seated on floor mats inside the Born Foundation community centre.",
    caption: "Indoor group mentoring and educational session at a Born Foundation centre.",
    reviewNote: "Several children on left floor mats show side-profiles; held strictly in private safeguarding review awaiting guardian consent.",
  },
  {
    sourceFile: "WhatsApp Image 2026-11-25 at 7.53.39 PM.jpeg",
    id: "bf-media-15",
    slug: "childrens-day-gift-celebration",
    category: "cultural",
    categoryLabel: "Cultural & Recreational",
    hasIdentifiableChildren: true,
    safeguardingRisk: "high",
    publicApproved: false,
    title: "Centre Celebration & Gift Sharing",
    altText: "Young participants in festive attire holding wrapped gift packets with educators in front of the centre banner.",
    caption: "Celebration gathering with gift distribution at a foundation centre.",
    reviewNote: "Clear close portraits of multiple minors; strictly held awaiting guardian authorisation.",
  },
];

async function applyRegionBlurs(buffer, blurs, featheredBlurs) {
  let current = buffer;
  const composites = [];

  if (blurs && blurs.length > 0) {
    for (const rect of blurs) {
      const patch = await sharp(current)
        .extract({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
        .blur(rect.sigma || 16)
        .toBuffer();
      composites.push({ input: patch, left: rect.left, top: rect.top });
    }
  }

  if (featheredBlurs && featheredBlurs.length > 0) {
    const meta = await sharp(current).metadata();
    const w = meta.width;
    const h = meta.height;
    const blurredFull = await sharp(current).blur(featheredBlurs[0].sigma || 14).toBuffer();

    const circles = featheredBlurs
      .map(
        (b, i) => `
      <radialGradient id="g${i}" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      <ellipse cx="${b.cx}" cy="${b.cy}" rx="${b.rx}" ry="${b.ry}" fill="url(#g${i})" />`
      )
      .join("\n");

    const maskSvg = Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${circles}</svg>`
    );

    const maskedBlur = await sharp(blurredFull)
      .ensureAlpha()
      .composite([{ input: maskSvg, blend: "dest-in" }])
      .png()
      .toBuffer();

    composites.push({ input: maskedBlur, left: 0, top: 0 });
  }

  if (composites.length === 0) return current;
  return sharp(current).composite(composites).toBuffer();
}

async function main() {
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_GALLERY_DIR, { recursive: true });

  const processedRecords = [];

  for (const item of SOURCE_INVENTORY) {
    const srcPath = path.join(SOURCE_DIR, item.sourceFile);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] Missing source file: ${item.sourceFile}`);
      continue;
    }

    const srcBytes = fs.readFileSync(srcPath);
    const sha256 = crypto.createHash("sha256").update(srcBytes).digest("hex");
    const meta = await sharp(srcPath).metadata();

    // 1. Always create EXIF-stripped private review preview (max 1200px wide, no upscaling)
    const previewFilename = `${item.slug}-review.webp`;
    const previewPath = path.join(PREVIEW_DIR, previewFilename);
    const previewWidth = Math.min(meta.width || 1200, 1200);
    await sharp(srcPath)
      .rotate() // Apply EXIF orientation if present, then strip metadata by default
      .resize({ width: previewWidth, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(previewPath);

    const previewMeta = await sharp(previewPath).metadata();
    const record = {
      id: item.id,
      slug: item.slug,
      sourceFilename: item.sourceFile,
      sourceSha256: sha256.slice(0, 16),
      originalDimensions: { width: meta.width, height: meta.height },
      exifStripped: true,
      hasIdentifiableChildren: item.hasIdentifiableChildren,
      safeguardingRisk: item.safeguardingRisk,
      approvalStatus: item.publicApproved ? "approved_non_identifying" : "pending_guardian_authorisation",
      category: item.category,
      categoryLabel: item.categoryLabel,
      title: item.title,
      altText: item.altText,
      caption: item.caption,
      reviewNote: item.reviewNote,
      privatePreviewPath: `.private/media-previews/${previewFilename}`,
      privatePreviewDimensions: { width: previewMeta.width, height: previewMeta.height },
      publicDerivatives: null,
    };

    // 2. If explicitly approved as a non-identifying safe public derivative, generate WebP + JPEG
    if (item.publicApproved && item.publicCropSlug && item.publicTransform) {
      let pipeline = sharp(srcPath).rotate();
      if (item.publicTransform.extract) {
        pipeline = pipeline.extract(item.publicTransform.extract);
      }
      let workBuf = await pipeline.toBuffer();
      if (item.publicTransform.blurs?.length || item.publicTransform.featheredBlurs?.length) {
        workBuf = await applyRegionBlurs(
          workBuf,
          item.publicTransform.blurs,
          item.publicTransform.featheredBlurs
        );
      }

      const workMeta = await sharp(workBuf).metadata();
      const target1200W = Math.min(workMeta.width || 1200, 1200);
      const target800W = Math.min(workMeta.width || 800, 800);

      const webp1200 = `${item.publicCropSlug}-1200.webp`;
      const webp800 = `${item.publicCropSlug}-800.webp`;
      const jpg800 = `${item.publicCropSlug}-800.jpg`;

      await sharp(workBuf)
        .resize({ width: target1200W, withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(path.join(PUBLIC_GALLERY_DIR, webp1200));

      await sharp(workBuf)
        .resize({ width: target800W, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(PUBLIC_GALLERY_DIR, webp800));

      await sharp(workBuf)
        .resize({ width: target800W, withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(path.join(PUBLIC_GALLERY_DIR, jpg800));

      const out1200Meta = await sharp(path.join(PUBLIC_GALLERY_DIR, webp1200)).metadata();
      const out800Meta = await sharp(path.join(PUBLIC_GALLERY_DIR, webp800)).metadata();

      // Verify zero EXIF / GPS present in public output
      if (out1200Meta.exif || out800Meta.exif) {
        throw new Error(`EXIF metadata leaked into public derivative for ${item.publicCropSlug}`);
      }

      record.publicDerivatives = {
        primaryWebp: `/images/gallery/${webp1200}`,
        mediumWebp: `/images/gallery/${webp800}`,
        fallbackJpg: `/images/gallery/${jpg800}`,
        width: out1200Meta.width,
        height: out1200Meta.height,
        sizeBytes1200: fs.statSync(path.join(PUBLIC_GALLERY_DIR, webp1200)).size,
        sizeBytes800: fs.statSync(path.join(PUBLIC_GALLERY_DIR, webp800)).size,
      };
    }

    processedRecords.push(record);
    console.log(
      `[OK] ${item.id} (${item.slug}) -> ${record.approvalStatus}` +
        (record.publicDerivatives ? ` | public: ${record.publicDerivatives.primaryWebp} (${record.publicDerivatives.width}x${record.publicDerivatives.height})` : "")
    );
  }

  fs.writeFileSync(
    INVENTORY_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalSourceFiles: processedRecords.length,
        publicApprovedCount: processedRecords.filter((r) => r.publicDerivatives !== null).length,
        pendingSafeguardingCount: processedRecords.filter((r) => r.publicDerivatives === null).length,
        records: processedRecords,
      },
      null,
      2
    ),
    "utf-8"
  );

  console.log(`\nInventory written to .private/media-inventory.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
