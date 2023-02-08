import { TApiResponseData } from "../api/api";
export declare const LEGACY_PROPERTIES_MAPPING: {
    browser: {
        name: string;
        version: string;
    };
    cpu: {
        architecture: any;
    };
    device: {
        model: string;
        type: string;
        vendor: string;
    };
    engine: {
        name: string;
        version: any;
    };
    os: {
        name: string;
        version: string;
    };
};
export declare const LEGACY_METHODS_MAPPING: {
    getBrowser: () => {
        name: string;
        version: string;
    };
    getCPU: () => {
        architecture: any;
    };
    getDevice: () => {
        model: string;
        type: string;
        vendor: string;
    };
    getEngine: () => {
        name: string;
        version: any;
    };
    getOS: () => {
        name: string;
        version: string;
    };
    getResult: () => {
        os: {
            name: string;
            version: string;
        };
        browser: {
            name: string;
            version: string;
        };
        cpu: {
            architecture: any;
        };
        device: {
            model: string;
            type: string;
            vendor: string;
        };
        engine: {
            name: string;
            version: any;
        };
    };
};
declare const extendWithLegacyProps: (target: TApiResponseData) => {
    [x: string]: any;
};
export default extendWithLegacyProps;
//# sourceMappingURL=extendWithLegacyProps.d.ts.map