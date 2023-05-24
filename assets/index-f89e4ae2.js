var Ne=Object.defineProperty;var Be=(a,e,s)=>e in a?Ne(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var p=(a,e,s)=>(Be(a,typeof e!="symbol"?e+"":e,s),s);import{F as we,j as t,a3 as Ue,a4 as ge,a5 as qe,a6 as Ve,a7 as Qe,a8 as ze,a9 as $e,aa as He,ab as Ke,ac as Ge}from"./@mui/icons-material-c2086071.js";import{a as We,r as o,b as Je}from"./vendor-b612640b.js";import{c as oe,_ as Ze}from"./@supabase/supabase-js-711ba96a.js";import{u as be,C as Ye,P as Xe,B as Q,T as et,a as tt,b as st,c as nt,d as at,M as Ce,L as Se,e as ve,D as rt,f as it,g as ot,h as me,i as H,j as pe,k as ct,l as lt,m as ut,S as k,n as dt,A as ht,o as ce,p as gt,q as mt,r as pt,s as ft,t as yt,F as E,I as F,O as L,v as xt,w as se}from"./@mui/material-577eb438.js";import{w as jt,s as ne,x as _,P as wt,b,C as bt,u as ke,y as Ct,z as St,S as vt}from"./@mui/lab-cc97fd70.js";import{$ as kt}from"./dexie-3976de5d.js";import{d as It}from"./dexie-react-hooks-0c2ddb12.js";import{a as Tt}from"./axios-760d4776.js";import{p as Pt}from"./papaparse-e84842e1.js";import{c as C}from"./@react-rxjs/utils-24ca515a.js";import{b as S}from"./@react-rxjs/core-1a0bb4f0.js";import{Q as Ot,u as Ie,a as Rt}from"./@tanstack/react-query-7cfe65c4.js";import{u as Te}from"./react-hook-form-c6612ec3.js";import{u as At,S as Et}from"./notistack-f220509a.js";import{T as Ft}from"./@reactour/tour-e24be7d6.js";import{h as Lt}from"./hotkeys-js-d20e5801.js";import"./@emotion/react-0d101b94.js";import"./@emotion/styled-6b07d811.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var ae={},fe=We;ae.createRoot=fe.createRoot,ae.hydrateRoot=fe.hydrateRoot;var le=(a=>(a.DARK="dark",a.LIGTH="light",a))(le||{});const Pe={fontFamily:["Foco"].join(",")},_t=we({palette:{mode:"dark"},typography:{...Pe}}),Mt=we({palette:{mode:"light",primary:{main:"#0099CC"},secondary:{main:"#EE2C70"}},typography:{...Pe}}),Oe=o.createContext({toggleColorMode(){}}),Dt=({app:a})=>{const e=be("(prefers-color-scheme: dark)"),[s,r]=o.useState(localStorage.getItem("mode")||(e?"light":"dark")),n=o.useMemo(()=>({toggleColorMode(){r(i=>i==="dark"?"light":"dark")}}),[]);return o.useEffect(()=>{localStorage.setItem("mode",s)},[s]),t.jsx(Oe.Provider,{value:n,children:t.jsxs(jt,{theme:s==="dark"?_t:Mt,children:[t.jsx(Ye,{}),a]})})},T=class extends kt{constructor(){super("syncro");p(this,"rulesStatus");this.version(5).stores({rulesStatus:"id, updated_at, newStatus, language, qualityProfileId, description, user_email"})}static getInstance(){return T.instance??(T.instance=new T),T.instance}async getLocalRules(s){return await this.rulesStatus.where("id").anyOf(s).toArray()}async countAllRules(){return await this.rulesStatus.count()}async saveDescription(s,r){const n=await this.rulesStatus.get(s.id);return await this.rulesStatus.put({id:Number(s.id),languageId:s.lang_id,newStatus:s.isActive,qualityProfileId:Number(s.qualityProfile_id),...n,updated_at:new Date,...r?{description:r}:{},user_email:s.user_email})}async getRulesToUpdate(){return await this.rulesStatus.toArray()}};let K=T;p(K,"instance");const M=K.getInstance(),Nt={width:"80vh",maxWidth:600,minWidth:400,height:"80vh",minHeight:400,borderRadius:50},Bt=o.memo(function({popoverBody:a,icon:e,sxProps:s,textButton:r,buttonProps:n}){const[i,c]=o.useState(null),l=o.useCallback(d=>{d.stopPropagation(),c(d.currentTarget)},[]),u=o.useCallback(d=>{d.stopPropagation(),c(null)},[]);return t.jsxs(t.Fragment,{children:[r?t.jsx(_,{startIcon:e,onClick:l,...n,children:r}):t.jsx(ne,{onClick:l,sx:{margin:"auto"},children:e}),t.jsxs(Xe,{anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},sx:s??Nt,open:!!i,onClose:u,anchorEl:i,children:[t.jsx(ne,{onClick:u,sx:{position:"absolute",top:0,right:0},children:t.jsx(Ue,{sx:{fontSize:"medium"}})}),t.jsx(Q,{margin:1,children:a})]})]})});var q=(a=>(a.FIRST_VISIT="firstVisit",a.TIMES_VISIT="timesVisit",a))(q||{});const Re=a=>{const e={VITE_SUPABASE_TOKEN:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueGZtZnNmdGR3aGlhaGxnb3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NTQ2MjIsImV4cCI6MTk5NzUzMDYyMn0.2-lbg4bjMgp6MxaHUpHd1qTIHoydHr0uXAi78MZ06h4",VITE_WOOPRA_DOMAIN:"pacifico.dev.com",VITE_SUPABASE_URL:"https://fnxfmfsftdwhiahlgozg.supabase.co",VITE_TYPE_CLIENT:"supabase",BASE_URL:"/rulesAdmin",MODE:"production",DEV:!1,PROD:!0,SSR:!1}[a];if(!e)throw new Error(`Not found env ${a}`);return e},Xs=(a,e=!0,s=document.body)=>{const r=s.querySelector(a);r&&(r.style.overflow=e?"hidden":"auto")},Ut=(a,e)=>{const s=new Date;return s.setHours(23),a>s&&e<=3},en=()=>{const a=localStorage.getItem(q.FIRST_VISIT),e=localStorage.getItem(q.TIMES_VISIT);if(!(a||!Ut(new Date(a),Number(e))))return localStorage.setItem(q.FIRST_VISIT,new Date().toDateString()),localStorage.setItem(q.TIMES_VISIT,((Number(e)||0)+1).toString()),!0},ye=a=>a!=null,qt={css:1,java:1,web:1,Web:1,javascript:1,typescript:1},Vt=(a,e=qt)=>{const[s]=a.match(/^.+:/);return e[s.substring(0,s.length-1)]?a.replace(s,""):a},tn=(a,e,s)=>e?Vt(a,s):a,re=(a,e,s)=>a?e:s,ue=(a,e,s)=>a==null?void 0:a.reduce((r,n)=>(r[String(n[e])]=s?n[s]:n,r),{}),Qt=()=>{const a=new Date;return a.setUTCHours(0),a.setUTCMinutes(0),a},Ae=(a,e,s=!0)=>{if(!s)return window[a]=e};Ae("keyBy",ue);Ae("renderConditional",re);const X=Re("VITE_SUPABASE_TOKEN"),ee=Re("VITE_SUPABASE_URL"),zt="supabase",P=class{constructor(e){this.client=e}getConflicts(e){throw new Error("Method not implemented.")}getByRuleName(e,s,r){throw new Error("Method not implemented.")}downloadReport(e){throw new Error("Method not implemented.")}postNewStatus(e){throw new Error("Method not implemented.")}async getTotalCountByTable(e){return 100}static getInstance(){return P.instance??(P.instance=new P(Tt.create({baseURL:ee,headers:{apiKey:X}}))),P.instance}async getPaginatedRulesByFilter(e,s){const{data:r}=await this.client.get("/rules",{params:{...e,...s}});return{data:r,count:100}}async getQualityProfilesByLanguage(e){const{data:s}=await this.client.get("/qualityprofiles",{params:{language_id:e}});return s}async getAllLanguages(){const{data:e}=await this.client.get("/languages");return e}};let G=P;p(G,"instance");const $t=G.getInstance,O=class{static getInstance(){return O.instance??(O.instance=new O),O.instance}parseReport(e){const s=e.map(({rules:r,qualityprofiles:n,...i})=>({...r,...n,...i,ruleKey:r.key,qualityProfileName:n.name,ruleName:r.name}));return Pt.unparse(s,{columns:["qualityProfileName","ruleKey","ruleName","severity","type","updated_at","created_at","description","isActiveSonar","isActive","user_email"]})}};let W=O;p(W,"instance");const Ht=W.getInstance(),w=class{constructor(e,s=Ht){this.client=e,this.reportGenerator=s}async getConflicts(e){const s=Qt().toISOString(),{data:r}=await this.client.from("status").select(`
          *,
          qualityprofiles(
          *
          ),
          rules!inner(
            *
        )
        `).in("id",e.map(({id:c})=>c)).gt("updated_at",s).throwOnError(),n=ue(r,"id");return e.filter(({id:c,newStatus:l})=>{var u,d;return ye((u=n[c])==null?void 0:u.isActive)&&((d=n[c])==null?void 0:d.isActive)!==l}).map(c=>{const{rules:l,...u}=n[c.id];return{...l,...u,...c}})}async getCSVReportUpdatables(e){const{data:s}=await this.client.rpc("get_changed_q",{quality_id:Number(e)}).select("*").csv().throwOnError();return s}async getCSVCompleteFiltered(e){const{data:s}=await this.prepareFilteredQuery(e).throwOnError();return this.reportGenerator.parseReport(s)}async downloadReport(e,s=!0){const r=s?await this.getCSVReportUpdatables(Number(e.qualityProfile_id)):await this.getCSVCompleteFiltered(e),n=document.createElement("a");n.download="report";const i=URL.createObjectURL(new Blob([r],{type:"text/csv"}));n.href=i,n.click(),URL.revokeObjectURL(i),n.remove()}changeIsActive(e,s=!0){if(!e.length)return;const[{user_email:r}]=e;return this.client.from("status").update({isActive:s,updated_at:new Date,user_email:r}).in("id",e.map(({id:n})=>n)).throwOnError()}async bulkUpdateDescription(e){if(!e.length)return;const{data:s}=await this.client.auth.getUser();return await this.client.from("status").upsert(e.map(({id:r,description:n,qualityProfileId:i})=>{var c;return{id:r,description:n,qualityProfile_id:i,user_email:(c=s.user)==null?void 0:c.email}})).select().throwOnError()}async postNewStatus(e){const s=e.filter(({newStatus:i})=>!i),r=e.filter(({newStatus:i})=>i),n=e.filter(({description:i})=>!!i);await Promise.all([this.changeIsActive(s,!1),this.changeIsActive(r,!0),this.bulkUpdateDescription(n)])}async getTotalCountByTable(e){const{count:s}=await this.client.from(e).select("*",{count:"exact",head:!0}).throwOnError();return s??0}async getQualityProfilesByLanguage(e){const{data:s}=await this.client.from("qualityprofiles").select().eq("language_id",e).throwOnError();return s}buildQuery(e,s){for(const r in s){if(!Object.prototype.hasOwnProperty.call(s,r))continue;const n=s[r];n!=="all"&&ye(n)&&(e=e.eq(w.queryBuilderColumns[r],n))}return e}prepareFilteredQuery(e){delete e.lang_id;const s=this.client.from("status").select(`
        *,
        qualityprofiles(
          *
        ),
        rules!inner(
          *
        )
      `,{count:"exact"});return this.buildQuery(s,e)}async getPaginatedRulesByFilter(e,s){const r=this.prepareFilteredQuery(e),{data:n,count:i}=await r.range(...this.getRange(s)).order("id",{ascending:!0}).throwOnError();return{data:n,count:i}}async getAllLanguages(){const{data:e}=await this.client.from("languages").select().throwOnError();return e.filter(({name:s})=>w.whiteList[s])}static getInstance(e){return w.instance??(w.instance=new w(e??oe(ee,X))),w.instance}getRange({page:e,limit:s=10}){return[(e-1)*s,e*s-1]}async getByRuleName(e,s,r){const{data:n,count:i}=await this.prepareFilteredQuery(s).ilike("rules.name",`%${e}%`).range(...this.getRange(r)).order("id",{ascending:!0}).throwOnError();return{data:n,count:i}}subscribeChanges(e){return this.client.channel("changes").on("postgres_changes",{event:"UPDATE",schema:"public",table:"status"},e).subscribe()}};let A=w;p(A,"instance"),p(A,"whiteList",{ts:!0,js:!0,css:!0,java:!0,web:!0}),p(A,"queryBuilderColumns",{severity:"rules.severity",type:"rules.type",isActiveSonar:"isActiveSonar",qualityProfile_id:"qualityProfile_id"});const Ee=A.getInstance,Fe=oe(ee,X),Kt={axios:$t,supabase:()=>Ee(Fe)},V=Kt[zt](),[Gt,sn]=C(),[Wt]=S(Gt,""),[Jt,nn]=C(),[Zt]=S(Jt,"all"),[Yt,an]=C(),[Xt]=S(Yt,null),[es,rn]=C(),[ts]=S(es,"all"),[ss,on]=C(),[ns]=S(ss,""),[as,rs]=C();S(as,0);const[is,Y]=C(),[os]=S(is,1),[cs,ls]=C(),[cn]=S(cs,!1),[us,ln]=C(),[ds]=S(us,null),de=new Ot({defaultOptions:{queries:{staleTime:1/0,refetchOnMount:!1,refetchOnWindowFocus:!1,_optimisticResults:"optimistic"}}}),v=class{constructor(){if(v.instance)throw new Error("Singleton")}static getInstance(){return v.instance??(v.instance=new v),v.instance}get tokenData(){return{token:localStorage.getItem("token"),refreshToken:localStorage.getItem("refreshToken")}}set tokenData(e){Object.keys(e).forEach(s=>localStorage.setItem(s,e[s]))}clean(){localStorage.removeItem("token"),localStorage.removeItem("refreshToken")}};let J=v;p(J,"instance");const R=class{constructor(e,s=J.getInstance()){p(this,"isLogged");p(this,"user");this.client=e,this.authStorage=s}async singUp({email:e,firstName:s,lastName:r,password:n,username:i}){const{data:c,error:l}=await this.client.signUp({email:e,password:n,options:{data:{first_name:s,last_name:r,username:i}}});if(l)throw l;return c}static getInstance(e){return R.instance??(R.instance=new R(e??oe(ee,X).auth)),R.instance}setToken(e){this.authStorage.tokenData={refreshToken:e.refresh_token,token:e.access_token}}async login(e,s){const{data:r,error:n}=await this.client.signInWithPassword({email:e,password:s});if(n)throw n;return this.setToken(r.session),this.isLogged=!0,this.user=r.user,r}async verifyAuth(e){const{data:s,error:r}=await this.client.getUser(e);if(r)throw r;return s}async logOut(e){const{error:s}=await this.client.signOut();if(s)throw s;return this.user=null,this.authStorage.clean(),e}async getPermissions(){const{data:e,error:s}=await this.client.mfa.getAuthenticatorAssuranceLevel();if(s)throw s;return e}async checkAuth(e,s){const r=e??this.authStorage.tokenData.token,n=s??this.authStorage.tokenData.refreshToken;if(!r||!n)return;const{data:i,error:c}=await this.client.setSession({access_token:r,refresh_token:n});if(c)throw c;return this.setToken(i.session),this.isLogged=!0,this.user=i.user,i}};let Z=R;p(Z,"instance");const I=Object.assign(Z.getInstance(Fe.auth),{isLoading:!0}),D=o.createContext(I),hs=()=>{const a=ts(),e=Wt(),s=Xt(),r=ns(),n=Zt(),i=os(),c=ds();return{severity:a,lang_id:e,isActiveSonar:s,qualityProfile_id:r,type:n,page:i,textMatchFilter:c}},un=()=>{const{isActiveSonar:a,lang_id:e,page:s,qualityProfile_id:r,severity:n,textMatchFilter:i,type:c}=hs(),[l,u]=o.useState(10),d=o.useRef(0),[f,te]=o.useState([]),[x,h]=o.useState(null),g=!!(e&&r),{data:N,isFetching:Le,isLoading:_e,isRefetching:Me,isFetched:De}=Ie({queryKey:["rules",e,r,c,a,n,s,l,i],async queryFn(){const y={severity:n,lang_id:e,isActiveSonar:a,qualityProfile_id:r,type:c},B={page:s,limit:l},{data:z,count:$}=i?await V.getByRuleName(i,y,B):await V.getPaginatedRulesByFilter(y,B);return d.current=$,rs($),z},enabled:g,keepPreviousData:!0});o.useEffect(()=>{Y(1)},[c,n,a,r,i]);const he=o.useCallback(async()=>{if(!g)return;const y=N==null?void 0:N.map(({rules:m,...j})=>{var U;return{...m,...j,...Number((U=x==null?void 0:x.new)==null?void 0:U.id)===Number(j.id)?x==null?void 0:x.new:{},isActiveOriginal:j.isActive}}),z=(y?await M.getLocalRules(y.map(({id:m})=>Number(m))):[]).reduce((m,j)=>(m[j.id]=j,m),{}),$=y==null?void 0:y.map(m=>{var j,U;return{...m,isActive:((j=z[m.id])==null?void 0:j.newStatus)??m.isActive,description:((U=z[m.id])==null?void 0:U.description)??m.description}});te($)},[N,g,x]);return o.useEffect(()=>{he()},[N,s,he]),o.useEffect(()=>{const y=Ee().subscribeChanges(B=>h({...B}));return()=>{y.unsubscribe()}},[]),[Y,u,{data:f,isFetching:Le,isLoading:_e,total:d.current,page:s,isFetched:De,rowsPerPage:l,isRefetching:Me}]},gs=()=>{const[a,e]=o.useState(!1);return[o.useCallback(async r=>{e(!0);const n=await M.rulesStatus.toArray(),i=r?n.filter(({id:c})=>r[Number(c)]):n;await V.postNewStatus(i),await M.rulesStatus.clear(),await de.invalidateQueries({queryKey:["rules"]}),Y(1),e(!1)},[]),a]},dn=()=>{const[a,e]=o.useState(!1);return[o.useCallback(async()=>{e(!0),await M.rulesStatus.clear(),await de.invalidateQueries({queryKey:["rules"]}),Y(1),e(!1)},[]),a]},ms=o.memo(function({body:e,header:s,footer:r,stickyHeader:n=!0}){return t.jsxs(wt,{sx:{paddingY:4,background:"transparent"},children:[t.jsx(et,{sx:{maxHeight:"80vh"},children:t.jsxs(tt,{stickyHeader:n,children:[t.jsx(st,{children:s}),t.jsx(nt,{sx:{backgroundColor:({palette:i})=>i.mode===le.DARK?i.grey[800]:i.grey[300]},children:e}),r&&e&&t.jsx(at,{children:r})]})}),!e&&t.jsx("div",{children:"asdsadsadsda"})]})}),xe=[{resource:"key",label:"Codigo"},{resource:"name",label:"Regla"},{resource:"newStatus",label:"Estado local"}],ps=()=>{const[a]=gs(),[e,s]=o.useState(!1),[r,n]=o.useState([]),i=o.useRef({}),[c,l]=o.useState(!1),u=o.useCallback(()=>{s(!1)},[]),d=o.useCallback(()=>{const{current:h}=i,g=Object.values(h).length?h:void 0;a(g),u()},[a,u]),f=o.useCallback(async()=>{const h=await M.getRulesToUpdate(),g=await V.getConflicts(h);if(n(g),g!=null&&g.length)return s(!0);d()},[d]),te=o.useCallback((h,g)=>{if(g.target.checked)return i.current[h]=!0;delete i.current[h]},[]),x=o.useCallback(h=>{l(h.target.checked)},[]);return t.jsxs(t.Fragment,{children:[t.jsxs(Ce,{onClick:f,children:[t.jsx(Se,{children:t.jsx(ge,{fontSize:"small"})}),t.jsx(ve,{children:"Sincronizar"})]}),t.jsxs(rt,{onClose:u,open:e,children:[t.jsx(it,{children:"Hay conflictos"}),t.jsxs(ot,{children:[t.jsx(ms,{header:t.jsxs(me,{children:[t.jsx(H,{children:t.jsx(pe,{checked:c,onChange:x})}),xe.map(({label:h})=>t.jsx(H,{children:h},h))]}),body:t.jsx(t.Fragment,{children:r==null?void 0:r.map(h=>t.jsxs(me,{children:[t.jsx(H,{children:t.jsx(pe,{disabled:c,onChange:g=>te(h.id,g)})}),xe.map(g=>t.jsx(H,{id:`${h.id}-${g.label}`,children:typeof h[g.resource]=="boolean"?h[g.resource]?"Activo":"Inactivo":h[g.resource]}))]},h.id))})}),t.jsx(ct,{children:t.jsx(_,{onClick:d,startIcon:t.jsx(ge,{}),children:"Sincronizar"})})]})]})]})},fs=()=>V.getAllLanguages(),ys=()=>{var r;const a=It.useLiveQuery(()=>M.rulesStatus.toArray()),{data:e}=Ie({queryKey:["languages"],queryFn:fs}),s=o.useMemo(()=>ue(e,"id","name"),[e]);return t.jsx(Bt,{icon:re(!(a!=null&&a.length),t.jsx(Ve,{}),t.jsx(qe,{})),textButton:t.jsx(b,{children:re(!!(a!=null&&a.length),"Tienes cambios sin sincronizar","No hay cambios sin sincronizar")}),buttonProps:{variant:"contained"},popoverBody:t.jsx(lt,{children:e&&t.jsxs(ut,{children:[(r=a==null?void 0:a.filter(({languageId:n},i,c)=>c.findIndex(({languageId:l})=>l===n)===i))==null?void 0:r.map(({languageId:n},i)=>t.jsx(k,{direction:"row",children:t.jsx(bt,{label:s[n]})},i)),t.jsx(dt,{children:t.jsx(ps,{})})]})})})},xs=()=>{const{palette:a}=ke(),e=o.useContext(Oe),{isLogged:s,user:r}=o.useContext(D),[n,i]=o.useState(null),c=o.useContext(D),l=o.useCallback(()=>e.toggleColorMode(),[e]),u=o.useCallback(({currentTarget:f})=>{i(f)},[]),d=o.useCallback(()=>{i(null)},[]);return t.jsxs(t.Fragment,{children:[t.jsx(ht,{sx:{background:({palette:f})=>`linear-gradient(90deg, ${f.primary.main} 80%, ${f.secondary.main} 100%)`},children:t.jsx(ce,{children:t.jsxs(gt,{disableGutters:!0,sx:{justifyContent:"space-between"},children:[t.jsxs(Q,{sx:js,children:[t.jsx(b,{variant:"h6",fontWeight:900,fontSize:"1.6rem",children:"Sonardash"}),t.jsx(b,{variant:"body1",children:"/ Gestión de Reglas"})]}),s&&t.jsx(ys,{}),t.jsxs(k,{direction:"row",justifyContent:"center",alignItems:"center",children:[(a==null?void 0:a.mode)===le.DARK?t.jsx(Qe,{}):t.jsx(ze,{}),t.jsx(mt,{color:"warning",onChange:l}),s&&t.jsx(_,{sx:{borderRadius:"50%"},onClick:u,children:t.jsx(Ct,{sx:{width:40,height:40},variant:"circular",children:r==null?void 0:r.email[0]})})]})]})})}),t.jsx(pt,{open:!!n,anchorEl:n,onClose:d,children:t.jsx(ft,{children:t.jsxs(Ce,{onClick:()=>{c.logOut(),d()},children:[t.jsx(Se,{children:t.jsx($e,{})}),t.jsx(ve,{children:"Log out"})]})})})]})},js={display:"flex",justifyContent:"center",alignItems:"center",gap:1},ws="/rulesAdmin/admin.svg",bs="_heroImage_1kfgi_1",Cs={heroImage:bs},Ss=({handleClose:a,handleOpen:e,isOpen:s,content:r})=>{const n=ke(),i=be(n.breakpoints.up("md"));return t.jsx(yt,{PaperProps:{sx:{justifyContent:"center"}},onOpen:e,onClose:a,open:s,anchor:i?"right":"bottom",children:t.jsx(ce,{sx:vs,children:r})})},vs={maxWidth:500,width:{md:"50vw"},minHeight:"50vh",display:"grid",placeContent:"center"},ie=({inputProps:a,disabled:e,id:s="password",label:r="Password"})=>{const[n,i]=o.useState(!1),c=o.useCallback(()=>{i(l=>!l)},[]);return t.jsxs(E,{disabled:e,children:[t.jsx(F,{htmlFor:s,children:r}),t.jsx(L,{id:s,type:n?"text":"password",inputProps:a,endAdornment:t.jsx(xt,{position:"end",children:t.jsx(ne,{"aria-label":"toggle password visibility",onMouseDown:l=>l.preventDefault(),edge:"end",onClick:c,children:n?t.jsx(He,{}):t.jsx(Ke,{})})}),label:r})]})};function ks(){const a=o.useContext(D),{enqueueSnackbar:e}=At();async function s(r,n){try{await a.login(r,n)}catch(i){const{message:c}=i;return e("Credenciales inválidas",{variant:"error",autoHideDuration:3e3}),c}}return s}function Is({singUpClick:a,isSingUpAvailable:e}){const{handleSubmit:s,register:r,resetField:n}=Te(),i=ks(),[c,l]=o.useState(!1),u=o.useCallback(async({email:d,password:f})=>{l(!0),n("password"),i(d,f),l(!1)},[i,n]);return t.jsxs(k,{component:"form",onSubmit:s(u),spacing:2,p:2,children:[t.jsx(Q,{display:"flex",justifyContent:"center",children:t.jsx(Ge,{sx:{fontSize:"10vh",borderRadius:"50%",border:"2px solid gray"}})}),t.jsxs(E,{disabled:c,children:[t.jsx(F,{htmlFor:"email",children:"Email"}),t.jsx(L,{id:"email",label:"Email",inputProps:r("email")})]}),t.jsx(ie,{disabled:c,inputProps:r("password")}),t.jsx(St,{type:"submit",variant:"contained",disabled:c,loading:c,children:"Login"}),e&&t.jsxs(b,{align:"center",children:["¿Aún no te registras? ",t.jsx(se,{onClick:a,children:"Sing up"})," "]})]})}const Ts=({handleLoginClick:a})=>{const[e,s]=o.useState(!1),[r,n]=o.useState(!1),{register:i,handleSubmit:c}=Te(),l=o.useContext(D),u=o.useCallback(async d=>{s(!0),await l.singUp(d),s(!1),n(!0)},[l]);return r?t.jsx(k,{children:t.jsxs(b,{children:["Revisa tu correo y haz click en el enalnce de confirmacion, si ya lo hiciste, ",t.jsx(se,{onClick:a,children:"Logueate"})]})}):t.jsxs(k,{component:"form",onSubmit:c(u),spacing:2,children:[t.jsxs(E,{disabled:e,children:[t.jsx(F,{htmlFor:"email",children:"Email"}),t.jsx(L,{id:"email",label:"Email",inputProps:i("email")})]}),t.jsx(ie,{inputProps:i("password")}),t.jsx(ie,{id:"confirmPassword",label:"Confirm Password",inputProps:i("confirmPassword")}),t.jsxs(E,{disabled:e,children:[t.jsx(F,{htmlFor:"username",children:"Username"}),t.jsx(L,{id:"username",label:"Username",inputProps:i("username")})]}),t.jsxs(E,{disabled:e,children:[t.jsx(F,{htmlFor:"lastName",children:"Apellido"}),t.jsx(L,{id:"lastName",label:"Apellido",inputProps:i("lastName")})]}),t.jsxs(E,{disabled:e,children:[t.jsx(F,{htmlFor:"firstName",children:"Nombre"}),t.jsx(L,{id:"firstName",label:"Nombre",inputProps:i("firstName")})]}),t.jsx(_,{type:"submit",variant:"contained",children:"Sing up"}),t.jsxs(b,{align:"center",children:["¿Ya tienes cuenta? ",t.jsx(se,{onClick:a,children:"Log in"})]})]})},Ps=({isSingUpAvailable:a})=>{const[e,s]=o.useState(!1),[r,n]=o.useState(!0),i=o.useCallback((d=!0)=>()=>{s(!0),n(d)},[]),c=o.useCallback(()=>{s(!1)},[]),l=o.useCallback(()=>{n(!1)},[]),u=o.useCallback(()=>{n(!0)},[]);return t.jsxs(t.Fragment,{children:[t.jsxs(k,{direction:"row",height:"80vh",spacing:2,gap:2,alignItems:"center",justifyContent:"center",children:[t.jsx(Q,{sx:Os,children:t.jsx("img",{className:Cs.heroImage,src:ws,alt:"admin configuring panel"})}),t.jsxs(k,{spacing:1,width:{sm:"100%",md:"50%"},children:[t.jsx(b,{variant:"h3",component:"h1",children:"Ace config and simplify SonarQube rule administration"}),t.jsx(b,{variant:"body1",children:"Effortlessly Customize SonarQube Rules for Optimal Code Quality"}),t.jsxs(k,{spacing:2,direction:{sm:"column",md:"row"},children:[a&&t.jsx(_,{variant:"contained",onClick:i(!1),children:"Sing up"}),t.jsx(_,{variant:"outlined",onClick:i(),children:"Log in"})]})]})]}),t.jsx(Ss,{content:r?t.jsx(Is,{singUpClick:l}):t.jsx(Ts,{handleLoginClick:u}),handleClose:c,handleOpen:i,isOpen:e})]})},Os={width:{xs:"0%",md:"50%"},display:{xs:"none",md:"block"}},je=()=>t.jsx(Q,{width:"100%",sx:{display:"grid",placeContent:"center"},children:t.jsx(vt,{animation:"pulse",variant:"rectangular",width:"80vw",height:"50vh"})}),Rs=o.lazy(()=>Ze(()=>import("./AdminPanel-c7aaff53.js"),["assets/AdminPanel-c7aaff53.js","assets/@mui/icons-material-c2086071.js","assets/vendor-b612640b.js","assets/@emotion/react-0d101b94.js","assets/@emotion/styled-6b07d811.js","assets/@reactour/tour-e24be7d6.js","assets/@tanstack/react-query-7cfe65c4.js","assets/@react-rxjs/core-1a0bb4f0.js","assets/@react-rxjs/utils-24ca515a.js","assets/@mui/material-577eb438.js","assets/@mui/lab-cc97fd70.js","assets/use-debounce-6bf2a1da.js","assets/dayjs-c0cd33fe.js","assets/react-draggable-cc2383fd.js","assets/react-hook-form-c6612ec3.js","assets/@supabase/supabase-js-711ba96a.js","assets/dexie-3976de5d.js","assets/dexie-react-hooks-0c2ddb12.js","assets/axios-760d4776.js","assets/papaparse-e84842e1.js","assets/notistack-f220509a.js","assets/hotkeys-js-d20e5801.js"]));function As(){const{isLogged:a,isLoading:e}=o.useContext(D);return t.jsx(Et,{children:t.jsx(Dt,{app:t.jsxs(t.Fragment,{children:[t.jsx(xs,{}),t.jsxs(ce,{sx:{paddingTop:12,minHeight:"100vh"},children:[e&&t.jsx(je,{}),!a&&!e?t.jsx(Ps,{}):t.jsx(o.Suspense,{fallback:t.jsx(je,{}),children:t.jsx(Rs,{})})]})]})})})}const Es="pacifico.dev.com",Fs=({children:a})=>{const[e,s]=o.useState(!1),[r,n]=o.useState(!0);o.useEffect(()=>{I.checkAuth().then(c=>{var l;s(!!((l=c==null?void 0:c.user)!=null&&l.id))}).finally(()=>{n(!1)})},[]);const i=o.useMemo(()=>({isLogged:e,isLoading:r,user:I.user,async login(c,l){const u=await I.login(c,l);return s(!0),u},async checkAuth(c,l){return await I.checkAuth(c,l)},async singUp(c){await I.singUp(c)},async logOut(){await I.logOut(),s(!1)}}),[e,r]);return t.jsx(D.Provider,{value:i,children:a})};Lt("ctrl+m",a=>{a.preventDefault(),ls(!0)});window.woopra.config({domain:Es,outgoing_tracking:!0,download_tracking:!0,click_tracking:!0}),window.woopra.track();ae.createRoot(document.getElementById("root")).render(t.jsx(Je.StrictMode,{children:t.jsx(Ft,{steps:[{selector:".language",content:"Selecciona el lenguaje de programación del cual deseas consultar reglas."},{selector:".mainFilters",content:"Ahora procede a seleccionar el perfil a consultar"},{selector:".actualState",content:"Este es el estado actual de la regla en Sonarqube. Las reglas activas son las que analizan los repositorios."},{selector:".proposedState",content:"Aquí podrás proponer si una regla debe estar activada o desactivada, recuerda que tu propuesta no se verá reflejada en SonarQube inmediatamente."},{selector:".dragableMenu",content:t.jsxs(b,{children:["Las opciones de descarga y guardado se encuentran en este botón. Si no lo encuentras rápido, ubícalo con ",t.jsx("kbd",{children:"ctrl"})," +"," ",t.jsx("kbd",{children:"m"}),", ¡también lo puedes mover por toda la pantalla!"]})}],children:t.jsx(Fs,{children:t.jsx(Rt,{client:de,children:t.jsx(As,{})})})})}));export{D as A,le as C,Xs as D,ps as S,on as a,an as b,rn as c,nn as d,M as e,V as f,un as g,ms as h,Ee as i,dn as j,cn as k,ns as l,Bt as m,ln as n,tn as p,sn as s,Wt as u,en as v};
