import{U as N,m as q,j as e,g as A,K as T,r as C,V as F,L as P,A as B}from"./app-B1pSEVFa.js";import{L as w,a as v,I as O}from"./label-Dcp7zppZ.js";import{B as S,c as H,S as J,a as K}from"./button-r2iQnQjW.js";import{D as M,a as W,b as G}from"./dialog-BnU1oovJ.js";import{L as U}from"./loader-circle-0aPMUrhR.js";import{P as V}from"./pagination-BDWKkU--.js";/* empty css            */import"./index-Ca2n5ZJm.js";import"./index-CEEXfL1b.js";import"./createLucideIcon-D7QgWXAE.js";import"./index-Bvs0mMF6.js";const D=t=>{let r;const s=new Set,n=(c,h)=>{const u=typeof c=="function"?c(r):c;if(!Object.is(u,r)){const p=r;r=h??(typeof u!="object"||u===null)?u:Object.assign({},r,u),s.forEach(f=>f(r,p))}},o=()=>r,i={setState:n,getState:o,getInitialState:()=>x,subscribe:c=>(s.add(c),()=>s.delete(c))},x=r=t(n,o,i);return i},Y=t=>t?D(t):D,$=t=>t;function X(t,r=$){const s=N.useSyncExternalStore(t.subscribe,()=>r(t.getState()),()=>r(t.getInitialState()));return N.useDebugValue(s),s}const L=t=>{const r=Y(t),s=n=>X(r,n);return Object.assign(s,r),s},Z=t=>t?L(t):L;function z(t,r){let s;try{s=t()}catch{return}return{getItem:o=>{var a;const d=x=>x===null?null:JSON.parse(x,void 0),i=(a=s.getItem(o))!=null?a:null;return i instanceof Promise?i.then(d):d(i)},setItem:(o,a)=>s.setItem(o,JSON.stringify(a,void 0)),removeItem:o=>s.removeItem(o)}}const k=t=>r=>{try{const s=t(r);return s instanceof Promise?s:{then(n){return k(n)(s)},catch(n){return this}}}catch(s){return{then(n){return this},catch(n){return k(n)(s)}}}},Q=(t,r)=>(s,n,o)=>{let a={storage:z(()=>localStorage),partialize:l=>l,version:0,merge:(l,b)=>({...b,...l}),...r},d=!1;const i=new Set,x=new Set;let c=a.storage;if(!c)return t((...l)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),s(...l)},n,o);const h=()=>{const l=a.partialize({...n()});return c.setItem(a.name,{state:l,version:a.version})},u=o.setState;o.setState=(l,b)=>{u(l,b),h()};const p=t((...l)=>{s(...l),h()},n,o);o.getInitialState=()=>p;let f;const E=()=>{var l,b;if(!c)return;d=!1,i.forEach(m=>{var g;return m((g=n())!=null?g:p)});const j=((b=a.onRehydrateStorage)==null?void 0:b.call(a,(l=n())!=null?l:p))||void 0;return k(c.getItem.bind(c))(a.name).then(m=>{if(m)if(typeof m.version=="number"&&m.version!==a.version){if(a.migrate){const g=a.migrate(m.state,m.version);return g instanceof Promise?g.then(y=>[!0,y]):[!0,g]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,m.state];return[!1,void 0]}).then(m=>{var g;const[y,R]=m;if(f=a.merge(R,(g=n())!=null?g:p),s(f,!0),y)return h()}).then(()=>{j==null||j(f,void 0),f=n(),d=!0,x.forEach(m=>m(f))}).catch(m=>{j==null||j(void 0,m)})};return o.persist={setOptions:l=>{a={...a,...l},l.storage&&(c=l.storage)},clearStorage:()=>{c==null||c.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>E(),hasHydrated:()=>d,onHydrate:l=>(i.add(l),()=>{i.delete(l)}),onFinishHydration:l=>(x.add(l),()=>{x.delete(l)})},a.skipHydration||E(),f||p},ee=Q,I=Z()(ee(t=>({user:null,setUser:r=>t({user:r}),clearUser:()=>t({user:null})}),{name:"user-storage"})),te=()=>{const{user:t}=I(),[r,s]=N.useState(!1),{data:n,setData:o,post:a,processing:d,errors:i,reset:x,clearErrors:c}=q({message:"",email:(t==null?void 0:t.email)??"",name:(t==null?void 0:t.name)??""}),h=u=>{u.preventDefault(),a(route("queue.store"),{onSuccess:()=>{s(!1),window.location.reload()}}),x(),c()};return e.jsxs(M,{open:r,onOpenChange:s,children:[e.jsx(S,{className:"font-bold bg-black text-white hover:bg-gray",onClick:()=>s(!0),children:"ADD YOUR NAME TO THE QUEUE"}),e.jsxs(W,{className:"dark:bg-white dark:text-black",children:[e.jsx(G,{children:"Add your name on queue"}),e.jsxs("form",{className:"flex flex-col gap-6",onSubmit:h,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(w,{htmlFor:"name",children:"Request"})}),e.jsx("textarea",{id:"name",className:"mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.message,onChange:u=>o("message",u.target.value),required:!0,tabIndex:1,autoComplete:"current-name",placeholder:"Message"}),i.message&&e.jsx(v,{message:i==null?void 0:i.message}),i.email&&e.jsx(v,{message:i==null?void 0:i.email}),i.name&&e.jsx(v,{message:i==null?void 0:i.name})]}),e.jsxs(S,{type:"submit",className:" hover:bg-gray bg-black text-white mt-4 w-full",tabIndex:4,disabled:d,children:[d&&e.jsx(U,{className:"h-4 w-4 animate-spin"}),"Join"]})]})]})]})},se=()=>{const{user:t,setUser:r}=I(),{data:s,setData:n,processing:o,errors:a}=q({name:"",email:""}),d=i=>{i.preventDefault(),r(s)};return t?null:e.jsx("form",{className:"flex w-1/4 flex-col gap-6",onSubmit:d,children:e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(w,{htmlFor:"name",children:"Name"})}),e.jsx(O,{id:"name",type:"text",required:!0,tabIndex:1,autoComplete:"current-name",value:s.name,onChange:i=>n("name",i.target.value),placeholder:"Name"}),e.jsx(v,{message:a.name})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(w,{htmlFor:"email",children:"Email address"}),e.jsx(O,{id:"email",type:"email",required:!0,autoFocus:!0,tabIndex:2,autoComplete:"email",value:s.email,onChange:i=>n("email",i.target.value),placeholder:"email@example.com"}),e.jsx(v,{message:a.email})]}),e.jsxs(S,{type:"submit",className:"mt-4 w-full bg-black text-white hover:bg-gray-700",tabIndex:4,disabled:o,children:[o&&e.jsx(U,{className:"h-4 w-4 animate-spin"}),"Confirm"]})]})})};function ae({className:t,...r}){return e.jsx("div",{"data-slot":"card",className:H("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",t),...r})}const ne=K("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function _({className:t,variant:r,asChild:s=!1,...n}){const o=s?J:"span";return e.jsx(o,{"data-slot":"badge",className:H(ne({variant:r}),t),...n})}const re=({children:t,guestName:r,...s})=>e.jsx("div",{className:"bg-white text-black",children:e.jsxs("div",{className:"max-w-[1360px] w-full mx-auto",children:[e.jsxs("div",{className:"flex pt-8 justify-between",children:[e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("img",{src:"/kewlor.jpeg",className:"w-24 rounded-full",alt:"logo"}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-[700] font-open",children:"WELCOME TO"}),e.jsx("h1",{className:"text-3xl font-open bg-black text-center text-white font-extrabold",children:"KEWLOR'S"}),e.jsx("h2",{className:"text-2xl font-[700] font-open",children:"TIKTOK LIVE"})]})]}),e.jsx("div",{children:r&&e.jsxs(e.Fragment,{children:["Hi ",r]})})]}),t]})});function pe({userQueues:t,currentUserQueueNumber:r=0}){var o;const{user:s}=I();A(2e3,{only:["userQueues","currentUserQueueNumber"],data:{email:s==null?void 0:s.email}});const{flash:n}=T().props;return C.useEffect(()=>{var a;(a=n==null?void 0:n.message)!=null&&a.success&&F.success(n.message.success,{duration:2e3})},[n]),C.useEffect(()=>{var a;(a=n==null?void 0:n.message)!=null&&a.error&&F.error(n.message.error,{duration:2e3})},[n]),e.jsxs(re,{guestName:s==null?void 0:s.name,children:[e.jsxs(P,{title:"Home",children:[e.jsx("link",{rel:"preconnect",href:"https://fonts.bunny.net"}),e.jsx("link",{href:"https://fonts.bunny.net/css?family=instrument-sans:400,500,600",rel:"stylesheet"})]}),e.jsx("div",{className:"flex  flex-col items-center justify-center gap-2 bg-[#FDFDFC]  text-[#1b1b18] ",children:s!=null&&s.name?e.jsxs(e.Fragment,{children:[r>0&&e.jsxs(e.Fragment,{children:["queue number: ",r]}),e.jsx("div",{className:"w-full flex justify-end",children:e.jsx(te,{})}),e.jsx(B,{data:"userQueues",fallback:e.jsx("div",{className:"h-[800px] w-full block"}),children:e.jsxs(e.Fragment,{children:[e.jsx("ul",{className:"my-4 grid w-full gap-4",children:((o=t==null?void 0:t.data)==null?void 0:o.length)>0&&(t==null?void 0:t.data.map((a,d)=>e.jsx(ae,{className:"bg-white border-0",children:e.jsxs("div",{className:"grid md:grid-cols-3 grid-cols-1 items-center ",children:[e.jsxs("div",{className:"pl-4 flex",children:[a.queue_number!==0?e.jsxs(_,{className:"mr-2 bg-black text-white",children:[" #",a.queue_number," "]}):e.jsx(_,{className:"mr-2",variant:"destructive",children:" completed "}),e.jsx("span",{className:"text-black",children:a.name})]}),a.message&&e.jsxs("div",{className:"pl-4",children:[e.jsx("h3",{className:"mr-2 inline-block text-black mb-0.5 text-base font-medium",children:"Message:"}),e.jsx("p",{className:"inline-block text-muted-foreground text-sm",children:a.message})]}),a.admin_notes&&e.jsxs("div",{className:"pl-4",children:[e.jsx("h3",{className:"inline-block mr-2 text-black mb-0.5 text-base font-medium",children:"Notes"}),e.jsx("p",{className:"inline-block text-muted-foreground text-sm",children:a.admin_notes})]})]})},d)))}),e.jsx(V,{links:t==null?void 0:t.links})]})})]}):e.jsx(se,{})})]})}export{pe as default};
