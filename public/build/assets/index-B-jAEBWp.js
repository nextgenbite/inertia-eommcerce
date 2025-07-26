import{s as l}from"./index-BT92uTGn.js";import{m as i,B as c,o as r,f as s,I as t,l as a,g as o,b as d}from"./app-Dh8szHK3.js";var n=i`
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
`,p={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},u=c.extend({name:"card",style:n,classes:p}),m={name:"BaseCard",extends:l,style:u,provide:function(){return{$pcCard:this,$parentInstance:this}}},b={name:"Card",extends:m,inheritAttrs:!1};function f(e,y,$,v,h,g){return r(),s("div",t({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(r(),s("div",t({key:0,class:e.cx("header")},e.ptm("header")),[a(e.$slots,"header")],16)):o("",!0),d("div",t({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(r(),s("div",t({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(r(),s("div",t({key:0,class:e.cx("title")},e.ptm("title")),[a(e.$slots,"title")],16)):o("",!0),e.$slots.subtitle?(r(),s("div",t({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[a(e.$slots,"subtitle")],16)):o("",!0)],16)):o("",!0),d("div",t({class:e.cx("content")},e.ptm("content")),[a(e.$slots,"content")],16),e.$slots.footer?(r(),s("div",t({key:1,class:e.cx("footer")},e.ptm("footer")),[a(e.$slots,"footer")],16)):o("",!0)],16)],16)}b.render=f;export{b as s};
