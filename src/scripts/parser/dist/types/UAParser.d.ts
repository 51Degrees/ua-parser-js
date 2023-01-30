type TResourceKey = string;
type THeaders = {
    [key: string]: string;
};
declare const UAParser: (key: TResourceKey, headers?: THeaders) => Promise<import("./api/api").TApiResponseData>;
export default UAParser;
//# sourceMappingURL=UAParser.d.ts.map