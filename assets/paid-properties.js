/*
 * Adds a "Paid plan" row for each result the cloud service did not return
 * because the page's Resource Key is free, and a note saying where to get
 * them. The page's bundle sends each result in a "uaparser-result" event
 * after it has drawn the rows that do have values.
 */
(function () {
  "use strict";

  var GROUPS = [
    { label: "Browser", icon: "browser-icon", values: ["browsername", "browserversion"] },
    { label: "Engine", icon: "gear-icon", values: ["layoutengine"] },
    { label: "OS", icon: "point-icon", values: ["platformname", "platformversion"] },
    { label: "Type", icon: "laptop-icon", values: ["devicetype"] },
    { label: "Hardware", icon: "gear-icon", values: ["hardwarevendor", "hardwarename"] },
    { label: "Model", icon: "gear-icon", values: ["hardwaremodel"] }
  ];

  var PRICING_URL = "https://51degrees.com/pricing?utm_source=github&utm_medium=example&utm_campaign=ua-parser-js&utm_content=assets-paid-properties.js&utm_term=paid-properties";
  var CONTACT_URL = "https://51degrees.com/contact-us?utm_source=github&utm_medium=example&utm_campaign=ua-parser-js&utm_content=assets-paid-properties.js&utm_term=paid-properties";

  // True when the cloud service left the property empty and said it needs
  // a paid plan.
  function needsPaidPlan(device, name) {
    var reason = device[name + "nullreason"];
    return device[name] == null &&
      typeof reason === "string" &&
      /paid/i.test(reason);
  }

  function buildRow(group) {
    var row = document.createElement("div");
    row.className = "CH-parsed__item";
    var title = document.createElement("div");
    title.className = "CH-parsed__title";
    var icon = document.createElement("i");
    icon.className = "icon " + group.icon;
    title.appendChild(icon);
    title.appendChild(document.createTextNode(group.label + ":"));
    var value = document.createElement("div");
    value.className = "CH-parsed__value";
    var pill = document.createElement("span");
    pill.className = "paid";
    pill.textContent = "Paid plan";
    value.appendChild(pill);
    row.appendChild(title);
    row.appendChild(value);
    return row;
  }

  function buildNote() {
    var note = document.createElement("p");
    note.className = "paid-note";
    note.appendChild(document.createTextNode(
      "This demo's Resource Key is free, so it can't fill the rows marked " +
      "Paid plan. "));
    var pricing = document.createElement("a");
    pricing.href = PRICING_URL;
    pricing.textContent = "Compare plans";
    note.appendChild(pricing);
    note.appendChild(document.createTextNode(" or "));
    var contact = document.createElement("a");
    contact.href = CONTACT_URL;
    contact.textContent = "contact us";
    note.appendChild(contact);
    note.appendChild(document.createTextNode(" to get them."));
    return note;
  }

  function showPaidRows(event) {
    var device = event.detail && event.detail.device;
    var container = document.getElementById("parser-result");
    if (!device || !container) return;
    var added = 0;
    GROUPS.forEach(function (group) {
      var paid = group.values.filter(function (name) {
        return needsPaidPlan(device, name);
      });
      var filled = group.values.some(function (name) {
        return device[name] != null;
      });
      if (paid.length > 0 && !filled) {
        container.appendChild(buildRow(group));
        added++;
      }
    });
    if (added > 0) container.appendChild(buildNote());
  }

  document.addEventListener("uaparser-result", showPaidRows);
})();
