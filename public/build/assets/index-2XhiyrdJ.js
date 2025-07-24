import{s as H}from"./index-BnT_7ZX0.js";import{s as k}from"./index-B94FgHQ3.js";import{B as g,I as c,o as i,c as s,w as p,i as C,L as u,b as B,l as h,_ as D,g as v,a9 as F,n as f,Q as N,s as $,R as _,O as E,m as U,M as P,f as y,F as O,U as L,a as T,t as j}from"./app-DZdvOm4L.js";import{s as A,R as z}from"./index-B7wopTVk.js";import{c as R}from"./index-Be1fzYNM.js";import{s as V}from"./index-DNkwbU3m.js";var M={root:"p-accordioncontent",content:"p-accordioncontent-content"},Q=g.extend({name:"accordioncontent",classes:M}),q={name:"BaseAccordionContent",extends:A,props:{as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:Q,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},I={name:"AccordionContent",extends:q,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},ariaLabelledby:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},attrs:function(){return c(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{id:this.id,role:"region","aria-labelledby":this.ariaLabelledby,"data-pc-name":"accordioncontent","data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function G(e,t,a,n,d,o){return e.asChild?h(e.$slots,"default",{key:1,class:f(e.cx("root")),active:o.$pcAccordionPanel.active,a11yAttrs:o.a11yAttrs}):(i(),s(F,c({key:0,name:"p-toggleable-content"},e.ptm("transition",o.ptParams)),{default:p(function(){return[!o.$pcAccordion.lazy||o.$pcAccordionPanel.active?C((i(),s(u(e.as),c({key:0,class:e.cx("root")},o.attrs),{default:p(function(){return[B("div",c({class:e.cx("content")},e.ptm("content",o.ptParams)),[h(e.$slots,"default")],16)]}),_:3},16,["class"])),[[D,o.$pcAccordion.lazy?!0:o.$pcAccordionPanel.active]]):v("",!0)]}),_:3},16))}I.render=G;var J={root:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon"},W=g.extend({name:"accordionheader",classes:J}),X={name:"BaseAccordionHeader",extends:A,props:{as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:W,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},w={name:"AccordionHeader",extends:X,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){!this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowDownKey:function(t){var a=this.findNextPanel(this.findPanel(t.currentTarget));a?this.changeFocusedPanel(t,a):this.onHomeKey(t),t.preventDefault()},onArrowUpKey:function(t){var a=this.findPrevPanel(this.findPanel(t.currentTarget));a?this.changeFocusedPanel(t,a):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var a=this.findFirstPanel();this.changeFocusedPanel(t,a),t.preventDefault()},onEndKey:function(t){var a=this.findLastPanel();this.changeFocusedPanel(t,a),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findPanel:function(t){return t==null?void 0:t.closest('[data-pc-name="accordionpanel"]')},findHeader:function(t){return N(t,'[data-pc-name="accordionheader"]')},findNextPanel:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.nextElementSibling;return n?$(n,"data-p-disabled")?this.findNextPanel(n):this.findHeader(n):null},findPrevPanel:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.previousElementSibling;return n?$(n,"data-p-disabled")?this.findPrevPanel(n):this.findHeader(n):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(t,a){_(this.findHeader(a))}},computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},ariaControls:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},attrs:function(){return c(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":"accordionheader","data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return R({active:this.$pcAccordionPanel.active})}},components:{ChevronUpIcon:k,ChevronDownIcon:V},directives:{ripple:z}};function Y(e,t,a,n,d,o){var b=E("ripple");return e.asChild?h(e.$slots,"default",{key:1,class:f(e.cx("root")),active:o.$pcAccordionPanel.active,a11yAttrs:o.a11yAttrs,onClick:o.onClick}):C((i(),s(u(e.as),c({key:0,"data-p":o.dataP,class:e.cx("root"),onClick:o.onClick},o.attrs),{default:p(function(){return[h(e.$slots,"default",{active:o.$pcAccordionPanel.active}),h(e.$slots,"toggleicon",{active:o.$pcAccordionPanel.active,class:f(e.cx("toggleicon"))},function(){return[o.$pcAccordionPanel.active?(i(),s(u(o.$pcAccordion.$slots.collapseicon?o.$pcAccordion.$slots.collapseicon:o.$pcAccordion.collapseIcon?"span":"ChevronUpIcon"),c({key:0,class:[o.$pcAccordion.collapseIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",o.ptParams)),null,16,["class"])):(i(),s(u(o.$pcAccordion.$slots.expandicon?o.$pcAccordion.$slots.expandicon:o.$pcAccordion.expandIcon?"span":"ChevronDownIcon"),c({key:1,class:[o.$pcAccordion.expandIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",o.ptParams)),null,16,["class"]))]})]}),_:3},16,["data-p","class","onClick"])),[[b]])}w.render=Y;var Z={root:function(t){var a=t.instance,n=t.props;return["p-accordionpanel",{"p-accordionpanel-active":a.active,"p-disabled":n.disabled}]}},ee=g.extend({name:"accordionpanel",classes:Z}),te={name:"BaseAccordionPanel",extends:A,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:ee,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},K={name:"AccordionPanel",extends:te,inheritAttrs:!1,inject:["$pcAccordion"],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return c(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{"data-pc-name":"accordionpanel","data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function oe(e,t,a,n,d,o){return e.asChild?h(e.$slots,"default",{key:1,class:f(e.cx("root")),active:o.active,a11yAttrs:o.a11yAttrs}):(i(),s(u(e.as),c({key:0,class:e.cx("root")},o.attrs),{default:p(function(){return[h(e.$slots,"default")]}),_:3},16,["class"]))}K.render=oe;var ae=U`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`,ne={root:"p-accordion p-component"},re=g.extend({name:"accordion",style:ae,classes:ne}),ce={name:"BaseAccordion",extends:A,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},activeIndex:{type:[Number,Array],default:null}},style:re,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},ie={name:"Accordion",extends:ce,inheritAttrs:!1,emits:["update:value","update:activeIndex","tab-open","tab-close","tab-click"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t},activeIndex:{immediate:!0,handler:function(t){this.hasAccordionTab&&(this.d_value=this.multiple?t==null?void 0:t.map(String):t==null?void 0:t.toString())}}},methods:{isItemActive:function(t){var a;return this.multiple?(a=this.d_value)===null||a===void 0?void 0:a.includes(t):this.d_value===t},updateValue:function(t){var a,n=this.isItemActive(t);this.multiple?n?this.d_value=this.d_value.filter(function(d){return d!==t}):this.d_value?this.d_value.push(t):this.d_value=[t]:this.d_value=n?null:t,this.$emit("update:value",this.d_value),this.$emit("update:activeIndex",this.multiple?(a=this.d_value)===null||a===void 0?void 0:a.map(Number):Number(this.d_value)),this.$emit(n?"tab-close":"tab-open",{originalEvent:void 0,index:Number(t)})},isAccordionTab:function(t){return t.type.name==="AccordionTab"},getTabProp:function(t,a){return t.props?t.props[a]:void 0},getKey:function(t,a){return this.getTabProp(t,"header")||a},getHeaderPT:function(t,a){var n=this;return{root:c({onClick:function(o){return n.onTabClick(o,a)}},this.getTabProp(t,"headerProps"),this.getTabPT(t,"header",a)),toggleicon:c(this.getTabProp(t,"headeractionprops"),this.getTabPT(t,"headeraction",a))}},getContentPT:function(t,a){return{root:c(this.getTabProp(t,"contentProps"),this.getTabPT(t,"toggleablecontent",a)),transition:this.getTabPT(t,"transition",a),content:this.getTabPT(t,"content",a)}},getTabPT:function(t,a,n){var d=this.tabs.length,o={props:t.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:n,count:d,first:n===0,last:n===d-1,active:this.isItemActive("".concat(n))}};return c(this.ptm("accordiontab.".concat(a),o),this.ptmo(this.getTabProp(t,"pt"),a,o))},onTabClick:function(t,a){this.$emit("tab-click",{originalEvent:t,index:a})}},computed:{tabs:function(){var t=this;return this.$slots.default().reduce(function(a,n){return t.isAccordionTab(n)?a.push(n):n.children&&n.children instanceof Array&&n.children.forEach(function(d){t.isAccordionTab(d)&&a.push(d)}),a},[])},hasAccordionTab:function(){return this.tabs.length}},components:{AccordionPanel:K,AccordionHeader:w,AccordionContent:I,ChevronUpIcon:k,ChevronRightIcon:H}};function de(e,t,a,n,d,o){var b=P("AccordionHeader"),x=P("AccordionContent"),S=P("AccordionPanel");return i(),y("div",c({class:e.cx("root")},e.ptmi("root")),[o.hasAccordionTab?(i(!0),y(O,{key:0},L(o.tabs,function(r,l){return i(),s(S,{key:o.getKey(r,l),value:"".concat(l),pt:{root:o.getTabPT(r,"root",l)},disabled:o.getTabProp(r,"disabled")},{default:p(function(){return[T(b,{class:f(o.getTabProp(r,"headerClass")),pt:o.getHeaderPT(r,l)},{toggleicon:p(function(m){return[m.active?(i(),s(u(e.$slots.collapseicon?e.$slots.collapseicon:e.collapseIcon?"span":"ChevronDownIcon"),c({key:0,class:[e.collapseIcon,m.class],"aria-hidden":"true",ref_for:!0},o.getTabPT(r,"headericon",l)),null,16,["class"])):(i(),s(u(e.$slots.expandicon?e.$slots.expandicon:e.expandIcon?"span":"ChevronUpIcon"),c({key:1,class:[e.expandIcon,m.class],"aria-hidden":"true",ref_for:!0},o.getTabPT(r,"headericon",l)),null,16,["class"]))]}),default:p(function(){return[r.children&&r.children.headericon?(i(),s(u(r.children.headericon),{key:0,isTabActive:o.isItemActive("".concat(l)),active:o.isItemActive("".concat(l)),index:l},null,8,["isTabActive","active","index"])):v("",!0),r.props&&r.props.header?(i(),y("span",c({key:1,ref_for:!0},o.getTabPT(r,"headertitle",l)),j(r.props.header),17)):v("",!0),r.children&&r.children.header?(i(),s(u(r.children.header),{key:2})):v("",!0)]}),_:2},1032,["class","pt"]),T(x,{pt:o.getContentPT(r,l)},{default:p(function(){return[(i(),s(u(r)))]}),_:2},1032,["pt"])]}),_:2},1032,["value","pt","disabled"])}),128)):h(e.$slots,"default",{key:1})],16)}ie.render=de;export{I as a,K as b,ie as c,w as s};
