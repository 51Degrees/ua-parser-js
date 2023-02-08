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
declare const UAParser: (key: TResourceKey, headers?: THeaders) => Promise<TApiResponseData>;
export default UAParser;
//# sourceMappingURL=UAParser.d.ts.map