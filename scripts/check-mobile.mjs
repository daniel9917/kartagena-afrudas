import { spawn } from "node:child_process";
import { chromium } from "playwright-core";

const port = 3100;
const base = `http://localhost:${port}`;
const routes = ["/", "/linea-creacion", "/linea-cuidado", "/memoria-y-raiz", "/contacto"];
const viewports = [
  { width: 360, height: 740, name: "360x740" },
  { width: 390, height: 844, name: "390x844" },
];

const server = spawn("npm", ["run", "dev", "--", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: "ignore",
  shell: true,
});

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("El servidor no respondió en el puerto " + port);
}

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

try {
  await waitForServer();
  const results = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    for (const route of routes) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      const metrics = await page.evaluate(() => {
        const visible = (el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && getComputedStyle(el).position !== "absolute";
        };
        const small = [...document.querySelectorAll("a, button, input, select, textarea")]
          .filter((el) => visible(el) && el.getBoundingClientRect().height < 44)
          .map((el) => `${el.tagName}:${(el.textContent || "").trim().slice(0, 28)}`);
        const single = (selector) => {
          const el = document.querySelector(selector);
          return el ? getComputedStyle(el).gridTemplateColumns : null;
        };
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          bodyFont: getComputedStyle(document.body).fontSize,
          h1: getComputedStyle(document.querySelector("h1")).fontSize,
          menuVisible: getComputedStyle(document.querySelector(".menu-toggle")).display !== "none",
          desktopNavVisible: getComputedStyle(document.querySelector(".desktop-nav")).display !== "none",
          heroCols: single(".hero__grid"),
          lineCols: single(".line-grid"),
          catalogCols: single(".catalog-grid"),
          serviceCols: single(".service-list"),
          smallTargets: [...new Set(small)],
          waLinks: document.querySelectorAll('a[href^="https://wa.me/573003230109"]').length,
        };
      });
      results.push({ viewport: viewport.name, route, ...metrics, errors: [...errors] });
      errors.length = 0;
    }

    // Verify the mobile drawer at this viewport.
    await page.goto(base, { waitUntil: "networkidle" });
    await page.click(".menu-toggle");
    const drawer = await page.evaluate(() => ({
      open: !!document.querySelector('[role="dialog"]'),
      locked: document.body.classList.contains("mobile-menu-open"),
      links: document.querySelectorAll(".mobile-menu a").length,
    }));
    await page.keyboard.press("Escape");
    const closed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
    results.push({ viewport: viewport.name, route: "/ (drawer)", ...drawer, closedWithEscape: closed });
    await context.close();
  }

  const problems = results.filter((r) =>
    r.scrollWidth > r.clientWidth ||
    (r.smallTargets && r.smallTargets.length > 0) ||
    (r.errors && r.errors.length > 0) ||
    (r.desktopNavVisible === true) ||
    (r.menuVisible === false && r.route !== "/ (drawer)") ||
    (r.route === "/ (drawer)" && (r.open === false || !r.closedWithEscape)),
  );

  console.log(JSON.stringify({ results, problems }, null, 2));
  if (problems.length) process.exitCode = 1;
} finally {
  await browser.close();
  server.kill("SIGTERM");
}
