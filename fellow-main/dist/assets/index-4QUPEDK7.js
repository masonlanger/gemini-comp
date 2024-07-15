(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
* @vue/shared v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Dr(t,e){const n=new Set(t.split(","));return r=>n.has(r)}const q={},be=[],vt=()=>{},fs=()=>!1,Ln=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),zr=t=>t.startsWith("onUpdate:"),rt=Object.assign,Hr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},cs=Object.prototype.hasOwnProperty,z=(t,e)=>cs.call(t,e),M=Array.isArray,ye=t=>Fn(t)==="[object Map]",Mi=t=>Fn(t)==="[object Set]",F=t=>typeof t=="function",at=t=>typeof t=="string",pe=t=>typeof t=="symbol",J=t=>t!==null&&typeof t=="object",Ri=t=>(J(t)||F(t))&&F(t.then)&&F(t.catch),Li=Object.prototype.toString,Fn=t=>Li.call(t),us=t=>Fn(t).slice(8,-1),Fi=t=>Fn(t)==="[object Object]",Ur=t=>at(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ne=Dr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),jn=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},ds=/-(\w)/g,It=jn(t=>t.replace(ds,(e,n)=>n?n.toUpperCase():"")),ms=/\B([A-Z])/g,Oe=jn(t=>t.replace(ms,"-$1").toLowerCase()),$n=jn(t=>t.charAt(0).toUpperCase()+t.slice(1)),Jn=jn(t=>t?`on${$n(t)}`:""),ue=(t,e)=>!Object.is(t,e),Zn=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ji=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},ps=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Ea;const $i=()=>Ea||(Ea=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Br(t){if(M(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],a=at(r)?bs(r):Br(r);if(a)for(const i in a)e[i]=a[i]}return e}else if(at(t)||J(t))return t}const hs=/;(?![^(]*\))/g,gs=/:([^]+)/,vs=/\/\*[^]*?\*\//g;function bs(t){const e={};return t.replace(vs,"").split(hs).forEach(n=>{if(n){const r=n.split(gs);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Yr(t){let e="";if(at(t))e=t;else if(M(t))for(let n=0;n<t.length;n++){const r=Yr(t[n]);r&&(e+=r+" ")}else if(J(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const ys="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",_s=Dr(ys);function Di(t){return!!t||t===""}const mr=t=>at(t)?t:t==null?"":M(t)||J(t)&&(t.toString===Li||!F(t.toString))?JSON.stringify(t,zi,2):String(t),zi=(t,e)=>e&&e.__v_isRef?zi(t,e.value):ye(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,a],i)=>(n[Qn(r,i)+" =>"]=a,n),{})}:Mi(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Qn(n))}:pe(e)?Qn(e):J(e)&&!M(e)&&!Fi(e)?String(e):e,Qn=(t,e="")=>{var n;return pe(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let yt;class xs{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=yt,!e&&yt&&(this.index=(yt.scopes||(yt.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=yt;try{return yt=this,e()}finally{yt=n}}}on(){yt=this}off(){yt=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function ws(t,e=yt){e&&e.active&&e.effects.push(t)}function As(){return yt}let fe;class Wr{constructor(e,n,r,a){this.fn=e,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=5,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ws(this,a)}get dirty(){if(this._dirtyLevel===2)return!1;if(this._dirtyLevel===3||this._dirtyLevel===4){this._dirtyLevel=1,Zt();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed){if(n.computed.effect._dirtyLevel===2)return!0;if(Os(n.computed),this._dirtyLevel>=5)break}}this._dirtyLevel===1&&(this._dirtyLevel=0),Qt()}return this._dirtyLevel>=5}set dirty(e){this._dirtyLevel=e?5:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Kt,n=fe;try{return Kt=!0,fe=this,this._runnings++,Pa(this),this.fn()}finally{Ca(this),this._runnings--,fe=n,Kt=e}}stop(){this.active&&(Pa(this),Ca(this),this.onStop&&this.onStop(),this.active=!1)}}function Os(t){return t.value}function Pa(t){t._trackId++,t._depsLength=0}function Ca(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)Hi(t.deps[e],t);t.deps.length=t._depsLength}}function Hi(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let Kt=!0,pr=0;const Ui=[];function Zt(){Ui.push(Kt),Kt=!1}function Qt(){const t=Ui.pop();Kt=t===void 0?!0:t}function Vr(){pr++}function Kr(){for(pr--;!pr&&hr.length;)hr.shift()()}function Bi(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const r=t.deps[t._depsLength];r!==e?(r&&Hi(r,t),t.deps[t._depsLength++]=e):t._depsLength++}}const hr=[];function Yi(t,e,n){Vr();for(const r of t.keys()){if(!t.computed&&r.computed&&t.get(r)===r._trackId&&r._runnings>0){r._dirtyLevel=2;continue}let a;r._dirtyLevel<e&&(a??(a=t.get(r)===r._trackId))&&(r._shouldSchedule||(r._shouldSchedule=r._dirtyLevel===0),r.computed&&r._dirtyLevel===2&&(r._shouldSchedule=!0),r._dirtyLevel=e),r._shouldSchedule&&(a??(a=t.get(r)===r._trackId))&&(r.trigger(),(!r._runnings||r.allowRecurse)&&r._dirtyLevel!==3&&(r._shouldSchedule=!1,r.scheduler&&hr.push(r.scheduler)))}Kr()}const Wi=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},gr=new WeakMap,ce=Symbol(""),vr=Symbol("");function dt(t,e,n){if(Kt&&fe){let r=gr.get(t);r||gr.set(t,r=new Map);let a=r.get(n);a||r.set(n,a=Wi(()=>r.delete(n))),Bi(fe,a)}}function Ft(t,e,n,r,a,i){const o=gr.get(t);if(!o)return;let s=[];if(e==="clear")s=[...o.values()];else if(n==="length"&&M(t)){const l=Number(r);o.forEach((c,u)=>{(u==="length"||!pe(u)&&u>=l)&&s.push(c)})}else switch(n!==void 0&&s.push(o.get(n)),e){case"add":M(t)?Ur(n)&&s.push(o.get("length")):(s.push(o.get(ce)),ye(t)&&s.push(o.get(vr)));break;case"delete":M(t)||(s.push(o.get(ce)),ye(t)&&s.push(o.get(vr)));break;case"set":ye(t)&&s.push(o.get(ce));break}Vr();for(const l of s)l&&Yi(l,5);Kr()}const Ss=Dr("__proto__,__v_isRef,__isVue"),Vi=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(pe)),Ia=ks();function ks(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=Y(this);for(let i=0,o=this.length;i<o;i++)dt(r,"get",i+"");const a=r[e](...n);return a===-1||a===!1?r[e](...n.map(Y)):a}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Zt(),Vr();const r=Y(this)[e].apply(this,n);return Kr(),Qt(),r}}),t}function Es(t){pe(t)||(t=String(t));const e=Y(this);return dt(e,"has",t),e.hasOwnProperty(t)}class Ki{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){const a=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!a;if(n==="__v_isReadonly")return a;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(a?i?zs:Ji:i?Xi:qi).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=M(e);if(!a){if(o&&z(Ia,n))return Reflect.get(Ia,n,r);if(n==="hasOwnProperty")return Es}const s=Reflect.get(e,n,r);return(pe(n)?Vi.has(n):Ss(n))||(a||dt(e,"get",n),i)?s:pt(s)?o&&Ur(n)?s:s.value:J(s)?a?Zi(s):Xr(s):s}}class Gi extends Ki{constructor(e=!1){super(!1,e)}set(e,n,r,a){let i=e[n];if(!this._isShallow){const l=En(i);if(!br(r)&&!En(r)&&(i=Y(i),r=Y(r)),!M(e)&&pt(i)&&!pt(r))return l?!1:(i.value=r,!0)}const o=M(e)&&Ur(n)?Number(n)<e.length:z(e,n),s=Reflect.set(e,n,r,a);return e===Y(a)&&(o?ue(r,i)&&Ft(e,"set",n,r):Ft(e,"add",n,r)),s}deleteProperty(e,n){const r=z(e,n);e[n];const a=Reflect.deleteProperty(e,n);return a&&r&&Ft(e,"delete",n,void 0),a}has(e,n){const r=Reflect.has(e,n);return(!pe(n)||!Vi.has(n))&&dt(e,"has",n),r}ownKeys(e){return dt(e,"iterate",M(e)?"length":ce),Reflect.ownKeys(e)}}class Ps extends Ki{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Cs=new Gi,Is=new Ps,Ts=new Gi(!0);const Gr=t=>t,Dn=t=>Reflect.getPrototypeOf(t);function an(t,e,n=!1,r=!1){t=t.__v_raw;const a=Y(t),i=Y(e);n||(ue(e,i)&&dt(a,"get",e),dt(a,"get",i));const{has:o}=Dn(a),s=r?Gr:n?Qr:Zr;if(o.call(a,e))return s(t.get(e));if(o.call(a,i))return s(t.get(i));t!==a&&t.get(e)}function on(t,e=!1){const n=this.__v_raw,r=Y(n),a=Y(t);return e||(ue(t,a)&&dt(r,"has",t),dt(r,"has",a)),t===a?n.has(t):n.has(t)||n.has(a)}function sn(t,e=!1){return t=t.__v_raw,!e&&dt(Y(t),"iterate",ce),Reflect.get(t,"size",t)}function Ta(t){t=Y(t);const e=Y(this);return Dn(e).has.call(e,t)||(e.add(t),Ft(e,"add",t,t)),this}function Na(t,e){e=Y(e);const n=Y(this),{has:r,get:a}=Dn(n);let i=r.call(n,t);i||(t=Y(t),i=r.call(n,t));const o=a.call(n,t);return n.set(t,e),i?ue(e,o)&&Ft(n,"set",t,e):Ft(n,"add",t,e),this}function Ma(t){const e=Y(this),{has:n,get:r}=Dn(e);let a=n.call(e,t);a||(t=Y(t),a=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return a&&Ft(e,"delete",t,void 0),i}function Ra(){const t=Y(this),e=t.size!==0,n=t.clear();return e&&Ft(t,"clear",void 0,void 0),n}function ln(t,e){return function(r,a){const i=this,o=i.__v_raw,s=Y(o),l=e?Gr:t?Qr:Zr;return!t&&dt(s,"iterate",ce),o.forEach((c,u)=>r.call(a,l(c),l(u),i))}}function fn(t,e,n){return function(...r){const a=this.__v_raw,i=Y(a),o=ye(i),s=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=a[t](...r),u=n?Gr:e?Qr:Zr;return!e&&dt(i,"iterate",l?vr:ce),{next(){const{value:m,done:b}=c.next();return b?{value:m,done:b}:{value:s?[u(m[0]),u(m[1])]:u(m),done:b}},[Symbol.iterator](){return this}}}}function Bt(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Ns(){const t={get(i){return an(this,i)},get size(){return sn(this)},has:on,add:Ta,set:Na,delete:Ma,clear:Ra,forEach:ln(!1,!1)},e={get(i){return an(this,i,!1,!0)},get size(){return sn(this)},has:on,add:Ta,set:Na,delete:Ma,clear:Ra,forEach:ln(!1,!0)},n={get(i){return an(this,i,!0)},get size(){return sn(this,!0)},has(i){return on.call(this,i,!0)},add:Bt("add"),set:Bt("set"),delete:Bt("delete"),clear:Bt("clear"),forEach:ln(!0,!1)},r={get(i){return an(this,i,!0,!0)},get size(){return sn(this,!0)},has(i){return on.call(this,i,!0)},add:Bt("add"),set:Bt("set"),delete:Bt("delete"),clear:Bt("clear"),forEach:ln(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=fn(i,!1,!1),n[i]=fn(i,!0,!1),e[i]=fn(i,!1,!0),r[i]=fn(i,!0,!0)}),[t,n,e,r]}const[Ms,Rs,Ls,Fs]=Ns();function qr(t,e){const n=e?t?Fs:Ls:t?Rs:Ms;return(r,a,i)=>a==="__v_isReactive"?!t:a==="__v_isReadonly"?t:a==="__v_raw"?r:Reflect.get(z(n,a)&&a in r?n:r,a,i)}const js={get:qr(!1,!1)},$s={get:qr(!1,!0)},Ds={get:qr(!0,!1)};const qi=new WeakMap,Xi=new WeakMap,Ji=new WeakMap,zs=new WeakMap;function Hs(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Us(t){return t.__v_skip||!Object.isExtensible(t)?0:Hs(us(t))}function Xr(t){return En(t)?t:Jr(t,!1,Cs,js,qi)}function Bs(t){return Jr(t,!1,Ts,$s,Xi)}function Zi(t){return Jr(t,!0,Is,Ds,Ji)}function Jr(t,e,n,r,a){if(!J(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=a.get(t);if(i)return i;const o=Us(t);if(o===0)return t;const s=new Proxy(t,o===2?r:n);return a.set(t,s),s}function Me(t){return En(t)?Me(t.__v_raw):!!(t&&t.__v_isReactive)}function En(t){return!!(t&&t.__v_isReadonly)}function br(t){return!!(t&&t.__v_isShallow)}function Qi(t){return t?!!t.__v_raw:!1}function Y(t){const e=t&&t.__v_raw;return e?Y(e):t}function Ys(t){return Object.isExtensible(t)&&ji(t,"__v_skip",!0),t}const Zr=t=>J(t)?Xr(t):t,Qr=t=>J(t)?Zi(t):t;class to{constructor(e,n,r,a){this.getter=e,this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Wr(()=>e(this._value),()=>tr(this,this.effect._dirtyLevel===3?3:4)),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const e=Y(this);return(!e._cacheable||e.effect.dirty)&&ue(e._value,e._value=e.effect.run())&&tr(e,5),Vs(e),e.effect._dirtyLevel>=2&&tr(e,3),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Ws(t,e,n=!1){let r,a;const i=F(t);return i?(r=t,a=vt):(r=t.get,a=t.set),new to(r,a,i||!a,n)}function Vs(t){var e;Kt&&fe&&(t=Y(t),Bi(fe,(e=t.dep)!=null?e:t.dep=Wi(()=>t.dep=void 0,t instanceof to?t:void 0)))}function tr(t,e=5,n,r){t=Y(t);const a=t.dep;a&&Yi(a,e)}function pt(t){return!!(t&&t.__v_isRef===!0)}function eo(t){return pt(t)?t.value:t}const Ks={get:(t,e,n)=>eo(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const a=t[e];return pt(a)&&!pt(n)?(a.value=n,!0):Reflect.set(t,e,n,r)}};function no(t){return Me(t)?t:new Proxy(t,Ks)}/**
* @vue/runtime-core v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gt(t,e,n,r){try{return r?t(...r):t()}catch(a){zn(a,e,n)}}function At(t,e,n,r){if(F(t)){const a=Gt(t,e,n,r);return a&&Ri(a)&&a.catch(i=>{zn(i,e,n)}),a}if(M(t)){const a=[];for(let i=0;i<t.length;i++)a.push(At(t[i],e,n,r));return a}}function zn(t,e,n,r=!0){const a=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](t,o,s)===!1)return}i=i.parent}const l=e.appContext.config.errorHandler;if(l){Zt(),Gt(l,null,10,[t,o,s]),Qt();return}}Gs(t,n,a,r)}function Gs(t,e,n,r=!0){console.error(t)}let De=!1,yr=!1;const it=[];let Pt=0;const _e=[];let Wt=null,ie=0;const ro=Promise.resolve();let ta=null;function qs(t){const e=ta||ro;return t?e.then(this?t.bind(this):t):e}function Xs(t){let e=Pt+1,n=it.length;for(;e<n;){const r=e+n>>>1,a=it[r],i=ze(a);i<t||i===t&&a.pre?e=r+1:n=r}return e}function ea(t){(!it.length||!it.includes(t,De&&t.allowRecurse?Pt+1:Pt))&&(t.id==null?it.push(t):it.splice(Xs(t.id),0,t),ao())}function ao(){!De&&!yr&&(yr=!0,ta=ro.then(oo))}function Js(t){const e=it.indexOf(t);e>Pt&&it.splice(e,1)}function Zs(t){M(t)?_e.push(...t):(!Wt||!Wt.includes(t,t.allowRecurse?ie+1:ie))&&_e.push(t),ao()}function La(t,e,n=De?Pt+1:0){for(;n<it.length;n++){const r=it[n];if(r&&r.pre){if(t&&r.id!==t.uid)continue;it.splice(n,1),n--,r()}}}function io(t){if(_e.length){const e=[...new Set(_e)].sort((n,r)=>ze(n)-ze(r));if(_e.length=0,Wt){Wt.push(...e);return}for(Wt=e,ie=0;ie<Wt.length;ie++){const n=Wt[ie];n.active!==!1&&n()}Wt=null,ie=0}}const ze=t=>t.id==null?1/0:t.id,Qs=(t,e)=>{const n=ze(t)-ze(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function oo(t){yr=!1,De=!0,it.sort(Qs);try{for(Pt=0;Pt<it.length;Pt++){const e=it[Pt];e&&e.active!==!1&&Gt(e,null,14)}}finally{Pt=0,it.length=0,io(),De=!1,ta=null,(it.length||_e.length)&&oo()}}function tl(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||q;let a=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:b}=r[u]||q;b&&(a=n.map(w=>at(w)?w.trim():w)),m&&(a=n.map(ps))}let s,l=r[s=Jn(e)]||r[s=Jn(It(e))];!l&&i&&(l=r[s=Jn(Oe(e))]),l&&At(l,t,6,a);const c=r[s+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[s])return;t.emitted[s]=!0,At(c,t,6,a)}}function so(t,e,n=!1){const r=e.emitsCache,a=r.get(t);if(a!==void 0)return a;const i=t.emits;let o={},s=!1;if(!F(t)){const l=c=>{const u=so(c,e,!0);u&&(s=!0,rt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!s?(J(t)&&r.set(t,null),null):(M(i)?i.forEach(l=>o[l]=null):rt(o,i),J(t)&&r.set(t,o),o)}function Hn(t,e){return!t||!Ln(e)?!1:(e=e.slice(2).replace(/Once$/,""),z(t,e[0].toLowerCase()+e.slice(1))||z(t,Oe(e))||z(t,e))}let _t=null,lo=null;function Pn(t){const e=_t;return _t=t,lo=t&&t.type.__scopeId||null,e}function el(t,e=_t,n){if(!e||t._n)return t;const r=(...a)=>{r._d&&Ka(-1);const i=Pn(e);let o;try{o=t(...a)}finally{Pn(i),r._d&&Ka(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function er(t){const{type:e,vnode:n,proxy:r,withProxy:a,propsOptions:[i],slots:o,attrs:s,emit:l,render:c,renderCache:u,props:m,data:b,setupState:w,ctx:j,inheritAttrs:N}=t,B=Pn(t);let A,S;try{if(n.shapeFlag&4){const $=a||r,H=$;A=Et(c.call(H,$,u,m,w,b,j)),S=s}else{const $=e;A=Et($.length>1?$(m,{attrs:s,slots:o,emit:l}):$(m,null)),S=e.props?s:nl(s)}}catch($){Fe.length=0,zn($,t,1),A=nt(He)}let C=A;if(S&&N!==!1){const $=Object.keys(S),{shapeFlag:H}=C;$.length&&H&7&&(i&&$.some(zr)&&(S=rl(S,i)),C=we(C,S,!1,!0))}return n.dirs&&(C=we(C,null,!1,!0),C.dirs=C.dirs?C.dirs.concat(n.dirs):n.dirs),n.transition&&(C.transition=n.transition),A=C,Pn(B),A}const nl=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ln(n))&&((e||(e={}))[n]=t[n]);return e},rl=(t,e)=>{const n={};for(const r in t)(!zr(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function al(t,e,n){const{props:r,children:a,component:i}=t,{props:o,children:s,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Fa(r,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let m=0;m<u.length;m++){const b=u[m];if(o[b]!==r[b]&&!Hn(c,b))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Fa(r,o,c):!0:!!o;return!1}function Fa(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(e[i]!==t[i]&&!Hn(n,i))return!0}return!1}function il({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const ol="components";function sl(t,e){return fl(ol,t,!0,e)||t}const ll=Symbol.for("v-ndc");function fl(t,e,n=!0,r=!1){const a=_t||ot;if(a){const i=a.type;{const s=sf(i,!1);if(s&&(s===e||s===It(e)||s===$n(It(e))))return i}const o=ja(a[t]||i[t],e)||ja(a.appContext[t],e);return!o&&r?i:o}}function ja(t,e){return t&&(t[e]||t[It(e)]||t[$n(It(e))])}const cl=t=>t.__isSuspense;function ul(t,e){e&&e.pendingBranch?M(t)?e.effects.push(...t):e.effects.push(t):Zs(t)}function Un(t,e,n=ot,r=!1){if(n){const a=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Zt();const s=Xe(n),l=At(e,n,t,o);return s(),Qt(),l});return r?a.unshift(i):a.push(i),i}}const Ht=t=>(e,n=ot)=>{(!Yn||t==="sp")&&Un(t,(...r)=>e(...r),n)},dl=Ht("bm"),ml=Ht("m"),pl=Ht("bu"),hl=Ht("u"),gl=Ht("bum"),fo=Ht("um"),vl=Ht("sp"),bl=Ht("rtg"),yl=Ht("rtc");function _l(t,e=ot){Un("ec",t,e)}function ne(t,e,n,r){const a=t.dirs,i=e&&e.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let l=s.dir[r];l&&(Zt(),At(l,n,8,[t.el,s,t,e]),Qt())}}/*! #__NO_SIDE_EFFECTS__ */function xl(t,e){return F(t)?rt({name:t.name},e,{setup:t}):t}const _n=t=>!!t.type.__asyncLoader,_r=t=>t?Co(t)?ia(t):_r(t.parent):null,Re=rt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>_r(t.parent),$root:t=>_r(t.root),$emit:t=>t.emit,$options:t=>na(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,ea(t.update)}),$nextTick:t=>t.n||(t.n=qs.bind(t.proxy)),$watch:t=>Ul.bind(t)}),nr=(t,e)=>t!==q&&!t.__isScriptSetup&&z(t,e),wl={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:l}=t;let c;if(e[0]!=="$"){const w=o[e];if(w!==void 0)switch(w){case 1:return r[e];case 2:return a[e];case 4:return n[e];case 3:return i[e]}else{if(nr(r,e))return o[e]=1,r[e];if(a!==q&&z(a,e))return o[e]=2,a[e];if((c=t.propsOptions[0])&&z(c,e))return o[e]=3,i[e];if(n!==q&&z(n,e))return o[e]=4,n[e];xr&&(o[e]=0)}}const u=Re[e];let m,b;if(u)return e==="$attrs"&&dt(t.attrs,"get",""),u(t);if((m=s.__cssModules)&&(m=m[e]))return m;if(n!==q&&z(n,e))return o[e]=4,n[e];if(b=l.config.globalProperties,z(b,e))return b[e]},set({_:t},e,n){const{data:r,setupState:a,ctx:i}=t;return nr(a,e)?(a[e]=n,!0):r!==q&&z(r,e)?(r[e]=n,!0):z(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||t!==q&&z(t,o)||nr(e,o)||(s=i[0])&&z(s,o)||z(r,o)||z(Re,o)||z(a.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:z(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function $a(t){return M(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let xr=!0;function Al(t){const e=na(t),n=t.proxy,r=t.ctx;xr=!1,e.beforeCreate&&Da(e.beforeCreate,t,"bc");const{data:a,computed:i,methods:o,watch:s,provide:l,inject:c,created:u,beforeMount:m,mounted:b,beforeUpdate:w,updated:j,activated:N,deactivated:B,beforeDestroy:A,beforeUnmount:S,destroyed:C,unmounted:$,render:H,renderTracked:L,renderTriggered:Q,errorCaptured:ft,serverPrefetch:gt,expose:Tt,inheritAttrs:ke,components:tn,directives:en,filters:qn}=e;if(c&&Ol(c,r,null),o)for(const X in o){const W=o[X];F(W)&&(r[X]=W.bind(n))}if(a){const X=a.call(n,n);J(X)&&(t.data=Xr(X))}if(xr=!0,i)for(const X in i){const W=i[X],te=F(W)?W.bind(n,n):F(W.get)?W.get.bind(n,n):vt,nn=!F(W)&&F(W.set)?W.set.bind(n):vt,ee=ae({get:te,set:nn});Object.defineProperty(r,X,{enumerable:!0,configurable:!0,get:()=>ee.value,set:Ot=>ee.value=Ot})}if(s)for(const X in s)co(s[X],r,n,X);if(l){const X=F(l)?l.call(n):l;Reflect.ownKeys(X).forEach(W=>{Il(W,X[W])})}u&&Da(u,t,"c");function st(X,W){M(W)?W.forEach(te=>X(te.bind(n))):W&&X(W.bind(n))}if(st(dl,m),st(ml,b),st(pl,w),st(hl,j),st(Bl,N),st(Yl,B),st(_l,ft),st(yl,L),st(bl,Q),st(gl,S),st(fo,$),st(vl,gt),M(Tt))if(Tt.length){const X=t.exposed||(t.exposed={});Tt.forEach(W=>{Object.defineProperty(X,W,{get:()=>n[W],set:te=>n[W]=te})})}else t.exposed||(t.exposed={});H&&t.render===vt&&(t.render=H),ke!=null&&(t.inheritAttrs=ke),tn&&(t.components=tn),en&&(t.directives=en)}function Ol(t,e,n=vt){M(t)&&(t=wr(t));for(const r in t){const a=t[r];let i;J(a)?"default"in a?i=xn(a.from||r,a.default,!0):i=xn(a.from||r):i=xn(a),pt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Da(t,e,n){At(M(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function co(t,e,n,r){const a=r.includes(".")?Oo(n,r):()=>n[r];if(at(t)){const i=e[t];F(i)&&wn(a,i)}else if(F(t))wn(a,t.bind(n));else if(J(t))if(M(t))t.forEach(i=>co(i,e,n,r));else{const i=F(t.handler)?t.handler.bind(n):e[t.handler];F(i)&&wn(a,i,t)}}function na(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,s=i.get(e);let l;return s?l=s:!a.length&&!n&&!r?l=e:(l={},a.length&&a.forEach(c=>Cn(l,c,o,!0)),Cn(l,e,o)),J(e)&&i.set(e,l),l}function Cn(t,e,n,r=!1){const{mixins:a,extends:i}=e;i&&Cn(t,i,n,!0),a&&a.forEach(o=>Cn(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const s=Sl[o]||n&&n[o];t[o]=s?s(t[o],e[o]):e[o]}return t}const Sl={data:za,props:Ha,emits:Ha,methods:Ie,computed:Ie,beforeCreate:lt,created:lt,beforeMount:lt,mounted:lt,beforeUpdate:lt,updated:lt,beforeDestroy:lt,beforeUnmount:lt,destroyed:lt,unmounted:lt,activated:lt,deactivated:lt,errorCaptured:lt,serverPrefetch:lt,components:Ie,directives:Ie,watch:El,provide:za,inject:kl};function za(t,e){return e?t?function(){return rt(F(t)?t.call(this,this):t,F(e)?e.call(this,this):e)}:e:t}function kl(t,e){return Ie(wr(t),wr(e))}function wr(t){if(M(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function lt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ie(t,e){return t?rt(Object.create(null),t,e):e}function Ha(t,e){return t?M(t)&&M(e)?[...new Set([...t,...e])]:rt(Object.create(null),$a(t),$a(e??{})):e}function El(t,e){if(!t)return e;if(!e)return t;const n=rt(Object.create(null),t);for(const r in e)n[r]=lt(t[r],e[r]);return n}function uo(){return{app:null,config:{isNativeTag:fs,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Pl=0;function Cl(t,e){return function(r,a=null){F(r)||(r=rt({},r)),a!=null&&!J(a)&&(a=null);const i=uo(),o=new WeakSet;let s=!1;const l=i.app={_uid:Pl++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:cf,get config(){return i.config},set config(c){},use(c,...u){return o.has(c)||(c&&F(c.install)?(o.add(c),c.install(l,...u)):F(c)&&(o.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,m){if(!s){const b=nt(r,a);return b.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),u&&e?e(b,c):t(b,c,m),s=!0,l._container=c,c.__vue_app__=l,ia(b.component)}},unmount(){s&&(t(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l},runWithContext(c){const u=Le;Le=l;try{return c()}finally{Le=u}}};return l}}let Le=null;function Il(t,e){if(ot){let n=ot.provides;const r=ot.parent&&ot.parent.provides;r===n&&(n=ot.provides=Object.create(r)),n[t]=e}}function xn(t,e,n=!1){const r=ot||_t;if(r||Le){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Le._context.provides;if(a&&t in a)return a[t];if(arguments.length>1)return n&&F(e)?e.call(r&&r.proxy):e}}const mo={},po=()=>Object.create(mo),ho=t=>Object.getPrototypeOf(t)===mo;function Tl(t,e,n,r=!1){const a={},i=po();t.propsDefaults=Object.create(null),go(t,e,a,i);for(const o in t.propsOptions[0])o in a||(a[o]=void 0);n?t.props=r?a:Bs(a):t.type.props?t.props=a:t.props=i,t.attrs=i}function Nl(t,e,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=t,s=Y(a),[l]=t.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let m=0;m<u.length;m++){let b=u[m];if(Hn(t.emitsOptions,b))continue;const w=e[b];if(l)if(z(i,b))w!==i[b]&&(i[b]=w,c=!0);else{const j=It(b);a[j]=Ar(l,s,j,w,t,!1)}else w!==i[b]&&(i[b]=w,c=!0)}}}else{go(t,e,a,i)&&(c=!0);let u;for(const m in s)(!e||!z(e,m)&&((u=Oe(m))===m||!z(e,u)))&&(l?n&&(n[m]!==void 0||n[u]!==void 0)&&(a[m]=Ar(l,s,m,void 0,t,!0)):delete a[m]);if(i!==s)for(const m in i)(!e||!z(e,m))&&(delete i[m],c=!0)}c&&Ft(t.attrs,"set","")}function go(t,e,n,r){const[a,i]=t.propsOptions;let o=!1,s;if(e)for(let l in e){if(Ne(l))continue;const c=e[l];let u;a&&z(a,u=It(l))?!i||!i.includes(u)?n[u]=c:(s||(s={}))[u]=c:Hn(t.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(i){const l=Y(n),c=s||q;for(let u=0;u<i.length;u++){const m=i[u];n[m]=Ar(a,l,m,c[m],t,!z(c,m))}}return o}function Ar(t,e,n,r,a,i){const o=t[n];if(o!=null){const s=z(o,"default");if(s&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&F(l)){const{propsDefaults:c}=a;if(n in c)r=c[n];else{const u=Xe(a);r=c[n]=l.call(null,e),u()}}else r=l}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===Oe(n))&&(r=!0))}return r}function vo(t,e,n=!1){const r=e.propsCache,a=r.get(t);if(a)return a;const i=t.props,o={},s=[];let l=!1;if(!F(t)){const u=m=>{l=!0;const[b,w]=vo(m,e,!0);rt(o,b),w&&s.push(...w)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return J(t)&&r.set(t,be),be;if(M(i))for(let u=0;u<i.length;u++){const m=It(i[u]);Ua(m)&&(o[m]=q)}else if(i)for(const u in i){const m=It(u);if(Ua(m)){const b=i[u],w=o[m]=M(b)||F(b)?{type:b}:rt({},b);if(w){const j=Wa(Boolean,w.type),N=Wa(String,w.type);w[0]=j>-1,w[1]=N<0||j<N,(j>-1||z(w,"default"))&&s.push(m)}}}const c=[o,s];return J(t)&&r.set(t,c),c}function Ua(t){return t[0]!=="$"&&!Ne(t)}function Ba(t){return t===null?"null":typeof t=="function"?t.name||"":typeof t=="object"&&t.constructor&&t.constructor.name||""}function Ya(t,e){return Ba(t)===Ba(e)}function Wa(t,e){return M(e)?e.findIndex(n=>Ya(n,t)):F(e)&&Ya(e,t)?0:-1}const bo=t=>t[0]==="_"||t==="$stable",ra=t=>M(t)?t.map(Et):[Et(t)],Ml=(t,e,n)=>{if(e._n)return e;const r=el((...a)=>ra(e(...a)),n);return r._c=!1,r},yo=(t,e,n)=>{const r=t._ctx;for(const a in t){if(bo(a))continue;const i=t[a];if(F(i))e[a]=Ml(a,i,r);else if(i!=null){const o=ra(i);e[a]=()=>o}}},_o=(t,e)=>{const n=ra(e);t.slots.default=()=>n},Rl=(t,e)=>{const n=t.slots=po();if(t.vnode.shapeFlag&32){const r=e._;r?(rt(n,e),ji(n,"_",r,!0)):yo(e,n)}else e&&_o(t,e)},Ll=(t,e,n)=>{const{vnode:r,slots:a}=t;let i=!0,o=q;if(r.shapeFlag&32){const s=e._;s?n&&s===1?i=!1:(rt(a,e),!n&&s===1&&delete a._):(i=!e.$stable,yo(e,a)),o=e}else e&&(_o(t,e),o={default:1});if(i)for(const s in a)!bo(s)&&o[s]==null&&delete a[s]};function Or(t,e,n,r,a=!1){if(M(t)){t.forEach((b,w)=>Or(b,e&&(M(e)?e[w]:e),n,r,a));return}if(_n(r)&&!a)return;const i=r.shapeFlag&4?ia(r.component):r.el,o=a?null:i,{i:s,r:l}=t,c=e&&e.r,u=s.refs===q?s.refs={}:s.refs,m=s.setupState;if(c!=null&&c!==l&&(at(c)?(u[c]=null,z(m,c)&&(m[c]=null)):pt(c)&&(c.value=null)),F(l))Gt(l,s,12,[o,u]);else{const b=at(l),w=pt(l);if(b||w){const j=()=>{if(t.f){const N=b?z(m,l)?m[l]:u[l]:l.value;a?M(N)&&Hr(N,i):M(N)?N.includes(i)||N.push(i):b?(u[l]=[i],z(m,l)&&(m[l]=u[l])):(l.value=[i],t.k&&(u[t.k]=l.value))}else b?(u[l]=o,z(m,l)&&(m[l]=o)):w&&(l.value=o,t.k&&(u[t.k]=o))};o?(j.id=-1,ut(j,n)):j()}}}const ut=ul;function Fl(t){return jl(t)}function jl(t,e){const n=$i();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:l,setText:c,setElementText:u,parentNode:m,nextSibling:b,setScopeId:w=vt,insertStaticContent:j}=t,N=(f,d,p,h=null,g=null,_=null,O=void 0,y=null,x=!!d.dynamicChildren)=>{if(f===d)return;f&&!Ce(f,d)&&(h=rn(f),Ot(f,g,_,!0),f=null),d.patchFlag===-2&&(x=!1,d.dynamicChildren=null);const{type:v,ref:E,shapeFlag:T}=d;switch(v){case Bn:B(f,d,p,h);break;case He:A(f,d,p,h);break;case ar:f==null&&S(d,p,h,O);break;case Rt:tn(f,d,p,h,g,_,O,y,x);break;default:T&1?H(f,d,p,h,g,_,O,y,x):T&6?en(f,d,p,h,g,_,O,y,x):(T&64||T&128)&&v.process(f,d,p,h,g,_,O,y,x,Ee)}E!=null&&g&&Or(E,f&&f.ref,_,d||f,!d)},B=(f,d,p,h)=>{if(f==null)r(d.el=s(d.children),p,h);else{const g=d.el=f.el;d.children!==f.children&&c(g,d.children)}},A=(f,d,p,h)=>{f==null?r(d.el=l(d.children||""),p,h):d.el=f.el},S=(f,d,p,h)=>{[f.el,f.anchor]=j(f.children,d,p,h,f.el,f.anchor)},C=({el:f,anchor:d},p,h)=>{let g;for(;f&&f!==d;)g=b(f),r(f,p,h),f=g;r(d,p,h)},$=({el:f,anchor:d})=>{let p;for(;f&&f!==d;)p=b(f),a(f),f=p;a(d)},H=(f,d,p,h,g,_,O,y,x)=>{d.type==="svg"?O="svg":d.type==="math"&&(O="mathml"),f==null?L(d,p,h,g,_,O,y,x):gt(f,d,g,_,O,y,x)},L=(f,d,p,h,g,_,O,y)=>{let x,v;const{props:E,shapeFlag:T,transition:I,dirs:R}=f;if(x=f.el=o(f.type,_,E&&E.is,E),T&8?u(x,f.children):T&16&&ft(f.children,x,null,h,g,rr(f,_),O,y),R&&ne(f,null,h,"created"),Q(x,f,f.scopeId,O,h),E){for(const V in E)V!=="value"&&!Ne(V)&&i(x,V,null,E[V],_,f.children,h,g,Nt);"value"in E&&i(x,"value",null,E.value,_),(v=E.onVnodeBeforeMount)&&kt(v,h,f)}R&&ne(f,null,h,"beforeMount");const D=$l(g,I);D&&I.beforeEnter(x),r(x,d,p),((v=E&&E.onVnodeMounted)||D||R)&&ut(()=>{v&&kt(v,h,f),D&&I.enter(x),R&&ne(f,null,h,"mounted")},g)},Q=(f,d,p,h,g)=>{if(p&&w(f,p),h)for(let _=0;_<h.length;_++)w(f,h[_]);if(g){let _=g.subTree;if(d===_){const O=g.vnode;Q(f,O,O.scopeId,O.slotScopeIds,g.parent)}}},ft=(f,d,p,h,g,_,O,y,x=0)=>{for(let v=x;v<f.length;v++){const E=f[v]=y?Vt(f[v]):Et(f[v]);N(null,E,d,p,h,g,_,O,y)}},gt=(f,d,p,h,g,_,O)=>{const y=d.el=f.el;let{patchFlag:x,dynamicChildren:v,dirs:E}=d;x|=f.patchFlag&16;const T=f.props||q,I=d.props||q;let R;if(p&&re(p,!1),(R=I.onVnodeBeforeUpdate)&&kt(R,p,d,f),E&&ne(d,f,p,"beforeUpdate"),p&&re(p,!0),v?Tt(f.dynamicChildren,v,y,p,h,rr(d,g),_):O||W(f,d,y,null,p,h,rr(d,g),_,!1),x>0){if(x&16)ke(y,d,T,I,p,h,g);else if(x&2&&T.class!==I.class&&i(y,"class",null,I.class,g),x&4&&i(y,"style",T.style,I.style,g),x&8){const D=d.dynamicProps;for(let V=0;V<D.length;V++){const U=D[V],et=T[U],bt=I[U];(bt!==et||U==="value")&&i(y,U,et,bt,g,f.children,p,h,Nt)}}x&1&&f.children!==d.children&&u(y,d.children)}else!O&&v==null&&ke(y,d,T,I,p,h,g);((R=I.onVnodeUpdated)||E)&&ut(()=>{R&&kt(R,p,d,f),E&&ne(d,f,p,"updated")},h)},Tt=(f,d,p,h,g,_,O)=>{for(let y=0;y<d.length;y++){const x=f[y],v=d[y],E=x.el&&(x.type===Rt||!Ce(x,v)||x.shapeFlag&70)?m(x.el):p;N(x,v,E,null,h,g,_,O,!0)}},ke=(f,d,p,h,g,_,O)=>{if(p!==h){if(p!==q)for(const y in p)!Ne(y)&&!(y in h)&&i(f,y,p[y],null,O,d.children,g,_,Nt);for(const y in h){if(Ne(y))continue;const x=h[y],v=p[y];x!==v&&y!=="value"&&i(f,y,v,x,O,d.children,g,_,Nt)}"value"in h&&i(f,"value",p.value,h.value,O)}},tn=(f,d,p,h,g,_,O,y,x)=>{const v=d.el=f?f.el:s(""),E=d.anchor=f?f.anchor:s("");let{patchFlag:T,dynamicChildren:I,slotScopeIds:R}=d;R&&(y=y?y.concat(R):R),f==null?(r(v,p,h),r(E,p,h),ft(d.children||[],p,E,g,_,O,y,x)):T>0&&T&64&&I&&f.dynamicChildren?(Tt(f.dynamicChildren,I,p,g,_,O,y),(d.key!=null||g&&d===g.subTree)&&xo(f,d,!0)):W(f,d,p,E,g,_,O,y,x)},en=(f,d,p,h,g,_,O,y,x)=>{d.slotScopeIds=y,f==null?d.shapeFlag&512?g.ctx.activate(d,p,h,O,x):qn(d,p,h,g,_,O,x):ya(f,d,x)},qn=(f,d,p,h,g,_,O)=>{const y=f.component=ef(f,h,g);if(So(f)&&(y.ctx.renderer=Ee),nf(y),y.asyncDep){if(g&&g.registerDep(y,st,O),!f.el){const x=y.subTree=nt(He);A(null,x,d,p)}}else st(y,f,d,p,g,_,O)},ya=(f,d,p)=>{const h=d.component=f.component;if(al(f,d,p))if(h.asyncDep&&!h.asyncResolved){X(h,d,p);return}else h.next=d,Js(h.update),h.effect.dirty=!0,h.update();else d.el=f.el,h.vnode=d},st=(f,d,p,h,g,_,O)=>{const y=()=>{if(f.isMounted){let{next:E,bu:T,u:I,parent:R,vnode:D}=f;{const he=wo(f);if(he){E&&(E.el=D.el,X(f,E,O)),he.asyncDep.then(()=>{f.isUnmounted||y()});return}}let V=E,U;re(f,!1),E?(E.el=D.el,X(f,E,O)):E=D,T&&Zn(T),(U=E.props&&E.props.onVnodeBeforeUpdate)&&kt(U,R,E,D),re(f,!0);const et=er(f),bt=f.subTree;f.subTree=et,N(bt,et,m(bt.el),rn(bt),f,g,_),E.el=et.el,V===null&&il(f,et.el),I&&ut(I,g),(U=E.props&&E.props.onVnodeUpdated)&&ut(()=>kt(U,R,E,D),g)}else{let E;const{el:T,props:I}=d,{bm:R,m:D,parent:V}=f,U=_n(d);if(re(f,!1),R&&Zn(R),!U&&(E=I&&I.onVnodeBeforeMount)&&kt(E,V,d),re(f,!0),T&&Aa){const et=()=>{f.subTree=er(f),Aa(T,f.subTree,f,g,null)};U?d.type.__asyncLoader().then(()=>!f.isUnmounted&&et()):et()}else{const et=f.subTree=er(f);N(null,et,p,h,f,g,_),d.el=et.el}if(D&&ut(D,g),!U&&(E=I&&I.onVnodeMounted)){const et=d;ut(()=>kt(E,V,et),g)}(d.shapeFlag&256||V&&_n(V.vnode)&&V.vnode.shapeFlag&256)&&f.a&&ut(f.a,g),f.isMounted=!0,d=p=h=null}},x=f.effect=new Wr(y,vt,()=>ea(v),f.scope),v=f.update=()=>{x.dirty&&x.run()};v.id=f.uid,re(f,!0),v()},X=(f,d,p)=>{d.component=f;const h=f.vnode.props;f.vnode=d,f.next=null,Nl(f,d.props,h,p),Ll(f,d.children,p),Zt(),La(f),Qt()},W=(f,d,p,h,g,_,O,y,x=!1)=>{const v=f&&f.children,E=f?f.shapeFlag:0,T=d.children,{patchFlag:I,shapeFlag:R}=d;if(I>0){if(I&128){nn(v,T,p,h,g,_,O,y,x);return}else if(I&256){te(v,T,p,h,g,_,O,y,x);return}}R&8?(E&16&&Nt(v,g,_),T!==v&&u(p,T)):E&16?R&16?nn(v,T,p,h,g,_,O,y,x):Nt(v,g,_,!0):(E&8&&u(p,""),R&16&&ft(T,p,h,g,_,O,y,x))},te=(f,d,p,h,g,_,O,y,x)=>{f=f||be,d=d||be;const v=f.length,E=d.length,T=Math.min(v,E);let I;for(I=0;I<T;I++){const R=d[I]=x?Vt(d[I]):Et(d[I]);N(f[I],R,p,null,g,_,O,y,x)}v>E?Nt(f,g,_,!0,!1,T):ft(d,p,h,g,_,O,y,x,T)},nn=(f,d,p,h,g,_,O,y,x)=>{let v=0;const E=d.length;let T=f.length-1,I=E-1;for(;v<=T&&v<=I;){const R=f[v],D=d[v]=x?Vt(d[v]):Et(d[v]);if(Ce(R,D))N(R,D,p,null,g,_,O,y,x);else break;v++}for(;v<=T&&v<=I;){const R=f[T],D=d[I]=x?Vt(d[I]):Et(d[I]);if(Ce(R,D))N(R,D,p,null,g,_,O,y,x);else break;T--,I--}if(v>T){if(v<=I){const R=I+1,D=R<E?d[R].el:h;for(;v<=I;)N(null,d[v]=x?Vt(d[v]):Et(d[v]),p,D,g,_,O,y,x),v++}}else if(v>I)for(;v<=T;)Ot(f[v],g,_,!0),v++;else{const R=v,D=v,V=new Map;for(v=D;v<=I;v++){const mt=d[v]=x?Vt(d[v]):Et(d[v]);mt.key!=null&&V.set(mt.key,v)}let U,et=0;const bt=I-D+1;let he=!1,Oa=0;const Pe=new Array(bt);for(v=0;v<bt;v++)Pe[v]=0;for(v=R;v<=T;v++){const mt=f[v];if(et>=bt){Ot(mt,g,_,!0);continue}let St;if(mt.key!=null)St=V.get(mt.key);else for(U=D;U<=I;U++)if(Pe[U-D]===0&&Ce(mt,d[U])){St=U;break}St===void 0?Ot(mt,g,_,!0):(Pe[St-D]=v+1,St>=Oa?Oa=St:he=!0,N(mt,d[St],p,null,g,_,O,y,x),et++)}const Sa=he?Dl(Pe):be;for(U=Sa.length-1,v=bt-1;v>=0;v--){const mt=D+v,St=d[mt],ka=mt+1<E?d[mt+1].el:h;Pe[v]===0?N(null,St,p,ka,g,_,O,y,x):he&&(U<0||v!==Sa[U]?ee(St,p,ka,2):U--)}}},ee=(f,d,p,h,g=null)=>{const{el:_,type:O,transition:y,children:x,shapeFlag:v}=f;if(v&6){ee(f.component.subTree,d,p,h);return}if(v&128){f.suspense.move(d,p,h);return}if(v&64){O.move(f,d,p,Ee);return}if(O===Rt){r(_,d,p);for(let T=0;T<x.length;T++)ee(x[T],d,p,h);r(f.anchor,d,p);return}if(O===ar){C(f,d,p);return}if(h!==2&&v&1&&y)if(h===0)y.beforeEnter(_),r(_,d,p),ut(()=>y.enter(_),g);else{const{leave:T,delayLeave:I,afterLeave:R}=y,D=()=>r(_,d,p),V=()=>{T(_,()=>{D(),R&&R()})};I?I(_,D,V):V()}else r(_,d,p)},Ot=(f,d,p,h=!1,g=!1)=>{const{type:_,props:O,ref:y,children:x,dynamicChildren:v,shapeFlag:E,patchFlag:T,dirs:I,memoIndex:R}=f;if(y!=null&&Or(y,null,p,f,!0),R!=null&&(d.renderCache[R]=void 0),E&256){d.ctx.deactivate(f);return}const D=E&1&&I,V=!_n(f);let U;if(V&&(U=O&&O.onVnodeBeforeUnmount)&&kt(U,d,f),E&6)ls(f.component,p,h);else{if(E&128){f.suspense.unmount(p,h);return}D&&ne(f,null,d,"beforeUnmount"),E&64?f.type.remove(f,d,p,g,Ee,h):v&&(_!==Rt||T>0&&T&64)?Nt(v,d,p,!1,!0):(_===Rt&&T&384||!g&&E&16)&&Nt(x,d,p),h&&_a(f)}(V&&(U=O&&O.onVnodeUnmounted)||D)&&ut(()=>{U&&kt(U,d,f),D&&ne(f,null,d,"unmounted")},p)},_a=f=>{const{type:d,el:p,anchor:h,transition:g}=f;if(d===Rt){ss(p,h);return}if(d===ar){$(f);return}const _=()=>{a(p),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(f.shapeFlag&1&&g&&!g.persisted){const{leave:O,delayLeave:y}=g,x=()=>O(p,_);y?y(f.el,_,x):x()}else _()},ss=(f,d)=>{let p;for(;f!==d;)p=b(f),a(f),f=p;a(d)},ls=(f,d,p)=>{const{bum:h,scope:g,update:_,subTree:O,um:y,m:x,a:v}=f;Va(x),Va(v),h&&Zn(h),g.stop(),_&&(_.active=!1,Ot(O,f,d,p)),y&&ut(y,d),ut(()=>{f.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},Nt=(f,d,p,h=!1,g=!1,_=0)=>{for(let O=_;O<f.length;O++)Ot(f[O],d,p,h,g)},rn=f=>f.shapeFlag&6?rn(f.component.subTree):f.shapeFlag&128?f.suspense.next():b(f.anchor||f.el);let Xn=!1;const xa=(f,d,p)=>{f==null?d._vnode&&Ot(d._vnode,null,null,!0):N(d._vnode||null,f,d,null,null,null,p),Xn||(Xn=!0,La(),io(),Xn=!1),d._vnode=f},Ee={p:N,um:Ot,m:ee,r:_a,mt:qn,mc:ft,pc:W,pbc:Tt,n:rn,o:t};let wa,Aa;return{render:xa,hydrate:wa,createApp:Cl(xa,wa)}}function rr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function re({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function $l(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function xo(t,e,n=!1){const r=t.children,a=e.children;if(M(r)&&M(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=Vt(a[i]),s.el=o.el),!n&&s.patchFlag!==-2&&xo(o,s)),s.type===Bn&&(s.el=o.el)}}function Dl(t){const e=t.slice(),n=[0];let r,a,i,o,s;const l=t.length;for(r=0;r<l;r++){const c=t[r];if(c!==0){if(a=n[n.length-1],t[a]<c){e[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,t[n[s]]<c?i=s+1:o=s;c<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function wo(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:wo(e)}function Va(t){if(t)for(let e=0;e<t.length;e++)t[e].active=!1}const zl=Symbol.for("v-scx"),Hl=()=>xn(zl),cn={};function wn(t,e,n){return Ao(t,e,n)}function Ao(t,e,{immediate:n,deep:r,flush:a,once:i,onTrack:o,onTrigger:s}=q){if(e&&i){const L=e;e=(...Q)=>{L(...Q),H()}}const l=ot,c=L=>r===!0?L:oe(L,r===!1?1:void 0);let u,m=!1,b=!1;if(pt(t)?(u=()=>t.value,m=br(t)):Me(t)?(u=()=>c(t),m=!0):M(t)?(b=!0,m=t.some(L=>Me(L)||br(L)),u=()=>t.map(L=>{if(pt(L))return L.value;if(Me(L))return c(L);if(F(L))return Gt(L,l,2)})):F(t)?e?u=()=>Gt(t,l,2):u=()=>(w&&w(),At(t,l,3,[j])):u=vt,e&&r){const L=u;u=()=>oe(L())}let w,j=L=>{w=C.onStop=()=>{Gt(L,l,4),w=C.onStop=void 0}},N;if(Yn)if(j=vt,e?n&&At(e,l,3,[u(),b?[]:void 0,j]):u(),a==="sync"){const L=Hl();N=L.__watcherHandles||(L.__watcherHandles=[])}else return vt;let B=b?new Array(t.length).fill(cn):cn;const A=()=>{if(!(!C.active||!C.dirty))if(e){const L=C.run();(r||m||(b?L.some((Q,ft)=>ue(Q,B[ft])):ue(L,B)))&&(w&&w(),At(e,l,3,[L,B===cn?void 0:b&&B[0]===cn?[]:B,j]),B=L)}else C.run()};A.allowRecurse=!!e;let S;a==="sync"?S=A:a==="post"?S=()=>ut(A,l&&l.suspense):(A.pre=!0,l&&(A.id=l.uid),S=()=>ea(A));const C=new Wr(u,vt,S),$=As(),H=()=>{C.stop(),$&&Hr($.effects,C)};return e?n?A():B=C.run():a==="post"?ut(C.run.bind(C),l&&l.suspense):C.run(),N&&N.push(H),H}function Ul(t,e,n){const r=this.proxy,a=at(t)?t.includes(".")?Oo(r,t):()=>r[t]:t.bind(r,r);let i;F(e)?i=e:(i=e.handler,n=e);const o=Xe(this),s=Ao(a,i.bind(r),n);return o(),s}function Oo(t,e){const n=e.split(".");return()=>{let r=t;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function oe(t,e=1/0,n){if(e<=0||!J(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,pt(t))oe(t.value,e,n);else if(M(t))for(let r=0;r<t.length;r++)oe(t[r],e,n);else if(Mi(t)||ye(t))t.forEach(r=>{oe(r,e,n)});else if(Fi(t)){for(const r in t)oe(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&oe(t[r],e,n)}return t}const So=t=>t.type.__isKeepAlive;function Bl(t,e){ko(t,"a",e)}function Yl(t,e){ko(t,"da",e)}function ko(t,e,n=ot){const r=t.__wdc||(t.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return t()});if(Un(e,r,n),n){let a=n.parent;for(;a&&a.parent;)So(a.parent.vnode)&&Wl(r,e,n,a),a=a.parent}}function Wl(t,e,n,r){const a=Un(e,t,r,!0);fo(()=>{Hr(r[e],a)},n)}function Eo(t,e){t.shapeFlag&6&&t.component?Eo(t.component.subTree,e):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}const Vl=t=>t.__isTeleport,Rt=Symbol.for("v-fgt"),Bn=Symbol.for("v-txt"),He=Symbol.for("v-cmt"),ar=Symbol.for("v-stc"),Fe=[];let xt=null;function Ge(t=!1){Fe.push(xt=t?null:[])}function Kl(){Fe.pop(),xt=Fe[Fe.length-1]||null}let Ue=1;function Ka(t){Ue+=t}function Gl(t){return t.dynamicChildren=Ue>0?xt||be:null,Kl(),Ue>0&&xt&&xt.push(t),t}function qe(t,e,n,r,a,i){return Gl(jt(t,e,n,r,a,i,!0))}function Sr(t){return t?t.__v_isVNode===!0:!1}function Ce(t,e){return t.type===e.type&&t.key===e.key}const Po=({key:t})=>t??null,An=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?at(t)||pt(t)||F(t)?{i:_t,r:t,k:e,f:!!n}:t:null);function jt(t,e=null,n=null,r=0,a=null,i=t===Rt?0:1,o=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Po(e),ref:e&&An(e),scopeId:lo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:_t};return s?(aa(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=at(n)?8:16),Ue>0&&!o&&xt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&xt.push(l),l}const nt=ql;function ql(t,e=null,n=null,r=0,a=null,i=!1){if((!t||t===ll)&&(t=He),Sr(t)){const s=we(t,e,!0);return n&&aa(s,n),Ue>0&&!i&&xt&&(s.shapeFlag&6?xt[xt.indexOf(t)]=s:xt.push(s)),s.patchFlag=-2,s}if(lf(t)&&(t=t.__vccOpts),e){e=Xl(e);let{class:s,style:l}=e;s&&!at(s)&&(e.class=Yr(s)),J(l)&&(Qi(l)&&!M(l)&&(l=rt({},l)),e.style=Br(l))}const o=at(t)?1:cl(t)?128:Vl(t)?64:J(t)?4:F(t)?2:0;return jt(t,e,n,r,a,o,i,!0)}function Xl(t){return t?Qi(t)||ho(t)?rt({},t):t:null}function we(t,e,n=!1,r=!1){const{props:a,ref:i,patchFlag:o,children:s,transition:l}=t,c=e?Zl(a||{},e):a,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Po(c),ref:e&&e.ref?n&&i?M(i)?i.concat(An(e)):[i,An(e)]:An(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:s,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Rt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&we(t.ssContent),ssFallback:t.ssFallback&&we(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&Eo(u,l.clone(u)),u}function Jl(t=" ",e=0){return nt(Bn,null,t,e)}function Et(t){return t==null||typeof t=="boolean"?nt(He):M(t)?nt(Rt,null,t.slice()):typeof t=="object"?Vt(t):nt(Bn,null,String(t))}function Vt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:we(t)}function aa(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(M(e))n=16;else if(typeof e=="object")if(r&65){const a=e.default;a&&(a._c&&(a._d=!1),aa(t,a()),a._c&&(a._d=!0));return}else{n=32;const a=e._;!a&&!ho(e)?e._ctx=_t:a===3&&_t&&(_t.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else F(e)?(e={default:e,_ctx:_t},n=32):(e=String(e),r&64?(n=16,e=[Jl(e)]):n=8);t.children=e,t.shapeFlag|=n}function Zl(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const a in r)if(a==="class")e.class!==r.class&&(e.class=Yr([e.class,r.class]));else if(a==="style")e.style=Br([e.style,r.style]);else if(Ln(a)){const i=e[a],o=r[a];o&&i!==o&&!(M(i)&&i.includes(o))&&(e[a]=i?[].concat(i,o):o)}else a!==""&&(e[a]=r[a])}return e}function kt(t,e,n,r=null){At(t,e,7,[n,r])}const Ql=uo();let tf=0;function ef(t,e,n){const r=t.type,a=(e?e.appContext:t.appContext)||Ql,i={uid:tf++,vnode:t,type:r,parent:e,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new xs(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:vo(r,a),emitsOptions:so(r,a),emit:null,emitted:null,propsDefaults:q,inheritAttrs:r.inheritAttrs,ctx:q,data:q,props:q,attrs:q,slots:q,refs:q,setupState:q,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=tl.bind(null,i),t.ce&&t.ce(i),i}let ot=null,In,kr;{const t=$i(),e=(n,r)=>{let a;return(a=t[n])||(a=t[n]=[]),a.push(r),i=>{a.length>1?a.forEach(o=>o(i)):a[0](i)}};In=e("__VUE_INSTANCE_SETTERS__",n=>ot=n),kr=e("__VUE_SSR_SETTERS__",n=>Yn=n)}const Xe=t=>{const e=ot;return In(t),t.scope.on(),()=>{t.scope.off(),In(e)}},Ga=()=>{ot&&ot.scope.off(),In(null)};function Co(t){return t.vnode.shapeFlag&4}let Yn=!1;function nf(t,e=!1){e&&kr(e);const{props:n,children:r}=t.vnode,a=Co(t);Tl(t,n,a,e),Rl(t,r);const i=a?rf(t,e):void 0;return e&&kr(!1),i}function rf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,wl);const{setup:r}=n;if(r){const a=t.setupContext=r.length>1?of(t):null,i=Xe(t);Zt();const o=Gt(r,t,0,[t.props,a]);if(Qt(),i(),Ri(o)){if(o.then(Ga,Ga),e)return o.then(s=>{qa(t,s,e)}).catch(s=>{zn(s,t,0)});t.asyncDep=o}else qa(t,o,e)}else Io(t,e)}function qa(t,e,n){F(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:J(e)&&(t.setupState=no(e)),Io(t,n)}let Xa;function Io(t,e,n){const r=t.type;if(!t.render){if(!e&&Xa&&!r.render){const a=r.template||na(t).template;if(a){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:s,compilerOptions:l}=r,c=rt(rt({isCustomElement:i,delimiters:s},o),l);r.render=Xa(a,c)}}t.render=r.render||vt}{const a=Xe(t);Zt();try{Al(t)}finally{Qt(),a()}}}const af={get(t,e){return dt(t,"get",""),t[e]}};function of(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,af),slots:t.slots,emit:t.emit,expose:e}}function ia(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(no(Ys(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Re)return Re[n](t)},has(e,n){return n in e||n in Re}})):t.proxy}function sf(t,e=!0){return F(t)?t.displayName||t.name:t.name||e&&t.__name}function lf(t){return F(t)&&"__vccOpts"in t}const ae=(t,e)=>Ws(t,e,Yn);function ff(t,e,n){const r=arguments.length;return r===2?J(e)&&!M(e)?Sr(e)?nt(t,null,[e]):nt(t,e):nt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Sr(n)&&(n=[n]),nt(t,e,n))}const cf="3.4.29";/**
* @vue/runtime-dom v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const uf="http://www.w3.org/2000/svg",df="http://www.w3.org/1998/Math/MathML",Mt=typeof document<"u"?document:null,Ja=Mt&&Mt.createElement("template"),mf={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const a=e==="svg"?Mt.createElementNS(uf,t):e==="mathml"?Mt.createElementNS(df,t):n?Mt.createElement(t,{is:n}):Mt.createElement(t);return t==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:t=>Mt.createTextNode(t),createComment:t=>Mt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Mt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,a,i){const o=n?n.previousSibling:e.lastChild;if(a&&(a===i||a.nextSibling))for(;e.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{Ja.innerHTML=r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t;const s=Ja.content;if(r==="svg"||r==="mathml"){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}e.insertBefore(s,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},pf=Symbol("_vtc");function hf(t,e,n){const r=t[pf];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Za=Symbol("_vod"),gf=Symbol("_vsh"),vf=Symbol(""),bf=/(^|;)\s*display\s*:/;function yf(t,e,n){const r=t.style,a=at(n);let i=!1;if(n&&!a){if(e)if(at(e))for(const o of e.split(";")){const s=o.slice(0,o.indexOf(":")).trim();n[s]==null&&On(r,s,"")}else for(const o in e)n[o]==null&&On(r,o,"");for(const o in n)o==="display"&&(i=!0),On(r,o,n[o])}else if(a){if(e!==n){const o=r[vf];o&&(n+=";"+o),r.cssText=n,i=bf.test(n)}}else e&&t.removeAttribute("style");Za in t&&(t[Za]=i?r.display:"",t[gf]&&(r.display="none"))}const Qa=/\s*!important$/;function On(t,e,n){if(M(n))n.forEach(r=>On(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=_f(t,e);Qa.test(n)?t.setProperty(Oe(r),n.replace(Qa,""),"important"):t[r]=n}}const ti=["Webkit","Moz","ms"],ir={};function _f(t,e){const n=ir[e];if(n)return n;let r=It(e);if(r!=="filter"&&r in t)return ir[e]=r;r=$n(r);for(let a=0;a<ti.length;a++){const i=ti[a]+r;if(i in t)return ir[e]=i}return e}const ei="http://www.w3.org/1999/xlink";function ni(t,e,n,r,a,i=_s(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ei,e.slice(6,e.length)):t.setAttributeNS(ei,e,n):n==null||i&&!Di(n)?t.removeAttribute(e):t.setAttribute(e,i?"":String(n))}function xf(t,e,n,r,a,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,a,i),t[e]=n??"";return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const c=s==="OPTION"?t.getAttribute("value")||"":t.value,u=n==null?"":String(n);(c!==u||!("_value"in t))&&(t.value=u),n==null&&t.removeAttribute(e),t._value=n;return}let l=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=Di(n):n==null&&c==="string"?(n="",l=!0):c==="number"&&(n=0,l=!0)}try{t[e]=n}catch{}l&&t.removeAttribute(e)}function wf(t,e,n,r){t.addEventListener(e,n,r)}function Af(t,e,n,r){t.removeEventListener(e,n,r)}const ri=Symbol("_vei");function Of(t,e,n,r,a=null){const i=t[ri]||(t[ri]={}),o=i[e];if(r&&o)o.value=r;else{const[s,l]=Sf(e);if(r){const c=i[e]=Pf(r,a);wf(t,s,c,l)}else o&&(Af(t,s,o,l),i[e]=void 0)}}const ai=/(?:Once|Passive|Capture)$/;function Sf(t){let e;if(ai.test(t)){e={};let r;for(;r=t.match(ai);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Oe(t.slice(2)),e]}let or=0;const kf=Promise.resolve(),Ef=()=>or||(kf.then(()=>or=0),or=Date.now());function Pf(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;At(Cf(r,n.value),e,5,[r])};return n.value=t,n.attached=Ef(),n}function Cf(t,e){if(M(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>a=>!a._stopped&&r&&r(a))}else return e}const ii=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,If=(t,e,n,r,a,i,o,s,l)=>{const c=a==="svg";e==="class"?hf(t,r,c):e==="style"?yf(t,n,r):Ln(e)?zr(e)||Of(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Tf(t,e,r,c))?(xf(t,e,r,i,o,s,l),(e==="value"||e==="checked"||e==="selected")&&ni(t,e,r,c,o,e!=="value")):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),ni(t,e,r,c))};function Tf(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&ii(e)&&F(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const a=t.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return ii(e)&&at(n)?!1:e in t}const Nf=rt({patchProp:If},mf);let oi;function Mf(){return oi||(oi=Fl(Nf))}const Rf=(...t)=>{const e=Mf().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=Ff(r);if(!a)return;const i=e._component;!F(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,Lf(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e};function Lf(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Ff(t){return at(t)?document.querySelector(t):t}const jf={class:"btn"},$f=["href"],sr={__name:"NavigationBarItem",props:{name:{type:String,required:!0},route:{type:String,required:!0}},setup(t){return(e,n)=>(Ge(),qe("div",jf,[jt("a",{href:`/${t.route}`},[jt("h1",null,mr(t.name),1)],8,$f)]))}};var Df={prefix:"fas",iconName:"angles-left",icon:[512,512,[171,"angle-double-left"],"f100","M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"]};const zf={class:"navbar"},Hf={class:"collapse"},Uf={class:"navbar__items"},Bf={__name:"NavigationBar",setup(t){function e(){var n=document.getElementsByClassName("navbar")[0];n.classList.toggle("isHidden")}return(n,r)=>{const a=sl("font-awesome-icon");return Ge(),qe("nav",zf,[jt("div",Hf,[jt("button",{onClick:e},[nt(a,{icon:eo(Df)},null,8,["icon"])])]),jt("div",Uf,[nt(sr,{name:"Dashboard",route:"dashboard"}),nt(sr,{name:"Library",route:"lib"}),nt(sr,{name:"Profile",route:"profile"})])])}}},Yf={class:"tpw"},Wf={class:"tpw--title"},Vf={class:"tpw--paragraph"},Kf={__name:"TitleParagraphWidget",props:{title:{type:String,required:!0},paragraph:{type:String,required:!0}},setup(t){return(e,n)=>(Ge(),qe("div",Yf,[jt("h1",Wf,mr(t.title),1),jt("p",Vf,mr(t.paragraph),1)]))}},Gf={class:"home"},qf={__name:"HomePage",setup(t){return(e,n)=>(Ge(),qe("div",Gf,[nt(Kf,{title:"Welcome to WritingThing",paragraph:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do lebron eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim skibidi ad minim veniam, quis nostrud balls exercitation ullamco"})]))}},Xf={__name:"App",setup(t){return(e,n)=>(Ge(),qe("main",null,[nt(Bf),nt(qf)]))}};function si(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?si(Object(n),!0).forEach(function(r){tt(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):si(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Tn(t){"@babel/helpers - typeof";return Tn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Tn(t)}function Jf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Zf(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Qf(t,e,n){return e&&Zf(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function tt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function oa(t,e){return ec(t)||rc(t,e)||To(t,e)||ic()}function Je(t){return tc(t)||nc(t)||To(t)||ac()}function tc(t){if(Array.isArray(t))return Er(t)}function ec(t){if(Array.isArray(t))return t}function nc(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function rc(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(t);!(a=(o=n.next()).done)&&(r.push(o.value),!(e&&r.length===e));a=!0);}catch(l){i=!0,s=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function To(t,e){if(t){if(typeof t=="string")return Er(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Er(t,e)}}function Er(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function ac(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ic(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var li=function(){},sa={},No={},Mo=null,Ro={mark:li,measure:li};try{typeof window<"u"&&(sa=window),typeof document<"u"&&(No=document),typeof MutationObserver<"u"&&(Mo=MutationObserver),typeof performance<"u"&&(Ro=performance)}catch{}var oc=sa.navigator||{},fi=oc.userAgent,ci=fi===void 0?"":fi,qt=sa,G=No,ui=Mo,un=Ro;qt.document;var Ut=!!G.documentElement&&!!G.head&&typeof G.addEventListener=="function"&&typeof G.createElement=="function",Lo=~ci.indexOf("MSIE")||~ci.indexOf("Trident/"),dn,mn,pn,hn,gn,$t="___FONT_AWESOME___",Pr=16,Fo="fa",jo="svg-inline--fa",de="data-fa-i2svg",Cr="data-fa-pseudo-element",sc="data-fa-pseudo-element-pending",la="data-prefix",fa="data-icon",di="fontawesome-i2svg",lc="async",fc=["HTML","HEAD","STYLE","SCRIPT"],$o=function(){try{return!0}catch{return!1}}(),K="classic",Z="sharp",ca=[K,Z];function Ze(t){return new Proxy(t,{get:function(n,r){return r in n?n[r]:n[K]}})}var Be=Ze((dn={},tt(dn,K,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),tt(dn,Z,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),dn)),Ye=Ze((mn={},tt(mn,K,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),tt(mn,Z,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),mn)),We=Ze((pn={},tt(pn,K,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),tt(pn,Z,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),pn)),cc=Ze((hn={},tt(hn,K,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),tt(hn,Z,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),hn)),uc=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,Do="fa-layers-text",dc=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,mc=Ze((gn={},tt(gn,K,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),tt(gn,Z,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),gn)),zo=[1,2,3,4,5,6,7,8,9,10],pc=zo.concat([11,12,13,14,15,16,17,18,19,20]),hc=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],se={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ve=new Set;Object.keys(Ye[K]).map(Ve.add.bind(Ve));Object.keys(Ye[Z]).map(Ve.add.bind(Ve));var gc=[].concat(ca,Je(Ve),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",se.GROUP,se.SWAP_OPACITY,se.PRIMARY,se.SECONDARY]).concat(zo.map(function(t){return"".concat(t,"x")})).concat(pc.map(function(t){return"w-".concat(t)})),je=qt.FontAwesomeConfig||{};function vc(t){var e=G.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function bc(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(G&&typeof G.querySelector=="function"){var yc=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];yc.forEach(function(t){var e=oa(t,2),n=e[0],r=e[1],a=bc(vc(n));a!=null&&(je[r]=a)})}var Ho={styleDefault:"solid",familyDefault:"classic",cssPrefix:Fo,replacementClass:jo,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};je.familyPrefix&&(je.cssPrefix=je.familyPrefix);var Ae=k(k({},Ho),je);Ae.autoReplaceSvg||(Ae.observeMutations=!1);var P={};Object.keys(Ho).forEach(function(t){Object.defineProperty(P,t,{enumerable:!0,set:function(n){Ae[t]=n,$e.forEach(function(r){return r(P)})},get:function(){return Ae[t]}})});Object.defineProperty(P,"familyPrefix",{enumerable:!0,set:function(e){Ae.cssPrefix=e,$e.forEach(function(n){return n(P)})},get:function(){return Ae.cssPrefix}});qt.FontAwesomeConfig=P;var $e=[];function _c(t){return $e.push(t),function(){$e.splice($e.indexOf(t),1)}}var Yt=Pr,Ct={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function xc(t){if(!(!t||!Ut)){var e=G.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=G.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return G.head.insertBefore(e,r),t}}var wc="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ke(){for(var t=12,e="";t-- >0;)e+=wc[Math.random()*62|0];return e}function Se(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function ua(t){return t.classList?Se(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Uo(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ac(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Uo(t[n]),'" ')},"").trim()}function Wn(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function da(t){return t.size!==Ct.size||t.x!==Ct.x||t.y!==Ct.y||t.rotate!==Ct.rotate||t.flipX||t.flipY}function Oc(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:c}}function Sc(t){var e=t.transform,n=t.width,r=n===void 0?Pr:n,a=t.height,i=a===void 0?Pr:a,o=t.startCentered,s=o===void 0?!1:o,l="";return s&&Lo?l+="translate(".concat(e.x/Yt-r/2,"em, ").concat(e.y/Yt-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(e.x/Yt,"em), calc(-50% + ").concat(e.y/Yt,"em)) "):l+="translate(".concat(e.x/Yt,"em, ").concat(e.y/Yt,"em) "),l+="scale(".concat(e.size/Yt*(e.flipX?-1:1),", ").concat(e.size/Yt*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var kc=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, 0));
          transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Bo(){var t=Fo,e=jo,n=P.cssPrefix,r=P.replacementClass,a=kc;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var mi=!1;function lr(){P.autoAddCss&&!mi&&(xc(Bo()),mi=!0)}var Ec={mixout:function(){return{dom:{css:Bo,insertCss:lr}}},hooks:function(){return{beforeDOMElementCreation:function(){lr()},beforeI2svg:function(){lr()}}}},Dt=qt||{};Dt[$t]||(Dt[$t]={});Dt[$t].styles||(Dt[$t].styles={});Dt[$t].hooks||(Dt[$t].hooks={});Dt[$t].shims||(Dt[$t].shims=[]);var wt=Dt[$t],Yo=[],Pc=function t(){G.removeEventListener("DOMContentLoaded",t),Nn=1,Yo.map(function(e){return e()})},Nn=!1;Ut&&(Nn=(G.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(G.readyState),Nn||G.addEventListener("DOMContentLoaded",Pc));function Cc(t){Ut&&(Nn?setTimeout(t,0):Yo.push(t))}function Qe(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?Uo(t):"<".concat(e," ").concat(Ac(r),">").concat(i.map(Qe).join(""),"</").concat(e,">")}function pi(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var fr=function(e,n,r,a){var i=Object.keys(e),o=i.length,s=n,l,c,u;for(r===void 0?(l=1,u=e[i[0]]):(l=0,u=r);l<o;l++)c=i[l],u=s(u,e[c],c,e);return u};function Ic(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function Ir(t){var e=Ic(t);return e.length===1?e[0].toString(16):null}function Tc(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function hi(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function Tr(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=hi(e);typeof wt.hooks.addPack=="function"&&!a?wt.hooks.addPack(t,hi(e)):wt.styles[t]=k(k({},wt.styles[t]||{}),i),t==="fas"&&Tr("fa",e)}var vn,bn,yn,ge=wt.styles,Nc=wt.shims,Mc=(vn={},tt(vn,K,Object.values(We[K])),tt(vn,Z,Object.values(We[Z])),vn),ma=null,Wo={},Vo={},Ko={},Go={},qo={},Rc=(bn={},tt(bn,K,Object.keys(Be[K])),tt(bn,Z,Object.keys(Be[Z])),bn);function Lc(t){return~gc.indexOf(t)}function Fc(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!Lc(a)?a:null}var Xo=function(){var e=function(i){return fr(ge,function(o,s,l){return o[l]=fr(s,i,{}),o},{})};Wo=e(function(a,i,o){if(i[3]&&(a[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){a[l.toString(16)]=o})}return a}),Vo=e(function(a,i,o){if(a[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){a[l]=o})}return a}),qo=e(function(a,i,o){var s=i[2];return a[o]=o,s.forEach(function(l){a[l]=o}),a});var n="far"in ge||P.autoFetchSvg,r=fr(Nc,function(a,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:l}),a},{names:{},unicodes:{}});Ko=r.names,Go=r.unicodes,ma=Vn(P.styleDefault,{family:P.familyDefault})};_c(function(t){ma=Vn(t.styleDefault,{family:P.familyDefault})});Xo();function pa(t,e){return(Wo[t]||{})[e]}function jc(t,e){return(Vo[t]||{})[e]}function le(t,e){return(qo[t]||{})[e]}function Jo(t){return Ko[t]||{prefix:null,iconName:null}}function $c(t){var e=Go[t],n=pa("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Xt(){return ma}var ha=function(){return{prefix:null,iconName:null,rest:[]}};function Vn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?K:n,a=Be[r][t],i=Ye[r][t]||Ye[r][a],o=t in wt.styles?t:null;return i||o||null}var gi=(yn={},tt(yn,K,Object.keys(We[K])),tt(yn,Z,Object.keys(We[Z])),yn);function Kn(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},tt(e,K,"".concat(P.cssPrefix,"-").concat(K)),tt(e,Z,"".concat(P.cssPrefix,"-").concat(Z)),e),o=null,s=K;(t.includes(i[K])||t.some(function(c){return gi[K].includes(c)}))&&(s=K),(t.includes(i[Z])||t.some(function(c){return gi[Z].includes(c)}))&&(s=Z);var l=t.reduce(function(c,u){var m=Fc(P.cssPrefix,u);if(ge[u]?(u=Mc[s].includes(u)?cc[s][u]:u,o=u,c.prefix=u):Rc[s].indexOf(u)>-1?(o=u,c.prefix=Vn(u,{family:s})):m?c.iconName=m:u!==P.replacementClass&&u!==i[K]&&u!==i[Z]&&c.rest.push(u),!a&&c.prefix&&c.iconName){var b=o==="fa"?Jo(c.iconName):{},w=le(c.prefix,c.iconName);b.prefix&&(o=null),c.iconName=b.iconName||w||c.iconName,c.prefix=b.prefix||c.prefix,c.prefix==="far"&&!ge.far&&ge.fas&&!P.autoFetchSvg&&(c.prefix="fas")}return c},ha());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===Z&&(ge.fass||P.autoFetchSvg)&&(l.prefix="fass",l.iconName=le(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||o==="fa")&&(l.prefix=Xt()||"fas"),l}var Dc=function(){function t(){Jf(this,t),this.definitions={}}return Qf(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var o=a.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=k(k({},n.definitions[s]||{}),o[s]),Tr(s,o[s]);var l=We[K][s];l&&Tr(l,o[s]),Xo()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var o=a[i],s=o.prefix,l=o.iconName,c=o.icon,u=c[2];n[s]||(n[s]={}),u.length>0&&u.forEach(function(m){typeof m=="string"&&(n[s][m]=c)}),n[s][l]=c}),n}}]),t}(),vi=[],ve={},xe={},zc=Object.keys(xe);function Hc(t,e){var n=e.mixoutsTo;return vi=t,ve={},Object.keys(xe).forEach(function(r){zc.indexOf(r)===-1&&delete xe[r]}),vi.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),Tn(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){ve[o]||(ve[o]=[]),ve[o].push(i[o])})}r.provides&&r.provides(xe)}),n}function Nr(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=ve[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(r))}),e}function me(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=ve[t]||[];a.forEach(function(i){i.apply(null,n)})}function zt(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return xe[t]?xe[t].apply(null,e):void 0}function Mr(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||Xt();if(e)return e=le(n,e)||e,pi(Zo.definitions,n,e)||pi(wt.styles,n,e)}var Zo=new Dc,Uc=function(){P.autoReplaceSvg=!1,P.observeMutations=!1,me("noAuto")},Bc={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Ut?(me("beforeI2svg",e),zt("pseudoElements2svg",e),zt("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;P.autoReplaceSvg===!1&&(P.autoReplaceSvg=!0),P.observeMutations=!0,Cc(function(){Wc({autoReplaceSvgRoot:n}),me("watch",e)})}},Yc={icon:function(e){if(e===null)return null;if(Tn(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:le(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=Vn(e[0]);return{prefix:r,iconName:le(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(P.cssPrefix,"-"))>-1||e.match(uc))){var a=Kn(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||Xt(),iconName:le(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=Xt();return{prefix:i,iconName:le(i,e)||e}}}},ht={noAuto:Uc,config:P,dom:Bc,parse:Yc,library:Zo,findIconDefinition:Mr,toHtml:Qe},Wc=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?G:n;(Object.keys(wt.styles).length>0||P.autoFetchSvg)&&Ut&&P.autoReplaceSvg&&ht.dom.i2svg({node:r})};function Gn(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return Qe(r)})}}),Object.defineProperty(t,"node",{get:function(){if(Ut){var r=G.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function Vc(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,o=t.transform;if(da(o)&&n.found&&!r.found){var s=n.width,l=n.height,c={x:s/l/2,y:.5};a.style=Wn(k(k({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function Kc(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(P.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:k(k({},a),{},{id:o}),children:r}]}]}function ga(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,l=t.title,c=t.maskId,u=t.titleId,m=t.extra,b=t.watchable,w=b===void 0?!1:b,j=r.found?r:n,N=j.width,B=j.height,A=a==="fak",S=[P.replacementClass,i?"".concat(P.cssPrefix,"-").concat(i):""].filter(function(gt){return m.classes.indexOf(gt)===-1}).filter(function(gt){return gt!==""||!!gt}).concat(m.classes).join(" "),C={children:[],attributes:k(k({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:S,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(N," ").concat(B)})},$=A&&!~m.classes.indexOf("fa-fw")?{width:"".concat(N/B*16*.0625,"em")}:{};w&&(C.attributes[de]=""),l&&(C.children.push({tag:"title",attributes:{id:C.attributes["aria-labelledby"]||"title-".concat(u||Ke())},children:[l]}),delete C.attributes.title);var H=k(k({},C),{},{prefix:a,iconName:i,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:k(k({},$),m.styles)}),L=r.found&&n.found?zt("generateAbstractMask",H)||{children:[],attributes:{}}:zt("generateAbstractIcon",H)||{children:[],attributes:{}},Q=L.children,ft=L.attributes;return H.children=Q,H.attributes=ft,s?Kc(H):Vc(H)}function bi(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,o=t.extra,s=t.watchable,l=s===void 0?!1:s,c=k(k(k({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(c[de]="");var u=k({},o.styles);da(a)&&(u.transform=Sc({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var m=Wn(u);m.length>0&&(c.style=m);var b=[];return b.push({tag:"span",attributes:c,children:[e]}),i&&b.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),b}function Gc(t){var e=t.content,n=t.title,r=t.extra,a=k(k(k({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=Wn(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var cr=wt.styles;function Rr(t){var e=t[0],n=t[1],r=t.slice(4),a=oa(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(P.cssPrefix,"-").concat(se.GROUP)},children:[{tag:"path",attributes:{class:"".concat(P.cssPrefix,"-").concat(se.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(P.cssPrefix,"-").concat(se.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var qc={found:!1,width:512,height:512};function Xc(t,e){!$o&&!P.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Lr(t,e){var n=e;return e==="fa"&&P.styleDefault!==null&&(e=Xt()),new Promise(function(r,a){if(zt("missingIconAbstract"),n==="fa"){var i=Jo(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&cr[e]&&cr[e][t]){var o=cr[e][t];return r(Rr(o))}Xc(t,e),r(k(k({},qc),{},{icon:P.showMissingIcons&&t?zt("missingIconAbstract")||{}:{}}))})}var yi=function(){},Fr=P.measurePerformance&&un&&un.mark&&un.measure?un:{mark:yi,measure:yi},Te='FA "6.5.2"',Jc=function(e){return Fr.mark("".concat(Te," ").concat(e," begins")),function(){return Qo(e)}},Qo=function(e){Fr.mark("".concat(Te," ").concat(e," ends")),Fr.measure("".concat(Te," ").concat(e),"".concat(Te," ").concat(e," begins"),"".concat(Te," ").concat(e," ends"))},va={begin:Jc,end:Qo},Sn=function(){};function _i(t){var e=t.getAttribute?t.getAttribute(de):null;return typeof e=="string"}function Zc(t){var e=t.getAttribute?t.getAttribute(la):null,n=t.getAttribute?t.getAttribute(fa):null;return e&&n}function Qc(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(P.replacementClass)}function tu(){if(P.autoReplaceSvg===!0)return kn.replace;var t=kn[P.autoReplaceSvg];return t||kn.replace}function eu(t){return G.createElementNS("http://www.w3.org/2000/svg",t)}function nu(t){return G.createElement(t)}function ts(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?eu:nu:n;if(typeof t=="string")return G.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){a.appendChild(ts(o,{ceFn:r}))}),a}function ru(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var kn={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(ts(a),n)}),n.getAttribute(de)===null&&P.keepOriginalSource){var r=G.createComment(ru(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~ua(n).indexOf(P.replacementClass))return kn.replace(e);var a=new RegExp("".concat(P.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===P.replacementClass||l.match(a)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return Qe(s)}).join(`
`);n.setAttribute(de,""),n.innerHTML=o}};function xi(t){t()}function es(t,e){var n=typeof e=="function"?e:Sn;if(t.length===0)n();else{var r=xi;P.mutateApproach===lc&&(r=qt.requestAnimationFrame||xi),r(function(){var a=tu(),i=va.begin("mutate");t.map(a),i(),n()})}}var ba=!1;function ns(){ba=!0}function jr(){ba=!1}var Mn=null;function wi(t){if(ui&&P.observeMutations){var e=t.treeCallback,n=e===void 0?Sn:e,r=t.nodeCallback,a=r===void 0?Sn:r,i=t.pseudoElementsCallback,o=i===void 0?Sn:i,s=t.observeMutationsRoot,l=s===void 0?G:s;Mn=new ui(function(c){if(!ba){var u=Xt();Se(c).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!_i(m.addedNodes[0])&&(P.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&P.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&_i(m.target)&&~hc.indexOf(m.attributeName))if(m.attributeName==="class"&&Zc(m.target)){var b=Kn(ua(m.target)),w=b.prefix,j=b.iconName;m.target.setAttribute(la,w||u),j&&m.target.setAttribute(fa,j)}else Qc(m.target)&&a(m.target)})}}),Ut&&Mn.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function au(){Mn&&Mn.disconnect()}function iu(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function ou(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=Kn(ua(t));return a.prefix||(a.prefix=Xt()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=jc(a.prefix,t.innerText)||pa(a.prefix,Ir(t.innerText))),!a.iconName&&P.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function su(t){var e=Se(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return P.autoA11y&&(n?e["aria-labelledby"]="".concat(P.replacementClass,"-title-").concat(r||Ke()):(e["aria-hidden"]="true",e.focusable="false")),e}function lu(){return{iconName:null,title:null,titleId:null,prefix:null,transform:Ct,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ai(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=ou(t),r=n.iconName,a=n.prefix,i=n.rest,o=su(t),s=Nr("parseNodeAttributes",{},t),l=e.styleParser?iu(t):[];return k({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:Ct,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var fu=wt.styles;function rs(t){var e=P.autoReplaceSvg==="nest"?Ai(t,{styleParser:!1}):Ai(t);return~e.extra.classes.indexOf(Do)?zt("generateLayersText",t,e):zt("generateSvgReplacementMutation",t,e)}var Jt=new Set;ca.map(function(t){Jt.add("fa-".concat(t))});Object.keys(Be[K]).map(Jt.add.bind(Jt));Object.keys(Be[Z]).map(Jt.add.bind(Jt));Jt=Je(Jt);function Oi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Ut)return Promise.resolve();var n=G.documentElement.classList,r=function(m){return n.add("".concat(di,"-").concat(m))},a=function(m){return n.remove("".concat(di,"-").concat(m))},i=P.autoFetchSvg?Jt:ca.map(function(u){return"fa-".concat(u)}).concat(Object.keys(fu));i.includes("fa")||i.push("fa");var o=[".".concat(Do,":not([").concat(de,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(de,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Se(t.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var l=va.begin("onTree"),c=s.reduce(function(u,m){try{var b=rs(m);b&&u.push(b)}catch(w){$o||w.name==="MissingIcon"&&console.error(w)}return u},[]);return new Promise(function(u,m){Promise.all(c).then(function(b){es(b,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),l(),u()})}).catch(function(b){l(),m(b)})})}function cu(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;rs(t).then(function(n){n&&es([n],e)})}function uu(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:Mr(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Mr(a||{})),t(r,k(k({},n),{},{mask:a}))}}var du=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?Ct:r,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,c=n.maskId,u=c===void 0?null:c,m=n.title,b=m===void 0?null:m,w=n.titleId,j=w===void 0?null:w,N=n.classes,B=N===void 0?[]:N,A=n.attributes,S=A===void 0?{}:A,C=n.styles,$=C===void 0?{}:C;if(e){var H=e.prefix,L=e.iconName,Q=e.icon;return Gn(k({type:"icon"},e),function(){return me("beforeDOMElementCreation",{iconDefinition:e,params:n}),P.autoA11y&&(b?S["aria-labelledby"]="".concat(P.replacementClass,"-title-").concat(j||Ke()):(S["aria-hidden"]="true",S.focusable="false")),ga({icons:{main:Rr(Q),mask:l?Rr(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:H,iconName:L,transform:k(k({},Ct),a),symbol:o,title:b,maskId:u,titleId:j,extra:{attributes:S,styles:$,classes:B}})})}},mu={mixout:function(){return{icon:uu(du)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Oi,n.nodeCallback=cu,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?G:r,i=n.callback,o=i===void 0?function(){}:i;return Oi(a,o)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,o=r.titleId,s=r.prefix,l=r.transform,c=r.symbol,u=r.mask,m=r.maskId,b=r.extra;return new Promise(function(w,j){Promise.all([Lr(a,s),u.iconName?Lr(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(N){var B=oa(N,2),A=B[0],S=B[1];w([n,ga({icons:{main:A,mask:S},prefix:s,iconName:a,transform:l,symbol:c,maskId:m,title:i,titleId:o,extra:b,watchable:!0})])}).catch(j)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.transform,s=n.styles,l=Wn(s);l.length>0&&(a.style=l);var c;return da(o)&&(c=zt("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(c||i.icon),{children:r,attributes:a}}}},pu={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return Gn({type:"layer"},function(){me("beforeDOMElementCreation",{assembler:n,params:r});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(P.cssPrefix,"-layers")].concat(Je(i)).join(" ")},children:o}]})}}}},hu={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,o=r.classes,s=o===void 0?[]:o,l=r.attributes,c=l===void 0?{}:l,u=r.styles,m=u===void 0?{}:u;return Gn({type:"counter",content:n},function(){return me("beforeDOMElementCreation",{content:n,params:r}),Gc({content:n.toString(),title:i,extra:{attributes:c,styles:m,classes:["".concat(P.cssPrefix,"-layers-counter")].concat(Je(s))}})})}}}},gu={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?Ct:a,o=r.title,s=o===void 0?null:o,l=r.classes,c=l===void 0?[]:l,u=r.attributes,m=u===void 0?{}:u,b=r.styles,w=b===void 0?{}:b;return Gn({type:"text",content:n},function(){return me("beforeDOMElementCreation",{content:n,params:r}),bi({content:n,transform:k(k({},Ct),i),title:s,extra:{attributes:m,styles:w,classes:["".concat(P.cssPrefix,"-layers-text")].concat(Je(c))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,o=r.extra,s=null,l=null;if(Lo){var c=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();s=u.width/c,l=u.height/c}return P.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,bi({content:n.innerHTML,width:s,height:l,transform:i,title:a,extra:o,watchable:!0})])}}},vu=new RegExp('"',"ug"),Si=[1105920,1112319];function bu(t){var e=t.replace(vu,""),n=Tc(e,0),r=n>=Si[0]&&n<=Si[1],a=e.length===2?e[0]===e[1]:!1;return{value:Ir(a?e[0]:e),isSecondary:r||a}}function ki(t,e){var n="".concat(sc).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=Se(t.children),o=i.filter(function(Q){return Q.getAttribute(Cr)===e})[0],s=qt.getComputedStyle(t,e),l=s.getPropertyValue("font-family").match(dc),c=s.getPropertyValue("font-weight"),u=s.getPropertyValue("content");if(o&&!l)return t.removeChild(o),r();if(l&&u!=="none"&&u!==""){var m=s.getPropertyValue("content"),b=~["Sharp"].indexOf(l[2])?Z:K,w=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Ye[b][l[2].toLowerCase()]:mc[b][c],j=bu(m),N=j.value,B=j.isSecondary,A=l[0].startsWith("FontAwesome"),S=pa(w,N),C=S;if(A){var $=$c(N);$.iconName&&$.prefix&&(S=$.iconName,w=$.prefix)}if(S&&!B&&(!o||o.getAttribute(la)!==w||o.getAttribute(fa)!==C)){t.setAttribute(n,C),o&&t.removeChild(o);var H=lu(),L=H.extra;L.attributes[Cr]=e,Lr(S,w).then(function(Q){var ft=ga(k(k({},H),{},{icons:{main:Q,mask:ha()},prefix:w,iconName:C,extra:L,watchable:!0})),gt=G.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(gt,t.firstChild):t.appendChild(gt),gt.outerHTML=ft.map(function(Tt){return Qe(Tt)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function yu(t){return Promise.all([ki(t,"::before"),ki(t,"::after")])}function _u(t){return t.parentNode!==document.head&&!~fc.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Cr)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ei(t){if(Ut)return new Promise(function(e,n){var r=Se(t.querySelectorAll("*")).filter(_u).map(yu),a=va.begin("searchPseudoElements");ns(),Promise.all(r).then(function(){a(),jr(),e()}).catch(function(){a(),jr(),n()})})}var xu={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Ei,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?G:r;P.searchPseudoElements&&Ei(a)}}},Pi=!1,wu={mixout:function(){return{dom:{unwatch:function(){ns(),Pi=!0}}}},hooks:function(){return{bootstrap:function(){wi(Nr("mutationObserverCallbacks",{}))},noAuto:function(){au()},watch:function(n){var r=n.observeMutationsRoot;Pi?jr():wi(Nr("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ci=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},n)},Au={mixout:function(){return{parse:{transform:function(n){return Ci(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Ci(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(c," ").concat(u)},b={transform:"translate(".concat(o/2*-1," -256)")},w={outer:s,inner:m,path:b};return{tag:"g",attributes:k({},w.outer),children:[{tag:"g",attributes:k({},w.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:k(k({},r.icon.attributes),w.path)}]}]}}}},ur={x:0,y:0,width:"100%",height:"100%"};function Ii(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ou(t){return t.tag==="g"?t.children:[t]}var Su={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?Kn(a.split(" ").map(function(o){return o.trim()})):ha();return i.prefix||(i.prefix=Xt()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,c=i.width,u=i.icon,m=o.width,b=o.icon,w=Oc({transform:l,containerWidth:m,iconWidth:c}),j={tag:"rect",attributes:k(k({},ur),{},{fill:"white"})},N=u.children?{children:u.children.map(Ii)}:{},B={tag:"g",attributes:k({},w.inner),children:[Ii(k({tag:u.tag,attributes:k(k({},u.attributes),w.path)},N))]},A={tag:"g",attributes:k({},w.outer),children:[B]},S="mask-".concat(s||Ke()),C="clip-".concat(s||Ke()),$={tag:"mask",attributes:k(k({},ur),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[j,A]},H={tag:"defs",children:[{tag:"clipPath",attributes:{id:C},children:Ou(b)},$]};return r.push(H,{tag:"rect",attributes:k({fill:"currentColor","clip-path":"url(#".concat(C,")"),mask:"url(#".concat(S,")")},ur)}),{children:r,attributes:a}}}},ku={provides:function(e){var n=!1;qt.matchMedia&&(n=qt.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:k(k({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=k(k({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:k(k({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:k(k({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:k(k({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:k(k({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:k(k({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:k(k({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:k(k({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Eu={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},Pu=[Ec,mu,pu,hu,gu,xu,wu,Au,Su,ku,Eu];Hc(Pu,{mixoutsTo:ht});ht.noAuto;ht.config;ht.library;ht.dom;var $r=ht.parse;ht.findIconDefinition;ht.toHtml;var Cu=ht.icon;ht.layer;ht.text;ht.counter;function Ti(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function Lt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ti(Object(n),!0).forEach(function(r){ct(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ti(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Iu(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Tu(t){var e=Iu(t,"string");return typeof e=="symbol"?e:e+""}function Rn(t){"@babel/helpers - typeof";return Rn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Rn(t)}function ct(t,e,n){return e=Tu(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Nu(t,e){if(t==null)return{};var n={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;n[r]=t[r]}return n}function Mu(t,e){if(t==null)return{};var n=Nu(t,e),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)r=i[a],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var Ru=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},as={exports:{}};(function(t){(function(e){var n=function(A,S,C){if(!c(S)||m(S)||b(S)||w(S)||l(S))return S;var $,H=0,L=0;if(u(S))for($=[],L=S.length;H<L;H++)$.push(n(A,S[H],C));else{$={};for(var Q in S)Object.prototype.hasOwnProperty.call(S,Q)&&($[A(Q,C)]=n(A,S[Q],C))}return $},r=function(A,S){S=S||{};var C=S.separator||"_",$=S.split||/(?=[A-Z])/;return A.split($).join(C)},a=function(A){return j(A)?A:(A=A.replace(/[\-_\s]+(.)?/g,function(S,C){return C?C.toUpperCase():""}),A.substr(0,1).toLowerCase()+A.substr(1))},i=function(A){var S=a(A);return S.substr(0,1).toUpperCase()+S.substr(1)},o=function(A,S){return r(A,S).toLowerCase()},s=Object.prototype.toString,l=function(A){return typeof A=="function"},c=function(A){return A===Object(A)},u=function(A){return s.call(A)=="[object Array]"},m=function(A){return s.call(A)=="[object Date]"},b=function(A){return s.call(A)=="[object RegExp]"},w=function(A){return s.call(A)=="[object Boolean]"},j=function(A){return A=A-0,A===A},N=function(A,S){var C=S&&"process"in S?S.process:S;return typeof C!="function"?A:function($,H){return C($,A,H)}},B={camelize:a,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(A,S){return n(N(a,S),A)},decamelizeKeys:function(A,S){return n(N(o,S),A,S)},pascalizeKeys:function(A,S){return n(N(i,S),A)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=B:e.humps=B})(Ru)})(as);var Lu=as.exports,Fu=["class","style"];function ju(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var r=n.indexOf(":"),a=Lu.camelize(n.slice(0,r)),i=n.slice(r+1).trim();return e[a]=i,e},{})}function $u(t){return t.split(/\s+/).reduce(function(e,n){return e[n]=!0,e},{})}function is(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(l){return is(l)}),a=Object.keys(t.attributes||{}).reduce(function(l,c){var u=t.attributes[c];switch(c){case"class":l.class=$u(u);break;case"style":l.style=ju(u);break;default:l.attrs[c]=u}return l},{attrs:{},class:{},style:{}});n.class;var i=n.style,o=i===void 0?{}:i,s=Mu(n,Fu);return ff(t.tag,Lt(Lt(Lt({},e),{},{class:a.class,style:Lt(Lt({},a.style),o)},a.attrs),s),r)}var os=!1;try{os=!0}catch{}function Du(){if(!os&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function dr(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?ct({},t,e):{}}function zu(t){var e,n=(e={"fa-spin":t.spin,"fa-pulse":t.pulse,"fa-fw":t.fixedWidth,"fa-border":t.border,"fa-li":t.listItem,"fa-inverse":t.inverse,"fa-flip":t.flip===!0,"fa-flip-horizontal":t.flip==="horizontal"||t.flip==="both","fa-flip-vertical":t.flip==="vertical"||t.flip==="both"},ct(ct(ct(ct(ct(ct(ct(ct(ct(ct(e,"fa-".concat(t.size),t.size!==null),"fa-rotate-".concat(t.rotation),t.rotation!==null),"fa-pull-".concat(t.pull),t.pull!==null),"fa-swap-opacity",t.swapOpacity),"fa-bounce",t.bounce),"fa-shake",t.shake),"fa-beat",t.beat),"fa-fade",t.fade),"fa-beat-fade",t.beatFade),"fa-flash",t.flash),ct(ct(e,"fa-spin-pulse",t.spinPulse),"fa-spin-reverse",t.spinReverse));return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function Ni(t){if(t&&Rn(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if($r.icon)return $r.icon(t);if(t===null)return null;if(Rn(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}var Hu=xl({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(e){return[!0,!1,"horizontal","vertical","both"].indexOf(e)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},maskId:{type:String,default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(e){return["right","left"].indexOf(e)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(e){return[90,180,270].indexOf(Number.parseInt(e,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(e){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(e)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},titleId:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(e,n){var r=n.attrs,a=ae(function(){return Ni(e.icon)}),i=ae(function(){return dr("classes",zu(e))}),o=ae(function(){return dr("transform",typeof e.transform=="string"?$r.transform(e.transform):e.transform)}),s=ae(function(){return dr("mask",Ni(e.mask))}),l=ae(function(){return Cu(a.value,Lt(Lt(Lt(Lt({},i.value),o.value),s.value),{},{symbol:e.symbol,title:e.title,titleId:e.titleId,maskId:e.maskId}))});wn(l,function(u){if(!u)return Du("Could not find one or more icon(s)",a.value,s.value)},{immediate:!0});var c=ae(function(){return l.value?is(l.value.abstract[0],{},r):null});return function(){return c.value}}});Rf(Xf).component("font-awesome-icon",Hu).mount("#app");
