import{s as d}from"./index-CB3zjCSn.js";import{m as f,B as c,o,f as r,l as n,I as i,S as h,F as v,i as g,_ as $,c as y,w as m,L as w,g as x,n as k}from"./app-BDCqqEeF.js";var T=f`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
    }

    .p-tabs-scrollable > .p-tablist {
        overflow: hidden;
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        background: dt('tabs.tablist.background');
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,P={root:function(a){var s=a.props;return["p-tabs p-component",{"p-tabs-scrollable":s.scrollable}]}},B=c.extend({name:"tabs",style:T,classes:P}),S={name:"BaseTabs",extends:d,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:B,provide:function(){return{$pcTabs:this,$parentInstance:this}}},_={name:"Tabs",extends:S,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(a){this.d_value=a}},methods:{updateValue:function(a){this.d_value!==a&&(this.d_value=a,this.$emit("update:value",a))},isVertical:function(){return this.orientation==="vertical"}}};function z(t,a,s,u,p,e){return o(),r("div",i({class:t.cx("root")},t.ptmi("root")),[n(t.$slots,"default")],16)}_.render=z;var A={root:"p-tabpanels"},C=c.extend({name:"tabpanels",classes:A}),I={name:"BaseTabPanels",extends:d,props:{},style:C,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},N={name:"TabPanels",extends:I,inheritAttrs:!1};function L(t,a,s,u,p,e){return o(),r("div",i({class:t.cx("root"),role:"presentation"},t.ptmi("root")),[n(t.$slots,"default")],16)}N.render=L;var V={root:function(a){var s=a.instance;return["p-tabpanel",{"p-tabpanel-active":s.active}]}},j=c.extend({name:"tabpanel",classes:V}),D={name:"BaseTabPanel",extends:d,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:j,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},F={name:"TabPanel",extends:D,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var a;return h((a=this.$pcTabs)===null||a===void 0?void 0:a.d_value,this.value)},id:function(){var a;return"".concat((a=this.$pcTabs)===null||a===void 0?void 0:a.$id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var a;return"".concat((a=this.$pcTabs)===null||a===void 0?void 0:a.$id,"_tab_").concat(this.value)},attrs:function(){return i(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var a;return{id:this.id,tabindex:(a=this.$pcTabs)===null||a===void 0?void 0:a.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function O(t,a,s,u,p,e){var l,b;return e.$pcTabs?(o(),r(v,{key:1},[t.asChild?n(t.$slots,"default",{key:1,class:k(t.cx("root")),active:e.active,a11yAttrs:e.a11yAttrs}):(o(),r(v,{key:0},[!((l=e.$pcTabs)!==null&&l!==void 0&&l.lazy)||e.active?g((o(),y(w(t.as),i({key:0,class:t.cx("root")},e.attrs),{default:m(function(){return[n(t.$slots,"default")]}),_:3},16,["class"])),[[$,(b=e.$pcTabs)!==null&&b!==void 0&&b.lazy?!0:e.active]]):x("",!0)],64))],64)):n(t.$slots,"default",{key:0})}F.render=O;export{N as a,_ as b,F as s};
