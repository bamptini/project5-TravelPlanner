var Client=function(o){var e={};function t(n){if(e[n])return e[n].exports;var l=e[n]={i:n,l:!1,exports:{}};return o[n].call(l.exports,l,l.exports,t),l.l=!0,l.exports}return t.m=o,t.c=e,t.d=function(o,e,n){t.o(o,e)||Object.defineProperty(o,e,{enumerable:!0,get:n})},t.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},t.t=function(o,e){if(1&e&&(o=t(o)),8&e)return o;if(4&e&&"object"==typeof o&&o&&o.__esModule)return o;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:o}),2&e&&"string"!=typeof o)for(var l in o)t.d(n,l,function(e){return o[e]}.bind(null,l));return n},t.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return t.d(e,"a",e),e},t.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},t.p="",t(t.s=0)}([function(o,e,t){"use strict";t.r(e);var n=t.p+"media/blue-globe.jpg";const l="https://pixabay.com/api/?key=22558956-5a359a3a26ebfe6b9c8cc12a4&q=";console.log("PIX URL = "+l);let c=new Date,a=c.getDate()+"."+c.getMonth()+"."+c.getFullYear();console.log("New date is "+a);const r=async(o,e,t)=>{console.log("2");const n=await fetch(o+e+t);try{const o=await n.json();return console.log("3"),o.geonames[0]}catch(o){console.log("error",o)}},s=async(o,e,t)=>{console.log("5");const n=await fetch(o+e+t);try{const o=(await n.json()).data[0];return console.log("6"),o}catch(o){console.log("error",o)}},i=async(o,e)=>{console.log("PIX 1 "),console.log(e);const t=await fetch(o+e);console.log(t);try{const o=await t.json();console.log("newInputPIX");let e=o.hits[0];return console.log(e),e}catch(o){console.log("error",o)}},u=async(o="",e={})=>{console.log("8 postDataCalled"),console.log(o),console.log(e);const t=await fetch(o,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});console.log("postData ended going into try block");try{const o=await t.json();return console.log("New data = "+o),o}catch(o){console.log("These is an error in postData function:",o)}console.log("Returning newData to ")};document.getElementById("logo2").src=n,document.getElementById("getButton").addEventListener("click",(async function(o){console.log("1 - Perform Action function");const e=document.getElementById("city").value;let t;console.log("Place is "+e),document.getElementById("date").value,console.log("Date is "+c),""!=e&&(t={city:e},r("http://api.geonames.org/searchJSON?q=",e,"&username=bamptini").then((function(o){console.log("4");const t=o.lng,n=o.lat;console.log(t),console.log(n);const c="lat="+n+"&lon="+t+"&key=";console.log(c),s("http://api.weatherbit.io/v2.0/forecast/daily?",c,"4cf5566d8ff14ba1bfd602ac60ae14b6").then((function(t){console.log("7"),console.log(t),u("all",{city:e,longitude:o.lng,latitude:o.lat,population:Math.round(o.population/1e6).toFixed(2)+"m",country:o.countryName,temperature:t.temp,low:t.low_temp,high:t.high_temp,sunrise:t.sunrise_ts}),console.log("9")})),i(l,e).then((function(o){console.log("PIX 2"),console.log(o),u("/all",{PIXUrl:o.pageURL}),console.log("10")}))})))})),console.log("Event listener addded")}]);