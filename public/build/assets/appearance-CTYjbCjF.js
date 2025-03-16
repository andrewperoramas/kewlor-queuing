import{u as h,j as e,K as x,m as g,L as y,V as j}from"./app-7-ITRN9W.js";import{c as l,B as v}from"./button--pe-EgJu.js";import{c as i}from"./createLucideIcon--vFkfpYm.js";import{H as d}from"./heading-small-nxelNDYb.js";import{A as k}from"./app-layout-C-wOGkhz.js";import{S as f}from"./layout-DMZ_2eDA.js";import{L as p,I as m}from"./label-BlPfj7kQ.js";/* empty css            */import"./index-DWeVi1XF.js";import"./index-CgSeVzij.js";import"./index-yxF8i9LD.js";import"./index-Cif76zUP.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],S=i("Monitor",b);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],A=i("Moon",N);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],M=i("Sun",L);function w({className:o="",...a}){const{appearance:n,updateAppearance:c}=h(),r=[{value:"light",icon:M,label:"Light"},{value:"dark",icon:A,label:"Dark"},{value:"system",icon:S,label:"System"}];return e.jsx("div",{className:l("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",o),...a,children:r.map(({value:s,icon:t,label:u})=>e.jsxs("button",{onClick:()=>c(s),className:l("flex items-center rounded-md px-3.5 py-1.5 transition-colors",n===s?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[e.jsx(t,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:u})]},s))})}const _=[{title:"Appearance settings",href:"/settings/appearance"}];function K(){const a=x().props.settings??{date:"2024-01-01",schedule:"9am - 5pm"},{data:n,setData:c,post:r}=g({date:a.date,schedule:a.schedule}),s=t=>{t.preventDefault(),r(route("live.settings.update"),{onSuccess:()=>{j.success("Settings saved successfully")}})};return e.jsxs(k,{breadcrumbs:_,children:[e.jsx(y,{title:"Appearance settings"}),e.jsxs(f,{children:[e.jsx("form",{onSubmit:s,children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(d,{title:"Live Settings",description:"The live settings for your account"}),e.jsxs("div",{className:"space-y-4 flex flex-col",children:[e.jsx(p,{htmlFor:"date",children:"Date"}),e.jsx(m,{id:"date",name:"date",value:n.date,onChange:t=>c("date",t.target.value)})]}),e.jsxs("div",{className:"space-y-4 flex flex-col",children:[e.jsx(p,{htmlFor:"schedule",children:"Schedule"}),e.jsx(m,{id:"schedule",name:"schedule",value:n.schedule,onChange:t=>c("schedule",t.target.value)})]}),e.jsx("div",{children:e.jsx(v,{children:"Save"})})]})}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(d,{title:"Appearance settings",description:"Update your account's appearance settings"}),e.jsx(w,{})]})]})]})}export{K as default};
