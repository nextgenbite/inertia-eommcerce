import{T as Pe}from"./index-BPRFKjFC.js";import{s as je}from"./index-DOlIh_04.js";import{a as ge,s as Ae}from"./index-6-ok8yhX.js";import{s as Fe}from"./index-n2GB4d98.js";import{s as De}from"./index-ByuFMyH_.js";import{s as Ve}from"./index-DNIu-c0r.js";import{m as me,B as ve,p as $e,a0 as Be,s as Z,Q as Y,E as _,M as O,O as ze,o as d,f as h,b as f,i as R,I as u,F as K,c as g,n as k,L as x,w as I,g as S,e as re,d as F,t as L,U as oe,l as m,a as v,R as j,a1 as He,a2 as Ue,a3 as ie,A as Re,a4 as We,G as qe,a5 as Ze,a6 as Ge,a7 as G,a8 as Qe,a9 as Je,V as Xe,r as H,aa as Ye,k as _e,T as et,$ as tt,ab as nt,u as T}from"./app-Dh8szHK3.js";import{Z as Q,s as rt,a as ot}from"./index-Ce9f-3M6.js";import{C as lt}from"./index-DNfLPAdh.js";import{s as ke}from"./index-8ZGhiJ3I.js";import{s as it}from"./index-BFrgsLQl.js";import{O as at}from"./index-D0rtx4e8.js";import{s as Se,R as we}from"./index-BT92uTGn.js";import{c as ae}from"./index-Be1fzYNM.js";import{s as st}from"./index-DBxa-NAO.js";import{s as dt,a as ct}from"./index-Cu3rGjYN.js";import{s as Ce,a as ut}from"./index-Bgu8At9p.js";import{s as ft}from"./index-8Aus6rlV.js";import{s as pt}from"./index-DI3dG3I0.js";import{s as ht,a as yt}from"./index-DOXpOdoP.js";import"./index-DAxvJZYr.js";import"./index-B0H_Rm_Y.js";import"./index-teBJk6bl.js";import"./index-BzDxdxb4.js";import"./index-C-T7s70H.js";import"./index-B-klDz7s.js";import"./index-V7LuKUv1.js";import"./index-DJoUM3gn.js";var bt=me`
    .p-tree {
        background: dt('tree.background');
        color: dt('tree.color');
        padding: dt('tree.padding');
    }

    .p-tree-root-children,
    .p-tree-node-children {
        display: flex;
        list-style-type: none;
        flex-direction: column;
        margin: 0;
        gap: dt('tree.gap');
    }

    .p-tree-root-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
    }

    .p-tree-node-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
        padding-inline-start: dt('tree.indent');
    }

    .p-tree-node {
        padding: 0;
        outline: 0 none;
    }

    .p-tree-node-content {
        border-radius: dt('tree.node.border.radius');
        padding: dt('tree.node.padding');
        display: flex;
        align-items: center;
        outline-color: transparent;
        color: dt('tree.node.color');
        gap: dt('tree.node.gap');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
    }

    .p-tree-node:focus-visible > .p-tree-node-content {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover .p-tree-node-icon {
        color: dt('tree.node.icon.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected {
        background: dt('tree.node.selected.background');
        color: dt('tree.node.selected.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button {
        color: inherit;
    }

    .p-tree-node-toggle-button {
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        width: dt('tree.node.toggle.button.size');
        height: dt('tree.node.toggle.button.size');
        color: dt('tree.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('tree.node.toggle.button.border.radius');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            border-color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
        outline-color: transparent;
        padding: 0;
    }

    .p-tree-node-toggle-button:enabled:hover {
        background: dt('tree.node.toggle.button.hover.background');
        color: dt('tree.node.toggle.button.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button:hover {
        background: dt('tree.node.toggle.button.selected.hover.background');
        color: dt('tree.node.toggle.button.selected.hover.color');
    }

    .p-tree-root {
        overflow: auto;
    }

    .p-tree-node-selectable {
        cursor: pointer;
        user-select: none;
    }

    .p-tree-node-leaf > .p-tree-node-content .p-tree-node-toggle-button {
        visibility: hidden;
    }

    .p-tree-node-icon {
        color: dt('tree.node.icon.color');
        transition: color dt('tree.transition.duration');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-icon {
        color: dt('tree.node.icon.selected.color');
    }

    .p-tree-filter {
        margin: dt('tree.filter.margin');
    }

    .p-tree-filter-input {
        width: 100%;
    }

    .p-tree-loading {
        position: relative;
        height: 100%;
    }

    .p-tree-loading-icon {
        font-size: dt('tree.loading.icon.size');
        width: dt('tree.loading.icon.size');
        height: dt('tree.loading.icon.size');
    }

    .p-tree .p-tree-mask {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-tree-flex-scrollable {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;
    }

    .p-tree-flex-scrollable .p-tree-root {
        flex: 1;
    }
`,gt={root:function(t){var n=t.props;return["p-tree p-component",{"p-tree-selectable":n.selectionMode!=null,"p-tree-loading":n.loading,"p-tree-flex-scrollable":n.scrollHeight==="flex"}]},mask:"p-tree-mask p-overlay-mask",loadingIcon:"p-tree-loading-icon",pcFilterContainer:"p-tree-filter",pcFilterInput:"p-tree-filter-input",wrapper:"p-tree-root",rootChildren:"p-tree-root-children",node:function(t){var n=t.instance;return["p-tree-node",{"p-tree-node-leaf":n.leaf}]},nodeContent:function(t){var n=t.instance;return["p-tree-node-content",n.node.styleClass,{"p-tree-node-selectable":n.selectable,"p-tree-node-selected":n.checkboxMode&&n.$parentInstance.highlightOnSelect?n.checked:n.selected}]},nodeToggleButton:"p-tree-node-toggle-button",nodeToggleIcon:"p-tree-node-toggle-icon",nodeCheckbox:"p-tree-node-checkbox",nodeIcon:"p-tree-node-icon",nodeLabel:"p-tree-node-label",nodeChildren:"p-tree-node-children"},mt=ve.extend({name:"tree",style:bt,classes:gt}),vt={name:"BaseTree",extends:Se,props:{value:{type:null,default:null},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},metaKeySelection:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:"mask"},filter:{type:Boolean,default:!1},filterBy:{type:[String,Function],default:"label"},filterMode:{type:String,default:"lenient"},filterPlaceholder:{type:String,default:null},filterLocale:{type:String,default:void 0},highlightOnSelect:{type:Boolean,default:!1},scrollHeight:{type:String,default:null},level:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:mt,provide:function(){return{$pcTree:this,$parentInstance:this}}};function D(e){"@babel/helpers - typeof";return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(e)}function se(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Oe(e))||t){n&&(e=n);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(i){throw i},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,s=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var i=n.next();return s=i.done,i},e:function(i){c=!0,o=i},f:function(){try{s||n.return==null||n.return()}finally{if(c)throw o}}}}function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,r)}return n}function ce(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?de(Object(n),!0).forEach(function(r){kt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function kt(e,t,n){return(t=St(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function St(e){var t=wt(e,"string");return D(t)=="symbol"?t:t+""}function wt(e,t){if(D(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function A(e){return Tt(e)||Ot(e)||Oe(e)||Ct()}function Ct(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Oe(e,t){if(e){if(typeof e=="string")return ee(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ee(e,t):void 0}}function Ot(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Tt(e){if(Array.isArray(e))return ee(e)}function ee(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Te={name:"TreeNode",hostName:"Tree",extends:Se,emits:["node-toggle","node-click","checkbox-change"],props:{node:{type:null,default:null},expandedKeys:{type:null,default:null},loadingMode:{type:String,default:"mask"},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},templates:{type:null,default:null},level:{type:Number,default:null},index:null},nodeTouched:!1,toggleClicked:!1,mounted:function(){this.setAllNodesTabIndexes()},methods:{toggle:function(){this.$emit("node-toggle",this.node),this.toggleClicked=!0},label:function(t){return typeof t.label=="function"?t.label():t.label},onChildNodeToggle:function(t){this.$emit("node-toggle",t)},getPTOptions:function(t){return this.ptm(t,{context:{node:this.node,index:this.index,expanded:this.expanded,selected:this.selected,checked:this.checked,partialChecked:this.partialChecked,leaf:this.leaf}})},onClick:function(t){if(this.toggleClicked||Z(t.target,'[data-pc-section="nodetogglebutton"]')||Z(t.target.parentElement,'[data-pc-section="nodetogglebutton"]')){this.toggleClicked=!1;return}this.isCheckboxSelectionMode()?this.node.selectable!=!1&&this.toggleCheckbox():this.$emit("node-click",{originalEvent:t,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1},onChildNodeClick:function(t){this.$emit("node-click",t)},onTouchEnd:function(){this.nodeTouched=!0},onKeyDown:function(t){if(this.isSameNode(t))switch(t.code){case"Tab":this.onTabKey(t);break;case"ArrowDown":this.onArrowDown(t);break;case"ArrowUp":this.onArrowUp(t);break;case"ArrowRight":this.onArrowRight(t);break;case"ArrowLeft":this.onArrowLeft(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowDown:function(t){var n=t.target.getAttribute("data-pc-section")==="nodetogglebutton"?t.target.closest('[role="treeitem"]'):t.target,r=n.children[1];if(r)this.focusRowChange(n,r.children[0]);else if(n.nextElementSibling)this.focusRowChange(n,n.nextElementSibling);else{var l=this.findNextSiblingOfAncestor(n);l&&this.focusRowChange(n,l)}t.preventDefault()},onArrowUp:function(t){var n=t.target;if(n.previousElementSibling)this.focusRowChange(n,n.previousElementSibling,this.findLastVisibleDescendant(n.previousElementSibling));else{var r=this.getParentNodeElement(n);r&&this.focusRowChange(n,r)}t.preventDefault()},onArrowRight:function(t){var n=this;this.leaf||this.expanded||(t.currentTarget.tabIndex=-1,this.$emit("node-toggle",this.node),this.$nextTick(function(){n.onArrowDown(t)}))},onArrowLeft:function(t){var n=Y(t.currentTarget,'[data-pc-section="nodetogglebutton"]');if(this.level===0&&!this.expanded)return!1;if(this.expanded&&!this.leaf)return n.click(),!1;var r=this.findBeforeClickableNode(t.currentTarget);r&&this.focusRowChange(t.currentTarget,r)},onEnterKey:function(t){this.setTabIndexForSelectionMode(t,this.nodeTouched),this.onClick(t),t.preventDefault()},onTabKey:function(){this.setAllNodesTabIndexes()},setAllNodesTabIndexes:function(){var t=_(this.$refs.currentNode.closest('[data-pc-section="rootchildren"]'),'[role="treeitem"]'),n=A(t).some(function(l){return l.getAttribute("aria-selected")==="true"||l.getAttribute("aria-checked")==="true"});if(A(t).forEach(function(l){l.tabIndex=-1}),n){var r=A(t).filter(function(l){return l.getAttribute("aria-selected")==="true"||l.getAttribute("aria-checked")==="true"});r[0].tabIndex=0;return}A(t)[0].tabIndex=0},setTabIndexForSelectionMode:function(t,n){if(this.selectionMode!==null){var r=A(_(this.$refs.currentNode.parentElement,'[role="treeitem"]'));t.currentTarget.tabIndex=n===!1?-1:0,r.every(function(l){return l.tabIndex===-1})&&(r[0].tabIndex=0)}},focusRowChange:function(t,n,r){t.tabIndex="-1",n.tabIndex="0",this.focusNode(r||n)},findBeforeClickableNode:function(t){var n=t.closest("ul").closest("li");if(n){var r=Y(n,"button");return r&&r.style.visibility!=="hidden"?n:this.findBeforeClickableNode(t.previousElementSibling)}return null},toggleCheckbox:function(){var t=this.selectionKeys?ce({},this.selectionKeys):{},n=!this.checked;this.propagateDown(this.node,n,t),this.$emit("checkbox-change",{node:this.node,check:n,selectionKeys:t})},propagateDown:function(t,n,r){if(n&&t.selectable!=!1?r[t.key]={checked:!0,partialChecked:!1}:delete r[t.key],t.children&&t.children.length){var l=se(t.children),o;try{for(l.s();!(o=l.n()).done;){var s=o.value;this.propagateDown(s,n,r)}}catch(c){l.e(c)}finally{l.f()}}},propagateUp:function(t){var n=t.check,r=ce({},t.selectionKeys),l=0,o=!1,s=se(this.node.children),c;try{for(s.s();!(c=s.n()).done;){var a=c.value;r[a.key]&&r[a.key].checked?l++:r[a.key]&&r[a.key].partialChecked&&(o=!0)}}catch(i){s.e(i)}finally{s.f()}n&&l===this.node.children.length?r[this.node.key]={checked:!0,partialChecked:!1}:(n||delete r[this.node.key],o||l>0&&l!==this.node.children.length?r[this.node.key]={checked:!1,partialChecked:!0}:delete r[this.node.key]),this.$emit("checkbox-change",{node:t.node,check:t.check,selectionKeys:r})},onChildCheckboxChange:function(t){this.$emit("checkbox-change",t)},findNextSiblingOfAncestor:function(t){var n=this.getParentNodeElement(t);return n?n.nextElementSibling?n.nextElementSibling:this.findNextSiblingOfAncestor(n):null},findLastVisibleDescendant:function(t){var n=t.children[1];if(n){var r=n.children[n.children.length-1];return this.findLastVisibleDescendant(r)}else return t},getParentNodeElement:function(t){var n=t.parentElement.parentElement;return Z(n,"role")==="treeitem"?n:null},focusNode:function(t){t.focus()},isCheckboxSelectionMode:function(){return this.selectionMode==="checkbox"},isSameNode:function(t){return t.currentTarget&&(t.currentTarget.isSameNode(t.target)||t.currentTarget.isSameNode(t.target.closest('[role="treeitem"]')))}},computed:{hasChildren:function(){return this.node.children&&this.node.children.length>0},expanded:function(){return this.expandedKeys&&this.expandedKeys[this.node.key]===!0},leaf:function(){return this.node.leaf===!1?!1:!(this.node.children&&this.node.children.length)},selectable:function(){return this.node.selectable===!1?!1:this.selectionMode!=null},selected:function(){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.node.key]===!0:!1},checkboxMode:function(){return this.selectionMode==="checkbox"&&this.node.selectable!==!1},checked:function(){return this.selectionKeys?this.selectionKeys[this.node.key]&&this.selectionKeys[this.node.key].checked:!1},partialChecked:function(){return this.selectionKeys?this.selectionKeys[this.node.key]&&this.selectionKeys[this.node.key].partialChecked:!1},ariaChecked:function(){return this.selectionMode==="single"||this.selectionMode==="multiple"?this.selected:void 0},ariaSelected:function(){return this.checkboxMode?this.checked:void 0}},components:{Checkbox:ht,ChevronDownIcon:ke,ChevronRightIcon:pt,CheckIcon:ft,MinusIcon:yt,SpinnerIcon:ge},directives:{ripple:we}},It=["aria-label","aria-selected","aria-expanded","aria-setsize","aria-posinset","aria-level","aria-checked","tabindex"],Kt=["data-p-selected","data-p-selectable"],xt=["data-p-leaf"];function Et(e,t,n,r,l,o){var s=O("SpinnerIcon"),c=O("Checkbox"),a=O("TreeNode",!0),i=ze("ripple");return d(),h("li",u({ref:"currentNode",class:e.cx("node"),role:"treeitem","aria-label":o.label(n.node),"aria-selected":o.ariaSelected,"aria-expanded":o.expanded,"aria-setsize":n.node.children?n.node.children.length:0,"aria-posinset":n.index+1,"aria-level":n.level,"aria-checked":o.ariaChecked,tabindex:n.index===0?0:-1,onKeydown:t[4]||(t[4]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)})},o.getPTOptions("node")),[f("div",u({class:e.cx("nodeContent"),onClick:t[2]||(t[2]=function(){return o.onClick&&o.onClick.apply(o,arguments)}),onTouchend:t[3]||(t[3]=function(){return o.onTouchEnd&&o.onTouchEnd.apply(o,arguments)}),style:n.node.style},o.getPTOptions("nodeContent"),{"data-p-selected":o.checkboxMode?o.checked:o.selected,"data-p-selectable":o.selectable}),[R((d(),h("button",u({type:"button",class:e.cx("nodeToggleButton"),onClick:t[0]||(t[0]=function(){return o.toggle&&o.toggle.apply(o,arguments)}),tabindex:"-1","data-p-leaf":o.leaf},o.getPTOptions("nodeToggleButton")),[n.node.loading&&n.loadingMode==="icon"?(d(),h(K,{key:0},[n.templates.nodetoggleicon||n.templates.nodetogglericon?(d(),g(x(n.templates.nodetoggleicon||n.templates.nodetogglericon),{key:0,node:n.node,expanded:o.expanded,class:k(e.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):(d(),g(s,u({key:1,spin:"",class:e.cx("nodeToggleIcon")},o.getPTOptions("nodeToggleIcon")),null,16,["class"]))],64)):(d(),h(K,{key:1},[n.templates.nodetoggleicon||n.templates.togglericon?(d(),g(x(n.templates.nodetoggleicon||n.templates.togglericon),{key:0,node:n.node,expanded:o.expanded,class:k(e.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):o.expanded?(d(),g(x(n.node.expandedIcon?"span":"ChevronDownIcon"),u({key:1,class:e.cx("nodeToggleIcon")},o.getPTOptions("nodeToggleIcon")),null,16,["class"])):(d(),g(x(n.node.collapsedIcon?"span":"ChevronRightIcon"),u({key:2,class:e.cx("nodeToggleIcon")},o.getPTOptions("nodeToggleIcon")),null,16,["class"]))],64))],16,xt)),[[i]]),o.checkboxMode?(d(),g(c,{key:0,defaultValue:o.checked,binary:!0,indeterminate:o.partialChecked,class:k(e.cx("nodeCheckbox")),tabindex:-1,unstyled:e.unstyled,pt:o.getPTOptions("pcNodeCheckbox"),"data-p-partialchecked":o.partialChecked},{icon:I(function(b){return[n.templates.checkboxicon?(d(),g(x(n.templates.checkboxicon),{key:0,checked:b.checked,partialChecked:o.partialChecked,class:k(b.class)},null,8,["checked","partialChecked","class"])):S("",!0)]}),_:1},8,["defaultValue","indeterminate","class","unstyled","pt","data-p-partialchecked"])):S("",!0),n.templates.nodeicon?(d(),g(x(n.templates.nodeicon),u({key:1,node:n.node,class:[e.cx("nodeIcon")]},o.getPTOptions("nodeIcon")),null,16,["node","class"])):(d(),h("span",u({key:2,class:[e.cx("nodeIcon"),n.node.icon]},o.getPTOptions("nodeIcon")),null,16)),f("span",u({class:e.cx("nodeLabel")},o.getPTOptions("nodeLabel"),{onKeydown:t[1]||(t[1]=re(function(){},["stop"]))}),[n.templates[n.node.type]||n.templates.default?(d(),g(x(n.templates[n.node.type]||n.templates.default),{key:0,node:n.node,expanded:o.expanded,selected:o.checkboxMode?o.checked:o.selected},null,8,["node","expanded","selected"])):(d(),h(K,{key:1},[F(L(o.label(n.node)),1)],64))],16)],16,Kt),o.hasChildren&&o.expanded?(d(),h("ul",u({key:0,class:e.cx("nodeChildren"),role:"group"},e.ptm("nodeChildren")),[(d(!0),h(K,null,oe(n.node.children,function(b){return d(),g(a,{key:b.key,node:b,templates:n.templates,level:n.level+1,loadingMode:n.loadingMode,expandedKeys:n.expandedKeys,onNodeToggle:o.onChildNodeToggle,onNodeClick:o.onChildNodeClick,selectionMode:n.selectionMode,selectionKeys:n.selectionKeys,onCheckboxChange:o.propagateUp,unstyled:e.unstyled,pt:e.pt},null,8,["node","templates","level","loadingMode","expandedKeys","onNodeToggle","onNodeClick","selectionMode","selectionKeys","onCheckboxChange","unstyled","pt"])}),128))],16)):S("",!0)],16,It)}Te.render=Et;function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function J(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Ie(e))||t){n&&(e=n);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(i){throw i},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,s=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var i=n.next();return s=i.done,i},e:function(i){c=!0,o=i},f:function(){try{s||n.return==null||n.return()}finally{if(c)throw o}}}}function Lt(e){return Pt(e)||Mt(e)||Ie(e)||Nt()}function Nt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ie(e,t){if(e){if(typeof e=="string")return te(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?te(e,t):void 0}}function Mt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Pt(e){if(Array.isArray(e))return te(e)}function te(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ue(Object(n),!0).forEach(function(r){jt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function jt(e,t,n){return(t=At(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function At(e){var t=Ft(e,"string");return V(t)=="symbol"?t:t+""}function Ft(e,t){if(V(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(V(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ke={name:"Tree",extends:vt,inheritAttrs:!1,emits:["node-expand","node-collapse","update:expandedKeys","update:selectionKeys","node-select","node-unselect","filter"],data:function(){return{d_expandedKeys:this.expandedKeys||{},filterValue:null}},watch:{expandedKeys:function(t){this.d_expandedKeys=t}},methods:{onNodeToggle:function(t){var n=t.key;this.d_expandedKeys[n]?(delete this.d_expandedKeys[n],this.$emit("node-collapse",t)):(this.d_expandedKeys[n]=!0,this.$emit("node-expand",t)),this.d_expandedKeys=N({},this.d_expandedKeys),this.$emit("update:expandedKeys",this.d_expandedKeys)},onNodeClick:function(t){if(this.selectionMode!=null&&t.node.selectable!==!1){var n=t.nodeTouched?!1:this.metaKeySelection,r=n?this.handleSelectionWithMetaKey(t):this.handleSelectionWithoutMetaKey(t);this.$emit("update:selectionKeys",r)}},onCheckboxChange:function(t){this.$emit("update:selectionKeys",t.selectionKeys),t.check?this.$emit("node-select",t.node):this.$emit("node-unselect",t.node)},handleSelectionWithMetaKey:function(t){var n=t.originalEvent,r=t.node,l=n.metaKey||n.ctrlKey,o=this.isNodeSelected(r),s;return o&&l?(this.isSingleSelectionMode()?s={}:(s=N({},this.selectionKeys),delete s[r.key]),this.$emit("node-unselect",r)):(this.isSingleSelectionMode()?s={}:this.isMultipleSelectionMode()&&(s=l?this.selectionKeys?N({},this.selectionKeys):{}:{}),s[r.key]=!0,this.$emit("node-select",r)),s},handleSelectionWithoutMetaKey:function(t){var n=t.node,r=this.isNodeSelected(n),l;return this.isSingleSelectionMode()?r?(l={},this.$emit("node-unselect",n)):(l={},l[n.key]=!0,this.$emit("node-select",n)):r?(l=N({},this.selectionKeys),delete l[n.key],this.$emit("node-unselect",n)):(l=this.selectionKeys?N({},this.selectionKeys):{},l[n.key]=!0,this.$emit("node-select",n)),l},isSingleSelectionMode:function(){return this.selectionMode==="single"},isMultipleSelectionMode:function(){return this.selectionMode==="multiple"},isNodeSelected:function(t){return this.selectionMode&&this.selectionKeys?this.selectionKeys[t.key]===!0:!1},isChecked:function(t){return this.selectionKeys?this.selectionKeys[t.key]&&this.selectionKeys[t.key].checked:!1},isNodeLeaf:function(t){return t.leaf===!1?!1:!(t.children&&t.children.length)},onFilterKeyup:function(t){(t.code==="Enter"||t.code==="NumpadEnter")&&t.preventDefault(),this.$emit("filter",{originalEvent:t,value:t.target.value})},findFilteredNodes:function(t,n){if(t){var r=!1;if(t.children){var l=Lt(t.children);t.children=[];var o=J(l),s;try{for(o.s();!(s=o.n()).done;){var c=s.value,a=N({},c);this.isFilterMatched(a,n)&&(r=!0,t.children.push(a))}}catch(i){o.e(i)}finally{o.f()}}if(r)return!0}},isFilterMatched:function(t,n){var r=n.searchFields,l=n.filterText,o=n.strict,s=!1,c=J(r),a;try{for(c.s();!(a=c.n()).done;){var i=a.value,b=String($e(t,i)).toLocaleLowerCase(this.filterLocale);b.indexOf(l)>-1&&(s=!0)}}catch(M){c.e(M)}finally{c.f()}return(!s||o&&!this.isNodeLeaf(t))&&(s=this.findFilteredNodes(t,{searchFields:r,filterText:l,strict:o})||s),s}},computed:{filteredValue:function(){var t=[],n=Be(this.filterBy)?[this.filterBy]:this.filterBy.split(","),r=this.filterValue.trim().toLocaleLowerCase(this.filterLocale),l=this.filterMode==="strict",o=J(this.value),s;try{for(o.s();!(s=o.n()).done;){var c=s.value,a=N({},c),i={searchFields:n,filterText:r,strict:l};(l&&(this.findFilteredNodes(a,i)||this.isFilterMatched(a,i))||!l&&(this.isFilterMatched(a,i)||this.findFilteredNodes(a,i)))&&t.push(a)}}catch(b){o.e(b)}finally{o.f()}return t},valueToRender:function(){return this.filterValue&&this.filterValue.trim().length>0?this.filteredValue:this.value},containerDataP:function(){return ae({loading:this.loading,scrollable:this.scrollHeight==="flex"})},wrapperDataP:function(){return ae({scrollable:this.scrollHeight==="flex"})}},components:{TreeNode:Te,InputText:Ce,InputIcon:dt,IconField:ct,SearchIcon:st,SpinnerIcon:ge}};function $(e){"@babel/helpers - typeof";return $=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$(e)}function fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,r)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?fe(Object(n),!0).forEach(function(r){Dt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fe(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Dt(e,t,n){return(t=Vt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Vt(e){var t=$t(e,"string");return $(t)=="symbol"?t:t+""}function $t(e,t){if($(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if($(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Bt=["data-p"],zt=["data-p"],Ht=["aria-labelledby","aria-label"];function Ut(e,t,n,r,l,o){var s=O("SpinnerIcon"),c=O("InputText"),a=O("SearchIcon"),i=O("InputIcon"),b=O("IconField"),M=O("TreeNode");return d(),h("div",u({class:e.cx("root"),"data-p":o.containerDataP},e.ptmi("root")),[e.loading&&e.loadingMode==="mask"?(d(),h("div",u({key:0,class:e.cx("mask")},e.ptm("mask")),[m(e.$slots,"loadingicon",{class:k(e.cx("loadingIcon"))},function(){return[e.loadingIcon?(d(),h("i",u({key:0,class:[e.cx("loadingIcon"),"pi-spin",e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(d(),g(s,u({key:1,spin:"",class:e.cx("loadingIcon")},e.ptm("loadingIcon")),null,16,["class"]))]})],16)):S("",!0),e.filter?(d(),g(b,{key:1,unstyled:e.unstyled,pt:pe(pe({},e.ptm("pcFilter")),e.ptm("pcFilterContainer")),class:k(e.cx("pcFilterContainer"))},{default:I(function(){return[v(c,{modelValue:l.filterValue,"onUpdate:modelValue":t[0]||(t[0]=function(E){return l.filterValue=E}),autocomplete:"off",class:k(e.cx("pcFilterInput")),placeholder:e.filterPlaceholder,unstyled:e.unstyled,onKeyup:o.onFilterKeyup,pt:e.ptm("pcFilterInput")},null,8,["modelValue","class","placeholder","unstyled","onKeyup","pt"]),v(i,{unstyled:e.unstyled,pt:e.ptm("pcFilterIconContainer")},{default:I(function(){return[m(e.$slots,e.$slots.filtericon?"filtericon":"searchicon",{class:k(e.cx("filterIcon"))},function(){return[v(a,u({class:e.cx("filterIcon")},e.ptm("filterIcon")),null,16,["class"])]})]}),_:3},8,["unstyled","pt"])]}),_:3},8,["unstyled","pt","class"])):S("",!0),f("div",u({class:e.cx("wrapper"),style:{maxHeight:e.scrollHeight},"data-p":o.wrapperDataP},e.ptm("wrapper")),[m(e.$slots,"header",{value:e.value,expandedKeys:e.expandedKeys,selectionKeys:e.selectionKeys}),f("ul",u({class:e.cx("rootChildren"),role:"tree","aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptm("rootChildren")),[(d(!0),h(K,null,oe(o.valueToRender,function(E,y){return d(),g(M,{key:E.key,node:E,templates:e.$slots,level:e.level+1,index:y,expandedKeys:l.d_expandedKeys,onNodeToggle:o.onNodeToggle,onNodeClick:o.onNodeClick,selectionMode:e.selectionMode,selectionKeys:e.selectionKeys,onCheckboxChange:o.onCheckboxChange,loadingMode:e.loadingMode,unstyled:e.unstyled,pt:e.pt},null,8,["node","templates","level","index","expandedKeys","onNodeToggle","onNodeClick","selectionMode","selectionKeys","onCheckboxChange","loadingMode","unstyled","pt"])}),128))],16,Ht),m(e.$slots,"footer",{value:e.value,expandedKeys:e.expandedKeys,selectionKeys:e.selectionKeys})],16,zt)],16,Bt)}Ke.render=Ut;var Rt=me`
    .p-treeselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('treeselect.background');
        border: 1px solid dt('treeselect.border.color');
        transition:
            background dt('treeselect.transition.duration'),
            color dt('treeselect.transition.duration'),
            border-color dt('treeselect.transition.duration'),
            outline-color dt('treeselect.transition.duration'),
            box-shadow dt('treeselect.transition.duration');
        border-radius: dt('treeselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('treeselect.shadow');
    }

    .p-treeselect:not(.p-disabled):hover {
        border-color: dt('treeselect.hover.border.color');
    }

    .p-treeselect:not(.p-disabled).p-focus {
        border-color: dt('treeselect.focus.border.color');
        box-shadow: dt('treeselect.focus.ring.shadow');
        outline: dt('treeselect.focus.ring.width') dt('treeselect.focus.ring.style') dt('treeselect.focus.ring.color');
        outline-offset: dt('treeselect.focus.ring.offset');
    }

    .p-treeselect.p-variant-filled {
        background: dt('treeselect.filled.background');
    }

    .p-treeselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('treeselect.filled.hover.background');
    }

    .p-treeselect.p-variant-filled.p-focus {
        background: dt('treeselect.filled.focus.background');
    }

    .p-treeselect.p-invalid {
        border-color: dt('treeselect.invalid.border.color');
    }

    .p-treeselect.p-disabled {
        opacity: 1;
        background: dt('treeselect.disabled.background');
    }

    .p-treeselect-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        color: dt('treeselect.clear.icon.color');
        inset-inline-end: dt('treeselect.dropdown.width');
    }

    .p-treeselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('treeselect.dropdown.color');
        width: dt('treeselect.dropdown.width');
        border-start-end-radius: dt('border.radius.md');
        border-end-end-radius: dt('border.radius.md');
    }

    .p-treeselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-treeselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('treeselect.padding.y') / 2);
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('treeselect.padding.y') dt('treeselect.padding.x');
        color: dt('treeselect.color');
    }

    .p-treeselect-label.p-placeholder {
        color: dt('treeselect.placeholder.color');
    }

    .p-treeselect.p-invalid .p-treeselect-label.p-placeholder {
        color: dt('treeselect.invalid.placeholder.color');
    }

    .p-treeselect.p-disabled .p-treeselect-label {
        color: dt('treeselect.disabled.color');
    }

    .p-treeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-treeselect .p-treeselect-overlay {
        min-width: 100%;
    }

    .p-treeselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('treeselect.overlay.background');
        color: dt('treeselect.overlay.color');
        border: 1px solid dt('treeselect.overlay.border.color');
        border-radius: dt('treeselect.overlay.border.radius');
        box-shadow: dt('treeselect.overlay.shadow');
        overflow: hidden;
    }

    .p-treeselect-tree-container {
        overflow: auto;
    }

    .p-treeselect-empty-message {
        padding: dt('treeselect.empty.message.padding');
        background: transparent;
    }

    .p-treeselect-fluid {
        display: flex;
    }

    .p-treeselect-overlay .p-tree {
        padding: dt('treeselect.tree.padding');
    }

    .p-treeselect-overlay .p-tree-loading {
        min-height: 3rem;
    }

    .p-treeselect-label .p-chip {
        padding-block-start: calc(dt('treeselect.padding.y') / 2);
        padding-block-end: calc(dt('treeselect.padding.y') / 2);
        border-radius: dt('treeselect.chip.border.radius');
    }

    .p-treeselect-label:has(.p-chip) {
        padding: calc(dt('treeselect.padding.y') / 2) calc(dt('treeselect.padding.x') / 2);
    }

    .p-treeselect-sm .p-treeselect-label {
        font-size: dt('treeselect.sm.font.size');
        padding-block: dt('treeselect.sm.padding.y');
        padding-inline: dt('treeselect.sm.padding.x');
    }

    .p-treeselect-sm .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.sm.font.size');
        width: dt('treeselect.sm.font.size');
        height: dt('treeselect.sm.font.size');
    }

    .p-treeselect-lg .p-treeselect-label {
        font-size: dt('treeselect.lg.font.size');
        padding-block: dt('treeselect.lg.padding.y');
        padding-inline: dt('treeselect.lg.padding.x');
    }

    .p-treeselect-lg .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.lg.font.size');
        width: dt('treeselect.lg.font.size');
        height: dt('treeselect.lg.font.size');
    }
`,Wt={root:function(t){var n=t.props;return{position:n.appendTo==="self"?"relative":void 0}}},qt={root:function(t){var n=t.instance,r=t.props;return["p-treeselect p-component p-inputwrapper",{"p-treeselect-display-chip":r.display==="chip","p-disabled":r.disabled,"p-invalid":n.$invalid,"p-focus":n.focused,"p-variant-filled":n.$variant==="filled","p-inputwrapper-filled":n.$filled,"p-inputwrapper-focus":n.focused||n.overlayVisible,"p-treeselect-open":n.overlayVisible,"p-treeselect-fluid":n.$fluid,"p-treeselect-sm p-inputfield-sm":r.size==="small","p-treeselect-lg p-inputfield-lg":r.size==="large"}]},labelContainer:"p-treeselect-label-container",label:function(t){var n=t.instance,r=t.props;return["p-treeselect-label",{"p-placeholder":n.label===r.placeholder,"p-treeselect-label-empty":!r.placeholder&&n.emptyValue}]},clearIcon:"p-treeselect-clear-icon",chip:"p-treeselect-chip-item",pcChip:"p-treeselect-chip",dropdown:"p-treeselect-dropdown",dropdownIcon:"p-treeselect-dropdown-icon",panel:"p-treeselect-overlay p-component",treeContainer:"p-treeselect-tree-container",emptyMessage:"p-treeselect-empty-message"},Zt=ve.extend({name:"treeselect",style:Rt,classes:qt,inlineStyles:Wt}),Gt={name:"BaseTreeSelect",extends:ut,props:{options:Array,scrollHeight:{type:String,default:"20rem"},placeholder:{type:String,default:null},tabindex:{type:Number,default:null},selectionMode:{type:String,default:"single"},selectedItemsLabel:{type:String,default:null},maxSelectedLabels:{type:Number,default:null},appendTo:{type:[String,Object],default:"body"},emptyMessage:{type:String,default:null},display:{type:String,default:"comma"},metaKeySelection:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:"mask"},showClear:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},filter:{type:Boolean,default:!1},filterBy:{type:[String,Function],default:"label"},filterMode:{type:String,default:"lenient"},filterPlaceholder:{type:String,default:null},filterLocale:{type:String,default:void 0},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelClass:{type:[String,Object],default:null},panelProps:{type:null,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},expandedKeys:{type:null,default:null}},style:Zt,provide:function(){return{$pcTreeSelect:this,$parentInstance:this}}};function B(e){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(e)}function X(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=xe(e))||t){n&&(e=n);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(i){throw i},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,s=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var i=n.next();return s=i.done,i},e:function(i){c=!0,o=i},f:function(){try{s||n.return==null||n.return()}finally{if(c)throw o}}}}function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,r)}return n}function ye(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?he(Object(n),!0).forEach(function(r){Qt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Qt(e,t,n){return(t=Jt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Jt(e){var t=Xt(e,"string");return B(t)=="symbol"?t:t+""}function Xt(e,t){if(B(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(B(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Yt(e){return tn(e)||en(e)||xe(e)||_t()}function _t(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xe(e,t){if(e){if(typeof e=="string")return ne(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ne(e,t):void 0}}function en(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function tn(e){if(Array.isArray(e))return ne(e)}function ne(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Ee={name:"TreeSelect",extends:Gt,inheritAttrs:!1,emits:["before-show","before-hide","change","show","hide","node-select","node-unselect","node-expand","node-collapse","focus","blur","update:expandedKeys"],inject:{$pcFluid:{default:null}},data:function(){return{focused:!1,overlayVisible:!1,d_expandedKeys:this.expandedKeys||{}}},watch:{modelValue:{handler:function(){this.selfChange||this.updateTreeState(),this.selfChange=!1},immediate:!0},options:function(){this.updateTreeState()},expandedKeys:function(t){this.d_expandedKeys=t}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,selfChange:!1,selfClick:!1,beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(Q.clear(this.overlay),this.overlay=null)},mounted:function(){this.updateTreeState()},methods:{show:function(){this.$emit("before-show"),this.overlayVisible=!0},hide:function(){this.$emit("before-hide"),this.overlayVisible=!1,this.$refs.focusInput.focus()},onFocus:function(t){this.focused=!0,this.$emit("focus",t)},onBlur:function(t){var n,r;this.focused=!1,this.$emit("blur",t),(n=(r=this.formField).onBlur)===null||n===void 0||n.call(r)},onClick:function(t){this.disabled||t.target.tagName==="INPUT"||t.target.getAttribute("data-pc-section")==="clearicon"||t.target.closest('[data-pc-section="clearicon"]')||(!this.overlay||!this.overlay.contains(t.target))&&(this.overlayVisible?this.hide():this.show(),j(this.$refs.focusInput))},onClearClick:function(){this.onSelectionChange(null)},onSelectionChange:function(t){this.selfChange=!0,this.writeValue(t),this.$emit("change",t)},onNodeSelect:function(t){this.$emit("node-select",t),this.selectionMode==="single"&&this.hide()},onNodeUnselect:function(t){this.$emit("node-unselect",t)},onNodeToggle:function(t){this.d_expandedKeys=t,this.$emit("update:expandedKeys",this.d_expandedKeys)},getSelectedItemsLabel:function(){var t=/{(.*?)}/,n=this.selectedItemsLabel||this.$primevue.config.locale.selectionMessage;return t.test(n)?n.replace(n.match(t)[0],Object.keys(this.d_value).length+""):n},onFirstHiddenFocus:function(t){var n=t.relatedTarget===this.$refs.focusInput?He(this.overlay,':not([data-p-hidden-focusable="true"])'):this.$refs.focusInput;j(n)},onLastHiddenFocus:function(t){var n=t.relatedTarget===this.$refs.focusInput?Ue(this.overlay,':not([data-p-hidden-focusable="true"])'):this.$refs.focusInput;j(n)},onKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"Space":case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Escape":this.onEscapeKey(t);break;case"Tab":this.onTabKey(t);break}},onArrowDownKey:function(t){var n=this;this.overlayVisible||(this.show(),this.$nextTick(function(){var r=_(n.$refs.tree.$el,'[data-pc-section="treeitem"]'),l=Yt(r).find(function(o){return o.getAttribute("tabindex")==="0"});j(l)}),t.preventDefault())},onEnterKey:function(t){this.overlayVisible?this.hide():this.onArrowDownKey(t),t.preventDefault()},onEscapeKey:function(t){this.overlayVisible&&(this.hide(),t.preventDefault())},onTabKey:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;n||this.overlayVisible&&this.hasFocusableElements()&&(j(this.$refs.firstHiddenFocusableElementOnOverlay),t.preventDefault())},hasFocusableElements:function(){return ie(this.overlay,':not([data-p-hidden-focusable="true"])').length>0},onOverlayEnter:function(t){Q.set("overlay",t,this.$primevue.config.zIndex.overlay),Re(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.focus(),this.$attrSelector&&t.setAttribute(this.$attrSelector,"")},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.scrollValueInView(),this.$emit("show")},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.overlay=null},onOverlayAfterLeave:function(t){Q.clear(t)},focus:function(){var t=ie(this.overlay);t&&t.length>0&&t[0].focus()},alignOverlay:function(){this.appendTo==="self"?We(this.overlay,this.$el):(this.overlay.style.minWidth=qe(this.$el)+"px",Ze(this.overlay,this.$el))},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){t.overlayVisible&&!t.selfClick&&t.isOutsideClicked(n)&&t.hide(),t.selfClick=!1},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new lt(this.$refs.container,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!Ge()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isOutsideClicked:function(t){return!(this.$el.isSameNode(t.target)||this.$el.contains(t.target)||this.overlay&&this.overlay.contains(t.target))},overlayRef:function(t){this.overlay=t},onOverlayClick:function(t){at.emit("overlay-click",{originalEvent:t,target:this.$el}),this.selfClick=!0},onOverlayKeydown:function(t){t.code==="Escape"&&this.hide()},fillNodeMap:function(t,n){var r,l=this;n[t.key]=t,(r=t.children)!==null&&r!==void 0&&r.length&&t.children.forEach(function(o){return l.fillNodeMap(o,n)})},isSelected:function(t,n){return this.selectionMode==="checkbox"?n[t.key]&&n[t.key].checked:n[t.key]},updateTreeState:function(){var t=ye({},this.d_value);t&&this.options&&this.updateTreeBranchState(null,null,t)},updateTreeBranchState:function(t,n,r){if(t){if(this.isSelected(t,r)&&(this.expandPath(n),delete r[t.key]),Object.keys(r).length&&t.children){var l=X(t.children),o;try{for(l.s();!(o=l.n()).done;){var s=o.value;n.push(t.key),this.updateTreeBranchState(s,n,r)}}catch(b){l.e(b)}finally{l.f()}}}else{var c=X(this.options),a;try{for(c.s();!(a=c.n()).done;){var i=a.value;this.updateTreeBranchState(i,[],r)}}catch(b){c.e(b)}finally{c.f()}}},expandPath:function(t){if(t.length>0){var n=X(t),r;try{for(n.s();!(r=n.n()).done;){var l=r.value;this.d_expandedKeys[l]=!0}}catch(o){n.e(o)}finally{n.f()}this.d_expandedKeys=ye({},this.d_expandedKeys),this.$emit("update:expandedKeys",this.d_expandedKeys)}},scrollValueInView:function(){if(this.overlay){var t=Y(this.overlay,'[data-p-selected="true"]');t&&t.scrollIntoView({block:"nearest",inline:"start"})}}},computed:{nodeMap:function(){var t,n=this,r={};return(t=this.options)===null||t===void 0||t.forEach(function(l){return n.fillNodeMap(l,r)}),r},selectedNodes:function(){var t=this,n=[];return this.d_value&&this.options&&Object.keys(this.d_value).forEach(function(r){var l=t.nodeMap[r];t.isSelected(l,t.d_value)&&n.push(l)}),n},label:function(){var t=this.selectedNodes,n;return t.length?G(this.maxSelectedLabels)&&t.length>this.maxSelectedLabels?n=this.getSelectedItemsLabel():n=t.map(function(r){return r.label}).join(", "):n=this.placeholder,n},chipSelectedItems:function(){return G(this.maxSelectedLabels)&&this.d_value&&Object.keys(this.d_value).length>this.maxSelectedLabels},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage},emptyValue:function(){return!this.$filled},emptyOptions:function(){return!this.options||this.options.length===0},listId:function(){return this.$id+"_list"},hasFluid:function(){return Qe(this.fluid)?!!this.$pcFluid:this.fluid},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&G(this.options)}},components:{TSTree:Ke,Chip:it,Portal:rt,ChevronDownIcon:ke,TimesIcon:ot},directives:{ripple:we}};function z(e){"@babel/helpers - typeof";return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},z(e)}function be(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,r)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?be(Object(n),!0).forEach(function(r){nn(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):be(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function nn(e,t,n){return(t=rn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rn(e){var t=on(e,"string");return z(t)=="symbol"?t:t+""}function on(e,t){if(z(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(z(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var ln=["id","disabled","tabindex","aria-labelledby","aria-label","aria-expanded","aria-controls"],an={key:0},sn=["aria-expanded"];function dn(e,t,n,r,l,o){var s=O("Chip"),c=O("TSTree"),a=O("Portal");return d(),h("div",u({ref:"container",class:e.cx("root"),style:e.sx("root"),onClick:t[10]||(t[10]=function(){return o.onClick&&o.onClick.apply(o,arguments)})},e.ptmi("root")),[f("div",u({class:"p-hidden-accessible"},e.ptm("hiddenInputContainer"),{"data-p-hidden-accessible":!0}),[f("input",u({ref:"focusInput",id:e.inputId,type:"text",role:"combobox",class:e.inputClass,style:e.inputStyle,readonly:"",disabled:e.disabled,tabindex:e.disabled?-1:e.tabindex,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-haspopup":"tree","aria-expanded":l.overlayVisible,"aria-controls":o.listId,onFocus:t[0]||(t[0]=function(i){return o.onFocus(i)}),onBlur:t[1]||(t[1]=function(i){return o.onBlur(i)}),onKeydown:t[2]||(t[2]=function(i){return o.onKeyDown(i)})},U(U({},e.inputProps),e.ptm("hiddenInput"))),null,16,ln)],16),f("div",u({class:e.cx("labelContainer")},e.ptm("labelContainer")),[f("div",u({class:e.cx("label")},e.ptm("label")),[m(e.$slots,"value",{value:o.selectedNodes,placeholder:e.placeholder},function(){return[e.display==="comma"?(d(),h(K,{key:0},[F(L(o.label||"empty"),1)],64)):e.display==="chip"?(d(),h(K,{key:1},[o.chipSelectedItems?(d(),h("span",an,L(o.label),1)):(d(),h(K,{key:1},[(d(!0),h(K,null,oe(o.selectedNodes,function(i){return d(),h("div",u({key:i.key,class:e.cx("chipItem"),ref_for:!0},e.ptm("chipItem")),[v(s,{class:k(e.cx("pcChip")),label:i.label,unstyled:e.unstyled,pt:e.ptm("pcChip")},null,8,["class","label","unstyled","pt"])],16)}),128)),o.emptyValue?(d(),h(K,{key:0},[F(L(e.placeholder||"empty"),1)],64)):S("",!0)],64))],64)):S("",!0)]})],16)],16),o.isClearIconVisible?m(e.$slots,"clearicon",{key:0,class:k(e.cx("clearIcon")),clearCallback:o.onClearClick},function(){return[(d(),g(x(e.clearIcon?"i":"TimesIcon"),u({ref:"clearIcon",class:[e.cx("clearIcon"),e.clearIcon],onClick:o.onClearClick},e.ptm("clearIcon"),{"data-pc-section":"clearicon"}),null,16,["class","onClick"]))]}):S("",!0),f("div",u({class:e.cx("dropdown"),role:"button","aria-haspopup":"tree","aria-expanded":l.overlayVisible},e.ptm("dropdown")),[m(e.$slots,e.$slots.dropdownicon?"dropdownicon":"triggericon",{class:k(e.cx("dropdownIcon"))},function(){return[(d(),g(x("ChevronDownIcon"),u({class:e.cx("dropdownIcon")},e.ptm("dropdownIcon")),null,16,["class"]))]})],16,sn),v(a,{appendTo:e.appendTo},{default:I(function(){return[v(Je,u({name:"p-connected-overlay",onEnter:o.onOverlayEnter,onAfterEnter:o.onOverlayAfterEnter,onLeave:o.onOverlayLeave,onAfterLeave:o.onOverlayAfterLeave},e.ptm("transition")),{default:I(function(){return[l.overlayVisible?(d(),h("div",u({key:0,ref:o.overlayRef,onClick:t[8]||(t[8]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),class:[e.cx("panel"),e.panelClass],onKeydown:t[9]||(t[9]=function(){return o.onOverlayKeydown&&o.onOverlayKeydown.apply(o,arguments)})},U(U({},e.panelProps),e.ptm("panel"))),[f("span",u({ref:"firstHiddenFocusableElementOnOverlay",role:"presentation",class:"p-hidden-accessible p-hidden-focusable",tabindex:0,onFocus:t[3]||(t[3]=function(){return o.onFirstHiddenFocus&&o.onFirstHiddenFocus.apply(o,arguments)})},e.ptm("hiddenFirstFocusableEl"),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),m(e.$slots,"header",{value:e.d_value,options:e.options}),f("div",u({class:e.cx("treeContainer"),style:{"max-height":e.scrollHeight}},e.ptm("treeContainer")),[v(c,{ref:"tree",id:o.listId,value:e.options,selectionMode:e.selectionMode,loading:e.loading,loadingIcon:e.loadingIcon,loadingMode:e.loadingMode,filter:e.filter,filterBy:e.filterBy,filterMode:e.filterMode,filterPlaceholder:e.filterPlaceholder,filterLocale:e.filterLocale,"onUpdate:selectionKeys":o.onSelectionChange,selectionKeys:e.d_value,expandedKeys:l.d_expandedKeys,"onUpdate:expandedKeys":o.onNodeToggle,metaKeySelection:e.metaKeySelection,onNodeExpand:t[4]||(t[4]=function(i){return e.$emit("node-expand",i)}),onNodeCollapse:t[5]||(t[5]=function(i){return e.$emit("node-collapse",i)}),onNodeSelect:o.onNodeSelect,onNodeUnselect:o.onNodeUnselect,onClick:t[6]||(t[6]=re(function(){},["stop"])),level:0,unstyled:e.unstyled,pt:e.ptm("pcTree")},Xe({_:2},[e.$slots.option?{name:"default",fn:I(function(i){return[m(e.$slots,"option",{node:i.node,expanded:i.expanded,selected:i.selected})]}),key:"0"}:void 0,e.$slots.itemtoggleicon?{name:"toggleicon",fn:I(function(i){return[m(e.$slots,"itemtoggleicon",{node:i.node,expanded:i.expanded,class:k(i.class)})]}),key:"1"}:e.$slots.itemtogglericon?{name:"togglericon",fn:I(function(i){return[m(e.$slots,"itemtogglericon",{node:i.node,expanded:i.expanded,class:k(i.class)})]}),key:"2"}:void 0,e.$slots.itemcheckboxicon?{name:"checkboxicon",fn:I(function(i){return[m(e.$slots,"itemcheckboxicon",{checked:i.checked,partialChecked:i.partialChecked,class:k(i.class)})]}),key:"3"}:void 0]),1032,["id","value","selectionMode","loading","loadingIcon","loadingMode","filter","filterBy","filterMode","filterPlaceholder","filterLocale","onUpdate:selectionKeys","selectionKeys","expandedKeys","onUpdate:expandedKeys","metaKeySelection","onNodeSelect","onNodeUnselect","unstyled","pt"]),o.emptyOptions&&!e.loading?(d(),h("div",u({key:0,class:e.cx("emptyMessage")},e.ptm("emptyMessage")),[m(e.$slots,"empty",{},function(){return[F(L(o.emptyMessageText),1)]})],16)):S("",!0)],16),m(e.$slots,"footer",{value:e.d_value,options:e.options}),f("span",u({ref:"lastHiddenFocusableElementOnOverlay",role:"presentation",class:"p-hidden-accessible p-hidden-focusable",tabindex:0,onFocus:t[7]||(t[7]=function(){return o.onLastHiddenFocus&&o.onLastHiddenFocus.apply(o,arguments)})},e.ptm("hiddenLastFocusableEl"),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16)):S("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])],16)}Ee.render=dn;const cn={class:"flex flex-col gap-4"},un={class:"flex flex-col gap-2"},fn={key:0,class:"text-red-500"},pn={class:"flex flex-col gap-2"},hn={class:"ql-formats"},yn={class:"ql-bold"},bn={class:"ql-italic"},gn={class:"ql-underline"},mn={class:"card flex flex-col items-center gap-6"},vn=["src"],kn={class:"flex flex-col gap-2"},Sn={key:0,class:"text-red-500"},wn={class:"flex justify-end gap-2"},Xn={__name:"Edit",props:{show:Boolean,title:String,data:Object},emits:["close"],setup(e,{emit:t}){const n=e,r=H([]),l=async()=>{try{const y=await nt.get("/api/categories");r.value=y.data}catch(y){console.error("Failed to fetch categories:",y)}};Ye(()=>{l()});const o=_e(()=>(r.value||[]).map((y,p)=>({key:`${y.id}`,label:y.title,data:{description:y.description,image:y.thumbnail,type:"Category",status:y.status},children:(y.sub_categories||[]).map((w,P)=>({key:`${y.id}-${w.id}`,label:w.title,data:{image:w.thumbnail,type:"Subcategory"}}))}))),s=H(null),c=t,a=H([{name:"Active",code:"1"},{name:"Deactive",code:"0"}]),i=et({title:"",thumbnail:null,description:"",status:!0}),b=(y,p)=>{const w=y.files[0];if(!w)return;i.thumbnail=w;const P=new FileReader;P.onload=W=>{s.value=W.target.result},P.readAsDataURL(w)},M=()=>{var y;i.put(route("categories.update",(y=n.data)==null?void 0:y.id),{preserveScroll:!0,onSuccess:()=>{c("close"),i.reset()},onError:()=>null,onFinish:()=>null})};tt(()=>{var y,p,w;n.show&&(i.errors={},i.title=(y=n.data)==null?void 0:y.name,i.description=(p=n.data)==null?void 0:p.description,i.status=(w=n.data)==null?void 0:w.status)});const E=H();return(y,p)=>{const w=Ce,P=Ee,W=Ve,Le=De,Ne=Fe,le=Ae,Me=je,q=Pe;return d(),g(Me,{visible:n.show,"onUpdate:visible":p[6]||(p[6]=C=>n.show=C),position:"top",modal:"",header:"Update "+n.title,style:{width:"30rem"},closable:!1},{default:I(()=>[F(L(E.value)+" ",1),f("form",{onSubmit:re(M,["prevent"])},[f("div",cn,[f("div",un,[p[7]||(p[7]=f("label",{for:"title"},"Title",-1)),v(w,{id:"title",modelValue:T(i).title,"onUpdate:modelValue":p[0]||(p[0]=C=>T(i).title=C),class:"flex-auto",autocomplete:"off",placeholder:"Title"},null,8,["modelValue"]),T(i).errors.title?(d(),h("small",fn,L(T(i).errors.title),1)):S("",!0)]),v(P,{filter:"",filterMode:"lenient",modelValue:E.value,"onUpdate:modelValue":p[1]||(p[1]=C=>E.value=C),options:o.value,placeholder:"Select Category",class:"w-full"},null,8,["modelValue","options"]),f("div",pn,[p[8]||(p[8]=f("label",{for:"title"},"Description",-1)),v(W,{modelValue:T(i).description,"onUpdate:modelValue":p[2]||(p[2]=C=>T(i).description=C),editorStyle:"height: 120px"},{toolbar:I(()=>[f("span",hn,[R(f("button",yn,null,512),[[q,"Bold",void 0,{bottom:!0}]]),R(f("button",bn,null,512),[[q,"Italic",void 0,{bottom:!0}]]),R(f("button",gn,null,512),[[q,"Underline",void 0,{bottom:!0}]])])]),_:1},8,["modelValue"])]),f("div",mn,[s.value?(d(),h("img",{key:0,src:s.value,alt:"Thumbnail",class:"shadow-md rounded-xl w-full sm:w-64"},null,8,vn)):S("",!0),v(Le,{mode:"basic",onSelect:p[3]||(p[3]=C=>b(C,y.input)),auto:"",customUpload:"",accept:"image/*",chooseLabel:"Select Thumbnail"})]),f("div",kn,[p[9]||(p[9]=f("label",{for:"status"},"Status",-1)),v(Ne,{modelValue:T(i).status,"onUpdate:modelValue":p[4]||(p[4]=C=>T(i).status=C),options:a.value,optionValue:"code",optionLabel:"name",placeholder:"Select"},null,8,["modelValue","options"]),T(i).errors.status?(d(),h("small",Sn,L(T(i).errors.status),1)):S("",!0)]),f("div",wn,[v(le,{type:"button",label:"Cancel",severity:"secondary",onClick:p[5]||(p[5]=C=>c("close"))}),v(le,{type:"submit",loading:T(i).processing,label:"Update"},null,8,["loading"])])])],32)]),_:1},8,["visible","header"])}}};export{Xn as default};
