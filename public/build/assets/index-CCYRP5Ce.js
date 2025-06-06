import{a as I,c as Y,R as L}from"./index-KxtxHAvL.js";import{h as J,B as k,o as l,f as c,q as w,m as o,ai as Q,F as N,D as g,U as ut,c as b,w as V,s as f,g as h,n as tt,az as D,b9 as M,$ as x,aA as ct,aB as C,j as ht,ay as bt,I as T,b as m,Y as S,G as et,H as it,X as v,N as at,M as U,a0 as pt,a1 as ft,a2 as vt,p as K,a as nt,v as mt}from"./app-DkiTEcDj.js";import{s as R}from"./index-ThIfECy7.js";import{s as H}from"./index-CXkWXLSc.js";import{Z as E,s as gt,a as yt}from"./index-BA6CCbCK.js";import{u as G,b as It,F as wt}from"./index-C88uGa6j.js";import{s as xt}from"./index-bApRKnSQ.js";import{s as St}from"./index-Cb-zoN7n.js";var kt=J`
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
`,Tt={root:function(t){var i=t.props;return["p-tabs p-component",{"p-tabs-scrollable":i.scrollable}]}},Pt=k.extend({name:"tabs",style:kt,classes:Tt}),$t={name:"BaseTabs",extends:I,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:Pt,provide:function(){return{$pcTabs:this,$parentInstance:this}}},Bt={name:"Tabs",extends:$t,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t}},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function At(e,t,i,a,r,n){return l(),c("div",o({class:e.cx("root")},e.ptmi("root")),[w(e.$slots,"default")],16)}Bt.render=At;var Lt={root:"p-tabpanels"},Ct=k.extend({name:"tabpanels",classes:Lt}),Ot={name:"BaseTabPanels",extends:I,props:{},style:Ct,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},Nt={name:"TabPanels",extends:Ot,inheritAttrs:!1};function Vt(e,t,i,a,r,n){return l(),c("div",o({class:e.cx("root"),role:"presentation"},e.ptmi("root")),[w(e.$slots,"default")],16)}Nt.render=Vt;var Kt={root:function(t){var i=t.instance;return["p-tabpanel",{"p-tabpanel-active":i.active}]}},Dt=k.extend({name:"tabpanel",classes:Kt}),Et={name:"BaseTabPanel",extends:I,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:Dt,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},jt={name:"TabPanel",extends:Et,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return Q((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},attrs:function(){return o(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function zt(e,t,i,a,r,n){var u,d;return n.$pcTabs?(l(),c(N,{key:1},[e.asChild?w(e.$slots,"default",{key:1,class:tt(e.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs}):(l(),c(N,{key:0},[!((u=n.$pcTabs)!==null&&u!==void 0&&u.lazy)||n.active?g((l(),b(f(e.as),o({key:0,class:e.cx("root")},n.attrs),{default:V(function(){return[w(e.$slots,"default")]}),_:3},16,["class"])),[[ut,(d=n.$pcTabs)!==null&&d!==void 0&&d.lazy?!0:n.active]]):h("",!0)],64))],64)):w(e.$slots,"default",{key:0})}jt.render=zt;var Ft={root:"p-tablist",content:function(t){var i=t.instance;return["p-tablist-content",{"p-tablist-viewport":i.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},Rt=k.extend({name:"tablist",classes:Ft}),Ht={name:"BaseTabList",extends:I,props:{},style:Rt,provide:function(){return{$pcTabList:this,$parentInstance:this}}},Mt={name:"TabList",extends:Ht,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;setTimeout(function(){t.updateInkBar()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,i=this.getVisibleButtonWidths(),a=D(t)-i,r=Math.abs(t.scrollLeft),n=a*.8,u=r-n,d=Math.max(u,0);t.scrollLeft=M(t)?-1*d:d},onNextButtonClick:function(){var t=this.$refs.content,i=this.getVisibleButtonWidths(),a=D(t)-i,r=Math.abs(t.scrollLeft),n=a*.8,u=r+n,d=t.scrollWidth-a,s=Math.min(u,d);t.scrollLeft=M(t)?-1*s:s},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,i=t.content,a=t.inkbar,r=t.tabs;if(a){var n=x(i,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(a.style.height=ct(n)+"px",a.style.top=C(n).top-C(r).top+"px"):(a.style.width=ht(n)+"px",a.style.left=C(n).left-C(r).left+"px")}},updateButtonState:function(){var t=this.$refs,i=t.list,a=t.content,r=a.scrollTop,n=a.scrollWidth,u=a.scrollHeight,d=a.offsetWidth,s=a.offsetHeight,p=Math.abs(a.scrollLeft),y=[D(a),bt(a)],st=y[0],dt=y[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=r!==0,this.isNextButtonEnabled=i.offsetHeight>=s&&parseInt(r)!==u-dt):(this.isPrevButtonEnabled=p!==0,this.isNextButtonEnabled=i.offsetWidth>=d&&parseInt(p)!==n-st)},getVisibleButtonWidths:function(){var t=this.$refs,i=t.prevButton,a=t.nextButton,r=0;return this.showNavigators&&(r=((i==null?void 0:i.offsetWidth)||0)+((a==null?void 0:a.offsetWidth)||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return Y({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:R,ChevronRightIcon:H},directives:{ripple:L}},Ut=["data-p"],Gt=["aria-label","tabindex"],_t=["data-p"],Wt=["aria-orientation"],Zt=["aria-label","tabindex"];function qt(e,t,i,a,r,n){var u=T("ripple");return l(),c("div",o({ref:"list",class:e.cx("root"),"data-p":n.dataP},e.ptmi("root")),[n.showNavigators&&r.isPrevButtonEnabled?g((l(),c("button",o({key:0,ref:"prevButton",type:"button",class:e.cx("prevButton"),"aria-label":n.prevButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return n.onPrevButtonClick&&n.onPrevButtonClick.apply(n,arguments)})},e.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(l(),b(f(n.templates.previcon||"ChevronLeftIcon"),o({"aria-hidden":"true"},e.ptm("prevIcon")),null,16))],16,Gt)),[[u]]):h("",!0),m("div",o({ref:"content",class:e.cx("content"),onScroll:t[1]||(t[1]=function(){return n.onScroll&&n.onScroll.apply(n,arguments)}),"data-p":n.dataP},e.ptm("content")),[m("div",o({ref:"tabs",class:e.cx("tabList"),role:"tablist","aria-orientation":n.$pcTabs.orientation||"horizontal"},e.ptm("tabList")),[w(e.$slots,"default"),m("span",o({ref:"inkbar",class:e.cx("activeBar"),role:"presentation","aria-hidden":"true"},e.ptm("activeBar")),null,16)],16,Wt)],16,_t),n.showNavigators&&r.isNextButtonEnabled?g((l(),c("button",o({key:1,ref:"nextButton",type:"button",class:e.cx("nextButton"),"aria-label":n.nextButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return n.onNextButtonClick&&n.onNextButtonClick.apply(n,arguments)})},e.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(l(),b(f(n.templates.nexticon||"ChevronRightIcon"),o({"aria-hidden":"true"},e.ptm("nextIcon")),null,16))],16,Zt)),[[u]]):h("",!0)],16,Ut)}Mt.render=qt;var Xt={root:function(t){var i=t.instance,a=t.props;return["p-tab",{"p-tab-active":i.active,"p-disabled":a.disabled}]}},Yt=k.extend({name:"tab",classes:Xt}),Jt={name:"BaseTab",extends:I,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:Yt,provide:function(){return{$pcTab:this,$parentInstance:this}}},Qt={name:"Tab",extends:Jt,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var i=this.findNextTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var i=this.findPrevTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var i=this.findFirstTab();this.changeFocusedTab(t,i),t.preventDefault()},onEndKey:function(t){var i=this.findLastTab();this.changeFocusedTab(t,i),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findNextTab:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=i?t:t.nextElementSibling;return a?S(a,"data-p-disabled")||S(a,"data-pc-section")==="activebar"?this.findNextTab(a):x(a,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=i?t:t.previousElementSibling;return a?S(a,"data-p-disabled")||S(a,"data-pc-section")==="activebar"?this.findPrevTab(a):x(a,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,i){et(i),this.scrollInView(i)},scrollInView:function(t){var i;t==null||(i=t.scrollIntoView)===null||i===void 0||i.call(t,{block:"nearest"})}},computed:{active:function(){var t;return Q((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},attrs:function(){return o(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return Y({active:this.active})}},directives:{ripple:L}};function te(e,t,i,a,r,n){var u=T("ripple");return e.asChild?w(e.$slots,"default",{key:1,dataP:n.dataP,class:tt(e.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs,onClick:n.onClick}):g((l(),b(f(e.as),o({key:0,class:e.cx("root"),"data-p":n.dataP,onClick:n.onClick},n.attrs),{default:V(function(){return[w(e.$slots,"default")]}),_:3},16,["class","data-p","onClick"])),[[u]])}Qt.render=te;var ee=J`
    .p-galleria {
        overflow: hidden;
        border-style: solid;
        border-width: dt('galleria.border.width');
        border-color: dt('galleria.border.color');
        border-radius: dt('galleria.border.radius');
    }

    .p-galleria-content {
        display: flex;
        flex-direction: column;
    }

    .p-galleria-items-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .p-galleria-items {
        position: relative;
        display: flex;
        height: 100%;
    }

    .p-galleria-nav-button {
        position: absolute !important;
        top: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: dt('galleria.nav.button.background');
        color: dt('galleria.nav.button.color');
        width: dt('galleria.nav.button.size');
        height: dt('galleria.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        margin: calc(-1 * calc(dt('galleria.nav.button.size')) / 2) dt('galleria.nav.button.gutter') 0 dt('galleria.nav.button.gutter');
        padding: 0;
        user-select: none;
        border: 0 none;
        cursor: pointer;
        outline-color: transparent;
    }

    .p-galleria-nav-button:not(.p-disabled):hover {
        background: dt('galleria.nav.button.hover.background');
        color: dt('galleria.nav.button.hover.color');
    }

    .p-galleria-nav-button:not(.p-disabled):focus-visible {
        box-shadow: dt('galleria.nav.button.focus.ring.shadow');
        outline: dt('galleria.nav.button.focus.ring.width') dt('galleria.nav.button.focus.ring.style') dt('galleria.nav.button.focus.ring.color');
        outline-offset: dt('galleria.nav.button.focus.ring.offset');
    }

    .p-galleria-next-icon,
    .p-galleria-prev-icon {
        font-size: dt('galleria.nav.icon.size');
        width: dt('galleria.nav.icon.size');
        height: dt('galleria.nav.icon.size');
    }

    .p-galleria-prev-button {
        border-radius: dt('galleria.nav.button.prev.border.radius');
        left: 0;
    }

    .p-galleria-next-button {
        border-radius: dt('galleria.nav.button.next.border.radius');
        right: 0;
    }

    .p-galleria-prev-button:dir(rtl) {
        left: auto;
        right: 0;
        transform: rotate(180deg);
    }

    .p-galleria-next-button:dir(rtl) {
        right: auto;
        left: 0;
        transform: rotate(180deg);
    }

    .p-galleria-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .p-galleria-hover-navigators .p-galleria-nav-button {
        pointer-events: none;
        opacity: 0;
        transition: opacity dt('galleria.transition.duration') ease-in-out;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {
        pointer-events: all;
        opacity: 1;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {
        pointer-events: none;
    }

    .p-galleria-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: dt('galleria.caption.background');
        color: dt('galleria.caption.color');
        padding: dt('galleria.caption.padding');
    }

    .p-galleria-thumbnails {
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex-shrink: 0;
    }

    .p-galleria-thumbnail-nav-button {
        align-self: center;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        margin: 0 dt('galleria.thumbnail.nav.button.gutter');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        background: transparent;
        color: dt('galleria.thumbnail.nav.button.color');
        width: dt('galleria.thumbnail.nav.button.size');
        height: dt('galleria.thumbnail.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.thumbnail.nav.button.border.radius');
    }

    .p-galleria-thumbnail-nav-button:hover {
        background: dt('galleria.thumbnail.nav.button.hover.background');
        color: dt('galleria.thumbnail.nav.button.hover.color');
    }

    .p-galleria-thumbnail-nav-button:focus-visible {
        box-shadow: dt('galleria.thumbnail.nav.button.focus.ring.shadow');
        outline: dt('galleria.thumbnail.nav.button.focus.ring.width') dt('galleria.thumbnail.nav.button.focus.ring.style') dt('galleria.thumbnail.nav.button.focus.ring.color');
        outline-offset: dt('galleria.thumbnail.nav.button.focus.ring.offset');
    }

    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,
    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {
        font-size: dt('galleria.thumbnail.nav.button.icon.size');
        width: dt('galleria.thumbnail.nav.button.icon.size');
        height: dt('galleria.thumbnail.nav.button.icon.size');
    }

    .p-galleria-thumbnails-content {
        display: flex;
        flex-direction: row;
        background: dt('galleria.thumbnails.content.background');
        padding: dt('galleria.thumbnails.content.padding');
    }

    .p-galleria-thumbnails-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),
    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-galleria-thumbnail-items {
        display: flex;
    }

    .p-galleria-thumbnail-item {
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.5;
    }

    .p-galleria-thumbnail {
        outline-color: transparent;
    }

    .p-galleria-thumbnail-item:hover {
        opacity: 1;
        transition: opacity 0.3s;
    }

    .p-galleria-thumbnail-item-current {
        opacity: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-content,
    .p-galleria-thumbnails-right .p-galleria-content {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-right .p-galleria-items-container {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-top .p-galleria-items-container {
        order: 2;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails,
    .p-galleria-thumbnails-top .p-galleria-thumbnails {
        order: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails-content,
    .p-galleria-thumbnails-right .p-galleria-thumbnails-content {
        flex-direction: column;
        flex-grow: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,
    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {
        flex-direction: column;
        height: 100%;
    }

    .p-galleria-indicator-list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: dt('galleria.indicator.list.padding');
        gap: dt('galleria.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-galleria-indicator-button {
        display: inline-flex;
        align-items: center;
        background: dt('galleria.indicator.button.background');
        width: dt('galleria.indicator.button.width');
        height: dt('galleria.indicator.button.height');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.indicator.button.border.radius');
        margin: 0;
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
    }

    .p-galleria-indicator-button:hover {
        background: dt('galleria.indicator.button.hover.background');
    }

    .p-galleria-indicator-button:focus-visible {
        box-shadow: dt('galleria.indicator.button.focus.ring.shadow');
        outline: dt('galleria.indicator.button.focus.ring.width') dt('galleria.indicator.button.focus.ring.style') dt('galleria.indicator.button.focus.ring.color');
        outline-offset: dt('galleria.indicator.button.focus.ring.offset');
    }

    .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.indicator.button.active.background');
    }

    .p-galleria-indicators-left .p-galleria-items-container,
    .p-galleria-indicators-right .p-galleria-items-container {
        flex-direction: row;
        align-items: center;
    }

    .p-galleria-indicators-left .p-galleria-items,
    .p-galleria-indicators-top .p-galleria-items {
        order: 2;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-top .p-galleria-indicator-list {
        order: 1;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-right .p-galleria-indicator-list {
        flex-direction: column;
    }

    .p-galleria-inset-indicators .p-galleria-indicator-list {
        position: absolute;
        display: flex;
        z-index: 1;
        background: dt('galleria.inset.indicator.list.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button:hover {
        background: dt('galleria.inset.indicator.button.hover.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.active.background');
    }

    .p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {
        top: 0;
        left: 0;
        width: 100%;
        align-items: flex-start;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {
        right: 0;
        top: 0;
        height: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {
        bottom: 0;
        left: 0;
        width: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {
        left: 0;
        top: 0;
        height: 100%;
        align-items: flex-start;
    }

    .p-galleria-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-galleria-close-button {
        position: absolute !important;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: dt('galleria.close.button.gutter');
        background: dt('galleria.close.button.background');
        color: dt('galleria.close.button.color');
        width: dt('galleria.close.button.size');
        height: dt('galleria.close.button.size');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        border-radius: dt('galleria.close.button.border.radius');
        outline-color: transparent;
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
    }

    .p-galleria-close-icon {
        font-size: dt('galleria.close.button.icon.size');
        width: dt('galleria.close.button.icon.size');
        height: dt('galleria.close.button.icon.size');
    }

    .p-galleria-close-button:hover {
        background: dt('galleria.close.button.hover.background');
        color: dt('galleria.close.button.hover.color');
    }

    .p-galleria-close-button:focus-visible {
        box-shadow: dt('galleria.close.button.focus.ring.shadow');
        outline: dt('galleria.close.button.focus.ring.width') dt('galleria.close.button.focus.ring.style') dt('galleria.close.button.focus.ring.color');
        outline-offset: dt('galleria.close.button.focus.ring.offset');
    }

    .p-galleria-mask .p-galleria-nav-button {
        position: fixed;
        top: 50%;
    }

    .p-galleria-enter-active {
        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .p-galleria-leave-active {
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-galleria-enter-from,
    .p-galleria-leave-to {
        opacity: 0;
        transform: scale(0.7);
    }

    .p-galleria-enter-active .p-galleria-nav-button {
        opacity: 0;
    }

    .p-items-hidden .p-galleria-thumbnail-item {
        visibility: hidden;
    }

    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {
        visibility: visible;
    }
`,ie={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(t){var i=t.instance,a=i.$attrs.showThumbnails&&i.getPositionClass("p-galleria-thumbnails",i.$attrs.thumbnailsPosition),r=i.$attrs.showIndicators&&i.getPositionClass("p-galleria-indicators",i.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":i.$attrs.fullScreen,"p-galleria-inset-indicators":i.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":i.$attrs.showItemNavigatorsOnHover&&!i.$attrs.fullScreen},a,r]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:function(t){var i=t.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:function(t){var i=t.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":i.isNavForwardDisabled}]},nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(t){var i=t.instance,a=t.index;return["p-galleria-indicator",{"p-galleria-indicator-active":i.isIndicatorItemActive(a)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:function(t){var i=t.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(t){var i=t.instance,a=t.index,r=t.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":r===a,"p-galleria-thumbnail-item-active":i.isItemActive(a),"p-galleria-thumbnail-item-start":i.firstItemAciveIndex()===a,"p-galleria-thumbnail-item-end":i.lastItemActiveIndex()===a}]},thumbnail:"p-galleria-thumbnail",thumbnailNextButton:function(t){var i=t.instance;return["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavForwardDisabled}]},thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},ae=k.extend({name:"galleria",style:ee,classes:ie}),ne={name:"BaseGalleria",extends:I,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:ae,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function P(e){return se(e)||le(e)||oe(e)||re()}function re(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oe(e,t){if(e){if(typeof e=="string")return z(e,t);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?z(e,t):void 0}}function le(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function se(e){if(Array.isArray(e))return z(e)}function z(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}var rt={name:"GalleriaItem",hostName:"Galleria",extends:I,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(t){return{context:{highlighted:this.activeIndex===t}}},next:function(){var t=this.activeIndex+1,i=this.circular&&this.value.length-1===this.activeIndex?0:t;this.$emit("update:activeIndex",i)},prev:function(){var t=this.activeIndex!==0?this.activeIndex-1:0,i=this.circular&&this.activeIndex===0?this.value.length-1:t;this.$emit("update:activeIndex",i)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(t){this.stopSlideShow(),this.prev(),t&&t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow(),this.next(),t&&t.cancelable&&t.preventDefault()},onIndicatorClick:function(t){this.stopSlideShow(),this.$emit("update:activeIndex",t)},onIndicatorMouseEnter:function(t){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",t))},onIndicatorKeyDown:function(t,i){switch(t.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",i),t.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":t.preventDefault();break}},onRightKey:function(){var t=P(v(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===t.length?t.length-1:i+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=P(v(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,t.length-1)},onTabKey:function(){var t=P(v(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=t.findIndex(function(n){return S(n,"data-p-active")===!0}),a=x(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]'),r=t.findIndex(function(n){return n===a.parentElement});t[r].children[0].tabIndex="-1",t[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=P(v(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=x(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]');return t.findIndex(function(a){return a===i.parentElement})},changedFocusedIndicator:function(t,i){var a=P(v(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));a[t].children[0].tabIndex="-1",a[i].children[0].tabIndex="0",a[i].children[0].focus()},isIndicatorItemActive:function(t){return this.activeIndex===t},ariaSlideNumber:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,t):void 0},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1}},components:{ChevronLeftIcon:R,ChevronRightIcon:H},directives:{ripple:L}},de=["disabled"],ue=["id","aria-label","aria-roledescription"],ce=["disabled"],he=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],be=["tabindex"];function pe(e,t,i,a,r,n){var u=T("ripple");return l(),c("div",o({class:e.cx("itemsContainer")},e.ptm("itemsContainer")),[m("div",o({class:e.cx("items")},e.ptm("items")),[i.showItemNavigators?g((l(),c("button",o({key:0,type:"button",class:e.cx("prevButton"),onClick:t[0]||(t[0]=function(d){return n.navBackward(d)}),disabled:n.isNavBackwardDisabled},e.ptm("prevButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),b(f(i.templates.previousitemicon||"ChevronLeftIcon"),o({class:e.cx("prevIcon")},e.ptm("prevIcon")),null,16,["class"]))],16,de)),[[u]]):h("",!0),m("div",o({id:i.id+"_item_"+i.activeIndex,class:e.cx("item"),role:"group","aria-label":n.ariaSlideNumber(i.activeIndex+1),"aria-roledescription":n.ariaSlideLabel},e.ptm("item")),[i.templates.item?(l(),b(f(i.templates.item),{key:0,item:n.activeItem},null,8,["item"])):h("",!0)],16,ue),i.showItemNavigators?g((l(),c("button",o({key:1,type:"button",class:e.cx("nextButton"),onClick:t[1]||(t[1]=function(d){return n.navForward(d)}),disabled:n.isNavForwardDisabled},e.ptm("nextButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),b(f(i.templates.nextitemicon||"ChevronRightIcon"),o({class:e.cx("nextIcon")},e.ptm("nextIcon")),null,16,["class"]))],16,ce)),[[u]]):h("",!0),i.templates.caption?(l(),c("div",o({key:2,class:e.cx("caption")},e.ptm("caption")),[i.templates.caption?(l(),b(f(i.templates.caption),{key:0,item:n.activeItem},null,8,["item"])):h("",!0)],16)):h("",!0)],16),i.showIndicators?(l(),c("ul",o({key:0,ref:"indicatorContent",class:e.cx("indicatorList")},e.ptm("indicatorList")),[(l(!0),c(N,null,at(i.value,function(d,s){return l(),c("li",o({key:"p-galleria-indicator-".concat(s),class:e.cx("indicator",{index:s}),"aria-label":n.ariaPageLabel(s+1),"aria-selected":i.activeIndex===s,"aria-controls":i.id+"_item_"+s,onClick:function(y){return n.onIndicatorClick(s)},onMouseenter:function(y){return n.onIndicatorMouseEnter(s)},onKeydown:function(y){return n.onIndicatorKeyDown(y,s)},ref_for:!0},e.ptm("indicator",n.getIndicatorPTOptions(s)),{"data-p-active":n.isIndicatorItemActive(s)}),[i.templates.indicator?h("",!0):(l(),c("button",o({key:0,type:"button",tabindex:i.activeIndex===s?"0":"-1",class:e.cx("indicatorButton"),ref_for:!0},e.ptm("indicatorButton",n.getIndicatorPTOptions(s))),null,16,be)),i.templates.indicator?(l(),b(f(i.templates.indicator),{key:1,index:s,activeIndex:i.activeIndex,tabindex:i.activeIndex===s?"0":"-1"},null,8,["index","activeIndex","tabindex"])):h("",!0)],16,he)}),128))],16)):h("",!0)],16)}rt.render=pe;function j(e){return ge(e)||me(e)||ve(e)||fe()}function fe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ve(e,t){if(e){if(typeof e=="string")return F(e,t);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?F(e,t):void 0}}function me(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ge(e){if(Array.isArray(e))return F(e)}function F(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}var ot={name:"GalleriaThumbnails",hostName:"Galleria",extends:I,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(t,i){this.d_numVisible=t,this.d_oldNumVisible=i},activeIndex:function(t,i){this.d_activeIndex=t,this.d_oldActiveItemIndex=i}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var t=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?t=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?t=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?t=this.d_activeIndex*-1+this.getMedianItemIndex()+1:t=this.d_activeIndex*-1+this.getMedianItemIndex(),t!==this.totalShiftedItems&&(this.totalShiftedItems=t),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(t*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(t*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&U(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(t){var i=this.totalShiftedItems+t;t<0&&-1*i+this.d_numVisible>this.value.length-1?i=this.d_numVisible-this.value.length:t>0&&i>0&&(i=0),this.circular&&(t<0&&this.value.length-1===this.d_activeIndex?i=0:t>0&&this.d_activeIndex===0&&(i=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&U(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(i*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(i*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=i},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var t=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?t:t-1},navBackward:function(t){this.stopSlideShow();var i=this.d_activeIndex!==0?this.d_activeIndex-1:0,a=i+this.totalShiftedItems;this.d_numVisible-a-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var r=this.circular&&this.d_activeIndex===0?this.value.length-1:i;this.$emit("update:activeIndex",r),t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow();var i=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;i+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var a=this.circular&&this.value.length-1===this.d_activeIndex?0:i;this.$emit("update:activeIndex",a),t.cancelable&&t.preventDefault()},onItemClick:function(t){this.stopSlideShow();var i=t;if(i!==this.d_activeIndex){var a=i+this.totalShiftedItems,r=0;i<this.d_activeIndex?(r=this.d_numVisible-a-1-this.getMedianItemIndex(),r>0&&-1*this.totalShiftedItems!==0&&this.step(r)):(r=this.getMedianItemIndex()-a,r<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(r)),this.$emit("update:activeIndex",i)}},onThumbnailKeydown:function(t,i){switch((t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.onItemClick(i),t.preventDefault()),t.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"ArrowUp":case"ArrowDown":t.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var t=v(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===t.length?t.length-1:i+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=v(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,t.length-1)},onTabKey:function(){var t=j(v(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=t.findIndex(function(n){return S(n,"data-p-active")===!0}),a=x(this.$refs.itemsContainer,'[tabindex="0"]'),r=t.findIndex(function(n){return n===a.parentElement});t[r].children[0].tabIndex="-1",t[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=j(v(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=x(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return t.findIndex(function(a){return a===i.parentElement})},changedFocusedIndicator:function(t,i){var a=v(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');a[t].children[0].tabIndex="-1",a[i].children[0].tabIndex="0",a[i].children[0].focus()},onTransitionEnd:function(t){this.$refs.itemsContainer&&t.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&it(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(t){var i=t.changedTouches[0];this.startPos={x:i.pageX,y:i.pageY}},onTouchMove:function(t){t.cancelable&&t.preventDefault()},onTouchEnd:function(t){var i=t.changedTouches[0];this.isVertical?this.changePageOnTouch(t,i.pageY-this.startPos.y):this.changePageOnTouch(t,i.pageX-this.startPos.x)},changePageOnTouch:function(t,i){var a=10;Math.abs(i)<a||(i<0?this.navForward(t):this.navBackward(t))},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var t;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",pt(this.thumbnailsStyle,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.body.appendChild(this.thumbnailsStyle)}var i=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=j(this.responsiveOptions);var a=ft();this.sortedResponsiveOptions.sort(function(u,d){var s=u.breakpoint,p=d.breakpoint;return vt(s,p,-1,a)});for(var r=0;r<this.sortedResponsiveOptions.length;r++){var n=this.sortedResponsiveOptions[r];i+=`
                        @media screen and (max-width: `.concat(n.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/n.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=i},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var t=window.innerWidth,i={numVisible:this.numVisible},a=0;a<this.sortedResponsiveOptions.length;a++){var r=this.sortedResponsiveOptions[a];parseInt(r.breakpoint,10)>=t&&(i=r)}this.d_numVisible!==i.numVisible&&(this.d_numVisible=i.numVisible)}},bindDocumentListeners:function(){var t=this;this.documentResizeListener||(this.documentResizeListener=function(){t.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(t){return this.firstItemAciveIndex()<=t&&this.lastItemActiveIndex()>=t},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}},components:{ChevronLeftIcon:R,ChevronRightIcon:H,ChevronUpIcon:St,ChevronDownIcon:xt},directives:{ripple:L}};function $(e){"@babel/helpers - typeof";return $=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$(e)}function _(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,a)}return i}function O(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?_(Object(i),!0).forEach(function(a){ye(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):_(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function ye(e,t,i){return(t=Ie(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Ie(e){var t=we(e,"string");return $(t)=="symbol"?t:t+""}function we(e,t){if($(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if($(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var xe=["disabled","aria-label"],Se=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],ke=["tabindex","aria-label","aria-current","onClick"],Te=["disabled","aria-label"];function Pe(e,t,i,a,r,n){var u=T("ripple");return l(),c("div",o({class:e.cx("thumbnails")},e.ptm("thumbnails")),[m("div",o({class:e.cx("thumbnailContent")},e.ptm("thumbnailContent")),[i.showThumbnailNavigators?g((l(),c("button",o({key:0,class:e.cx("thumbnailPrevButton"),disabled:n.isNavBackwardDisabled,type:"button","aria-label":n.ariaPrevButtonLabel,onClick:t[0]||(t[0]=function(d){return n.navBackward(d)})},O(O({},i.prevButtonProps),e.ptm("thumbnailPrevButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),b(f(i.templates.previousthumbnailicon||(i.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),o({class:e.cx("thumbnailPrevIcon")},e.ptm("thumbnailPrevIcon")),null,16,["class"]))],16,xe)),[[u]]):h("",!0),m("div",o({class:e.cx("thumbnailsViewport"),style:{height:i.isVertical?i.contentHeight:""}},e.ptm("thumbnailsViewport")),[m("div",o({ref:"itemsContainer",class:e.cx("thumbnailItems"),role:"tablist",onTransitionend:t[1]||(t[1]=function(d){return n.onTransitionEnd(d)}),onTouchstart:t[2]||(t[2]=function(d){return n.onTouchStart(d)}),onTouchmove:t[3]||(t[3]=function(d){return n.onTouchMove(d)}),onTouchend:t[4]||(t[4]=function(d){return n.onTouchEnd(d)})},e.ptm("thumbnailItems")),[(l(!0),c(N,null,at(i.value,function(d,s){return l(),c("div",o({key:"p-galleria-thumbnail-item-".concat(s),class:e.cx("thumbnailItem",{index:s,activeIndex:i.activeIndex}),role:"tab","data-p-active":i.activeIndex===s,"aria-selected":i.activeIndex===s,"aria-controls":i.containerId+"_item_"+s,onKeydown:function(y){return n.onThumbnailKeydown(y,s)},ref_for:!0},e.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":i.activeIndex===s,"data-p-galleria-thumbnail-item-active":n.isItemActive(s),"data-p-galleria-thumbnail-item-start":n.firstItemAciveIndex()===s,"data-p-galleria-thumbnail-item-end":n.lastItemActiveIndex()===s}),[m("div",o({class:e.cx("thumbnail"),tabindex:i.activeIndex===s?"0":"-1","aria-label":n.ariaPageLabel(s+1),"aria-current":i.activeIndex===s?"page":void 0,onClick:function(y){return n.onItemClick(s)},ref_for:!0},e.ptm("thumbnail")),[i.templates.thumbnail?(l(),b(f(i.templates.thumbnail),{key:0,item:d},null,8,["item"])):h("",!0)],16,ke)],16,Se)}),128))],16)],16),i.showThumbnailNavigators?g((l(),c("button",o({key:1,class:e.cx("thumbnailNextButton"),disabled:n.isNavForwardDisabled,type:"button","aria-label":n.ariaNextButtonLabel,onClick:t[5]||(t[5]=function(d){return n.navForward(d)})},O(O({},i.nextButtonProps),e.ptm("thumbnailNextButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),b(f(i.templates.nextthumbnailicon||(i.isVertical?"ChevronDownIcon":"ChevronRightIcon")),o({class:e.cx("thumbnailNextIcon")},e.ptm("thumbnailNextIcon")),null,16,["class"]))],16,Te)),[[u]]):h("",!0)],16)],16)}ot.render=Pe;function B(e){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(e)}function W(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,a)}return i}function Z(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?W(Object(i),!0).forEach(function(a){$e(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):W(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function $e(e,t,i){return(t=Be(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Be(e){var t=Ae(e,"string");return B(t)=="symbol"?t:t+""}function Ae(e,t){if(B(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if(B(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var lt={name:"GalleriaContent",hostName:"Galleria",extends:I,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.value":function(t){t&&t.length<this.numVisible&&(this.numVisible=t.length)},"$attrs.activeIndex":function(t){this.activeIndex=t},"$attrs.numVisible":function(t){this.numVisible=t},"$attrs.autoPlay":function(t){t?this.startSlideShow():this.stopSlideShow()}},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(t){return this.ptm(t,{props:Z(Z({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var t=this;this.interval=setInterval(function(){var i=t.$attrs.circular&&t.$attrs.value.length-1===t.activeIndex?0:t.activeIndex+1;t.activeIndex=i},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(t,i){var a=["top","left","bottom","right"],r=a.find(function(n){return n===i});return r?"".concat(t,"-").concat(r):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:rt,GalleriaThumbnails:ot,TimesIcon:yt},directives:{ripple:L}};function A(e){"@babel/helpers - typeof";return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},A(e)}function q(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,a)}return i}function X(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?q(Object(i),!0).forEach(function(a){Le(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):q(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function Le(e,t,i){return(t=Ce(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Ce(e){var t=Oe(e,"string");return A(t)=="symbol"?t:t+""}function Oe(e,t){if(A(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if(A(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ne=["id","aria-label","aria-roledescription"],Ve=["aria-label"],Ke=["aria-live"];function De(e,t,i,a,r,n){var u=K("GalleriaItem"),d=K("GalleriaThumbnails"),s=T("ripple");return e.$attrs.value&&e.$attrs.value.length>0?(l(),c("div",o({key:0,id:e.$id,role:"region",class:[e.cx("root"),e.$attrs.containerClass],style:e.$attrs.containerStyle,"aria-label":e.$attrs.ariaLabel,"aria-roledescription":e.$attrs.ariaRoledescription},X(X({},e.$attrs.containerProps),n.getPTOptions("root"))),[e.$attrs.fullScreen?g((l(),c("button",o({key:0,autofocus:"",type:"button",class:e.cx("closeButton"),"aria-label":n.closeAriaLabel,onClick:t[0]||(t[0]=function(p){return e.$emit("mask-hide")})},n.getPTOptions("closeButton")),[(l(),b(f(e.$attrs.templates.closeicon||"TimesIcon"),o({class:e.cx("closeIcon")},n.getPTOptions("closeIcon")),null,16,["class"]))],16,Ve)),[[s]]):h("",!0),e.$attrs.templates&&e.$attrs.templates.header?(l(),c("div",o({key:1,class:e.cx("header")},n.getPTOptions("header")),[(l(),b(f(e.$attrs.templates.header)))],16)):h("",!0),m("div",o({class:e.cx("content"),"aria-live":e.$attrs.autoPlay?"polite":"off"},n.getPTOptions("content")),[nt(u,{id:e.$id,activeIndex:r.activeIndex,"onUpdate:activeIndex":t[1]||(t[1]=function(p){return r.activeIndex=p}),slideShowActive:r.slideShowActive,"onUpdate:slideShowActive":t[2]||(t[2]=function(p){return r.slideShowActive=p}),value:e.$attrs.value,circular:e.$attrs.circular,templates:e.$attrs.templates,showIndicators:e.$attrs.showIndicators,changeItemOnIndicatorHover:e.$attrs.changeItemOnIndicatorHover,showItemNavigators:e.$attrs.showItemNavigators,autoPlay:e.$attrs.autoPlay,onStartSlideshow:n.startSlideShow,onStopSlideshow:n.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),e.$attrs.showThumbnails?(l(),b(d,{key:0,activeIndex:r.activeIndex,"onUpdate:activeIndex":t[3]||(t[3]=function(p){return r.activeIndex=p}),slideShowActive:r.slideShowActive,"onUpdate:slideShowActive":t[4]||(t[4]=function(p){return r.slideShowActive=p}),containerId:e.$id,value:e.$attrs.value,templates:e.$attrs.templates,numVisible:r.numVisible,responsiveOptions:e.$attrs.responsiveOptions,circular:e.$attrs.circular,isVertical:n.isVertical(),contentHeight:e.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:e.$attrs.showThumbnailNavigators,prevButtonProps:e.$attrs.prevButtonProps,nextButtonProps:e.$attrs.nextButtonProps,onStopSlideshow:n.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):h("",!0)],16,Ke),e.$attrs.templates&&e.$attrs.templates.footer?(l(),c("div",o({key:2,class:e.cx("footer")},n.getPTOptions("footer")),[(l(),b(f(e.$attrs.templates.footer)))],16)):h("",!0)],16,Ne)):h("",!0)}lt.render=De;var Ee={name:"Galleria",extends:ne,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,documentKeydownListener:null,data:function(){return{containerVisible:this.visible,target:null}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&G(),this.mask=null,this.container&&(E.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(t){E.set("modal",t,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(t){this.target=document.activeElement,this.mask.style.zIndex=String(parseInt(t.style.zIndex,10)-1),It(),this.focus(),this.bindGlobalListeners()},onBeforeLeave:function(){!this.isUnstyled&&it(this.mask,"p-overlay-mask-leave")},onLeave:function(){et(this.target),this.target=null},onAfterLeave:function(t){E.clear(t),this.containerVisible=!1,G(),this.unbindGlobalListeners()},onActiveItemChange:function(t){this.activeIndex!==t&&this.$emit("update:activeIndex",t)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},onKeyDown:function(t){t.code==="Escape"&&this.maskHide()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindGlobalListeners:function(){this.fullScreen&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.fullScreen&&this.unbindDocumentKeyDownListener()},focus:function(){var t=this.container.$el.querySelector("[autofocus]");t&&t.focus()}},components:{GalleriaContent:lt,Portal:gt},directives:{focustrap:wt}},je=["aria-modal"];function ze(e,t,i,a,r,n){var u=K("GalleriaContent"),d=K("Portal"),s=T("focustrap");return e.fullScreen?(l(),b(d,{key:0},{default:V(function(){return[r.containerVisible?(l(),c("div",o({key:0,ref:n.maskRef,class:[e.cx("mask"),e.maskClass],role:"dialog","aria-modal":e.fullScreen?"true":void 0},e.ptm("mask")),[nt(mt,o({name:"p-galleria",onBeforeEnter:n.onBeforeEnter,onEnter:n.onEnter,onBeforeLeave:n.onBeforeLeave,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave,appear:""},e.ptm("transition")),{default:V(function(){return[e.visible?g((l(),b(u,o({key:0,ref:n.containerRef,onMaskHide:n.maskHide,templates:e.$slots,onActiveitemChange:n.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[s]]):h("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,je)):h("",!0)]}),_:1})):(l(),b(u,o({key:1,templates:e.$slots,onActiveitemChange:n.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}Ee.render=ze;export{Qt as a,Mt as b,jt as c,Nt as d,Bt as e,Ee as s};
