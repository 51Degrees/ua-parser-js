declare const ELegacyDeviceType: {
    Console: string;
    Desktop: string;
    EReader: string;
    IoT: string;
    MediaHub: string;
    Mobile: string;
    NotMobile: any;
    Router: string;
    SmallScreen: string;
    SmartPhone: string;
    SmartSpeaker: string;
    SmartWatch: string;
    Tablet: string;
    Tv: string;
};
type TLegacyDeviceTypeValue = "console" | "desktop" | "embedded" | "smarttv" | "mobile" | null | "wearable" | "tablet";
type T51DegDeviceTypeValue = keyof typeof ELegacyDeviceType;
declare const mapDeviceTypeToLegacy: (type: T51DegDeviceTypeValue) => TLegacyDeviceTypeValue;
export { mapDeviceTypeToLegacy, ELegacyDeviceType };
//# sourceMappingURL=mapDeviceTypeToLegacy.d.ts.map