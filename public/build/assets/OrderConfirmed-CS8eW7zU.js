import{s as x}from"./index-DFb8bcvn.js";import{a as k}from"./index-DGGBnKln.js";import{h as C,B as w,o as i,f as a,m as o,q as l,g as n,b as e,A as m,c as B,w as d,a as r,d as p,u as O,y as N,n as P}from"./app-Dtp9cSJU.js";import{a as T,b as V}from"./index-DyOU_20Z.js";import{s as q}from"./index-pjVFzCJH.js";import{_ as S}from"./Default-CT9kyiCz.js";import"./index-q5Sj6DxD.js";import"./index-diUOqfmn.js";import"./index-CWPyrpGy.js";import"./index-BXTavq2_.js";import"./index-CzXwX5eA.js";import"./index-DPAutJ-T.js";import"./index-BVu0eKYQ.js";import"./index-BbUqAkel.js";import"./index-um02aR4U.js";import"./index-BpUon12_.js";import"./index-DsP_CcZb.js";import"./index-B_MDerZk.js";import"./index-DjdxKMBt.js";import"./index-JmtSx9Qe.js";import"./index-MPJ9__4H.js";import"./index-C4XnIrCz.js";import"./DropdownLink-ChosizsD.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var j=C`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,z={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},A=w.extend({name:"card",style:j,classes:z}),D={name:"BaseCard",extends:k,style:A,provide:function(){return{$pcCard:this,$parentInstance:this}}},$={name:"Card",extends:D,inheritAttrs:!1};function I(t,u,f,s,b,c){return i(),a("div",o({class:t.cx("root")},t.ptmi("root")),[t.$slots.header?(i(),a("div",o({key:0,class:t.cx("header")},t.ptm("header")),[l(t.$slots,"header")],16)):n("",!0),e("div",o({class:t.cx("body")},t.ptm("body")),[t.$slots.title||t.$slots.subtitle?(i(),a("div",o({key:0,class:t.cx("caption")},t.ptm("caption")),[t.$slots.title?(i(),a("div",o({key:0,class:t.cx("title")},t.ptm("title")),[l(t.$slots,"title")],16)):n("",!0),t.$slots.subtitle?(i(),a("div",o({key:1,class:t.cx("subtitle")},t.ptm("subtitle")),[l(t.$slots,"subtitle")],16)):n("",!0)],16)):n("",!0),e("div",o({class:t.cx("content")},t.ptm("content")),[l(t.$slots,"content")],16),t.$slots.footer?(i(),a("div",o({key:1,class:t.cx("footer")},t.ptm("footer")),[l(t.$slots,"footer")],16)):n("",!0)],16)],16)}$.render=I;const E={class:"container bg-white rounded flex justify-center items-center min-h-screen my-6 p-4"},H={class:"p-4 rounded-lg border border-gray-200 my-6 w-full max-w-2xl"},Q={class:"order-details mb-6"},Y={class:"grid grid-cols-2 gap-4 mb-4 text-gray-700"},F={class:"flex flex-col sm:flex-row gap-3 justify-center"},ut={__name:"OrderConfirmed",setup(t){m({icon:"pi pi-home"}),m([{label:"Orders",icon:"pi pi-shopping-cart",to:"/orders"},{label:"Order Confirmed",icon:"pi pi-check"}]);const u=m([{product:"Product A",qty:2,price:"$50.00"},{product:"Product B",qty:1,price:"$100.00"}]);return(f,s)=>{const b=q,c=T,g=V,h=$,y=x;return i(),B(S,null,{default:d(()=>[e("div",E,[e("div",H,[s[9]||(s[9]=e("div",{class:"flex flex-col items-center text-center"},[e("div",{class:"flex items-center justify-center bg-primary-100 rounded-full w-14 h-14 mb-4"},[e("i",{class:"pi pi-check text-primary text-5xl"})]),e("h1",{class:"text-3xl font-bold mb-2 text-primary"},"Order Confirmed!"),e("p",{class:"text-gray-600 mb-6"},"Your order has been successfully placed.")],-1)),e("div",Q,[r(h,{class:"mb-4"},{title:d(()=>s[1]||(s[1]=[e("span",{class:"text-xl font-semibold"},"Order Details",-1)])),content:d(()=>[e("div",Y,[s[4]||(s[4]=e("div",null,[e("span",{class:"font-medium"},"Order Number:"),p(" #123456")],-1)),s[5]||(s[5]=e("div",null,[e("span",{class:"font-medium"},"Date:"),p(" 2024-06-10")],-1)),e("div",null,[s[2]||(s[2]=e("span",{class:"font-medium"},"Status:",-1)),s[3]||(s[3]=p()),r(b,{value:"Confirmed",severity:"success"})]),s[6]||(s[6]=e("div",null,[e("span",{class:"font-medium"},"Total:"),p(" $150.00")],-1))]),s[7]||(s[7]=e("h3",{class:"text-lg font-semibold mb-2"},"Items",-1)),r(g,{value:u.value,class:"p-datatable-sm rounded-lg overflow-hidden mb-4"},{default:d(()=>[r(c,{field:"product",header:"Product"}),r(c,{field:"qty",header:"Qty"}),r(c,{field:"price",header:"Price"})]),_:1},8,["value"])]),_:1})]),e("div",F,[r(y,{label:"View Orders",icon:"pi pi-list",onClick:s[0]||(s[0]=v=>f.$router.push("/orders"))}),r(y,{asChild:"",severity:"secondary"},{default:d(v=>[r(O(N),{href:"/",class:P(v.class)},{default:d(()=>s[8]||(s[8]=[e("i",{class:"pi pi-home"},null,-1),p(" Back to Home")])),_:2,__:[8]},1032,["class"])]),_:1})]),s[10]||(s[10]=e("p",{class:"text-center text-gray-500 py-6"},"Thank you for shopping with us.",-1))])])]),_:1})}}};export{ut as default};
