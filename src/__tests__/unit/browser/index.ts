/**
 * @jest-environment jsdom
 */

import UAParser from "../../../UAParser";
import { expect, it, jest } from "@jest/globals";
import { HAPPY_CASE_USER_KEY_MOCK } from "../../../__mocks__";
import { IAPIResponse } from "../../../api/api";
import createAPITests from "../../shared/api";
import createLocalTests from "../../shared/local";
import {
  BROWSER_TAG,
  HEADERS_TAG,
} from "../../shared/config";
import { USER_KEY_VALID } from "../../../config";

const mockFetchRequest = (mock: IAPIResponse) => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve(createFetchResponse(mock)));
};

const createFetchResponse = (mock: IAPIResponse) => {
  return {
    status: mock.status,
    json: () => mock.response,
  };
};

beforeAll(() => {
  // @ts-ignore
  global.window = {
    // @ts-ignore
    location: {}
  }
});

afterAll(() => {
  // @ts-ignore
  // delete global.window;
});

describe(`${BROWSER_TAG}: Base`, () => {
  describe(`${BROWSER_TAG}: Environment`, () => {
    test(`${HEADERS_TAG}: Resource key passed, valid headers passed`, () => {
      mockFetchRequest(HAPPY_CASE_USER_KEY_MOCK);
      UAParser(USER_KEY_VALID, {
        "Sec-CH-UA-Platform": "Windows",
      });
    });
  });
  createLocalTests(BROWSER_TAG);
  createAPITests(BROWSER_TAG, mockFetchRequest);
});
