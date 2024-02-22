/**
 * @jest-environment node
 */
import {
  HEADERS_TAG,
  INTEGRATION_TAG,
  NODE_TAG,
  RESOURCE_KEY_TAG,
} from "../../shared/config";
import UAParser from "../../../UAParser";
import {USER_KEY_INVALID, USER_KEY_VALID} from "../../../config";
import { expect } from "@jest/globals";
import { EAPIErrors } from "../../../__mocks__";

describe(`${INTEGRATION_TAG}:${NODE_TAG}`, () => {
  test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Happy path`, async () => {
    const value = await UAParser(USER_KEY_VALID, {
      "sec-ch-ua": "Not_A Brand;v=99, Google Chrome;v=109, Chromium;v=109",
      "sec-ch-ua-arch": "x64",
      "sec-ch-ua-full-version": "109.0.5414.87",
      "sec-ch-ua-platform": "macOS",
      "sec-ch-ua-platform-version": "12.2.1",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    });
    expect(value).toHaveProperty("device");
    expect(value.device.platformversion).not.toBeUndefined();
    expect(value.device.platformversion.toLowerCase()).not.toEqual("unknown");
    expect(value.device.platformversion).toMatch(/[0-9]+/);
    expect(value.device.platformversion).toEqual("12.2.1");
  });
  test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Key not valid`, async () => {
    await expect(
      UAParser(USER_KEY_INVALID, {
        "Sec-CH-UA-Platform": "Windows",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      }),
    ).rejects.toThrow(new Error(EAPIErrors.NON_EXISING_ON_SERVER_ERROR));
  });
});
