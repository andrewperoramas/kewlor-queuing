import{j as r,$ as l}from"./app-TheQqPe0.js";import{B as m}from"./button-BzF9NbHz.js";const g=({links:a,target:c="scroll-target"})=>{const o=e=>{if(typeof window>"u")return e;const t=new URLSearchParams(window.location.search),s=new URL(e,window.location.origin);return t.forEach((i,n)=>{s.searchParams.has(n)||s.searchParams.append(n,i)}),s.toString()};return r.jsx("nav",{className:"table-responsive pb-3 pb-lg-0",children:r.jsx("ul",{className:"flex gap-3 mb-0 align-items-center justify-content-center ",children:a&&a.length>3&&a.map((e,t)=>e.url?r.jsx("li",{className:"page-item me-lg-6 ",children:r.jsx(l,{href:o(e.url),preserveScroll:!0,target:c,children:r.jsx(m,{className:`
                                ${e.active?"bg-black text-white":"bg-white text-black hover:bg-gray-50"}
`,children:e.label})})},t):null)})})};export{g as P};
