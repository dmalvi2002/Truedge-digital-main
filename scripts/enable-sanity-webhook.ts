import {readFileSync} from 'node:fs';
import {createHmac} from 'node:crypto';
import {getCliClient} from 'sanity/cli';

// Run from the sibling Studio with `sanity exec ... --with-user-token`.
// Never enable the hook until the production endpoint accepts its secret.
const env=readFileSync(new URL('../.env.local',import.meta.url),'utf8');
const secret=env.split(/\r?\n/).find(line=>line.startsWith('SANITY_REVALIDATE_SECRET='))?.slice('SANITY_REVALIDATE_SECRET='.length).trim().replace(/^["']|["']$/g,'');
if(!secret||secret.length<32)throw new Error('A strong local webhook secret is required.');
const url='https://www.truedgedigital.co.uk/api/revalidate';
const body=JSON.stringify({_type:'pageSeo'});
const timestamp=Date.now().toString();
const signature=createHmac('sha256',secret).update(`${timestamp}.${body}`).digest('base64url');
const response=await fetch(url,{method:'POST',headers:{'content-type':'application/json','sanity-webhook-signature':`t=${timestamp},v1=${signature}`},body});
if(response.status!==200)throw new Error(`Production verification returned ${response.status}. Set the existing local SANITY_REVALIDATE_SECRET in Vercel Production and redeploy before enabling the webhook.`);
const result:unknown=await response.json();
if(!result||typeof result!=='object'||!('revalidated' in result)||result.revalidated!==true)throw new Error('Production did not confirm cache revalidation.');
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({useCdn:false,token:process.env.SANITY_AUTH_TOKEN});
const endpoint='/hooks/projects/w5f40uwq';
const hooks=await client.request<Array<{id:string;url:string;dataset?:string}>>({url:endpoint,method:'GET'});
const matches=hooks.filter(h=>h.url===url&&h.dataset==='production');
if(matches.length!==1)throw new Error('Expected one existing production webhook. Inspect the project before changing hooks.');
await client.request({url:`${endpoint}/${matches[0].id}`,method:'PATCH',body:{isDisabledByUser:false,secret}});
console.log('Production accepted the signed request. Existing Sanity publishing webhook enabled; no content was published.');
