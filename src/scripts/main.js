import "../assets/theme.scss";
import buildDeviceResultItem from "./buildDeviceResultItem.js";
import UAParser from "ua-parser-51d-js";

const EXPECTED_RESULTS = [
  {
    label: "Browser",
    icon: "browser-icon",
    values: ["browsername", "browserversion"],
  },
  {
    label: "Engine",
    icon: "engine-icon",
    values: ["layoutengine"],
  },
  {
    label: "OS",
    icon: "os-icon",
    values: ["platformname", "platformversion"],
  },
  {
    label: "Type",
    icon: "device-icon",
    values: ["devicetype"],
  },
  {
    label: "Hardware",
    icon: "device-icon",
    values: ["hardwarename", "hardwarevendor"],
  },
  {
    label: "Model",
    icon: "device-icon",
    values: ["hardwaremodel"],
  },
];

const getParserResult = async () => {
  const container = document.getElementById("parser-result");
  const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg");
  console.log(parsedData);
  EXPECTED_RESULTS.forEach((r) => {
    const values = r.values
      .flatMap((v) => {
        return parsedData.device[v];
      })
      .filter((v) => v !== undefined)
      .filter((v) => {
        if (Array.isArray(v)) return v;
        return v.toLowerCase() !== "unknown";
      });

    if (values.length <= 0) return;
    const el = buildDeviceResultItem(r.label, values, r.icon);
    container.appendChild(el);
  });
};

await getParserResult();
