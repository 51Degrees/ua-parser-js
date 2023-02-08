import UAParser from "../../UAParser";

import { ECustomError } from "../../utils/errors";
import { USER_KEY_VALID } from "../../config";
import { DEPRECATED_METHODS } from "../../proxies/resultProxy";
import {
  DEPRECATION_TAG,
  HEADERS_TAG,
  LEGACY_TAG,
  PROMISE_TAG,
  RESOURCE_KEY_TAG,
} from "./config";

const DESCRIPTION_PREFIX = "[SHARED]:";

const createLocalTests = (prefix: string = DESCRIPTION_PREFIX) => {
  describe(`${prefix}: Local`, () => {
    test(`${RESOURCE_KEY_TAG}: Empty resource key`, () => {
      expect(() => {
        //@ts-ignore
        UAParser();
      }).toThrow(new Error(ECustomError.REQUIRED_RESOURCE_KEY));
    });

    test(`${RESOURCE_KEY_TAG}: Arbitrary Resource key`, () => {
      expect(() => {
        UAParser("rk");
      }).toThrow(new Error(ECustomError.INVALID_RESOURCE_KEY));
    });

    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Valid Resource key, irrelevant header map`, () => {
      expect(() => {
        UAParser(USER_KEY_VALID, {
          "Sec-UA-Platform": "Windows",
        });
      }).toThrow(new Error(ECustomError.INCOMPLETE_HEADER_MAP));
    });

    test(`${RESOURCE_KEY_TAG}: Resource key with space`, () => {
      expect(() => {
        UAParser("Mozilla Test");
      }).toThrow(new Error(ECustomError.ATTEMPT_TO_USE_USER_AGENT));
    });

    test(`${RESOURCE_KEY_TAG}: User Agent usage`, () => {
      expect(() => {
        UAParser(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        );
      }).toThrow(new Error(ECustomError.ATTEMPT_TO_USE_USER_AGENT));
    });

    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Valid resource key and arbitrary headers map`, () => {
      expect(() => {
        UAParser(USER_KEY_VALID, {
          // We need ignore this because basically we're writing tests for native approach, which goes without typings.
          // @ts-ignore
          "Sec-CH-UA-Platform": 1,
        });
      }).toThrow(new Error(ECustomError.INVALID_HEADERS_VALUE));
    });

    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Valid resource key and empty headers map`, () => {
      expect(() => {
        UAParser(USER_KEY_VALID, {});
      }).toThrow(new Error(ECustomError.INCOMPLETE_HEADER_MAP));
    });

    test(`${PROMISE_TAG}: Accessing Promise`, () => {
      expect(() => {
        UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
          // @ts-ignore
        }).getCPU();
      }).toThrow(new Error(ECustomError.PROMISE_MISUSE));
    });

    DEPRECATED_METHODS.forEach((method) => {
      test(`${DEPRECATION_TAG}: Accessing Deprecated ${method} method`, async () => {
        const value = await UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
        });
        expect(() => {
          value[method]();
        }).toThrow(
          new Error(
            `${method} is a UAParser result deprecated method, consider using \`result.device\` that contains comprehensive device data.`,
          ),
        );
      });
    });
  });
};

export default createLocalTests;
