import{U as f,m as u,j as e}from"./app-CLWHAQlS.js";import{I as o}from"./input-error-jQ5SxcH-.js";import{B as c}from"./button-Dq_UI-CO.js";import{C as _}from"./checkbox-CdEY4jLB.js";import{D as v,a as N,b as C}from"./dialog-D_kDodIv.js";import{L as m,I as r}from"./label-BkTK0ADh.js";import{L as k}from"./loader-circle-BEPeZMQi.js";const S=({userQueue:a,setIsUpdated:x})=>{const h=()=>{n.status=="completed"?l("status","queued"):l("status","completed")},[b,i]=f.useState(!1),{data:n,setData:l,post:g,processing:d,errors:t,clearErrors:p}=u({notes:(a==null?void 0:a.admin_notes)??"",message:(a==null?void 0:a.message)??"",id:a==null?void 0:a.id,boost_count:a.boost_count??0,status:(a==null?void 0:a.status)??"queued",initial_queue_number:a==null?void 0:a.initial_queue_number}),j=s=>{s.preventDefault(),g(route("admin.queue.update",a.id),{onSuccess:()=>{i(!1),x(!0)},preserveScroll:!0}),p()};return e.jsxs(v,{open:b,onOpenChange:i,children:[e.jsx(c,{className:"hover:bg-gray bg-black text-white",onClick:()=>i(!0),children:"Manage"}),e.jsxs(N,{className:"dark:bg-white dark:text-black",children:[e.jsx(C,{children:"Manage queue"}),e.jsxs("form",{className:"flex flex-col gap-6",onSubmit:j,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"ID "})}),e.jsx(r,{id:"initial_queue_number",className:"mt-4 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.initial_queue_number,onChange:s=>l("initial_queue_number",parseInt(s.target.value)),required:!0,type:"number",tabIndex:1,autoComplete:"current-name",placeholder:"Queue Number"}),t.initial_queue_number&&e.jsx(o,{message:t==null?void 0:t.initial_queue_number})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Boost Count "})}),e.jsx(r,{id:"boost_count",className:"mt-4 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.boost_count,onChange:s=>l("boost_count",parseInt(s.target.value)),required:!0,type:"number",tabIndex:1,autoComplete:"current-name",placeholder:"Queue Number"}),t.boost_count&&e.jsx(o,{message:t==null?void 0:t.boost_count})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Prompt"})}),e.jsx("textarea",{id:"name",className:"mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.message,onChange:s=>l("message",s.target.value),tabIndex:1,autoComplete:"current-name",placeholder:"Message"}),t.message&&e.jsx(o,{message:t==null?void 0:t.message})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Notes"})}),e.jsx("textarea",{id:"name",className:"mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.notes,onChange:s=>l("notes",s.target.value),tabIndex:1,autoComplete:"current-name",placeholder:"Message"}),t.notes&&e.jsx(o,{message:t==null?void 0:t.notes})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(_,{id:"status",name:"status",checked:n.status==="completed",disabled:d,onClick:()=>h(),tabIndex:3}),e.jsx(m,{htmlFor:"status",children:"Marked as complete"})]}),e.jsxs(c,{type:"submit",className:"hover:bg-gray mt-4 w-full bg-black text-white",tabIndex:4,disabled:d,children:[d&&e.jsx(k,{className:"h-4 w-4 animate-spin"}),"Update"]})]})]})]})};export{S as M};
