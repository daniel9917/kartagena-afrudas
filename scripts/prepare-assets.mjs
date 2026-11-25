import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "logo", "logo.png");
const outDir = path.join(root, "public", "assets", "brand");
const appDir = path.join(root, "src", "app");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(appDir, { recursive: true });

if (!fs.existsSync(source)) {
  throw new Error("No se encontró logo/logo.png. Coloca el arte original ahí y vuelve a ejecutar npm run prepare:assets.");
}

// The supplied PNG has a flat sage background (#C8D2C0). Turn it into a
// soft-edged transparent brand mark so it can live on cream, sage and espresso.
const src = PNG.sync.read(fs.readFileSync(source));
const cutout = new PNG({ width: src.width, height: src.height });
const BG = { r: 200, g: 210, b: 192 };

for (let i = 0; i < src.data.length; i += 4) {
  const dr = Math.abs(src.data[i] - BG.r);
  const dg = Math.abs(src.data[i + 1] - BG.g);
  const db = Math.abs(src.data[i + 2] - BG.b);
  const distance = Math.max(dr, dg, db);

  cutout.data[i] = src.data[i];
  cutout.data[i + 1] = src.data[i + 1];
  cutout.data[i + 2] = src.data[i + 2];
  cutout.data[i + 3] = distance <= 14 ? 0 : distance >= 36 ? 255 : Math.round(((distance - 14) / 22) * 255);
}

const cutoutBuffer = PNG.sync.write(cutout);
const write = (name, buffer) => fs.writeFileSync(path.join(outDir, name), buffer);

write("ka-primary-transparent_v1.png", cutoutBuffer);
await sharp(cutoutBuffer).webp({ quality: 92 }).toFile(path.join(outDir, "ka-primary-transparent_v1.webp"));
await sharp(source).webp({ quality: 90 }).toFile(path.join(outDir, "ka-primary-on-sage_v1.webp"));
await sharp(source).png({ compressionLevel: 9 }).toFile(path.join(outDir, "ka-primary-on-sage_v1.png"));

// Single-ink versions for embroidery, stamps, overlays and dark/light placements.
function toSingleInk(buffer, ink) {
  const png = PNG.sync.read(buffer);
  for (let i = 0; i < png.data.length; i += 4) {
    if (png.data[i + 3] === 0) continue;
    png.data[i] = ink[0];
    png.data[i + 1] = ink[1];
    png.data[i + 2] = ink[2];
  }
  return PNG.sync.write(png);
}

const espresso = [0x3b, 0x23, 0x13];
const cream = [0xf3, 0xe3, 0xd0];
const monoEspresso = toSingleInk(cutoutBuffer, espresso);
const monoCream = toSingleInk(cutoutBuffer, cream);

write("ka-primary_mono-espresso_v1.png", monoEspresso);
write("ka-primary_mono-cream_v1.png", monoCream);
await sharp(monoEspresso).webp({ quality: 92 }).toFile(path.join(outDir, "ka-primary_mono-espresso_v1.webp"));
await sharp(monoCream).webp({ quality: 92 }).toFile(path.join(outDir, "ka-primary_mono-cream_v1.webp"));

// Isotype: the braided heart spans x=12..875 and y=95..958 in the source.
// Keep the full emblem (including its bottom tip), then add clear space so
// the mark never touches the edge of small placements such as the 44px nav icon.
const isotypeBuffer = await sharp(cutoutBuffer)
  .extract({ left: 12, top: 95, width: 864, height: 864 })
  .resize(600, 600, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 60, right: 60, bottom: 60, left: 60, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

write("ka-isotype-transparent_v2.png", isotypeBuffer);
await sharp(isotypeBuffer).webp({ quality: 92 }).toFile(path.join(outDir, "ka-isotype-transparent_v2.webp"));

const isoMonoEspresso = toSingleInk(isotypeBuffer, espresso);
const isoMonoCream = toSingleInk(isotypeBuffer, cream);
write("ka-isotype_mono-espresso_v2.png", isoMonoEspresso);
write("ka-isotype_mono-cream_v2.png", isoMonoCream);
await sharp(isoMonoEspresso).webp({ quality: 92 }).toFile(path.join(outDir, "ka-isotype_mono-espresso_v2.webp"));
await sharp(isoMonoCream).webp({ quality: 92 }).toFile(path.join(outDir, "ka-isotype_mono-cream_v2.webp"));

// Favicons and touch icon: isotype centred on cream. The v2 isotype already
// carries its own clear space, so the icon can use the full canvas.
for (const size of [16, 32, 180]) {
  const mark = await sharp(isotypeBuffer)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const icon = await sharp({
    create: { width: size, height: size, channels: 4, background: "#F3E3D0" },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();

  if (size !== 180) write(`favicon-${size}.png`, icon);
  if (size === 32) fs.writeFileSync(path.join(appDir, "icon.png"), icon);
  if (size === 180) fs.writeFileSync(path.join(appDir, "apple-icon.png"), icon);
}

// Open Graph card.
const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3E3D0"/>
  <rect x="720" y="50" width="430" height="530" rx="24" fill="#C7CEBE"/>
  <rect x="0" y="0" width="14" height="630" fill="#B55A2A"/>
  <text x="80" y="150" fill="#3B2313" font-family="Georgia, serif" font-size="76" font-weight="bold">Kartagena Afrudas</text>
  <text x="82" y="245" fill="#8C3F1C" font-family="Georgia, serif" font-size="44">Cuidado que empieza en la raíz.</text>
  <text x="84" y="330" fill="#3B2313" font-family="Arial, sans-serif" font-size="28">Resguardamos memoria y ancestralidad.</text>
  <text x="84" y="380" fill="#3B2313" font-family="Arial, sans-serif" font-size="26">Llevamos el lenguaje de las trenzas</text>
  <text x="84" y="418" fill="#3B2313" font-family="Arial, sans-serif" font-size="26">al tejido, al bordado y a la moda.</text>
  <rect x="84" y="500" width="220" height="6" fill="#D49A3A"/>
</svg>`);
const ogArt = await sharp(source).resize(390, 420, { fit: "contain" }).png().toBuffer();
await sharp(ogSvg)
  .composite([{ input: ogArt, left: 740, top: 105 }])
  .jpeg({ quality: 88 })
  .toFile(path.join(outDir, "og-image-1200x630.jpg"));

console.log("Assets listos en public/assets/brand + iconos en src/app.");
