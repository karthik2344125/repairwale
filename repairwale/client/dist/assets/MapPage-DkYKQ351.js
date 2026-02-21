import{j as h,r as b,u as Yh,a as Xh}from"./index-TLEbH3MQ.js";import{B as Hs}from"./Button-BfaPFI1m.js";import{l as Jh,L as Oe}from"./leaflet-DtUiGvhr.js";const Zh=({size:n=20})=>h.jsxs("svg",{width:n,height:n,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[h.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",fill:"currentColor"}),h.jsx("circle",{cx:"12",cy:"9",r:"2.5",fill:"var(--panel)"})]});function ed({mechanics:n=[],onCall:e,onRequest:t,onChat:r}){return n.length?h.jsxs("div",{children:[h.jsxs("h3",{style:{marginTop:0,display:"flex",alignItems:"center",gap:8},children:[h.jsx("span",{children:"Mechanics Nearby"}),h.jsxs("span",{style:{fontSize:12,color:"var(--muted)"},children:["(",n.length,")"]})]}),h.jsx("div",{children:n.map(s=>h.jsx("div",{className:"mechanicItem card",style:{marginBottom:10},children:h.jsxs("div",{className:"mechanicRow",style:{alignItems:"center"},children:[h.jsxs("div",{className:"mechanicInfo",children:[h.jsx("div",{className:"iconWrap",children:h.jsx(Zh,{size:20})}),h.jsxs("div",{children:[h.jsx("div",{className:"mechanicName",style:{fontWeight:600},children:s.name}),h.jsx("div",{className:"muted",style:{fontSize:12},children:h.jsxs("small",{children:[s.rating?`${s.rating} ★`:"Rating N/A",typeof s.distanceKm=="number"?` • ${s.distanceKm} km away`:""]})})]})]}),h.jsxs("div",{className:"mechanicActions",style:{display:"flex",gap:8,alignItems:"center"},children:[h.jsx(Hs,{variant:"ghost",size:"sm",onClick:()=>t&&t(s),children:"Request"}),r&&h.jsx(Hs,{variant:"ghost",size:"sm",onClick:()=>r(s),style:{background:"rgba(59,130,246,0.1)",color:"#3b82f6"},children:"💬"}),h.jsx(Hs,{variant:"primary",size:"sm",onClick:()=>{const i=s.phone||`9${String(s.id).replace(/\D/g,"").slice(-9).padStart(9,"5")}`;e?e(s,i):window.open(`tel:${i}`)},children:"Call"})]})]})},s.id))})]}):h.jsxs("div",{className:"card",style:{padding:16,textAlign:"center",color:"var(--text-muted)"},children:[h.jsx("div",{style:{fontWeight:600,marginBottom:6},children:"No mechanics found in this radius."}),h.jsx("div",{style:{fontSize:13},children:"Try widening the radius or enable location to improve accuracy."})]})}b.memo(ed);function td({requests:n=[],onSelect:e}){return h.jsxs("div",{style:{marginTop:12},children:[h.jsx("h3",{style:{marginTop:0},children:"Requests"}),h.jsx("div",{children:n.map(t=>h.jsx("div",{className:"requestListItem",onClick:()=>e(t),children:h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[h.jsxs("div",{children:[h.jsx("strong",{children:t.customerName}),h.jsx("div",{style:{fontSize:13,color:"#666"},children:t.problem})]}),h.jsx("div",{style:{textAlign:"right"},children:h.jsx("small",{style:{color:"#666"},children:t.status})})]})},t.id))})]})}b.memo(td);var ca={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},nd=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Lc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let f=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(f=64)),r.push(t[u],t[d],t[f],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Pc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):nd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||a==null||l==null||d==null)throw new rd;const f=i<<2|a>>4;if(r.push(f),l!==64){const g=a<<4&240|l>>2;if(r.push(g),d!==64){const I=l<<6&192|d;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sd=function(n){const e=Pc(n);return Lc.encodeByteArray(e,!0)},Fr=function(n){return sd(n).replace(/\./g,"")},Uc=function(n){try{return Lc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=()=>id().__FIREBASE_DEFAULTS__,ad=()=>{if(typeof process>"u"||typeof ca>"u")return;const n=ca.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Uc(n[1]);return e&&JSON.parse(e)},Hi=()=>{try{return od()||ad()||cd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Fc=n=>{var e,t;return(t=(e=Hi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ld=n=>{const e=Fc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},jc=()=>{var n;return(n=Hi())===null||n===void 0?void 0:n.config},Vc=n=>{var e;return(e=Hi())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Fr(JSON.stringify(t)),Fr(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function dd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())}function fd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function pd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gd(){const n=ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function md(){try{return typeof indexedDB=="object"}catch{return!1}}function yd(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="FirebaseError";class tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=vd,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xn.prototype.create)}}class Xn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?wd(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new tt(s,a,r)}}function wd(n,e){return n.replace(Id,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Id=/\{\$([^}]+)}/g;function Ed(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function jr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(la(i)&&la(o)){if(!jr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function la(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Td(n,e){const t=new _d(n,e);return t.subscribe.bind(t)}class _d{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");bd(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ks),s.error===void 0&&(s.error=Ks),s.complete===void 0&&(s.complete=Ks);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ks(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(n){return n&&n._delegate?n._delegate:n}class Dt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ud;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kd(e))try{this.getOrInitializeService({instanceIdentifier:St})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=St){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=St){return this.instances.has(e)}getOptions(e=St){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=St){return this.component?this.component.multipleInstances?e:St:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xd(n){return n===St?void 0:n}function kd(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Sd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(P||(P={}));const Ad={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Rd=P.INFO,Nd={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},Dd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Nd[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ki{constructor(e){this.name=e,this._logLevel=Rd,this._logHandler=Dd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ad[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const Md=(n,e)=>e.some(t=>n instanceof t);let ua,ha;function Od(){return ua||(ua=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pd(){return ha||(ha=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $c=new WeakMap,fi=new WeakMap,Bc=new WeakMap,Gs=new WeakMap,Gi=new WeakMap;function Ld(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(lt(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&$c.set(t,n)}).catch(()=>{}),Gi.set(e,n),e}function Ud(n){if(fi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});fi.set(n,e)}let pi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return fi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Bc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return lt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Fd(n){pi=n(pi)}function jd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Qs(this),e,...t);return Bc.set(r,e.sort?e.sort():[e]),lt(r)}:Pd().includes(n)?function(...e){return n.apply(Qs(this),e),lt($c.get(this))}:function(...e){return lt(n.apply(Qs(this),e))}}function Vd(n){return typeof n=="function"?jd(n):(n instanceof IDBTransaction&&Ud(n),Md(n,Od())?new Proxy(n,pi):n)}function lt(n){if(n instanceof IDBRequest)return Ld(n);if(Gs.has(n))return Gs.get(n);const e=Vd(n);return e!==n&&(Gs.set(n,e),Gi.set(e,n)),e}const Qs=n=>Gi.get(n);function $d(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),a=lt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(lt(o.result),c.oldVersion,c.newVersion,lt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Bd=["get","getKey","getAll","getAllKeys","count"],zd=["put","add","delete","clear"],Ys=new Map;function da(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ys.get(e))return Ys.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=zd.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Bd.includes(t)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return Ys.set(e,i),i}Fd(n=>({...n,get:(e,t,r)=>da(e,t)||n.get(e,t,r),has:(e,t)=>!!da(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Wd(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Wd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const gi="@firebase/app",fa="0.9.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=new Ki("@firebase/app"),Hd="@firebase/app-compat",Kd="@firebase/analytics-compat",Gd="@firebase/analytics",Qd="@firebase/app-check-compat",Yd="@firebase/app-check",Xd="@firebase/auth",Jd="@firebase/auth-compat",Zd="@firebase/database",ef="@firebase/database-compat",tf="@firebase/functions",nf="@firebase/functions-compat",rf="@firebase/installations",sf="@firebase/installations-compat",of="@firebase/messaging",af="@firebase/messaging-compat",cf="@firebase/performance",lf="@firebase/performance-compat",uf="@firebase/remote-config",hf="@firebase/remote-config-compat",df="@firebase/storage",ff="@firebase/storage-compat",pf="@firebase/firestore",gf="@firebase/firestore-compat",mf="firebase",yf="9.23.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi="[DEFAULT]",vf={[gi]:"fire-core",[Hd]:"fire-core-compat",[Gd]:"fire-analytics",[Kd]:"fire-analytics-compat",[Yd]:"fire-app-check",[Qd]:"fire-app-check-compat",[Xd]:"fire-auth",[Jd]:"fire-auth-compat",[Zd]:"fire-rtdb",[ef]:"fire-rtdb-compat",[tf]:"fire-fn",[nf]:"fire-fn-compat",[rf]:"fire-iid",[sf]:"fire-iid-compat",[of]:"fire-fcm",[af]:"fire-fcm-compat",[cf]:"fire-perf",[lf]:"fire-perf-compat",[uf]:"fire-rc",[hf]:"fire-rc-compat",[df]:"fire-gcs",[ff]:"fire-gcs-compat",[pf]:"fire-fst",[gf]:"fire-fst-compat","fire-js":"fire-js",[mf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Map,yi=new Map;function wf(n,e){try{n.container.addComponent(e)}catch(t){Mt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function en(n){const e=n.name;if(yi.has(e))return Mt.debug(`There were multiple attempts to register component ${e}.`),!1;yi.set(e,n);for(const t of Vr.values())wf(t,n);return!0}function Qi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},ut=new Xn("app","Firebase",If);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ut.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=yf;function zc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:mi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ut.create("bad-app-name",{appName:String(s)});if(t||(t=jc()),!t)throw ut.create("no-options");const i=Vr.get(s);if(i){if(jr(t,i.options)&&jr(r,i.config))return i;throw ut.create("duplicate-app",{appName:s})}const o=new Cd(s);for(const c of yi.values())o.addComponent(c);const a=new Ef(t,r,o);return Vr.set(s,a),a}function qc(n=mi){const e=Vr.get(n);if(!e&&n===mi&&jc())return zc();if(!e)throw ut.create("no-app",{appName:n});return e}function ht(n,e,t){var r;let s=(r=vf[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Mt.warn(a.join(" "));return}en(new Dt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="firebase-heartbeat-database",_f=1,Mn="firebase-heartbeat-store";let Xs=null;function Wc(){return Xs||(Xs=$d(Tf,_f,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Mn)}}}).catch(n=>{throw ut.create("idb-open",{originalErrorMessage:n.message})})),Xs}async function bf(n){try{return await(await Wc()).transaction(Mn).objectStore(Mn).get(Hc(n))}catch(e){if(e instanceof tt)Mt.warn(e.message);else{const t=ut.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Mt.warn(t.message)}}}async function pa(n,e){try{const r=(await Wc()).transaction(Mn,"readwrite");await r.objectStore(Mn).put(e,Hc(n)),await r.done}catch(t){if(t instanceof tt)Mt.warn(t.message);else{const r=ut.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Mt.warn(r.message)}}}function Hc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf=1024,xf=30*24*60*60*1e3;class kf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Af(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ga();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=xf}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ga(),{heartbeatsToSend:t,unsentEntries:r}=Cf(this._heartbeatsCache.heartbeats),s=Fr(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function ga(){return new Date().toISOString().substring(0,10)}function Cf(n,e=Sf){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),ma(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ma(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Af{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return md()?yd().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await bf(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return pa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return pa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ma(n){return Fr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n){en(new Dt("platform-logger",e=>new qd(e),"PRIVATE")),en(new Dt("heartbeat",e=>new kf(e),"PRIVATE")),ht(gi,fa,n),ht(gi,fa,"esm2017"),ht("fire-js","")}Rf("");var Nf="firebase",Df="9.23.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ht(Nf,Df,"app");function Yi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Kc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Mf=Kc,Gc=new Xn("auth","Firebase",Kc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new Ki("@firebase/auth");function Of(n,...e){$r.logLevel<=P.WARN&&$r.warn(`Auth (${un}): ${n}`,...e)}function Ar(n,...e){$r.logLevel<=P.ERROR&&$r.error(`Auth (${un}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(n,...e){throw Xi(n,...e)}function Fe(n,...e){return Xi(n,...e)}function Pf(n,e,t){const r=Object.assign(Object.assign({},Mf()),{[e]:t});return new Xn("auth","Firebase",r).create(e,{appName:n.name})}function Xi(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Gc.create(n,...e)}function R(n,e,...t){if(!n)throw Xi(e,...t)}function We(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ar(e),new Error(e)}function Ye(n,e){n||We(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Lf(){return ya()==="http:"||ya()==="https:"}function ya(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Lf()||fd()||"connection"in navigator)?navigator.onLine:!0}function Ff(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ye(t>e,"Short delay should be less than long delay!"),this.isMobile=dd()||pd()}get(){return Uf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(n,e){Ye(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;We("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;We("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;We("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=new Zn(3e4,6e4);function Zi(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function er(n,e,t,r,s={}){return Yc(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=Jn(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),Qc.fetch()(Jc(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function Yc(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},jf),e);try{const s=new $f(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw vr(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw vr(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw vr(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw vr(n,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Pf(n,u,l);Qe(n,u)}}catch(s){if(s instanceof tt)throw s;Qe(n,"network-request-failed",{message:String(s)})}}async function Xc(n,e,t,r,s={}){const i=await er(n,e,t,r,s);return"mfaPendingCredential"in i&&Qe(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Jc(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Ji(n.config,s):`${n.config.apiScheme}://${s}`}class $f{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Fe(this.auth,"network-request-failed")),Vf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function vr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Fe(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bf(n,e){return er(n,"POST","/v1/accounts:delete",e)}async function zf(n,e){return er(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qf(n,e=!1){const t=_e(n),r=await t.getIdToken(e),s=eo(r);R(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:kn(Js(s.auth_time)),issuedAtTime:kn(Js(s.iat)),expirationTime:kn(Js(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Js(n){return Number(n)*1e3}function eo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ar("JWT malformed, contained fewer than 3 sections"),null;try{const s=Uc(t);return s?JSON.parse(s):(Ar("Failed to decode base64 JWT payload"),null)}catch(s){return Ar("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Wf(n){const e=eo(n);return R(e,"internal-error"),R(typeof e.exp<"u","internal-error"),R(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof tt&&Hf(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Hf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=kn(this.lastLoginAt),this.creationTime=kn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Br(n){var e;const t=n.auth,r=await n.getIdToken(),s=await On(n,zf(t,{idToken:r}));R(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Yf(i.providerUserInfo):[],a=Qf(n.providerData,o),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),u=c?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Zc(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function Gf(n){const e=_e(n);await Br(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Qf(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Yf(n){return n.map(e=>{var{providerId:t}=e,r=Yi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xf(n,e){const t=await Yc(n,{},async()=>{const r=Jn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Jc(n,s,"/v1/token",`key=${i}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Qc.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){R(e.idToken,"internal-error"),R(typeof e.idToken<"u","internal-error"),R(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Wf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return R(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Xf(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Pn;return r&&(R(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(R(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(R(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pn,this.toJSON())}_performRefresh(){return We("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,e){R(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class At{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Yi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Kf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Zc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await On(this,this.stsTokenManager.getToken(this.auth,e));return R(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return qf(this,e)}reload(){return Gf(this)}_assign(e){this!==e&&(R(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new At(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){R(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Br(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await On(this,Bf(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,a,c,l,u;const d=(r=t.displayName)!==null&&r!==void 0?r:void 0,f=(s=t.email)!==null&&s!==void 0?s:void 0,g=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(a=t.tenantId)!==null&&a!==void 0?a:void 0,x=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,z=(l=t.createdAt)!==null&&l!==void 0?l:void 0,L=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:K,emailVerified:ie,isAnonymous:ke,providerData:le,stsTokenManager:G}=t;R(K&&G,e,"internal-error");const De=Pn.fromJSON(this.name,G);R(typeof K=="string",e,"internal-error"),rt(d,e.name),rt(f,e.name),R(typeof ie=="boolean",e,"internal-error"),R(typeof ke=="boolean",e,"internal-error"),rt(g,e.name),rt(I,e.name),rt(S,e.name),rt(x,e.name),rt(z,e.name),rt(L,e.name);const Me=new At({uid:K,auth:e,email:f,emailVerified:ie,displayName:d,isAnonymous:ke,photoURL:I,phoneNumber:g,tenantId:S,stsTokenManager:De,createdAt:z,lastLoginAt:L});return le&&Array.isArray(le)&&(Me.providerData=le.map(It=>Object.assign({},It))),x&&(Me._redirectEventId=x),Me}static async _fromIdTokenResponse(e,t,r=!1){const s=new Pn;s.updateFromServerResponse(t);const i=new At({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Br(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=new Map;function He(n){Ye(n instanceof Function,"Expected a class definition");let e=va.get(n);return e?(Ye(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,va.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}el.type="NONE";const wa=el;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rr(n,e,t){return`firebase:${n}:${e}:${t}`}class Kt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Rr(this.userKey,s.apiKey,i),this.fullPersistenceKey=Rr("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?At._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Kt(He(wa),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||He(wa);const o=Rr(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){const d=At._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Kt(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Kt(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(il(e))return"Blackberry";if(ol(e))return"Webos";if(to(e))return"Safari";if((e.includes("chrome/")||nl(e))&&!e.includes("edge/"))return"Chrome";if(sl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function tl(n=ve()){return/firefox\//i.test(n)}function to(n=ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nl(n=ve()){return/crios\//i.test(n)}function rl(n=ve()){return/iemobile/i.test(n)}function sl(n=ve()){return/android/i.test(n)}function il(n=ve()){return/blackberry/i.test(n)}function ol(n=ve()){return/webos/i.test(n)}function cs(n=ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Jf(n=ve()){var e;return cs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Zf(){return gd()&&document.documentMode===10}function al(n=ve()){return cs(n)||sl(n)||ol(n)||il(n)||/windows phone/i.test(n)||rl(n)}function ep(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cl(n,e=[]){let t;switch(n){case"Browser":t=Ia(ve());break;case"Worker":t=`${Ia(ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${un}/${r}`}async function ll(n,e){return er(n,"GET","/v2/recaptchaConfig",Zi(n,e))}function Ea(n){return n!==void 0&&n.enterprise!==void 0}class ul{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(t=>t.provider==="EMAIL_PASSWORD_PROVIDER"&&t.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function hl(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Fe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",tp().appendChild(r)})}function np(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const rp="https://www.google.com/recaptcha/enterprise.js?render=",sp="recaptcha-enterprise",ip="NO_RECAPTCHA";class op{constructor(e){this.type=sp,this.auth=tr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{ll(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new ul(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;Ea(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(ip)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(a=>{if(!t&&Ea(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}hl(rp+a).then(()=>{s(a,i,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ta(this),this.idTokenSubscription=new Ta(this),this.beforeStateQueue=new ap(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=He(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Kt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return R(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Br(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ff()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?_e(e):null;return t&&R(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&R(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(He(e))})}async initializeRecaptchaConfig(){const e=await ll(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),t=new ul(e);this.tenantId==null?this._agentRecaptchaConfig=t:this._tenantRecaptchaConfigs[this.tenantId]=t,t.emailPasswordEnabled&&new op(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Xn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&He(e)||this._popupRedirectResolver;R(t,this,"argument-error"),this.redirectPersistenceManager=await Kt.create(this,[He(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return R(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof t=="function"?e.addObserver(t,r,s):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return R(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Of(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function tr(n){return _e(n)}class Ta{constructor(e){this.auth=e,this.observer=null,this.addObserver=Td(t=>this.observer=t)}get next(){return R(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(n,e){const t=Qi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(jr(i,e??{}))return s;Qe(s,"already-initialized")}return t.initialize({options:e})}function up(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(He);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function hp(n,e,t){const r=tr(n);R(r._canInitEmulator,r,"emulator-config-failed"),R(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=dl(e),{host:o,port:a}=dp(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),fp()}function dl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function dp(n){const e=dl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:_a(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:_a(o)}}}function _a(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function fp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return We("not implemented")}_getIdTokenResponse(e){return We("not implemented")}_linkToIdToken(e,t){return We("not implemented")}_getReauthenticationResolver(e){return We("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gt(n,e){return Xc(n,"POST","/v1/accounts:signInWithIdp",Zi(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="http://localhost";class Ot extends fl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ot(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Qe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Yi(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Ot(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Gt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Gt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Gt(e,t)}buildRequest(){const e={requestUri:pp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Jn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends pl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st extends nr{constructor(){super("facebook.com")}static credential(e){return Ot._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return st.credential(e.oauthAccessToken)}catch{return null}}}st.FACEBOOK_SIGN_IN_METHOD="facebook.com";st.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it extends nr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ot._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return it.credential(t,r)}catch{return null}}}it.GOOGLE_SIGN_IN_METHOD="google.com";it.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends nr{constructor(){super("github.com")}static credential(e){return Ot._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ot.credential(e.oauthAccessToken)}catch{return null}}}ot.GITHUB_SIGN_IN_METHOD="github.com";ot.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends nr{constructor(){super("twitter.com")}static credential(e,t){return Ot._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return at.credential(t,r)}catch{return null}}}at.TWITTER_SIGN_IN_METHOD="twitter.com";at.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gp(n,e){return Xc(n,"POST","/v1/accounts:signUp",Zi(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await At._fromIdTokenResponse(e,r,s),o=ba(r);return new ft({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ba(r);return new ft({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ba(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mp(n){var e;const t=tr(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new ft({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await gp(t,{returnSecureToken:!0}),s=await ft._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr extends tt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,zr.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new zr(e,t,r,s)}}function gl(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?zr._fromErrorAndOperation(n,i,e,r):i})}async function yp(n,e,t=!1){const r=await On(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ft._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vp(n,e,t=!1){const{auth:r}=n,s="reauthenticate";try{const i=await On(n,gl(r,s,e,n),t);R(i.idToken,r,"internal-error");const o=eo(i.idToken);R(o,r,"internal-error");const{sub:a}=o;return R(n.uid===a,r,"user-mismatch"),ft._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Qe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wp(n,e,t=!1){const r="signIn",s=await gl(n,r,e),i=await ft._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function Ip(n,e,t,r){return _e(n).onIdTokenChanged(e,t,r)}function Ep(n,e,t){return _e(n).beforeAuthStateChanged(e,t)}const qr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(qr,"1"),this.storage.removeItem(qr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tp(){const n=ve();return to(n)||cs(n)}const _p=1e3,bp=10;class yl extends ml{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Tp()&&ep(),this.fallbackToPolling=al(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Zf()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,bp):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},_p)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}yl.type="LOCAL";const Sp=yl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl extends ml{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vl.type="SESSION";const wl=vl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ls(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,i)),c=await xp(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ls.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=no("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(d){const f=d;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(){return window}function Cp(n){je().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(){return typeof je().WorkerGlobalScope<"u"&&typeof je().importScripts=="function"}async function Ap(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Rp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Np(){return Il()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="firebaseLocalStorageDb",Dp=1,Wr="firebaseLocalStorage",Tl="fbase_key";class rr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function us(n,e){return n.transaction([Wr],e?"readwrite":"readonly").objectStore(Wr)}function Mp(){const n=indexedDB.deleteDatabase(El);return new rr(n).toPromise()}function wi(){const n=indexedDB.open(El,Dp);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Wr,{keyPath:Tl})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Wr)?e(r):(r.close(),await Mp(),e(await wi()))})})}async function Sa(n,e,t){const r=us(n,!0).put({[Tl]:e,value:t});return new rr(r).toPromise()}async function Op(n,e){const t=us(n,!1).get(e),r=await new rr(t).toPromise();return r===void 0?null:r.value}function xa(n,e){const t=us(n,!0).delete(e);return new rr(t).toPromise()}const Pp=800,Lp=3;class _l{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Lp)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Il()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ls._getInstance(Np()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ap(),!this.activeServiceWorker)return;this.sender=new kp(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Rp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wi();return await Sa(e,qr,"1"),await xa(e,qr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Sa(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Op(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>xa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=us(s,!1).getAll();return new rr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}_l.type="LOCAL";const Up=_l;new Zn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(n,e){return e?He(e):(R(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro extends fl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Gt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Gt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Gt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function jp(n){return wp(n.auth,new ro(n),n.bypassAuthState)}function Vp(n){const{auth:e,user:t}=n;return R(t,e,"internal-error"),vp(t,new ro(n),n.bypassAuthState)}async function $p(n){const{auth:e,user:t}=n;return R(t,e,"internal-error"),yp(t,new ro(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jp;case"linkViaPopup":case"linkViaRedirect":return $p;case"reauthViaPopup":case"reauthViaRedirect":return Vp;default:Qe(this.auth,"internal-error")}}resolve(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp=new Zn(2e3,1e4);class Wt extends bl{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Wt.currentPopupAction&&Wt.currentPopupAction.cancel(),Wt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return R(e,this.auth,"internal-error"),e}async onExecution(){Ye(this.filter.length===1,"Popup operations only handle one event");const e=no();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Fe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Fe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Fe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Bp.get())};e()}}Wt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp="pendingRedirect",Nr=new Map;class qp extends bl{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Nr.get(this.auth._key());if(!e){try{const r=await Wp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Nr.set(this.auth._key(),e)}return this.bypassAuthState||Nr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Wp(n,e){const t=Gp(e),r=Kp(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Hp(n,e){Nr.set(n._key(),e)}function Kp(n){return He(n._redirectPersistence)}function Gp(n){return Rr(zp,n.config.apiKey,n.name)}async function Qp(n,e,t=!1){const r=tr(n),s=Fp(r,e),o=await new qp(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=10*60*1e3;class Xp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Jp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Sl(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Fe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Yp&&this.cachedEventUids.clear(),this.cachedEventUids.has(ka(e))}saveEventToCache(e){this.cachedEventUids.add(ka(e)),this.lastProcessedEventTime=Date.now()}}function ka(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Sl({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Jp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sl(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zp(n,e={}){return er(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tg=/^https?/;async function ng(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Zp(n);for(const t of e)try{if(rg(t))return}catch{}Qe(n,"unauthorized-domain")}function rg(n){const e=vi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!tg.test(t))return!1;if(eg.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=new Zn(3e4,6e4);function Ca(){const n=je().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ig(n){return new Promise((e,t)=>{var r,s,i;function o(){Ca(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ca(),t(Fe(n,"network-request-failed"))},timeout:sg.get()})}if(!((s=(r=je().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=je().gapi)===null||i===void 0)&&i.load)o();else{const a=np("iframefcb");return je()[a]=()=>{gapi.load?o():t(Fe(n,"network-request-failed"))},hl(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Dr=null,e})}let Dr=null;function og(n){return Dr=Dr||ig(n),Dr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag=new Zn(5e3,15e3),cg="__/auth/iframe",lg="emulator/auth/iframe",ug={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dg(n){const e=n.config;R(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ji(e,lg):`https://${n.config.authDomain}/${cg}`,r={apiKey:e.apiKey,appName:n.name,v:un},s=hg.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Jn(r).slice(1)}`}async function fg(n){const e=await og(n),t=je().gapi;return R(t,n,"internal-error"),e.open({where:document.body,url:dg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ug,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Fe(n,"network-request-failed"),a=je().setTimeout(()=>{i(o)},ag.get());function c(){je().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},gg=500,mg=600,yg="_blank",vg="http://localhost";class Aa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function wg(n,e,t,r=gg,s=mg){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},pg),{width:r.toString(),height:s.toString(),top:i,left:o}),l=ve().toLowerCase();t&&(a=nl(l)?yg:t),tl(l)&&(e=e||vg,c.scrollbars="yes");const u=Object.entries(c).reduce((f,[g,I])=>`${f}${g}=${I},`,"");if(Jf(l)&&a!=="_self")return Ig(e||"",a),new Aa(null);const d=window.open(e||"",a,u);R(d,n,"popup-blocked");try{d.focus()}catch{}return new Aa(d)}function Ig(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg="__/auth/handler",Tg="emulator/auth/handler",_g=encodeURIComponent("fac");async function Ra(n,e,t,r,s,i){R(n.config.authDomain,n,"auth-domain-config-required"),R(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:un,eventId:s};if(e instanceof pl){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ed(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof nr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${_g}=${encodeURIComponent(c)}`:"";return`${bg(n)}?${Jn(a).slice(1)}${l}`}function bg({config:n}){return n.emulator?Ji(n,Tg):`https://${n.authDomain}/${Eg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs="webStorageSupport";class Sg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=wl,this._completeRedirectFn=Qp,this._overrideRedirectResult=Hp}async _openPopup(e,t,r,s){var i;Ye((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ra(e,t,r,vi(),s);return wg(e,o,no())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ra(e,t,r,vi(),s);return Cp(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Ye(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await fg(e),r=new Xp(e);return t.register("authEvent",s=>(R(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Zs,{type:Zs},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Zs];o!==void 0&&t(!!o),Qe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ng(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return al()||to()||cs()}}const xg=Sg;var Na="@firebase/auth",Da="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){R(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Ag(n){en(new Dt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;R(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cl(n)},l=new cp(r,s,i,c);return up(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),en(new Dt("auth-internal",e=>{const t=tr(e.getProvider("auth").getImmediate());return(r=>new kg(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ht(Na,Da,Cg(n)),ht(Na,Da,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg=5*60,Ng=Vc("authIdTokenMaxAge")||Rg;let Ma=null;const Dg=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ng)return;const s=t==null?void 0:t.token;Ma!==s&&(Ma=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Mg(n=qc()){const e=Qi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=lp(n,{popupRedirectResolver:xg,persistence:[Up,Sp,wl]}),r=Vc("authTokenSyncURL");if(r){const i=Dg(r);Ep(t,i,()=>i(t.currentUser)),Ip(t,o=>i(o))}const s=Fc("auth");return s&&hp(t,`http://${s}`),t}Ag("Browser");var Og=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},w,so=so||{},C=Og||self;function hs(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function ds(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function Pg(n,e,t){return n.call.apply(n.bind,arguments)}function Lg(n,e,t){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),n.apply(e,s)}}return function(){return n.apply(e,arguments)}}function ge(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ge=Pg:ge=Lg,ge.apply(null,arguments)}function wr(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var r=t.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function se(n,e){function t(){}t.prototype=e.prototype,n.$=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function yt(){this.s=this.s,this.o=this.o}var Ug=0;yt.prototype.s=!1;yt.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),Ug!=0)};yt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const xl=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function io(n){const e=n.length;if(0<e){const t=Array(e);for(let r=0;r<e;r++)t[r]=n[r];return t}return[]}function Oa(n,e){for(let t=1;t<arguments.length;t++){const r=arguments[t];if(hs(r)){const s=n.length||0,i=r.length||0;n.length=s+i;for(let o=0;o<i;o++)n[s+o]=r[o]}else n.push(r)}}function me(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}me.prototype.h=function(){this.defaultPrevented=!0};var Fg=function(){if(!C.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{C.addEventListener("test",()=>{},e),C.removeEventListener("test",()=>{},e)}catch{}return n}();function Ln(n){return/^[\s\xa0]*$/.test(n)}function fs(){var n=C.navigator;return n&&(n=n.userAgent)?n:""}function Pe(n){return fs().indexOf(n)!=-1}function oo(n){return oo[" "](n),n}oo[" "]=function(){};function jg(n,e){var t=Dm;return Object.prototype.hasOwnProperty.call(t,n)?t[n]:t[n]=e(n)}var Vg=Pe("Opera"),tn=Pe("Trident")||Pe("MSIE"),kl=Pe("Edge"),Ii=kl||tn,Cl=Pe("Gecko")&&!(fs().toLowerCase().indexOf("webkit")!=-1&&!Pe("Edge"))&&!(Pe("Trident")||Pe("MSIE"))&&!Pe("Edge"),$g=fs().toLowerCase().indexOf("webkit")!=-1&&!Pe("Edge");function Al(){var n=C.document;return n?n.documentMode:void 0}var Ei;e:{var ei="",ti=function(){var n=fs();if(Cl)return/rv:([^\);]+)(\)|;)/.exec(n);if(kl)return/Edge\/([\d\.]+)/.exec(n);if(tn)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if($g)return/WebKit\/(\S+)/.exec(n);if(Vg)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(ti&&(ei=ti?ti[1]:""),tn){var ni=Al();if(ni!=null&&ni>parseFloat(ei)){Ei=String(ni);break e}}Ei=ei}var Ti;if(C.document&&tn){var Pa=Al();Ti=Pa||parseInt(Ei,10)||void 0}else Ti=void 0;var Bg=Ti;function Un(n,e){if(me.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(Cl){e:{try{oo(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:zg[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&Un.$.h.call(this)}}se(Un,me);var zg={2:"touch",3:"pen",4:"mouse"};Un.prototype.h=function(){Un.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var ps="closure_listenable_"+(1e6*Math.random()|0),qg=0;function Wg(n,e,t,r,s){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!r,this.la=s,this.key=++qg,this.fa=this.ia=!1}function gs(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function ao(n,e,t){for(const r in n)e.call(t,n[r],r,n)}function Hg(n,e){for(const t in n)e.call(void 0,n[t],t,n)}function Rl(n){const e={};for(const t in n)e[t]=n[t];return e}const La="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Nl(n,e){let t,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(t in r)n[t]=r[t];for(let i=0;i<La.length;i++)t=La[i],Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}}function ms(n){this.src=n,this.g={},this.h=0}ms.prototype.add=function(n,e,t,r,s){var i=n.toString();n=this.g[i],n||(n=this.g[i]=[],this.h++);var o=bi(n,e,r,s);return-1<o?(e=n[o],t||(e.ia=!1)):(e=new Wg(e,this.src,i,!!r,s),e.ia=t,n.push(e)),e};function _i(n,e){var t=e.type;if(t in n.g){var r=n.g[t],s=xl(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(gs(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function bi(n,e,t,r){for(var s=0;s<n.length;++s){var i=n[s];if(!i.fa&&i.listener==e&&i.capture==!!t&&i.la==r)return s}return-1}var co="closure_lm_"+(1e6*Math.random()|0),ri={};function Dl(n,e,t,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Dl(n,e[i],t,r,s);return null}return t=Pl(t),n&&n[ps]?n.O(e,t,ds(r)?!!r.capture:!1,s):Kg(n,e,t,!1,r,s)}function Kg(n,e,t,r,s,i){if(!e)throw Error("Invalid event type");var o=ds(s)?!!s.capture:!!s,a=uo(n);if(a||(n[co]=a=new ms(n)),t=a.add(e,t,r,o,i),t.proxy)return t;if(r=Gg(),t.proxy=r,r.src=n,r.listener=t,n.addEventListener)Fg||(s=o),s===void 0&&(s=!1),n.addEventListener(e.toString(),r,s);else if(n.attachEvent)n.attachEvent(Ol(e.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return t}function Gg(){function n(t){return e.call(n.src,n.listener,t)}const e=Qg;return n}function Ml(n,e,t,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Ml(n,e[i],t,r,s);else r=ds(r)?!!r.capture:!!r,t=Pl(t),n&&n[ps]?(n=n.i,e=String(e).toString(),e in n.g&&(i=n.g[e],t=bi(i,t,r,s),-1<t&&(gs(i[t]),Array.prototype.splice.call(i,t,1),i.length==0&&(delete n.g[e],n.h--)))):n&&(n=uo(n))&&(e=n.g[e.toString()],n=-1,e&&(n=bi(e,t,r,s)),(t=-1<n?e[n]:null)&&lo(t))}function lo(n){if(typeof n!="number"&&n&&!n.fa){var e=n.src;if(e&&e[ps])_i(e.i,n);else{var t=n.type,r=n.proxy;e.removeEventListener?e.removeEventListener(t,r,n.capture):e.detachEvent?e.detachEvent(Ol(t),r):e.addListener&&e.removeListener&&e.removeListener(r),(t=uo(e))?(_i(t,n),t.h==0&&(t.src=null,e[co]=null)):gs(n)}}}function Ol(n){return n in ri?ri[n]:ri[n]="on"+n}function Qg(n,e){if(n.fa)n=!0;else{e=new Un(e,this);var t=n.listener,r=n.la||n.src;n.ia&&lo(n),n=t.call(r,e)}return n}function uo(n){return n=n[co],n instanceof ms?n:null}var si="__closure_events_fn_"+(1e9*Math.random()>>>0);function Pl(n){return typeof n=="function"?n:(n[si]||(n[si]=function(e){return n.handleEvent(e)}),n[si])}function re(){yt.call(this),this.i=new ms(this),this.S=this,this.J=null}se(re,yt);re.prototype[ps]=!0;re.prototype.removeEventListener=function(n,e,t,r){Ml(this,n,e,t,r)};function ce(n,e){var t,r=n.J;if(r)for(t=[];r;r=r.J)t.push(r);if(n=n.S,r=e.type||e,typeof e=="string")e=new me(e,n);else if(e instanceof me)e.target=e.target||n;else{var s=e;e=new me(r,n),Nl(e,s)}if(s=!0,t)for(var i=t.length-1;0<=i;i--){var o=e.g=t[i];s=Ir(o,r,!0,e)&&s}if(o=e.g=n,s=Ir(o,r,!0,e)&&s,s=Ir(o,r,!1,e)&&s,t)for(i=0;i<t.length;i++)o=e.g=t[i],s=Ir(o,r,!1,e)&&s}re.prototype.N=function(){if(re.$.N.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],r=0;r<t.length;r++)gs(t[r]);delete n.g[e],n.h--}}this.J=null};re.prototype.O=function(n,e,t,r){return this.i.add(String(n),e,!1,t,r)};re.prototype.P=function(n,e,t,r){return this.i.add(String(n),e,!0,t,r)};function Ir(n,e,t,r){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==t){var a=o.listener,c=o.la||o.src;o.ia&&_i(n.i,o),s=a.call(c,r)!==!1&&s}}return s&&!r.defaultPrevented}var ho=C.JSON.stringify;class Yg{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function Xg(){var n=fo;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}class Jg{constructor(){this.h=this.g=null}add(e,t){const r=Ll.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}}var Ll=new Yg(()=>new Zg,n=>n.reset());class Zg{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function em(n){var e=1;n=n.split(":");const t=[];for(;0<e&&n.length;)t.push(n.shift()),e--;return n.length&&t.push(n.join(":")),t}function tm(n){C.setTimeout(()=>{throw n},0)}let Fn,jn=!1,fo=new Jg,Ul=()=>{const n=C.Promise.resolve(void 0);Fn=()=>{n.then(nm)}};var nm=()=>{for(var n;n=Xg();){try{n.h.call(n.g)}catch(t){tm(t)}var e=Ll;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}jn=!1};function ys(n,e){re.call(this),this.h=n||1,this.g=e||C,this.j=ge(this.qb,this),this.l=Date.now()}se(ys,re);w=ys.prototype;w.ga=!1;w.T=null;w.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),ce(this,"tick"),this.ga&&(po(this),this.start()))}};w.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function po(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}w.N=function(){ys.$.N.call(this),po(this),delete this.g};function go(n,e,t){if(typeof n=="function")t&&(n=ge(n,t));else if(n&&typeof n.handleEvent=="function")n=ge(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:C.setTimeout(n,e||0)}function Fl(n){n.g=go(()=>{n.g=null,n.i&&(n.i=!1,Fl(n))},n.j);const e=n.h;n.h=null,n.m.apply(null,e)}class rm extends yt{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Fl(this)}N(){super.N(),this.g&&(C.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Vn(n){yt.call(this),this.h=n,this.g={}}se(Vn,yt);var Ua=[];function jl(n,e,t,r){Array.isArray(t)||(t&&(Ua[0]=t.toString()),t=Ua);for(var s=0;s<t.length;s++){var i=Dl(e,t[s],r||n.handleEvent,!1,n.h||n);if(!i)break;n.g[i.key]=i}}function Vl(n){ao(n.g,function(e,t){this.g.hasOwnProperty(t)&&lo(e)},n),n.g={}}Vn.prototype.N=function(){Vn.$.N.call(this),Vl(this)};Vn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function vs(){this.g=!0}vs.prototype.Ea=function(){this.g=!1};function sm(n,e,t,r,s,i){n.info(function(){if(n.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var d=u.split("_");o=2<=d.length&&d[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+t+`
`+o})}function im(n,e,t,r,s,i,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+t+`
`+i+" "+o})}function Ht(n,e,t,r){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+am(n,t)+(r?" "+r:"")})}function om(n,e){n.info(function(){return"TIMEOUT: "+e})}vs.prototype.info=function(){};function am(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var r=t[n];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return ho(t)}catch{return e}}var Ft={},Fa=null;function ws(){return Fa=Fa||new re}Ft.Ta="serverreachability";function $l(n){me.call(this,Ft.Ta,n)}se($l,me);function $n(n){const e=ws();ce(e,new $l(e))}Ft.STAT_EVENT="statevent";function Bl(n,e){me.call(this,Ft.STAT_EVENT,n),this.stat=e}se(Bl,me);function Ie(n){const e=ws();ce(e,new Bl(e,n))}Ft.Ua="timingevent";function zl(n,e){me.call(this,Ft.Ua,n),this.size=e}se(zl,me);function sr(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return C.setTimeout(function(){n()},e)}var Is={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},ql={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function mo(){}mo.prototype.h=null;function ja(n){return n.h||(n.h=n.i())}function Wl(){}var ir={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function yo(){me.call(this,"d")}se(yo,me);function vo(){me.call(this,"c")}se(vo,me);var Si;function Es(){}se(Es,mo);Es.prototype.g=function(){return new XMLHttpRequest};Es.prototype.i=function(){return{}};Si=new Es;function or(n,e,t,r){this.l=n,this.j=e,this.m=t,this.W=r||1,this.U=new Vn(this),this.P=cm,n=Ii?125:void 0,this.V=new ys(n),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Hl}function Hl(){this.i=null,this.g="",this.h=!1}var cm=45e3,xi={},Hr={};w=or.prototype;w.setTimeout=function(n){this.P=n};function ki(n,e,t){n.L=1,n.v=_s(Xe(e)),n.s=t,n.S=!0,Kl(n,null)}function Kl(n,e){n.G=Date.now(),ar(n),n.A=Xe(n.v);var t=n.A,r=n.W;Array.isArray(r)||(r=[String(r)]),tu(t.i,"t",r),n.C=0,t=n.l.J,n.h=new Hl,n.g=Tu(n.l,t?e:null,!n.s),0<n.O&&(n.M=new rm(ge(n.Pa,n,n.g),n.O)),jl(n.U,n.g,"readystatechange",n.nb),e=n.I?Rl(n.I):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.A,n.u,n.s,e)):(n.u="GET",n.g.ha(n.A,n.u,null,e)),$n(),sm(n.j,n.u,n.A,n.m,n.W,n.s)}w.nb=function(n){n=n.target;const e=this.M;e&&Le(n)==3?e.l():this.Pa(n)};w.Pa=function(n){try{if(n==this.g)e:{const u=Le(this.g);var e=this.g.Ia();const d=this.g.da();if(!(3>u)&&(u!=3||Ii||this.g&&(this.h.h||this.g.ja()||za(this.g)))){this.J||u!=4||e==7||(e==8||0>=d?$n(3):$n(2)),Ts(this);var t=this.g.da();this.ca=t;t:if(Gl(this)){var r=za(this.g);n="";var s=r.length,i=Le(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){xt(this),Cn(this);var o="";break t}this.h.i=new C.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,n+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=t==200,im(this.j,this.u,this.A,this.m,this.W,u,t),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ln(a)){var l=a;break t}}l=null}if(t=l)Ht(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ci(this,t);else{this.i=!1,this.o=3,Ie(12),xt(this),Cn(this);break e}}this.S?(Ql(this,u,o),Ii&&this.i&&u==3&&(jl(this.U,this.V,"tick",this.mb),this.V.start())):(Ht(this.j,this.m,o,null),Ci(this,o)),u==4&&xt(this),this.i&&!this.J&&(u==4?vu(this.l,this):(this.i=!1,ar(this)))}else Am(this.g),t==400&&0<o.indexOf("Unknown SID")?(this.o=3,Ie(12)):(this.o=0,Ie(13)),xt(this),Cn(this)}}}catch{}finally{}};function Gl(n){return n.g?n.u=="GET"&&n.L!=2&&n.l.Ha:!1}function Ql(n,e,t){let r=!0,s;for(;!n.J&&n.C<t.length;)if(s=lm(n,t),s==Hr){e==4&&(n.o=4,Ie(14),r=!1),Ht(n.j,n.m,null,"[Incomplete Response]");break}else if(s==xi){n.o=4,Ie(15),Ht(n.j,n.m,t,"[Invalid Chunk]"),r=!1;break}else Ht(n.j,n.m,s,null),Ci(n,s);Gl(n)&&s!=Hr&&s!=xi&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,Ie(16),r=!1),n.i=n.i&&r,r?0<t.length&&!n.ba&&(n.ba=!0,e=n.l,e.g==n&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+t.length),bo(e),e.M=!0,Ie(11))):(Ht(n.j,n.m,t,"[Invalid Chunked Response]"),xt(n),Cn(n))}w.mb=function(){if(this.g){var n=Le(this.g),e=this.g.ja();this.C<e.length&&(Ts(this),Ql(this,n,e),this.i&&n!=4&&ar(this))}};function lm(n,e){var t=n.C,r=e.indexOf(`
`,t);return r==-1?Hr:(t=Number(e.substring(t,r)),isNaN(t)?xi:(r+=1,r+t>e.length?Hr:(e=e.slice(r,r+t),n.C=r+t,e)))}w.cancel=function(){this.J=!0,xt(this)};function ar(n){n.Y=Date.now()+n.P,Yl(n,n.P)}function Yl(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=sr(ge(n.lb,n),e)}function Ts(n){n.B&&(C.clearTimeout(n.B),n.B=null)}w.lb=function(){this.B=null;const n=Date.now();0<=n-this.Y?(om(this.j,this.A),this.L!=2&&($n(),Ie(17)),xt(this),this.o=2,Cn(this)):Yl(this,this.Y-n)};function Cn(n){n.l.H==0||n.J||vu(n.l,n)}function xt(n){Ts(n);var e=n.M;e&&typeof e.sa=="function"&&e.sa(),n.M=null,po(n.V),Vl(n.U),n.g&&(e=n.g,n.g=null,e.abort(),e.sa())}function Ci(n,e){try{var t=n.l;if(t.H!=0&&(t.g==n||Ai(t.i,n))){if(!n.K&&Ai(t.i,n)&&t.H==3){try{var r=t.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!t.u){if(t.g)if(t.g.G+3e3<n.G)Qr(t),xs(t);else break e;_o(t),Ie(18)}}else t.Fa=s[1],0<t.Fa-t.V&&37500>s[2]&&t.G&&t.A==0&&!t.v&&(t.v=sr(ge(t.ib,t),6e3));if(1>=su(t.i)&&t.oa){try{t.oa()}catch{}t.oa=void 0}}else kt(t,11)}else if((n.K||t.g==n)&&Qr(t),!Ln(e))for(s=t.Ja.g.parse(e),e=0;e<s.length;e++){let l=s[e];if(t.V=l[0],l=l[1],t.H==2)if(l[0]=="c"){t.K=l[1],t.pa=l[2];const u=l[3];u!=null&&(t.ra=u,t.l.info("VER="+t.ra));const d=l[4];d!=null&&(t.Ga=d,t.l.info("SVER="+t.Ga));const f=l[5];f!=null&&typeof f=="number"&&0<f&&(r=1.5*f,t.L=r,t.l.info("backChannelRequestTimeoutMs_="+r)),r=t;const g=n.g;if(g){const I=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(I){var i=r.i;i.g||I.indexOf("spdy")==-1&&I.indexOf("quic")==-1&&I.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(wo(i,i.h),i.h=null))}if(r.F){const S=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;S&&(r.Da=S,q(r.I,r.F,S))}}t.H=3,t.h&&t.h.Ba(),t.ca&&(t.S=Date.now()-n.G,t.l.info("Handshake RTT: "+t.S+"ms")),r=t;var o=n;if(r.wa=Eu(r,r.J?r.pa:null,r.Y),o.K){iu(r.i,o);var a=o,c=r.L;c&&a.setTimeout(c),a.B&&(Ts(a),ar(a)),r.g=o}else mu(r);0<t.j.length&&ks(t)}else l[0]!="stop"&&l[0]!="close"||kt(t,7);else t.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?kt(t,7):To(t):l[0]!="noop"&&t.h&&t.h.Aa(l),t.A=0)}}$n(4)}catch{}}function um(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(hs(n)){for(var e=[],t=n.length,r=0;r<t;r++)e.push(n[r]);return e}e=[],t=0;for(r in n)e[t++]=n[r];return e}function hm(n){if(n.ta&&typeof n.ta=="function")return n.ta();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(hs(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(const r in n)e[t++]=r;return e}}}function Xl(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(hs(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=hm(n),r=um(n),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],t&&t[i],n)}var Jl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dm(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var r=n[t].indexOf("="),s=null;if(0<=r){var i=n[t].substring(0,r);s=n[t].substring(r+1)}else i=n[t];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Rt(n){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Rt){this.h=n.h,Kr(this,n.j),this.s=n.s,this.g=n.g,Gr(this,n.m),this.l=n.l;var e=n.i,t=new Bn;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),Va(this,t),this.o=n.o}else n&&(e=String(n).match(Jl))?(this.h=!1,Kr(this,e[1]||"",!0),this.s=Tn(e[2]||""),this.g=Tn(e[3]||"",!0),Gr(this,e[4]),this.l=Tn(e[5]||"",!0),Va(this,e[6]||"",!0),this.o=Tn(e[7]||"")):(this.h=!1,this.i=new Bn(null,this.h))}Rt.prototype.toString=function(){var n=[],e=this.j;e&&n.push(_n(e,$a,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(_n(e,$a,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(_n(t,t.charAt(0)=="/"?gm:pm,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",_n(t,ym)),n.join("")};function Xe(n){return new Rt(n)}function Kr(n,e,t){n.j=t?Tn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function Gr(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function Va(n,e,t){e instanceof Bn?(n.i=e,vm(n.i,n.h)):(t||(e=_n(e,mm)),n.i=new Bn(e,n.h))}function q(n,e,t){n.i.set(e,t)}function _s(n){return q(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Tn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function _n(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,fm),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function fm(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var $a=/[#\/\?@]/g,pm=/[#\?:]/g,gm=/[#\?]/g,mm=/[#\?@]/g,ym=/#/g;function Bn(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function vt(n){n.g||(n.g=new Map,n.h=0,n.i&&dm(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}w=Bn.prototype;w.add=function(n,e){vt(this),this.i=null,n=hn(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Zl(n,e){vt(n),e=hn(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function eu(n,e){return vt(n),e=hn(n,e),n.g.has(e)}w.forEach=function(n,e){vt(this),this.g.forEach(function(t,r){t.forEach(function(s){n.call(e,s,r,this)},this)},this)};w.ta=function(){vt(this);const n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let r=0;r<e.length;r++){const s=n[r];for(let i=0;i<s.length;i++)t.push(e[r])}return t};w.Z=function(n){vt(this);let e=[];if(typeof n=="string")eu(this,n)&&(e=e.concat(this.g.get(hn(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};w.set=function(n,e){return vt(this),this.i=null,n=hn(this,n),eu(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};w.get=function(n,e){return n?(n=this.Z(n),0<n.length?String(n[0]):e):e};function tu(n,e,t){Zl(n,e),0<t.length&&(n.i=null,n.g.set(hn(n,e),io(t)),n.h+=t.length)}w.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var r=e[t];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),n.push(s)}}return this.i=n.join("&")};function hn(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function vm(n,e){e&&!n.j&&(vt(n),n.i=null,n.g.forEach(function(t,r){var s=r.toLowerCase();r!=s&&(Zl(this,r),tu(this,s,t))},n)),n.j=e}var wm=class{constructor(n,e){this.g=n,this.map=e}};function nu(n){this.l=n||Im,C.PerformanceNavigationTiming?(n=C.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(C.g&&C.g.Ka&&C.g.Ka()&&C.g.Ka().ec),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Im=10;function ru(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function su(n){return n.h?1:n.g?n.g.size:0}function Ai(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function wo(n,e){n.g?n.g.add(e):n.h=e}function iu(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}nu.prototype.cancel=function(){if(this.i=ou(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function ou(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let e=n.i;for(const t of n.g.values())e=e.concat(t.F);return e}return io(n.i)}var Em=class{stringify(n){return C.JSON.stringify(n,void 0)}parse(n){return C.JSON.parse(n,void 0)}};function Tm(){this.g=new Em}function _m(n,e,t){const r=t||"";try{Xl(n,function(s,i){let o=s;ds(s)&&(o=ho(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function bm(n,e){const t=new vs;if(C.Image){const r=new Image;r.onload=wr(Er,t,r,"TestLoadImage: loaded",!0,e),r.onerror=wr(Er,t,r,"TestLoadImage: error",!1,e),r.onabort=wr(Er,t,r,"TestLoadImage: abort",!1,e),r.ontimeout=wr(Er,t,r,"TestLoadImage: timeout",!1,e),C.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else e(!1)}function Er(n,e,t,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function cr(n){this.l=n.fc||null,this.j=n.ob||!1}se(cr,mo);cr.prototype.g=function(){return new bs(this.l,this.j)};cr.prototype.i=function(n){return function(){return n}}({});function bs(n,e){re.call(this),this.F=n,this.u=e,this.m=void 0,this.readyState=Io,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}se(bs,re);var Io=0;w=bs.prototype;w.open=function(n,e){if(this.readyState!=Io)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,zn(this)};w.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.F||C).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};w.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,lr(this)),this.readyState=Io};w.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,zn(this)),this.g&&(this.readyState=3,zn(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof C.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;au(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function au(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}w.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?lr(this):zn(this),this.readyState==3&&au(this)}};w.Za=function(n){this.g&&(this.response=this.responseText=n,lr(this))};w.Ya=function(n){this.g&&(this.response=n,lr(this))};w.ka=function(){this.g&&lr(this)};function lr(n){n.readyState=4,n.l=null,n.j=null,n.A=null,zn(n)}w.setRequestHeader=function(n,e){this.v.append(n,e)};w.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};w.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function zn(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(bs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var Sm=C.JSON.parse;function Y(n){re.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=cu,this.L=this.M=!1}se(Y,re);var cu="",xm=/^https?$/i,km=["POST","PUT"];w=Y.prototype;w.Oa=function(n){this.M=n};w.ha=function(n,e,t,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);e=e?e.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Si.g(),this.C=this.u?ja(this.u):ja(Si),this.g.onreadystatechange=ge(this.La,this);try{this.G=!0,this.g.open(e,String(n),!0),this.G=!1}catch(i){Ba(this,i);return}if(n=t||"",t=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)t.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())t.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(t.keys()).find(i=>i.toLowerCase()=="content-type"),s=C.FormData&&n instanceof C.FormData,!(0<=xl(km,e))||r||s||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of t)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{hu(this),0<this.B&&((this.L=Cm(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ge(this.ua,this)):this.A=go(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(i){Ba(this,i)}};function Cm(n){return tn&&typeof n.timeout=="number"&&n.ontimeout!==void 0}w.ua=function(){typeof so<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ce(this,"timeout"),this.abort(8))};function Ba(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,lu(n),Ss(n)}function lu(n){n.F||(n.F=!0,ce(n,"complete"),ce(n,"error"))}w.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,ce(this,"complete"),ce(this,"abort"),Ss(this))};w.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Ss(this,!0)),Y.$.N.call(this)};w.La=function(){this.s||(this.G||this.v||this.l?uu(this):this.kb())};w.kb=function(){uu(this)};function uu(n){if(n.h&&typeof so<"u"&&(!n.C[1]||Le(n)!=4||n.da()!=2)){if(n.v&&Le(n)==4)go(n.La,0,n);else if(ce(n,"readystatechange"),Le(n)==4){n.h=!1;try{const o=n.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var r;if(r=o===0){var s=String(n.I).match(Jl)[1]||null;!s&&C.self&&C.self.location&&(s=C.self.location.protocol.slice(0,-1)),r=!xm.test(s?s.toLowerCase():"")}t=r}if(t)ce(n,"complete"),ce(n,"success");else{n.m=6;try{var i=2<Le(n)?n.g.statusText:""}catch{i=""}n.j=i+" ["+n.da()+"]",lu(n)}}finally{Ss(n)}}}}function Ss(n,e){if(n.g){hu(n);const t=n.g,r=n.C[0]?()=>{}:null;n.g=null,n.C=null,e||ce(n,"ready");try{t.onreadystatechange=r}catch{}}}function hu(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(C.clearTimeout(n.A),n.A=null)}w.isActive=function(){return!!this.g};function Le(n){return n.g?n.g.readyState:0}w.da=function(){try{return 2<Le(this)?this.g.status:-1}catch{return-1}};w.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};w.Wa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),Sm(e)}};function za(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case cu:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function Am(n){const e={};n=(n.g&&2<=Le(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<n.length;r++){if(Ln(n[r]))continue;var t=em(n[r]);const s=t[0];if(t=t[1],typeof t!="string")continue;t=t.trim();const i=e[s]||[];e[s]=i,i.push(t)}Hg(e,function(r){return r.join(", ")})}w.Ia=function(){return this.m};w.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function du(n){let e="";return ao(n,function(t,r){e+=r,e+=":",e+=t,e+=`\r
`}),e}function Eo(n,e,t){e:{for(r in t){var r=!1;break e}r=!0}r||(t=du(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):q(n,e,t))}function wn(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function fu(n){this.Ga=0,this.j=[],this.l=new vs,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=wn("failFast",!1,n),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=wn("baseRetryDelayMs",5e3,n),this.hb=wn("retryDelaySeedMs",1e4,n),this.eb=wn("forwardChannelMaxRetries",2,n),this.xa=wn("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.dc||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.i=new nu(n&&n.concurrentRequestLimit),this.Ja=new Tm,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.l.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.qa=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.qa=n.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}w=fu.prototype;w.ra=8;w.H=1;function To(n){if(pu(n),n.H==3){var e=n.W++,t=Xe(n.I);if(q(t,"SID",n.K),q(t,"RID",e),q(t,"TYPE","terminate"),ur(n,t),e=new or(n,n.l,e),e.L=2,e.v=_s(Xe(t)),t=!1,C.navigator&&C.navigator.sendBeacon)try{t=C.navigator.sendBeacon(e.v.toString(),"")}catch{}!t&&C.Image&&(new Image().src=e.v,t=!0),t||(e.g=Tu(e.l,null),e.g.ha(e.v)),e.G=Date.now(),ar(e)}Iu(n)}function xs(n){n.g&&(bo(n),n.g.cancel(),n.g=null)}function pu(n){xs(n),n.u&&(C.clearTimeout(n.u),n.u=null),Qr(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&C.clearTimeout(n.m),n.m=null)}function ks(n){if(!ru(n.i)&&!n.m){n.m=!0;var e=n.Na;Fn||Ul(),jn||(Fn(),jn=!0),fo.add(e,n),n.C=0}}function Rm(n,e){return su(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.j=e.F.concat(n.j),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=sr(ge(n.Na,n,e),wu(n,n.C)),n.C++,!0)}w.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;const s=new or(this,this.l,n);let i=this.s;if(this.U&&(i?(i=Rl(i),Nl(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)e:{for(var e=0,t=0;t<this.j.length;t++){t:{var r=this.j[t];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=t;break e}if(e===4096||t===this.j.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=gu(this,s,e),t=Xe(this.I),q(t,"RID",n),q(t,"CVER",22),this.F&&q(t,"X-HTTP-Session-Id",this.F),ur(this,t),i&&(this.O?e="headers="+encodeURIComponent(String(du(i)))+"&"+e:this.o&&Eo(t,this.o,i)),wo(this.i,s),this.bb&&q(t,"TYPE","init"),this.P?(q(t,"$req",e),q(t,"SID","null"),s.aa=!0,ki(s,t,null)):ki(s,t,e),this.H=2}}else this.H==3&&(n?qa(this,n):this.j.length==0||ru(this.i)||qa(this))};function qa(n,e){var t;e?t=e.m:t=n.W++;const r=Xe(n.I);q(r,"SID",n.K),q(r,"RID",t),q(r,"AID",n.V),ur(n,r),n.o&&n.s&&Eo(r,n.o,n.s),t=new or(n,n.l,t,n.C+1),n.o===null&&(t.I=n.s),e&&(n.j=e.F.concat(n.j)),e=gu(n,t,1e3),t.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),wo(n.i,t),ki(t,r,e)}function ur(n,e){n.na&&ao(n.na,function(t,r){q(e,r,t)}),n.h&&Xl({},function(t,r){q(e,r,t)})}function gu(n,e,t){t=Math.min(n.j.length,t);var r=n.h?ge(n.h.Va,n.h,n):null;e:{var s=n.j;let i=-1;for(;;){const o=["count="+t];i==-1?0<t?(i=s[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<t;c++){let l=s[c].g;const u=s[c].map;if(l-=i,0>l)i=Math.max(0,s[c].g-100),a=!1;else try{_m(u,o,"req"+l+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return n=n.j.splice(0,t),e.F=n,r}function mu(n){if(!n.g&&!n.u){n.ba=1;var e=n.Ma;Fn||Ul(),jn||(Fn(),jn=!0),fo.add(e,n),n.A=0}}function _o(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=sr(ge(n.Ma,n),wu(n,n.A)),n.A++,!0)}w.Ma=function(){if(this.u=null,yu(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var n=2*this.S;this.l.info("BP detection timer enabled: "+n),this.B=sr(ge(this.jb,this),n)}};w.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,Ie(10),xs(this),yu(this))};function bo(n){n.B!=null&&(C.clearTimeout(n.B),n.B=null)}function yu(n){n.g=new or(n,n.l,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var e=Xe(n.wa);q(e,"RID","rpc"),q(e,"SID",n.K),q(e,"AID",n.V),q(e,"CI",n.G?"0":"1"),!n.G&&n.qa&&q(e,"TO",n.qa),q(e,"TYPE","xmlhttp"),ur(n,e),n.o&&n.s&&Eo(e,n.o,n.s),n.L&&n.g.setTimeout(n.L);var t=n.g;n=n.pa,t.L=1,t.v=_s(Xe(e)),t.s=null,t.S=!0,Kl(t,n)}w.ib=function(){this.v!=null&&(this.v=null,xs(this),_o(this),Ie(19))};function Qr(n){n.v!=null&&(C.clearTimeout(n.v),n.v=null)}function vu(n,e){var t=null;if(n.g==e){Qr(n),bo(n),n.g=null;var r=2}else if(Ai(n.i,e))t=e.F,iu(n.i,e),r=1;else return;if(n.H!=0){if(e.i)if(r==1){t=e.s?e.s.length:0,e=Date.now()-e.G;var s=n.C;r=ws(),ce(r,new zl(r,t)),ks(n)}else mu(n);else if(s=e.o,s==3||s==0&&0<e.ca||!(r==1&&Rm(n,e)||r==2&&_o(n)))switch(t&&0<t.length&&(e=n.i,e.i=e.i.concat(t)),s){case 1:kt(n,5);break;case 4:kt(n,10);break;case 3:kt(n,6);break;default:kt(n,2)}}}function wu(n,e){let t=n.ab+Math.floor(Math.random()*n.hb);return n.isActive()||(t*=2),t*e}function kt(n,e){if(n.l.info("Error code "+e),e==2){var t=null;n.h&&(t=null);var r=ge(n.pb,n);t||(t=new Rt("//www.google.com/images/cleardot.gif"),C.location&&C.location.protocol=="http"||Kr(t,"https"),_s(t)),bm(t.toString(),r)}else Ie(2);n.H=0,n.h&&n.h.za(e),Iu(n),pu(n)}w.pb=function(n){n?(this.l.info("Successfully pinged google.com"),Ie(2)):(this.l.info("Failed to ping google.com"),Ie(1))};function Iu(n){if(n.H=0,n.ma=[],n.h){const e=ou(n.i);(e.length!=0||n.j.length!=0)&&(Oa(n.ma,e),Oa(n.ma,n.j),n.i.i.length=0,io(n.j),n.j.length=0),n.h.ya()}}function Eu(n,e,t){var r=t instanceof Rt?Xe(t):new Rt(t);if(r.g!="")e&&(r.g=e+"."+r.g),Gr(r,r.m);else{var s=C.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new Rt(null);r&&Kr(i,r),e&&(i.g=e),s&&Gr(i,s),t&&(i.l=t),r=i}return t=n.F,e=n.Da,t&&e&&q(r,t,e),q(r,"VER",n.ra),ur(n,r),r}function Tu(n,e,t){if(e&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Ha&&!n.va?new Y(new cr({ob:!0})):new Y(n.va),e.Oa(n.J),e}w.isActive=function(){return!!this.h&&this.h.isActive(this)};function _u(){}w=_u.prototype;w.Ba=function(){};w.Aa=function(){};w.za=function(){};w.ya=function(){};w.isActive=function(){return!0};w.Va=function(){};function Yr(){if(tn&&!(10<=Number(Bg)))throw Error("Environmental error: no available transport.")}Yr.prototype.g=function(n,e){return new be(n,e)};function be(n,e){re.call(this),this.g=new fu(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(n?n["X-WebChannel-Client-Profile"]=e.Ca:n={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=n,(n=e&&e.cc)&&!Ln(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Ln(e)&&(this.g.F=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new dn(this)}se(be,re);be.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var n=this.g,e=this.l,t=this.h||void 0;Ie(0),n.Y=e,n.na=t||{},n.G=n.aa,n.I=Eu(n,null,n.Y),ks(n)};be.prototype.close=function(){To(this.g)};be.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=ho(n),n=t);e.j.push(new wm(e.fb++,n)),e.H==3&&ks(e)};be.prototype.N=function(){this.g.h=null,delete this.j,To(this.g),delete this.g,be.$.N.call(this)};function bu(n){yo.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var e=n.__sm__;if(e){e:{for(const t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}se(bu,yo);function Su(){vo.call(this),this.status=1}se(Su,vo);function dn(n){this.g=n}se(dn,_u);dn.prototype.Ba=function(){ce(this.g,"a")};dn.prototype.Aa=function(n){ce(this.g,new bu(n))};dn.prototype.za=function(n){ce(this.g,new Su)};dn.prototype.ya=function(){ce(this.g,"b")};function Nm(){this.blockSize=-1}function Re(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}se(Re,Nm);Re.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function ii(n,e,t){t||(t=0);var r=Array(16);if(typeof e=="string")for(var s=0;16>s;++s)r[s]=e.charCodeAt(t++)|e.charCodeAt(t++)<<8|e.charCodeAt(t++)<<16|e.charCodeAt(t++)<<24;else for(s=0;16>s;++s)r[s]=e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24;e=n.g[0],t=n.g[1],s=n.g[2];var i=n.g[3],o=e+(i^t&(s^i))+r[0]+3614090360&4294967295;e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[3]+3250441966&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[4]+4118548399&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[7]+4249261313&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[8]+1770035416&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[11]+2304563134&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[12]+1804603682&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[15]+1236535329&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(s^i&(t^s))+r[1]+4129170786&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[0]+3921069994&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[5]+3593408605&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[4]+3889429448&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[9]+568446438&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[8]+1163531501&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[13]+2850285829&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[12]+2368359562&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(t^s^i)+r[5]+4294588738&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[14]+4259657740&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[1]+2763975236&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[10]+3200236656&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[13]+681279174&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[6]+76029189&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[9]+3654602809&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[2]+3299628645&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(s^(t|~i))+r[0]+4096336452&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[5]+4237533241&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[12]+1700485571&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[1]+2240044497&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[8]+1873313359&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[13]+1309151649&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[4]+4149444226&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[9]+3951481745&4294967295,n.g[0]=n.g[0]+e&4294967295,n.g[1]=n.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+s&4294967295,n.g[3]=n.g[3]+i&4294967295}Re.prototype.j=function(n,e){e===void 0&&(e=n.length);for(var t=e-this.blockSize,r=this.m,s=this.h,i=0;i<e;){if(s==0)for(;i<=t;)ii(this,n,i),i+=this.blockSize;if(typeof n=="string"){for(;i<e;)if(r[s++]=n.charCodeAt(i++),s==this.blockSize){ii(this,r),s=0;break}}else for(;i<e;)if(r[s++]=n[i++],s==this.blockSize){ii(this,r),s=0;break}}this.h=s,this.i+=e};Re.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var e=1;e<n.length-8;++e)n[e]=0;var t=8*this.i;for(e=n.length-8;e<n.length;++e)n[e]=t&255,t/=256;for(this.j(n),n=Array(16),e=t=0;4>e;++e)for(var r=0;32>r;r+=8)n[t++]=this.g[e]>>>r&255;return n};function $(n,e){this.h=e;for(var t=[],r=!0,s=n.length-1;0<=s;s--){var i=n[s]|0;r&&i==e||(t[s]=i,r=!1)}this.g=t}var Dm={};function So(n){return-128<=n&&128>n?jg(n,function(e){return new $([e|0],0>e?-1:0)}):new $([n|0],0>n?-1:0)}function Ue(n){if(isNaN(n)||!isFinite(n))return Qt;if(0>n)return ae(Ue(-n));for(var e=[],t=1,r=0;n>=t;r++)e[r]=n/t|0,t*=Ri;return new $(e,0)}function xu(n,e){if(n.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(n.charAt(0)=="-")return ae(xu(n.substring(1),e));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var t=Ue(Math.pow(e,8)),r=Qt,s=0;s<n.length;s+=8){var i=Math.min(8,n.length-s),o=parseInt(n.substring(s,s+i),e);8>i?(i=Ue(Math.pow(e,i)),r=r.R(i).add(Ue(o))):(r=r.R(t),r=r.add(Ue(o)))}return r}var Ri=4294967296,Qt=So(0),Ni=So(1),Wa=So(16777216);w=$.prototype;w.ea=function(){if(Se(this))return-ae(this).ea();for(var n=0,e=1,t=0;t<this.g.length;t++){var r=this.D(t);n+=(0<=r?r:Ri+r)*e,e*=Ri}return n};w.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if(Ke(this))return"0";if(Se(this))return"-"+ae(this).toString(n);for(var e=Ue(Math.pow(n,6)),t=this,r="";;){var s=Jr(t,e).g;t=Xr(t,s.R(e));var i=((0<t.g.length?t.g[0]:t.h)>>>0).toString(n);if(t=s,Ke(t))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};w.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function Ke(n){if(n.h!=0)return!1;for(var e=0;e<n.g.length;e++)if(n.g[e]!=0)return!1;return!0}function Se(n){return n.h==-1}w.X=function(n){return n=Xr(this,n),Se(n)?-1:Ke(n)?0:1};function ae(n){for(var e=n.g.length,t=[],r=0;r<e;r++)t[r]=~n.g[r];return new $(t,~n.h).add(Ni)}w.abs=function(){return Se(this)?ae(this):this};w.add=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0,s=0;s<=e;s++){var i=r+(this.D(s)&65535)+(n.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(n.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,t[s]=o<<16|i}return new $(t,t[t.length-1]&-2147483648?-1:0)};function Xr(n,e){return n.add(ae(e))}w.R=function(n){if(Ke(this)||Ke(n))return Qt;if(Se(this))return Se(n)?ae(this).R(ae(n)):ae(ae(this).R(n));if(Se(n))return ae(this.R(ae(n)));if(0>this.X(Wa)&&0>n.X(Wa))return Ue(this.ea()*n.ea());for(var e=this.g.length+n.g.length,t=[],r=0;r<2*e;r++)t[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<n.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=n.D(s)>>>16,c=n.D(s)&65535;t[2*r+2*s]+=o*c,Tr(t,2*r+2*s),t[2*r+2*s+1]+=i*c,Tr(t,2*r+2*s+1),t[2*r+2*s+1]+=o*a,Tr(t,2*r+2*s+1),t[2*r+2*s+2]+=i*a,Tr(t,2*r+2*s+2)}for(r=0;r<e;r++)t[r]=t[2*r+1]<<16|t[2*r];for(r=e;r<2*e;r++)t[r]=0;return new $(t,0)};function Tr(n,e){for(;(n[e]&65535)!=n[e];)n[e+1]+=n[e]>>>16,n[e]&=65535,e++}function In(n,e){this.g=n,this.h=e}function Jr(n,e){if(Ke(e))throw Error("division by zero");if(Ke(n))return new In(Qt,Qt);if(Se(n))return e=Jr(ae(n),e),new In(ae(e.g),ae(e.h));if(Se(e))return e=Jr(n,ae(e)),new In(ae(e.g),e.h);if(30<n.g.length){if(Se(n)||Se(e))throw Error("slowDivide_ only works with positive integers.");for(var t=Ni,r=e;0>=r.X(n);)t=Ha(t),r=Ha(r);var s=Bt(t,1),i=Bt(r,1);for(r=Bt(r,2),t=Bt(t,2);!Ke(r);){var o=i.add(r);0>=o.X(n)&&(s=s.add(t),i=o),r=Bt(r,1),t=Bt(t,1)}return e=Xr(n,s.R(e)),new In(s,e)}for(s=Qt;0<=n.X(e);){for(t=Math.max(1,Math.floor(n.ea()/e.ea())),r=Math.ceil(Math.log(t)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=Ue(t),o=i.R(e);Se(o)||0<o.X(n);)t-=r,i=Ue(t),o=i.R(e);Ke(i)&&(i=Ni),s=s.add(i),n=Xr(n,o)}return new In(s,n)}w.gb=function(n){return Jr(this,n).h};w.and=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)&n.D(r);return new $(t,this.h&n.h)};w.or=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)|n.D(r);return new $(t,this.h|n.h)};w.xor=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)^n.D(r);return new $(t,this.h^n.h)};function Ha(n){for(var e=n.g.length+1,t=[],r=0;r<e;r++)t[r]=n.D(r)<<1|n.D(r-1)>>>31;return new $(t,n.h)}function Bt(n,e){var t=e>>5;e%=32;for(var r=n.g.length-t,s=[],i=0;i<r;i++)s[i]=0<e?n.D(i+t)>>>e|n.D(i+t+1)<<32-e:n.D(i+t);return new $(s,n.h)}Yr.prototype.createWebChannel=Yr.prototype.g;be.prototype.send=be.prototype.u;be.prototype.open=be.prototype.m;be.prototype.close=be.prototype.close;Is.NO_ERROR=0;Is.TIMEOUT=8;Is.HTTP_ERROR=6;ql.COMPLETE="complete";Wl.EventType=ir;ir.OPEN="a";ir.CLOSE="b";ir.ERROR="c";ir.MESSAGE="d";re.prototype.listen=re.prototype.O;Y.prototype.listenOnce=Y.prototype.P;Y.prototype.getLastError=Y.prototype.Sa;Y.prototype.getLastErrorCode=Y.prototype.Ia;Y.prototype.getStatus=Y.prototype.da;Y.prototype.getResponseJson=Y.prototype.Wa;Y.prototype.getResponseText=Y.prototype.ja;Y.prototype.send=Y.prototype.ha;Y.prototype.setWithCredentials=Y.prototype.Oa;Re.prototype.digest=Re.prototype.l;Re.prototype.reset=Re.prototype.reset;Re.prototype.update=Re.prototype.j;$.prototype.add=$.prototype.add;$.prototype.multiply=$.prototype.R;$.prototype.modulo=$.prototype.gb;$.prototype.compare=$.prototype.X;$.prototype.toNumber=$.prototype.ea;$.prototype.toString=$.prototype.toString;$.prototype.getBits=$.prototype.D;$.fromNumber=Ue;$.fromString=xu;var Mm=function(){return new Yr},Om=function(){return ws()},oi=Is,Pm=ql,Lm=Ft,Ka={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},Um=cr,_r=Wl,Fm=Y,jm=Re,Yt=$;const Ga="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}de.UNAUTHENTICATED=new de(null),de.GOOGLE_CREDENTIALS=new de("google-credentials-uid"),de.FIRST_PARTY=new de("first-party-uid"),de.MOCK_USER=new de("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fn="9.23.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt=new Ki("@firebase/firestore");function Qa(){return Pt.logLevel}function T(n,...e){if(Pt.logLevel<=P.DEBUG){const t=e.map(xo);Pt.debug(`Firestore (${fn}): ${n}`,...t)}}function Je(n,...e){if(Pt.logLevel<=P.ERROR){const t=e.map(xo);Pt.error(`Firestore (${fn}): ${n}`,...t)}}function nn(n,...e){if(Pt.logLevel<=P.WARN){const t=e.map(xo);Pt.warn(`Firestore (${fn}): ${n}`,...t)}}function xo(n){if(typeof n=="string")return n;try{return e=n,JSON.stringify(e)}catch{return n}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(n="Unexpected state"){const e=`FIRESTORE (${fn}) INTERNAL ASSERTION FAILED: `+n;throw Je(e),new Error(e)}function H(n,e){n||k()}function N(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(de.UNAUTHENTICATED))}shutdown(){}}class $m{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Bm{constructor(e){this.t=e,this.currentUser=de.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i;const s=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let i=new Nt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Nt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{T("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(T("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Nt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(T("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string"),new ku(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return H(e===null||typeof e=="string"),new de(e)}}class zm{constructor(e,t,r){this.h=e,this.l=t,this.m=r,this.type="FirstParty",this.user=de.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class qm{constructor(e,t,r){this.h=e,this.l=t,this.m=r}getToken(){return Promise.resolve(new zm(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(de.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Wm{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hm{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,t){const r=i=>{i.error!=null&&T("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,T("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{T("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?s(i):T("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(H(typeof t.token=="string"),this.T=t.token,new Wm(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=Km(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function U(n,e){return n<e?-1:n>e?1:0}function rn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new te(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?U(this.nanoseconds,e.nanoseconds):U(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.timestamp=e}static fromTimestamp(e){return new A(e)}static min(){return new A(new te(0,0))}static max(){return new A(new te(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t,r){t===void 0?t=0:t>e.length&&k(),r===void 0?r=e.length-t:r>e.length-t&&k(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return qn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class W extends qn{construct(e,t,r){return new W(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new E(p.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new W(t)}static emptyPath(){return new W([])}}const Gm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pe extends qn{construct(e,t,r){return new pe(e,t,r)}static isValidIdentifier(e){return Gm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new pe(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new E(p.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new E(p.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new E(p.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new E(p.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pe(t)}static emptyPath(){return new pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _{constructor(e){this.path=e}static fromPath(e){return new _(W.fromString(e))}static fromName(e){return new _(W.fromString(e).popFirst(5))}static empty(){return new _(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&W.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return W.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new _(new W(e.slice()))}}function Qm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=A.fromTimestamp(r===1e9?new te(t+1,0):new te(t,r));return new pt(s,_.empty(),e)}function Ym(n){return new pt(n.readTime,n.key,-1)}class pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new pt(A.min(),_.empty(),-1)}static max(){return new pt(A.max(),_.empty(),-1)}}function Xm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=_.comparator(n.documentKey,e.documentKey),t!==0?t:U(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(n){if(n.code!==p.FAILED_PRECONDITION||n.message!==Jm)throw n;T("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&k(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new m((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof m?t:m.resolve(t)}catch(t){return m.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):m.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):m.reject(t)}static resolve(e){return new m((t,r)=>{t(e)})}static reject(e){return new m((t,r)=>{r(e)})}static waitFor(e){return new m((t,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&t()},c=>r(c))}),o=!0,i===s&&t()})}static or(e){let t=m.resolve(!1);for(const r of e)t=t.next(s=>s?m.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new m((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const l=c;t(e[l]).next(u=>{o[l]=u,++a,a===i&&r(o)},u=>s(u))}})}static doWhile(e,t){return new m((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function dr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>t.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}ko.ct=-1;function Cs(n){return n==null}function Zr(n){return n===0&&1/n==-1/0}function ey(n){return typeof n=="number"&&Number.isInteger(n)&&!Zr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Au(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e,t){this.comparator=e,this.root=t||oe.EMPTY}insert(e,t){return new Q(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,oe.BLACK,null,null))}remove(e){return new Q(this.comparator,this.root.remove(e,this.comparator).copy(null,null,oe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new br(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new br(this.root,e,this.comparator,!1)}getReverseIterator(){return new br(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new br(this.root,e,this.comparator,!0)}}class br{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class oe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??oe.RED,this.left=s??oe.EMPTY,this.right=i??oe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new oe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return oe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return oe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw k();const e=this.left.check();if(e!==this.right.check())throw k();return e+(this.isRed()?0:1)}}oe.EMPTY=null,oe.RED=!0,oe.BLACK=!1;oe.EMPTY=new class{constructor(){this.size=0}get key(){throw k()}get value(){throw k()}get color(){throw k()}get left(){throw k()}get right(){throw k()}copy(n,e,t,r,s){return this}insert(n,e,t){return new oe(n,e)}remove(n,e){return this}isEmpty(){return!0}inorderTraversal(n){return!1}reverseTraversal(n){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.comparator=e,this.data=new Q(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Xa(this.data.getIterator())}getIteratorFrom(e){return new Xa(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class Xa{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new Ae([])}unionWith(e){let t=new ye(pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ae(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return rn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ru("Invalid base64 string: "+s):s}}(e);return new we(t)}static fromUint8Array(e){const t=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new we(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return U(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}we.EMPTY_BYTE_STRING=new we("");const ty=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function gt(n){if(H(!!n),typeof n=="string"){let e=0;const t=ty.exec(n);if(H(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Z(n.seconds),nanos:Z(n.nanos)}}function Z(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Lt(n){return typeof n=="string"?we.fromBase64String(n):we.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ao(n){const e=n.mapValue.fields.__previous_value__;return Co(e)?Ao(e):e}function Wn(n){const e=gt(n.mapValue.fields.__local_write_time__.timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t,r,s,i,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class Hn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Hn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Hn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={mapValue:{}};function Ut(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Co(n)?4:ry(n)?9007199254740991:10:k()}function $e(n,e){if(n===e)return!0;const t=Ut(n);if(t!==Ut(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Wn(n).isEqual(Wn(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=gt(r.timestampValue),o=gt(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,s){return Lt(r.bytesValue).isEqual(Lt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,s){return Z(r.geoPointValue.latitude)===Z(s.geoPointValue.latitude)&&Z(r.geoPointValue.longitude)===Z(s.geoPointValue.longitude)}(n,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return Z(r.integerValue)===Z(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=Z(r.doubleValue),o=Z(s.doubleValue);return i===o?Zr(i)===Zr(o):isNaN(i)&&isNaN(o)}return!1}(n,e);case 9:return rn(n.arrayValue.values||[],e.arrayValue.values||[],$e);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(Ya(i)!==Ya(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!$e(i[a],o[a])))return!1;return!0}(n,e);default:return k()}}function Kn(n,e){return(n.values||[]).find(t=>$e(t,e))!==void 0}function sn(n,e){if(n===e)return 0;const t=Ut(n),r=Ut(e);if(t!==r)return U(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return U(n.booleanValue,e.booleanValue);case 2:return function(s,i){const o=Z(s.integerValue||s.doubleValue),a=Z(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(n,e);case 3:return Ja(n.timestampValue,e.timestampValue);case 4:return Ja(Wn(n),Wn(e));case 5:return U(n.stringValue,e.stringValue);case 6:return function(s,i){const o=Lt(s),a=Lt(i);return o.compareTo(a)}(n.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const l=U(o[c],a[c]);if(l!==0)return l}return U(o.length,a.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,i){const o=U(Z(s.latitude),Z(i.latitude));return o!==0?o:U(Z(s.longitude),Z(i.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const l=sn(o[c],a[c]);if(l)return l}return U(o.length,a.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,i){if(s===Sr.mapValue&&i===Sr.mapValue)return 0;if(s===Sr.mapValue)return 1;if(i===Sr.mapValue)return-1;const o=s.fields||{},a=Object.keys(o),c=i.fields||{},l=Object.keys(c);a.sort(),l.sort();for(let u=0;u<a.length&&u<l.length;++u){const d=U(a[u],l[u]);if(d!==0)return d;const f=sn(o[a[u]],c[l[u]]);if(f!==0)return f}return U(a.length,l.length)}(n.mapValue,e.mapValue);default:throw k()}}function Ja(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return U(n,e);const t=gt(n),r=gt(e),s=U(t.seconds,r.seconds);return s!==0?s:U(t.nanos,r.nanos)}function on(n){return Di(n)}function Di(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(r){const s=gt(r);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?Lt(n.bytesValue).toBase64():"referenceValue"in n?(t=n.referenceValue,_.fromName(t).toString()):"geoPointValue"in n?`geo(${(e=n.geoPointValue).latitude},${e.longitude})`:"arrayValue"in n?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=Di(o);return s+"]"}(n.arrayValue):"mapValue"in n?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${Di(r.fields[a])}`;return i+"}"}(n.mapValue):k();var e,t}function Za(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Mi(n){return!!n&&"integerValue"in n}function Ro(n){return!!n&&"arrayValue"in n}function ec(n){return!!n&&"nullValue"in n}function tc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Mr(n){return!!n&&"mapValue"in n}function An(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=An(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=An(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ry(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Mr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=An(t)}setAll(e){let t=pe.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=a.popLast()}o?r[a.lastSegment()]=An(o):s.push(a.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Mr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $e(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Mr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){pn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new xe(An(this.value))}}function Nu(n){const e=[];return pn(n.fields,(t,r)=>{const s=new pe([t]);if(Mr(r)){const i=Nu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Ae(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t,r,s,i,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new fe(e,0,A.min(),A.min(),A.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new fe(e,1,t,A.min(),r,s,0)}static newNoDocument(e,t){return new fe(e,2,t,A.min(),A.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new fe(e,3,t,A.min(),A.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(A.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=A.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t){this.position=e,this.inclusive=t}}function nc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=_.comparator(_.fromName(o.referenceValue),t.key):r=sn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function rc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!$e(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t="asc"){this.field=e,this.dir=t}}function sy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{}class ee extends Du{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new oy(e,t,r):t==="array-contains"?new ly(e,r):t==="in"?new uy(e,r):t==="not-in"?new hy(e,r):t==="array-contains-any"?new dy(e,r):new ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ay(e,r):new cy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(sn(t,this.value)):t!==null&&Ut(this.value)===Ut(t)&&this.matchesComparison(sn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return k()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Ne extends Du{constructor(e,t){super(),this.filters=e,this.op=t,this.lt=null}static create(e,t){return new Ne(e,t)}matches(e){return Mu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(t=>t.isInequality());return e!==null?e.field:null}ft(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}}function Mu(n){return n.op==="and"}function Ou(n){return iy(n)&&Mu(n)}function iy(n){for(const e of n.filters)if(e instanceof Ne)return!1;return!0}function Oi(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+on(n.value);if(Ou(n))return n.filters.map(e=>Oi(e)).join(",");{const e=n.filters.map(t=>Oi(t)).join(",");return`${n.op}(${e})`}}function Pu(n,e){return n instanceof ee?function(t,r){return r instanceof ee&&t.op===r.op&&t.field.isEqual(r.field)&&$e(t.value,r.value)}(n,e):n instanceof Ne?function(t,r){return r instanceof Ne&&t.op===r.op&&t.filters.length===r.filters.length?t.filters.reduce((s,i,o)=>s&&Pu(i,r.filters[o]),!0):!1}(n,e):void k()}function Lu(n){return n instanceof ee?function(e){return`${e.field.canonicalString()} ${e.op} ${on(e.value)}`}(n):n instanceof Ne?function(e){return e.op.toString()+" {"+e.getFilters().map(Lu).join(" ,")+"}"}(n):"Filter"}class oy extends ee{constructor(e,t,r){super(e,t,r),this.key=_.fromName(r.referenceValue)}matches(e){const t=_.comparator(e.key,this.key);return this.matchesComparison(t)}}class ay extends ee{constructor(e,t){super(e,"in",t),this.keys=Uu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class cy extends ee{constructor(e,t){super(e,"not-in",t),this.keys=Uu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uu(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>_.fromName(r.referenceValue))}class ly extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ro(t)&&Kn(t.arrayValue,this.value)}}class uy extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Kn(this.value.arrayValue,t)}}class hy extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(Kn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Kn(this.value.arrayValue,t)}}class dy extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ro(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Kn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function sc(n,e=null,t=[],r=[],s=null,i=null,o=null){return new fy(n,e,t,r,s,i,o)}function No(n){const e=N(n);if(e.dt===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Oi(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Cs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>on(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>on(r)).join(",")),e.dt=t}return e.dt}function Do(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!sy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Pu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!rc(n.startAt,e.startAt)&&rc(n.endAt,e.endAt)}function Pi(n){return _.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.wt=null,this._t=null,this.startAt,this.endAt}}function py(n,e,t,r,s,i,o,a){return new gn(n,e,t,r,s,i,o,a)}function Mo(n){return new gn(n)}function ic(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Oo(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function As(n){for(const e of n.filters){const t=e.getFirstInequalityField();if(t!==null)return t}return null}function Fu(n){return n.collectionGroup!==null}function Jt(n){const e=N(n);if(e.wt===null){e.wt=[];const t=As(e),r=Oo(e);if(t!==null&&r===null)t.isKeyField()||e.wt.push(new Xt(t)),e.wt.push(new Xt(pe.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Xt(pe.keyField(),i))}}}return e.wt}function Ze(n){const e=N(n);if(!e._t)if(e.limitType==="F")e._t=sc(e.path,e.collectionGroup,Jt(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const i of Jt(e)){const o=i.dir==="desc"?"asc":"desc";t.push(new Xt(i.field,o))}const r=e.endAt?new es(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new es(e.startAt.position,e.startAt.inclusive):null;e._t=sc(e.path,e.collectionGroup,t,e.filters,e.limit,r,s)}return e._t}function Li(n,e){e.getFirstInequalityField(),As(n);const t=n.filters.concat([e]);return new gn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ts(n,e,t){return new gn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Rs(n,e){return Do(Ze(n),Ze(e))&&n.limitType===e.limitType}function ju(n){return`${No(Ze(n))}|lt:${n.limitType}`}function Ui(n){return`Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(r=>Lu(r)).join(", ")}]`),Cs(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>on(r)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>on(r)).join(",")),`Target(${t})`}(Ze(n))}; limitType=${n.limitType})`}function Ns(n,e){return e.isFoundDocument()&&function(t,r){const s=r.key.path;return t.collectionGroup!==null?r.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(s):_.isDocumentKey(t.path)?t.path.isEqual(s):t.path.isImmediateParentOf(s)}(n,e)&&function(t,r){for(const s of Jt(t))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(n,e)&&function(t,r){for(const s of t.filters)if(!s.matches(r))return!1;return!0}(n,e)&&function(t,r){return!(t.startAt&&!function(s,i,o){const a=nc(s,i,o);return s.inclusive?a<=0:a<0}(t.startAt,Jt(t),r)||t.endAt&&!function(s,i,o){const a=nc(s,i,o);return s.inclusive?a>=0:a>0}(t.endAt,Jt(t),r))}(n,e)}function gy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Vu(n){return(e,t)=>{let r=!1;for(const s of Jt(n)){const i=my(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function my(n,e,t){const r=n.field.isKeyField()?_.comparator(e.key,t.key):function(s,i,o){const a=i.data.field(s),c=o.data.field(s);return a!==null&&c!==null?sn(a,c):k()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return k()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){pn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Au(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=new Q(_.comparator);function et(){return yy}const $u=new Q(_.comparator);function bn(...n){let e=$u;for(const t of n)e=e.insert(t.key,t);return e}function Bu(n){let e=$u;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ct(){return Rn()}function zu(){return Rn()}function Rn(){return new mn(n=>n.toString(),(n,e)=>n.isEqual(e))}const vy=new Q(_.comparator),wy=new ye(_.comparator);function M(...n){let e=wy;for(const t of n)e=e.add(t);return e}const Iy=new ye(U);function Ey(){return Iy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zr(e)?"-0":e}}function Wu(n){return{integerValue:""+n}}function Ty(n,e){return ey(e)?Wu(e):qu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(){this._=void 0}}function _y(n,e,t){return n instanceof ns?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&Co(s)&&(s=Ao(s)),s&&(i.fields.__previous_value__=s),{mapValue:i}}(t,e):n instanceof Gn?Ku(n,e):n instanceof Qn?Gu(n,e):function(r,s){const i=Hu(r,s),o=oc(i)+oc(r.gt);return Mi(i)&&Mi(r.gt)?Wu(o):qu(r.serializer,o)}(n,e)}function by(n,e,t){return n instanceof Gn?Ku(n,e):n instanceof Qn?Gu(n,e):t}function Hu(n,e){return n instanceof rs?Mi(t=e)||function(r){return!!r&&"doubleValue"in r}(t)?e:{integerValue:0}:null;var t}class ns extends Ds{}class Gn extends Ds{constructor(e){super(),this.elements=e}}function Ku(n,e){const t=Qu(e);for(const r of n.elements)t.some(s=>$e(s,r))||t.push(r);return{arrayValue:{values:t}}}class Qn extends Ds{constructor(e){super(),this.elements=e}}function Gu(n,e){let t=Qu(e);for(const r of n.elements)t=t.filter(s=>!$e(s,r));return{arrayValue:{values:t}}}class rs extends Ds{constructor(e,t){super(),this.serializer=e,this.gt=t}}function oc(n){return Z(n.integerValue||n.doubleValue)}function Qu(n){return Ro(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Sy(n,e){return n.field.isEqual(e.field)&&function(t,r){return t instanceof Gn&&r instanceof Gn||t instanceof Qn&&r instanceof Qn?rn(t.elements,r.elements,$e):t instanceof rs&&r instanceof rs?$e(t.gt,r.gt):t instanceof ns&&r instanceof ns}(n.transform,e.transform)}class xy{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Or(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ms{}function Yu(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ju(n.key,Ge.none()):new fr(n.key,n.data,Ge.none());{const t=n.data,r=xe.empty();let s=new ye(pe.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new jt(n.key,r,new Ae(s.toArray()),Ge.none())}}function ky(n,e,t){n instanceof fr?function(r,s,i){const o=r.value.clone(),a=cc(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(n,e,t):n instanceof jt?function(r,s,i){if(!Or(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=cc(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(Xu(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(n,e,t):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,t)}function Nn(n,e,t,r){return n instanceof fr?function(s,i,o,a){if(!Or(s.precondition,i))return o;const c=s.value.clone(),l=lc(s.fieldTransforms,a,i);return c.setAll(l),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof jt?function(s,i,o,a){if(!Or(s.precondition,i))return o;const c=lc(s.fieldTransforms,a,i),l=i.data;return l.setAll(Xu(s)),l.setAll(c),i.convertToFoundDocument(i.version,l).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(u=>u.field))}(n,e,t,r):function(s,i,o){return Or(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(n,e,t)}function Cy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Hu(r.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(r.field,i))}return t||null}function ac(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(t,r){return t===void 0&&r===void 0||!(!t||!r)&&rn(t,r,(s,i)=>Sy(s,i))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class fr extends Ms{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class jt extends Ms{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Xu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function cc(n,e,t){const r=new Map;H(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,by(o,a,t[s]))}return r}function lc(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,_y(i,o,e))}return r}class Ju extends Ms{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ay extends Ms{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ky(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Nn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Nn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=zu();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=t.has(s.key)?null:a;const c=Yu(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(A.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),M())}isEqual(e){return this.batchId===e.batchId&&rn(this.mutations,e.mutations,(t,r)=>ac(t,r))&&rn(this.baseMutations,e.baseMutations,(t,r)=>ac(t,r))}}class Po{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){H(e.mutations.length===r.length);let s=vy;const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Po(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J,O;function My(n){switch(n){default:return k();case p.CANCELLED:case p.UNKNOWN:case p.DEADLINE_EXCEEDED:case p.RESOURCE_EXHAUSTED:case p.INTERNAL:case p.UNAVAILABLE:case p.UNAUTHENTICATED:return!1;case p.INVALID_ARGUMENT:case p.NOT_FOUND:case p.ALREADY_EXISTS:case p.PERMISSION_DENIED:case p.FAILED_PRECONDITION:case p.ABORTED:case p.OUT_OF_RANGE:case p.UNIMPLEMENTED:case p.DATA_LOSS:return!0}}function Zu(n){if(n===void 0)return Je("GRPC error has no .code"),p.UNKNOWN;switch(n){case J.OK:return p.OK;case J.CANCELLED:return p.CANCELLED;case J.UNKNOWN:return p.UNKNOWN;case J.DEADLINE_EXCEEDED:return p.DEADLINE_EXCEEDED;case J.RESOURCE_EXHAUSTED:return p.RESOURCE_EXHAUSTED;case J.INTERNAL:return p.INTERNAL;case J.UNAVAILABLE:return p.UNAVAILABLE;case J.UNAUTHENTICATED:return p.UNAUTHENTICATED;case J.INVALID_ARGUMENT:return p.INVALID_ARGUMENT;case J.NOT_FOUND:return p.NOT_FOUND;case J.ALREADY_EXISTS:return p.ALREADY_EXISTS;case J.PERMISSION_DENIED:return p.PERMISSION_DENIED;case J.FAILED_PRECONDITION:return p.FAILED_PRECONDITION;case J.ABORTED:return p.ABORTED;case J.OUT_OF_RANGE:return p.OUT_OF_RANGE;case J.UNIMPLEMENTED:return p.UNIMPLEMENTED;case J.DATA_LOSS:return p.DATA_LOSS;default:return k()}}(O=J||(J={}))[O.OK=0]="OK",O[O.CANCELLED=1]="CANCELLED",O[O.UNKNOWN=2]="UNKNOWN",O[O.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",O[O.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",O[O.NOT_FOUND=5]="NOT_FOUND",O[O.ALREADY_EXISTS=6]="ALREADY_EXISTS",O[O.PERMISSION_DENIED=7]="PERMISSION_DENIED",O[O.UNAUTHENTICATED=16]="UNAUTHENTICATED",O[O.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",O[O.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",O[O.ABORTED=10]="ABORTED",O[O.OUT_OF_RANGE=11]="OUT_OF_RANGE",O[O.UNIMPLEMENTED=12]="UNIMPLEMENTED",O[O.INTERNAL=13]="INTERNAL",O[O.UNAVAILABLE=14]="UNAVAILABLE",O[O.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return xr}static getOrCreateInstance(){return xr===null&&(xr=new Lo),xr}onExistenceFilterMismatch(e){const t=Symbol();return this.onExistenceFilterMismatchCallbacks.set(t,e),()=>this.onExistenceFilterMismatchCallbacks.delete(t)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(t=>t(e))}}let xr=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py=new Yt([4294967295,4294967295],0);function uc(n){const e=Oy().encode(n),t=new jm;return t.update(e),new Uint8Array(t.digest())}function hc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Yt([t,r],0),new Yt([s,i],0)]}class Uo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Sn(`Invalid padding: ${t}`);if(r<0)throw new Sn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Sn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Sn(`Invalid padding when bitmap length is 0: ${t}`);this.It=8*e.length-t,this.Tt=Yt.fromNumber(this.It)}Et(e,t,r){let s=e.add(t.multiply(Yt.fromNumber(r)));return s.compare(Py)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const t=uc(e),[r,s]=hc(t);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);if(!this.At(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Uo(i,s,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const t=uc(e),[r,s]=hc(t);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);this.Rt(o)}}Rt(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Sn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,pr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Os(A.min(),s,new Q(U),et(),M())}}class pr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new pr(r,t,M(),M(),M())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t,r,s){this.Pt=e,this.removedTargetIds=t,this.key=r,this.bt=s}}class eh{constructor(e,t){this.targetId=e,this.Vt=t}}class th{constructor(e,t,r=we.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class dc{constructor(){this.St=0,this.Dt=pc(),this.Ct=we.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=M(),t=M(),r=M();return this.Dt.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:k()}}),new pr(this.Ct,this.xt,e,t,r)}Ft(){this.Nt=!1,this.Dt=pc()}Bt(e,t){this.Nt=!0,this.Dt=this.Dt.insert(e,t)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class Ly{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=et(),this.zt=fc(),this.Wt=new Q(U)}Ht(e){for(const t of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(t,e.bt):this.Yt(t,e.key,e.bt);for(const t of e.removedTargetIds)this.Yt(t,e.key,e.bt)}Xt(e){this.forEachTarget(e,t=>{const r=this.Zt(t);switch(e.state){case 0:this.te(t)&&r.$t(e.resumeToken);break;case 1:r.Ut(),r.kt||r.Ft(),r.$t(e.resumeToken);break;case 2:r.Ut(),r.kt||this.removeTarget(t);break;case 3:this.te(t)&&(r.Kt(),r.$t(e.resumeToken));break;case 4:this.te(t)&&(this.ee(t),r.$t(e.resumeToken));break;default:k()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Qt.forEach((r,s)=>{this.te(s)&&t(s)})}ne(e){var t;const r=e.targetId,s=e.Vt.count,i=this.se(r);if(i){const o=i.target;if(Pi(o))if(s===0){const a=new _(o.path);this.Yt(r,a,fe.newNoDocument(a,A.min()))}else H(s===1);else{const a=this.ie(r);if(a!==s){const c=this.re(e,a);if(c!==0){this.ee(r);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(r,l)}(t=Lo.instance)===null||t===void 0||t.notifyOnExistenceFilterMismatch(function(l,u,d){var f,g,I,S,x,z;const L={localCacheCount:u,existenceFilterCount:d.count},K=d.unchangedNames;return K&&(L.bloomFilter={applied:l===0,hashCount:(f=K==null?void 0:K.hashCount)!==null&&f!==void 0?f:0,bitmapLength:(S=(I=(g=K==null?void 0:K.bits)===null||g===void 0?void 0:g.bitmap)===null||I===void 0?void 0:I.length)!==null&&S!==void 0?S:0,padding:(z=(x=K==null?void 0:K.bits)===null||x===void 0?void 0:x.padding)!==null&&z!==void 0?z:0}),L}(c,a,e.Vt))}}}}re(e,t){const{unchangedNames:r,count:s}=e.Vt;if(!r||!r.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=r;let c,l;try{c=Lt(i).toUint8Array()}catch(u){if(u instanceof Ru)return nn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw u}try{l=new Uo(c,o,a)}catch(u){return nn(u instanceof Sn?"BloomFilter error: ":"Applying bloom filter failed: ",u),1}return l.It===0?1:s!==t-this.oe(e.targetId,l)?2:0}oe(e,t){const r=this.Gt.getRemoteKeysForTarget(e);let s=0;return r.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.vt(a)||(this.Yt(e,i,null),s++)}),s}ce(e){const t=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&Pi(a.target)){const c=new _(a.target.path);this.jt.get(c)!==null||this.ae(o,c)||this.Yt(o,c,fe.newNoDocument(c,e))}i.Mt&&(t.set(o,i.Ot()),i.Ft())}});let r=M();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const l=this.se(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const s=new Os(e,t,this.Wt,this.jt,r);return this.jt=et(),this.zt=fc(),this.Wt=new Q(U),s}Jt(e,t){if(!this.te(e))return;const r=this.ae(e,t.key)?2:0;this.Zt(e).Bt(t.key,r),this.jt=this.jt.insert(t.key,t),this.zt=this.zt.insert(t.key,this.he(t.key).add(e))}Yt(e,t,r){if(!this.te(e))return;const s=this.Zt(e);this.ae(e,t)?s.Bt(t,1):s.Lt(t),this.zt=this.zt.insert(t,this.he(t).delete(e)),r&&(this.jt=this.jt.insert(t,r))}removeTarget(e){this.Qt.delete(e)}ie(e){const t=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let t=this.Qt.get(e);return t||(t=new dc,this.Qt.set(e,t)),t}he(e){let t=this.zt.get(e);return t||(t=new ye(U),this.zt=this.zt.insert(e,t)),t}te(e){const t=this.se(e)!==null;return t||T("WatchChangeAggregator","Detected inactive target",e),t}se(e){const t=this.Qt.get(e);return t&&t.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new dc),this.Gt.getRemoteKeysForTarget(e).forEach(t=>{this.Yt(e,t,null)})}ae(e,t){return this.Gt.getRemoteKeysForTarget(e).has(t)}}function fc(){return new Q(_.comparator)}function pc(){return new Q(_.comparator)}const Uy={asc:"ASCENDING",desc:"DESCENDING"},Fy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jy={and:"AND",or:"OR"};class Vy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Fi(n,e){return n.useProto3Json||Cs(e)?e:{value:e}}function ss(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function nh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function $y(n,e){return ss(n,e.toTimestamp())}function Ve(n){return H(!!n),A.fromTimestamp(function(e){const t=gt(e);return new te(t.seconds,t.nanos)}(n))}function Fo(n,e){return function(t){return new W(["projects",t.projectId,"databases",t.database])}(n).child("documents").child(e).canonicalString()}function rh(n){const e=W.fromString(n);return H(ah(e)),e}function ji(n,e){return Fo(n.databaseId,e.path)}function ai(n,e){const t=rh(e);if(t.get(1)!==n.databaseId.projectId)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new _(sh(t))}function Vi(n,e){return Fo(n.databaseId,e)}function By(n){const e=rh(n);return e.length===4?W.emptyPath():sh(e)}function $i(n){return new W(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function sh(n){return H(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function gc(n,e,t){return{name:ji(n,e),fields:t.value.mapValue.fields}}function zy(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:k()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,l){return c.useProto3Json?(H(l===void 0||typeof l=="string"),we.fromBase64String(l||"")):(H(l===void 0||l instanceof Uint8Array),we.fromUint8Array(l||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const l=c.code===void 0?p.UNKNOWN:Zu(c.code);return new E(l,c.message||"")}(o);t=new th(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ai(n,r.document.name),i=Ve(r.document.updateTime),o=r.document.createTime?Ve(r.document.createTime):A.min(),a=new xe({mapValue:{fields:r.document.fields}}),c=fe.newFoundDocument(s,i,o,a),l=r.targetIds||[],u=r.removedTargetIds||[];t=new Pr(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ai(n,r.document),i=r.readTime?Ve(r.readTime):A.min(),o=fe.newNoDocument(s,i),a=r.removedTargetIds||[];t=new Pr([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ai(n,r.document),i=r.removedTargetIds||[];t=new Pr([],i,s,null)}else{if(!("filter"in e))return k();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Dy(s,i),a=r.targetId;t=new eh(a,o)}}return t}function qy(n,e){let t;if(e instanceof fr)t={update:gc(n,e.key,e.value)};else if(e instanceof Ju)t={delete:ji(n,e.key)};else if(e instanceof jt)t={update:gc(n,e.key,e.data),updateMask:Zy(e.fieldMask)};else{if(!(e instanceof Ay))return k();t={verify:ji(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof ns)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Gn)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Qn)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof rs)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw k()}(0,r))),e.precondition.isNone||(t.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:$y(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:k()}(n,e.precondition)),t}function Wy(n,e){return n&&n.length>0?(H(e!==void 0),n.map(t=>function(r,s){let i=r.updateTime?Ve(r.updateTime):Ve(s);return i.isEqual(A.min())&&(i=Ve(s)),new xy(i,r.transformResults||[])}(t,e))):[]}function Hy(n,e){return{documents:[Vi(n,e.path)]}}function Ky(n,e){const t={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(t.parent=Vi(n,r),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=Vi(n,r.popLast()),t.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(c){if(c.length!==0)return oh(Ne.create(c,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const i=function(c){if(c.length!==0)return c.map(l=>function(u){return{field:zt(u.field),direction:Yy(u.dir)}}(l))}(e.orderBy);i&&(t.structuredQuery.orderBy=i);const o=Fi(n,e.limit);var a;return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),t}function Gy(n){let e=By(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){H(r===1);const u=t.from[0];u.allDescendants?s=u.collectionId:e=e.child(u.collectionId)}let i=[];t.where&&(i=function(u){const d=ih(u);return d instanceof Ne&&Ou(d)?d.getFilters():[d]}(t.where));let o=[];t.orderBy&&(o=t.orderBy.map(u=>function(d){return new Xt(qt(d.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(d.direction))}(u)));let a=null;t.limit&&(a=function(u){let d;return d=typeof u=="object"?u.value:u,Cs(d)?null:d}(t.limit));let c=null;t.startAt&&(c=function(u){const d=!!u.before,f=u.values||[];return new es(f,d)}(t.startAt));let l=null;return t.endAt&&(l=function(u){const d=!u.before,f=u.values||[];return new es(f,d)}(t.endAt)),py(e,s,o,i,a,"F",c,l)}function Qy(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return k()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ih(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=qt(e.unaryFilter.field);return ee.create(t,"==",{doubleValue:NaN});case"IS_NULL":const r=qt(e.unaryFilter.field);return ee.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=qt(e.unaryFilter.field);return ee.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=qt(e.unaryFilter.field);return ee.create(i,"!=",{nullValue:"NULL_VALUE"});default:return k()}}(n):n.fieldFilter!==void 0?function(e){return ee.create(qt(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return k()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Ne.create(e.compositeFilter.filters.map(t=>ih(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return k()}}(e.compositeFilter.op))}(n):k()}function Yy(n){return Uy[n]}function Xy(n){return Fy[n]}function Jy(n){return jy[n]}function zt(n){return{fieldPath:n.canonicalString()}}function qt(n){return pe.fromServerFormat(n.fieldPath)}function oh(n){return n instanceof ee?function(e){if(e.op==="=="){if(tc(e.value))return{unaryFilter:{field:zt(e.field),op:"IS_NAN"}};if(ec(e.value))return{unaryFilter:{field:zt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(tc(e.value))return{unaryFilter:{field:zt(e.field),op:"IS_NOT_NAN"}};if(ec(e.value))return{unaryFilter:{field:zt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:zt(e.field),op:Xy(e.op),value:e.value}}}(n):n instanceof Ne?function(e){const t=e.getFilters().map(r=>oh(r));return t.length===1?t[0]:{compositeFilter:{op:Jy(e.op),filters:t}}}(n):k()}function Zy(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ah(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t,r,s,i=A.min(),o=A.min(),a=we.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e){this.fe=e}}function tv(n){const e=Gy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ts(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(){this.rn=new rv}addToCollectionParentIndex(e,t){return this.rn.add(t),m.resolve()}getCollectionParents(e,t){return m.resolve(this.rn.getEntries(t))}addFieldIndex(e,t){return m.resolve()}deleteFieldIndex(e,t){return m.resolve()}getDocumentsMatchingTarget(e,t){return m.resolve(null)}getIndexType(e,t){return m.resolve(0)}getFieldIndexes(e,t){return m.resolve([])}getNextCollectionGroupToUpdate(e){return m.resolve(null)}getMinOffset(e,t){return m.resolve(pt.min())}getMinOffsetFromCollectionGroup(e,t){return m.resolve(pt.min())}updateCollectionGroup(e,t,r){return m.resolve()}updateIndexEntries(e,t){return m.resolve()}}class rv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ye(W.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ye(W.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new an(0)}static Mn(){return new an(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(){this.changes=new mn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?m.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Nn(r.mutation,s,Ae.empty(),te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,M()).next(()=>r))}getLocalViewOfDocuments(e,t,r=M()){const s=Ct();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=bn();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Ct();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,M()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,s){let i=et();const o=Rn(),a=Rn();return t.forEach((c,l)=>{const u=r.get(l.key);s.has(l.key)&&(u===void 0||u.mutation instanceof jt)?i=i.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),Nn(u.mutation,l,u.mutation.getFieldMask(),te.now())):o.set(l.key,Ae.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((l,u)=>o.set(l,u)),t.forEach((l,u)=>{var d;return a.set(l,new iv(u,(d=o.get(l))!==null&&d!==void 0?d:null))}),a))}recalculateAndSaveOverlays(e,t){const r=Rn();let s=new Q((o,a)=>o-a),i=M();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(c=>{const l=t.get(c);if(l===null)return;let u=r.get(c)||Ae.empty();u=a.applyToLocalView(l,u),r.set(c,u);const d=(s.get(a.batchId)||M()).add(c);s=s.insert(a.batchId,d)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,u=c.value,d=zu();u.forEach(f=>{if(!i.has(f)){const g=Yu(t.get(f),r.get(f));g!==null&&d.set(f,g),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,d))}return m.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r){return function(s){return _.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r):this.getDocumentsMatchingCollectionQuery(e,t,r)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):m.resolve(Ct());let a=-1,c=i;return o.next(l=>m.forEach(l,(u,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),i.get(u)?m.resolve():this.remoteDocumentCache.getEntry(e,u).next(f=>{c=c.insert(u,f)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,c,l,M())).next(u=>({batchId:a,changes:Bu(u)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new _(t)).next(r=>{let s=bn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r){const s=t.collectionGroup;let i=bn();return this.indexManager.getCollectionParents(e,s).next(o=>m.forEach(o,a=>{const c=function(l,u){return new gn(u,null,l.explicitOrderBy.slice(),l.filters.slice(),l.limit,l.limitType,l.startAt,l.endAt)}(t,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r).next(l=>{l.forEach((u,d)=>{i=i.insert(u,d)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s))).next(i=>{s.forEach((a,c)=>{const l=c.getKey();i.get(l)===null&&(i=i.insert(l,fe.newInvalidDocument(l)))});let o=bn();return i.forEach((a,c)=>{const l=s.get(a);l!==void 0&&Nn(l.mutation,c,Ae.empty(),te.now()),Ns(t,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,t){return m.resolve(this.cs.get(t))}saveBundleMetadata(e,t){var r;return this.cs.set(t.id,{id:(r=t).id,version:r.version,createTime:Ve(r.createTime)}),m.resolve()}getNamedQuery(e,t){return m.resolve(this.hs.get(t))}saveNamedQuery(e,t){return this.hs.set(t.name,function(r){return{name:r.name,query:tv(r.bundledQuery),readTime:Ve(r.readTime)}}(t)),m.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.overlays=new Q(_.comparator),this.ls=new Map}getOverlay(e,t){return m.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ct();return m.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.we(e,t,i)}),m.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.ls.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(r)),m.resolve()}getOverlaysForCollection(e,t,r){const s=Ct(),i=t.length+1,o=new _(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return m.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Q((l,u)=>l-u);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let u=i.get(l.largestBatchId);u===null&&(u=Ct(),i=i.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}const a=Ct(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=s)););return m.resolve(a)}we(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.ls.get(s.largestBatchId).delete(r.key);this.ls.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ny(t,r));let i=this.ls.get(t);i===void 0&&(i=M(),this.ls.set(t,i)),this.ls.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(){this.fs=new ye(ne.ds),this.ws=new ye(ne._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,t){const r=new ne(e,t);this.fs=this.fs.add(r),this.ws=this.ws.add(r)}gs(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.ys(new ne(e,t))}ps(e,t){e.forEach(r=>this.removeReference(r,t))}Is(e){const t=new _(new W([])),r=new ne(t,e),s=new ne(t,e+1),i=[];return this.ws.forEachInRange([r,s],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const t=new _(new W([])),r=new ne(t,e),s=new ne(t,e+1);let i=M();return this.ws.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new ne(e,0),r=this.fs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ne{constructor(e,t){this.key=e,this.As=t}static ds(e,t){return _.comparator(e.key,t.key)||U(e.As,t.As)}static _s(e,t){return U(e.As,t.As)||_.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.vs=1,this.Rs=new ye(ne.ds)}checkEmpty(e){return m.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ry(i,t,r,s);this.mutationQueue.push(o);for(const a of s)this.Rs=this.Rs.add(new ne(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return m.resolve(o)}lookupMutationBatch(e,t){return m.resolve(this.Ps(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.bs(r),i=s<0?0:s;return m.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return m.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return m.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ne(t,0),s=new ne(t,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([r,s],o=>{const a=this.Ps(o.As);i.push(a)}),m.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(U);return t.forEach(s=>{const i=new ne(s,0),o=new ne(s,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{r=r.add(a.As)})}),m.resolve(this.Vs(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;_.isDocumentKey(i)||(i=i.child(""));const o=new ne(new _(i),0);let a=new ye(U);return this.Rs.forEachWhile(c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(a=a.add(c.As)),!0)},o),m.resolve(this.Vs(a))}Vs(e){const t=[];return e.forEach(r=>{const s=this.Ps(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){H(this.Ss(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Rs;return m.forEach(t.mutations,s=>{const i=new ne(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Rs=r})}Cn(e){}containsKey(e,t){const r=new ne(t,0),s=this.Rs.firstAfterOrEqual(r);return m.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,m.resolve()}Ss(e,t){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const t=this.bs(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(e){this.Ds=e,this.docs=new Q(_.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.Ds(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return m.resolve(r?r.document.mutableCopy():fe.newInvalidDocument(t))}getEntries(e,t){let r=et();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():fe.newInvalidDocument(s))}),m.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=et();const o=t.path,a=new _(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:u}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Xm(Ym(u),r)<=0||(s.has(u.key)||Ns(t,u))&&(i=i.insert(u.key,u.mutableCopy()))}return m.resolve(i)}getAllFromCollectionGroup(e,t,r,s){k()}Cs(e,t){return m.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new hv(this)}getSize(e){return m.resolve(this.size)}}class hv extends sv{constructor(e){super(),this.os=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.os.addEntry(e,s)):this.os.removeEntry(r)}),m.waitFor(t)}getFromCache(e,t){return this.os.getEntry(e,t)}getAllFromCache(e,t){return this.os.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e){this.persistence=e,this.xs=new mn(t=>No(t),Do),this.lastRemoteSnapshotVersion=A.min(),this.highestTargetId=0,this.Ns=0,this.ks=new jo,this.targetCount=0,this.Ms=an.kn()}forEachTarget(e,t){return this.xs.forEach((r,s)=>t(s)),m.resolve()}getLastRemoteSnapshotVersion(e){return m.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return m.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),m.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Ns&&(this.Ns=t),m.resolve()}Fn(e){this.xs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Ms=new an(t),this.highestTargetId=t),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,t){return this.Fn(t),this.targetCount+=1,m.resolve()}updateTargetData(e,t){return this.Fn(t),m.resolve()}removeTargetData(e,t){return this.xs.delete(t.target),this.ks.Is(t.targetId),this.targetCount-=1,m.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),m.waitFor(i).next(()=>s)}getTargetCount(e){return m.resolve(this.targetCount)}getTargetData(e,t){const r=this.xs.get(t)||null;return m.resolve(r)}addMatchingKeys(e,t,r){return this.ks.gs(t,r),m.resolve()}removeMatchingKeys(e,t,r){this.ks.ps(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),m.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ks.Is(t),m.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ks.Es(t);return m.resolve(r)}containsKey(e,t){return m.resolve(this.ks.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e,t){this.$s={},this.overlays={},this.Os=new ko(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new dv(this),this.indexManager=new nv,this.remoteDocumentCache=function(r){return new uv(r)}(r=>this.referenceDelegate.Ls(r)),this.serializer=new ev(t),this.qs=new av(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new cv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.$s[e.toKey()];return r||(r=new lv(t,this.referenceDelegate),this.$s[e.toKey()]=r),r}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,t,r){T("MemoryPersistence","Starting transaction:",e);const s=new pv(this.Os.next());return this.referenceDelegate.Us(),r(s).next(i=>this.referenceDelegate.Ks(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Gs(e,t){return m.or(Object.values(this.$s).map(r=>()=>r.containsKey(e,t)))}}class pv extends Zm{constructor(e){super(),this.currentSequenceNumber=e}}class Vo{constructor(e){this.persistence=e,this.Qs=new jo,this.js=null}static zs(e){return new Vo(e)}get Ws(){if(this.js)return this.js;throw k()}addReference(e,t,r){return this.Qs.addReference(r,t),this.Ws.delete(r.toString()),m.resolve()}removeReference(e,t,r){return this.Qs.removeReference(r,t),this.Ws.add(r.toString()),m.resolve()}markPotentiallyOrphaned(e,t){return this.Ws.add(t.toString()),m.resolve()}removeTarget(e,t){this.Qs.Is(t.targetId).forEach(s=>this.Ws.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Ws.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Us(){this.js=new Set}Ks(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return m.forEach(this.Ws,r=>{const s=_.fromPath(r);return this.Hs(e,s).next(i=>{i||t.removeEntry(s,A.min())})}).next(()=>(this.js=null,t.apply(e)))}updateLimboDocument(e,t){return this.Hs(e,t).next(r=>{r?this.Ws.delete(t.toString()):this.Ws.add(t.toString())})}Ls(e){return 0}Hs(e,t){return m.or([()=>m.resolve(this.Qs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gs(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Fi=r,this.Bi=s}static Li(e,t){let r=M(),s=M();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new $o(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(){this.qi=!1}initialize(e,t){this.Ui=e,this.indexManager=t,this.qi=!0}getDocumentsMatchingQuery(e,t,r,s){return this.Ki(e,t).next(i=>i||this.Gi(e,t,s,r)).next(i=>i||this.Qi(e,t))}Ki(e,t){if(ic(t))return m.resolve(null);let r=Ze(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ts(t,null,"F"),r=Ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=M(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const l=this.ji(t,a);return this.zi(t,l,o,c.readTime)?this.Ki(e,ts(t,null,"F")):this.Wi(e,l,t,c)}))})))}Gi(e,t,r,s){return ic(t)||s.isEqual(A.min())?this.Qi(e,t):this.Ui.getDocuments(e,r).next(i=>{const o=this.ji(t,i);return this.zi(t,o,r,s)?this.Qi(e,t):(Qa()<=P.DEBUG&&T("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ui(t)),this.Wi(e,o,t,Qm(s,-1)))})}ji(e,t){let r=new ye(Vu(e));return t.forEach((s,i)=>{Ns(e,i)&&(r=r.add(i))}),r}zi(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Qi(e,t){return Qa()<=P.DEBUG&&T("QueryEngine","Using full collection scan to execute query:",Ui(t)),this.Ui.getDocumentsMatchingQuery(e,t,pt.min())}Wi(e,t,r,s){return this.Ui.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(e,t,r,s){this.persistence=e,this.Hi=t,this.serializer=s,this.Ji=new Q(U),this.Yi=new mn(i=>No(i),Do),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(r)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ov(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ji))}}function yv(n,e,t,r){return new mv(n,e,t,r)}async function ch(n,e){const t=N(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.tr(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let c=M();for(const l of s){o.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}for(const l of i){a.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}return t.localDocuments.getDocuments(r,c).next(l=>({er:l,removedBatchIds:o,addedBatchIds:a}))})})}function vv(n,e){const t=N(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,l){const u=c.batch,d=u.keys();let f=m.resolve();return d.forEach(g=>{f=f.next(()=>l.getEntry(a,g)).next(I=>{const S=c.docVersions.get(g);H(S!==null),I.version.compareTo(S)<0&&(u.applyToRemoteDocument(I,c),I.isValidDocument()&&(I.setReadTime(c.commitVersion),l.addEntry(I)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=M();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function lh(n){const e=N(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Bs.getLastRemoteSnapshotVersion(t))}function wv(n,e){const t=N(n),r=e.snapshotVersion;let s=t.Ji;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.Zi.newChangeBuffer({trackRemovals:!0});s=t.Ji;const a=[];e.targetChanges.forEach((u,d)=>{const f=s.get(d);if(!f)return;a.push(t.Bs.removeMatchingKeys(i,u.removedDocuments,d).next(()=>t.Bs.addMatchingKeys(i,u.addedDocuments,d)));let g=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(d)!==null?g=g.withResumeToken(we.EMPTY_BYTE_STRING,A.min()).withLastLimboFreeSnapshotVersion(A.min()):u.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(u.resumeToken,r)),s=s.insert(d,g),function(I,S,x){return I.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=3e8?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(f,g,u)&&a.push(t.Bs.updateTargetData(i,g))});let c=et(),l=M();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(Iv(i,o,e.documentUpdates).next(u=>{c=u.nr,l=u.sr})),!r.isEqual(A.min())){const u=t.Bs.getLastRemoteSnapshotVersion(i).next(d=>t.Bs.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(u)}return m.waitFor(a).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,c,l)).next(()=>c)}).then(i=>(t.Ji=s,i))}function Iv(n,e,t){let r=M(),s=M();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=et();return t.forEach((a,c)=>{const l=i.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(A.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):T("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{nr:o,sr:s}})}function Ev(n,e){const t=N(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Tv(n,e){const t=N(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Bs.getTargetData(r,e).next(i=>i?(s=i,m.resolve(s)):t.Bs.allocateTargetId(r).next(o=>(s=new ct(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Bs.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ji.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ji=t.Ji.insert(r.targetId,r),t.Yi.set(e,r.targetId)),r})}async function Bi(n,e,t){const r=N(n),s=r.Ji.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!dr(o))throw o;T("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ji=r.Ji.remove(e),r.Yi.delete(s.target)}function mc(n,e,t){const r=N(n);let s=A.min(),i=M();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,l){const u=N(a),d=u.Yi.get(l);return d!==void 0?m.resolve(u.Ji.get(d)):u.Bs.getTargetData(c,l)}(r,o,Ze(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Bs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.Hi.getDocumentsMatchingQuery(o,e,t?s:A.min(),t?i:M())).next(a=>(_v(r,gy(e),a),{documents:a,ir:i})))}function _v(n,e,t){let r=n.Xi.get(e)||A.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Xi.set(e,r)}class yc{constructor(){this.activeTargetIds=Ey()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class bv{constructor(){this.Hr=new yc,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,t,r){this.Jr[e]=t}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new yc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){T("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){T("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kr=null;function ci(){return kr===null?kr=268435456+Math.round(2147483648*Math.random()):kr++,"0x"+kr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="WebChannelConnection";class Cv extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.mo=t+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,t,r,s,i){const o=ci(),a=this.To(e,t);T("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const c={};return this.Eo(c,s,i),this.Ao(e,a,c,r).then(l=>(T("RestConnection",`Received RPC '${e}' ${o}: `,l),l),l=>{throw nn("RestConnection",`RPC '${e}' ${o} failed with error: `,l,"url: ",a,"request:",r),l})}vo(e,t,r,s,i,o){return this.Io(e,t,r,s,i)}Eo(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+fn,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}To(e,t){const r=xv[e];return`${this.mo}/v1/${t}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,t,r,s){const i=ci();return new Promise((o,a)=>{const c=new Fm;c.setWithCredentials(!0),c.listenOnce(Pm.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case oi.NO_ERROR:const u=c.getResponseJson();T(he,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case oi.TIMEOUT:T(he,`RPC '${e}' ${i} timed out`),a(new E(p.DEADLINE_EXCEEDED,"Request time out"));break;case oi.HTTP_ERROR:const d=c.getStatus();if(T(he,`RPC '${e}' ${i} failed with status:`,d,"response text:",c.getResponseText()),d>0){let f=c.getResponseJson();Array.isArray(f)&&(f=f[0]);const g=f==null?void 0:f.error;if(g&&g.status&&g.message){const I=function(S){const x=S.toLowerCase().replace(/_/g,"-");return Object.values(p).indexOf(x)>=0?x:p.UNKNOWN}(g.status);a(new E(I,g.message))}else a(new E(p.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new E(p.UNAVAILABLE,"Connection failed."));break;default:k()}}finally{T(he,`RPC '${e}' ${i} completed.`)}});const l=JSON.stringify(s);T(he,`RPC '${e}' ${i} sending request:`,s),c.send(t,"POST",l,r,15)})}Ro(e,t,r){const s=ci(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Mm(),a=Om(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.xmlHttpFactory=new Um({})),this.Eo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const u=i.join("");T(he,`Creating RPC '${e}' stream ${s}: ${u}`,c);const d=o.createWebChannel(u,c);let f=!1,g=!1;const I=new kv({ro:x=>{g?T(he,`Not sending because RPC '${e}' stream ${s} is closed:`,x):(f||(T(he,`Opening RPC '${e}' stream ${s} transport.`),d.open(),f=!0),T(he,`RPC '${e}' stream ${s} sending:`,x),d.send(x))},oo:()=>d.close()}),S=(x,z,L)=>{x.listen(z,K=>{try{L(K)}catch(ie){setTimeout(()=>{throw ie},0)}})};return S(d,_r.EventType.OPEN,()=>{g||T(he,`RPC '${e}' stream ${s} transport opened.`)}),S(d,_r.EventType.CLOSE,()=>{g||(g=!0,T(he,`RPC '${e}' stream ${s} transport closed`),I.wo())}),S(d,_r.EventType.ERROR,x=>{g||(g=!0,nn(he,`RPC '${e}' stream ${s} transport errored:`,x),I.wo(new E(p.UNAVAILABLE,"The operation could not be completed")))}),S(d,_r.EventType.MESSAGE,x=>{var z;if(!g){const L=x.data[0];H(!!L);const K=L,ie=K.error||((z=K[0])===null||z===void 0?void 0:z.error);if(ie){T(he,`RPC '${e}' stream ${s} received error:`,ie);const ke=ie.status;let le=function(De){const Me=J[De];if(Me!==void 0)return Zu(Me)}(ke),G=ie.message;le===void 0&&(le=p.INTERNAL,G="Unknown error status: "+ke+" with message "+ie.message),g=!0,I.wo(new E(le,G)),d.close()}else T(he,`RPC '${e}' stream ${s} received:`,L),I._o(L)}}),S(a,Lm.STAT_EVENT,x=>{x.stat===Ka.PROXY?T(he,`RPC '${e}' stream ${s} detected buffering proxy`):x.stat===Ka.NOPROXY&&T(he,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{I.fo()},0),I}}function li(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(n){return new Vy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ii=e,this.timerId=t,this.Po=r,this.bo=s,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const t=Math.floor(this.So+this.ko()),r=Math.max(0,Date.now()-this.Co),s=Math.max(0,t-r);s>0&&T("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.So} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,s,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(e,t,r,s,i,o,a,c){this.ii=e,this.$o=r,this.Oo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new uh(e,t)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,t){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():t&&t.code===p.RESOURCE_EXHAUSTED?(Je(t.toString()),Je("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):t&&t.code===p.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(t)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),t=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Fo===t&&this.Zo(r,s)},r=>{e(()=>{const s=new E(p.UNKNOWN,"Fetching auth token failed: "+r.message);return this.tu(s)})})}Zo(e,t){const r=this.Xo(this.Fo);this.stream=this.eu(e,t),this.stream.uo(()=>{r(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(s=>{r(()=>this.tu(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return T("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return t=>{this.ii.enqueueAndForget(()=>this.Fo===e?t():(T("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Av extends hh{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}eu(e,t){return this.connection.Ro("Listen",e,t)}onMessage(e){this.qo.reset();const t=zy(this.serializer,e),r=function(s){if(!("targetChange"in s))return A.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?A.min():i.readTime?Ve(i.readTime):A.min()}(e);return this.listener.nu(t,r)}su(e){const t={};t.database=$i(this.serializer),t.addTarget=function(s,i){let o;const a=i.target;if(o=Pi(a)?{documents:Hy(s,a)}:{query:Ky(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=nh(s,i.resumeToken);const c=Fi(s,i.expectedCount);c!==null&&(o.expectedCount=c)}else if(i.snapshotVersion.compareTo(A.min())>0){o.readTime=ss(s,i.snapshotVersion.toTimestamp());const c=Fi(s,i.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,e);const r=Qy(this.serializer,e);r&&(t.labels=r),this.Wo(t)}iu(e){const t={};t.database=$i(this.serializer),t.removeTarget=e,this.Wo(t)}}class Rv extends hh{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,t){return this.connection.Ro("Write",e,t)}onMessage(e){if(H(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const t=Wy(e.writeResults,e.commitTime),r=Ve(e.commitTime);return this.listener.cu(r,t)}return H(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=$i(this.serializer),this.Wo(e)}uu(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>qy(this.serializer,r))};this.Wo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.lu=!1}fu(){if(this.lu)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,t,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Io(e,t,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(p.UNKNOWN,s.toString())})}vo(e,t,r,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,t,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new E(p.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class Dv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(Je(t),this.mu=!1):T("OnlineStateTracker",t)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{r.enqueueAndForget(async()=>{Vt(this)&&(T("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=N(a);c.vu.add(4),await gr(c),c.bu.set("Unknown"),c.vu.delete(4),await Ls(c)}(this))})}),this.bu=new Dv(r,s)}}async function Ls(n){if(Vt(n))for(const e of n.Ru)await e(!0)}async function gr(n){for(const e of n.Ru)await e(!1)}function dh(n,e){const t=N(n);t.Au.has(e.targetId)||(t.Au.set(e.targetId,e),qo(t)?zo(t):yn(t).Ko()&&Bo(t,e))}function fh(n,e){const t=N(n),r=yn(t);t.Au.delete(e),r.Ko()&&ph(t,e),t.Au.size===0&&(r.Ko()?r.jo():Vt(t)&&t.bu.set("Unknown"))}function Bo(n,e){if(n.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(A.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}yn(n).su(e)}function ph(n,e){n.Vu.qt(e),yn(n).iu(e)}function zo(n){n.Vu=new Ly({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),le:e=>n.Au.get(e)||null,ue:()=>n.datastore.serializer.databaseId}),yn(n).start(),n.bu.gu()}function qo(n){return Vt(n)&&!yn(n).Uo()&&n.Au.size>0}function Vt(n){return N(n).vu.size===0}function gh(n){n.Vu=void 0}async function Ov(n){n.Au.forEach((e,t)=>{Bo(n,e)})}async function Pv(n,e){gh(n),qo(n)?(n.bu.Iu(e),zo(n)):n.bu.set("Unknown")}async function Lv(n,e,t){if(n.bu.set("Online"),e instanceof th&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.Au.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.Au.delete(o),r.Vu.removeTarget(o))}(n,e)}catch(r){T("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await is(n,r)}else if(e instanceof Pr?n.Vu.Ht(e):e instanceof eh?n.Vu.ne(e):n.Vu.Xt(e),!t.isEqual(A.min()))try{const r=await lh(n.localStore);t.compareTo(r)>=0&&await function(s,i){const o=s.Vu.ce(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const l=s.Au.get(c);l&&s.Au.set(c,l.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,c)=>{const l=s.Au.get(a);if(!l)return;s.Au.set(a,l.withResumeToken(we.EMPTY_BYTE_STRING,l.snapshotVersion)),ph(s,a);const u=new ct(l.target,a,c,l.sequenceNumber);Bo(s,u)}),s.remoteSyncer.applyRemoteEvent(o)}(n,t)}catch(r){T("RemoteStore","Failed to raise snapshot:",r),await is(n,r)}}async function is(n,e,t){if(!dr(e))throw e;n.vu.add(1),await gr(n),n.bu.set("Offline"),t||(t=()=>lh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{T("RemoteStore","Retrying IndexedDB access"),await t(),n.vu.delete(1),await Ls(n)})}function mh(n,e){return e().catch(t=>is(n,t,e))}async function Us(n){const e=N(n),t=mt(e);let r=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;Uv(e);)try{const s=await Ev(e.localStore,r);if(s===null){e.Eu.length===0&&t.jo();break}r=s.batchId,Fv(e,s)}catch(s){await is(e,s)}yh(e)&&vh(e)}function Uv(n){return Vt(n)&&n.Eu.length<10}function Fv(n,e){n.Eu.push(e);const t=mt(n);t.Ko()&&t.ou&&t.uu(e.mutations)}function yh(n){return Vt(n)&&!mt(n).Uo()&&n.Eu.length>0}function vh(n){mt(n).start()}async function jv(n){mt(n).hu()}async function Vv(n){const e=mt(n);for(const t of n.Eu)e.uu(t.mutations)}async function $v(n,e,t){const r=n.Eu.shift(),s=Po.from(r,e,t);await mh(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Us(n)}async function Bv(n,e){e&&mt(n).ou&&await async function(t,r){if(s=r.code,My(s)&&s!==p.ABORTED){const i=t.Eu.shift();mt(t).Qo(),await mh(t,()=>t.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Us(t)}var s}(n,e),yh(n)&&vh(n)}async function wc(n,e){const t=N(n);t.asyncQueue.verifyOperationInProgress(),T("RemoteStore","RemoteStore received new credentials");const r=Vt(t);t.vu.add(3),await gr(t),r&&t.bu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.vu.delete(3),await Ls(t)}async function zv(n,e){const t=N(n);e?(t.vu.delete(2),await Ls(t)):e||(t.vu.add(2),await gr(t),t.bu.set("Unknown"))}function yn(n){return n.Su||(n.Su=function(e,t,r){const s=N(e);return s.fu(),new Av(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{uo:Ov.bind(null,n),ao:Pv.bind(null,n),nu:Lv.bind(null,n)}),n.Ru.push(async e=>{e?(n.Su.Qo(),qo(n)?zo(n):n.bu.set("Unknown")):(await n.Su.stop(),gh(n))})),n.Su}function mt(n){return n.Du||(n.Du=function(e,t,r){const s=N(e);return s.fu(),new Rv(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{uo:jv.bind(null,n),ao:Bv.bind(null,n),au:Vv.bind(null,n),cu:$v.bind(null,n)}),n.Ru.push(async e=>{e?(n.Du.Qo(),await Us(n)):(await n.Du.stop(),n.Eu.length>0&&(T("RemoteStore",`Stopping write stream with ${n.Eu.length} pending writes`),n.Eu=[]))})),n.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Nt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,a=new Wo(e,t,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new E(p.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ho(n,e){if(Je("AsyncQueue",`${e}: ${n}`),dr(n))return new E(p.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.comparator=e?(t,r)=>e(t,r)||_.comparator(t.key,r.key):(t,r)=>_.comparator(t.key,r.key),this.keyedMap=bn(),this.sortedSet=new Q(this.comparator)}static emptySet(e){return new Zt(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Zt)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Zt;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(){this.Cu=new Q(_.comparator)}track(e){const t=e.doc.key,r=this.Cu.get(t);r?e.type!==0&&r.type===3?this.Cu=this.Cu.insert(t,e):e.type===3&&r.type!==1?this.Cu=this.Cu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Cu=this.Cu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Cu=this.Cu.remove(t):e.type===1&&r.type===2?this.Cu=this.Cu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):k():this.Cu=this.Cu.insert(t,e)}xu(){const e=[];return this.Cu.inorderTraversal((t,r)=>{e.push(r)}),e}}class cn{constructor(e,t,r,s,i,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new cn(e,t,Zt.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Rs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{constructor(){this.Nu=void 0,this.listeners=[]}}class Wv{constructor(){this.queries=new mn(e=>ju(e),Rs),this.onlineState="Unknown",this.ku=new Set}}async function Hv(n,e){const t=N(n),r=e.query;let s=!1,i=t.queries.get(r);if(i||(s=!0,i=new qv),s)try{i.Nu=await t.onListen(r)}catch(o){const a=Ho(o,`Initialization of query '${Ui(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,i),i.listeners.push(e),e.Mu(t.onlineState),i.Nu&&e.$u(i.Nu)&&Ko(t)}async function Kv(n,e){const t=N(n),r=e.query;let s=!1;const i=t.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return t.queries.delete(r),t.onUnlisten(r)}function Gv(n,e){const t=N(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const a of o.listeners)a.$u(s)&&(r=!0);o.Nu=s}}r&&Ko(t)}function Qv(n,e,t){const r=N(n),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(t);r.queries.delete(e)}function Ko(n){n.ku.forEach(e=>{e.next()})}class Yv{constructor(e,t,r){this.query=e,this.Ou=t,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=r||{}}$u(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new cn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),t=!0):this.qu(e,this.onlineState)&&(this.Uu(e),t=!0),this.Bu=e,t}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let t=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),t=!0),t}qu(e,t){if(!e.fromCache)return!0;const r=t!=="Offline";return(!this.options.Ku||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const t=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Uu(e){e=cn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e){this.key=e}}class Ih{constructor(e){this.key=e}}class Xv{constructor(e,t){this.query=e,this.Yu=t,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=M(),this.mutatedKeys=M(),this.tc=Vu(e),this.ec=new Zt(this.tc)}get nc(){return this.Yu}sc(e,t){const r=t?t.ic:new Ic,s=t?t.ec:this.ec;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((u,d)=>{const f=s.get(u),g=Ns(this.query,d)?d:null,I=!!f&&this.mutatedKeys.has(f.key),S=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let x=!1;f&&g?f.data.isEqual(g.data)?I!==S&&(r.track({type:3,doc:g}),x=!0):this.rc(f,g)||(r.track({type:2,doc:g}),x=!0,(c&&this.tc(g,c)>0||l&&this.tc(g,l)<0)&&(a=!0)):!f&&g?(r.track({type:0,doc:g}),x=!0):f&&!g&&(r.track({type:1,doc:f}),x=!0,(c||l)&&(a=!0)),x&&(g?(o=o.add(g),i=S?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),r.track({type:1,doc:u})}return{ec:o,ic:r,zi:a,mutatedKeys:i}}rc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){const s=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((l,u)=>function(d,f){const g=I=>{switch(I){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return k()}};return g(d)-g(f)}(l.type,u.type)||this.tc(l.doc,u.doc)),this.oc(r);const o=t?this.uc():[],a=this.Zu.size===0&&this.current?1:0,c=a!==this.Xu;return this.Xu=a,i.length!==0||c?{snapshot:new cn(this.query,e.ec,s,i,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Ic,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(t=>this.Yu=this.Yu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Yu=this.Yu.delete(t)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=M(),this.ec.forEach(r=>{this.ac(r.key)&&(this.Zu=this.Zu.add(r.key))});const t=[];return e.forEach(r=>{this.Zu.has(r)||t.push(new Ih(r))}),this.Zu.forEach(r=>{e.has(r)||t.push(new wh(r))}),t}hc(e){this.Yu=e.ir,this.Zu=M();const t=this.sc(e.documents);return this.applyChanges(t,!0)}lc(){return cn.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class Jv{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Zv{constructor(e){this.key=e,this.fc=!1}}class ew{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new mn(a=>ju(a),Rs),this._c=new Map,this.mc=new Set,this.gc=new Q(_.comparator),this.yc=new Map,this.Ic=new jo,this.Tc={},this.Ec=new Map,this.Ac=an.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function tw(n,e){const t=hw(n);let r,s;const i=t.wc.get(e);if(i)r=i.targetId,t.sharedClientState.addLocalQueryTarget(r),s=i.view.lc();else{const o=await Tv(t.localStore,Ze(e)),a=t.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await nw(t,e,r,a==="current",o.resumeToken),t.isPrimaryClient&&dh(t.remoteStore,o)}return s}async function nw(n,e,t,r,s){n.Rc=(d,f,g)=>async function(I,S,x,z){let L=S.view.sc(x);L.zi&&(L=await mc(I.localStore,S.query,!1).then(({documents:ke})=>S.view.sc(ke,L)));const K=z&&z.targetChanges.get(S.targetId),ie=S.view.applyChanges(L,I.isPrimaryClient,K);return Tc(I,S.targetId,ie.cc),ie.snapshot}(n,d,f,g);const i=await mc(n.localStore,e,!0),o=new Xv(e,i.ir),a=o.sc(i.documents),c=pr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(a,n.isPrimaryClient,c);Tc(n,t,l.cc);const u=new Jv(e,t,o);return n.wc.set(e,u),n._c.has(t)?n._c.get(t).push(e):n._c.set(t,[e]),l.snapshot}async function rw(n,e){const t=N(n),r=t.wc.get(e),s=t._c.get(r.targetId);if(s.length>1)return t._c.set(r.targetId,s.filter(i=>!Rs(i,e))),void t.wc.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(r.targetId),t.sharedClientState.isActiveQueryTarget(r.targetId)||await Bi(t.localStore,r.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(r.targetId),fh(t.remoteStore,r.targetId),zi(t,r.targetId)}).catch(hr)):(zi(t,r.targetId),await Bi(t.localStore,r.targetId,!0))}async function sw(n,e,t){const r=dw(n);try{const s=await function(i,o){const a=N(i),c=te.now(),l=o.reduce((f,g)=>f.add(g.key),M());let u,d;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let g=et(),I=M();return a.Zi.getEntries(f,l).next(S=>{g=S,g.forEach((x,z)=>{z.isValidDocument()||(I=I.add(x))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,g)).next(S=>{u=S;const x=[];for(const z of o){const L=Cy(z,u.get(z.key).overlayedDocument);L!=null&&x.push(new jt(z.key,L,Nu(L.value.mapValue),Ge.exists(!0)))}return a.mutationQueue.addMutationBatch(f,c,x,o)}).next(S=>{d=S;const x=S.applyToLocalDocumentSet(u,I);return a.documentOverlayCache.saveOverlays(f,S.batchId,x)})}).then(()=>({batchId:d.batchId,changes:Bu(u)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let c=i.Tc[i.currentUser.toKey()];c||(c=new Q(U)),c=c.insert(o,a),i.Tc[i.currentUser.toKey()]=c}(r,s.batchId,t),await mr(r,s.changes),await Us(r.remoteStore)}catch(s){const i=Ho(s,"Failed to persist write");t.reject(i)}}async function Eh(n,e){const t=N(n);try{const r=await wv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.yc.get(i);o&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.fc=!0:s.modifiedDocuments.size>0?H(o.fc):s.removedDocuments.size>0&&(H(o.fc),o.fc=!1))}),await mr(t,r,e)}catch(r){await hr(r)}}function Ec(n,e,t){const r=N(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=N(i);a.onlineState=o;let c=!1;a.queries.forEach((l,u)=>{for(const d of u.listeners)d.Mu(o)&&(c=!0)}),c&&Ko(a)}(r.eventManager,e),s.length&&r.dc.nu(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function iw(n,e,t){const r=N(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.yc.get(e),i=s&&s.key;if(i){let o=new Q(_.comparator);o=o.insert(i,fe.newNoDocument(i,A.min()));const a=M().add(i),c=new Os(A.min(),new Map,new Q(U),o,a);await Eh(r,c),r.gc=r.gc.remove(i),r.yc.delete(e),Go(r)}else await Bi(r.localStore,e,!1).then(()=>zi(r,e,t)).catch(hr)}async function ow(n,e){const t=N(n),r=e.batch.batchId;try{const s=await vv(t.localStore,e);_h(t,r,null),Th(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await mr(t,s)}catch(s){await hr(s)}}async function aw(n,e,t){const r=N(n);try{const s=await function(i,o){const a=N(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let l;return a.mutationQueue.lookupMutationBatch(c,o).next(u=>(H(u!==null),l=u.keys(),a.mutationQueue.removeMutationBatch(c,u))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,l,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,l)).next(()=>a.localDocuments.getDocuments(c,l))})}(r.localStore,e);_h(r,e,t),Th(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await mr(r,s)}catch(s){await hr(s)}}function Th(n,e){(n.Ec.get(e)||[]).forEach(t=>{t.resolve()}),n.Ec.delete(e)}function _h(n,e,t){const r=N(n);let s=r.Tc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Tc[r.currentUser.toKey()]=s}}function zi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n._c.get(e))n.wc.delete(r),t&&n.dc.Pc(r,t);n._c.delete(e),n.isPrimaryClient&&n.Ic.Is(e).forEach(r=>{n.Ic.containsKey(r)||bh(n,r)})}function bh(n,e){n.mc.delete(e.path.canonicalString());const t=n.gc.get(e);t!==null&&(fh(n.remoteStore,t),n.gc=n.gc.remove(e),n.yc.delete(t),Go(n))}function Tc(n,e,t){for(const r of t)r instanceof wh?(n.Ic.addReference(r.key,e),cw(n,r)):r instanceof Ih?(T("SyncEngine","Document no longer in limbo: "+r.key),n.Ic.removeReference(r.key,e),n.Ic.containsKey(r.key)||bh(n,r.key)):k()}function cw(n,e){const t=e.key,r=t.path.canonicalString();n.gc.get(t)||n.mc.has(r)||(T("SyncEngine","New document in limbo: "+t),n.mc.add(r),Go(n))}function Go(n){for(;n.mc.size>0&&n.gc.size<n.maxConcurrentLimboResolutions;){const e=n.mc.values().next().value;n.mc.delete(e);const t=new _(W.fromString(e)),r=n.Ac.next();n.yc.set(r,new Zv(t)),n.gc=n.gc.insert(t,r),dh(n.remoteStore,new ct(Ze(Mo(t.path)),r,"TargetPurposeLimboResolution",ko.ct))}}async function mr(n,e,t){const r=N(n),s=[],i=[],o=[];r.wc.isEmpty()||(r.wc.forEach((a,c)=>{o.push(r.Rc(c,e,t).then(l=>{if((l||t)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,l!=null&&l.fromCache?"not-current":"current"),l){s.push(l);const u=$o.Li(c.targetId,l);i.push(u)}}))}),await Promise.all(o),r.dc.nu(s),await async function(a,c){const l=N(a);try{await l.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>m.forEach(c,d=>m.forEach(d.Fi,f=>l.persistence.referenceDelegate.addReference(u,d.targetId,f)).next(()=>m.forEach(d.Bi,f=>l.persistence.referenceDelegate.removeReference(u,d.targetId,f)))))}catch(u){if(!dr(u))throw u;T("LocalStore","Failed to update sequence numbers: "+u)}for(const u of c){const d=u.targetId;if(!u.fromCache){const f=l.Ji.get(d),g=f.snapshotVersion,I=f.withLastLimboFreeSnapshotVersion(g);l.Ji=l.Ji.insert(d,I)}}}(r.localStore,i))}async function lw(n,e){const t=N(n);if(!t.currentUser.isEqual(e)){T("SyncEngine","User change. New user:",e.toKey());const r=await ch(t.localStore,e);t.currentUser=e,function(s,i){s.Ec.forEach(o=>{o.forEach(a=>{a.reject(new E(p.CANCELLED,i))})}),s.Ec.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await mr(t,r.er)}}function uw(n,e){const t=N(n),r=t.yc.get(e);if(r&&r.fc)return M().add(r.key);{let s=M();const i=t._c.get(e);if(!i)return s;for(const o of i){const a=t.wc.get(o);s=s.unionWith(a.view.nc)}return s}}function hw(n){const e=N(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Eh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=uw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iw.bind(null,e),e.dc.nu=Gv.bind(null,e.eventManager),e.dc.Pc=Qv.bind(null,e.eventManager),e}function dw(n){const e=N(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ow.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=aw.bind(null,e),e}class _c{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ps(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return yv(this.persistence,new gv,e.initialUser,this.serializer)}createPersistence(e){return new fv(Vo.zs,this.serializer)}createSharedClientState(e){return new bv}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class fw{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ec(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lw.bind(null,this.syncEngine),await zv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Wv}createDatastore(e){const t=Ps(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new Cv(s));var s;return function(i,o,a,c){return new Nv(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return t=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>Ec(this.syncEngine,a,0),o=vc.D()?new vc:new Sv,new Mv(t,r,s,i,o);var t,r,s,i,o}createSyncEngine(e,t){return function(r,s,i,o,a,c,l){const u=new ew(r,s,i,o,a,c);return l&&(u.vc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=N(e);T("RemoteStore","RemoteStore shutting down."),t.vu.add(5),await gr(t),t.Pu.shutdown(),t.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):Je("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(e,t,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=de.UNAUTHENTICATED,this.clientId=Cu.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{T("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(T("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Nt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ho(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ui(n,e){n.asyncQueue.verifyOperationInProgress(),T("FirestoreClient","Initializing OfflineComponentProvider");const t=await n.getConfiguration();await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await ch(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function bc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await yw(n);T("FirestoreClient","Initializing OnlineComponentProvider");const r=await n.getConfiguration();await e.initialize(t,r),n.setCredentialChangeListener(s=>wc(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>wc(e.remoteStore,i)),n._onlineComponents=e}function mw(n){return n.name==="FirebaseError"?n.code===p.FAILED_PRECONDITION||n.code===p.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function yw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){T("FirestoreClient","Using user provided OfflineComponentProvider");try{await ui(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!mw(t))throw t;nn("Error using user provided cache. Falling back to memory cache: "+t),await ui(n,new _c)}}else T("FirestoreClient","Using default OfflineComponentProvider"),await ui(n,new _c);return n._offlineComponents}async function Sh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(T("FirestoreClient","Using user provided OnlineComponentProvider"),await bc(n,n._uninitializedComponentsProvider._online)):(T("FirestoreClient","Using default OnlineComponentProvider"),await bc(n,new fw))),n._onlineComponents}function vw(n){return Sh(n).then(e=>e.syncEngine)}async function Sc(n){const e=await Sh(n),t=e.eventManager;return t.onListen=tw.bind(null,e.syncEngine),t.onUnlisten=rw.bind(null,e.syncEngine),t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(n,e,t){if(!t)throw new E(p.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ww(n,e,t,r){if(e===!0&&r===!0)throw new E(p.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function kc(n){if(!_.isDocumentKey(n))throw new E(p.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Cc(n){if(_.isDocumentKey(n))throw new E(p.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Fs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(t){return t.constructor?t.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":k()}function Dn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new E(p.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Fs(n);throw new E(p.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new E(p.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new E(p.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ww("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xh((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new E(p.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new E(p.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new E(p.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,r}}class js{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ac({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new E(p.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new E(p.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ac(e),e.credentials!==void 0&&(this._authCredentials=function(t){if(!t)return new Vm;switch(t.type){case"firstParty":return new qm(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new E(p.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=xc.get(e);t&&(T("ComponentProvider","Removing Datastore"),xc.delete(e),t.terminate())}(this),Promise.resolve()}}function Iw(n,e,t,r={}){var s;const i=(n=Dn(n,js))._getSettings(),o=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&nn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=de.MOCK_USER;else{a=hd(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new E(p.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new de(l)}n._authCredentials=new $m(new ku(a,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}}class wt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new wt(this.firestore,e,this._query)}}class dt extends wt{constructor(e,t,r){super(e,t,Mo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new _(e))}withConverter(e){return new dt(this.firestore,e,this._path)}}function Lr(n,e,...t){if(n=_e(n),kh("collection","path",e),n instanceof js){const r=W.fromString(e,...t);return Cc(r),new dt(n,null,r)}{if(!(n instanceof Te||n instanceof dt))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(e,...t));return Cc(r),new dt(n.firestore,null,r)}}function Ew(n,e,...t){if(n=_e(n),arguments.length===1&&(e=Cu.A()),kh("doc","path",e),n instanceof js){const r=W.fromString(e,...t);return kc(r),new Te(n,null,new _(r))}{if(!(n instanceof Te||n instanceof dt))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(e,...t));return kc(r),new Te(n.firestore,n instanceof dt?n.converter:null,new _(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new uh(this,"async_queue_retry"),this.Xc=()=>{const t=li();t&&T("AsyncQueue","Visibility state changed to "+t.visibilityState),this.qo.Mo()};const e=li();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const t=li();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const t=new Nt;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!dr(e))throw e;T("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const t=this.Gc.then(()=>(this.Hc=!0,e().catch(r=>{this.Wc=r,this.Hc=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw Je("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Hc=!1,r))));return this.Gc=t,t}enqueueAfterDelay(e,t,r){this.Zc(),this.Yc.indexOf(e)>-1&&(t=0);const s=Wo.createAndSchedule(this,e,t,r,i=>this.na(i));return this.zc.push(s),s}Zc(){this.Wc&&k()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const t of this.zc)if(t.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.zc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const t=this.zc.indexOf(e);this.zc.splice(t,1)}}function Rc(n){return function(e,t){if(typeof e!="object"||e===null)return!1;const r=e;for(const s of t)if(s in r&&typeof r[s]=="function")return!0;return!1}(n,["next","error","complete"])}class os extends js{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Tw,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ah(this),this._firestoreClient.terminate()}}function _w(n,e){const t=typeof n=="object"?n:qc(),r=typeof n=="string"?n:"(default)",s=Qi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=ld("firestore");i&&Iw(s,...i)}return s}function Ch(n){return n._firestoreClient||Ah(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Ah(n){var e,t,r;const s=n._freezeSettings(),i=function(o,a,c,l){return new ny(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,xh(l.experimentalLongPollingOptions),l.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._firestoreClient=new gw(n._authCredentials,n._appCheckCredentials,n._queue,i),!((t=s.cache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.cache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ln(we.fromBase64String(e))}catch(t){throw new E(p.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ln(we.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new E(p.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new E(p.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new E(p.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return U(this._lat,e._lat)||U(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bw=/^__.*__$/;class Sw{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new jt(e,this.data,this.fieldMask,t,this.fieldTransforms):new fr(e,this.data,t,this.fieldTransforms)}}function Nh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw k()}}class Xo{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new Xo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.aa({path:r,la:!1});return s.fa(e),s}da(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.aa({path:r,la:!1});return s.ua(),s}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return as(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(Nh(this.ca)&&bw.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class xw{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ps(e)}ya(e,t,r,s=!1){return new Xo({ca:e,methodName:t,ga:r,path:pe.emptyPath(),la:!1,ma:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Dh(n){const e=n._freezeSettings(),t=Ps(n._databaseId);return new xw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function kw(n,e,t,r,s,i={}){const o=n.ya(i.merge||i.mergeFields?2:0,e,t,s);Ph("Data must be an object, but it was:",o,r);const a=Mh(r,o);let c,l;if(i.merge)c=new Ae(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const d of i.mergeFields){const f=Aw(e,d,t);if(!o.contains(f))throw new E(p.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Nw(u,f)||u.push(f)}c=new Ae(u),l=o.fieldTransforms.filter(d=>c.covers(d.field))}else c=null,l=o.fieldTransforms;return new Sw(new xe(a),c,l)}function Cw(n,e,t,r=!1){return Jo(t,n.ya(r?4:3,e))}function Jo(n,e){if(Oh(n=_e(n)))return Ph("Unsupported field value:",e,n),Mh(n,e);if(n instanceof Rh)return function(t,r){if(!Nh(r.ca))throw r._a(`${t._methodName}() can only be used with update() and set()`);if(!r.path)throw r._a(`${t._methodName}() is not currently supported inside arrays`);const s=t._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(t,r){const s=[];let i=0;for(const o of t){let a=Jo(o,r.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(n,e)}return function(t,r){if((t=_e(t))===null)return{nullValue:"NULL_VALUE"};if(typeof t=="number")return Ty(r.serializer,t);if(typeof t=="boolean")return{booleanValue:t};if(typeof t=="string")return{stringValue:t};if(t instanceof Date){const s=te.fromDate(t);return{timestampValue:ss(r.serializer,s)}}if(t instanceof te){const s=new te(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:ss(r.serializer,s)}}if(t instanceof Yo)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof ln)return{bytesValue:nh(r.serializer,t._byteString)};if(t instanceof Te){const s=r.databaseId,i=t.firestore._databaseId;if(!i.isEqual(s))throw r._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Fo(t.firestore._databaseId||r.databaseId,t._key.path)}}throw r._a(`Unsupported field value: ${Fs(t)}`)}(n,e)}function Mh(n,e){const t={};return Au(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):pn(n,(r,s)=>{const i=Jo(s,e.ha(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Oh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof te||n instanceof Yo||n instanceof ln||n instanceof Te||n instanceof Rh)}function Ph(n,e,t){if(!Oh(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const r=Fs(t);throw r==="an object"?e._a(n+" a custom object"):e._a(n+" "+r)}}function Aw(n,e,t){if((e=_e(e))instanceof Qo)return e._internalPath;if(typeof e=="string")return Lh(n,e);throw as("Field path arguments must be of type string or ",n,!1,void 0,t)}const Rw=new RegExp("[~\\*/\\[\\]]");function Lh(n,e,t){if(e.search(Rw)>=0)throw as(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Qo(...e.split("."))._internalPath}catch{throw as(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function as(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new E(p.INVALID_ARGUMENT,a+n+c)}function Nw(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Dw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Vs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Dw extends Uh{data(){return super.data()}}function Vs(n,e){return typeof e=="string"?Lh(n,e):e instanceof Qo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new E(p.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Zo{}class ea extends Zo{}function qi(n,e,...t){let r=[];e instanceof Zo&&r.push(e),r=r.concat(t),function(s){const i=s.filter(a=>a instanceof ta).length,o=s.filter(a=>a instanceof $s).length;if(i>1||i>0&&o>0)throw new E(p.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class $s extends ea{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new $s(e,t,r)}_apply(e){const t=this._parse(e);return Fh(e._query,t),new wt(e.firestore,e.converter,Li(e._query,t))}_parse(e){const t=Dh(e.firestore);return function(s,i,o,a,c,l,u){let d;if(c.isKeyField()){if(l==="array-contains"||l==="array-contains-any")throw new E(p.INVALID_ARGUMENT,`Invalid Query. You can't perform '${l}' queries on documentId().`);if(l==="in"||l==="not-in"){Oc(u,l);const f=[];for(const g of u)f.push(Mc(a,s,g));d={arrayValue:{values:f}}}else d=Mc(a,s,u)}else l!=="in"&&l!=="not-in"&&l!=="array-contains-any"||Oc(u,l),d=Cw(o,i,u,l==="in"||l==="not-in");return ee.create(c,l,d)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Nc(n,e,t){const r=e,s=Vs("where",n);return $s._create(s,r,t)}class ta extends Zo{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ta(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,s){let i=r;const o=s.getFlattenedFilters();for(const a of o)Fh(i,a),i=Li(i,a)}(e._query,t),new wt(e.firestore,e.converter,Li(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class na extends ea{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new na(e,t)}_apply(e){const t=function(r,s,i){if(r.startAt!==null)throw new E(p.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new E(p.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new Xt(s,i);return function(a,c){if(Oo(a)===null){const l=As(a);l!==null&&jh(a,l,c.field)}}(r,o),o}(e._query,this._field,this._direction);return new wt(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new gn(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function Wi(n,e="asc"){const t=e,r=Vs("orderBy",n);return na._create(r,t)}class ra extends ea{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new ra(e,t,r)}_apply(e){return new wt(e.firestore,e.converter,ts(e._query,this._limit,this._limitType))}}function Dc(n){return ra._create("limit",n,"F")}function Mc(n,e,t){if(typeof(t=_e(t))=="string"){if(t==="")throw new E(p.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fu(e)&&t.indexOf("/")!==-1)throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(W.fromString(t));if(!_.isDocumentKey(r))throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Za(n,new _(r))}if(t instanceof Te)return Za(n,t._key);throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fs(t)}.`)}function Oc(n,e){if(!Array.isArray(n)||n.length===0)throw new E(p.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Fh(n,e){if(e.isInequality()){const r=As(n),s=e.field;if(r!==null&&!r.isEqual(s))throw new E(p.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${s.toString()}'`);const i=Oo(n);i!==null&&jh(n,s,i)}const t=function(r,s){for(const i of r)for(const o of i.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new E(p.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new E(p.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function jh(n,e,t){if(!t.isEqual(e))throw new E(p.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${t.toString()}' instead.`)}class Ow{convertValue(e,t="none"){switch(Ut(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Z(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Lt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw k()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return pn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertGeoPoint(e){return new Yo(Z(e.latitude),Z(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ao(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Wn(e));default:return null}}convertTimestamp(e){const t=gt(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=W.fromString(e);H(ah(r));const s=new Hn(r.get(1),r.get(3)),i=new _(r.popFirst(5));return s.isEqual(t)||Je(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Vh extends Uh{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ur(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Vs("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Ur extends Vh{data(e={}){return super.data(e)}}class Lw{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new xn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ur(this._firestore,this._userDataWriter,r.key,r,new xn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new E(p.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>{const a=new Ur(r._firestore,r._userDataWriter,o.doc.key,o.doc,new xn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new Ur(r._firestore,r._userDataWriter,o.doc.key,o.doc,new xn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,l=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),l=i.indexOf(o.doc.key)),{type:Uw(o.type),doc:a,oldIndex:c,newIndex:l}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Uw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return k()}}class $h extends Ow{constructor(e){super(),this.firestore=e}convertBytes(e){return new ln(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}function Fw(n,e){const t=Dn(n.firestore,os),r=Ew(n),s=Pw(n.converter,e);return jw(t,[kw(Dh(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ge.exists(!1))]).then(()=>r)}function Bh(n,...e){var t,r,s;n=_e(n);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Rc(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Rc(e[o])){const d=e[o];e[o]=(t=d.next)===null||t===void 0?void 0:t.bind(d),e[o+1]=(r=d.error)===null||r===void 0?void 0:r.bind(d),e[o+2]=(s=d.complete)===null||s===void 0?void 0:s.bind(d)}let c,l,u;if(n instanceof Te)l=Dn(n.firestore,os),u=Mo(n._key.path),c={next:d=>{e[o]&&e[o](Vw(l,n,d))},error:e[o+1],complete:e[o+2]};else{const d=Dn(n,wt);l=Dn(d.firestore,os),u=d._query;const f=new $h(l);c={next:g=>{e[o]&&e[o](new Lw(l,f,d,g))},error:e[o+1],complete:e[o+2]},Mw(n._query)}return function(d,f,g,I){const S=new pw(I),x=new Yv(f,S,g);return d.asyncQueue.enqueueAndForget(async()=>Hv(await Sc(d),x)),()=>{S.Dc(),d.asyncQueue.enqueueAndForget(async()=>Kv(await Sc(d),x))}}(Ch(l),u,a,c)}function jw(n,e){return function(t,r){const s=new Nt;return t.asyncQueue.enqueueAndForget(async()=>sw(await vw(t),r,s)),s.promise}(Ch(n),e)}function Vw(n,e,t){const r=t.docs.get(e._key),s=new $h(n);return new Vh(n,s,e._key,r,new xn(t.hasPendingWrites,t.fromCache),e.converter)}(function(n,e=!0){(function(t){fn=t})(un),en(new Dt("firestore",(t,{instanceIdentifier:r,options:s})=>{const i=t.getProvider("app").getImmediate(),o=new os(new Bm(t.getProvider("auth-internal")),new Hm(t.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new E(p.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hn(a.options.projectId,c)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),ht(Ga,"3.13.0",n),ht(Ga,"3.13.0","esm2017")})();const hi={apiKey:"AIzaSyBXKvL9h8Jx6Q2FmN3pRtY4wZ5cD7eU8fG",authDomain:"repairwale-demo.firebaseapp.com",projectId:"repairwale-demo",storageBucket:"repairwale-demo.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abc123def456ghi789jkl"};let Cr=null,di=null,qe=null,Yn=!0;try{!hi||Object.values(hi||{}).some(e=>typeof e=="string"&&e.toUpperCase().includes("YOUR_"))?Yn=!1:(Cr=zc(hi),di=Mg(Cr),qe=_w(Cr),mp(di).catch(()=>{}))}catch(n){console.warn("Firebase init disabled:",n),Yn=!1,Cr=null,di=null,qe=null}const En={greeting:["Hello! 👋 I'm RepairWale AI Assistant. How can I help you today?","Hi there! I'm here to assist you with your vehicle service needs. What can I do for you?","Welcome! I'm your AI assistant. Feel free to ask me about our services, pricing, or anything else!"],pricing:{keywords:["price","cost","how much","charges","rate","fee","expensive","cheap"],responses:[`Our pricing varies by service. For example:
• Engine Tune-up: ₹1,799
• Brake Service: ₹999
• Oil Change: ₹1,299
Check the Services page for complete pricing!`,"We offer competitive pricing! Basic services start at ₹299 (puncture repair) up to premium services like PPF coating at ₹12,999. What specific service are you interested in?"]},services:{keywords:["service","repair","fix","maintenance","what do you do","what services","help with"],responses:[`We offer comprehensive vehicle services:
🚨 Emergency Roadside
🔧 Scheduled Maintenance
⚙️ Mechanical & Electrical
🚛 Towing & Transport
🛞 Tyres & Wheels
💎 Body & Care

What are you looking for?`,"RepairWale provides everything from emergency breakdown assistance to premium body care! Our mechanics handle oil changes, brake services, AC repair, detailing, and much more. Need help with something specific?"]},emergency:{keywords:["emergency","urgent","breakdown","stuck","help now","asap","immediate","quick"],responses:[`🚨 Emergency assistance available! We offer:
• Breakdown Quick Fix (30-60 mins) - ₹549
• Flat Tyre Assist (30 mins) - ₹399
• Battery Jump-Start (20-30 mins) - ₹299

Book now for immediate dispatch!`,"Don't worry, we've got you covered! 🚗💨 Our emergency services include roadside repairs, jump-starts, fuel delivery, and towing. Response time: 30-90 minutes. What's your issue?"]},location:{keywords:["where","location","area","come to","service area","available in","nearby"],responses:["We serve all major areas! Our mechanics come to your location - home, office, or roadside. Just share your address when booking. 📍","RepairWale operates across the city! We provide doorstep service anywhere within the metro area. No need to visit a workshop - we come to you! 🚗"]},booking:{keywords:["book","schedule","appointment","reserve","order","how to book","process"],responses:[`Booking is super easy! 📱
1. Browse services & add to cart
2. Proceed to checkout
3. Choose date/time & location
4. Confirm booking

You'll get live tracking once assigned!`,`To book a service:
✓ Select your needed services
✓ Add to cart
✓ Fill in vehicle & location details
✓ Choose your preferred time slot
✓ Pay & confirm!

Want me to guide you?`]},payment:{keywords:["payment","pay","cash","card","upi","online","razorpay","refund"],responses:[`We accept multiple payment methods:
💳 Credit/Debit Cards
📱 UPI (GPay, PhonePe, Paytm)
💵 Cash on Service
🔒 Secure Razorpay gateway

All transactions are safe & encrypted!`,"Payment is flexible! You can pay online via UPI/Cards or cash after service completion. We use secure Razorpay for online payments. Full refund available for cancellations! 💰"]},tracking:{keywords:["track","status","where is","eta","mechanic location","when will","arrive"],responses:[`You can track your service in real-time! 📍
• Live mechanic location
• Estimated arrival time
• Service status updates
• In-app chat with mechanic

Check the Tracking page after booking!`,"Live tracking is included FREE! Once a mechanic is assigned, you'll see their location, ETA, and can chat directly. You'll get notifications at every step! 🚗💨"]},quality:{keywords:["quality","guarantee","warranty","certified","trusted","genuine","oem","parts"],responses:[`We ensure top quality! ✨
✓ Certified mechanics only
✓ OEM & branded parts
✓ Service warranty included
✓ Quality inspections
✓ 100% satisfaction guarantee

Your vehicle is in safe hands!`,"Quality is our priority! All mechanics are verified & trained. We use genuine parts, provide service warranties, and maintain high standards. Check our customer reviews! ⭐⭐⭐⭐⭐"]},help:{keywords:["help","support","contact","talk to","human","agent","customer care"],responses:[`Need human assistance? 👨‍💼
Our support team is available:
📞 Call: 1800-REPAIR-NOW
✉️ Email: support@repairwale.com
💬 Live Chat: Available 24/7

How else can I help you?`,"I'm here to help! You can also reach our human support team via phone, email, or request a callback. What specific assistance do you need?"]},reviews:{keywords:["review","rating","feedback","testimonial","experience","trustworthy"],responses:["We're proud of our 4.8⭐ rating! Customers love our quick service, transparent pricing, and professional mechanics. Check reviews on our Services page! 🌟","Our customers speak for us! We have 1000+ verified reviews with an average 4.7⭐ rating. Quality service and customer satisfaction are our top priorities! 💯"]},default:["I'm not sure I understand. Could you rephrase that? I can help with services, pricing, bookings, emergency assistance, and more! 🤔",`Hmm, I didn't quite get that. Try asking about:
• Available services
• Pricing & payment
• Booking process
• Emergency help
• Service tracking

What would you like to know?`,"I'm here to help! Ask me about our services, how to book, pricing, or anything else related to RepairWale. What can I assist you with? 😊"]};function $w(n){const e=n.toLowerCase().trim();if(["hi","hello","hey","good morning","good evening","namaste","hola"].some(r=>e===r||e.startsWith(r+" ")))return En.greeting[Math.floor(Math.random()*En.greeting.length)];for(const[r,s]of Object.entries(En))if(!(r==="greeting"||r==="default")&&s.keywords.some(i=>e.includes(i)))return s.responses[Math.floor(Math.random()*s.responses.length)];return En.default[Math.floor(Math.random()*En.default.length)]}function Bw({requestId:n=null,serviceName:e="Support Chat"}){const[t,r]=b.useState([]),[s,i]=b.useState(""),[o,a]=b.useState(!1),[c,l]=b.useState(!1),[u,d]=b.useState("connecting"),[f,g]=b.useState({name:"",role:""}),[I,S]=b.useState(!0),[x,z]=b.useState(!0),L=b.useRef(null),K=b.useRef(null),ie=b.useRef(null),ke=b.useRef(null),le=n?`req:${n}`:"public",G=["💰 Show me pricing","🚨 Emergency help","📅 How to book?","📍 Track my service","⭐ Customer reviews"];b.useEffect(()=>{const v=localStorage.getItem("rw_name")||"Guest",B=localStorage.getItem("rw_role")||"customer";g({name:v,role:B}),I&&t.length===0&&setTimeout(()=>{De("Hello! 👋 I'm RepairWale AI Assistant. How can I help you today?")},500)},[]),b.useEffect(()=>{if(Yn&&qe){let B;n?B=qi(Lr(qe,"messages"),Nc("requestId","==",n),Wi("ts","asc"),Dc(50)):B=qi(Lr(qe,"messages"),Nc("requestId","==",null),Wi("ts","asc"),Dc(50));const F=Bh(B,Be=>{const Et=[];Be.forEach($t=>Et.push({id:$t.id,...$t.data()})),r(Et),d("connected")});return()=>F()}const v=Jh("http://localhost:3000",{transports:["websocket","polling"],reconnectionAttempts:5,reconnectionDelay:1e3});return L.current=v,v.on("connect",()=>{d("connected"),v.emit("join",le)}),v.on("disconnect",()=>{d("disconnected")}),v.on("message",B=>{r(F=>[...F,{id:`${B.ts}-${Math.random().toString(36).slice(2)}`,...B,read:!1}])}),v.on("user:typing",B=>{B.user!==f.name&&(l(!0),setTimeout(()=>l(!1),2e3))}),()=>{try{v.emit("leave",le)}catch{}v.disconnect()}},[n,f.name]),b.useEffect(()=>{var v;(v=K.current)==null||v.scrollIntoView({behavior:"smooth"})},[t]);function De(v){const B={id:`ai-${Date.now()}-${Math.random().toString(36).slice(2)}`,from:"🤖 AI Assistant",role:"ai",text:v,ts:Date.now(),avatar:"🤖",isAI:!0};r(F=>[...F,B])}function Me(v){I&&(l(!0),clearTimeout(ke.current),ke.current=setTimeout(()=>{const B=$w(v);l(!1),De(B)},1e3+Math.random()*1e3))}async function It(){if(s.trim()){a(!0);try{const v={from:f.name,role:f.role,text:s.trim(),ts:Date.now(),requestId:n||null,read:!1,avatar:f.role==="mechanic"?"🔧":"👤"};Yn&&qe?await Fw(Lr(qe,"messages"),v):L.current&&L.current.emit("message",{room:le,...v}),i(""),a(!1),I&&!n&&Me(s.trim())}catch(v){console.error("Message send failed:",v),a(!1)}}}function Bs(v){i(v),L.current&&L.current.emit("typing",{room:le,user:f.name}),clearTimeout(ie.current),ie.current=setTimeout(()=>{L.current&&L.current.emit("stop-typing",{room:le})},1e3)}function sa(v){return new Date(v).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}function vn(v){switch(v){case"mechanic":return"#f59e0b";case"customer":return"#06b6d4";case"ai":return"#10b981";default:return"#6b7280"}}function ia(v){switch(v){case"mechanic":return"🔧 Mechanic";case"customer":return"👤 Customer";case"ai":return"🤖 AI";default:return"❓ User"}}function nt(v){i(v.replace(/^[^\s]+ /,"")),z(!1)}return h.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",background:"var(--surface)",borderRadius:16,border:"1px solid var(--border)",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"},children:[h.jsxs("div",{style:{padding:"16px 20px",background:"linear-gradient(135deg, #3b82f6, #8b5cf6)",borderBottom:"2px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[h.jsxs("div",{children:[h.jsxs("h3",{style:{margin:"0 0 4px 0",fontSize:16,fontWeight:800,color:"#fff"},children:["💬 ",e]}),h.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.8)",display:"flex",alignItems:"center",gap:6},children:[h.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:u==="connected"?"#10b981":"#ef4444"}}),u==="connected"?"🟢 Connected":"🔴 Connecting...",I&&h.jsx("span",{style:{marginLeft:8},children:"• 🤖 AI Enabled"})]})]}),h.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[h.jsxs("button",{onClick:()=>S(!I),style:{background:I?"rgba(16,185,129,0.3)":"rgba(255,255,255,0.2)",padding:"6px 12px",borderRadius:6,fontSize:11,fontWeight:600,color:"#fff",border:`1px solid ${I?"#10b981":"rgba(255,255,255,0.3)"}`,cursor:"pointer",transition:"all 0.2s"},title:I?"AI Assistant ON":"AI Assistant OFF",children:["🤖 AI ",I?"ON":"OFF"]}),h.jsxs("div",{style:{background:"rgba(255,255,255,0.2)",padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:600,color:"#fff",border:"1px solid rgba(255,255,255,0.3)"},children:[t.length," messages"]})]})]}),h.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12,scrollBehavior:"smooth"},children:[t.length===0?h.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",height:"100%",textAlign:"center"},children:[h.jsx("div",{style:{fontSize:40,marginBottom:12},children:"💬"}),h.jsx("div",{style:{fontWeight:600,marginBottom:4,fontSize:16,color:"var(--text)"},children:"No messages yet"}),h.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:24},children:"Start the conversation"}),I&&h.jsxs("div",{style:{width:"100%",maxWidth:400},children:[h.jsx("p",{style:{fontSize:12,fontWeight:600,color:"var(--text-light)",marginBottom:12},children:"💡 Quick Questions"}),h.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"},children:G.map((v,B)=>h.jsx("button",{onClick:()=>nt(v),style:{background:"linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",border:"1.5px solid var(--accent)",padding:"8px 16px",borderRadius:20,fontSize:13,fontWeight:600,color:"var(--accent)",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},onMouseEnter:F=>{F.target.style.background="var(--accent)",F.target.style.color="#fff",F.target.style.transform="translateY(-2px)"},onMouseLeave:F=>{F.target.style.background="linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",F.target.style.color="var(--accent)",F.target.style.transform="translateY(0)"},children:v},B))})]})]}):t.map((v,B)=>{var Et;const F=v.from===f.name,Be=B===0||((Et=t[B-1])==null?void 0:Et.from)!==v.from;return h.jsxs("div",{style:{display:"flex",justifyContent:F?"flex-end":"flex-start",gap:8,animation:"fadeIn 0.3s ease-in"},children:[!F&&Be&&h.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:vn(v.role),display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0},children:v.avatar||"👤"}),!F&&!Be&&h.jsx("div",{style:{width:32}}),h.jsxs("div",{style:{maxWidth:"70%",display:"flex",flexDirection:"column",gap:4},children:[Be&&h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:11,fontWeight:700,color:"var(--text-secondary)"},children:[h.jsx("span",{children:v.from}),h.jsx("span",{style:{background:vn(v.role),color:"#fff",padding:"2px 6px",borderRadius:4,fontSize:10,fontWeight:600},children:ia(v.role).split(" ")[0]}),h.jsx("span",{children:sa(v.ts)})]}),h.jsx("div",{style:{padding:"10px 14px",borderRadius:12,background:v.role==="ai"?"#10b981":F?"#3b82f6":"var(--bg)",color:v.role==="ai"||F?"#fff":"var(--text)",border:F||v.role==="ai"?"none":"1px solid var(--border)",wordBreak:"break-word",lineHeight:1.4,fontSize:13,boxShadow:v.role==="ai"?"0 4px 12px rgba(16,185,129,0.3)":F?"0 4px 12px rgba(59,130,246,0.3)":"none"},children:v.text})]})]},v.id)}),c&&h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--text-secondary)",fontStyle:"italic"},children:[h.jsx("span",{children:"💭"}),h.jsx("span",{children:"Someone is typing"}),h.jsx("span",{style:{animation:"blink 1.4s infinite"},children:"•••"})]}),h.jsx("div",{ref:K})]}),t.length>0&&I&&h.jsx("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--border)",background:"var(--bg-secondary)"},children:h.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"},children:G.slice(0,3).map((v,B)=>h.jsx("button",{onClick:()=>nt(v),style:{background:"transparent",border:"1px solid var(--border)",padding:"6px 12px",borderRadius:16,fontSize:11,fontWeight:600,color:"var(--text-light)",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:F=>{F.target.style.borderColor="var(--accent)",F.target.style.color="var(--accent)"},onMouseLeave:F=>{F.target.style.borderColor="var(--border)",F.target.style.color="var(--text-light)"},children:v},B))})}),h.jsxs("div",{style:{padding:"16px 20px",borderTop:"1px solid var(--border)",background:"var(--bg)",display:"flex",gap:10},children:[h.jsx("input",{value:s,onChange:v=>Bs(v.target.value),onKeyPress:v=>v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),It()),placeholder:"Type your message... (Enter to send)",disabled:u!=="connected"||o,style:{flex:1,padding:"12px 14px",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text)",fontSize:13,fontFamily:"inherit",transition:"all 0.2s",opacity:u!=="connected"?.6:1},onFocus:v=>v.currentTarget.style.borderColor="#3b82f6",onBlur:v=>v.currentTarget.style.borderColor="var(--border)"}),h.jsxs("button",{onClick:It,disabled:!s.trim()||o||u!=="connected",style:{padding:"12px 20px",borderRadius:10,border:"none",background:s.trim()&&u==="connected"?"#3b82f6":"#9ca3af",color:"#fff",fontWeight:700,cursor:s.trim()&&u==="connected"?"pointer":"not-allowed",fontSize:13,transition:"all 0.2s",display:"flex",alignItems:"center",gap:6},onMouseEnter:v=>{s.trim()&&u==="connected"&&(v.currentTarget.style.background="#2563eb",v.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:v=>{s.trim()&&u==="connected"&&(v.currentTarget.style.background="#3b82f6",v.currentTarget.style.transform="translateY(0)")},children:[h.jsx("span",{children:o?"⏳":"✈️"}),h.jsx("span",{children:o?"Sending...":"Send"})]})]}),h.jsx("style",{children:`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 20% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `})]})}Oe.Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"});const zw=Oe.divIcon({html:'<div style="background: rgba(30, 58, 138, 0.9); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-size: 18px;">🔧</div>',className:"",iconSize:[36,36],iconAnchor:[18,18]}),qw=Oe.divIcon({html:'<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.3);"></div>',className:"",iconSize:[20,20],iconAnchor:[10,10]});function Ww({mechanics:n=[],userLocation:e,onMechanicSelect:t,searchRadius:r=10}){const s=b.useRef(null),i=b.useRef(null),o=b.useRef([]),a=b.useRef(null),c=b.useRef(null),[l,u]=b.useState(!1);b.useEffect(()=>{if(!i.current||s.current)return;const f=e||{lat:28.6139,lng:77.209};return s.current=Oe.map(i.current,{zoomControl:!1}).setView([f.lat,f.lng],13),Oe.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap",maxZoom:19}).addTo(s.current),Oe.control.zoom({position:"bottomright"}).addTo(s.current),()=>{s.current&&(s.current.remove(),s.current=null)}},[]),b.useEffect(()=>{!s.current||!e||s.current.setView([e.lat,e.lng],13,{animate:!0})},[e]),b.useEffect(()=>{s.current&&(a.current&&(s.current.removeLayer(a.current),a.current=null),c.current&&(s.current.removeLayer(c.current),c.current=null),e&&(a.current=Oe.marker([e.lat,e.lng],{icon:qw,zIndexOffset:1e3}).addTo(s.current),a.current.bindPopup("<b>📍 Your Location</b>"),r>0&&(c.current=Oe.circle([e.lat,e.lng],{radius:r*1e3,color:"rgba(30, 58, 138, 0.6)",fillColor:"rgba(30, 58, 138, 0.1)",fillOpacity:.3,weight:2}).addTo(s.current))))},[e,r]),b.useEffect(()=>{if(s.current&&(o.current.forEach(f=>s.current.removeLayer(f)),o.current=[],n.forEach(f=>{var S;const g=Oe.marker([f.lat,f.lng],{icon:zw}).addTo(s.current),I=`
        <div style="min-width: 200px;">
          <div style="font-weight: 700; font-size: 15px; color: #1e293b; margin-bottom: 8px;">
            ${f.name}
          </div>
          <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">
            ⭐ ${((S=f.rating)==null?void 0:S.toFixed(1))||"4.5"} • 
            📍 ${f.distanceKm?`${f.distanceKm} km away`:"Nearby"}
          </div>
          <button 
            onclick="window.selectMechanic('${f.id}')"
            style="
              width: 100%;
              padding: 8px 12px;
              background: rgba(30, 58, 138, 0.9);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              font-size: 13px;
            ">
            Select Mechanic
          </button>
        </div>
      `;g.bindPopup(I),g.on("click",()=>{t&&t(f)}),o.current.push(g)}),n.length>0&&e)){const f=Oe.latLngBounds([[e.lat,e.lng],...n.map(g=>[g.lat,g.lng])]);s.current.fitBounds(f,{padding:[50,50],maxZoom:14})}},[n,t]);const d=()=>{if(!navigator.geolocation){alert("Geolocation is not supported by your browser");return}u(!0),navigator.geolocation.getCurrentPosition(f=>{const{latitude:g,longitude:I}=f.coords;s.current&&s.current.setView([g,I],15,{animate:!0}),u(!1)},f=>{console.error("Location error:",f),alert("Unable to get your location"),u(!1)},{enableHighAccuracy:!0,timeout:8e3})};return h.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[h.jsx("div",{ref:i,style:{width:"100%",height:"100%",borderRadius:"12px",overflow:"hidden"}}),h.jsx("div",{style:{position:"absolute",top:"16px",right:"16px",display:"flex",flexDirection:"column",gap:"8px",zIndex:1e3},children:h.jsx("button",{onClick:d,disabled:l,style:{width:"44px",height:"44px",background:"white",border:"2px solid rgba(30, 58, 138, 0.3)",borderRadius:"8px",cursor:l?"not-allowed":"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",opacity:l?.6:1,transition:"all 0.2s"},title:"My Location",children:l?"⏳":"📍"})}),h.jsxs("div",{style:{position:"absolute",bottom:"16px",left:"16px",background:"white",border:"2px solid rgba(30, 58, 138, 0.2)",borderRadius:"8px",padding:"12px 16px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:1e3,fontSize:"12px",fontWeight:"600"},children:[h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[h.jsx("span",{style:{fontSize:"16px"},children:"🔧"}),h.jsxs("span",{children:["Mechanics (",n.length,")"]})]}),h.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[h.jsx("div",{style:{width:"12px",height:"12px",background:"#3b82f6",borderRadius:"50%",border:"2px solid white"}}),h.jsx("span",{children:"Your Location"})]})]})]})}function e0(){const n=Yh(),{role:e}=Xh(),t=e||localStorage.getItem("rw_role_locked"),[r,s]=b.useState([]),[i,o]=b.useState([]),[a,c]=b.useState("all"),[l,u]=b.useState(null),[d,f]=b.useState(10),[g,I]=b.useState(!0),[S,x]=b.useState([]),[z,L]=b.useState("distance"),[K,ie]=b.useState(!0),[ke,le]=b.useState(null),[G,De]=b.useState(null),[Me,It]=b.useState(!1),[Bs,sa]=b.useState(!0),[vn,ia]=b.useState([]),[nt,v]=b.useState(!1),[B,F]=b.useState(null),[Be,Et]=b.useState(""),[$t,zh]=b.useState("all"),[zs,qh]=b.useState(!1),[j,Wh]=b.useState(!1),qs={lat:28.6139,lng:77.209},Ce=(y,D="success")=>{F({message:y,type:D}),setTimeout(()=>F(null),3e3)};b.useEffect(()=>{t==="mechanic"&&n("/mechanic/dashboard",{replace:!0})},[t,n]),b.useEffect(()=>{fetch("/api/mechanics").then(D=>D.json()).then(s).catch(console.warn);const y=()=>Wh(window.innerWidth<=768);if(y(),window.addEventListener("resize",y),navigator.geolocation&&(v(!0),navigator.geolocation.getCurrentPosition(D=>{u({lat:D.coords.latitude,lng:D.coords.longitude}),v(!1),Ce("📍 Location detected successfully!","success")},()=>{u(null),v(!1),Ce("⚠️ Location access denied. Showing demo mechanics.","warning")},{enableHighAccuracy:!0,timeout:8e3})),Yn&&qe){const D=qi(Lr(qe,"requests"),Wi("createdAt","desc")),V=Bh(D,Ee=>{const X=[];Ee.forEach(ue=>X.push({id:ue.id,...ue.data()})),o(X)});return()=>{V(),window.removeEventListener("resize",y)}}else return o([]),()=>window.removeEventListener("resize",y)},[]);function oa(y,D){const V=Math.random()*2*Math.PI,X=D/6371,ue=y.lat*Math.PI/180,_t=y.lng*Math.PI/180,ze=Math.asin(Math.sin(ue)*Math.cos(X)+Math.cos(ue)*Math.sin(X)*Math.cos(V)),bt=_t+Math.atan2(Math.sin(V)*Math.sin(X)*Math.cos(ue),Math.cos(X)-Math.sin(ue)*Math.sin(ze));return{lat:ze*180/Math.PI,lng:bt*180/Math.PI}}function Hh(){const y=["AutoCare","QuickFix","SpeedyWrench","TurboAuto","Metro Motors","Prime Auto","Street Mechanics","GearUp","AutoCure","Reliable Motors"],D=["Ravi","Aman","Sanjay","Vikas","Imran","Arjun","Prakash","Nikhil","Deepak","Karan"];return`${D[Math.floor(Math.random()*D.length)]} ${y[Math.floor(Math.random()*y.length)]}`}function Kh(){if(!navigator.geolocation){Ce("❌ Geolocation not supported","error");return}v(!0),navigator.geolocation.getCurrentPosition(y=>{u({lat:y.coords.latitude,lng:y.coords.longitude}),v(!1),Ce("📍 Location updated!","success")},y=>{console.warn("Geolocation denied",(y==null?void 0:y.message)||y),v(!1),Ce("⚠️ Location denied. Please enable in settings.","warning")},{enableHighAccuracy:!0,timeout:8e3})}function Gh(y){if(!y)return[];const D=[{min:1,max:2,count:4},{min:3,max:6,count:5},{min:8,max:15,count:5}],V=[];let Ee=1e3;for(const X of D)for(let ue=0;ue<X.count;ue++){const _t=X.min+Math.random()*(X.max-X.min),ze=oa(y,_t),bt=Math.round((3.8+Math.random()*1.2)*10)/10;V.push({id:`r${Ee++}`,name:Hh(),lat:ze.lat,lng:ze.lng,rating:bt})}return V}b.useEffect(()=>{const y=l||qs;g&&y&&(x(Gh(y)),le(new Date))},[l,g]),b.useEffect(()=>{if(!g||!(l||qs)||!K)return;const D=setInterval(()=>{x(V=>V.map(Ee=>{const X=oa({lat:Ee.lat,lng:Ee.lng},.6+Math.random()*.4),ue=Ee.rating??3.8+Math.random()*1.2;return{...Ee,lat:X.lat,lng:X.lng,rating:ue}})),le(new Date)},5e3);return()=>clearInterval(D)},[g,l,K]);function aa(y,D){const V=Ws=>Ws*Math.PI/180,X=V(D.lat-y.lat),ue=V(D.lng-y.lng),_t=V(y.lat),ze=V(D.lat),bt=Math.sin(X/2)**2+Math.cos(_t)*Math.cos(ze)*Math.sin(ue/2)**2;return 2*6371*Math.asin(Math.sqrt(bt))}const yr=l||qs,Tt=(Bs&&vn.length>0?vn:g&&yr?S:r).map(y=>{if(!yr)return{...y};const D=aa(yr,{lat:y.lat,lng:y.lng});return{...y,distanceKm:Math.round(D*10)/10}}).filter(y=>typeof y.distanceKm=="number"?y.distanceKm<=d:!0).sort((y,D)=>z==="rating"?(D.rating??0)-(y.rating??0):(y.distanceKm??1e9)-(D.distanceKm??1e9)).filter(y=>{if($t==="high"&&y.rating<4.5||$t==="medium"&&(y.rating<3.5||y.rating>=4.5))return!1;if(Be.trim()){const D=Be.toLowerCase(),V=(y.name||"").toLowerCase(),Ee=(y.rating||0).toString(),X=(y.distanceKm||0).toString();return V.includes(D)||Ee.includes(D)||X.includes(D)}return!0}),[Qw,Yw]=b.useState("disconnected"),Qh=()=>{if(Tt.length===0){Ce("❌ No mechanics nearby","error");return}const y=Tt[0];De(y),Ce(`🚗 Nearest: ${y.name} (${y.distanceKm}km away)`,"success")};return h.jsxs("div",{style:{background:"#0a0e27",minHeight:"100vh",color:"#e5e7eb"},children:[B&&h.jsx("div",{style:{position:"fixed",top:"24px",right:"24px",background:B.type==="success"?"linear-gradient(135deg, #10b981, #059669)":B.type==="warning"?"linear-gradient(135deg, #f59e0b, #d97706)":"linear-gradient(135deg, #ef4444, #dc2626)",color:"white",padding:"16px 24px",borderRadius:"12px",boxShadow:"0 10px 40px rgba(0,0,0,0.3)",zIndex:9999,animation:"slideIn 0.3s ease-out",fontWeight:"600"},children:B.message}),h.jsx("style",{children:`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .luxury-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .luxury-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(96, 165, 250, 0.15);
        }
        .luxury-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .luxury-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
        }
        @media (max-width: 768px) {
          .mobile-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-hide {
            display: none !important;
          }
          .mobile-full {
            width: 100% !important;
          }
        }
      `}),h.jsx("div",{style:{background:"linear-gradient(135deg, #1a2847 0%, #0f1729 100%)",padding:j?"20px 16px":"32px 24px",borderBottom:"1px solid rgba(96, 165, 250, 0.1)",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"},children:h.jsxs("div",{style:{maxWidth:"1400px",margin:"0 auto"},children:[h.jsxs("div",{style:{display:"flex",flexDirection:j?"column":"row",justifyContent:"space-between",alignItems:j?"flex-start":"center",marginBottom:"16px",gap:j?"16px":"0"},children:[h.jsxs("div",{children:[h.jsx("h1",{style:{margin:"0 0 8px 0",fontSize:j?"24px":"36px",fontWeight:"900",background:"linear-gradient(135deg, #3b82f6, #60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"🗺️ Live Mechanics Map"}),h.jsxs("p",{style:{margin:0,color:"rgba(229,231,235,0.6)",fontSize:j?"13px":"15px",fontWeight:"500"},children:[l?"📍 Your location detected • ":"⚠️ Demo mode • ",Tt.length," mechanics within ",d,"km"]})]}),h.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",width:j?"100%":"auto"},children:[h.jsxs("button",{onClick:Kh,disabled:nt,className:"luxury-button",style:{padding:j?"10px 18px":"12px 24px",background:nt?"#374151":"rgba(30, 58, 138, 0.8)",color:"white",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"10px",cursor:nt?"not-allowed":"pointer",fontWeight:"600",fontSize:"14px",display:"flex",alignItems:"center",gap:"8px",flex:j?"1":"initial"},children:[nt?"⏳":"📍"," ",nt?"Locating...":"GPS"]}),h.jsx("button",{onClick:()=>n("/service"),className:"luxury-button",style:{padding:j?"10px 18px":"12px 24px",background:"transparent",color:"#60a5fa",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"10px",cursor:"pointer",fontWeight:"600",fontSize:"14px",flex:j?"1":"initial"},children:"← Service Home"})]})]}),h.jsxs("div",{style:{display:"flex",gap:"12px",marginTop:"20px",flexDirection:j?"column":"row",alignItems:"stretch"},children:[h.jsxs("div",{style:{flex:1,position:"relative"},children:[h.jsx("input",{type:"text",placeholder:"🔍 Search mechanics by name, rating, or distance...",value:Be,onChange:y=>Et(y.target.value),style:{width:"100%",padding:"14px 20px 14px 44px",background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"10px",color:"#e5e7eb",fontSize:"14px",fontWeight:"500",outline:"none"}}),h.jsx("span",{style:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",fontSize:"18px"},children:"🔍"})]}),h.jsxs("button",{onClick:()=>qh(!zs),className:"luxury-button mobile-show",style:{padding:"14px 24px",background:"rgba(30, 58, 138, 0.8)",color:"white",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"10px",cursor:"pointer",fontWeight:"600",fontSize:"14px",display:j?"flex":"none",alignItems:"center",gap:"8px",justifyContent:"center"},children:["⚙️ Filters ",zs?"▲":"▼"]})]}),h.jsxs("div",{style:{display:j&&!zs?"none":"flex",gap:"12px",marginTop:"16px",flexWrap:"wrap"},children:[h.jsxs("select",{value:d,onChange:y=>f(Number(y.target.value)),style:{padding:"10px 16px",background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",color:"#e5e7eb",fontSize:"13px",fontWeight:"600",cursor:"pointer",flex:j?"1":"initial"},children:[h.jsx("option",{value:5,children:"📏 5 km radius"}),h.jsx("option",{value:10,children:"📏 10 km radius"}),h.jsx("option",{value:15,children:"📏 15 km radius"}),h.jsx("option",{value:20,children:"📏 20 km radius"})]}),h.jsxs("select",{value:z,onChange:y=>L(y.target.value),style:{padding:"10px 16px",background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",color:"#e5e7eb",fontSize:"13px",fontWeight:"600",cursor:"pointer",flex:j?"1":"initial"},children:[h.jsx("option",{value:"distance",children:"📍 Nearest First"}),h.jsx("option",{value:"rating",children:"⭐ Highest Rated"})]}),h.jsxs("select",{value:$t,onChange:y=>zh(y.target.value),style:{padding:"10px 16px",background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",color:"#e5e7eb",fontSize:"13px",fontWeight:"600",cursor:"pointer",flex:j?"1":"initial"},children:[h.jsx("option",{value:"all",children:"⭐ All Ratings"}),h.jsx("option",{value:"high",children:"⭐ 4.5+ Stars"}),h.jsx("option",{value:"medium",children:"⭐ 3.5 - 4.5 Stars"})]}),h.jsx("button",{onClick:Qh,className:"luxury-button",style:{padding:"10px 20px",background:"rgba(30, 58, 138, 0.8)",color:"white",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",flex:j?"1":"initial"},children:"🎯 Find Nearest"})]})]})}),h.jsx("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:j?"20px 16px":"32px 24px"},children:h.jsxs("div",{className:j?"mobile-grid":"",style:{display:"grid",gridTemplateColumns:j?"1fr":"2fr 1fr",gap:"24px"},children:[h.jsxs("div",{className:"luxury-card",style:{background:"linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",borderRadius:"16px",border:"1px solid rgba(96, 165, 250, 0.2)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",overflow:"hidden"},children:[h.jsx("div",{style:{padding:j?"16px":"24px",borderBottom:"1px solid rgba(96, 165, 250, 0.1)"},children:h.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:h.jsxs("div",{children:[h.jsx("h3",{style:{margin:"0 0 4px 0",fontSize:j?"16px":"20px",fontWeight:"800",color:"#60a5fa"},children:"🌍 Live Map View"}),h.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9ca3af"},children:"OpenStreetMap • India coverage"})]})})}),h.jsx("div",{style:{height:j?"400px":"600px",background:"#000",position:"relative"},children:h.jsx(Ww,{mechanics:Tt,userLocation:yr,onMechanicSelect:y=>{De(y),Ce(`Selected: ${y.name}`,"success")},searchRadius:d})})]}),h.jsx("div",{children:h.jsxs("div",{className:"luxury-card",style:{background:"linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",borderRadius:"16px",border:"1px solid rgba(96, 165, 250, 0.2)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"},children:[h.jsx("div",{style:{padding:j?"16px":"24px",borderBottom:"1px solid rgba(96, 165, 250, 0.1)"},children:h.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:h.jsxs("div",{children:[h.jsx("h3",{style:{margin:"0 0 4px 0",fontSize:j?"16px":"18px",fontWeight:"800",color:"#60a5fa"},children:"👨‍🔧 Nearby Mechanics"}),h.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#9ca3af"},children:[Tt.length," available now"]})]})})}),h.jsx("div",{style:{maxHeight:j?"400px":"600px",overflowY:"auto",padding:"16px"},children:Tt.length===0?h.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",color:"#9ca3af"},children:[h.jsx("div",{style:{fontSize:"48px",marginBottom:"12px"},children:"🔍"}),h.jsx("p",{style:{fontSize:"15px",fontWeight:"600"},children:"No mechanics found in this area"}),h.jsx("p",{style:{fontSize:"13px",marginTop:"8px"},children:"Try increasing the search radius"})]}):h.jsx("div",{style:{display:"grid",gap:"12px"},children:Tt.map(y=>{var D;return h.jsxs("div",{onClick:()=>{De(y),Ce(`Selected: ${y.name}`,"success")},style:{background:(G==null?void 0:G.id)===y.id?"rgba(96, 165, 250, 0.15)":"rgba(15, 23, 42, 0.6)",padding:"16px",borderRadius:"12px",border:(G==null?void 0:G.id)===y.id?"2px solid #60a5fa":"1px solid rgba(96, 165, 250, 0.2)",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:V=>{(G==null?void 0:G.id)!==y.id&&(V.currentTarget.style.background="rgba(96, 165, 250, 0.08)")},onMouseLeave:V=>{(G==null?void 0:G.id)!==y.id&&(V.currentTarget.style.background="rgba(15, 23, 42, 0.6)")},children:[h.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[h.jsx("div",{style:{fontWeight:"700",fontSize:"15px",color:"#e5e7eb"},children:y.name}),h.jsxs("div",{style:{fontSize:"12px",fontWeight:"700",color:"#10b981",background:"rgba(16, 185, 129, 0.15)",padding:"4px 10px",borderRadius:"6px"},children:["⭐ ",((D=y.rating)==null?void 0:D.toFixed(1))||"4.5"]})]}),h.jsxs("div",{style:{fontSize:"12px",color:"#9ca3af",marginBottom:"12px"},children:["📍 ",y.distanceKm?`${y.distanceKm} km away`:"Distance calculating..."]}),h.jsxs("div",{style:{display:"flex",gap:"8px"},children:[h.jsx("button",{onClick:V=>{V.stopPropagation(),Ce(`📞 Calling ${y.name}...`,"success")},style:{flex:1,padding:"8px",background:"rgba(30, 58, 138, 0.8)",color:"white",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"12px"},children:"📞 Call"}),h.jsx("button",{onClick:V=>{V.stopPropagation(),It(!0),Ce(`💬 Chat opened with ${y.name}`,"success")},style:{flex:1,padding:"8px",background:"rgba(30, 58, 138, 0.6)",color:"white",border:"1px solid rgba(96, 165, 250, 0.3)",borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"12px"},children:"💬 Chat"})]})]},y.id)})})})]})})]})}),Me&&G&&h.jsxs("div",{style:{position:"fixed",bottom:0,right:0,width:j?"100%":"500px",height:j?"70vh":"700px",background:"var(--surface)",borderRadius:j?"16px 16px 0 0":"16px",border:"1px solid var(--border)",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",zIndex:1e3,overflow:"hidden",animation:"slideUp 0.3s ease-out"},children:[h.jsx(Bw,{requestId:`instant-${G.id}`,serviceName:G.name}),h.jsx("button",{onClick:()=>It(!1),style:{position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",color:"#fff",fontSize:"20px",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1001,transition:"all 0.2s"},onMouseEnter:y=>y.target.style.background="rgba(255,255,255,0.3)",onMouseLeave:y=>y.target.style.background="rgba(255,255,255,0.2)",children:"✕"})]})]})}export{e0 as default};
