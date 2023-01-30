declare enum ECustomError {
    DOM_NOT_FOUND = "UAParser is not running in the browser context (no DOM available), you must pass header map as a parameter to do the explicit device detection.",
    REQUIRED_RESOURCE_KEY = "Resource key required. Configure one at https://configure.51degrees.com/S6fGMDKw",
    EMPTY_RESOURCE_KEY = "Empty resource key provided. Configure one at https://configure.51degrees.com/S6fGMDKw",
    INCOMPLETE_HEADER_MAP = "Incomplete header map. Must include either User-Agent or Sec-CH-UA header.",
    ATTEMPT_TO_USE_USER_AGENT = "You are trying to use the legacy UAParser and pass User-Agent string as a parameter, please refer to the new API: await UAParser([resource-key][, header-map]).  Configure a resource key at https://configure.51degrees.com",
    INVALID_RESOURCE_KEY = "Invalid resource key. Configure one at https://configure.51degrees.com/S6fGMDKw",
    HEADERS_NOT_HASHMAP = "Invalid header map. Header map object must be a valid hash map.",
    INVALID_HEADERS_VALUE = "Invalid header map. Header values must be of type string.",
    PROMISE_MISUSE = "You are likely using a legacy API. The new UAParser call returns a promise that must be awaited."
}
declare enum ECustomWarnings {
    USING_DEFAULT_KEY = "Resource key not provided. Using default resource key"
}
export { ECustomError, ECustomWarnings };
//# sourceMappingURL=index.d.ts.map