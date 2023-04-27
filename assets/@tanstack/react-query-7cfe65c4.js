import{r as F}from"../vendor-b612640b.js";import{s as ve}from"../@react-rxjs/core-1a0bb4f0.js";class A{constructor(){this.listeners=[],this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.push(e),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(t=>t!==e),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}const I=typeof window>"u"||"Deno"in window;function w(){}function me(s,e){return typeof s=="function"?s(e):s}function B(s){return typeof s=="number"&&s>=0&&s!==1/0}function ne(s,e){return Math.max(s+(e||0)-Date.now(),0)}function M(s,e,t){return j(s)?typeof e=="function"?{...t,queryKey:s,queryFn:e}:{...e,queryKey:s}:s}function q(s,e,t){return j(s)?[{...e,queryKey:s},t]:[s||{},e]}function J(s,e){const{type:t="all",exact:r,fetchStatus:i,predicate:n,queryKey:u,stale:a}=s;if(j(u)){if(r){if(e.queryHash!==z(u,e.options))return!1}else if(!U(e.queryKey,u))return!1}if(t!=="all"){const o=e.isActive();if(t==="active"&&!o||t==="inactive"&&o)return!1}return!(typeof a=="boolean"&&e.isStale()!==a||typeof i<"u"&&i!==e.state.fetchStatus||n&&!n(e))}function X(s,e){const{exact:t,fetching:r,predicate:i,mutationKey:n}=s;if(j(n)){if(!e.options.mutationKey)return!1;if(t){if(D(e.options.mutationKey)!==D(n))return!1}else if(!U(e.options.mutationKey,n))return!1}return!(typeof r=="boolean"&&e.state.status==="loading"!==r||i&&!i(e))}function z(s,e){return((e==null?void 0:e.queryKeyHashFn)||D)(s)}function D(s){return JSON.stringify(s,(e,t)=>H(t)?Object.keys(t).sort().reduce((r,i)=>(r[i]=t[i],r),{}):t)}function U(s,e){return ue(s,e)}function ue(s,e){return s===e?!0:typeof s!=typeof e?!1:s&&e&&typeof s=="object"&&typeof e=="object"?!Object.keys(e).some(t=>!ue(s[t],e[t])):!1}function ae(s,e){if(s===e)return s;const t=Z(s)&&Z(e);if(t||H(s)&&H(e)){const r=t?s.length:Object.keys(s).length,i=t?e:Object.keys(e),n=i.length,u=t?[]:{};let a=0;for(let o=0;o<n;o++){const f=t?o:i[o];u[f]=ae(s[f],e[f]),u[f]===s[f]&&a++}return r===n&&a===r?s:u}return e}function Y(s,e){if(s&&!e||e&&!s)return!1;for(const t in s)if(s[t]!==e[t])return!1;return!0}function Z(s){return Array.isArray(s)&&s.length===Object.keys(s).length}function H(s){if(!$(s))return!1;const e=s.constructor;if(typeof e>"u")return!0;const t=e.prototype;return!(!$(t)||!t.hasOwnProperty("isPrototypeOf"))}function $(s){return Object.prototype.toString.call(s)==="[object Object]"}function j(s){return Array.isArray(s)}function oe(s){return new Promise(e=>{setTimeout(e,s)})}function ee(s){oe(0).then(s)}function be(){if(typeof AbortController=="function")return new AbortController}function G(s,e,t){return t.isDataEqual!=null&&t.isDataEqual(s,e)?s:typeof t.structuralSharing=="function"?t.structuralSharing(s,e):t.structuralSharing!==!1?ae(s,e):e}class ge extends A{constructor(){super(),this.setup=e=>{if(!I&&window.addEventListener){const t=()=>e();return window.addEventListener("visibilitychange",t,!1),window.addEventListener("focus",t,!1),()=>{window.removeEventListener("visibilitychange",t),window.removeEventListener("focus",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,(t=this.cleanup)==null||t.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()})}setFocused(e){this.focused=e,e&&this.onFocus()}onFocus(){this.listeners.forEach(e=>{e()})}isFocused(){return typeof this.focused=="boolean"?this.focused:typeof document>"u"?!0:[void 0,"visible","prerender"].includes(document.visibilityState)}}const K=new ge;class Ce extends A{constructor(){super(),this.setup=e=>{if(!I&&window.addEventListener){const t=()=>e();return window.addEventListener("online",t,!1),window.addEventListener("offline",t,!1),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,(t=this.cleanup)==null||t.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setOnline(r):this.onOnline()})}setOnline(e){this.online=e,e&&this.onOnline()}onOnline(){this.listeners.forEach(e=>{e()})}isOnline(){return typeof this.online=="boolean"?this.online:typeof navigator>"u"||typeof navigator.onLine>"u"?!0:navigator.onLine}}const L=new Ce;function Re(s){return Math.min(1e3*2**s,3e4)}function k(s){return(s??"online")==="online"?L.isOnline():!0}class le{constructor(e){this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}}function T(s){return s instanceof le}function ce(s){let e=!1,t=0,r=!1,i,n,u;const a=new Promise((c,b)=>{n=c,u=b}),o=c=>{r||(d(new le(c)),s.abort==null||s.abort())},f=()=>{e=!0},l=()=>{e=!1},y=()=>!K.isFocused()||s.networkMode!=="always"&&!L.isOnline(),m=c=>{r||(r=!0,s.onSuccess==null||s.onSuccess(c),i==null||i(),n(c))},d=c=>{r||(r=!0,s.onError==null||s.onError(c),i==null||i(),u(c))},g=()=>new Promise(c=>{i=b=>{const S=r||!y();return S&&c(b),S},s.onPause==null||s.onPause()}).then(()=>{i=void 0,r||s.onContinue==null||s.onContinue()}),R=()=>{if(r)return;let c;try{c=s.fn()}catch(b){c=Promise.reject(b)}Promise.resolve(c).then(m).catch(b=>{var S,C;if(r)return;const O=(S=s.retry)!=null?S:3,E=(C=s.retryDelay)!=null?C:Re,v=typeof E=="function"?E(t,b):E,p=O===!0||typeof O=="number"&&t<O||typeof O=="function"&&O(t,b);if(e||!p){d(b);return}t++,s.onFail==null||s.onFail(t,b),oe(v).then(()=>{if(y())return g()}).then(()=>{e?d(b):R()})})};return k(s.networkMode)?R():g().then(R),{promise:a,cancel:o,continue:()=>(i==null?void 0:i())?a:Promise.resolve(),cancelRetry:f,continueRetry:l}}const V=console;function Oe(){let s=[],e=0,t=l=>{l()},r=l=>{l()};const i=l=>{let y;e++;try{y=l()}finally{e--,e||a()}return y},n=l=>{e?s.push(l):ee(()=>{t(l)})},u=l=>(...y)=>{n(()=>{l(...y)})},a=()=>{const l=s;s=[],l.length&&ee(()=>{r(()=>{l.forEach(y=>{t(y)})})})};return{batch:i,batchCalls:u,schedule:n,setNotifyFunction:l=>{t=l},setBatchNotifyFunction:l=>{r=l}}}const P=Oe();class he{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),B(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){this.cacheTime=Math.max(this.cacheTime||0,e??(I?1/0:5*60*1e3))}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}class Pe extends he{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||V,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||Se(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.cache.remove(this)}setData(e,t){const r=G(this.state.data,e,this.options);return this.dispatch({data:r,type:"success",dataUpdatedAt:t==null?void 0:t.updatedAt,manual:t==null?void 0:t.manual}),r}setState(e,t){this.dispatch({type:"setState",state:e,setStateOptions:t})}cancel(e){var t;const r=this.promise;return(t=this.retryer)==null||t.cancel(e),r?r.then(w).catch(w):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>e.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!ne(this.state.dataUpdatedAt,e)}onFocus(){var e;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t&&t.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}onOnline(){var e;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t&&t.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.indexOf(e)!==-1&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,t){var r,i;if(this.state.fetchStatus!=="idle"){if(this.state.dataUpdatedAt&&t!=null&&t.cancelRefetch)this.cancel({silent:!0});else if(this.promise){var n;return(n=this.retryer)==null||n.continueRetry(),this.promise}}if(e&&this.setOptions(e),!this.options.queryFn){const d=this.observers.find(g=>g.options.queryFn);d&&this.setOptions(d.options)}Array.isArray(this.options.queryKey);const u=be(),a={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},o=d=>{Object.defineProperty(d,"signal",{enumerable:!0,get:()=>{if(u)return this.abortSignalConsumed=!0,u.signal}})};o(a);const f=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(a)):Promise.reject("Missing queryFn"),l={fetchOptions:t,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:f};if(o(l),(r=this.options.behavior)==null||r.onFetch(l),this.revertState=this.state,this.state.fetchStatus==="idle"||this.state.fetchMeta!==((i=l.fetchOptions)==null?void 0:i.meta)){var y;this.dispatch({type:"fetch",meta:(y=l.fetchOptions)==null?void 0:y.meta})}const m=d=>{if(T(d)&&d.silent||this.dispatch({type:"error",error:d}),!T(d)){var g,R,c,b;(g=(R=this.cache.config).onError)==null||g.call(R,d,this),(c=(b=this.cache.config).onSettled)==null||c.call(b,this.state.data,d,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=ce({fn:l.fetchFn,abort:u==null?void 0:u.abort.bind(u),onSuccess:d=>{var g,R,c,b;if(typeof d>"u"){m(new Error("undefined"));return}this.setData(d),(g=(R=this.cache.config).onSuccess)==null||g.call(R,d,this),(c=(b=this.cache.config).onSettled)==null||c.call(b,d,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:m,onFail:(d,g)=>{this.dispatch({type:"failed",failureCount:d,error:g})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){const t=r=>{var i,n;switch(e.type){case"failed":return{...r,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:(i=e.meta)!=null?i:null,fetchStatus:k(this.options.networkMode)?"fetching":"paused",...!r.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...r,data:e.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:(n=e.dataUpdatedAt)!=null?n:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const u=e.error;return T(u)&&u.revert&&this.revertState?{...this.revertState}:{...r,error:u,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:u,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...e.state}}};this.state=t(this.state),P.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}function Se(s){const e=typeof s.initialData=="function"?s.initialData():s.initialData,t=typeof e<"u",r=t?typeof s.initialDataUpdatedAt=="function"?s.initialDataUpdatedAt():s.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:t?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:t?"success":"loading",fetchStatus:"idle"}}class Fe extends A{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,t,r){var i;const n=t.queryKey,u=(i=t.queryHash)!=null?i:z(n,t);let a=this.get(u);return a||(a=new Pe({cache:this,logger:e.getLogger(),queryKey:n,queryHash:u,options:e.defaultQueryOptions(t),state:r,defaultOptions:e.getQueryDefaults(n)}),this.add(a)),a}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){const t=this.queriesMap[e.queryHash];t&&(e.destroy(),this.queries=this.queries.filter(r=>r!==e),t===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){P.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,t){const[r]=q(e,t);return typeof r.exact>"u"&&(r.exact=!0),this.queries.find(i=>J(r,i))}findAll(e,t){const[r]=q(e,t);return Object.keys(r).length>0?this.queries.filter(i=>J(r,i)):this.queries}notify(e){P.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){P.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){P.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}class Qe extends he{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||V,this.observers=[],this.state=e.state||we(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(t=>t!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||(this.state.status==="loading"?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,t;return(e=(t=this.retryer)==null?void 0:t.continue())!=null?e:this.execute()}async execute(){const e=()=>{var p;return this.retryer=ce({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(h,Q)=>{this.dispatch({type:"failed",failureCount:h,error:Q})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:(p=this.options.retry)!=null?p:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise},t=this.state.status==="loading";try{var r,i,n,u,a,o,f,l;if(!t){var y,m,d,g;this.dispatch({type:"loading",variables:this.options.variables}),await((y=(m=this.mutationCache.config).onMutate)==null?void 0:y.call(m,this.state.variables,this));const h=await((d=(g=this.options).onMutate)==null?void 0:d.call(g,this.state.variables));h!==this.state.context&&this.dispatch({type:"loading",context:h,variables:this.state.variables})}const p=await e();return await((r=(i=this.mutationCache.config).onSuccess)==null?void 0:r.call(i,p,this.state.variables,this.state.context,this)),await((n=(u=this.options).onSuccess)==null?void 0:n.call(u,p,this.state.variables,this.state.context)),await((a=(o=this.mutationCache.config).onSettled)==null?void 0:a.call(o,p,null,this.state.variables,this.state.context,this)),await((f=(l=this.options).onSettled)==null?void 0:f.call(l,p,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:p}),p}catch(p){try{var R,c,b,S,C,O,E,v;throw await((R=(c=this.mutationCache.config).onError)==null?void 0:R.call(c,p,this.state.variables,this.state.context,this)),await((b=(S=this.options).onError)==null?void 0:b.call(S,p,this.state.variables,this.state.context)),await((C=(O=this.mutationCache.config).onSettled)==null?void 0:C.call(O,void 0,p,this.state.variables,this.state.context,this)),await((E=(v=this.options).onSettled)==null?void 0:E.call(v,void 0,p,this.state.variables,this.state.context)),p}finally{this.dispatch({type:"error",error:p})}}}dispatch(e){const t=r=>{switch(e.type){case"failed":return{...r,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"loading":return{...r,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!k(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...r,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:e.error,failureCount:r.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...r,...e.state}}};this.state=t(this.state),P.batch(()=>{this.observers.forEach(r=>{r.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function we(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}class Ee extends A{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,t,r){const i=new Qe({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(t),state:r,defaultOptions:t.mutationKey?e.getMutationDefaults(t.mutationKey):void 0});return this.add(i),i}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(t=>t!==e),this.notify({type:"removed",mutation:e})}clear(){P.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return typeof e.exact>"u"&&(e.exact=!0),this.mutations.find(t=>X(e,t))}findAll(e){return this.mutations.filter(t=>X(e,t))}notify(e){P.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){var e;return this.resuming=((e=this.resuming)!=null?e:Promise.resolve()).then(()=>{const t=this.mutations.filter(r=>r.state.isPaused);return P.batch(()=>t.reduce((r,i)=>r.then(()=>i.continue().catch(w)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function qe(){return{onFetch:s=>{s.fetchFn=()=>{var e,t,r,i,n,u;const a=(e=s.fetchOptions)==null||(t=e.meta)==null?void 0:t.refetchPage,o=(r=s.fetchOptions)==null||(i=r.meta)==null?void 0:i.fetchMore,f=o==null?void 0:o.pageParam,l=(o==null?void 0:o.direction)==="forward",y=(o==null?void 0:o.direction)==="backward",m=((n=s.state.data)==null?void 0:n.pages)||[],d=((u=s.state.data)==null?void 0:u.pageParams)||[];let g=d,R=!1;const c=v=>{Object.defineProperty(v,"signal",{enumerable:!0,get:()=>{var p;if((p=s.signal)!=null&&p.aborted)R=!0;else{var h;(h=s.signal)==null||h.addEventListener("abort",()=>{R=!0})}return s.signal}})},b=s.options.queryFn||(()=>Promise.reject("Missing queryFn")),S=(v,p,h,Q)=>(g=Q?[p,...g]:[...g,p],Q?[h,...v]:[...v,h]),C=(v,p,h,Q)=>{if(R)return Promise.reject("Cancelled");if(typeof h>"u"&&!p&&v.length)return Promise.resolve(v);const x={queryKey:s.queryKey,pageParam:h,meta:s.options.meta};c(x);const N=b(x);return Promise.resolve(N).then(pe=>S(v,h,pe,Q))};let O;if(!m.length)O=C([]);else if(l){const v=typeof f<"u",p=v?f:te(s.options,m);O=C(m,v,p)}else if(y){const v=typeof f<"u",p=v?f:De(s.options,m);O=C(m,v,p,!0)}else{g=[];const v=typeof s.options.getNextPageParam>"u";O=(a&&m[0]?a(m[0],0,m):!0)?C([],v,d[0]):Promise.resolve(S([],d[0],m[0]));for(let h=1;h<m.length;h++)O=O.then(Q=>{if(a&&m[h]?a(m[h],h,m):!0){const N=v?d[h]:te(s.options,Q);return C(Q,v,N)}return Promise.resolve(S(Q,d[h],m[h]))})}return O.then(v=>({pages:v,pageParams:g}))}}}}function te(s,e){return s.getNextPageParam==null?void 0:s.getNextPageParam(e[e.length-1],e)}function De(s,e){return s.getPreviousPageParam==null?void 0:s.getPreviousPageParam(e[0],e)}class Ye{constructor(e={}){this.queryCache=e.queryCache||new Fe,this.mutationCache=e.mutationCache||new Ee,this.logger=e.logger||V,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,this.mountCount===1&&(this.unsubscribeFocus=K.subscribe(()=>{K.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=L.subscribe(()=>{L.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,t;this.mountCount--,this.mountCount===0&&((e=this.unsubscribeFocus)==null||e.call(this),this.unsubscribeFocus=void 0,(t=this.unsubscribeOnline)==null||t.call(this),this.unsubscribeOnline=void 0)}isFetching(e,t){const[r]=q(e,t);return r.fetchStatus="fetching",this.queryCache.findAll(r).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,t){var r;return(r=this.queryCache.find(e,t))==null?void 0:r.state.data}ensureQueryData(e,t,r){const i=M(e,t,r),n=this.getQueryData(i.queryKey);return n?Promise.resolve(n):this.fetchQuery(i)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:t,state:r})=>{const i=r.data;return[t,i]})}setQueryData(e,t,r){const i=this.queryCache.find(e),n=i==null?void 0:i.state.data,u=me(t,n);if(typeof u>"u")return;const a=M(e),o=this.defaultQueryOptions(a);return this.queryCache.build(this,o).setData(u,{...r,manual:!0})}setQueriesData(e,t,r){return P.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:i})=>[i,this.setQueryData(i,t,r)]))}getQueryState(e,t){var r;return(r=this.queryCache.find(e,t))==null?void 0:r.state}removeQueries(e,t){const[r]=q(e,t),i=this.queryCache;P.batch(()=>{i.findAll(r).forEach(n=>{i.remove(n)})})}resetQueries(e,t,r){const[i,n]=q(e,t,r),u=this.queryCache,a={type:"active",...i};return P.batch(()=>(u.findAll(i).forEach(o=>{o.reset()}),this.refetchQueries(a,n)))}cancelQueries(e,t,r){const[i,n={}]=q(e,t,r);typeof n.revert>"u"&&(n.revert=!0);const u=P.batch(()=>this.queryCache.findAll(i).map(a=>a.cancel(n)));return Promise.all(u).then(w).catch(w)}invalidateQueries(e,t,r){const[i,n]=q(e,t,r);return P.batch(()=>{var u,a;if(this.queryCache.findAll(i).forEach(f=>{f.invalidate()}),i.refetchType==="none")return Promise.resolve();const o={...i,type:(u=(a=i.refetchType)!=null?a:i.type)!=null?u:"active"};return this.refetchQueries(o,n)})}refetchQueries(e,t,r){const[i,n]=q(e,t,r),u=P.batch(()=>this.queryCache.findAll(i).filter(o=>!o.isDisabled()).map(o=>{var f;return o.fetch(void 0,{...n,cancelRefetch:(f=n==null?void 0:n.cancelRefetch)!=null?f:!0,meta:{refetchPage:i.refetchPage}})}));let a=Promise.all(u).then(w);return n!=null&&n.throwOnError||(a=a.catch(w)),a}fetchQuery(e,t,r){const i=M(e,t,r),n=this.defaultQueryOptions(i);typeof n.retry>"u"&&(n.retry=!1);const u=this.queryCache.build(this,n);return u.isStaleByTime(n.staleTime)?u.fetch(n):Promise.resolve(u.state.data)}prefetchQuery(e,t,r){return this.fetchQuery(e,t,r).then(w).catch(w)}fetchInfiniteQuery(e,t,r){const i=M(e,t,r);return i.behavior=qe(),this.fetchQuery(i)}prefetchInfiniteQuery(e,t,r){return this.fetchInfiniteQuery(e,t,r).then(w).catch(w)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,t){const r=this.queryDefaults.find(i=>D(e)===D(i.queryKey));r?r.defaultOptions=t:this.queryDefaults.push({queryKey:e,defaultOptions:t})}getQueryDefaults(e){if(!e)return;const t=this.queryDefaults.find(r=>U(e,r.queryKey));return t==null?void 0:t.defaultOptions}setMutationDefaults(e,t){const r=this.mutationDefaults.find(i=>D(e)===D(i.mutationKey));r?r.defaultOptions=t:this.mutationDefaults.push({mutationKey:e,defaultOptions:t})}getMutationDefaults(e){if(!e)return;const t=this.mutationDefaults.find(r=>U(e,r.mutationKey));return t==null?void 0:t.defaultOptions}defaultQueryOptions(e){if(e!=null&&e._defaulted)return e;const t={...this.defaultOptions.queries,...this.getQueryDefaults(e==null?void 0:e.queryKey),...e,_defaulted:!0};return!t.queryHash&&t.queryKey&&(t.queryHash=z(t.queryKey,t)),typeof t.refetchOnReconnect>"u"&&(t.refetchOnReconnect=t.networkMode!=="always"),typeof t.useErrorBoundary>"u"&&(t.useErrorBoundary=!!t.suspense),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(e==null?void 0:e.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}class xe extends A{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),se(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return _(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return _(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const r=this.options,i=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),Y(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const n=this.hasListeners();n&&re(this.currentQuery,i,this.options,r)&&this.executeFetch(),this.updateResult(t),n&&(this.currentQuery!==i||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const u=this.computeRefetchInterval();n&&(this.currentQuery!==i||this.options.enabled!==r.enabled||u!==this.currentRefetchInterval)&&this.updateRefetchInterval(u)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e);return this.createResult(t,e)}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach(r=>{Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})}),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,t);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,t))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:(t=e.cancelRefetch)!=null?t:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(w)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),I||this.currentResult.isStale||!B(this.options.staleTime))return;const t=ne(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(I||this.options.enabled===!1||!B(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||K.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const r=this.currentQuery,i=this.options,n=this.currentResult,u=this.currentResultState,a=this.currentResultOptions,o=e!==r,f=o?e.state:this.currentQueryInitialState,l=o?this.currentResult:this.previousQueryResult,{state:y}=e;let{dataUpdatedAt:m,error:d,errorUpdatedAt:g,fetchStatus:R,status:c}=y,b=!1,S=!1,C;if(t._optimisticResults){const h=this.hasListeners(),Q=!h&&se(e,t),x=h&&re(e,r,t,i);(Q||x)&&(R=k(e.options.networkMode)?"fetching":"paused",m||(c="loading")),t._optimisticResults==="isRestoring"&&(R="idle")}if(t.keepPreviousData&&!y.dataUpdatedAt&&l!=null&&l.isSuccess&&c!=="error")C=l.data,m=l.dataUpdatedAt,c=l.status,b=!0;else if(t.select&&typeof y.data<"u")if(n&&y.data===(u==null?void 0:u.data)&&t.select===this.selectFn)C=this.selectResult;else try{this.selectFn=t.select,C=t.select(y.data),C=G(n==null?void 0:n.data,C,t),this.selectResult=C,this.selectError=null}catch(h){this.selectError=h}else C=y.data;if(typeof t.placeholderData<"u"&&typeof C>"u"&&c==="loading"){let h;if(n!=null&&n.isPlaceholderData&&t.placeholderData===(a==null?void 0:a.placeholderData))h=n.data;else if(h=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof h<"u")try{h=t.select(h),this.selectError=null}catch(Q){this.selectError=Q}typeof h<"u"&&(c="success",C=G(n==null?void 0:n.data,h,t),S=!0)}this.selectError&&(d=this.selectError,C=this.selectResult,g=Date.now(),c="error");const O=R==="fetching",E=c==="loading",v=c==="error";return{status:c,fetchStatus:R,isLoading:E,isSuccess:c==="success",isError:v,isInitialLoading:E&&O,data:C,dataUpdatedAt:m,error:d,errorUpdatedAt:g,failureCount:y.fetchFailureCount,failureReason:y.fetchFailureReason,errorUpdateCount:y.errorUpdateCount,isFetched:y.dataUpdateCount>0||y.errorUpdateCount>0,isFetchedAfterMount:y.dataUpdateCount>f.dataUpdateCount||y.errorUpdateCount>f.errorUpdateCount,isFetching:O,isRefetching:O&&!E,isLoadingError:v&&y.dataUpdatedAt===0,isPaused:R==="paused",isPlaceholderData:S,isPreviousData:b,isRefetchError:v&&y.dataUpdatedAt!==0,isStale:W(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,Y(r,t))return;this.currentResult=r;const i={cache:!0},n=()=>{if(!t)return!0;const{notifyOnChangeProps:u}=this.options;if(u==="all"||!u&&!this.trackedProps.size)return!0;const a=new Set(u??this.trackedProps);return this.options.useErrorBoundary&&a.add("error"),Object.keys(this.currentResult).some(o=>{const f=o;return this.currentResult[f]!==t[f]&&a.has(f)})};(e==null?void 0:e.listeners)!==!1&&n()&&(i.listeners=!0),this.notify({...i,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!e.manual:e.type==="error"&&!T(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){P.batch(()=>{if(e.onSuccess){var t,r,i,n;(t=(r=this.options).onSuccess)==null||t.call(r,this.currentResult.data),(i=(n=this.options).onSettled)==null||i.call(n,this.currentResult.data,null)}else if(e.onError){var u,a,o,f;(u=(a=this.options).onError)==null||u.call(a,this.currentResult.error),(o=(f=this.options).onSettled)==null||o.call(f,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(l=>{l(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function Me(s,e){return e.enabled!==!1&&!s.state.dataUpdatedAt&&!(s.state.status==="error"&&e.retryOnMount===!1)}function se(s,e){return Me(s,e)||s.state.dataUpdatedAt>0&&_(s,e,e.refetchOnMount)}function _(s,e,t){if(e.enabled!==!1){const r=typeof t=="function"?t(s):t;return r==="always"||r!==!1&&W(s,e)}return!1}function re(s,e,t,r){return t.enabled!==!1&&(s!==e||r.enabled===!1)&&(!t.suspense||s.state.status!=="error")&&W(s,t)}function W(s,e){return s.isStaleByTime(e.staleTime)}const Ie=ve.useSyncExternalStore,ie=F.createContext(void 0),de=F.createContext(!1);function fe(s,e){return s||(e&&typeof window<"u"?(window.ReactQueryClientContext||(window.ReactQueryClientContext=ie),window.ReactQueryClientContext):ie)}const Ae=({context:s}={})=>{const e=F.useContext(fe(s,F.useContext(de)));if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Ze=({client:s,children:e,context:t,contextSharing:r=!1})=>{F.useEffect(()=>(s.mount(),()=>{s.unmount()}),[s]);const i=fe(t,r);return F.createElement(de.Provider,{value:!t&&r},F.createElement(i.Provider,{value:s},e))},ye=F.createContext(!1),Te=()=>F.useContext(ye);ye.Provider;function Ue(){let s=!1;return{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s}}const Ke=F.createContext(Ue()),Le=()=>F.useContext(Ke);function je(s,e){return typeof s=="function"?s(...e):!!s}const ke=(s,e)=>{(s.suspense||s.useErrorBoundary)&&(e.isReset()||(s.retryOnMount=!1))},Ne=s=>{F.useEffect(()=>{s.clearReset()},[s])},Be=({result:s,errorResetBoundary:e,useErrorBoundary:t,query:r})=>s.isError&&!e.isReset()&&!s.isFetching&&je(t,[s.error,r]),He=s=>{s.suspense&&typeof s.staleTime!="number"&&(s.staleTime=1e3)},Ge=(s,e)=>s.isLoading&&s.isFetching&&!e,_e=(s,e,t)=>(s==null?void 0:s.suspense)&&Ge(e,t),ze=(s,e,t)=>e.fetchOptimistic(s).then(({data:r})=>{s.onSuccess==null||s.onSuccess(r),s.onSettled==null||s.onSettled(r,null)}).catch(r=>{t.clearReset(),s.onError==null||s.onError(r),s.onSettled==null||s.onSettled(void 0,r)});function Ve(s,e){const t=Ae({context:s.context}),r=Te(),i=Le(),n=t.defaultQueryOptions(s);n._optimisticResults=r?"isRestoring":"optimistic",n.onError&&(n.onError=P.batchCalls(n.onError)),n.onSuccess&&(n.onSuccess=P.batchCalls(n.onSuccess)),n.onSettled&&(n.onSettled=P.batchCalls(n.onSettled)),He(n),ke(n,i),Ne(i);const[u]=F.useState(()=>new e(t,n)),a=u.getOptimisticResult(n);if(Ie(F.useCallback(o=>r?()=>{}:u.subscribe(P.batchCalls(o)),[u,r]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),F.useEffect(()=>{u.setOptions(n,{listeners:!1})},[n,u]),_e(n,a,r))throw ze(n,u,i);if(Be({result:a,errorResetBoundary:i,useErrorBoundary:n.useErrorBoundary,query:u.getCurrentQuery()}))throw a.error;return n.notifyOnChangeProps?a:u.trackResult(a)}function $e(s,e,t){const r=M(s,e,t);return Ve(r,xe)}export{Ye as Q,Ze as a,$e as u};
