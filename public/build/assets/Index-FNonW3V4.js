import{s as B}from"./index-BPVAx7ku.js";import{s as C}from"./index-DPXFMfC6.js";import{s as G}from"./index-0iKZLJvj.js";import{a as U}from"./index-Bx2Rw5nZ.js";import{h as N,B as E,o as b,f as g,q as T,m as j,an as A,_ as u,T as I,a3 as J,a as n,u as o,w as c,F as R,Z as Y,b as a,e as M,d as f,g as F}from"./app-C_wibGIE.js";import{s as Z}from"./index-CrJPWul7.js";import{_ as q}from"./AppLayout-DLHO-8xw.js";import{s as D}from"./index-ecwM41mS.js";import"./index-Be1fzYNM.js";import"./index-DeBLWrxy.js";import"./index-BaRTdocM.js";import"./index-BJ419i8g.js";import"./index-DwolRHwk.js";import"./index-GIQ-eXXq.js";import"./index-Bo6filDF.js";import"./index-CLprxP6y.js";import"./index-d8CBf7RS.js";import"./index-BZopxaA-.js";import"./index-CfJIJNpm.js";import"./layout-MWrJtt6S.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./NavLink-B3qzLyEC.js";import"./index-CjpMFdUW.js";import"./index-CUIieaxI.js";import"./DropdownLink-K8e1ijcK.js";var H=N`
    .p-floatlabel {
        display: block;
        position: relative;
    }

    .p-floatlabel label {
        position: absolute;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-weight: dt('floatlabel.font.weight');
        inset-inline-start: dt('floatlabel.position.x');
        color: dt('floatlabel.color');
        transition-duration: dt('floatlabel.transition.duration');
    }

    .p-floatlabel:has(.p-textarea) label {
        top: dt('floatlabel.position.y');
        transform: translateY(0);
    }

    .p-floatlabel:has(.p-inputicon:first-child) label {
        inset-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-floatlabel:has(.p-invalid) label {
        color: dt('floatlabel.invalid.color');
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label {
        top: dt('floatlabel.over.active.top');
        transform: translateY(0);
        font-size: dt('floatlabel.active.font.size');
        font-weight: dt('floatlabel.active.font.weight');
    }

    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label {
        color: dt('floatlabel.active.color');
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label {
        color: dt('floatlabel.focus.color');
    }

    .p-floatlabel-in .p-inputtext,
    .p-floatlabel-in .p-textarea,
    .p-floatlabel-in .p-select-label,
    .p-floatlabel-in .p-multiselect-label,
    .p-floatlabel-in .p-autocomplete-input-multiple,
    .p-floatlabel-in .p-cascadeselect-label,
    .p-floatlabel-in .p-treeselect-label {
        padding-block-start: dt('floatlabel.in.input.padding.top');
        padding-block-end: dt('floatlabel.in.input.padding.bottom');
    }

    .p-floatlabel-in:has(input:focus) label,
    .p-floatlabel-in:has(input.p-filled) label,
    .p-floatlabel-in:has(input:-webkit-autofill) label,
    .p-floatlabel-in:has(textarea:focus) label,
    .p-floatlabel-in:has(textarea.p-filled) label,
    .p-floatlabel-in:has(.p-inputwrapper-focus) label,
    .p-floatlabel-in:has(.p-inputwrapper-filled) label {
        top: dt('floatlabel.in.active.top');
    }

    .p-floatlabel-on:has(input:focus) label,
    .p-floatlabel-on:has(input.p-filled) label,
    .p-floatlabel-on:has(input:-webkit-autofill) label,
    .p-floatlabel-on:has(textarea:focus) label,
    .p-floatlabel-on:has(textarea.p-filled) label,
    .p-floatlabel-on:has(.p-inputwrapper-focus) label,
    .p-floatlabel-on:has(.p-inputwrapper-filled) label {
        top: 0;
        transform: translateY(-50%);
        border-radius: dt('floatlabel.on.border.radius');
        background: dt('floatlabel.on.active.background');
        padding: dt('floatlabel.on.active.padding');
    }
`,O={root:function(m){var r=m.props;return["p-floatlabel",{"p-floatlabel-over":r.variant==="over","p-floatlabel-on":r.variant==="on","p-floatlabel-in":r.variant==="in"}]}},K=E.extend({name:"floatlabel",style:H,classes:O}),Q={name:"BaseFloatLabel",extends:U,props:{variant:{type:String,default:"over"}},style:K,provide:function(){return{$pcFloatLabel:this,$parentInstance:this}}},L={name:"FloatLabel",extends:Q,inheritAttrs:!1};function W(i,m,r,v,k,h){return b(),g("span",j({class:i.cx("root")},i.ptmi("root")),[T(i.$slots,"default")],16)}L.render=W;const X={class:"container"},ee={class:"w-3/4 mx-auto"},le={class:"space-y-4 card grid grid-cols-12 gap-2"},ae={class:"col-span-6"},oe={class:"col-span-6"},te={class:"col-span-6"},re={key:0},ne={class:"relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-28 h-28"},se=["src"],ie={class:"col-span-6"},de={key:0},pe={class:"relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"},ue=["src"],ce={class:"col-span-12"},me={class:"flex justify-end col-span-12"},Ae={__name:"Index",props:{data:Object},setup(i){const{toast:m}=A(),r=i;u(!1),u([]);const v=u(["Aura","Lara"]),k=u([{name:"noir",code:"noir"},{name:"emerald",code:"emerald"},{name:"green",code:"green"},{name:"lime",code:"lime"},{name:"orange",code:"orange"},{name:"amber",code:"amber"},{name:"yellow",code:"yellow"},{name:"teal",code:"teal"},{name:"cyan",code:"cyan"},{name:"sky",code:"sky"},{name:"blue",code:"blue"},{name:"indigo",code:"indigo"},{name:"violet",code:"violet"},{name:"purple",code:"purple"},{name:"fuchsia",code:"fuchsia"},{name:"pink",code:"pink"},{name:"rose",code:"rose"}]),h=u([{name:"slate",code:"slate"},{name:"gray",code:"gray"},{name:"zinc",code:"zinc"},{name:"neutral",code:"neutral"},{name:"stone",code:"stone"},{name:"soho",code:"soho"},{name:"viva",code:"viva"},{name:"ocean",code:"ocean"}]),l=I({_method:"put",key:{app_name:"",email:"",logo:null,favicon:null,address:null,color:null,hover_color:null,theme_mode:null,primary_color:null,surface_color:null}});J(()=>{var s,e;l.key.app_name=(s=r.data)==null?void 0:s.app_name,l.key.email=(e=r.data)==null?void 0:e.email,l.key.logo=r.data.logo,l.key.favicon=r.data.favicon,l.key.address=r.data.address,l.key.color=r.data.color,l.key.hover_color=r.data.hover_color,l.key.theme_mode=r.data.theme_mode,l.key.primary_color=r.data.primary_color,l.key.surface_color=r.data.surface_color});const x=(s,e)=>{const d=s.target.files[0];if(d){let p=new FileReader;p.onload=y=>{l.key[e]=y.target.result},p.readAsDataURL(d)}},_=s=>l.key[s]=null,P=async()=>{try{l.post(route("general.settings.update"),{preserveScroll:!0,onSuccess:()=>{m.add({severity:"success",summary:"Success",detail:"Settings updated successfully",life:3e3}),l.reset()}})}catch(s){console.error(s)}},w=s=>/^data:image\/[a-zA-Z]+;base64,/.test(s);return(s,e)=>{const d=Z,p=L,y=G,V=C,z=B;return b(),g(R,null,[n(o(Y),{title:"General Settings"}),n(q,null,{default:c(()=>{var S,$;return[a("div",X,[a("div",ee,[a("form",{onSubmit:M(P,["prevent"])},[a("div",le,[e[22]||(e[22]=a("h3",{class:"col-span-12 text-lg font-medium leading-6 text-center text-gray-900"},"Settings",-1)),a("div",ae,[n(p,null,{default:c(()=>[n(d,{id:"app_name",modelValue:o(l).key.app_name,"onUpdate:modelValue":e[0]||(e[0]=t=>o(l).key.app_name=t),class:"w-full"},null,8,["modelValue"]),e[12]||(e[12]=a("label",{for:"app_name"},"System Name",-1))]),_:1,__:[12]})]),a("div",oe,[n(p,null,{default:c(()=>[n(d,{id:"email",modelValue:o(l).key.email,"onUpdate:modelValue":e[1]||(e[1]=t=>o(l).key.email=t),class:"w-full"},null,8,["modelValue"]),e[13]||(e[13]=a("label",{for:"email"},"System Emails",-1))]),_:1,__:[13]})]),a("div",te,[e[15]||(e[15]=a("label",{class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",for:"favicon_input"},"Favicon",-1)),a("input",{onChange:e[2]||(e[2]=t=>x(t,"favicon")),accept:"image/*",class:"block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400","aria-describedby":"favicon_input_help",id:"favicon_input",type:"file"},null,32),e[16]||(e[16]=a("p",{class:"mt-1 text-sm text-gray-500 dark:text-gray-300",id:"favicon_input_help"},[f(" SVG, PNG, JPG or JPEG (Recommended: "),a("b",null,"64x64px"),f(", Max: 200x200px). ")],-1)),(S=o(l))!=null&&S.key.favicon?(b(),g("div",re,[a("div",ne,[a("img",{class:"w-24 h-24 rounded-t-lg object-contain",src:w(o(l).key.favicon)?o(l).key.favicon:"/"+o(l).key.favicon,alt:"Favicon Preview"},null,8,se),a("button",{onClick:e[3]||(e[3]=t=>_("favicon")),type:"button",class:"absolute top-0 right-0 text-red-700 bg-white hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"},e[14]||(e[14]=[a("i",{class:"pi pi-times"},null,-1)]))])])):F("",!0)]),a("div",ie,[e[18]||(e[18]=a("label",{class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",for:"logo_input"},"Logo",-1)),a("input",{onChange:e[4]||(e[4]=t=>x(t,"logo")),id:"logo_input",type:"file",accept:"image/*",class:"block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"},null,32),e[19]||(e[19]=a("p",{class:"mt-1 text-sm text-gray-500 dark:text-gray-300",id:"logo_input_help"},[f(" SVG, PNG, JPG or JPEG (Recommended: "),a("b",null,"200x60px"),f(", Max: 200x400px). ")],-1)),($=o(l))!=null&&$.key.logo?(b(),g("div",de,[a("div",pe,[a("img",{class:"w-full rounded-t-lg object-contain",src:w(o(l).key.logo)?o(l).key.logo:"/"+o(l).key.logo,alt:"Logo Preview"},null,8,ue),a("button",{onClick:e[5]||(e[5]=t=>_("logo")),type:"button",class:"absolute top-0 right-0 text-red-700 bg-white hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"},e[17]||(e[17]=[a("i",{class:"pi pi-times"},null,-1)]))])])):F("",!0)]),a("div",ce,[n(o(D),{id:"address",modelValue:o(l).key.address,"onUpdate:modelValue":e[6]||(e[6]=t=>o(l).key.address=t)},null,8,["modelValue"])]),n(y,{class:"col-span-6",modelValue:o(l).key.theme_mode,"onUpdate:modelValue":e[7]||(e[7]=t=>o(l).key.theme_mode=t),options:v.value,size:"small"},null,8,["modelValue","options"]),n(V,{modelValue:o(l).key.primary_color,"onUpdate:modelValue":e[8]||(e[8]=t=>o(l).key.primary_color=t),options:k.value,optionLabel:"name",optionValue:"code",placeholder:"Select a Theme Color",class:"w-full col-span-6",size:"small"},null,8,["modelValue","options"]),n(V,{modelValue:o(l).key.surface_color,"onUpdate:modelValue":e[9]||(e[9]=t=>o(l).key.surface_color=t),options:h.value,optionLabel:"name",optionValue:"code",placeholder:"Select a Surfaces",class:"w-full col-span-6",size:"small"},null,8,["modelValue","options"]),n(p,{class:"col-span-6"},{default:c(()=>[n(d,{type:"color",id:"color",modelValue:o(l).key.color,"onUpdate:modelValue":e[10]||(e[10]=t=>o(l).key.color=t),class:"w-full"},null,8,["modelValue"]),e[20]||(e[20]=a("label",{for:"color"},"System color",-1))]),_:1,__:[20]}),n(p,{class:"col-span-6"},{default:c(()=>[n(d,{type:"color",id:"hover_color",modelValue:o(l).key.hover_color,"onUpdate:modelValue":e[11]||(e[11]=t=>o(l).key.hover_color=t),class:"w-full"},null,8,["modelValue"]),e[21]||(e[21]=a("label",{for:"hover_color"},"System Hover Color",-1))]),_:1,__:[21]}),a("div",me,[n(z,{type:"submit",label:"Save",loading:o(l).processing,disabled:o(l).processing},null,8,["loading","disabled"])])])],32)])])]}),_:1})],64)}}};export{Ae as default};
