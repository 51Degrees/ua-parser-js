declare const api: {
    getJSONRequest: (resourceKey: string, headers?: {}) => Promise<IAPIResponse>;
};
export interface IAPIResponse {
    status: number;
    response: TApiResponseData;
}
export type TApiResponseData = {
    [key: string]: any;
};
export default api;
//# sourceMappingURL=api.d.ts.map