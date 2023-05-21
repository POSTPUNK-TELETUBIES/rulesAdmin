import{b as J}from"./vendor-b612640b.js";var le=e=>e.type==="checkbox",ee=e=>e instanceof Date,O=e=>e==null;const Ge=e=>typeof e=="object";var m=e=>!O(e)&&!Array.isArray(e)&&Ge(e)&&!ee(e),ft=e=>m(e)&&e.target?le(e.target)?e.target.checked:e.target.value:e,ct=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,dt=(e,i)=>e.has(ct(i)),yt=e=>{const i=e.constructor&&e.constructor.prototype;return m(i)&&i.hasOwnProperty("isPrototypeOf")},Ee=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function G(e){let i;const s=Array.isArray(e);if(e instanceof Date)i=new Date(e);else if(e instanceof Set)i=new Set(e);else if(!(Ee&&(e instanceof Blob||e instanceof FileList))&&(s||m(e)))if(i=s?[]:{},!Array.isArray(e)&&!yt(e))i=e;else for(const r in e)i[r]=G(e[r]);else return e;return i}var ae=e=>Array.isArray(e)?e.filter(Boolean):[],k=e=>e===void 0,d=(e,i,s)=>{if(!i||!m(e))return s;const r=ae(i.split(/[,[\].]+?/)).reduce((u,a)=>O(u)?u:u[a],e);return k(r)||r===e?k(e[i])?s:e[i]:r};const Ie={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},N={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},W={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};J.createContext(null);var ht=(e,i,s,r=!0)=>{const u={defaultValues:i._defaultValues};for(const a in e)Object.defineProperty(u,a,{get:()=>{const y=a;return i._proxyFormState[y]!==N.all&&(i._proxyFormState[y]=!r||N.all),s&&(s[y]=!0),e[y]}});return u},R=e=>m(e)&&!Object.keys(e).length,gt=(e,i,s,r)=>{s(e);const{name:u,...a}=e;return R(a)||Object.keys(a).length>=Object.keys(i).length||Object.keys(a).find(y=>i[y]===(!r||N.all))},Fe=e=>Array.isArray(e)?e:[e];function vt(e){const i=J.useRef(e);i.current=e,J.useEffect(()=>{const s=!e.disabled&&i.current.subject&&i.current.subject.subscribe({next:i.current.next});return()=>{s&&s.unsubscribe()}},[e.disabled])}var P=e=>typeof e=="string",_t=(e,i,s,r,u)=>P(e)?(r&&i.watch.add(e),d(s,e,u)):Array.isArray(e)?e.map(a=>(r&&i.watch.add(a),d(s,a))):(r&&(i.watchAll=!0),s),pe=e=>/^\w*$/.test(e),Je=e=>ae(e.replace(/["|']|\]/g,"").split(/\.|\[/));function x(e,i,s){let r=-1;const u=pe(i)?[i]:Je(i),a=u.length,y=a-1;for(;++r<a;){const b=u[r];let A=s;if(r!==y){const L=e[b];A=m(L)||Array.isArray(L)?L:isNaN(+u[r+1])?{}:[]}e[b]=A,e=e[b]}return e}var Vt=(e,i,s,r,u)=>i?{...s[e],types:{...s[e]&&s[e].types?s[e].types:{},[r]:u||!0}}:{};const me=(e,i,s)=>{for(const r of s||Object.keys(e)){const u=d(e,r);if(u){const{_f:a,...y}=u;if(a&&i(a.name)){if(a.ref.focus){a.ref.focus();break}else if(a.refs&&a.refs[0].focus){a.refs[0].focus();break}}else m(y)&&me(y,i)}}};var Pe=e=>({isOnSubmit:!e||e===N.onSubmit,isOnBlur:e===N.onBlur,isOnChange:e===N.onChange,isOnAll:e===N.all,isOnTouch:e===N.onTouched}),qe=(e,i,s)=>!s&&(i.watchAll||i.watch.has(e)||[...i.watch].some(r=>e.startsWith(r)&&/^\.\w+/.test(e.slice(r.length)))),At=(e,i,s)=>{const r=ae(d(e,s));return x(r,"root",i[s]),x(e,s,r),e},te=e=>typeof e=="boolean",Oe=e=>e.type==="file",K=e=>typeof e=="function",ce=e=>{if(!Ee)return!1;const i=e?e.ownerDocument:0;return e instanceof(i&&i.defaultView?i.defaultView.HTMLElement:HTMLElement)},fe=e=>P(e),Te=e=>e.type==="radio",de=e=>e instanceof RegExp;const He={value:!1,isValid:!1},We={value:!0,isValid:!0};var Qe=e=>{if(Array.isArray(e)){if(e.length>1){const i=e.filter(s=>s&&s.checked&&!s.disabled).map(s=>s.value);return{value:i,isValid:!!i.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!k(e[0].attributes.value)?k(e[0].value)||e[0].value===""?We:{value:e[0].value,isValid:!0}:We:He}return He};const $e={isValid:!1,value:null};var Xe=e=>Array.isArray(e)?e.reduce((i,s)=>s&&s.checked&&!s.disabled?{isValid:!0,value:s.value}:i,$e):$e;function Ke(e,i,s="validate"){if(fe(e)||Array.isArray(e)&&e.every(fe)||te(e)&&!e)return{type:s,message:fe(e)?e:"",ref:i}}var Z=e=>m(e)&&!de(e)?e:{value:e,message:""},je=async(e,i,s,r,u)=>{const{ref:a,refs:y,required:b,maxLength:A,minLength:L,min:X,max:S,pattern:_,validate:$,name:C,valueAsNumber:ge,mount:oe,disabled:ve}=e._f,g=d(i,C);if(!oe||ve)return{};const M=y?y[0]:a,q=V=>{r&&M.reportValidity&&(M.setCustomValidity(te(V)?"":V||""),M.reportValidity())},E={},re=Te(a),se=le(a),_e=re||se,B=(ge||Oe(a))&&k(a.value)&&k(g)||ce(a)&&a.value===""||g===""||Array.isArray(g)&&!g.length,j=Vt.bind(null,C,s,E),H=(V,v,w,T=W.maxLength,U=W.minLength)=>{const I=V?v:w;E[C]={type:V?T:U,message:I,ref:a,...j(V?T:U,I)}};if(u?!Array.isArray(g)||!g.length:b&&(!_e&&(B||O(g))||te(g)&&!g||se&&!Qe(y).isValid||re&&!Xe(y).isValid)){const{value:V,message:v}=fe(b)?{value:!!b,message:b}:Z(b);if(V&&(E[C]={type:W.required,message:v,ref:M,...j(W.required,v)},!s))return q(v),E}if(!B&&(!O(X)||!O(S))){let V,v;const w=Z(S),T=Z(X);if(!O(g)&&!isNaN(g)){const U=a.valueAsNumber||g&&+g;O(w.value)||(V=U>w.value),O(T.value)||(v=U<T.value)}else{const U=a.valueAsDate||new Date(g),I=ne=>new Date(new Date().toDateString()+" "+ne),z=a.type=="time",ie=a.type=="week";P(w.value)&&g&&(V=z?I(g)>I(w.value):ie?g>w.value:U>new Date(w.value)),P(T.value)&&g&&(v=z?I(g)<I(T.value):ie?g<T.value:U<new Date(T.value))}if((V||v)&&(H(!!V,w.message,T.message,W.max,W.min),!s))return q(E[C].message),E}if((A||L)&&!B&&(P(g)||u&&Array.isArray(g))){const V=Z(A),v=Z(L),w=!O(V.value)&&g.length>+V.value,T=!O(v.value)&&g.length<+v.value;if((w||T)&&(H(w,V.message,v.message),!s))return q(E[C].message),E}if(_&&!B&&P(g)){const{value:V,message:v}=Z(_);if(de(V)&&!g.match(V)&&(E[C]={type:W.pattern,message:v,ref:a,...j(W.pattern,v)},!s))return q(v),E}if($){if(K($)){const V=await $(g,i),v=Ke(V,M);if(v&&(E[C]={...v,...j(W.validate,v.message)},!s))return q(v.message),E}else if(m($)){let V={};for(const v in $){if(!R(V)&&!s)break;const w=Ke(await $[v](g,i),M,v);w&&(V={...w,...j(v,w.message)},q(w.message),s&&(E[C]=V))}if(!R(V)&&(E[C]={ref:M,...V},!s))return E}}return q(!0),E};function bt(e,i){const s=i.slice(0,-1).length;let r=0;for(;r<s;)e=k(e)?r++:e[i[r++]];return e}function xt(e){for(const i in e)if(!k(e[i]))return!1;return!0}function p(e,i){const s=Array.isArray(i)?i:pe(i)?[i]:Je(i),r=s.length===1?e:bt(e,s),u=s.length-1,a=s[u];return r&&delete r[a],u!==0&&(m(r)&&R(r)||Array.isArray(r)&&xt(r))&&p(e,s.slice(0,-1)),e}function we(){let e=[];return{get observers(){return e},next:u=>{for(const a of e)a.next&&a.next(u)},subscribe:u=>(e.push(u),{unsubscribe:()=>{e=e.filter(a=>a!==u)}}),unsubscribe:()=>{e=[]}}}var ye=e=>O(e)||!Ge(e);function Q(e,i){if(ye(e)||ye(i))return e===i;if(ee(e)&&ee(i))return e.getTime()===i.getTime();const s=Object.keys(e),r=Object.keys(i);if(s.length!==r.length)return!1;for(const u of s){const a=e[u];if(!r.includes(u))return!1;if(u!=="ref"){const y=i[u];if(ee(a)&&ee(y)||m(a)&&m(y)||Array.isArray(a)&&Array.isArray(y)?!Q(a,y):a!==y)return!1}}return!0}var Ye=e=>e.type==="select-multiple",Ft=e=>Te(e)||le(e),De=e=>ce(e)&&e.isConnected,Ze=e=>{for(const i in e)if(K(e[i]))return!0;return!1};function he(e,i={}){const s=Array.isArray(e);if(m(e)||s)for(const r in e)Array.isArray(e[r])||m(e[r])&&!Ze(e[r])?(i[r]=Array.isArray(e[r])?[]:{},he(e[r],i[r])):O(e[r])||(i[r]=!0);return i}function et(e,i,s){const r=Array.isArray(e);if(m(e)||r)for(const u in e)Array.isArray(e[u])||m(e[u])&&!Ze(e[u])?k(i)||ye(s[u])?s[u]=Array.isArray(e[u])?he(e[u],[]):{...he(e[u])}:et(e[u],O(i)?{}:i[u],s[u]):s[u]=!Q(e[u],i[u]);return s}var ke=(e,i)=>et(e,i,he(i)),tt=(e,{valueAsNumber:i,valueAsDate:s,setValueAs:r})=>k(e)?e:i?e===""?NaN:e&&+e:s&&P(e)?new Date(e):r?r(e):e;function Se(e){const i=e.ref;if(!(e.refs?e.refs.every(s=>s.disabled):i.disabled))return Oe(i)?i.files:Te(i)?Xe(e.refs).value:Ye(i)?[...i.selectedOptions].map(({value:s})=>s):le(i)?Qe(e.refs).value:tt(k(i.value)?e.ref.value:i.value,e)}var wt=(e,i,s,r)=>{const u={};for(const a of e){const y=d(i,a);y&&x(u,a,y._f)}return{criteriaMode:s,names:[...e],fields:u,shouldUseNativeValidation:r}},ue=e=>k(e)?e:de(e)?e.source:m(e)?de(e.value)?e.value.source:e.value:e,Dt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ze(e,i,s){const r=d(e,s);if(r||pe(s))return{error:r,name:s};const u=s.split(".");for(;u.length;){const a=u.join("."),y=d(i,a),b=d(e,a);if(y&&!Array.isArray(y)&&s!==a)return{name:s};if(b&&b.type)return{name:a,error:b};u.pop()}return{name:s}}var kt=(e,i,s,r,u)=>u.isOnAll?!1:!s&&u.isOnTouch?!(i||e):(s?r.isOnBlur:u.isOnBlur)?!e:(s?r.isOnChange:u.isOnChange)?e:!0,St=(e,i)=>!ae(d(e,i)).length&&p(e,i);const mt={mode:N.onSubmit,reValidateMode:N.onChange,shouldFocusError:!0};function Et(e={},i){let s={...mt,...e},r={submitCount:0,isDirty:!1,isLoading:K(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},u={},a=m(s.defaultValues)||m(s.values)?G(s.defaultValues||s.values)||{}:{},y=s.shouldUnregister?{}:G(a),b={action:!1,mount:!1,watch:!1},A={mount:new Set,unMount:new Set,array:new Set,watch:new Set},L,X=0;const S={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},_={values:we(),array:we(),state:we()},$=e.resetOptions&&e.resetOptions.keepDirtyValues,C=Pe(s.mode),ge=Pe(s.reValidateMode),oe=s.criteriaMode===N.all,ve=t=>n=>{clearTimeout(X),X=setTimeout(t,n)},g=async t=>{if(S.isValid||t){const n=s.resolver?R((await B()).errors):await H(u,!0);n!==r.isValid&&_.state.next({isValid:n})}},M=t=>S.isValidating&&_.state.next({isValidating:t}),q=(t,n=[],l,c,f=!0,o=!0)=>{if(c&&l){if(b.action=!0,o&&Array.isArray(d(u,t))){const h=l(d(u,t),c.argA,c.argB);f&&x(u,t,h)}if(o&&Array.isArray(d(r.errors,t))){const h=l(d(r.errors,t),c.argA,c.argB);f&&x(r.errors,t,h),St(r.errors,t)}if(S.touchedFields&&o&&Array.isArray(d(r.touchedFields,t))){const h=l(d(r.touchedFields,t),c.argA,c.argB);f&&x(r.touchedFields,t,h)}S.dirtyFields&&(r.dirtyFields=ke(a,y)),_.state.next({name:t,isDirty:v(t,n),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else x(y,t,n)},E=(t,n)=>{x(r.errors,t,n),_.state.next({errors:r.errors})},re=(t,n,l,c)=>{const f=d(u,t);if(f){const o=d(y,t,k(l)?d(a,t):l);k(o)||c&&c.defaultChecked||n?x(y,t,n?o:Se(f._f)):U(t,o),b.mount&&g()}},se=(t,n,l,c,f)=>{let o=!1,h=!1;const F={name:t};if(!l||c){S.isDirty&&(h=r.isDirty,r.isDirty=F.isDirty=v(),o=h!==F.isDirty);const D=Q(d(a,t),n);h=d(r.dirtyFields,t),D?p(r.dirtyFields,t):x(r.dirtyFields,t,!0),F.dirtyFields=r.dirtyFields,o=o||S.dirtyFields&&h!==!D}if(l){const D=d(r.touchedFields,t);D||(x(r.touchedFields,t,l),F.touchedFields=r.touchedFields,o=o||S.touchedFields&&D!==l)}return o&&f&&_.state.next(F),o?F:{}},_e=(t,n,l,c)=>{const f=d(r.errors,t),o=S.isValid&&te(n)&&r.isValid!==n;if(e.delayError&&l?(L=ve(()=>E(t,l)),L(e.delayError)):(clearTimeout(X),L=null,l?x(r.errors,t,l):p(r.errors,t)),(l?!Q(f,l):f)||!R(c)||o){const h={...c,...o&&te(n)?{isValid:n}:{},errors:r.errors,name:t};r={...r,...h},_.state.next(h)}M(!1)},B=async t=>s.resolver(y,s.context,wt(t||A.mount,u,s.criteriaMode,s.shouldUseNativeValidation)),j=async t=>{const{errors:n}=await B();if(t)for(const l of t){const c=d(n,l);c?x(r.errors,l,c):p(r.errors,l)}else r.errors=n;return n},H=async(t,n,l={valid:!0})=>{for(const c in t){const f=t[c];if(f){const{_f:o,...h}=f;if(o){const F=A.array.has(o.name),D=await je(f,y,oe,s.shouldUseNativeValidation&&!n,F);if(D[o.name]&&(l.valid=!1,n))break;!n&&(d(D,o.name)?F?At(r.errors,D,o.name):x(r.errors,o.name,D[o.name]):p(r.errors,o.name))}h&&await H(h,n,l)}}return l.valid},V=()=>{for(const t of A.unMount){const n=d(u,t);n&&(n._f.refs?n._f.refs.every(l=>!De(l)):!De(n._f.ref))&&Ve(t)}A.unMount=new Set},v=(t,n)=>(t&&n&&x(y,t,n),!Q(Le(),a)),w=(t,n,l)=>_t(t,A,{...b.mount?y:k(n)?a:P(t)?{[t]:n}:n},l,n),T=t=>ae(d(b.mount?y:a,t,e.shouldUnregister?d(a,t,[]):[])),U=(t,n,l={})=>{const c=d(u,t);let f=n;if(c){const o=c._f;o&&(!o.disabled&&x(y,t,tt(n,o)),f=ce(o.ref)&&O(n)?"":n,Ye(o.ref)?[...o.ref.options].forEach(h=>h.selected=f.includes(h.value)):o.refs?le(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(f)?!!f.find(F=>F===h.value):f===h.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(h=>h.checked=h.value===f):Oe(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||_.values.next({name:t,values:{...y}})))}(l.shouldDirty||l.shouldTouch)&&se(t,f,l.shouldTouch,l.shouldDirty,!0),l.shouldValidate&&ne(t)},I=(t,n,l)=>{for(const c in n){const f=n[c],o=`${t}.${c}`,h=d(u,o);(A.array.has(t)||!ye(f)||h&&!h._f)&&!ee(f)?I(o,f,l):U(o,f,l)}},z=(t,n,l={})=>{const c=d(u,t),f=A.array.has(t),o=G(n);x(y,t,o),f?(_.array.next({name:t,values:{...y}}),(S.isDirty||S.dirtyFields)&&l.shouldDirty&&_.state.next({name:t,dirtyFields:ke(a,y),isDirty:v(t,o)})):c&&!c._f&&!O(o)?I(t,o,l):U(t,o,l),qe(t,A)&&_.state.next({...r}),_.values.next({name:t,values:{...y}}),!b.mount&&i()},ie=async t=>{const n=t.target;let l=n.name,c=!0;const f=d(u,l),o=()=>n.type?Se(f._f):ft(t);if(f){let h,F;const D=o(),Y=t.type===Ie.BLUR||t.type===Ie.FOCUS_OUT,lt=!Dt(f._f)&&!s.resolver&&!d(r.errors,l)&&!f._f.deps||kt(Y,d(r.touchedFields,l),r.isSubmitted,ge,C),be=qe(l,A,Y);x(y,l,D),Y?(f._f.onBlur&&f._f.onBlur(t),L&&L(0)):f._f.onChange&&f._f.onChange(t);const xe=se(l,D,Y,!1),at=!R(xe)||be;if(!Y&&_.values.next({name:l,type:t.type,values:{...y}}),lt)return S.isValid&&g(),at&&_.state.next({name:l,...be?{}:xe});if(!Y&&be&&_.state.next({...r}),M(!0),s.resolver){const{errors:Ne}=await B([l]),ot=ze(r.errors,u,l),Be=ze(Ne,u,ot.name||l);h=Be.error,l=Be.name,F=R(Ne)}else h=(await je(f,y,oe,s.shouldUseNativeValidation))[l],c=isNaN(D)||D===d(y,l,D),c&&(h?F=!1:S.isValid&&(F=await H(u,!0)));c&&(f._f.deps&&ne(f._f.deps),_e(l,F,h,xe))}},ne=async(t,n={})=>{let l,c;const f=Fe(t);if(M(!0),s.resolver){const o=await j(k(t)?t:f);l=R(o),c=t?!f.some(h=>d(o,h)):l}else t?(c=(await Promise.all(f.map(async o=>{const h=d(u,o);return await H(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!c&&!r.isValid)&&g()):c=l=await H(u);return _.state.next({...!P(t)||S.isValid&&l!==r.isValid?{}:{name:t},...s.resolver||!t?{isValid:l}:{},errors:r.errors,isValidating:!1}),n.shouldFocus&&!c&&me(u,o=>o&&d(r.errors,o),t?f:A.mount),c},Le=t=>{const n={...a,...b.mount?y:{}};return k(t)?n:P(t)?d(n,t):t.map(l=>d(n,l))},Ce=(t,n)=>({invalid:!!d((n||r).errors,t),isDirty:!!d((n||r).dirtyFields,t),isTouched:!!d((n||r).touchedFields,t),error:d((n||r).errors,t)}),rt=t=>{t&&Fe(t).forEach(n=>p(r.errors,n)),_.state.next({errors:t?r.errors:{}})},st=(t,n,l)=>{const c=(d(u,t,{_f:{}})._f||{}).ref;x(r.errors,t,{...n,ref:c}),_.state.next({name:t,errors:r.errors,isValid:!1}),l&&l.shouldFocus&&c&&c.focus&&c.focus()},it=(t,n)=>K(t)?_.values.subscribe({next:l=>t(w(void 0,n),l)}):w(t,n,!0),Ve=(t,n={})=>{for(const l of t?Fe(t):A.mount)A.mount.delete(l),A.array.delete(l),n.keepValue||(p(u,l),p(y,l)),!n.keepError&&p(r.errors,l),!n.keepDirty&&p(r.dirtyFields,l),!n.keepTouched&&p(r.touchedFields,l),!s.shouldUnregister&&!n.keepDefaultValue&&p(a,l);_.values.next({values:{...y}}),_.state.next({...r,...n.keepDirty?{isDirty:v()}:{}}),!n.keepIsValid&&g()},Ae=(t,n={})=>{let l=d(u,t);const c=te(n.disabled);return x(u,t,{...l||{},_f:{...l&&l._f?l._f:{ref:{name:t}},name:t,mount:!0,...n}}),A.mount.add(t),l?c&&x(y,t,n.disabled?void 0:d(y,t,Se(l._f))):re(t,!0,n.value),{...c?{disabled:n.disabled}:{},...s.shouldUseNativeValidation?{required:!!n.required,min:ue(n.min),max:ue(n.max),minLength:ue(n.minLength),maxLength:ue(n.maxLength),pattern:ue(n.pattern)}:{},name:t,onChange:ie,onBlur:ie,ref:f=>{if(f){Ae(t,n),l=d(u,t);const o=k(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,h=Ft(o),F=l._f.refs||[];if(h?F.find(D=>D===o):o===l._f.ref)return;x(u,t,{_f:{...l._f,...h?{refs:[...F.filter(De),o,...Array.isArray(d(a,t))?[{}]:[]],ref:{type:o.type,name:t}}:{ref:o}}}),re(t,!1,void 0,o)}else l=d(u,t,{}),l._f&&(l._f.mount=!1),(s.shouldUnregister||n.shouldUnregister)&&!(dt(A.array,t)&&b.action)&&A.unMount.add(t)}}},Ue=()=>s.shouldFocusError&&me(u,t=>t&&d(r.errors,t),A.mount),nt=(t,n)=>async l=>{l&&(l.preventDefault&&l.preventDefault(),l.persist&&l.persist());let c=G(y);if(_.state.next({isSubmitting:!0}),s.resolver){const{errors:f,values:o}=await B();r.errors=f,c=o}else await H(u);p(r.errors,"root"),R(r.errors)?(_.state.next({errors:{}}),await t(c,l)):(n&&await n({...r.errors},l),Ue(),setTimeout(Ue)),_.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:R(r.errors),submitCount:r.submitCount+1,errors:r.errors})},ut=(t,n={})=>{d(u,t)&&(k(n.defaultValue)?z(t,d(a,t)):(z(t,n.defaultValue),x(a,t,n.defaultValue)),n.keepTouched||p(r.touchedFields,t),n.keepDirty||(p(r.dirtyFields,t),r.isDirty=n.defaultValue?v(t,d(a,t)):v()),n.keepError||(p(r.errors,t),S.isValid&&g()),_.state.next({...r}))},Re=(t,n={})=>{const l=t||a,c=G(l),f=t&&!R(t)?c:a;if(n.keepDefaultValues||(a=l),!n.keepValues){if(n.keepDirtyValues||$)for(const o of A.mount)d(r.dirtyFields,o)?x(f,o,d(y,o)):z(o,d(f,o));else{if(Ee&&k(t))for(const o of A.mount){const h=d(u,o);if(h&&h._f){const F=Array.isArray(h._f.refs)?h._f.refs[0]:h._f.ref;if(ce(F)){const D=F.closest("form");if(D){D.reset();break}}}}u={}}y=e.shouldUnregister?n.keepDefaultValues?G(a):{}:c,_.array.next({values:{...f}}),_.values.next({values:{...f}})}A={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!b.mount&&i(),b.mount=!S.isValid||!!n.keepIsValid,b.watch=!!e.shouldUnregister,_.state.next({submitCount:n.keepSubmitCount?r.submitCount:0,isDirty:n.keepDirty?r.isDirty:!!(n.keepDefaultValues&&!Q(t,a)),isSubmitted:n.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:n.keepDirtyValues?r.dirtyFields:n.keepDefaultValues&&t?ke(a,t):{},touchedFields:n.keepTouched?r.touchedFields:{},errors:n.keepErrors?r.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},Me=(t,n)=>Re(K(t)?t(y):t,n);return{control:{register:Ae,unregister:Ve,getFieldState:Ce,_executeSchema:B,_getWatch:w,_getDirty:v,_updateValid:g,_removeUnmounted:V,_updateFieldArray:q,_getFieldArray:T,_reset:Re,_resetDefaultValues:()=>K(s.defaultValues)&&s.defaultValues().then(t=>{Me(t,s.resetOptions),_.state.next({isLoading:!1})}),_updateFormState:t=>{r={...r,...t}},_subjects:_,_proxyFormState:S,get _fields(){return u},get _formValues(){return y},get _state(){return b},set _state(t){b=t},get _defaultValues(){return a},get _names(){return A},set _names(t){A=t},get _formState(){return r},set _formState(t){r=t},get _options(){return s},set _options(t){s={...s,...t}}},trigger:ne,register:Ae,handleSubmit:nt,watch:it,setValue:z,getValues:Le,reset:Me,resetField:ut,clearErrors:rt,unregister:Ve,setError:st,setFocus:(t,n={})=>{const l=d(u,t),c=l&&l._f;if(c){const f=c.refs?c.refs[0]:c.ref;f.focus&&(f.focus(),n.shouldSelect&&f.select())}},getFieldState:Ce}}function Ct(e={}){const i=J.useRef(),[s,r]=J.useState({isDirty:!1,isValidating:!1,isLoading:K(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:K(e.defaultValues)?void 0:e.defaultValues});i.current||(i.current={...Et(e,()=>r(a=>({...a}))),formState:s});const u=i.current.control;return u._options=e,vt({subject:u._subjects.state,next:a=>{gt(a,u._proxyFormState,u._updateFormState,!0)&&r({...u._formState})}}),J.useEffect(()=>{e.values&&!Q(e.values,u._defaultValues)?u._reset(e.values,u._options.resetOptions):u._resetDefaultValues()},[e.values,u]),J.useEffect(()=>{u._state.mount||(u._updateValid(),u._state.mount=!0),u._state.watch&&(u._state.watch=!1,u._subjects.state.next({...u._formState})),u._removeUnmounted()}),i.current.formState=ht(s,u),i.current}export{Ct as u};
