import{U as f,m as v,j as e}from"./app-BQQ8ZpnF.js";import{I as i}from"./input-error-DEPS2age.js";import{B as c}from"./button-DFXGBldS.js";import{C as r}from"./checkbox-mgwxD4Ln.js";import{D as N,a as q,b as C}from"./dialog-CWz0DsPj.js";import{L as m,I as x}from"./label-xhxjRIe2.js";import{L as k}from"./loader-circle-HrIPdkP4.js";const S=({userQueue:a,setIsUpdated:b})=>{const h=()=>{n.status=="completed"?l("status","queued"):l("status","completed")},[p,d]=f.useState(!1),{data:n,setData:l,post:g,processing:o,errors:s,clearErrors:j}=v({notes:(a==null?void 0:a.admin_notes)??"",message:(a==null?void 0:a.message)??"",id:a==null?void 0:a.id,status:(a==null?void 0:a.status)??"queued",queue_number:a==null?void 0:a.queue_number,is_boosted:a==null?void 0:a.is_boosted,initial_queue_number:a==null?void 0:a.initial_queue_number}),_=t=>{t.preventDefault(),g(route("admin.queue.update",a.id),{onSuccess:()=>{d(!1),b(!0)},preserveScroll:!0}),j()};return e.jsxs(N,{open:p,onOpenChange:d,children:[e.jsx(c,{className:"hover:bg-gray bg-black text-white",onClick:()=>d(!0),children:"Manage"}),e.jsxs(q,{className:"dark:bg-white dark:text-black",children:[e.jsx(C,{children:"Manage queue"}),e.jsxs("form",{className:"flex flex-col gap-6",onSubmit:_,children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"ID "})}),e.jsx(x,{id:"initial_queue_number",className:"mt-4 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.initial_queue_number,onChange:t=>l("initial_queue_number",parseInt(t.target.value)),required:!0,type:"number",tabIndex:1,autoComplete:"current-name",placeholder:"Queue Number"}),s.initial_queue_number&&e.jsx(i,{message:s==null?void 0:s.initial_queue_number})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Current Queue"})}),e.jsx(x,{id:"queue_number",className:"mt-4 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.queue_number,onChange:t=>l("queue_number",parseInt(t.target.value)),required:!0,type:"number",tabIndex:1,autoComplete:"current-name",placeholder:"Queue Number"}),s.queue_number&&e.jsx(i,{message:s==null?void 0:s.queue_number})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Prompt"})}),e.jsx("textarea",{id:"name",className:"mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.message,onChange:t=>l("message",t.target.value),tabIndex:1,autoComplete:"current-name",placeholder:"Message"}),s.message&&e.jsx(i,{message:s==null?void 0:s.message})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{htmlFor:"name",children:"Notes"})}),e.jsx("textarea",{id:"name",className:"mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm",value:n.notes,onChange:t=>l("notes",t.target.value),tabIndex:1,autoComplete:"current-name",placeholder:"Message"}),s.notes&&e.jsx(i,{message:s==null?void 0:s.notes})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(r,{id:"is_boosted",name:"is_boosted",checked:n.is_boosted,onClick:()=>l("is_boosted",!n.is_boosted),tabIndex:3}),e.jsx(m,{htmlFor:"is_boosted",children:"Boosted?"})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(r,{id:"status",name:"status",checked:n.status==="completed",disabled:o,onClick:()=>h(),tabIndex:3}),e.jsx(m,{htmlFor:"status",children:"Marked as complete"})]}),e.jsxs(c,{type:"submit",className:"hover:bg-gray mt-4 w-full bg-black text-white",tabIndex:4,disabled:o,children:[o&&e.jsx(k,{className:"h-4 w-4 animate-spin"}),"Update"]})]})]})]})};export{S as M};
