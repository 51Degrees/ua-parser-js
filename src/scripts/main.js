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
    const values = r.values.map((v) => parsedData.device[v]);
    const el = buildDeviceResultItem(r.label, values, r.icon);
    container.appendChild(el);
  });
};

await getParserResult();

const accessObjectByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
