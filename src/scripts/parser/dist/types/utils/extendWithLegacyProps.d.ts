export declare const LEGACY_PROPERTIES_MAPPING: {
    browser: {
        name: string;
        version: string;
    };
    cpu: {
        architecture: string;
    };
    device: {
        model: string;
        type: string;
        vendor: string;
    };
    engine: {
        name: string;
        version: string;
    };
    os: {
        name: string;
        version: string;
    };
};
declare const extendWithLegacyProps: (target: any) => any;
export default extendWithLegacyProps;
//# sourceMappingURL=extendWithLegacyProps.d.ts.map