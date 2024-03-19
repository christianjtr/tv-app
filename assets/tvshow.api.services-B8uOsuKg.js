function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{j as M,r as Vr,g as zr,c as Hr,_ as Ar}from"./index-Dn1JJt5j.js";const jr=r=>{const{value:e=0,precision:t=1,className:n=""}=r,a=e-Math.floor(e)!==0?e.toFixed(t):Math.ceil(e);return M.jsxs("div",{className:`badge bg-indigo-700 text-white p-2 ${n}`,children:[a," ★"]})},va=r=>{var u;const[e,t]=Vr.useState(!1),{info:n,onClick:o}=r,a=n.title||n.name,i=n.releaseDate||n.firstAirDate,c=new Date(i).toLocaleDateString("en-US",{month:"long",year:"numeric"}),f=()=>{o()},l=v=>{v.stopPropagation(),v.key==="Enter"&&(t(!0),o())};return M.jsxs("div",{className:"carousel-item tv-program-item relative cursor-pointer",role:"button",onClick:f,onKeyDown:l,"aria-pressed":e,"data-testid":`program_${a}`,"data-element":"tv-program-rail-item","data-cy":"tv-program-rail-item",children:[M.jsxs("div",{tabIndex:0,className:"bg-base-100 w-full h-full absolute opacity-0 tv-program-item__info text-sm text-left",children:[M.jsx("h4",{className:"block mb-1 text-base font-semibold",children:a}),M.jsx(jr,{value:n==null?void 0:n.rating,className:"mb-1 text-xs"}),M.jsx("span",{className:"block mb-5",children:c}),M.jsx("p",{className:"text-ellipsis overflow-hidden max-h-40 description",children:n.description})]}),M.jsx("img",{src:(u=n.images)==null?void 0:u.w185,className:"rounded-md",alt:`${a} poster`,"aria-label":`${a} poster`})]})};var Qr=Error,Jr=EvalError,Yr=RangeError,Xr=ReferenceError,Er=SyntaxError,oe=TypeError,Zr=URIError,et=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var e={},t=Symbol("test"),n=Object(t);if(typeof t=="string"||Object.prototype.toString.call(t)!=="[object Symbol]"||Object.prototype.toString.call(n)!=="[object Symbol]")return!1;var o=42;e[t]=o;for(t in e)return!1;if(typeof Object.keys=="function"&&Object.keys(e).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(e).length!==0)return!1;var a=Object.getOwnPropertySymbols(e);if(a.length!==1||a[0]!==t||!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var i=Object.getOwnPropertyDescriptor(e,t);if(i.value!==o||i.enumerable!==!0)return!1}return!0},Ze=typeof Symbol<"u"&&Symbol,rt=et,tt=function(){return typeof Ze!="function"||typeof Symbol!="function"||typeof Ze("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:rt()},Se={__proto__:null,foo:{}},nt=Object,at=function(){return{__proto__:Se}.foo===Se.foo&&!(Se instanceof nt)},ot="Function.prototype.bind called on incompatible ",it=Object.prototype.toString,lt=Math.max,ft="[object Function]",er=function(e,t){for(var n=[],o=0;o<e.length;o+=1)n[o]=e[o];for(var a=0;a<t.length;a+=1)n[a+e.length]=t[a];return n},ct=function(e,t){for(var n=[],o=t||0,a=0;o<e.length;o+=1,a+=1)n[a]=e[o];return n},ut=function(r,e){for(var t="",n=0;n<r.length;n+=1)t+=r[n],n+1<r.length&&(t+=e);return t},st=function(e){var t=this;if(typeof t!="function"||it.apply(t)!==ft)throw new TypeError(ot+t);for(var n=ct(arguments,1),o,a=function(){if(this instanceof o){var u=t.apply(this,er(n,arguments));return Object(u)===u?u:this}return t.apply(e,er(n,arguments))},i=lt(0,t.length-n.length),c=[],f=0;f<i;f++)c[f]="$"+f;if(o=Function("binder","return function ("+ut(c,",")+"){ return binder.apply(this,arguments); }")(a),t.prototype){var l=function(){};l.prototype=t.prototype,o.prototype=new l,l.prototype=null}return o},pt=st,Ue=Function.prototype.bind||pt,yt=Function.prototype.call,vt=Object.prototype.hasOwnProperty,dt=Ue,mt=dt.call(yt,vt),s,gt=Qr,ht=Jr,bt=Yr,wt=Xr,j=Er,H=oe,St=Zr,Pr=Function,Ae=function(r){try{return Pr('"use strict"; return ('+r+").constructor;")()}catch{}},L=Object.getOwnPropertyDescriptor;if(L)try{L({},"")}catch{L=null}var Ee=function(){throw new H},At=L?function(){try{return arguments.callee,Ee}catch{try{return L(arguments,"callee").get}catch{return Ee}}}():Ee,K=tt(),Et=at(),b=Object.getPrototypeOf||(Et?function(r){return r.__proto__}:null),z={},Pt=typeof Uint8Array>"u"||!b?s:b(Uint8Array),W={__proto__:null,"%AggregateError%":typeof AggregateError>"u"?s:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?s:ArrayBuffer,"%ArrayIteratorPrototype%":K&&b?b([][Symbol.iterator]()):s,"%AsyncFromSyncIteratorPrototype%":s,"%AsyncFunction%":z,"%AsyncGenerator%":z,"%AsyncGeneratorFunction%":z,"%AsyncIteratorPrototype%":z,"%Atomics%":typeof Atomics>"u"?s:Atomics,"%BigInt%":typeof BigInt>"u"?s:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?s:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?s:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?s:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":gt,"%eval%":eval,"%EvalError%":ht,"%Float32Array%":typeof Float32Array>"u"?s:Float32Array,"%Float64Array%":typeof Float64Array>"u"?s:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?s:FinalizationRegistry,"%Function%":Pr,"%GeneratorFunction%":z,"%Int8Array%":typeof Int8Array>"u"?s:Int8Array,"%Int16Array%":typeof Int16Array>"u"?s:Int16Array,"%Int32Array%":typeof Int32Array>"u"?s:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":K&&b?b(b([][Symbol.iterator]())):s,"%JSON%":typeof JSON=="object"?JSON:s,"%Map%":typeof Map>"u"?s:Map,"%MapIteratorPrototype%":typeof Map>"u"||!K||!b?s:b(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?s:Promise,"%Proxy%":typeof Proxy>"u"?s:Proxy,"%RangeError%":bt,"%ReferenceError%":wt,"%Reflect%":typeof Reflect>"u"?s:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?s:Set,"%SetIteratorPrototype%":typeof Set>"u"||!K||!b?s:b(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?s:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":K&&b?b(""[Symbol.iterator]()):s,"%Symbol%":K?Symbol:s,"%SyntaxError%":j,"%ThrowTypeError%":At,"%TypedArray%":Pt,"%TypeError%":H,"%Uint8Array%":typeof Uint8Array>"u"?s:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?s:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?s:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?s:Uint32Array,"%URIError%":St,"%WeakMap%":typeof WeakMap>"u"?s:WeakMap,"%WeakRef%":typeof WeakRef>"u"?s:WeakRef,"%WeakSet%":typeof WeakSet>"u"?s:WeakSet};if(b)try{null.error}catch(r){var Ot=b(b(r));W["%Error.prototype%"]=Ot}var $t=function r(e){var t;if(e==="%AsyncFunction%")t=Ae("async function () {}");else if(e==="%GeneratorFunction%")t=Ae("function* () {}");else if(e==="%AsyncGeneratorFunction%")t=Ae("async function* () {}");else if(e==="%AsyncGenerator%"){var n=r("%AsyncGeneratorFunction%");n&&(t=n.prototype)}else if(e==="%AsyncIteratorPrototype%"){var o=r("%AsyncGenerator%");o&&b&&(t=b(o.prototype))}return W[e]=t,t},rr={__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},ie=Ue,ve=mt,It=ie.call(Function.call,Array.prototype.concat),xt=ie.call(Function.apply,Array.prototype.splice),tr=ie.call(Function.call,String.prototype.replace),de=ie.call(Function.call,String.prototype.slice),Ft=ie.call(Function.call,RegExp.prototype.exec),Dt=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Rt=/\\(\\)?/g,_t=function(e){var t=de(e,0,1),n=de(e,-1);if(t==="%"&&n!=="%")throw new j("invalid intrinsic syntax, expected closing `%`");if(n==="%"&&t!=="%")throw new j("invalid intrinsic syntax, expected opening `%`");var o=[];return tr(e,Dt,function(a,i,c,f){o[o.length]=c?tr(f,Rt,"$1"):i||a}),o},Mt=function(e,t){var n=e,o;if(ve(rr,n)&&(o=rr[n],n="%"+o[0]+"%"),ve(W,n)){var a=W[n];if(a===z&&(a=$t(n)),typeof a>"u"&&!t)throw new H("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:o,name:n,value:a}}throw new j("intrinsic "+e+" does not exist!")},Y=function(e,t){if(typeof e!="string"||e.length===0)throw new H("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof t!="boolean")throw new H('"allowMissing" argument must be a boolean');if(Ft(/^%?[^%]*%?$/,e)===null)throw new j("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=_t(e),o=n.length>0?n[0]:"",a=Mt("%"+o+"%",t),i=a.name,c=a.value,f=!1,l=a.alias;l&&(o=l[0],xt(n,It([0,1],l)));for(var u=1,v=!0;u<n.length;u+=1){var p=n[u],d=de(p,0,1),m=de(p,-1);if((d==='"'||d==="'"||d==="`"||m==='"'||m==="'"||m==="`")&&d!==m)throw new j("property names with quotes must have matching quotes");if((p==="constructor"||!v)&&(f=!0),o+="."+p,i="%"+o+"%",ve(W,i))c=W[i];else if(c!=null){if(!(p in c)){if(!t)throw new H("base intrinsic for "+e+" exists, but the property is not available.");return}if(L&&u+1>=n.length){var w=L(c,p);v=!!w,v&&"get"in w&&!("originalValue"in w.get)?c=w.get:c=c[p]}else v=ve(c,p),c=c[p];v&&!f&&(W[i]=c)}}return c},Or={exports:{}},Pe,nr;function Le(){if(nr)return Pe;nr=1;var r=Y,e=r("%Object.defineProperty%",!0)||!1;if(e)try{e({},"a",{value:1})}catch{e=!1}return Pe=e,Pe}var Nt=Y,pe=Nt("%Object.getOwnPropertyDescriptor%",!0);if(pe)try{pe([],"length")}catch{pe=null}var $r=pe,ar=Le(),Tt=Er,V=oe,or=$r,Bt=function(e,t,n){if(!e||typeof e!="object"&&typeof e!="function")throw new V("`obj` must be an object or a function`");if(typeof t!="string"&&typeof t!="symbol")throw new V("`property` must be a string or a symbol`");if(arguments.length>3&&typeof arguments[3]!="boolean"&&arguments[3]!==null)throw new V("`nonEnumerable`, if provided, must be a boolean or null");if(arguments.length>4&&typeof arguments[4]!="boolean"&&arguments[4]!==null)throw new V("`nonWritable`, if provided, must be a boolean or null");if(arguments.length>5&&typeof arguments[5]!="boolean"&&arguments[5]!==null)throw new V("`nonConfigurable`, if provided, must be a boolean or null");if(arguments.length>6&&typeof arguments[6]!="boolean")throw new V("`loose`, if provided, must be a boolean");var o=arguments.length>3?arguments[3]:null,a=arguments.length>4?arguments[4]:null,i=arguments.length>5?arguments[5]:null,c=arguments.length>6?arguments[6]:!1,f=!!or&&or(e,t);if(ar)ar(e,t,{configurable:i===null&&f?f.configurable:!i,enumerable:o===null&&f?f.enumerable:!o,value:n,writable:a===null&&f?f.writable:!a});else if(c||!o&&!a&&!i)e[t]=n;else throw new Tt("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.")},_e=Le(),Ir=function(){return!!_e};Ir.hasArrayLengthDefineBug=function(){if(!_e)return null;try{return _e([],"length",{value:1}).length!==1}catch{return!0}};var Ct=Ir,kt=Y,ir=Bt,Ut=Ct(),lr=$r,fr=oe,Lt=kt("%Math.floor%"),Wt=function(e,t){if(typeof e!="function")throw new fr("`fn` is not a function");if(typeof t!="number"||t<0||t>4294967295||Lt(t)!==t)throw new fr("`length` must be a positive 32-bit integer");var n=arguments.length>2&&!!arguments[2],o=!0,a=!0;if("length"in e&&lr){var i=lr(e,"length");i&&!i.configurable&&(o=!1),i&&!i.writable&&(a=!1)}return(o||a||!n)&&(Ut?ir(e,"length",t,!0,!0):ir(e,"length",t)),e};(function(r){var e=Ue,t=Y,n=Wt,o=oe,a=t("%Function.prototype.apply%"),i=t("%Function.prototype.call%"),c=t("%Reflect.apply%",!0)||e.call(i,a),f=Le(),l=t("%Math.max%");r.exports=function(p){if(typeof p!="function")throw new o("a function is required");var d=c(e,i,arguments);return n(d,1+l(0,p.length-(arguments.length-1)),!0)};var u=function(){return c(e,a,arguments)};f?f(r.exports,"apply",{value:u}):r.exports.apply=u})(Or);var Gt=Or.exports,xr=Y,Fr=Gt,qt=Fr(xr("String.prototype.indexOf")),Kt=function(e,t){var n=xr(e,!!t);return typeof n=="function"&&qt(e,".prototype.")>-1?Fr(n):n};const Vt={},zt=Object.freeze(Object.defineProperty({__proto__:null,default:Vt},Symbol.toStringTag,{value:"Module"})),Ht=zr(zt);var We=typeof Map=="function"&&Map.prototype,Oe=Object.getOwnPropertyDescriptor&&We?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,me=We&&Oe&&typeof Oe.get=="function"?Oe.get:null,cr=We&&Map.prototype.forEach,Ge=typeof Set=="function"&&Set.prototype,$e=Object.getOwnPropertyDescriptor&&Ge?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,ge=Ge&&$e&&typeof $e.get=="function"?$e.get:null,ur=Ge&&Set.prototype.forEach,jt=typeof WeakMap=="function"&&WeakMap.prototype,te=jt?WeakMap.prototype.has:null,Qt=typeof WeakSet=="function"&&WeakSet.prototype,ne=Qt?WeakSet.prototype.has:null,Jt=typeof WeakRef=="function"&&WeakRef.prototype,sr=Jt?WeakRef.prototype.deref:null,Yt=Boolean.prototype.valueOf,Xt=Object.prototype.toString,Zt=Function.prototype.toString,en=String.prototype.match,qe=String.prototype.slice,T=String.prototype.replace,rn=String.prototype.toUpperCase,pr=String.prototype.toLowerCase,Dr=RegExp.prototype.test,yr=Array.prototype.concat,$=Array.prototype.join,tn=Array.prototype.slice,vr=Math.floor,Me=typeof BigInt=="function"?BigInt.prototype.valueOf:null,Ie=Object.getOwnPropertySymbols,Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,Q=typeof Symbol=="function"&&typeof Symbol.iterator=="object",S=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===Q||!0)?Symbol.toStringTag:null,Rr=Object.prototype.propertyIsEnumerable,dr=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(r){return r.__proto__}:null);function mr(r,e){if(r===1/0||r===-1/0||r!==r||r&&r>-1e3&&r<1e3||Dr.call(/e/,e))return e;var t=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof r=="number"){var n=r<0?-vr(-r):vr(r);if(n!==r){var o=String(n),a=qe.call(e,o.length+1);return T.call(o,t,"$&_")+"."+T.call(T.call(a,/([0-9]{3})/g,"$&_"),/_$/,"")}}return T.call(e,t,"$&_")}var Te=Ht,gr=Te.custom,hr=Mr(gr)?gr:null,nn=function r(e,t,n,o){var a=t||{};if(N(a,"quoteStyle")&&a.quoteStyle!=="single"&&a.quoteStyle!=="double")throw new TypeError('option "quoteStyle" must be "single" or "double"');if(N(a,"maxStringLength")&&(typeof a.maxStringLength=="number"?a.maxStringLength<0&&a.maxStringLength!==1/0:a.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var i=N(a,"customInspect")?a.customInspect:!0;if(typeof i!="boolean"&&i!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(N(a,"indent")&&a.indent!==null&&a.indent!=="	"&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(N(a,"numericSeparator")&&typeof a.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var c=a.numericSeparator;if(typeof e>"u")return"undefined";if(e===null)return"null";if(typeof e=="boolean")return e?"true":"false";if(typeof e=="string")return Tr(e,a);if(typeof e=="number"){if(e===0)return 1/0/e>0?"0":"-0";var f=String(e);return c?mr(e,f):f}if(typeof e=="bigint"){var l=String(e)+"n";return c?mr(e,l):l}var u=typeof a.depth>"u"?5:a.depth;if(typeof n>"u"&&(n=0),n>=u&&u>0&&typeof e=="object")return Be(e)?"[Array]":"[Object]";var v=An(a,n);if(typeof o>"u")o=[];else if(Nr(o,e)>=0)return"[Circular]";function p(E,R,_){if(R&&(o=tn.call(o),o.push(R)),_){var ee={depth:a.depth};return N(a,"quoteStyle")&&(ee.quoteStyle=a.quoteStyle),r(E,ee,n+1,o)}return r(E,a,n+1,o)}if(typeof e=="function"&&!br(e)){var d=yn(e),m=ce(e,p);return"[Function"+(d?": "+d:" (anonymous)")+"]"+(m.length>0?" { "+$.call(m,", ")+" }":"")}if(Mr(e)){var w=Q?T.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):Ne.call(e);return typeof e=="object"&&!Q?re(w):w}if(bn(e)){for(var A="<"+pr.call(String(e.nodeName)),I=e.attributes||[],x=0;x<I.length;x++)A+=" "+I[x].name+"="+_r(an(I[x].value),"double",a);return A+=">",e.childNodes&&e.childNodes.length&&(A+="..."),A+="</"+pr.call(String(e.nodeName))+">",A}if(Be(e)){if(e.length===0)return"[]";var y=ce(e,p);return v&&!Sn(y)?"["+Ce(y,v)+"]":"[ "+$.call(y,", ")+" ]"}if(ln(e)){var F=ce(e,p);return!("cause"in Error.prototype)&&"cause"in e&&!Rr.call(e,"cause")?"{ ["+String(e)+"] "+$.call(yr.call("[cause]: "+p(e.cause),F),", ")+" }":F.length===0?"["+String(e)+"]":"{ ["+String(e)+"] "+$.call(F,", ")+" }"}if(typeof e=="object"&&i){if(hr&&typeof e[hr]=="function"&&Te)return Te(e,{depth:u-n});if(i!=="symbol"&&typeof e.inspect=="function")return e.inspect()}if(vn(e)){var C=[];return cr&&cr.call(e,function(E,R){C.push(p(R,e,!0)+" => "+p(E,e))}),wr("Map",me.call(e),C,v)}if(gn(e)){var Z=[];return ur&&ur.call(e,function(E){Z.push(p(E,e))}),wr("Set",ge.call(e),Z,v)}if(dn(e))return xe("WeakMap");if(hn(e))return xe("WeakSet");if(mn(e))return xe("WeakRef");if(cn(e))return re(p(Number(e)));if(sn(e))return re(p(Me.call(e)));if(un(e))return re(Yt.call(e));if(fn(e))return re(p(String(e)));if(typeof window<"u"&&e===window)return"{ [object Window] }";if(e===Hr)return"{ [object globalThis] }";if(!on(e)&&!br(e)){var G=ce(e,p),le=dr?dr(e)===Object.prototype:e instanceof Object||e.constructor===Object,k=e instanceof Object?"":"null prototype",D=!le&&S&&Object(e)===e&&S in e?qe.call(B(e),8,-1):k?"Object":"",fe=le||typeof e.constructor!="function"?"":e.constructor.name?e.constructor.name+" ":"",q=fe+(D||k?"["+$.call(yr.call([],D||[],k||[]),": ")+"] ":"");return G.length===0?q+"{}":v?q+"{"+Ce(G,v)+"}":q+"{ "+$.call(G,", ")+" }"}return String(e)};function _r(r,e,t){var n=(t.quoteStyle||e)==="double"?'"':"'";return n+r+n}function an(r){return T.call(String(r),/"/g,"&quot;")}function Be(r){return B(r)==="[object Array]"&&(!S||!(typeof r=="object"&&S in r))}function on(r){return B(r)==="[object Date]"&&(!S||!(typeof r=="object"&&S in r))}function br(r){return B(r)==="[object RegExp]"&&(!S||!(typeof r=="object"&&S in r))}function ln(r){return B(r)==="[object Error]"&&(!S||!(typeof r=="object"&&S in r))}function fn(r){return B(r)==="[object String]"&&(!S||!(typeof r=="object"&&S in r))}function cn(r){return B(r)==="[object Number]"&&(!S||!(typeof r=="object"&&S in r))}function un(r){return B(r)==="[object Boolean]"&&(!S||!(typeof r=="object"&&S in r))}function Mr(r){if(Q)return r&&typeof r=="object"&&r instanceof Symbol;if(typeof r=="symbol")return!0;if(!r||typeof r!="object"||!Ne)return!1;try{return Ne.call(r),!0}catch{}return!1}function sn(r){if(!r||typeof r!="object"||!Me)return!1;try{return Me.call(r),!0}catch{}return!1}var pn=Object.prototype.hasOwnProperty||function(r){return r in this};function N(r,e){return pn.call(r,e)}function B(r){return Xt.call(r)}function yn(r){if(r.name)return r.name;var e=en.call(Zt.call(r),/^function\s*([\w$]+)/);return e?e[1]:null}function Nr(r,e){if(r.indexOf)return r.indexOf(e);for(var t=0,n=r.length;t<n;t++)if(r[t]===e)return t;return-1}function vn(r){if(!me||!r||typeof r!="object")return!1;try{me.call(r);try{ge.call(r)}catch{return!0}return r instanceof Map}catch{}return!1}function dn(r){if(!te||!r||typeof r!="object")return!1;try{te.call(r,te);try{ne.call(r,ne)}catch{return!0}return r instanceof WeakMap}catch{}return!1}function mn(r){if(!sr||!r||typeof r!="object")return!1;try{return sr.call(r),!0}catch{}return!1}function gn(r){if(!ge||!r||typeof r!="object")return!1;try{ge.call(r);try{me.call(r)}catch{return!0}return r instanceof Set}catch{}return!1}function hn(r){if(!ne||!r||typeof r!="object")return!1;try{ne.call(r,ne);try{te.call(r,te)}catch{return!0}return r instanceof WeakSet}catch{}return!1}function bn(r){return!r||typeof r!="object"?!1:typeof HTMLElement<"u"&&r instanceof HTMLElement?!0:typeof r.nodeName=="string"&&typeof r.getAttribute=="function"}function Tr(r,e){if(r.length>e.maxStringLength){var t=r.length-e.maxStringLength,n="... "+t+" more character"+(t>1?"s":"");return Tr(qe.call(r,0,e.maxStringLength),e)+n}var o=T.call(T.call(r,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,wn);return _r(o,"single",e)}function wn(r){var e=r.charCodeAt(0),t={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return t?"\\"+t:"\\x"+(e<16?"0":"")+rn.call(e.toString(16))}function re(r){return"Object("+r+")"}function xe(r){return r+" { ? }"}function wr(r,e,t,n){var o=n?Ce(t,n):$.call(t,", ");return r+" ("+e+") {"+o+"}"}function Sn(r){for(var e=0;e<r.length;e++)if(Nr(r[e],`
`)>=0)return!1;return!0}function An(r,e){var t;if(r.indent==="	")t="	";else if(typeof r.indent=="number"&&r.indent>0)t=$.call(Array(r.indent+1)," ");else return null;return{base:t,prev:$.call(Array(e+1),t)}}function Ce(r,e){if(r.length===0)return"";var t=`
`+e.prev+e.base;return t+$.call(r,","+t)+`
`+e.prev}function ce(r,e){var t=Be(r),n=[];if(t){n.length=r.length;for(var o=0;o<r.length;o++)n[o]=N(r,o)?e(r[o],r):""}var a=typeof Ie=="function"?Ie(r):[],i;if(Q){i={};for(var c=0;c<a.length;c++)i["$"+a[c]]=a[c]}for(var f in r)N(r,f)&&(t&&String(Number(f))===f&&f<r.length||Q&&i["$"+f]instanceof Symbol||(Dr.call(/[^\w$]/,f)?n.push(e(f,r)+": "+e(r[f],r)):n.push(f+": "+e(r[f],r))));if(typeof Ie=="function")for(var l=0;l<a.length;l++)Rr.call(r,a[l])&&n.push("["+e(a[l])+"]: "+e(r[a[l]],r));return n}var Br=Y,X=Kt,En=nn,Pn=oe,ue=Br("%WeakMap%",!0),se=Br("%Map%",!0),On=X("WeakMap.prototype.get",!0),$n=X("WeakMap.prototype.set",!0),In=X("WeakMap.prototype.has",!0),xn=X("Map.prototype.get",!0),Fn=X("Map.prototype.set",!0),Dn=X("Map.prototype.has",!0),Ke=function(r,e){for(var t=r,n;(n=t.next)!==null;t=n)if(n.key===e)return t.next=n.next,n.next=r.next,r.next=n,n},Rn=function(r,e){var t=Ke(r,e);return t&&t.value},_n=function(r,e,t){var n=Ke(r,e);n?n.value=t:r.next={key:e,next:r.next,value:t}},Mn=function(r,e){return!!Ke(r,e)},Nn=function(){var e,t,n,o={assert:function(a){if(!o.has(a))throw new Pn("Side channel does not contain "+En(a))},get:function(a){if(ue&&a&&(typeof a=="object"||typeof a=="function")){if(e)return On(e,a)}else if(se){if(t)return xn(t,a)}else if(n)return Rn(n,a)},has:function(a){if(ue&&a&&(typeof a=="object"||typeof a=="function")){if(e)return In(e,a)}else if(se){if(t)return Dn(t,a)}else if(n)return Mn(n,a);return!1},set:function(a,i){ue&&a&&(typeof a=="object"||typeof a=="function")?(e||(e=new ue),$n(e,a,i)):se?(t||(t=new se),Fn(t,a,i)):(n||(n={key:{},next:null}),_n(n,a,i))}};return o},Tn=String.prototype.replace,Bn=/%20/g,Fe={RFC1738:"RFC1738",RFC3986:"RFC3986"},Ve={default:Fe.RFC3986,formatters:{RFC1738:function(r){return Tn.call(r,Bn,"+")},RFC3986:function(r){return String(r)}},RFC1738:Fe.RFC1738,RFC3986:Fe.RFC3986},Cn=Ve,De=Object.prototype.hasOwnProperty,U=Array.isArray,P=function(){for(var r=[],e=0;e<256;++e)r.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return r}(),kn=function(e){for(;e.length>1;){var t=e.pop(),n=t.obj[t.prop];if(U(n)){for(var o=[],a=0;a<n.length;++a)typeof n[a]<"u"&&o.push(n[a]);t.obj[t.prop]=o}}},Cr=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)typeof e[o]<"u"&&(n[o]=e[o]);return n},Un=function r(e,t,n){if(!t)return e;if(typeof t!="object"){if(U(e))e.push(t);else if(e&&typeof e=="object")(n&&(n.plainObjects||n.allowPrototypes)||!De.call(Object.prototype,t))&&(e[t]=!0);else return[e,t];return e}if(!e||typeof e!="object")return[e].concat(t);var o=e;return U(e)&&!U(t)&&(o=Cr(e,n)),U(e)&&U(t)?(t.forEach(function(a,i){if(De.call(e,i)){var c=e[i];c&&typeof c=="object"&&a&&typeof a=="object"?e[i]=r(c,a,n):e.push(a)}else e[i]=a}),e):Object.keys(t).reduce(function(a,i){var c=t[i];return De.call(a,i)?a[i]=r(a[i],c,n):a[i]=c,a},o)},Ln=function(e,t){return Object.keys(t).reduce(function(n,o){return n[o]=t[o],n},e)},Wn=function(r,e,t){var n=r.replace(/\+/g," ");if(t==="iso-8859-1")return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch{return n}},Gn=function(e,t,n,o,a){if(e.length===0)return e;var i=e;if(typeof e=="symbol"?i=Symbol.prototype.toString.call(e):typeof e!="string"&&(i=String(e)),n==="iso-8859-1")return escape(i).replace(/%u[0-9a-f]{4}/gi,function(u){return"%26%23"+parseInt(u.slice(2),16)+"%3B"});for(var c="",f=0;f<i.length;++f){var l=i.charCodeAt(f);if(l===45||l===46||l===95||l===126||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||a===Cn.RFC1738&&(l===40||l===41)){c+=i.charAt(f);continue}if(l<128){c=c+P[l];continue}if(l<2048){c=c+(P[192|l>>6]+P[128|l&63]);continue}if(l<55296||l>=57344){c=c+(P[224|l>>12]+P[128|l>>6&63]+P[128|l&63]);continue}f+=1,l=65536+((l&1023)<<10|i.charCodeAt(f)&1023),c+=P[240|l>>18]+P[128|l>>12&63]+P[128|l>>6&63]+P[128|l&63]}return c},qn=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],o=0;o<t.length;++o)for(var a=t[o],i=a.obj[a.prop],c=Object.keys(i),f=0;f<c.length;++f){var l=c[f],u=i[l];typeof u=="object"&&u!==null&&n.indexOf(u)===-1&&(t.push({obj:i,prop:l}),n.push(u))}return kn(t),e},Kn=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},Vn=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},zn=function(e,t){return[].concat(e,t)},Hn=function(e,t){if(U(e)){for(var n=[],o=0;o<e.length;o+=1)n.push(t(e[o]));return n}return t(e)},kr={arrayToObject:Cr,assign:Ln,combine:zn,compact:qn,decode:Wn,encode:Gn,isBuffer:Vn,isRegExp:Kn,maybeMap:Hn,merge:Un},Ur=Nn,ye=kr,ae=Ve,jn=Object.prototype.hasOwnProperty,Lr={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},O=Array.isArray,Qn=Array.prototype.push,Wr=function(r,e){Qn.apply(r,O(e)?e:[e])},Jn=Date.prototype.toISOString,Sr=ae.default,h={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:"indices",charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encodeDotInKeys:!1,encoder:ye.encode,encodeValuesOnly:!1,format:Sr,formatter:ae.formatters[Sr],indices:!1,serializeDate:function(e){return Jn.call(e)},skipNulls:!1,strictNullHandling:!1},Yn=function(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="symbol"||typeof e=="bigint"},Re={},Xn=function r(e,t,n,o,a,i,c,f,l,u,v,p,d,m,w,A,I,x){for(var y=e,F=x,C=0,Z=!1;(F=F.get(Re))!==void 0&&!Z;){var G=F.get(e);if(C+=1,typeof G<"u"){if(G===C)throw new RangeError("Cyclic object value");Z=!0}typeof F.get(Re)>"u"&&(C=0)}if(typeof u=="function"?y=u(t,y):y instanceof Date?y=d(y):n==="comma"&&O(y)&&(y=ye.maybeMap(y,function(we){return we instanceof Date?d(we):we})),y===null){if(i)return l&&!A?l(t,h.encoder,I,"key",m):t;y=""}if(Yn(y)||ye.isBuffer(y)){if(l){var le=A?t:l(t,h.encoder,I,"key",m);return[w(le)+"="+w(l(y,h.encoder,I,"value",m))]}return[w(t)+"="+w(String(y))]}var k=[];if(typeof y>"u")return k;var D;if(n==="comma"&&O(y))A&&l&&(y=ye.maybeMap(y,l)),D=[{value:y.length>0?y.join(",")||null:void 0}];else if(O(u))D=u;else{var fe=Object.keys(y);D=v?fe.sort(v):fe}var q=f?t.replace(/\./g,"%2E"):t,E=o&&O(y)&&y.length===1?q+"[]":q;if(a&&O(y)&&y.length===0)return E+"[]";for(var R=0;R<D.length;++R){var _=D[R],ee=typeof _=="object"&&typeof _.value<"u"?_.value:y[_];if(!(c&&ee===null)){var be=p&&f?_.replace(/\./g,"%2E"):_,Kr=O(y)?typeof n=="function"?n(E,be):E:E+(p?"."+be:"["+be+"]");x.set(e,C);var Xe=Ur();Xe.set(Re,x),Wr(k,r(ee,Kr,n,o,a,i,c,f,n==="comma"&&A&&O(y)?null:l,u,v,p,d,m,w,A,I,Xe))}}return k},Zn=function(e){if(!e)return h;if(typeof e.allowEmptyArrays<"u"&&typeof e.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof e.encodeDotInKeys<"u"&&typeof e.encodeDotInKeys!="boolean")throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");if(e.encoder!==null&&typeof e.encoder<"u"&&typeof e.encoder!="function")throw new TypeError("Encoder has to be a function.");var t=e.charset||h.charset;if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=ae.default;if(typeof e.format<"u"){if(!jn.call(ae.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var o=ae.formatters[n],a=h.filter;(typeof e.filter=="function"||O(e.filter))&&(a=e.filter);var i;if(e.arrayFormat in Lr?i=e.arrayFormat:"indices"in e?i=e.indices?"indices":"repeat":i=h.arrayFormat,"commaRoundTrip"in e&&typeof e.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var c=typeof e.allowDots>"u"?e.encodeDotInKeys===!0?!0:h.allowDots:!!e.allowDots;return{addQueryPrefix:typeof e.addQueryPrefix=="boolean"?e.addQueryPrefix:h.addQueryPrefix,allowDots:c,allowEmptyArrays:typeof e.allowEmptyArrays=="boolean"?!!e.allowEmptyArrays:h.allowEmptyArrays,arrayFormat:i,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:h.charsetSentinel,commaRoundTrip:e.commaRoundTrip,delimiter:typeof e.delimiter>"u"?h.delimiter:e.delimiter,encode:typeof e.encode=="boolean"?e.encode:h.encode,encodeDotInKeys:typeof e.encodeDotInKeys=="boolean"?e.encodeDotInKeys:h.encodeDotInKeys,encoder:typeof e.encoder=="function"?e.encoder:h.encoder,encodeValuesOnly:typeof e.encodeValuesOnly=="boolean"?e.encodeValuesOnly:h.encodeValuesOnly,filter:a,format:n,formatter:o,serializeDate:typeof e.serializeDate=="function"?e.serializeDate:h.serializeDate,skipNulls:typeof e.skipNulls=="boolean"?e.skipNulls:h.skipNulls,sort:typeof e.sort=="function"?e.sort:null,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:h.strictNullHandling}},ea=function(r,e){var t=r,n=Zn(e),o,a;typeof n.filter=="function"?(a=n.filter,t=a("",t)):O(n.filter)&&(a=n.filter,o=a);var i=[];if(typeof t!="object"||t===null)return"";var c=Lr[n.arrayFormat],f=c==="comma"&&n.commaRoundTrip;o||(o=Object.keys(t)),n.sort&&o.sort(n.sort);for(var l=Ur(),u=0;u<o.length;++u){var v=o[u];n.skipNulls&&t[v]===null||Wr(i,Xn(t[v],v,c,f,n.allowEmptyArrays,n.strictNullHandling,n.skipNulls,n.encodeDotInKeys,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.format,n.formatter,n.encodeValuesOnly,n.charset,l))}var p=i.join(n.delimiter),d=n.addQueryPrefix===!0?"?":"";return n.charsetSentinel&&(n.charset==="iso-8859-1"?d+="utf8=%26%2310003%3B&":d+="utf8=%E2%9C%93&"),p.length>0?d+p:""},J=kr,ke=Object.prototype.hasOwnProperty,ra=Array.isArray,g={allowDots:!1,allowEmptyArrays:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decodeDotInKeys:!0,decoder:J.decode,delimiter:"&",depth:5,duplicates:"combine",ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},ta=function(r){return r.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},Gr=function(r,e){return r&&typeof r=="string"&&e.comma&&r.indexOf(",")>-1?r.split(","):r},na="utf8=%26%2310003%3B",aa="utf8=%E2%9C%93",oa=function(e,t){var n={__proto__:null},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,i=o.split(t.delimiter,a),c=-1,f,l=t.charset;if(t.charsetSentinel)for(f=0;f<i.length;++f)i[f].indexOf("utf8=")===0&&(i[f]===aa?l="utf-8":i[f]===na&&(l="iso-8859-1"),c=f,f=i.length);for(f=0;f<i.length;++f)if(f!==c){var u=i[f],v=u.indexOf("]="),p=v===-1?u.indexOf("="):v+1,d,m;p===-1?(d=t.decoder(u,g.decoder,l,"key"),m=t.strictNullHandling?null:""):(d=t.decoder(u.slice(0,p),g.decoder,l,"key"),m=J.maybeMap(Gr(u.slice(p+1),t),function(A){return t.decoder(A,g.decoder,l,"value")})),m&&t.interpretNumericEntities&&l==="iso-8859-1"&&(m=ta(m)),u.indexOf("[]=")>-1&&(m=ra(m)?[m]:m);var w=ke.call(n,d);w&&t.duplicates==="combine"?n[d]=J.combine(n[d],m):(!w||t.duplicates==="last")&&(n[d]=m)}return n},ia=function(r,e,t,n){for(var o=n?e:Gr(e,t),a=r.length-1;a>=0;--a){var i,c=r[a];if(c==="[]"&&t.parseArrays)i=t.allowEmptyArrays&&o===""?[]:[].concat(o);else{i=t.plainObjects?Object.create(null):{};var f=c.charAt(0)==="["&&c.charAt(c.length-1)==="]"?c.slice(1,-1):c,l=t.decodeDotInKeys?f.replace(/%2E/g,"."):f,u=parseInt(l,10);!t.parseArrays&&l===""?i={0:o}:!isNaN(u)&&c!==l&&String(u)===l&&u>=0&&t.parseArrays&&u<=t.arrayLimit?(i=[],i[u]=o):l!=="__proto__"&&(i[l]=o)}o=i}return o},la=function(e,t,n,o){if(e){var a=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,f=n.depth>0&&i.exec(a),l=f?a.slice(0,f.index):a,u=[];if(l){if(!n.plainObjects&&ke.call(Object.prototype,l)&&!n.allowPrototypes)return;u.push(l)}for(var v=0;n.depth>0&&(f=c.exec(a))!==null&&v<n.depth;){if(v+=1,!n.plainObjects&&ke.call(Object.prototype,f[1].slice(1,-1))&&!n.allowPrototypes)return;u.push(f[1])}return f&&u.push("["+a.slice(f.index)+"]"),ia(u,t,n,o)}},fa=function(e){if(!e)return g;if(typeof e.allowEmptyArrays<"u"&&typeof e.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof e.decodeDotInKeys<"u"&&typeof e.decodeDotInKeys!="boolean")throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");if(e.decoder!==null&&typeof e.decoder<"u"&&typeof e.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=typeof e.charset>"u"?g.charset:e.charset,n=typeof e.duplicates>"u"?g.duplicates:e.duplicates;if(n!=="combine"&&n!=="first"&&n!=="last")throw new TypeError("The duplicates option must be either combine, first, or last");var o=typeof e.allowDots>"u"?e.decodeDotInKeys===!0?!0:g.allowDots:!!e.allowDots;return{allowDots:o,allowEmptyArrays:typeof e.allowEmptyArrays=="boolean"?!!e.allowEmptyArrays:g.allowEmptyArrays,allowPrototypes:typeof e.allowPrototypes=="boolean"?e.allowPrototypes:g.allowPrototypes,allowSparse:typeof e.allowSparse=="boolean"?e.allowSparse:g.allowSparse,arrayLimit:typeof e.arrayLimit=="number"?e.arrayLimit:g.arrayLimit,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:g.charsetSentinel,comma:typeof e.comma=="boolean"?e.comma:g.comma,decodeDotInKeys:typeof e.decodeDotInKeys=="boolean"?e.decodeDotInKeys:g.decodeDotInKeys,decoder:typeof e.decoder=="function"?e.decoder:g.decoder,delimiter:typeof e.delimiter=="string"||J.isRegExp(e.delimiter)?e.delimiter:g.delimiter,depth:typeof e.depth=="number"||e.depth===!1?+e.depth:g.depth,duplicates:n,ignoreQueryPrefix:e.ignoreQueryPrefix===!0,interpretNumericEntities:typeof e.interpretNumericEntities=="boolean"?e.interpretNumericEntities:g.interpretNumericEntities,parameterLimit:typeof e.parameterLimit=="number"?e.parameterLimit:g.parameterLimit,parseArrays:e.parseArrays!==!1,plainObjects:typeof e.plainObjects=="boolean"?e.plainObjects:g.plainObjects,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:g.strictNullHandling}},ca=function(r,e){var t=fa(e);if(r===""||r===null||typeof r>"u")return t.plainObjects?Object.create(null):{};for(var n=typeof r=="string"?oa(r,t):r,o=t.plainObjects?Object.create(null):{},a=Object.keys(n),i=0;i<a.length;++i){var c=a[i],f=la(c,n[c],t,typeof r=="string");o=J.merge(o,f,t)}return t.allowSparse===!0?o:J.compact(o)},ua=ea,sa=ca,pa=Ve,he={formats:pa,parse:sa,stringify:ua};const qr={config:{baseURL:"https://tv-app-nodejs-latest.onrender.com/api",isAPIMocked:!1}},{config:{baseURL:ze,isAPIMocked:He}}=qr,je=(async()=>{const{default:r}=await Ar(()=>import("./tv.api.service.mock-D3g2i193.js"),__vite__mapDeps([]));return r})(),da=async r=>{try{if(He)return(await je).moviesMock;const e=`?${he.stringify({query:r},{format:"RFC1738"})}`,t=await fetch(`${ze}/movies/search${e}`),{page:n,results:o}=await t.json();return{page:n,results:o}}catch(e){throw new Error(e)}},ma=async r=>{try{return He?(await je).movieMock:await(await fetch(`${ze}/movies/${r}`)).json()}catch(e){throw new Error(e)}},ga=async(r,e)=>{try{if(He)return(await je).moviesMock;const t=`?${he.stringify({timeWindow:r,language:e})}`,n=await fetch(`${ze}/movies/trending${t}`),{page:o,results:a}=await n.json();return{page:o,results:a}}catch(t){throw new Error(t)}},{config:{baseURL:Qe,isAPIMocked:Je}}=qr,Ye=(async()=>{const{default:r}=await Ar(()=>import("./tv.api.service.mock-D3g2i193.js"),__vite__mapDeps([]));return r})(),ha=async r=>{try{if(Je)return(await Ye).tvshowsMock;const e=`?${he.stringify({query:r},{format:"RFC1738"})}`,t=await fetch(`${Qe}/tv-shows/search${e}`),{page:n,results:o}=await t.json();return{page:n,results:o}}catch(e){throw new Error(e)}},ba=async r=>{try{return Je?(await Ye).tvshowMock:await(await fetch(`${Qe}/tv-shows/${r}`)).json()}catch(e){throw new Error(e)}},wa=async(r,e)=>{try{if(Je)return(await Ye).tvshowsMock;const t=`?${he.stringify({timeWindow:r,language:e})}`,n=await fetch(`${Qe}/tv-shows/trending${t}`),{page:o,results:a}=await n.json();return{page:o,results:a}}catch(t){throw new Error(t)}};export{jr as R,va as T,ba as a,da as b,wa as c,ha as d,ga as g,he as l,ma as s};
