import PROMISE_PROXY_HANDLING from "./proxies/promiseProxy";
import { ECustomError } from "./utils/errors";
import createInjectionInstance from "./instance/createInjectionInstance";
import createAPIInstance from "./instance/createAPIInstance";
import { TApiResponseData } from "./api/api";

type TResourceKey = string;
type THeaders = {
  [key: string]: string;
};

/**
 * UAParser detects device data either from the current browser context or from the passed `headerMap` parameter.  Note: if you are running on the server side in the Node.js environment - you must pass the headerMap parameter.  It can be either taken from the current request or from the stored data.
 *  @param key - Required to use the 51Degrees Cloud service that UAParser relies on internally.  Configure one at {@link https://configure.51degrees.com/S6fGMDKw}
 *  @param headers - an optional param Map of HTTP headers containing User-Agent Client Hints and/or User-Agent.  if omitted UAParser will assume browser context and try to do detection from within the DOM.
 *  @returns a Result object with a nested .device object containing all the detected device properties.
 */

const UAParser = (
  key: TResourceKey,
  headers?: THeaders,
): Promise<TApiResponseData> => {
  if (!key) throw Error(ECustomError.REQUIRED_RESOURCE_KEY);
  if (key.length <= 0) throw Error(ECustomError.EMPTY_RESOURCE_KEY);
  if (/\s/g.test(key)) throw Error(ECustomError.ATTEMPT_TO_USE_USER_AGENT);
  if (key.length < 4) throw Error(ECustomError.INVALID_RESOURCE_KEY);

  if (typeof window !== "undefined") {
    if (!headers) {
      return new Proxy(createInjectionInstance(key), PROMISE_PROXY_HANDLING);
    }
  } else {
    if (!headers) throw new Error(ECustomError.DOM_NOT_FOUND);
  }

  if (Object.keys(headers).length <= 0)
    throw Error(ECustomError.INCOMPLETE_HEADER_MAP);
  if (Object.keys(headers).length <= 0)
    throw Error(ECustomError.HEADERS_NOT_HASHMAP);
  if (Object.keys(headers).some((k) => typeof headers[k] !== "string"))
    throw Error(ECustomError.INVALID_HEADERS_VALUE);
  if (
    !Object.keys(headers).some(
      (k) =>
        k.toLowerCase() === "user-agent" || k.toLowerCase().includes("sec-ch"),
    )
  )
    throw Error(ECustomError.INCOMPLETE_HEADER_MAP);

  return new Proxy(createAPIInstance(key, headers), PROMISE_PROXY_HANDLING);
};
export default UAParser;
