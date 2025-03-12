import{r as n,j as e,m as q,L as A}from"./app-DpGqvL0T.js";import{L as w,I as E,a as I}from"./label-B233ZOZg.js";import{T as P}from"./text-link-B4N9AIlR.js";import{u as B,c as z,B as O}from"./button-C6dXR3I2.js";import{u as T,c as H,a as L,P as K,b as X}from"./index-PEMZ6aZj.js";import{P as R}from"./index-DkEJFi_h.js";import{c as $}from"./createLucideIcon-C95j4V56.js";import{A as G}from"./auth-layout-FpsmI5uM.js";import{L as J}from"./loader-circle-RAKPT3kt.js";/* empty css            */import"./app-logo-icon-C9r4iv6S.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],U=$("Check",Q);function V(t){const s=n.useRef({value:t,previous:t});return n.useMemo(()=>(s.current.value!==t&&(s.current.previous=s.current.value,s.current.value=t),s.current.previous),[t])}var y="Checkbox",[W,fe]=H(y),[Y,Z]=W(y),S=n.forwardRef((t,s)=>{const{__scopeCheckbox:r,name:i,checked:p,defaultChecked:o,required:l,disabled:c,value:x="on",onCheckedChange:d,form:f,...v}=t,[u,k]=n.useState(null),g=B(s,a=>k(a)),C=n.useRef(!1),N=u?f||!!u.closest("form"):!0,[h=!1,j]=T({prop:p,defaultProp:o,onChange:d}),M=n.useRef(h);return n.useEffect(()=>{const a=u==null?void 0:u.form;if(a){const b=()=>j(M.current);return a.addEventListener("reset",b),()=>a.removeEventListener("reset",b)}},[u,j]),e.jsxs(Y,{scope:r,state:h,disabled:c,children:[e.jsx(R.button,{type:"button",role:"checkbox","aria-checked":m(h)?"mixed":h,"aria-required":l,"data-state":F(h),"data-disabled":c?"":void 0,disabled:c,value:x,...v,ref:g,onKeyDown:L(t.onKeyDown,a=>{a.key==="Enter"&&a.preventDefault()}),onClick:L(t.onClick,a=>{j(b=>m(b)?!0:!b),N&&(C.current=a.isPropagationStopped(),C.current||a.stopPropagation())})}),N&&e.jsx(ee,{control:u,bubbles:!C.current,name:i,value:x,checked:h,required:l,disabled:c,form:f,style:{transform:"translateX(-100%)"},defaultChecked:m(o)?!1:o})]})});S.displayName=y;var D="CheckboxIndicator",_=n.forwardRef((t,s)=>{const{__scopeCheckbox:r,forceMount:i,...p}=t,o=Z(D,r);return e.jsx(K,{present:i||m(o.state)||o.state===!0,children:e.jsx(R.span,{"data-state":F(o.state),"data-disabled":o.disabled?"":void 0,...p,ref:s,style:{pointerEvents:"none",...t.style}})})});_.displayName=D;var ee=t=>{const{control:s,checked:r,bubbles:i=!0,defaultChecked:p,...o}=t,l=n.useRef(null),c=V(r),x=X(s);n.useEffect(()=>{const f=l.current,v=window.HTMLInputElement.prototype,k=Object.getOwnPropertyDescriptor(v,"checked").set;if(c!==r&&k){const g=new Event("click",{bubbles:i});f.indeterminate=m(r),k.call(f,m(r)?!1:r),f.dispatchEvent(g)}},[c,r,i]);const d=n.useRef(m(r)?!1:r);return e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:p??d.current,...o,tabIndex:-1,ref:l,style:{...t.style,...x,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function m(t){return t==="indeterminate"}function F(t){return m(t)?"indeterminate":t?"checked":"unchecked"}var te=S,re=_;function se({className:t,...s}){return e.jsx(te,{"data-slot":"checkbox",className:z("peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",t),...s,children:e.jsx(re,{"data-slot":"checkbox-indicator",className:"flex items-center justify-center text-current transition-none",children:e.jsx(U,{className:"size-3.5"})})})}function he({status:t,canResetPassword:s}){const{data:r,setData:i,post:p,processing:o,errors:l,reset:c}=q({email:"",password:"",remember:!1}),x=d=>{d.preventDefault(),p(route("login"),{onFinish:()=>c("password")})};return e.jsxs(G,{title:"Log in to your account",description:"Enter your email and password below to log in",children:[e.jsx(A,{title:"Log in"}),e.jsxs("form",{className:"flex flex-col gap-6",onSubmit:x,children:[e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(w,{htmlFor:"email",children:"Email address"}),e.jsx(E,{id:"email",type:"email",required:!0,autoFocus:!0,tabIndex:1,autoComplete:"email",value:r.email,onChange:d=>i("email",d.target.value),placeholder:"email@example.com"}),e.jsx(I,{message:l.email})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(w,{htmlFor:"password",children:"Password"}),s&&e.jsx(P,{href:route("password.request"),className:"ml-auto text-sm",tabIndex:5,children:"Forgot password?"})]}),e.jsx(E,{id:"password",type:"password",required:!0,tabIndex:2,autoComplete:"current-password",value:r.password,onChange:d=>i("password",d.target.value),placeholder:"Password"}),e.jsx(I,{message:l.password})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(se,{id:"remember",name:"remember",checked:r.remember,onClick:()=>i("remember",!r.remember),tabIndex:3}),e.jsx(w,{htmlFor:"remember",children:"Remember me"})]}),e.jsxs(O,{type:"submit",className:"mt-4 w-full",tabIndex:4,disabled:o,children:[o&&e.jsx(J,{className:"h-4 w-4 animate-spin"}),"Log in"]})]}),e.jsxs("div",{className:"text-muted-foreground text-center text-sm",children:["Don't have an account?"," ",e.jsx(P,{href:route("register"),tabIndex:5,children:"Sign up"})]})]}),t&&e.jsx("div",{className:"mb-4 text-center text-sm font-medium text-green-600",children:t})]})}export{he as default};
