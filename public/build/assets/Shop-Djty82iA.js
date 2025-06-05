import{h as O,B as D,aK as H,a1 as ne,a2 as ie,p as V,o as l,f as h,m as p,q as m,g as P,c as v,a6 as X,w as u,n as S,b as d,F as T,d as L,t as k,D as K,s as A,U as oe,v as se,$ as de,Y as z,G as le,I as ce,N as C,a as g,aG as ue,aH as pe,b9 as he,A as B,R as fe,Q as ge,a4 as Y,L as me,S as ve}from"./app-Dtp9cSJU.js";import{s as be}from"./index-CWPyrpGy.js";import{a as E,c as G,R as ye}from"./index-DGGBnKln.js";import{s as we}from"./index-DFb8bcvn.js";import{s as Pe}from"./index-DwudppIB.js";import{s as ke}from"./index-BXTavq2_.js";import{s as Ae}from"./index-DsP_CcZb.js";import{s as q}from"./index-Bj1LGt-D.js";import{s as Se}from"./index-BVu0eKYQ.js";import{b as $e}from"./index-q5Sj6DxD.js";import{s as Te}from"./index-B_MDerZk.js";import{_ as Ce}from"./Default-CT9kyiCz.js";import{P as xe}from"./ProductCard-CFLWX7Kb.js";import"./index-um02aR4U.js";import"./index-diUOqfmn.js";import"./index-CzXwX5eA.js";import"./index-DPAutJ-T.js";import"./index-BbUqAkel.js";import"./index-BpUon12_.js";import"./index-JmtSx9Qe.js";import"./index-MPJ9__4H.js";import"./index-C4XnIrCz.js";import"./index-DjdxKMBt.js";import"./DropdownLink-ChosizsD.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var De=O`
    .p-dataview {
        border-color: dt('dataview.border.color');
        border-width: dt('dataview.border.width');
        border-style: solid;
        border-radius: dt('dataview.border.radius');
        padding: dt('dataview.padding');
    }

    .p-dataview-header {
        background: dt('dataview.header.background');
        color: dt('dataview.header.color');
        border-color: dt('dataview.header.border.color');
        border-width: dt('dataview.header.border.width');
        border-style: solid;
        padding: dt('dataview.header.padding');
        border-radius: dt('dataview.header.border.radius');
    }

    .p-dataview-content {
        background: dt('dataview.content.background');
        border-color: dt('dataview.content.border.color');
        border-width: dt('dataview.content.border.width');
        border-style: solid;
        color: dt('dataview.content.color');
        padding: dt('dataview.content.padding');
        border-radius: dt('dataview.content.border.radius');
    }

    .p-dataview-footer {
        background: dt('dataview.footer.background');
        color: dt('dataview.footer.color');
        border-color: dt('dataview.footer.border.color');
        border-width: dt('dataview.footer.border.width');
        border-style: solid;
        padding: dt('dataview.footer.padding');
        border-radius: dt('dataview.footer.border.radius');
    }

    .p-dataview-paginator-top {
        border-width: dt('dataview.paginator.top.border.width');
        border-color: dt('dataview.paginator.top.border.color');
        border-style: solid;
    }

    .p-dataview-paginator-bottom {
        border-width: dt('dataview.paginator.bottom.border.width');
        border-color: dt('dataview.paginator.bottom.border.color');
        border-style: solid;
    }
`,Le={root:function(t){var a=t.props;return["p-dataview p-component",{"p-dataview-list":a.layout==="list","p-dataview-grid":a.layout==="grid"}]},header:"p-dataview-header",pcPaginator:function(t){var a=t.position;return"p-dataview-paginator-"+a},content:"p-dataview-content",emptyMessage:"p-dataview-empty-message",footer:"p-dataview-footer"},Ie=D.extend({name:"dataview",style:De,classes:Le}),Ee={name:"BaseDataView",extends:E,props:{value:{type:Array,default:null},layout:{type:String,default:"list"},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:"bottom"},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:"({currentPage} of {totalPages})"},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},lazy:{type:Boolean,default:!1},dataKey:{type:String,default:null}},style:Ie,provide:function(){return{$pcDataView:this,$parentInstance:this}}};function Be(e){return ze(e)||He(e)||Ke(e)||Ve()}function Ve(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ke(e,t){if(e){if(typeof e=="string")return M(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?M(e,t):void 0}}function He(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ze(e){if(Array.isArray(e))return M(e)}function M(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,n=Array(t);a<t;a++)n[a]=e[a];return n}var Q={name:"DataView",extends:Ee,inheritAttrs:!1,emits:["update:first","update:rows","page"],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(t){this.d_first=t},rows:function(t){this.d_rows=t},sortField:function(){this.resetPage()},sortOrder:function(){this.resetPage()}},methods:{getKey:function(t,a){return this.dataKey?H(t,this.dataKey):a},onPage:function(t){this.d_first=t.first,this.d_rows=t.rows,this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",t)},sort:function(){var t=this;if(this.value){var a=Be(this.value),n=ne();return a.sort(function(o,r){var s=H(o,t.sortField),i=H(r,t.sortField);return ie(s,i,t.sortOrder,n)}),a}else return null},resetPage:function(){this.d_first=0,this.$emit("update:first",this.d_first)}},computed:{getTotalRecords:function(){return this.totalRecords?this.totalRecords:this.value?this.value.length:0},empty:function(){return!this.value||this.value.length===0},emptyMessageText:function(){var t;return((t=this.$primevue.config)===null||t===void 0||(t=t.locale)===null||t===void 0?void 0:t.emptyMessage)||""},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!=="bottom"||this.paginatorPosition==="both")},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!=="top"||this.paginatorPosition==="both")},items:function(){if(this.value&&this.value.length){var t=this.value;if(t&&t.length&&this.sortField&&(t=this.sort()),this.paginator){var a=this.lazy?0:this.d_first;return t.slice(a,a+this.d_rows)}else return t}else return null}},components:{DVPaginator:be}};function Me(e,t,a,n,o,r){var s=V("DVPaginator");return l(),h("div",p({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(l(),h("div",p({key:0,class:e.cx("header")},e.ptm("header")),[m(e.$slots,"header")],16)):P("",!0),r.paginatorTop?(l(),v(s,{key:1,rows:o.d_rows,first:o.d_first,totalRecords:r.getTotalRecords,pageLinkSize:e.pageLinkSize,template:e.paginatorTemplate,rowsPerPageOptions:e.rowsPerPageOptions,currentPageReportTemplate:e.currentPageReportTemplate,class:S(e.cx("pcPaginator",{position:"top"})),alwaysShow:e.alwaysShowPaginator,onPage:t[0]||(t[0]=function(i){return r.onPage(i)}),unstyled:e.unstyled,pt:e.ptm("pcPaginator")},X({_:2},[e.$slots.paginatorcontainer?{name:"container",fn:u(function(i){return[m(e.$slots,"paginatorcontainer",{first:i.first,last:i.last,rows:i.rows,page:i.page,pageCount:i.pageCount,pageLinks:i.pageLinks,totalRecords:i.totalRecords,firstPageCallback:i.firstPageCallback,lastPageCallback:i.lastPageCallback,prevPageCallback:i.prevPageCallback,nextPageCallback:i.nextPageCallback,rowChangeCallback:i.rowChangeCallback,changePageCallback:i.changePageCallback})]}),key:"0"}:void 0,e.$slots.paginatorstart?{name:"start",fn:u(function(){return[m(e.$slots,"paginatorstart")]}),key:"1"}:void 0,e.$slots.paginatorend?{name:"end",fn:u(function(){return[m(e.$slots,"paginatorend")]}),key:"2"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):P("",!0),d("div",p({class:e.cx("content")},e.ptm("content")),[r.empty?(l(),h("div",p({key:1,class:e.cx("emptyMessage")},e.ptm("emptyMessage")),[m(e.$slots,"empty",{layout:e.layout},function(){return[L(k(r.emptyMessageText),1)]})],16)):(l(),h(T,{key:0},[e.$slots.list&&e.layout==="list"?m(e.$slots,"list",{key:0,items:r.items}):P("",!0),e.$slots.grid&&e.layout==="grid"?m(e.$slots,"grid",{key:1,items:r.items}):P("",!0)],64))],16),r.paginatorBottom?(l(),v(s,{key:2,rows:o.d_rows,first:o.d_first,totalRecords:r.getTotalRecords,pageLinkSize:e.pageLinkSize,template:e.paginatorTemplate,rowsPerPageOptions:e.rowsPerPageOptions,currentPageReportTemplate:e.currentPageReportTemplate,class:S(e.cx("pcPaginator",{position:"bottom"})),alwaysShow:e.alwaysShowPaginator,onPage:t[1]||(t[1]=function(i){return r.onPage(i)}),unstyled:e.unstyled,pt:e.ptm("pcPaginator")},X({_:2},[e.$slots.paginatorcontainer?{name:"container",fn:u(function(i){return[m(e.$slots,"paginatorcontainer",{first:i.first,last:i.last,rows:i.rows,page:i.page,pageCount:i.pageCount,pageLinks:i.pageLinks,totalRecords:i.totalRecords,firstPageCallback:i.firstPageCallback,lastPageCallback:i.lastPageCallback,prevPageCallback:i.prevPageCallback,nextPageCallback:i.nextPageCallback,rowChangeCallback:i.rowChangeCallback,changePageCallback:i.changePageCallback})]}),key:"0"}:void 0,e.$slots.paginatorstart?{name:"start",fn:u(function(){return[m(e.$slots,"paginatorstart")]}),key:"1"}:void 0,e.$slots.paginatorend?{name:"end",fn:u(function(){return[m(e.$slots,"paginatorend")]}),key:"2"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):P("",!0),e.$slots.footer?(l(),h("div",p({key:3,class:e.cx("footer")},e.ptm("footer")),[m(e.$slots,"footer")],16)):P("",!0)],16)}Q.render=Me;var Ne={root:"p-accordioncontent",content:"p-accordioncontent-content"},Oe=D.extend({name:"accordioncontent",classes:Ne}),Re={name:"BaseAccordionContent",extends:E,props:{as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:Oe,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},R={name:"AccordionContent",extends:Re,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},ariaLabelledby:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},attrs:function(){return p(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{id:this.id,role:"region","aria-labelledby":this.ariaLabelledby,"data-pc-name":"accordioncontent","data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function Fe(e,t,a,n,o,r){return e.asChild?m(e.$slots,"default",{key:1,class:S(e.cx("root")),active:r.$pcAccordionPanel.active,a11yAttrs:r.a11yAttrs}):(l(),v(se,p({key:0,name:"p-toggleable-content"},e.ptm("transition",r.ptParams)),{default:u(function(){return[!r.$pcAccordion.lazy||r.$pcAccordionPanel.active?K((l(),v(A(e.as),p({key:0,class:e.cx("root")},r.attrs),{default:u(function(){return[d("div",p({class:e.cx("content")},e.ptm("content",r.ptParams)),[m(e.$slots,"default")],16)]}),_:3},16,["class"])),[[oe,r.$pcAccordion.lazy?!0:r.$pcAccordionPanel.active]]):P("",!0)]}),_:3},16))}R.render=Fe;var Ue={root:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon"},je=D.extend({name:"accordionheader",classes:Ue}),We={name:"BaseAccordionHeader",extends:E,props:{as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:je,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},F={name:"AccordionHeader",extends:We,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){!this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowDownKey:function(t){var a=this.findNextPanel(this.findPanel(t.currentTarget));a?this.changeFocusedPanel(t,a):this.onHomeKey(t),t.preventDefault()},onArrowUpKey:function(t){var a=this.findPrevPanel(this.findPanel(t.currentTarget));a?this.changeFocusedPanel(t,a):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var a=this.findFirstPanel();this.changeFocusedPanel(t,a),t.preventDefault()},onEndKey:function(t){var a=this.findLastPanel();this.changeFocusedPanel(t,a),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findPanel:function(t){return t==null?void 0:t.closest('[data-pc-name="accordionpanel"]')},findHeader:function(t){return de(t,'[data-pc-name="accordionheader"]')},findNextPanel:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.nextElementSibling;return n?z(n,"data-p-disabled")?this.findNextPanel(n):this.findHeader(n):null},findPrevPanel:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.previousElementSibling;return n?z(n,"data-p-disabled")?this.findPrevPanel(n):this.findHeader(n):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(t,a){le(this.findHeader(a))}},computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},ariaControls:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},attrs:function(){return p(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":"accordionheader","data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return G({active:this.$pcAccordionPanel.active})}},components:{ChevronUpIcon:q,ChevronDownIcon:Se},directives:{ripple:ye}};function Xe(e,t,a,n,o,r){var s=ce("ripple");return e.asChild?m(e.$slots,"default",{key:1,class:S(e.cx("root")),active:r.$pcAccordionPanel.active,a11yAttrs:r.a11yAttrs,onClick:r.onClick}):K((l(),v(A(e.as),p({key:0,"data-p":r.dataP,class:e.cx("root"),onClick:r.onClick},r.attrs),{default:u(function(){return[m(e.$slots,"default",{active:r.$pcAccordionPanel.active}),m(e.$slots,"toggleicon",{active:r.$pcAccordionPanel.active,class:S(e.cx("toggleicon"))},function(){return[r.$pcAccordionPanel.active?(l(),v(A(r.$pcAccordion.$slots.collapseicon?r.$pcAccordion.$slots.collapseicon:r.$pcAccordion.collapseIcon?"span":"ChevronUpIcon"),p({key:0,class:[r.$pcAccordion.collapseIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",r.ptParams)),null,16,["class"])):(l(),v(A(r.$pcAccordion.$slots.expandicon?r.$pcAccordion.$slots.expandicon:r.$pcAccordion.expandIcon?"span":"ChevronDownIcon"),p({key:1,class:[r.$pcAccordion.expandIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",r.ptParams)),null,16,["class"]))]})]}),_:3},16,["data-p","class","onClick"])),[[s]])}F.render=Xe;var Ye={root:function(t){var a=t.instance,n=t.props;return["p-accordionpanel",{"p-accordionpanel-active":a.active,"p-disabled":n.disabled}]}},Ge=D.extend({name:"accordionpanel",classes:Ye}),qe={name:"BaseAccordionPanel",extends:E,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:Ge,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},U={name:"AccordionPanel",extends:qe,inheritAttrs:!1,inject:["$pcAccordion"],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return p(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{"data-pc-name":"accordionpanel","data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function Qe(e,t,a,n,o,r){return e.asChild?m(e.$slots,"default",{key:1,class:S(e.cx("root")),active:r.active,a11yAttrs:r.a11yAttrs}):(l(),v(A(e.as),p({key:0,class:e.cx("root")},r.attrs),{default:u(function(){return[m(e.$slots,"default")]}),_:3},16,["class"]))}U.render=Qe;var Je=O`
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
`,Ze={root:"p-accordion p-component"},_e=D.extend({name:"accordion",style:Je,classes:Ze}),et={name:"BaseAccordion",extends:E,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},activeIndex:{type:[Number,Array],default:null}},style:_e,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},J={name:"Accordion",extends:et,inheritAttrs:!1,emits:["update:value","update:activeIndex","tab-open","tab-close","tab-click"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t},activeIndex:{immediate:!0,handler:function(t){this.hasAccordionTab&&(this.d_value=this.multiple?t==null?void 0:t.map(String):t==null?void 0:t.toString())}}},methods:{isItemActive:function(t){var a;return this.multiple?(a=this.d_value)===null||a===void 0?void 0:a.includes(t):this.d_value===t},updateValue:function(t){var a,n=this.isItemActive(t);this.multiple?n?this.d_value=this.d_value.filter(function(o){return o!==t}):this.d_value?this.d_value.push(t):this.d_value=[t]:this.d_value=n?null:t,this.$emit("update:value",this.d_value),this.$emit("update:activeIndex",this.multiple?(a=this.d_value)===null||a===void 0?void 0:a.map(Number):Number(this.d_value)),this.$emit(n?"tab-close":"tab-open",{originalEvent:void 0,index:Number(t)})},isAccordionTab:function(t){return t.type.name==="AccordionTab"},getTabProp:function(t,a){return t.props?t.props[a]:void 0},getKey:function(t,a){return this.getTabProp(t,"header")||a},getHeaderPT:function(t,a){var n=this;return{root:p({onClick:function(r){return n.onTabClick(r,a)}},this.getTabProp(t,"headerProps"),this.getTabPT(t,"header",a)),toggleicon:p(this.getTabProp(t,"headeractionprops"),this.getTabPT(t,"headeraction",a))}},getContentPT:function(t,a){return{root:p(this.getTabProp(t,"contentProps"),this.getTabPT(t,"toggleablecontent",a)),transition:this.getTabPT(t,"transition",a),content:this.getTabPT(t,"content",a)}},getTabPT:function(t,a,n){var o=this.tabs.length,r={props:t.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:n,count:o,first:n===0,last:n===o-1,active:this.isItemActive("".concat(n))}};return p(this.ptm("accordiontab.".concat(a),r),this.ptmo(this.getTabProp(t,"pt"),a,r))},onTabClick:function(t,a){this.$emit("tab-click",{originalEvent:t,index:a})}},computed:{tabs:function(){var t=this;return this.$slots.default().reduce(function(a,n){return t.isAccordionTab(n)?a.push(n):n.children&&n.children instanceof Array&&n.children.forEach(function(o){t.isAccordionTab(o)&&a.push(o)}),a},[])},hasAccordionTab:function(){return this.tabs.length}},components:{AccordionPanel:U,AccordionHeader:F,AccordionContent:R,ChevronUpIcon:q,ChevronRightIcon:Ae}};function tt(e,t,a,n,o,r){var s=V("AccordionHeader"),i=V("AccordionContent"),x=V("AccordionPanel");return l(),h("div",p({class:e.cx("root")},e.ptmi("root")),[r.hasAccordionTab?(l(!0),h(T,{key:0},C(r.tabs,function(f,y){return l(),v(x,{key:r.getKey(f,y),value:"".concat(y),pt:{root:r.getTabPT(f,"root",y)},disabled:r.getTabProp(f,"disabled")},{default:u(function(){return[g(s,{class:S(r.getTabProp(f,"headerClass")),pt:r.getHeaderPT(f,y)},{toggleicon:u(function($){return[$.active?(l(),v(A(e.$slots.collapseicon?e.$slots.collapseicon:e.collapseIcon?"span":"ChevronDownIcon"),p({key:0,class:[e.collapseIcon,$.class],"aria-hidden":"true",ref_for:!0},r.getTabPT(f,"headericon",y)),null,16,["class"])):(l(),v(A(e.$slots.expandicon?e.$slots.expandicon:e.expandIcon?"span":"ChevronUpIcon"),p({key:1,class:[e.expandIcon,$.class],"aria-hidden":"true",ref_for:!0},r.getTabPT(f,"headericon",y)),null,16,["class"]))]}),default:u(function(){return[f.children&&f.children.headericon?(l(),v(A(f.children.headericon),{key:0,isTabActive:r.isItemActive("".concat(y)),active:r.isItemActive("".concat(y)),index:y},null,8,["isTabActive","active","index"])):P("",!0),f.props&&f.props.header?(l(),h("span",p({key:1,ref_for:!0},r.getTabPT(f,"headertitle",y)),k(f.props.header),17)):P("",!0),f.children&&f.children.header?(l(),v(A(f.children.header),{key:2})):P("",!0)]}),_:2},1032,["class","pt"]),g(i,{pt:r.getContentPT(f,y)},{default:u(function(){return[(l(),v(A(f)))]}),_:2},1032,["pt"])]}),_:2},1032,["value","pt","disabled"])}),128)):m(e.$slots,"default",{key:1})],16)}J.render=tt;var at=O`
    .p-slider {
        position: relative;
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:focus-visible {
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        inset-block-start: 0;
        inset-inline-start: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        inset-block-start: 50%;
        margin-block-start: calc(-1 * calc(dt('slider.handle.height') / 2));
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
    }

    .p-slider-vertical {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-handle {
        inset-inline-start: 50%;
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
        margin-block-end: calc(-1 * calc(dt('slider.handle.height') / 2));
    }

    .p-slider-vertical .p-slider-range {
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
    }
`,rt={handle:{position:"absolute"},range:{position:"absolute"}},nt={root:function(t){var a=t.instance,n=t.props;return["p-slider p-component",{"p-disabled":n.disabled,"p-invalid":a.$invalid,"p-slider-horizontal":n.orientation==="horizontal","p-slider-vertical":n.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},it=D.extend({name:"slider",style:at,classes:nt,inlineStyles:rt}),ot={name:"BaseSlider",extends:$e,props:{min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:it,provide:function(){return{$pcSlider:this,$parentInstance:this}}};function I(e){"@babel/helpers - typeof";return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(e)}function st(e,t,a){return(t=dt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function dt(e){var t=lt(e,"string");return I(t)=="symbol"?t:t+""}function lt(e,t){if(I(e)!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var n=a.call(e,t);if(I(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ct(e){return ft(e)||ht(e)||pt(e)||ut()}function ut(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pt(e,t){if(e){if(typeof e=="string")return N(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?N(e,t):void 0}}function ht(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ft(e){if(Array.isArray(e))return N(e)}function N(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,n=Array(t);a<t;a++)n[a]=e[a];return n}var Z={name:"Slider",extends:ot,inheritAttrs:!1,emits:["change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var t=this.$el.getBoundingClientRect();this.initX=t.left+ue(),this.initY=t.top+pe(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(t){var a,n=t.touches?t.touches[0].pageX:t.pageX,o=t.touches?t.touches[0].pageY:t.pageY;this.orientation==="horizontal"?he(this.$el)?a=(this.initX+this.barWidth-n)*100/this.barWidth:a=(n-this.initX)*100/this.barWidth:a=(this.initY+this.barHeight-o)*100/this.barHeight;var r=(this.max-this.min)*(a/100)+this.min;if(this.step){var s=this.range?this.value[this.handleIndex]:this.value,i=r-s;i<0?r=s+Math.ceil(r/this.step-s/this.step)*this.step:i>0&&(r=s+Math.floor(r/this.step-s/this.step)*this.step)}else r=Math.floor(r);this.updateModel(t,r)},updateModel:function(t,a){var n=Math.round(a*100)/100,o;this.range?(o=this.value?ct(this.value):[],this.handleIndex==0?(n<this.min?n=this.min:n>=this.max&&(n=this.max),o[0]=n):(n>this.max?n=this.max:n<=this.min&&(n=this.min),o[1]=n)):(n<this.min?n=this.min:n>this.max&&(n=this.max),o=n),this.writeValue(o,t),this.$emit("change",o)},onDragStart:function(t,a){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=a,t.currentTarget.focus())},onDrag:function(t){this.dragging&&this.setValue(t)},onDragEnd:function(t){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:t,value:this.value}))},onBarClick:function(t){this.disabled||z(t.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(t))},onMouseDown:function(t,a){this.bindDragListeners(),this.onDragStart(t,a)},onKeyDown:function(t,a){switch(this.handleIndex=a,t.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(t,a),t.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(t,a),t.preventDefault();break;case"PageDown":this.decrementValue(t,a,!0),t.preventDefault();break;case"PageUp":this.incrementValue(t,a,!0),t.preventDefault();break;case"Home":this.updateModel(t,this.min),t.preventDefault();break;case"End":this.updateModel(t,this.max),t.preventDefault();break}},onBlur:function(t,a){var n,o;(n=(o=this.formField).onBlur)===null||n===void 0||n.call(o,t)},decrementValue:function(t,a){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,o;this.range?this.step?o=this.value[a]-this.step:o=this.value[a]-1:this.step?o=this.value-this.step:!this.step&&n?o=this.value-10:o=this.value-1,this.updateModel(t,o),t.preventDefault()},incrementValue:function(t,a){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,o;this.range?this.step?o=this.value[a]+this.step:o=this.value[a]+1:this.step?o=this.value+this.step:!this.step&&n?o=this.value+10:o=this.value+1,this.updateModel(t,o),t.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)},rangeStyle:function(){if(this.range){var t=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,a=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{"inset-inline-start":a+"%",width:t+"%"}:{bottom:a+"%",height:t+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{"inset-inline-start":this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},rangeStartHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}},computed:{value:function(){var t;if(this.range){var a,n,o,r;return[(a=(n=this.d_value)===null||n===void 0?void 0:n[0])!==null&&a!==void 0?a:this.min,(o=(r=this.d_value)===null||r===void 0?void 0:r[1])!==null&&o!==void 0?o:this.max]}return(t=this.d_value)!==null&&t!==void 0?t:this.min},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]!==void 0?this.value[0]<this.min?0:(this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2&&this.value[1]!==void 0?this.value[1]>this.max?100:(this.value[1]-this.min)*100/(this.max-this.min):100},dataP:function(){return G(st({},this.orientation,this.orientation))}}},gt=["data-p"],mt=["data-p"],vt=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],bt=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],yt=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"];function wt(e,t,a,n,o,r){return l(),h("div",p({class:e.cx("root"),onClick:t[18]||(t[18]=function(){return r.onBarClick&&r.onBarClick.apply(r,arguments)})},e.ptmi("root"),{"data-p-sliding":!1,"data-p":r.dataP}),[d("span",p({class:e.cx("range"),style:[e.sx("range"),r.rangeStyle()]},e.ptm("range"),{"data-p":r.dataP}),null,16,mt),e.range?P("",!0):(l(),h("span",p({key:0,class:e.cx("handle"),style:[e.sx("handle"),r.handleStyle()],onTouchstartPassive:t[0]||(t[0]=function(s){return r.onDragStart(s)}),onTouchmovePassive:t[1]||(t[1]=function(s){return r.onDrag(s)}),onTouchend:t[2]||(t[2]=function(s){return r.onDragEnd(s)}),onMousedown:t[3]||(t[3]=function(s){return r.onMouseDown(s)}),onKeydown:t[4]||(t[4]=function(s){return r.onKeyDown(s)}),onBlur:t[5]||(t[5]=function(s){return r.onBlur(s)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("handle"),{"data-p":r.dataP}),null,16,vt)),e.range?(l(),h("span",p({key:1,class:e.cx("handle"),style:[e.sx("handle"),r.rangeStartHandleStyle()],onTouchstartPassive:t[6]||(t[6]=function(s){return r.onDragStart(s,0)}),onTouchmovePassive:t[7]||(t[7]=function(s){return r.onDrag(s)}),onTouchend:t[8]||(t[8]=function(s){return r.onDragEnd(s)}),onMousedown:t[9]||(t[9]=function(s){return r.onMouseDown(s,0)}),onKeydown:t[10]||(t[10]=function(s){return r.onKeyDown(s,0)}),onBlur:t[11]||(t[11]=function(s){return r.onBlur(s,0)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[0]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("startHandler"),{"data-p":r.dataP}),null,16,bt)):P("",!0),e.range?(l(),h("span",p({key:2,class:e.cx("handle"),style:[e.sx("handle"),r.rangeEndHandleStyle()],onTouchstartPassive:t[12]||(t[12]=function(s){return r.onDragStart(s,1)}),onTouchmovePassive:t[13]||(t[13]=function(s){return r.onDrag(s)}),onTouchend:t[14]||(t[14]=function(s){return r.onDragEnd(s)}),onMousedown:t[15]||(t[15]=function(s){return r.onMouseDown(s,1)}),onKeydown:t[16]||(t[16]=function(s){return r.onKeyDown(s,1)}),onBlur:t[17]||(t[17]=function(s){return r.onBlur(s,1)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[1]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("endHandler"),{"data-p":r.dataP}),null,16,yt)):P("",!0)],16,gt)}Z.render=wt;const Pt={class:"container grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 pb-16 items-start"},kt={class:"col-span-1 bg-white p-2 shadow-sm rounded h-full overflow-hidden lg:static hidden lg:block"},At={class:"divide-gray-300 divide-y space-y-4 relative"},St={class:"relative"},$t=["for"],Tt={class:"ml-auto text-gray-600 text-sm"},Ct=["for"],xt={class:"ml-auto text-gray-600 text-sm"},Dt={class:"mt-4 p-4 flex items-center"},Lt={class:"flex items-center gap-2"},It={key:0,class:"color-selector"},Et=["name","id"],Bt=["for"],Vt={key:1,class:"size-selector"},Kt=["name","value","id"],Ht=["for"],zt={class:"col-span-3"},Mt={class:"mb-4 flex items-center"},Nt={class:"flex gap-2 ml-auto"},Ot={class:"sr-only"},Rt={class:"flex flex-col"},Ft={class:"md:w-40 relative"},Ut=["src","alt"],jt={class:"flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"},Wt={class:"flex flex-row md:flex-col justify-between items-start gap-2"},Xt={class:"font-medium text-surface-500 dark:text-surface-400 text-sm"},Yt={class:"text-lg font-medium mt-2"},Gt={class:"flex flex-col md:items-end gap-8"},qt={class:"text-xl font-semibold"},Qt={class:"flex flex-row-reverse md:flex-row gap-2"},Jt={class:"grid grid-cols-4 gap-4"},Aa={__name:"Shop",props:{products:Object,categories:Object,brands:Object,attributes:Object},setup(e){B("default");const t=B([{label:"Default sorting",value:"default"},{label:"Sort by popularity",value:"popularity"},{label:"Sort by average rating",value:"rating"},{label:"Sort by latest",value:"latest"},{label:"Sort by price: low to high",value:"low"},{label:"Sort by price: high to low",value:"high"}]),a=B("grid"),n=B(["list","grid"]),o=fe({categories:[],brands:[],attributes:{},price:[0,1e5],sort:"default",page:1}),r=s=>{o.page=s.page+1};return ge(()=>({...o}),s=>{ve.get(route("shop"),{categories:s.categories,brands:s.brands,attributes:s.attributes,price:s.price,sort:s.sort,page:s.page},{preserveScroll:!0,preserveState:!0,replace:!0})},{deep:!0}),(s,i)=>{const x=F,f=Te,y=R,$=U,_=Z,ee=J,te=ke,ae=Pe,j=we,re=Q;return l(),v(Ce,null,{default:u(()=>[d("div",Pt,[d("div",kt,[d("div",At,[d("div",St,[i[11]||(i[11]=d("div",{class:"lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer"},null,-1)),i[12]||(i[12]=d("h3",{class:"text-xl text-gray-800 mb-3 uppercase font-medium"}," Filter By ",-1)),g(ee,{value:["0"],multiple:""},{default:u(()=>[g($,{value:"0"},{default:u(()=>[g(x,null,{default:u(()=>i[7]||(i[7]=[L("Categories")])),_:1,__:[7]}),g(y,null,{default:u(()=>[(l(!0),h(T,null,C(e.categories,(c,w)=>(l(),h("div",{class:"flex items-center",key:w},[g(f,{modelValue:o.categories,"onUpdate:modelValue":i[0]||(i[0]=b=>o.categories=b),inputId:`category-${c.id}`,value:c.id,name:"category"},null,8,["modelValue","inputId","value"]),d("label",{for:c.title,class:"text-gray-600 ml-3 cursor-pointer capitalize"},k(c.title),9,$t),d("div",Tt,k(c.products_count),1)]))),128))]),_:1})]),_:1}),e.brands.length>0?(l(),v($,{key:0,value:"1"},{default:u(()=>[g(x,null,{default:u(()=>i[8]||(i[8]=[L("Brand")])),_:1,__:[8]}),g(y,null,{default:u(()=>[(l(!0),h(T,null,C(e.brands,(c,w)=>(l(),h("div",{class:"flex items-center",key:w},[g(f,{modelValue:o.brands,"onUpdate:modelValue":i[1]||(i[1]=b=>o.brands=b),inputId:`brand-${c.id}`,value:c.id,name:"brand"},null,8,["modelValue","inputId","value"]),d("label",{for:c.title,class:"text-gray-600 ml-3 cursor-pointer capitalize"},k(c.title),9,Ct),d("div",xt," ("+k(c.products_count)+") ",1)]))),128))]),_:1})]),_:1})):P("",!0),g($,{value:"2"},{default:u(()=>[g(x,null,{default:u(()=>i[9]||(i[9]=[L("Price")])),_:1,__:[9]}),g(y,null,{default:u(()=>[d("div",Dt,[K(d("input",{"onUpdate:modelValue":i[2]||(i[2]=c=>o.price[0]=c),type:"text",minlength:"1",class:"w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded",placeholder:"Min"},null,512),[[Y,o.price[0]]]),i[10]||(i[10]=d("span",{class:"mx-3 text-gray-500"}," - ",-1)),K(d("input",{"onUpdate:modelValue":i[3]||(i[3]=c=>o.price[1]=c),type:"text",class:"w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded",placeholder:"Max"},null,512),[[Y,o.price[1]]])]),g(_,{modelValue:o.price,"onUpdate:modelValue":i[4]||(i[4]=c=>o.price=c),range:"",class:"w-full"},null,8,["modelValue"])]),_:1})]),_:1}),(l(!0),h(T,null,C(e.attributes,(c,w)=>(l(),v($,{key:w,value:w},{default:u(()=>[g(x,null,{default:u(()=>[L(k(c.display_name),1)]),_:2},1024),g(y,null,{default:u(()=>[d("div",Lt,[(l(!0),h(T,null,C(c.values,b=>(l(),h("div",{key:b.id},[c.name==="color"?(l(),h("div",It,[d("input",{type:"radio",name:"attribute-color-"+c.id,class:"hidden",id:"color-"+b.value},null,8,Et),d("label",{for:"color-"+b.value,style:me({backgroundColor:b.value}),class:"text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"},null,12,Bt)])):(l(),h("div",Vt,[d("input",{type:"checkbox",name:"attribute-"+c.id,value:b.id,class:"hidden peer",id:"attribute-"+c.id+"-value-"+b.id},null,8,Kt),d("label",{for:"attribute-"+c.id+"-value-"+b.id,class:"text-xs border border-gray-200 rounded-sm p-2 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 peer-checked:ring-2 ring-primary-300"},k(b.value),9,Ht)]))]))),128))])]),_:2},1024)]),_:2},1032,["value"]))),128))]),_:1})])])]),d("div",zt,[e.products.data&&e.products.data.length?(l(),v(re,{key:0,lazy:"",loading:!e.products.data,value:e.products.data,layout:a.value,paginator:!0,rows:e.products.per_page,totalRecords:e.products.total,first:(o.page-1)*e.products.per_page,onPage:r},{header:u(()=>[d("div",Mt,[g(te,{modelValue:o.sort,"onUpdate:modelValue":i[5]||(i[5]=c=>o.sort=c),options:t.value,"option-label":"label","option-value":"value",placeholder:"Default sorting",class:"w-44 text-sm text-gray-600 shadow-sm",checkmark:"",highlightOnSelect:!1},null,8,["modelValue","options"]),d("div",Nt,[g(ae,{modelValue:a.value,"onUpdate:modelValue":i[6]||(i[6]=c=>a.value=c),options:n.value,allowEmpty:!1},{option:u(({option:c})=>[d("span",Ot,k(c),1),d("i",{class:S(["p-1",[c==="list"?"pi pi-bars":"pi pi-table"]])},null,2)]),_:1},8,["modelValue","options"])])])]),list:u(c=>[d("div",Rt,[(l(!0),h(T,null,C(c.items,(w,b)=>{var W;return l(),h("div",{key:b},[d("div",{class:S(["flex flex-col sm:flex-row sm:items-center p-6 gap-4",{"border-t border-surface-200 dark:border-surface-700":b!==0}])},[d("div",Ft,[d("img",{class:"block xl:block mx-auto rounded w-full",src:`/${w.thumbnail}`,alt:w.title},null,8,Ut)]),d("div",jt,[d("div",Wt,[d("div",null,[d("span",Xt,k(((W=w.category)==null?void 0:W.title)||"Uncategorized"),1),d("div",Yt,k(w.title),1)]),i[13]||(i[13]=d("div",{class:"bg-surface-100 p-1",style:{"border-radius":"30px"}},[d("div",{class:"bg-surface-0 flex items-center gap-2 justify-center py-1 px-2",style:{"border-radius":"30px","box-shadow":`0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                              0px 1px 2px 0px rgba(0, 0, 0, 0.06)`}},[d("span",{class:"text-surface-900 font-medium text-sm"},"5"),d("i",{class:"pi pi-star-fill text-yellow-500"})])],-1))]),d("div",Gt,[d("span",qt,"$"+k(w.price),1),d("div",Qt,[g(j,{icon:"pi pi-heart",outlined:""}),g(j,{icon:"pi pi-shopping-cart",label:"Buy Now",disabled:w.inventoryStatus==="OUTOFSTOCK",class:"flex-auto md:flex-initial whitespace-nowrap"},null,8,["disabled"])])])])],2)])}),128))])]),grid:u(c=>[d("div",Jt,[(l(!0),h(T,null,C(c.items,(w,b)=>(l(),v(xe,{key:b,product:w},null,8,["product"]))),128))])]),_:1},8,["loading","value","layout","rows","totalRecords","first"])):P("",!0)])])]),_:1})}}};export{Aa as default};
