/**
 * @jest-environment puppeteer
 */

import { expect, jest } from "@jest/globals";
import { BROWSER_TAG, DOM_TAG, RESOURCE_KEY_TAG } from "../../shared/config";
import puppeteer from "puppeteer";

// Chrome cannot start its sandbox on the GitHub hosted Ubuntu runners, so CI
// launches it without, as jest-puppeteer.config.js does.
const LAUNCH_ARGS = process.env.CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [];

describe(`${BROWSER_TAG}${DOM_TAG}: Integration`, () => {
  jest.setTimeout(10000);
  test('Happy injection', async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: LAUNCH_ARGS });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      await page.goto('http://localhost:8080/page-using-rkey', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      // The cloud's script resolves the result once its own requests are
      // done, so wait for the page to write it rather than for a set time.
      await page.waitForFunction(
        () => document.getElementById('resolve')?.textContent,
        { timeout: 20000 },
      );
      const value = await page.$eval('#resolve', el => JSON.parse(el.textContent));

      expect(value.error).toBeUndefined();
      expect(value.device.platformname).not.toBeUndefined();
      expect(value.device.platformname.toLowerCase()).not.toEqual('unknown');
    } finally {
      await browser.close();
    }
  }, 30000);
  test(`Happy request with headers`, async () => {
    const browser = await puppeteer.launch({ args: LAUNCH_ARGS });
    const page = await browser.newPage();

    await page.goto("http://localhost:8080/page-using-rkey-headers", {
      waitUntil: "networkidle0",
    });
    await page.waitForNetworkIdle({ idleTime: 2000 });
    await page.waitForSelector("#resolve");
    const element = await page.$("#resolve");
    const value = await page.evaluate(
      (el) => JSON.parse(el.textContent),
      element,
    );
    expect(value).toHaveProperty("device");
    expect(value.device.platformversion).not.toBeUndefined();
    expect(value.device.platformversion.toLowerCase()).not.toEqual("unknown");
    expect(value.device.platformversion).toMatch(/[0-9]+/);
    expect(value.device.platformversion).toEqual("12.2.1");
    await browser.close();
  });
});
