import{r as x,j as a,$ as u}from"./app-DpGqvL0T.js";import{c as o,B as m}from"./button-C6dXR3I2.js";import{P as p}from"./index-DkEJFi_h.js";var f="Separator",i="horizontal",h=["horizontal","vertical"],l=x.forwardRef((e,t)=>{const{decorative:r,orientation:s=i,...c}=e,n=j(s)?s:i,d=r?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return a.jsx(p.div,{"data-orientation":n,...d,...c,ref:t})});l.displayName=f;function j(e){return h.includes(e)}var N=l;function g({className:e,orientation:t="horizontal",decorative:r=!0,...s}){return a.jsx(N,{"data-slot":"separator-root",decorative:r,orientation:t,className:o("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",e),...s})}function O({title:e,description:t}){return a.jsxs("header",{children:[a.jsx("h3",{className:"mb-0.5 text-base font-medium",children:e}),t&&a.jsx("p",{className:"text-muted-foreground text-sm",children:t})]})}function v({title:e,description:t}){return a.jsxs("div",{className:"mb-8 space-y-0.5",children:[a.jsx("h2",{className:"text-xl font-semibold tracking-tight",children:e}),t&&a.jsx("p",{className:"text-muted-foreground text-sm",children:t})]})}const w=[{title:"Profile",url:"/settings/profile",icon:null},{title:"Password",url:"/settings/password",icon:null},{title:"Appearance",url:"/settings/appearance",icon:null}];function z({children:e}){if(typeof window>"u")return null;const t=window.location.pathname;return a.jsxs("div",{className:"px-4 py-6",children:[a.jsx(v,{title:"Settings",description:"Manage your profile and account settings"}),a.jsxs("div",{className:"flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12",children:[a.jsx("aside",{className:"w-full max-w-xl lg:w-48",children:a.jsx("nav",{className:"flex flex-col space-y-1 space-x-0",children:w.map(r=>a.jsx(m,{size:"sm",variant:"ghost",asChild:!0,className:o("w-full justify-start",{"bg-muted":t===r.url}),children:a.jsx(u,{href:r.url,prefetch:!0,children:r.title})},r.url))})}),a.jsx(g,{className:"my-6 md:hidden"}),a.jsx("div",{className:"flex-1 md:max-w-2xl",children:a.jsx("section",{className:"max-w-xl space-y-12",children:e})})]})]})}export{O as H,z as S};
