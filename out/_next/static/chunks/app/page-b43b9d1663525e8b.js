(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{70:function(e,t,n){Promise.resolve().then(n.bind(n,8212))},8212:function(e,t,n){"use strict";n.r(t);var l=n(7437),s=n(2265);t.default=()=>{let[e,t]=(0,s.useState)({}),[n,a]=(0,s.useState)({}),r=async e=>{let n=e.target.files&&e.target.files[0];if(n){t({}),a({});let e=new FileReader;e.onload=e=>{let n=JSON.parse(e.target.result);t(n),a(n)},e.readAsText(n)}};return(0,l.jsxs)("main",{className:"flex min-h-screen flex-col items-center",children:[(0,l.jsx)("h1",{className:"text-3xl font-bold",children:"Import your json file"}),(0,l.jsx)("input",{type:"file",accept:".json",onChange:r}),(0,l.jsxs)("div",{children:[Object.keys(e).map(s=>{let a=e[s]!==n[s];return(0,l.jsxs)("div",{className:"flex flex-wrap justify-center",children:[(0,l.jsx)("h2",{className:"font-bold",children:s+":"}),(0,l.jsx)("input",{className:"text-black border-2 border-gray-300 rounded-lg w-1/2 p-2 m-2",type:"text",value:e[s],onChange:n=>t({...e,[s]:n.target.value})}),a?(0,l.jsx)("span",{className:"text-red-500 font-bold",children:"Modified"}):null]},s)}),(0,l.jsx)("button",{className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",onClick:()=>{let t=document.createElement("a"),n=new Blob([JSON.stringify(e)],{type:"application/json"});t.href=URL.createObjectURL(n),t.download="modified.json",document.body.appendChild(t),t.click()},children:"Export modified json"})]})]})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=70)}),_N_E=e.O()}]);