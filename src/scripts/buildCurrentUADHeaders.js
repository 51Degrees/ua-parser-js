const buildCurrentUADHeader = (containerID, headers) => {
  const container = document.getElementById(containerID);
  for (const [k, v] of Object.entries(headers)) {
    const el = document.createElement("div");
    const title = document.createElement("span");
    title.innerText = k;
    const value = document.createTextNode(`: ${v}`);

    el.appendChild(title);
    el.appendChild(value);
    container.appendChild(el);
  }
  return container;
};

export default buildCurrentUADHeader;

// <span>sec-ch-ua</span>: "Not_A Brand";v="99", "Google
// Chrome";v="109","Chromium";v="109" <br />
// <span>sec-ch-ua-arch</span>: "x86" <br />
// <span>sec-ch-ua-full-version</span>: "109.0.5414.87"<br />
// <span>sec-ch-ua-platform</span>: "macOS" <br />
// <span>sec-ch-ua-platform-version</span>: "13.1.0" <br />
// <span>Sec-Fetch-Dest</span>: script <br />
// <span>Sec-Fetch-Site</span>: cross-site <br />
