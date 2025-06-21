import{c as S}from"./index-Be1fzYNM.js";import{h as k,B as O,a8 as m,Q as V,R as z,o as g,f as p,b as h,q as y,n as I,m as s,g as C,t as w,A as c,W as f,p as K,F as $,X as D,c as R,Y as x,w as E}from"./app-D7NVjfTE.js";import{R as B}from"./index-aUd7mdUX.js";import{s as L}from"./index-Dr0mNMEF.js";var j=k`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }
`,q={root:function(e){var o=e.instance,r=e.props;return["p-togglebutton p-component",{"p-togglebutton-checked":o.active,"p-invalid":o.$invalid,"p-togglebutton-sm p-inputfield-sm":r.size==="small","p-togglebutton-lg p-inputfield-lg":r.size==="large"}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},F=O.extend({name:"togglebutton",style:j,classes:q}),N={name:"BaseToggleButton",extends:L,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},iconPos:{type:String,default:"left"},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null}},style:F,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function b(t){"@babel/helpers - typeof";return b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(t)}function _(t,e,o){return(e=H(e))in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function H(t){var e=W(t,"string");return b(e)=="symbol"?e:e+""}function W(t,e){if(b(t)!="object"||!t)return t;var o=t[Symbol.toPrimitive];if(o!==void 0){var r=o.call(t,e);if(b(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var P={name:"ToggleButton",extends:N,inheritAttrs:!1,emits:["change"],methods:{getPTOptions:function(e){var o=e==="root"?this.ptmi:this.ptm;return o(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit("change",e))},onBlur:function(e){var o,r;(o=(r=this.formField).onBlur)===null||o===void 0||o.call(r,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return m(this.onLabel)&&m(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:" "},dataP:function(){return S(_({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:B}},Y=["tabindex","disabled","aria-pressed","aria-label","aria-labelledby","data-p-checked","data-p-disabled","data-p"],M=["data-p"];function Q(t,e,o,r,a,n){var i=V("ripple");return z((g(),p("button",s({type:"button",class:t.cx("root"),tabindex:t.tabindex,disabled:t.disabled,"aria-pressed":t.d_value,onClick:e[0]||(e[0]=function(){return n.onChange&&n.onChange.apply(n,arguments)}),onBlur:e[1]||(e[1]=function(){return n.onBlur&&n.onBlur.apply(n,arguments)})},n.getPTOptions("root"),{"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"data-p-checked":n.active,"data-p-disabled":t.disabled,"data-p":n.dataP}),[h("span",s({class:t.cx("content")},n.getPTOptions("content"),{"data-p":n.dataP}),[y(t.$slots,"default",{},function(){return[y(t.$slots,"icon",{value:t.d_value,class:I(t.cx("icon"))},function(){return[t.onIcon||t.offIcon?(g(),p("span",s({key:0,class:[t.cx("icon"),t.d_value?t.onIcon:t.offIcon]},n.getPTOptions("icon")),null,16)):C("",!0)]}),h("span",s({class:t.cx("label")},n.getPTOptions("label")),w(n.label),17)]})],16,M)],16,Y)),[[i]])}P.render=Q;var U=k`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }
`,X={root:function(e){var o=e.instance;return["p-selectbutton p-component",{"p-invalid":o.$invalid}]}},G=O.extend({name:"selectbutton",style:U,classes:X}),J={name:"BaseSelectButton",extends:L,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null}},style:G,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Z(t,e){var o=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=T(t))||e){o&&(t=o);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(d){throw d},f:a}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var n,i=!0,l=!1;return{s:function(){o=o.call(t)},n:function(){var d=o.next();return i=d.done,d},e:function(d){l=!0,n=d},f:function(){try{i||o.return==null||o.return()}finally{if(l)throw n}}}}function tt(t){return nt(t)||ot(t)||T(t)||et()}function et(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function T(t,e){if(t){if(typeof t=="string")return v(t,e);var o={}.toString.call(t).slice(8,-1);return o==="Object"&&t.constructor&&(o=t.constructor.name),o==="Map"||o==="Set"?Array.from(t):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?v(t,e):void 0}}function ot(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function nt(t){if(Array.isArray(t))return v(t)}function v(t,e){(e==null||e>t.length)&&(e=t.length);for(var o=0,r=Array(e);o<e;o++)r[o]=t[o];return r}var lt={name:"SelectButton",extends:J,inheritAttrs:!1,emits:["change"],methods:{getOptionLabel:function(e){return this.optionLabel?c(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?c(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?c(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?c(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var o=this.isSelected(e);return this.multiple?o&&this.d_value.length===1:o},onOptionSelect:function(e,o,r){var a=this;if(!(this.disabled||this.isOptionDisabled(o)||this.isOptionReadonly(o))){var n=this.isSelected(o),i=this.getOptionValue(o),l;if(this.multiple)if(n){if(l=this.d_value.filter(function(u){return!f(u,i,a.equalityKey)}),!this.allowEmpty&&l.length===0)return}else l=this.d_value?[].concat(tt(this.d_value),[i]):[i];else{if(n&&!this.allowEmpty)return;l=n?null:i}this.writeValue(l,e),this.$emit("change",{event:e,value:l})}},isSelected:function(e){var o=!1,r=this.getOptionValue(e);if(this.multiple){if(this.d_value){var a=Z(this.d_value),n;try{for(a.s();!(n=a.n()).done;){var i=n.value;if(f(i,r,this.equalityKey)){o=!0;break}}}catch(l){a.e(l)}finally{a.f()}}}else o=f(this.d_value,r,this.equalityKey);return o}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return S({invalid:this.$invalid})}},directives:{ripple:B},components:{ToggleButton:P}},rt=["aria-labelledby","data-p"];function it(t,e,o,r,a,n){var i=K("ToggleButton");return g(),p("div",s({class:t.cx("root"),role:"group","aria-labelledby":t.ariaLabelledby},t.ptmi("root"),{"data-p":n.dataP}),[(g(!0),p($,null,D(t.options,function(l,u){return g(),R(i,{key:n.getOptionRenderKey(l),modelValue:n.isSelected(l),onLabel:n.getOptionLabel(l),offLabel:n.getOptionLabel(l),disabled:t.disabled||n.isOptionDisabled(l),unstyled:t.unstyled,size:t.size,readonly:n.isOptionReadonly(l),onChange:function(A){return n.onOptionSelect(A,l,u)},pt:t.ptm("pcToggleButton")},x({_:2},[t.$slots.option?{name:"default",fn:E(function(){return[y(t.$slots,"option",{option:l,index:u},function(){return[h("span",s({ref_for:!0},t.ptm("pcToggleButton").label),w(n.getOptionLabel(l)),17)]})]}),key:"0"}:void 0]),1032,["modelValue","onLabel","offLabel","disabled","unstyled","size","readonly","onChange","pt"])}),128))],16,rt)}lt.render=it;export{lt as s};
