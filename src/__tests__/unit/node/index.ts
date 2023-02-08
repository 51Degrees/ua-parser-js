/**
 * @jest-environment node
 */

import UAParser from "../../../UAParser";
import { ECustomError } from "../../../utils/errors";

import { IAPIResponse } from "../../../api/api";

import { expect, jest } from "@jest/globals";
import createLocalTests from "../../shared/local";
import createAPITests from "../../shared/api";
import { HEADERS_TAG, NODE_TAG, RESOURCE_KEY_TAG } from "../../shared/config";
import {USER_KEY_VALID} from "../../../config";

const https = require("https");

const createAgentResponse = (mock: IAPIResponse) => {
  jest.mock("https", () => ({
    // @ts-ignore
    ...jest.requireActual("https"),
    // import and retain the original functionalities
    // tslint:disable-next-line:variable-name
    get: (post_option: any, cb) => {
      cb({
        setEncoding: jest.fn(),
        // tslint:disable-next-line:no-shadowed-variable
        on: (data, cb: any) =>
          cb(Buffer.from(JSON.stringify(mock.response), "utf8")),
        statusCode: mock.status,
        statusMessage: "Mock API 1 Success",
      });
    },
    on: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  }));
  jest.resetModules();
};

describe(`${NODE_TAG}: Base`, () => {
  describe(`${NODE_TAG}: Environment`, () => {
    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Headers not passed`, () => {
      expect(() => {
        UAParser(USER_KEY_VALID);
      }).toThrow(new Error(ECustomError.DOM_NOT_FOUND));
    });
  });
  createLocalTests(NODE_TAG);
  createAPITests(NODE_TAG, createAgentResponse);
});
