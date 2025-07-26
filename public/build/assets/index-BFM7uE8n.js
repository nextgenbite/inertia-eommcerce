import{m as X,B as K,a$ as Z,aD as N,aC as M,Q as et,M as it,o as P,f as B,l as L,b as st,F as D,U as q,I as R,g as x,a as nt}from"./app-BDCqqEeF.js";import{a as rt}from"./index-Cj-t2GAp.js";import{s as Q}from"./index-CB3zjCSn.js";var ot=X`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`,lt=`
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}

.p-virtualscroller .p-virtualscroller-loading {
    transform: none !important;
    min-height: 0;
    position: sticky;
    inset-block-start: 0;
    inset-inline-start: 0;
}
`,G=K.extend({name:"virtualscroller",css:lt,style:ot}),at={name:"BaseVirtualScroller",extends:Q,props:{id:{type:String,default:null},style:null,class:null,items:{type:Array,default:null},itemSize:{type:[Number,Array],default:0},scrollHeight:null,scrollWidth:null,orientation:{type:String,default:"vertical"},numToleratedItems:{type:Number,default:null},delay:{type:Number,default:0},resizeDelay:{type:Number,default:10},lazy:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loaderDisabled:{type:Boolean,default:!1},columns:{type:Array,default:null},loading:{type:Boolean,default:!1},showSpacer:{type:Boolean,default:!0},showLoader:{type:Boolean,default:!1},tabindex:{type:Number,default:0},inline:{type:Boolean,default:!1},step:{type:Number,default:0},appendOnly:{type:Boolean,default:!1},autoSize:{type:Boolean,default:!1}},style:G,provide:function(){return{$pcVirtualScroller:this,$parentInstance:this}},beforeMount:function(){var t;G.loadCSS({nonce:(t=this.$primevueConfig)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce})}};function F(e){"@babel/helpers - typeof";return F=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},F(e)}function J(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,n)}return i}function j(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?J(Object(i),!0).forEach(function(n){Y(e,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):J(Object(i)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))})}return e}function Y(e,t,i){return(t=ht(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function ht(e){var t=ut(e,"string");return F(t)=="symbol"?t:t+""}function ut(e,t){if(F(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var n=i.call(e,t);if(F(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var ct={name:"VirtualScroller",extends:at,inheritAttrs:!1,emits:["update:numToleratedItems","scroll","scroll-index-change","lazy-load"],data:function(){var t=this.isBoth();return{first:t?{rows:0,cols:0}:0,last:t?{rows:0,cols:0}:0,page:t?{rows:0,cols:0}:0,numItemsInViewport:t?{rows:0,cols:0}:0,lastScrollPos:t?{top:0,left:0}:0,d_numToleratedItems:this.numToleratedItems,d_loading:this.loading,loaderArr:[],spacerStyle:{},contentStyle:{}}},element:null,content:null,lastScrollPos:null,scrollTimeout:null,resizeTimeout:null,defaultWidth:0,defaultHeight:0,defaultContentWidth:0,defaultContentHeight:0,isRangeChanged:!1,lazyLoadState:{},resizeListener:null,resizeObserver:null,initialized:!1,watch:{numToleratedItems:function(t){this.d_numToleratedItems=t},loading:function(t,i){this.lazy&&t!==i&&t!==this.d_loading&&(this.d_loading=t)},items:{handler:function(t,i){(!i||i.length!==(t||[]).length)&&(this.init(),this.calculateAutoSize())},deep:!0},itemSize:function(){this.init(),this.calculateAutoSize()},orientation:function(){this.lastScrollPos=this.isBoth()?{top:0,left:0}:0},scrollHeight:function(){this.init(),this.calculateAutoSize()},scrollWidth:function(){this.init(),this.calculateAutoSize()}},mounted:function(){this.viewInit(),this.lastScrollPos=this.isBoth()?{top:0,left:0}:0,this.lazyLoadState=this.lazyLoadState||{}},updated:function(){!this.initialized&&this.viewInit()},unmounted:function(){this.unbindResizeListener(),this.initialized=!1},methods:{viewInit:function(){Z(this.element)&&(this.setContentEl(this.content),this.init(),this.calculateAutoSize(),this.bindResizeListener(),this.defaultWidth=N(this.element),this.defaultHeight=M(this.element),this.defaultContentWidth=N(this.content),this.defaultContentHeight=M(this.content),this.initialized=!0)},init:function(){this.disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize())},isVertical:function(){return this.orientation==="vertical"},isHorizontal:function(){return this.orientation==="horizontal"},isBoth:function(){return this.orientation==="both"},scrollTo:function(t){this.element&&this.element.scrollTo(t)},scrollToIndex:function(t){var i=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"auto",r=this.isBoth(),s=this.isHorizontal(),l=r?t.every(function(C){return C>-1}):t>-1;if(l){var a=this.first,h=this.element,u=h.scrollTop,o=u===void 0?0:u,c=h.scrollLeft,d=c===void 0?0:c,g=this.calculateNumItems(),p=g.numToleratedItems,v=this.getContentPosition(),y=this.itemSize,b=function(){var I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,H=arguments.length>1?arguments[1]:void 0;return I<=H?0:I},S=function(I,H,W){return I*H+W},O=function(){var I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,H=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return i.scrollTo({left:I,top:H,behavior:n})},f=r?{rows:0,cols:0}:0,A=!1,V=!1;r?(f={rows:b(t[0],p[0]),cols:b(t[1],p[1])},O(S(f.cols,y[1],v.left),S(f.rows,y[0],v.top)),V=this.lastScrollPos.top!==o||this.lastScrollPos.left!==d,A=f.rows!==a.rows||f.cols!==a.cols):(f=b(t,p),s?O(S(f,y,v.left),o):O(d,S(f,y,v.top)),V=this.lastScrollPos!==(s?d:o),A=f!==a),this.isRangeChanged=A,V&&(this.first=f)}},scrollInView:function(t,i){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"auto";if(i){var s=this.isBoth(),l=this.isHorizontal(),a=s?t.every(function(y){return y>-1}):t>-1;if(a){var h=this.getRenderedRange(),u=h.first,o=h.viewport,c=function(){var b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return n.scrollTo({left:b,top:S,behavior:r})},d=i==="to-start",g=i==="to-end";if(d){if(s)o.first.rows-u.rows>t[0]?c(o.first.cols*this.itemSize[1],(o.first.rows-1)*this.itemSize[0]):o.first.cols-u.cols>t[1]&&c((o.first.cols-1)*this.itemSize[1],o.first.rows*this.itemSize[0]);else if(o.first-u>t){var p=(o.first-1)*this.itemSize;l?c(p,0):c(0,p)}}else if(g){if(s)o.last.rows-u.rows<=t[0]+1?c(o.first.cols*this.itemSize[1],(o.first.rows+1)*this.itemSize[0]):o.last.cols-u.cols<=t[1]+1&&c((o.first.cols+1)*this.itemSize[1],o.first.rows*this.itemSize[0]);else if(o.last-u<=t+1){var v=(o.first+1)*this.itemSize;l?c(v,0):c(0,v)}}}}else this.scrollToIndex(t,r)},getRenderedRange:function(){var t=function(c,d){return Math.floor(c/(d||c))},i=this.first,n=0;if(this.element){var r=this.isBoth(),s=this.isHorizontal(),l=this.element,a=l.scrollTop,h=l.scrollLeft;if(r)i={rows:t(a,this.itemSize[0]),cols:t(h,this.itemSize[1])},n={rows:i.rows+this.numItemsInViewport.rows,cols:i.cols+this.numItemsInViewport.cols};else{var u=s?h:a;i=t(u,this.itemSize),n=i+this.numItemsInViewport}}return{first:this.first,last:this.last,viewport:{first:i,last:n}}},calculateNumItems:function(){var t=this.isBoth(),i=this.isHorizontal(),n=this.itemSize,r=this.getContentPosition(),s=this.element?this.element.offsetWidth-r.left:0,l=this.element?this.element.offsetHeight-r.top:0,a=function(d,g){return Math.ceil(d/(g||d))},h=function(d){return Math.ceil(d/2)},u=t?{rows:a(l,n[0]),cols:a(s,n[1])}:a(i?s:l,n),o=this.d_numToleratedItems||(t?[h(u.rows),h(u.cols)]:h(u));return{numItemsInViewport:u,numToleratedItems:o}},calculateOptions:function(){var t=this,i=this.isBoth(),n=this.first,r=this.calculateNumItems(),s=r.numItemsInViewport,l=r.numToleratedItems,a=function(o,c,d){var g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;return t.getLast(o+c+(o<d?2:3)*d,g)},h=i?{rows:a(n.rows,s.rows,l[0]),cols:a(n.cols,s.cols,l[1],!0)}:a(n,s,l);this.last=h,this.numItemsInViewport=s,this.d_numToleratedItems=l,this.$emit("update:numToleratedItems",this.d_numToleratedItems),this.showLoader&&(this.loaderArr=i?Array.from({length:s.rows}).map(function(){return Array.from({length:s.cols})}):Array.from({length:s})),this.lazy&&Promise.resolve().then(function(){var u;t.lazyLoadState={first:t.step?i?{rows:0,cols:n.cols}:0:n,last:Math.min(t.step?t.step:h,((u=t.items)===null||u===void 0?void 0:u.length)||0)},t.$emit("lazy-load",t.lazyLoadState)})},calculateAutoSize:function(){var t=this;this.autoSize&&!this.d_loading&&Promise.resolve().then(function(){if(t.content){var i=t.isBoth(),n=t.isHorizontal(),r=t.isVertical();t.content.style.minHeight=t.content.style.minWidth="auto",t.content.style.position="relative",t.element.style.contain="none";var s=[N(t.element),M(t.element)],l=s[0],a=s[1];(i||n)&&(t.element.style.width=l<t.defaultWidth?l+"px":t.scrollWidth||t.defaultWidth+"px"),(i||r)&&(t.element.style.height=a<t.defaultHeight?a+"px":t.scrollHeight||t.defaultHeight+"px"),t.content.style.minHeight=t.content.style.minWidth="",t.content.style.position="",t.element.style.contain=""}})},getLast:function(){var t,i,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,r=arguments.length>1?arguments[1]:void 0;return this.items?Math.min(r?((t=this.columns||this.items[0])===null||t===void 0?void 0:t.length)||0:((i=this.items)===null||i===void 0?void 0:i.length)||0,n):0},getContentPosition:function(){if(this.content){var t=getComputedStyle(this.content),i=parseFloat(t.paddingLeft)+Math.max(parseFloat(t.left)||0,0),n=parseFloat(t.paddingRight)+Math.max(parseFloat(t.right)||0,0),r=parseFloat(t.paddingTop)+Math.max(parseFloat(t.top)||0,0),s=parseFloat(t.paddingBottom)+Math.max(parseFloat(t.bottom)||0,0);return{left:i,right:n,top:r,bottom:s,x:i+n,y:r+s}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}},setSize:function(){var t=this;if(this.element){var i=this.isBoth(),n=this.isHorizontal(),r=this.element.parentElement,s=this.scrollWidth||"".concat(this.element.offsetWidth||r.offsetWidth,"px"),l=this.scrollHeight||"".concat(this.element.offsetHeight||r.offsetHeight,"px"),a=function(u,o){return t.element.style[u]=o};i||n?(a("height",l),a("width",s)):a("height",l)}},setSpacerSize:function(){var t=this,i=this.items;if(i){var n=this.isBoth(),r=this.isHorizontal(),s=this.getContentPosition(),l=function(h,u,o){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return t.spacerStyle=j(j({},t.spacerStyle),Y({},"".concat(h),(u||[]).length*o+c+"px"))};n?(l("height",i,this.itemSize[0],s.y),l("width",this.columns||i[1],this.itemSize[1],s.x)):r?l("width",this.columns||i,this.itemSize,s.x):l("height",i,this.itemSize,s.y)}},setContentPosition:function(t){var i=this;if(this.content&&!this.appendOnly){var n=this.isBoth(),r=this.isHorizontal(),s=t?t.first:this.first,l=function(o,c){return o*c},a=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return i.contentStyle=j(j({},i.contentStyle),{transform:"translate3d(".concat(o,"px, ").concat(c,"px, 0)")})};if(n)a(l(s.cols,this.itemSize[1]),l(s.rows,this.itemSize[0]));else{var h=l(s,this.itemSize);r?a(h,0):a(0,h)}}},onScrollPositionChange:function(t){var i=this,n=t.target,r=this.isBoth(),s=this.isHorizontal(),l=this.getContentPosition(),a=function(m,z){return m?m>z?m-z:m:0},h=function(m,z){return Math.floor(m/(z||m))},u=function(m,z,k,$,w,T){return m<=w?w:T?k-$-w:z+w-1},o=function(m,z,k,$,w,T,E,tt){if(m<=T)return 0;var _=Math.max(0,E?m<z?k:m-T:m>z?k:m-2*T),U=i.getLast(_,tt);return _>U?U-w:_},c=function(m,z,k,$,w,T){var E=z+$+2*w;return m>=w&&(E+=w+1),i.getLast(E,T)},d=a(n.scrollTop,l.top),g=a(n.scrollLeft,l.left),p=r?{rows:0,cols:0}:0,v=this.last,y=!1,b=this.lastScrollPos;if(r){var S=this.lastScrollPos.top<=d,O=this.lastScrollPos.left<=g;if(!this.appendOnly||this.appendOnly&&(S||O)){var f={rows:h(d,this.itemSize[0]),cols:h(g,this.itemSize[1])},A={rows:u(f.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],S),cols:u(f.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],O)};p={rows:o(f.rows,A.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],S),cols:o(f.cols,A.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],O,!0)},v={rows:c(f.rows,p.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:c(f.cols,p.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},y=p.rows!==this.first.rows||v.rows!==this.last.rows||p.cols!==this.first.cols||v.cols!==this.last.cols||this.isRangeChanged,b={top:d,left:g}}}else{var V=s?g:d,C=this.lastScrollPos<=V;if(!this.appendOnly||this.appendOnly&&C){var I=h(V,this.itemSize),H=u(I,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,C);p=o(I,H,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,C),v=c(I,p,this.last,this.numItemsInViewport,this.d_numToleratedItems),y=p!==this.first||v!==this.last||this.isRangeChanged,b=V}}return{first:p,last:v,isRangeChanged:y,scrollPos:b}},onScrollChange:function(t){var i=this.onScrollPositionChange(t),n=i.first,r=i.last,s=i.isRangeChanged,l=i.scrollPos;if(s){var a={first:n,last:r};if(this.setContentPosition(a),this.first=n,this.last=r,this.lastScrollPos=l,this.$emit("scroll-index-change",a),this.lazy&&this.isPageChanged(n)){var h,u,o={first:this.step?Math.min(this.getPageByFirst(n)*this.step,(((h=this.items)===null||h===void 0?void 0:h.length)||0)-this.step):n,last:Math.min(this.step?(this.getPageByFirst(n)+1)*this.step:r,((u=this.items)===null||u===void 0?void 0:u.length)||0)},c=this.lazyLoadState.first!==o.first||this.lazyLoadState.last!==o.last;c&&this.$emit("lazy-load",o),this.lazyLoadState=o}}},onScroll:function(t){var i=this;if(this.$emit("scroll",t),this.delay){if(this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.isPageChanged()){if(!this.d_loading&&this.showLoader){var n=this.onScrollPositionChange(t),r=n.isRangeChanged,s=r||(this.step?this.isPageChanged():!1);s&&(this.d_loading=!0)}this.scrollTimeout=setTimeout(function(){i.onScrollChange(t),i.d_loading&&i.showLoader&&(!i.lazy||i.loading===void 0)&&(i.d_loading=!1,i.page=i.getPageByFirst())},this.delay)}}else this.onScrollChange(t)},onResize:function(){var t=this;this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){if(Z(t.element)){var i=t.isBoth(),n=t.isVertical(),r=t.isHorizontal(),s=[N(t.element),M(t.element)],l=s[0],a=s[1],h=l!==t.defaultWidth,u=a!==t.defaultHeight,o=i?h||u:r?h:n?u:!1;o&&(t.d_numToleratedItems=t.numToleratedItems,t.defaultWidth=l,t.defaultHeight=a,t.defaultContentWidth=N(t.content),t.defaultContentHeight=M(t.content),t.init())}},this.resizeDelay)},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=this.onResize.bind(this),window.addEventListener("resize",this.resizeListener),window.addEventListener("orientationchange",this.resizeListener),this.resizeObserver=new ResizeObserver(function(){t.onResize()}),this.resizeObserver.observe(this.element))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),window.removeEventListener("orientationchange",this.resizeListener),this.resizeListener=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)},getOptions:function(t){var i=(this.items||[]).length,n=this.isBoth()?this.first.rows+t:this.first+t;return{index:n,count:i,first:n===0,last:n===i-1,even:n%2===0,odd:n%2!==0}},getLoaderOptions:function(t,i){var n=this.loaderArr.length;return j({index:t,count:n,first:t===0,last:t===n-1,even:t%2===0,odd:t%2!==0},i)},getPageByFirst:function(t){return Math.floor(((t??this.first)+this.d_numToleratedItems*4)/(this.step||1))},isPageChanged:function(t){return this.step&&!this.lazy?this.page!==this.getPageByFirst(t??this.first):!0},setContentEl:function(t){this.content=t||this.content||et(this.element,'[data-pc-section="content"]')},elementRef:function(t){this.element=t},contentRef:function(t){this.content=t}},computed:{containerClass:function(){return["p-virtualscroller",this.class,{"p-virtualscroller-inline":this.inline,"p-virtualscroller-both p-both-scroll":this.isBoth(),"p-virtualscroller-horizontal p-horizontal-scroll":this.isHorizontal()}]},contentClass:function(){return["p-virtualscroller-content",{"p-virtualscroller-loading":this.d_loading}]},loaderClass:function(){return["p-virtualscroller-loader",{"p-virtualscroller-loader-mask":!this.$slots.loader}]},loadedItems:function(){var t=this;return this.items&&!this.d_loading?this.isBoth()?this.items.slice(this.appendOnly?0:this.first.rows,this.last.rows).map(function(i){return t.columns?i:i.slice(t.appendOnly?0:t.first.cols,t.last.cols)}):this.isHorizontal()&&this.columns?this.items:this.items.slice(this.appendOnly?0:this.first,this.last):[]},loadedRows:function(){return this.d_loading?this.loaderDisabled?this.loaderArr:[]:this.loadedItems},loadedColumns:function(){if(this.columns){var t=this.isBoth(),i=this.isHorizontal();if(t||i)return this.d_loading&&this.loaderDisabled?t?this.loaderArr[0]:this.loaderArr:this.columns.slice(t?this.first.cols:this.first,t?this.last.cols:this.last)}return this.columns}},components:{SpinnerIcon:rt}},dt=["tabindex"];function ft(e,t,i,n,r,s){var l=it("SpinnerIcon");return e.disabled?(P(),B(D,{key:1},[L(e.$slots,"default"),L(e.$slots,"content",{items:e.items,rows:e.items,columns:s.loadedColumns})],64)):(P(),B("div",R({key:0,ref:s.elementRef,class:s.containerClass,tabindex:e.tabindex,style:e.style,onScroll:t[0]||(t[0]=function(){return s.onScroll&&s.onScroll.apply(s,arguments)})},e.ptmi("root")),[L(e.$slots,"content",{styleClass:s.contentClass,items:s.loadedItems,getItemOptions:s.getOptions,loading:r.d_loading,getLoaderOptions:s.getLoaderOptions,itemSize:e.itemSize,rows:s.loadedRows,columns:s.loadedColumns,contentRef:s.contentRef,spacerStyle:r.spacerStyle,contentStyle:r.contentStyle,vertical:s.isVertical(),horizontal:s.isHorizontal(),both:s.isBoth()},function(){return[st("div",R({ref:s.contentRef,class:s.contentClass,style:r.contentStyle},e.ptm("content")),[(P(!0),B(D,null,q(s.loadedItems,function(a,h){return L(e.$slots,"item",{key:h,item:a,options:s.getOptions(h)})}),128))],16)]}),e.showSpacer?(P(),B("div",R({key:0,class:"p-virtualscroller-spacer",style:r.spacerStyle},e.ptm("spacer")),null,16)):x("",!0),!e.loaderDisabled&&e.showLoader&&r.d_loading?(P(),B("div",R({key:1,class:s.loaderClass},e.ptm("loader")),[e.$slots&&e.$slots.loader?(P(!0),B(D,{key:0},q(r.loaderArr,function(a,h){return L(e.$slots,"loader",{key:h,options:s.getLoaderOptions(h,s.isBoth()&&{numCols:e.d_numItemsInViewport.cols})})}),128)):x("",!0),L(e.$slots,"loadingicon",{},function(){return[nt(l,R({spin:"",class:"p-virtualscroller-loading-icon"},e.ptm("loadingIcon")),null,16)]})],16)):x("",!0)],16,dt))}ct.render=ft;var mt=X`
    .p-iconfield {
        position: relative;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,pt={root:"p-iconfield"},vt=K.extend({name:"iconfield",style:mt,classes:pt}),gt={name:"BaseIconField",extends:Q,style:vt,provide:function(){return{$pcIconField:this,$parentInstance:this}}},yt={name:"IconField",extends:gt,inheritAttrs:!1};function zt(e,t,i,n,r,s){return P(),B("div",R({class:e.cx("root")},e.ptmi("root")),[L(e.$slots,"default")],16)}yt.render=zt;var St={root:"p-inputicon"},It=K.extend({name:"inputicon",classes:St}),wt={name:"BaseInputIcon",extends:Q,style:It,props:{class:null},provide:function(){return{$pcInputIcon:this,$parentInstance:this}}},bt={name:"InputIcon",extends:wt,inheritAttrs:!1,computed:{containerClass:function(){return[this.cx("root"),this.class]}}};function Ct(e,t,i,n,r,s){return P(),B("span",R({class:s.containerClass},e.ptmi("root")),[L(e.$slots,"default")],16)}bt.render=Ct;export{yt as a,ct as b,bt as s};
