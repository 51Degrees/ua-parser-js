import PROMISE_PROXY_HANDLING from "./proxies/promiseProxy.js";
import { ECustomError } from "./utils/errors/index.js";
import createInjectionInstance from "./instance/createInjectionInstance.js";
import createAPIInstance from "./instance/createAPIInstance.js";
const UAParser = (key, headers) => {
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
        k.toLowerCase() === "user-agent" || k.toLowerCase().includes("sec-ch")
    )
  )
    throw Error(ECustomError.INCOMPLETE_HEADER_MAP);
  return new Proxy(createAPIInstance(key, headers), PROMISE_PROXY_HANDLING);
};
export default UAParser;
//# sourceMappingURL=UAParser.js.map
