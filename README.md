<!--p align="center">
    <img src="https://raw.githubusercontent.com/faisalman/ua-parser-js/gh-pages/images/logo.png" width="256" height="256"> 
</p>

<p align="center">
<a href="https://travis-ci.org/faisalman/ua-parser-js"><img src="https://travis-ci.org/faisalman/ua-parser-js.svg?branch=master"></a>
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/v/ua-parser-js.svg"></a>
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/dw/ua-parser-js.svg"></a>
<a href="https://www.jsdelivr.com/package/npm/ua-parser-js"><img src="https://data.jsdelivr.com/v1/package/npm/ua-parser-js/badge"></a>
<a href="https://cdnjs.com/libraries/UAParser.js"><img src="https://img.shields.io/cdnjs/v/UAParser.js.svg"></a>
</p-->
# 51Degrees UAParser

A lightweight JavaScript library wrapping [51Degrees Device Detection](https://51degrees.com/device-detection) cloud service.  The library provides comprehensive device data based on User-Agent Client Hints and/or the User-Agent.  This package can be used either in a browser (client-side) or in Node.js environment (server-side).  Client-side supports detection of the current client or detection from an arbitrary header map, while server-side supports detection from a header map only.  

This is a fork of a popular [UAParser.js](https://github.com/faisalman/ua-parser-js) library that relied solely on a deprecated User-Agent for the local device detection.  The current library allows for an easy migration from the original UAParser.js.

For a more sophisticated solution, check out 51Degrees Device Detection Node Package: https://www.npmjs.com/package/fiftyone.devicedetection 

* Author    : Roman Sertsov <roman.sertsov@postindustria.com>
* Demo      : https://51degrees.github.io/ua-parser-js
* Source    : https://github.com/51Degrees/ua-parser-js

# Documentation

## Usage

You can use 51D UAParser in 3 easy steps.

1. **Install the package** using `npm` or other dependency manager such as `yarn`:
```
npm i @51degrees/ua-parser-js
```

2. **Register and configure a Resource Key** to use with 51Degrees Cloud service [here](https://configure.51degrees.com/S6fGMDKw) - you will need it as a required parameter to pass to UAParser function.

3. **Integrate the device detection code.**  Below there are usage examples for the client and server side:

### Client side (HTML)
Please note the `<meta http-equiv="Delegate-CH">` tag needed for the [User-Agent Client Hints delegation](#user-agent-client-hints-delegation).

```html
<!doctype html>
<html>
<head>

    <!-- note the meta tag for User-Agent Client Hint delegation -->
    <meta http-equiv="Delegate-CH" content="Sec-CH-UA-Model https://cloud.51degrees.com; 
    Sec-CH-UA https://cloud.51degrees.com; Sec-CH-UA-Arch https://cloud.51degrees.com; 
    Sec-CH-UA-Full-Version https://cloud.51degrees.com; Sec-CH-UA-Mobile https://cloud.51degrees.com; 
    Sec-CH-UA-Platform https://cloud.51degrees.com; Sec-CH-UA-Platform-Version https://cloud.51degrees.com" />

    <script src="/path/to/@51degrees/ua-parser.min.js>"></script>

    <script type="module">  
        // note the type="module" to use the top-level await
        // this code can also live in a standalone mjs file

        // helper function:
        function formatDevice (device, sep="<br />") {
            return ["DeviceType", 
              "PlatformVendor", 
              "PlatformName", 
              "PlatformVersion", 
              "BrowserVendor", 
              "BrowserName", 
              "BrowserVersion", 
              "LayoutEngine", 
              "HardwareName", 
              "HardwareModel", 
              "HardwareVendor"]
            // note that device property names are in lower case
            .map( key => key + ": " + device[key.toLowerCase()]) 
            .join(sep)
        }


        // obtain a Resource Key at https://configure.51degrees.com/S6fGMDKw
        const rk = "<your resource key>"; 

        let result = await UAParser(rk);  // note the top-level await
        let device = result.device;
        console.log(device); 
        document.body.innerHTML = formatDevice(device);
    </script>
</head>
<body>
</body>
</html>
```

### Server-side (Node.js)
This is a CommonJS example, to use a top-level `await` you need to use [ECMAScript Modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules). 

An example of processing an arbitrary header map on the server:
```js

const rk = "<your resource key>"; // obtain a Resource Key at https://configure.51degrees.com/S6fGMDKw

// an example of processing an arbitrary header map:
const context = async () => {
  const result = await UAParser(rk,{
    "sec-ch-ua":
      "Not_A Brand;v=99, Google Chrome;v=109, Chromium;v=109",
    "sec-ch-ua-arch": "x64",
    "sec-ch-ua-full-version": "109.0.5414.87",
    "sec-ch-ua-platform": "macOS",
    "sec-ch-ua-platform-version": "12.2.1",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  })
  console.log(result.device)
}
context().then();
```

An example of processing client HTTP headers received by the server:
```js
var http = require('http');
http.createServer(async function (req, res) {

  let result = await UAParser(rk,  req.headers);
  
  // a list of useful client hints to obtain from the browser
  ch = 'Sec-CH-UA, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Full-Version, \
        Sec-CH-UA-Full-Version-List, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, \
        Sec-CH-UA-Platform-Version, Sec-CH-UA-WoW64'

  // requesting UA-CH
  res.setHeader('Accept-CH', ch)   
  // asking the browser to do an immediate repetition of the request with the UA-CH sent, 
  // before rendering the page, so we can send a more detailed data in the response
  res.setHeader('Critical-CH',ch)  

  res.end(JSON.stringify(result.device));
})
.listen(1337, '127.0.0.1');
console.log('Server running at http://localhost:1337/');
```
### Using TypeScript

TypeScript is supported natively, just use a regular import syntax in TS:
```js
import UAParser from '@51degrees/ua-parser-js';
```

## API
```js
let result = await UAParser(resource-key[,header map])
```

- typeof `resource-key` is `string`
- typeof `header map` is `Map`

UAParser returns a Promise object that resolves to the [Result](#result-object) object.

Resource Key is a required parameter. **You must create and [configure a Resource Key](https://configure.51degrees.com/S6fGMDKw).** 

**Note:** Following [this link to create a Resource Key](https://configure.51degrees.com/S6fGMDKw) will prepopulate your Key with the recommended minimum properties. The properties included are:
- `IsMobile`
- `HardwareVendor`
- `HardwareModel`
- `HardwareName`
- `PlatformVendor`
- `PlatformName`
- `PlatformVersion`
- `LayoutEngine`
- `BrowserVendor`
- `BrowserName`
- `BrowserVersion`
- `JavascriptHardwareProfile` – the Resource Key must contain the `JavascriptHardwareProfile` property in order to do a reliable detection of Apple devices.
- `DeviceType`
- `SetHeaderBrowserAccept-CH`
- `SetHeaderHardwareAccept-CH`
- `SetHeaderPlatformAccept-CH`

Other properties are available, but may require the purchase of a [51Degrees pricing plan](https://51degrees.com/pricing). Follow [this guide](https://51degrees.com/documentation/_concepts__configurator.html) to create a Key from scratch if needed. 

In the browser environment you don't need to pass the header map object containing either User-Agent or User-Agent Client Hints.  If not passed 51D UAParser will detect the current device which is executing the script.  

In the server-side environment the header map is a required parameter. You must pass User-Agent Client Hints and/or the User-Agent as part of it, or simply all headers from the request `request.headers` received by the server - it should contain the needed ones. 

**Note** the `await` keyword.  Since the 51D UAParser uses a cloud service internally, the API is inherently asynchronous.

**Note** that for the current client detection in the browser you must implement [User-Agent Client Hints Delegation](#user-agent-client-hints-delegation) either via Permission-Policy header or `<meta http-equiv="Delegate-CH">` tag.

### Result object
Result object contains the `device` object with all the detected device properties:
```
result.device
```
51Degrees maintains the [rigid data model](http://51degrees.com/developers/property-dictionary).  The device data is maintained by a professional team of data analysts and is updated daily Monday through Thursday. 

## Migration from original UAParser.js

The migration from the original [UAParser.js](https://github.com/faisalman/ua-parser-js) comes down to the following steps:
1. For Node.js: replace the package name from `ua-parser-js` to `@51degrees/ua-parser-js`. For the browser provide the correct path in the src attribute to the new `@51degrees/ua-parser.min.js`. 
2. Call `UAParser` as an `async` function with the `await` keyword, or use `then` to await the Promise.
3. Use a Resource Key to configure custom device fields. A guide to create this Key can be found [here](https://51degrees.com/documentation/_concepts__configurator.html)
4. Pass the `header map` containing User-Agent Client Hints headers, instead of the User-Agent string as a parameter.
5. For the client side / html integration - implement either Accept-CH + Permission-Policy headers on your server or Delegate-CH http-equiv meta tag in order to delegate User-Agent Client Hints to 51Degrees Cloud service as described [here](#user-agent-client-hints-delegation).

This call
```js
    let result = UAParser([user-agent][,extension])
```
now becomes:
```js
    let result = await UAParser(resource-key[,header map])
```
Make sure the code is running within the async context (async function) or within the ECMAScript module context where top-level `await` is supported.

6. Refrain from using the old UAParser constructor (`new UAParser`) - this approach has been deprecated.  `UAParser` now returns a Promise, that must be `await`ed or `then`ed - thus constructing an object does not make sense.

### Deprecations
1. Constructor (a call to `new UAParser`) is no longer supported.
2. Methods `setUA()`, `getUA()`, and `getResult()` are no longer supported and will throw if called on the UAParser Promise object. 

### Original UAParser properties mapping
To support existing code we made an effort to map the 51Degrees data model to that of the original [UAParser.js](https://github.com/faisalman/ua-parser-js) data model:
```js
{
    ua: '',
    browser: { name: '', version: '' },
    cpu: { architecture: '' },
    device: { model: '', type: '', vendor: '' },
    engine: { name: '', version: '' },
    os: { name: '', version: '' }
}
```

The current library makes the best effort to map 51Degrees values to the original value ranges provided by UAParser.js to minimize breaking changes in the updated code. 


### New data points

Besides maintaining the mappings to the original UAParser properties, 51Degrees significantly expands the set of available data points.  Data points are made available dynamically depending on the Resource Key configuration.  All the data points are keyed as lower case properties within the `device` property of the `result` object, see an example `result` object below:

```js
{
    ...
    device: {
        batterycapacity: 2770,
        devicetype: "SmartPhone",
        hardwaremodel: "Pixel",
        hardwarename: [
            "Pixel"
        ],
        hardwarerank: 1524,
        hardwarevendor: "Google",
        hasremovablebattery: false,
        ismobile: true,
        supportedchargertypes: [
            "Qualcomm Quick Charge 3.0",
            "Wire"
        ],
        model: "Pixel",  //original property
        type: "mobile",  //original property
        vendor: "Google" //original property
    },
    ...
}
```

Please refer to the [51Degrees Configurator](https://configure.51degrees.com) for a full list of the data points available.


## User-Agent Client Hints Delegation

Migrating to User-Agent Client Hints for your web app is well described in many sources, for example, this WICG [draft report on UA-CH](https://wicg.github.io/ua-client-hints/) or this human-readable [article](https://web.dev/migrate-to-ua-ch/).

Any request the web browser sends contains the so-called low-entropy User-Agent Client Hints, namely these three:
- `Sec-CH-UA`
- `Sec-CH-UA-Mobile`
- `Sec-CH-UA-Platform`

To request additional high-entropy UA-CH headers one must specify them in the `Accept-CH` header, this will tell the browser to send them in the subsequent request to the first-party server.  
```
Accept-CH: Sec-CH-UA, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Full-Version, Sec-CH-UA-Full-Version-List, 
Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-WoW64
```

Then the browser will send these headers to any URL of the first-party domain, but not to the third-party domain. 

In order for these headers to be sent to the third-party domain, the first-party server must also specify a `Permissions-Policy` header in the response.  Permissions-Policy enables cross-origin User-Agent Client Hints delegation.

Since 51D UAParser just wraps calls to a third-party service hosted at https://cloud.51degrees.com, you must allow delegating hints to that service.

Here is the `Permissions-Policy` header that must be in your first-party server response (serving the original page content):

```
Permissions-Policy: ch-ua=("https://cloud.51degrees.com"), ch-ua-arch=("https://cloud.51degrees.com"),  
ch-ua-bitness=("https://cloud.51degrees.com"), ch-ua-mobile=("https://cloud.51degrees.com"), 
ch-ua-model=("https://cloud.51degrees.com"), ch-ua-platform=("https://cloud.51degrees.com"), 
ch-ua-platform-version=("https://cloud.51degrees.com"), ch-ua-full-version=("https://cloud.51degrees.com"), 
ch-ua-full-version-list=("https://cloud.51degrees.com"), ch-ua-wow64=("https://cloud.51degrees.com")
```

**Note:** `Accept-CH` header must also be set. 

### User-Agent Client Hints Delegation in HTML
Alternatively (in case you can't modify your server headers), you can provide a <meta http-equiv="Delegate-CH"> tag in the page header: 

```html
<meta http-equiv="Delegate-CH" content="Sec-CH-UA-Model https://cloud.51degrees.com; 
Sec-CH-UA https://cloud.51degrees.com; Sec-CH-UA-Arch https://cloud.51degrees.com; 
Sec-CH-UA-Full-Version https://cloud.51degrees.com; Sec-CH-UA-Mobile https://cloud.51degrees.com; 
Sec-CH-UA-Platform https://cloud.51degrees.com; Sec-CH-UA-Platform-Version https://cloud.51degrees.com" />
```


