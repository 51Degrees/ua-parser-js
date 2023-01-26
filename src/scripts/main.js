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
    icon: "gear-icon",
    values: ["layoutengine"],
  },
  {
    label: "OS",
    icon: "point-icon",
    values: ["platformname", "platformversion"],
  },
  {
    label: "Type",
    icon: "laptop-icon",
    values: ["devicetype"],
  },
  {
    label: "Hardware",
    icon: "gear-icon",
    values: ["hardwarename", "hardwarevendor"],
  },
  {
    label: "Model",
    icon: "gear-icon",
    values: ["hardwaremodel"],
  },
];

const getHeadersFromTextArea = async () => {
  const el = document.getElementById("headers-list");
  const elVal = el.value;
  const lines = elVal.split("\n");
  const headers = lines.reduce((acc, line) => {
    const [prop, value] = line.split(":");
    acc[prop] = "";
    acc[prop] = value.replace(/['"]+/g, "").trim();
    return acc;
  }, {});
  const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg", headers);
  drawParsedResult(parsedData);
};
const test = new Headers({});
const grabHeadersButton = document.getElementById("grab-textarea");
grabHeadersButton.addEventListener("click", getHeadersFromTextArea);

const getParserResult = async () => {
  const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg");
  drawParsedResult(parsedData);
};

const drawParsedResult = (parsedData) => {
  const container = document.getElementById("parser-result");
  container.innerHTML = "";
  EXPECTED_RESULTS.forEach((r) => {
    const values = r.values
      .flatMap((v) => {
        return parsedData.device[v];
      })
      .filter((v) => v !== undefined && v !== null)
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
