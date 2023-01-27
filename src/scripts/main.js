import "../assets/theme.scss";
import "./select.js";
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

getParserResult().then();

const grabHeadersButton = document.getElementById("grab-textarea");
grabHeadersButton.addEventListener("click", getHeadersFromTextArea);

const setHeaderValueToTextArea = async (event) => {
  const value = event.target.value;
  const el = document.getElementById("headers-list");
  el.value = value;
  await getHeadersFromTextArea();
};

const userAgentSelector = document.getElementById("user-agent-selector");
userAgentSelector.addEventListener("change", setHeaderValueToTextArea);

const copyToClipboard = async () => {
  const headers = getMyHeaders();
  navigator.clipboard
    .writeText(
      `sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109","Chromium";v="109"
sec-ch-ua-arch: "x86"
sec-ch-ua-full-version: "109.0.5414.87"
sec-ch-ua-platform: "macOS"
sec-ch-ua-platform-version: "13.1.0"
Sec-Fetch-Dest: script
Sec-Fetch-Site: cross-site`
    )
    .then(() => {
      alert("Copied to clipboard");
    });
};

const getMyHeaders = () => {
  const req = new XMLHttpRequest();
  req.open("GET", document.location, false);
  req.send(null);

  return req.getAllResponseHeaders().toLowerCase();
};

const copyToClipboardButton = document.getElementById("copy-to-clipboard");
copyToClipboardButton.addEventListener("click", copyToClipboard);
