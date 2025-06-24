import{c as T}from"./index-Be1fzYNM.js";import{h as R,B as z,V as v,L as y,U as E,i as H,k as N,j as w,l as U,ae as Z,m as a,Q as W,o as r,f as o,b as k,R as j,c,n as D,s as I,g as m,t as A,p as L,w as B,a as P,v as q,q as g,F as h,X as M,d as Q}from"./app-C_wibGIE.js";import{Z as x,s as X}from"./index-DeBLWrxy.js";import{C as G}from"./index-BaRTdocM.js";import{O as J}from"./index-CLprxP6y.js";import{a as O,R as Y}from"./index-Bx2Rw5nZ.js";import{s as _}from"./index-4GfbyAHC.js";var $=R`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,ee={root:function(t){var i=t.props;return["p-menu p-component",{"p-menu-overlay":i.popup}]},start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:function(t){var i=t.instance;return["p-menu-item",{"p-focus":i.id===i.focusedOptionId,"p-disabled":i.disabled()}]},itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},te=z.extend({name:"menu",style:$,classes:ee}),ie={name:"BaseMenu",extends:O,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:te,provide:function(){return{$pcMenu:this,$parentInstance:this}}},F={name:"Menuitem",hostName:"Menu",extends:O,inheritAttrs:!1,emits:["item-click","item-mousemove"],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(t,i){return t&&t.item?Z(t.item[i]):void 0},getPTOptions:function(t){return this.ptm(t,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(t){var i=this.getItemProp(this.item,"command");i&&i({originalEvent:t,item:this.item.item}),this.$emit("item-click",{originalEvent:t,item:this.item,id:this.id})},onItemMouseMove:function(t){this.$emit("item-mousemove",{originalEvent:t,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},getMenuItemProps:function(t){return{action:a({class:this.cx("itemLink"),tabindex:"-1"},this.getPTOptions("itemLink")),icon:a({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon")),label:a({class:this.cx("itemLabel")},this.getPTOptions("itemLabel"))}}},computed:{dataP:function(){return T({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:Y}},ne=["id","aria-label","aria-disabled","data-p-focused","data-p-disabled","data-p"],re=["data-p"],ae=["href","target"],se=["data-p"],oe=["data-p"];function le(e,t,i,s,d,n){var p=W("ripple");return n.visible()?(r(),o("li",a({key:0,id:i.id,class:[e.cx("item"),i.item.class],role:"menuitem",style:i.item.style,"aria-label":n.label(),"aria-disabled":n.disabled(),"data-p-focused":n.isItemFocused(),"data-p-disabled":n.disabled()||!1,"data-p":n.dataP},n.getPTOptions("item")),[k("div",a({class:e.cx("itemContent"),onClick:t[0]||(t[0]=function(b){return n.onItemClick(b)}),onMousemove:t[1]||(t[1]=function(b){return n.onItemMouseMove(b)}),"data-p":n.dataP},n.getPTOptions("itemContent")),[i.templates.item?i.templates.item?(r(),c(I(i.templates.item),{key:1,item:i.item,label:n.label(),props:n.getMenuItemProps(i.item)},null,8,["item","label","props"])):m("",!0):j((r(),o("a",a({key:0,href:i.item.url,class:e.cx("itemLink"),target:i.item.target,tabindex:"-1"},n.getPTOptions("itemLink")),[i.templates.itemicon?(r(),c(I(i.templates.itemicon),{key:0,item:i.item,class:D(e.cx("itemIcon"))},null,8,["item","class"])):i.item.icon?(r(),o("span",a({key:1,class:[e.cx("itemIcon"),i.item.icon],"data-p":n.dataP},n.getPTOptions("itemIcon")),null,16,se)):m("",!0),k("span",a({class:e.cx("itemLabel"),"data-p":n.dataP},n.getPTOptions("itemLabel")),A(n.label()),17,oe)],16,ae)),[[p]])],16,re)],16,ne)):m("",!0)}F.render=le;function K(e){return ce(e)||me(e)||ue(e)||de()}function de(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ue(e,t){if(e){if(typeof e=="string")return S(e,t);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?S(e,t):void 0}}function me(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ce(e){if(Array.isArray(e))return S(e)}function S(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,s=Array(t);i<t;i++)s[i]=e[i];return s}var pe={name:"Menu",extends:ie,inheritAttrs:!1,emits:["show","hide","focus","blur"],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&x.clear(this.container),this.container=null},methods:{itemClick:function(t){var i=t.item;this.disabled(i)||(i.command&&i.command(t),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==t.id&&(this.focusedOptionIndex=t.id))},itemMouseMove:function(t){this.focused&&(this.focusedOptionIndex=t.id)},onListFocus:function(t){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Space":this.onSpaceKey(t);break;case"Escape":this.popup&&(v(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide();break}},onArrowDownKey:function(t){var i=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(i),t.preventDefault()},onArrowUpKey:function(t){if(t.altKey&&this.popup)v(this.target),this.hide(),t.preventDefault();else{var i=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(i),t.preventDefault()}},onHomeKey:function(t){this.changeFocusedOptionIndex(0),t.preventDefault()},onEndKey:function(t){this.changeFocusedOptionIndex(y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]').length-1),t.preventDefault()},onEnterKey:function(t){var i=E(this.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),s=i&&E(i,'a[data-pc-section="itemlink"]');this.popup&&v(this.target),s?s.click():i&&i.click(),t.preventDefault()},onSpaceKey:function(t){this.onEnterKey(t)},findNextOptionIndex:function(t){var i=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=K(i).findIndex(function(d){return d.id===t});return s>-1?s+1:0},findPrevOptionIndex:function(t){var i=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=K(i).findIndex(function(d){return d.id===t});return s>-1?s-1:0},changeFocusedOptionIndex:function(t){var i=y(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=t>=i.length?i.length-1:t<0?0:t;s>-1&&(this.focusedOptionIndex=i[s].getAttribute("id"))},toggle:function(t,i){this.overlayVisible?this.hide():this.show(t,i)},show:function(t,i){this.overlayVisible=!0,this.target=i??t.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(t){H(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&x.set("menu",t,this.baseZIndex+this.$primevue.config.zIndex.menu),this.popup&&v(this.list),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&x.clear(t)},alignOverlay:function(){N(this.container,this.target);var t=w(this.target);t>w(this.container)&&(this.container.style.minWidth=w(this.target)+"px")},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(i){var s=t.container&&!t.container.contains(i.target),d=!(t.target&&(t.target===i.target||t.target.contains(i.target)));t.overlayVisible&&s&&d?t.hide():!t.popup&&s&&d&&(t.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new G(this.target,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!U()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:function(t){return typeof t.visible=="function"?t.visible():t.visible!==!1},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},label:function(t){return typeof t.label=="function"?t.label():t.label},onOverlayClick:function(t){J.emit("overlay-click",{originalEvent:t,target:this.target})},containerRef:function(t){this.container=t},listRef:function(t){this.list=t}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null},dataP:function(){return T({popup:this.popup})}},components:{PVMenuitem:F,Portal:X}},be=["id","data-p"],fe=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],he=["id"];function ve(e,t,i,s,d,n){var p=L("PVMenuitem"),b=L("Portal");return r(),c(b,{appendTo:e.appendTo,disabled:!e.popup},{default:B(function(){return[P(q,a({name:"p-connected-overlay",onEnter:n.onEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},e.ptm("transition")),{default:B(function(){return[!e.popup||d.overlayVisible?(r(),o("div",a({key:0,ref:n.containerRef,id:e.$id,class:e.cx("root"),onClick:t[3]||(t[3]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)}),"data-p":n.dataP},e.ptmi("root")),[e.$slots.start?(r(),o("div",a({key:0,class:e.cx("start")},e.ptm("start")),[g(e.$slots,"start")],16)):m("",!0),k("ul",a({ref:n.listRef,id:e.$id+"_list",class:e.cx("list"),role:"menu",tabindex:e.tabindex,"aria-activedescendant":d.focused?n.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return n.onListFocus&&n.onListFocus.apply(n,arguments)}),onBlur:t[1]||(t[1]=function(){return n.onListBlur&&n.onListBlur.apply(n,arguments)}),onKeydown:t[2]||(t[2]=function(){return n.onListKeyDown&&n.onListKeyDown.apply(n,arguments)})},e.ptm("list")),[(r(!0),o(h,null,M(e.model,function(l,u){return r(),o(h,{key:n.label(l)+u.toString()},[l.items&&n.visible(l)&&!l.separator?(r(),o(h,{key:0},[l.items?(r(),o("li",a({key:0,id:e.$id+"_"+u,class:[e.cx("submenuLabel"),l.class],role:"none",ref_for:!0},e.ptm("submenuLabel")),[g(e.$slots,e.$slots.submenulabel?"submenulabel":"submenuheader",{item:l},function(){return[Q(A(n.label(l)),1)]})],16,he)):m("",!0),(r(!0),o(h,null,M(l.items,function(f,C){return r(),o(h,{key:f.label+u+"_"+C},[n.visible(f)&&!f.separator?(r(),c(p,{key:0,id:e.$id+"_"+u+"_"+C,item:f,templates:e.$slots,focusedOptionId:n.focusedOptionId,unstyled:e.unstyled,onItemClick:n.itemClick,onItemMousemove:n.itemMouseMove,pt:e.pt},null,8,["id","item","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"])):n.visible(f)&&f.separator?(r(),o("li",a({key:"separator"+u+C,class:[e.cx("separator"),l.class],style:f.style,role:"separator",ref_for:!0},e.ptm("separator")),null,16)):m("",!0)],64)}),128))],64)):n.visible(l)&&l.separator?(r(),o("li",a({key:"separator"+u.toString(),class:[e.cx("separator"),l.class],style:l.style,role:"separator",ref_for:!0},e.ptm("separator")),null,16)):(r(),c(p,{key:n.label(l)+u.toString(),id:e.$id+"_"+u,item:l,index:u,templates:e.$slots,focusedOptionId:n.focusedOptionId,unstyled:e.unstyled,onItemClick:n.itemClick,onItemMousemove:n.itemMouseMove,pt:e.pt},null,8,["id","item","index","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"]))],64)}),128))],16,fe),e.$slots.end?(r(),o("div",a({key:1,class:e.cx("end")},e.ptm("end")),[g(e.$slots,"end")],16)):m("",!0)],16,be)):m("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}pe.render=ve;var ye=R`
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`,ge={root:"p-breadcrumb p-component",list:"p-breadcrumb-list",homeItem:"p-breadcrumb-home-item",separator:"p-breadcrumb-separator",separatorIcon:"p-breadcrumb-separator-icon",item:function(t){var i=t.instance;return["p-breadcrumb-item",{"p-disabled":i.disabled()}]},itemLink:"p-breadcrumb-item-link",itemIcon:"p-breadcrumb-item-icon",itemLabel:"p-breadcrumb-item-label"},ke=z.extend({name:"breadcrumb",style:ye,classes:ge}),Ie={name:"BaseBreadcrumb",extends:O,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:ke,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},V={name:"BreadcrumbItem",hostName:"Breadcrumb",extends:O,props:{item:null,templates:null,index:null},methods:{onClick:function(t){this.item.command&&this.item.command({originalEvent:t,item:this.item})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl:function(){var t=this.item,i=t.to,s=t.url,d=typeof window<"u"?window.location.pathname:"";return i===d||s===d?"page":void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var t=this;return{action:a({class:this.cx("itemLink"),"aria-current":this.isCurrentUrl(),onClick:function(s){return t.onClick(s)}},this.ptm("itemLink",this.ptmOptions)),icon:a({class:[this.cx("icon"),this.item.icon]},this.ptm("icon",this.ptmOptions)),label:a({class:this.cx("label")},this.ptm("label",this.ptmOptions))}}}},Le=["href","target","aria-current"];function Oe(e,t,i,s,d,n){return n.visible()?(r(),o("li",a({key:0,class:[e.cx("item"),i.item.class]},e.ptm("item",n.ptmOptions)),[i.templates.item?(r(),c(I(i.templates.item),{key:1,item:i.item,label:n.label(),props:n.getMenuItemProps},null,8,["item","label","props"])):(r(),o("a",a({key:0,href:i.item.url||"#",class:e.cx("itemLink"),target:i.item.target,"aria-current":n.isCurrentUrl(),onClick:t[0]||(t[0]=function(){return n.onClick&&n.onClick.apply(n,arguments)})},e.ptm("itemLink",n.ptmOptions)),[i.templates&&i.templates.itemicon?(r(),c(I(i.templates.itemicon),{key:0,item:i.item,class:D(e.cx("itemIcon",n.ptmOptions))},null,8,["item","class"])):i.item.icon?(r(),o("span",a({key:1,class:[e.cx("itemIcon"),i.item.icon]},e.ptm("itemIcon",n.ptmOptions)),null,16)):m("",!0),i.item.label?(r(),o("span",a({key:2,class:e.cx("itemLabel")},e.ptm("itemLabel",n.ptmOptions)),A(n.label()),17)):m("",!0)],16,Le))],16)):m("",!0)}V.render=Oe;var Ce={name:"Breadcrumb",extends:Ie,inheritAttrs:!1,components:{BreadcrumbItem:V,ChevronRightIcon:_}};function we(e,t,i,s,d,n){var p=L("BreadcrumbItem"),b=L("ChevronRightIcon");return r(),o("nav",a({class:e.cx("root")},e.ptmi("root")),[k("ol",a({class:e.cx("list")},e.ptm("list")),[e.home?(r(),c(p,a({key:0,item:e.home,class:e.cx("homeItem"),templates:e.$slots,pt:e.pt,unstyled:e.unstyled},e.ptm("homeItem")),null,16,["item","class","templates","pt","unstyled"])):m("",!0),(r(!0),o(h,null,M(e.model,function(l,u){return r(),o(h,{key:l.label+"_"+u},[e.home||u!==0?(r(),o("li",a({key:0,class:e.cx("separator"),ref_for:!0},e.ptm("separator")),[g(e.$slots,"separator",{},function(){return[P(b,a({"aria-hidden":"true",class:e.cx("separatorIcon"),ref_for:!0},e.ptm("separatorIcon")),null,16,["class"])]})],16)):m("",!0),P(p,{item:l,index:u,templates:e.$slots,pt:e.pt,unstyled:e.unstyled},null,8,["item","index","templates","pt","unstyled"])],64)}),128))],16)],16)}Ce.render=we;export{pe as a,Ce as s};
