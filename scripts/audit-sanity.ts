import {getCliClient} from 'sanity/cli';

// Read-only audit. Never print tokens, webhook secrets or unpublished copy.
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({useCdn:false,token:process.env.SANITY_AUTH_TOKEN});
const hooks=await client.request<Array<{id:string;name:string;url:string;isDisabledByUser?:boolean;dataset?:string;rule?:unknown}>>({url:'/hooks/projects/w5f40uwq',method:'GET'});
const cors=await client.request<Array<{origin:string;allowCredentials:boolean}>>({url:'/projects/w5f40uwq/cors',method:'GET'});
const documents=await client.withConfig({perspective:'raw'}).fetch(`{
 "pages": *[_type=="pageSeo"]{_id,routePath,"hasHeading":defined(h1Heading),"hasTitle":defined(seo.metaTitle),"hasDescription":defined(seo.metaDescription)},
 "publishedPosts": count(*[_type=="blogPost" && !(_id in path("drafts.**"))]),
 "draftPosts": count(*[_type=="blogPost" && _id in path("drafts.**")])
}`);
console.log(JSON.stringify({hooks:hooks.map(({id,name,url,isDisabledByUser,dataset,rule})=>({id,name,url,disabled:isDisabledByUser,dataset,rule})),cors:cors.map(({origin,allowCredentials})=>({origin,allowCredentials})),documents},null,2));
