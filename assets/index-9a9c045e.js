(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function e(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerpolicy&&(s.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?s.credentials="include":c.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(c){if(c.ep)return;c.ep=!0;const s=e(c);fetch(c.href,s)}})();var j,C,k,te,X,M,U,G,V;j=document.getElementsByClassName("custom-select");te=j.length;for(C=0;C<te;C++){for(M=j[C].getElementsByTagName("select")[0],X=M.length,U=document.createElement("DIV"),U.setAttribute("class","select-selected"),U.innerHTML=M.options[M.selectedIndex].innerHTML,j[C].appendChild(U),G=document.createElement("DIV"),G.setAttribute("class","select-items select-hide"),k=1;k<X;k++)V=document.createElement("DIV"),V.innerHTML=M.options[k].innerHTML,V.addEventListener("click",function(r){var t,e,o,c,s,d,p;for(c=this.parentNode.parentNode.getElementsByTagName("select")[0],d=c.length,s=this.parentNode.previousSibling,e=0;e<d;e++)if(c.options[e].innerHTML==this.innerHTML){for(c.selectedIndex=e,s.innerHTML=this.innerHTML,t=this.parentNode.getElementsByClassName("same-as-selected"),p=t.length,o=0;o<p;o++)t[o].removeAttribute("class");this.setAttribute("class","same-as-selected");break}s.click(),c.dispatchEvent(new Event("change"))}),G.appendChild(V);j[C].appendChild(G),U.addEventListener("click",function(r){r.stopPropagation(),re(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}function re(r){var t,e,o,c,s,d=[];for(t=document.getElementsByClassName("select-items"),e=document.getElementsByClassName("select-selected"),c=t.length,s=e.length,o=0;o<s;o++)r==e[o]?d.push(o):e[o].classList.remove("select-arrow-active");for(o=0;o<c;o++)d.indexOf(o)&&t[o].classList.add("select-hide")}document.addEventListener("click",re);const de=(r,t,e)=>{const o=document.createElement("div");o.classList.add("CH-parsed__item");const c=fe(r,e),s=pe(t);return o.appendChild(c),o.appendChild(s),o},fe=(r,t)=>{const e=document.createElement("div");e.classList.add("CH-parsed__title");const o=document.createElement("i");return o.classList.add("icon"),o.classList.add(t),e.innerText=`${r}:`,e.prepend(o),e},pe=r=>{const t=document.createElement("div");return t.classList.add("CH-parsed__value"),r.forEach(e=>{const o=document.createElement("span");o.innerText=e,t.appendChild(o)}),t},he=(r,t)=>{const e=document.getElementById(r);console.log(t);for(const[o,c]of Object.entries(t)){const s=document.createElement("div"),d=document.createElement("span");d.innerText=o;const p=document.createTextNode(`: ${c}`);s.appendChild(d),s.appendChild(p),e.appendChild(s)}return e};var E;(function(r){r.DOM_NOT_FOUND="UAParser is not running in the browser context (no DOM available), you must pass header map as a parameter to do the explicit device detection.",r.REQUIRED_RESOURCE_KEY="Resource key required. Configure one at https://configure.51degrees.com/S6fGMDKw",r.EMPTY_RESOURCE_KEY="Empty resource key provided. Configure one at https://configure.51degrees.com/S6fGMDKw",r.INCOMPLETE_HEADER_MAP="Incomplete header map. Must include either User-Agent or Sec-CH-UA header.",r.ATTEMPT_TO_USE_USER_AGENT="You are trying to use the legacy UAParser and pass User-Agent string as a parameter, please refer to the new API: await UAParser([resource-key][, header-map]).  Configure a resource key at https://configure.51degrees.com",r.INVALID_RESOURCE_KEY="Invalid resource key. Configure one at https://configure.51degrees.com/S6fGMDKw",r.HEADERS_NOT_HASHMAP="Invalid header map. Header map object must be a valid hash map.",r.INVALID_HEADERS_VALUE="Invalid header map. Header values must be of type string.",r.PROMISE_MISUSE="You are likely using a legacy API. The new UAParser call returns a promise that must be awaited."})(E||(E={}));var z;(function(r){r.USING_DEFAULT_KEY="Resource key not provided. Using default resource key"})(z||(z={}));var Z={get:function(t,e){if(e==="then"||e==="catch")return t[e].bind(t);if(t instanceof Promise)throw new Error(E.PROMISE_MISUSE);return Reflect.get(t,e)}};function x(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);t&&(o=o.filter(function(c){return Object.getOwnPropertyDescriptor(r,c).enumerable})),e.push.apply(e,o)}return e}function me(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?x(Object(e),!0).forEach(function(o){ve(r,o,e[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):x(Object(e)).forEach(function(o){Object.defineProperty(r,o,Object.getOwnPropertyDescriptor(e,o))})}return r}function S(){S=function(){return r};var r={},t=Object.prototype,e=t.hasOwnProperty,o=Object.defineProperty||function(a,n,i){a[n]=i.value},c=typeof Symbol=="function"?Symbol:{},s=c.iterator||"@@iterator",d=c.asyncIterator||"@@asyncIterator",p=c.toStringTag||"@@toStringTag";function h(a,n,i){return Object.defineProperty(a,n,{value:i,enumerable:!0,configurable:!0,writable:!0}),a[n]}try{h({},"")}catch{h=function(n,i,l){return n[i]=l}}function m(a,n,i,l){var u=n&&n.prototype instanceof v?n:v,f=Object.create(u.prototype),g=new Y(l||[]);return o(f,"_invoke",{value:ue(a,i,g)}),f}function P(a,n,i){try{return{type:"normal",arg:a.call(n,i)}}catch(l){return{type:"throw",arg:l}}}r.wrap=m;var b={};function v(){}function T(){}function L(){}var O={};h(O,s,function(){return this});var I=Object.getPrototypeOf,_=I&&I(I(q([])));_&&_!==t&&e.call(_,s)&&(O=_);var N=L.prototype=v.prototype=Object.create(O);function J(a){["next","throw","return"].forEach(function(n){h(a,n,function(i){return this._invoke(n,i)})})}function H(a,n){function i(u,f,g,y){var w=P(a[u],a,f);if(w.type!=="throw"){var R=w.arg,D=R.value;return D&&typeof D=="object"&&e.call(D,"__await")?n.resolve(D.__await).then(function(A){i("next",A,g,y)},function(A){i("throw",A,g,y)}):n.resolve(D).then(function(A){R.value=A,g(R)},function(A){return i("throw",A,g,y)})}y(w.arg)}var l;o(this,"_invoke",{value:function(u,f){function g(){return new n(function(y,w){i(u,f,y,w)})}return l=l?l.then(g,g):g()}})}function ue(a,n,i){var l="suspendedStart";return function(u,f){if(l==="executing")throw new Error("Generator is already running");if(l==="completed"){if(u==="throw")throw f;return W()}for(i.method=u,i.arg=f;;){var g=i.delegate;if(g){var y=F(g,i);if(y){if(y===b)continue;return y}}if(i.method==="next")i.sent=i._sent=i.arg;else if(i.method==="throw"){if(l==="suspendedStart")throw l="completed",i.arg;i.dispatchException(i.arg)}else i.method==="return"&&i.abrupt("return",i.arg);l="executing";var w=P(a,n,i);if(w.type==="normal"){if(l=i.done?"completed":"suspendedYield",w.arg===b)continue;return{value:w.arg,done:i.done}}w.type==="throw"&&(l="completed",i.method="throw",i.arg=w.arg)}}}function F(a,n){var i=n.method,l=a.iterator[i];if(l===void 0)return n.delegate=null,i==="throw"&&a.iterator.return&&(n.method="return",n.arg=void 0,F(a,n),n.method==="throw")||i!=="return"&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+i+"' method")),b;var u=P(l,a.iterator,n.arg);if(u.type==="throw")return n.method="throw",n.arg=u.arg,n.delegate=null,b;var f=u.arg;return f?f.done?(n[a.resultName]=f.value,n.next=a.nextLoc,n.method!=="return"&&(n.method="next",n.arg=void 0),n.delegate=null,b):f:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,b)}function le(a){var n={tryLoc:a[0]};1 in a&&(n.catchLoc=a[1]),2 in a&&(n.finallyLoc=a[2],n.afterLoc=a[3]),this.tryEntries.push(n)}function $(a){var n=a.completion||{};n.type="normal",delete n.arg,a.completion=n}function Y(a){this.tryEntries=[{tryLoc:"root"}],a.forEach(le,this),this.reset(!0)}function q(a){if(a){var n=a[s];if(n)return n.call(a);if(typeof a.next=="function")return a;if(!isNaN(a.length)){var i=-1,l=function u(){for(;++i<a.length;)if(e.call(a,i))return u.value=a[i],u.done=!1,u;return u.value=void 0,u.done=!0,u};return l.next=l}}return{next:W}}function W(){return{value:void 0,done:!0}}return T.prototype=L,o(N,"constructor",{value:L,configurable:!0}),o(L,"constructor",{value:T,configurable:!0}),T.displayName=h(L,p,"GeneratorFunction"),r.isGeneratorFunction=function(a){var n=typeof a=="function"&&a.constructor;return!!n&&(n===T||(n.displayName||n.name)==="GeneratorFunction")},r.mark=function(a){return Object.setPrototypeOf?Object.setPrototypeOf(a,L):(a.__proto__=L,h(a,p,"GeneratorFunction")),a.prototype=Object.create(N),a},r.awrap=function(a){return{__await:a}},J(H.prototype),h(H.prototype,d,function(){return this}),r.AsyncIterator=H,r.async=function(a,n,i,l,u){u===void 0&&(u=Promise);var f=new H(m(a,n,i,l),u);return r.isGeneratorFunction(n)?f:f.next().then(function(g){return g.done?g.value:f.next()})},J(N),h(N,p,"Generator"),h(N,s,function(){return this}),h(N,"toString",function(){return"[object Generator]"}),r.keys=function(a){var n=Object(a),i=[];for(var l in n)i.push(l);return i.reverse(),function u(){for(;i.length;){var f=i.pop();if(f in n)return u.value=f,u.done=!1,u}return u.done=!0,u}},r.values=q,Y.prototype={constructor:Y,reset:function(a){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach($),!a)for(var n in this)n.charAt(0)==="t"&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var a=this.tryEntries[0].completion;if(a.type==="throw")throw a.arg;return this.rval},dispatchException:function(a){if(this.done)throw a;var n=this;function i(w,R){return f.type="throw",f.arg=a,n.next=w,R&&(n.method="next",n.arg=void 0),!!R}for(var l=this.tryEntries.length-1;l>=0;--l){var u=this.tryEntries[l],f=u.completion;if(u.tryLoc==="root")return i("end");if(u.tryLoc<=this.prev){var g=e.call(u,"catchLoc"),y=e.call(u,"finallyLoc");if(g&&y){if(this.prev<u.catchLoc)return i(u.catchLoc,!0);if(this.prev<u.finallyLoc)return i(u.finallyLoc)}else if(g){if(this.prev<u.catchLoc)return i(u.catchLoc,!0)}else{if(!y)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return i(u.finallyLoc)}}}},abrupt:function(a,n){for(var i=this.tryEntries.length-1;i>=0;--i){var l=this.tryEntries[i];if(l.tryLoc<=this.prev&&e.call(l,"finallyLoc")&&this.prev<l.finallyLoc){var u=l;break}}u&&(a==="break"||a==="continue")&&u.tryLoc<=n&&n<=u.finallyLoc&&(u=null);var f=u?u.completion:{};return f.type=a,f.arg=n,u?(this.method="next",this.next=u.finallyLoc,b):this.complete(f)},complete:function(a,n){if(a.type==="throw")throw a.arg;return a.type==="break"||a.type==="continue"?this.next=a.arg:a.type==="return"?(this.rval=this.arg=a.arg,this.method="return",this.next="end"):a.type==="normal"&&n&&(this.next=n),b},finish:function(a){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.finallyLoc===a)return this.complete(i.completion,i.afterLoc),$(i),b}},catch:function(a){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc===a){var l=i.completion;if(l.type==="throw"){var u=l.arg;$(i)}return u}}throw new Error("illegal catch attempt")},delegateYield:function(a,n,i){return this.delegate={iterator:q(a),resultName:n,nextLoc:i},this.method==="next"&&(this.arg=void 0),b}},r}function ee(r,t,e,o,c,s,d){try{var p=r[s](d),h=p.value}catch(m){e(m);return}p.done?t(h):Promise.resolve(h).then(o,c)}function Q(r){return function(){var t=this,e=arguments;return new Promise(function(o,c){var s=r.apply(t,e);function d(h){ee(s,o,c,d,p,"next",h)}function p(h){ee(s,o,c,d,p,"throw",h)}d(void 0)})}}function ve(r,t,e){return t=ye(t),t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function ge(r,t){if(typeof r!="object"||r===null)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var o=e.call(r,t||"default");if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function ye(r){var t=ge(r,"string");return typeof t=="symbol"?t:String(t)}var we=["getCPU","getResult","getBrowser","getDevice","getEngine","getOS","getUA","setUA"],ne={get:function(t,e){if(we.includes(e))throw new Error("Method ".concat(e," deprecated. Use result object properties directly. result.device contains new 51Degrees data points."));return Reflect.get(t,e)}},K={browser:{name:"BrowserName",version:"BrowserVersion"},cpu:{architecture:"Unknown"},device:{model:"HardwareModel",type:"DeviceType",vendor:"HardwareVendor"},engine:{name:"LayoutEngine",version:"Unknown"},os:{name:"PlatformName",version:"PlatformVersion"}},oe=function(t){var e=me({},t);return Object.keys(K).forEach(function(o){e[o]||(e[o]={}),Object.keys(K[o]).forEach(function(c){var s=K[o][c].toLowerCase();e[o][c]=e.device[s]||void 0})}),e},Ee=function(){var r=Q(S().mark(function t(e){var o;return S().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,o=document.createElement("script"),o.type="text/javascript",o.async=!0,o.src="https://cloud.51degrees.com/api/v4/".concat(e,".js?cloud.client.product=ua-parser"),document.head.appendChild(o),s.abrupt("return",new Promise(function(d,p){o.onload=function(){fod.complete(function(h){var m=oe(h),P=new Proxy(m,ne);d(P)})},o.onerror=function(){p("UAParser-51D device detection failed to load javascript resource")}}));case 9:throw s.prev=9,s.t0=s.catch(0),new Error("Injection request failed: ".concat(s.t0));case 12:case"end":return s.stop()}},t,null,[[0,9]])}));return function(e){return r.apply(this,arguments)}}(),be={getJSONRequest:function(t,e){return Le(new URL("https://cloud.51degrees.com/api/v4/".concat(t,".json?cloud.client.product=ua-parser")),e)}},Le=function(){var r=Q(S().mark(function t(e,o){var c,s,d,p,h,m,P;return S().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:if(c="&"+new URLSearchParams(o).toString(),!(typeof window<"u")){v.next=17;break}return v.prev=2,v.next=5,fetch(e+c);case 5:return s=v.sent,v.next=8,s.json();case 8:return d=v.sent,v.abrupt("return",{status:s.status,response:d});case 12:throw v.prev=12,v.t0=v.catch(2),new Error("Request failed: ".concat(v.t0));case 15:v.next=22;break;case 17:return p=require("http"),h=require("https"),m=e.protocol==="http:"?p:h,P={hostname:e.hostname,port:e.port,path:e.pathname+c,method:"GET"},v.abrupt("return",new Promise(function(T,L){m.get(P,function(O){var I="";O.on("data",function(_){I+=_}),O.on("end",function(){T({status:O.statusCode,response:JSON.parse(I)})})}).on("error",function(O){L(new Error("Request failed: ".concat(O)))})}));case 22:case"end":return v.stop()}},t,null,[[2,12]])}));return function(e,o){return r.apply(this,arguments)}}(),Oe=function(){var r=Q(S().mark(function t(e,o){var c,s,d,p;return S().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.prev=0,m.next=3,be.getJSONRequest(e,o);case 3:if(c=m.sent,s=c.status,d=c.response,s!==200){m.next=11;break}return p=oe(d),m.abrupt("return",new Proxy(p,ne));case 11:throw new Error(d.errors.at(0));case 12:m.next=17;break;case 14:throw m.prev=14,m.t0=m.catch(0),m.t0;case 17:case"end":return m.stop()}},t,null,[[0,14]])}));return function(e,o){return r.apply(this,arguments)}}(),ae=function(t,e){if(!t)throw Error(E.REQUIRED_RESOURCE_KEY);if(t.length<=0)throw Error(E.EMPTY_RESOURCE_KEY);if(/\s/g.test(t))throw Error(E.ATTEMPT_TO_USE_USER_AGENT);if(t.length<4)throw Error(E.INVALID_RESOURCE_KEY);if(typeof window<"u"){if(!e)return new Proxy(Ee(t),Z)}else if(!e)throw new Error(E.DOM_NOT_FOUND);if(Object.keys(e).length<=0)throw Error(E.INCOMPLETE_HEADER_MAP);if(Object.keys(e).length<=0)throw Error(E.HEADERS_NOT_HASHMAP);if(Object.keys(e).some(function(o){return typeof e[o]!="string"}))throw Error(E.INVALID_HEADERS_VALUE);if(!Object.keys(e).some(function(o){return o.toLowerCase()==="user-agent"||o.toLowerCase().includes("sec-ch")}))throw Error(E.INCOMPLETE_HEADER_MAP);return new Proxy(Oe(t,e),Z)};const Pe=[{label:"Browser",icon:"browser-icon",values:["browsername","browserversion"]},{label:"Engine",icon:"gear-icon",values:["layoutengine"]},{label:"OS",icon:"point-icon",values:["platformname","platformversion"]},{label:"Type",icon:"laptop-icon",values:["devicetype"]},{label:"Hardware",icon:"gear-icon",values:["hardwarename","hardwarevendor"]},{label:"Model",icon:"gear-icon",values:["hardwaremodel"]}],ie=async()=>{const o=document.getElementById("headers-list").value.split(`
`).reduce((s,d)=>{const[p,h]=d.split(":");return s[p]="",s[p]=h.replace(/['"]+/g,"").replace("\\").trim(),s},{}),c=await ae("AQQ-BCqfIeuOA4ji2kg",o);se(c)},Ae=async()=>{const r=await ae("AQQ-BCqfIeuOA4ji2kg");se(r)},se=r=>{const t=document.getElementById("parser-result");t.innerHTML="",Pe.forEach(e=>{const o=e.values.flatMap(s=>r.device[s]).filter(s=>s!=null).filter(s=>Array.isArray(s)?s:s.toLowerCase()!=="unknown");if(o.length<=0)return;const c=de(e.label,o,e.icon);t.appendChild(c)})};Ae().then();const Se=document.getElementById("grab-textarea");Se.addEventListener("click",ie);const Te=async r=>{const t=r.target.value,e=document.getElementById("headers-list");e.value=t,await ie()},Ie=document.getElementById("user-agent-selector");Ie.addEventListener("change",Te);const _e=async()=>{const r=await ce(),t=Object.entries(r).map(e=>{const[o,c]=e;return`${o}: ${c}`}).join(`
`);navigator.clipboard.writeText(t).then(()=>{alert("Copied to clipboard")})},Ne=document.getElementById("copy-to-clipboard");Ne.addEventListener("click",_e);const ce=async()=>{const r={};if(navigator.userAgentData){const t=await navigator.userAgentData.getHighEntropyValues(["architecture","bitness","model","platformVersion","fullVersionList"]);B(t.brands)&&(r["sec-ch-ua"]=`${B(t.brands)}`),t.bitness&&(r["sec-ch-arch"]=`"x${t.bitness}"`),B(t.fullVersionList)&&(r["sec-ch-ua-full-version-list"]=`${B(t.fullVersionList)}`),t.platform&&(r["sec-ch-ua-platform"]=`"${t.platform}"`),t.platformVersion&&(r["sec-ch-ua-platform-version"]=`"${t.platformVersion}"`)}return r["user-agent"]=navigator.userAgent,r},B=r=>r.reduce((t,e)=>(t.push(`"${e.brand}";v="${e.version}"`),t),[]).join(", "),Re=async()=>{const r=await ce();he("headers-listing",r)};Re().then();
