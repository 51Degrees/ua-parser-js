import {
  EAPIErrors,
  HAPPY_CASE_DEFAULT_KEY_DATA_MOCK,
  HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK,
  INTERNAL_SERVER_ERROR_RESPONSE_MOCK,
  NON_EXISING_ON_SERVER_RESPONSE_MOCK,
  REQUEST_LIMIT_REACHED_RESPONSE_MOCK,
} from "../../__mocks__";
import { expect } from "@jest/globals";
import UAParser from "../../UAParser";
import {USER_KEY_INVALID, USER_KEY_VALID} from "../../config";
import { IAPIResponse } from "../../api/api";
import { HEADERS_TAG, LEGACY_TAG, RESOURCE_KEY_TAG } from "./config";
import {
  LEGACY_METHODS_MAPPING,
  LEGACY_PROPERTIES_MAPPING,
} from "../../utils/extendWithLegacyProps";
import { ELegacyDeviceType } from "../../utils/mapDeviceTypeToLegacy";

const createAPITests = (
  DESCRIPTION_PREFIX: string = "CROSSENV",
  mockInitiator: (mock: IAPIResponse) => void,
) => {
  describe(`${DESCRIPTION_PREFIX}: API`, () => {
    test(`${RESOURCE_KEY_TAG}: Not existent on server`, async () => {
      mockInitiator(NON_EXISING_ON_SERVER_RESPONSE_MOCK);
      await expect(
        UAParser(USER_KEY_INVALID, {
          "Sec-CH-UA-Platform": "Windows",
        }),
      ).rejects.toThrow(new Error(EAPIErrors.NON_EXISING_ON_SERVER_ERROR));
    });
    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Request limit`, async () => {
      mockInitiator(REQUEST_LIMIT_REACHED_RESPONSE_MOCK);
      await expect(
        UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
        }),
      ).rejects.toThrow(new Error(EAPIErrors.REQUEST_LIMIT_REACHED_ERROR));
    });
    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Internal server error`, async () => {
      mockInitiator(INTERNAL_SERVER_ERROR_RESPONSE_MOCK);
      await expect(
        UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
        }),
      ).rejects.toThrow(new Error(EAPIErrors.INTERNAL_SERVER_ERROR));
    });
    test(`${RESOURCE_KEY_TAG}${HEADERS_TAG}: Happy path`, async () => {
      mockInitiator(HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK);
      const value = await UAParser(USER_KEY_VALID, {
        "Sec-CH-UA-Platform": "Windows",
      });
      expect(value).toMatchObject(HAPPY_CASE_DEFAULT_KEY_DATA_MOCK);
    });

    Object.keys(LEGACY_PROPERTIES_MAPPING).forEach((cKey) => {
      Object.keys(LEGACY_PROPERTIES_MAPPING[cKey]).forEach((iKey) => {
        test(`${LEGACY_TAG}: Accessing ${cKey}.${iKey} legacy property`, async () => {
          mockInitiator(HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK);
          const value = await UAParser(USER_KEY_VALID, {
            "Sec-CH-UA-Platform": "Windows",
          });

          const FODKeyByLegacyMapping = LEGACY_PROPERTIES_MAPPING[cKey][iKey];
          const FODValueByLegacyMapping = value.device[FODKeyByLegacyMapping];
          const legacyValue = value[cKey][iKey];
          if (typeof FODKeyByLegacyMapping === "function") {
            const result = value[FODKeyByLegacyMapping]();
            expect(result).not.toBeUndefined();
          }
          if (iKey === "type") {
            const mappedLegacyTypeValue =
              ELegacyDeviceType[value.device.devicetype];
            expect(legacyValue).toEqual(mappedLegacyTypeValue);
          } else {
            expect(legacyValue).toEqual(
              FODValueByLegacyMapping === "Unknown"
                ? undefined
                : FODValueByLegacyMapping,
            );
          }
        });
      });
    });

    Object.keys(ELegacyDeviceType).forEach((dType) => {
      test(`${LEGACY_TAG}: Checking if 51Deg DeviceType value [${dType}] matches legacy device.type [${ELegacyDeviceType[dType]}]`, async () => {
        mockInitiator({
          ...HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK,
          response: {
            ...HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK.response,
            device: {
              ...HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK.response.device,
              devicetype: dType,
            },
          },
        });
        const value = await UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
        });
        const legacyValue = value.device.type;
        const FODegValue = ELegacyDeviceType[value.device.devicetype];
        expect(legacyValue).toEqual(FODegValue);
      });
    });
    for (const [methodName] of Object.entries(LEGACY_METHODS_MAPPING)) {
      test(`${LEGACY_TAG}: Accessing ${methodName}() legacy method`, async () => {
        mockInitiator(HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK);
        const value = await UAParser(USER_KEY_VALID, {
          "Sec-CH-UA-Platform": "Windows",
        });
        expect(value[methodName]()).not.toBeUndefined();
      });
    }
  });
};

export default createAPITests;
