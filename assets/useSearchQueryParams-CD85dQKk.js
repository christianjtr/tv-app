import{l as n}from"./tvshow.api.services-DhTWx-Vj.js";import{u as h,a as i,m as l}from"./index-CBsx-jGf.js";const d=()=>{const a=h(),{search:t}=i(),s=new URLSearchParams(t);return{getQueryParamValues:e=>e.reduce((c,u)=>({[u]:s.get(u),...c}),{}),setQueryParams:(e,o)=>{a.push({pathname:e,search:`?${n.stringify({...o})}`})}}},p=a=>{const s=l(a,{path:["/movies/:id","/tv-shows/:id"],exact:!0,strict:!1});if(s!=null&&s.isExact){const[,r]=s.path.split("/");return r}};export{d as a,p as u};