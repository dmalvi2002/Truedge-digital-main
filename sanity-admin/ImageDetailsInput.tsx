import {useEffect,useState} from 'react';
import {useClient,type ObjectInputProps,type ImageValue} from 'sanity';

type Details={originalFilename?:string;size?:number;mimeType?:string;metadata?:{dimensions?:{width:number;height:number}}};
/** Adds read-only file facts without replacing Sanity's existing image editor. */
export function ImageDetailsInput(props:ObjectInputProps<ImageValue>) {
  const client=useClient({apiVersion:'2025-02-19'});
  const [result,setResult]=useState<{ref:string;details:Details|null;failed:boolean}|null>(null);
  const ref=props.value?.asset?._ref;
  useEffect(()=>{let active=true;if(ref)client.fetch<Details>('*[_id==$id][0]{originalFilename,size,mimeType,metadata{dimensions}}',{id:ref}).then(details=>{if(active)setResult({ref,details,failed:!details});}).catch(()=>{if(active)setResult({ref,details:null,failed:true});});return()=>{active=false;};},[client,ref]);
  const details=result?.ref===ref?result?.details:null;
  const failed=result?.ref===ref&&result?.failed;
  const dimensions=details?.metadata?.dimensions;
  const size=details?.size ? details.size>=1048576?`${(details.size/1048576).toFixed(2)} MB`:`${(details.size/1024).toFixed(1)} KB` : 'Unavailable';
  return <div>{props.renderDefault(props)}{ref&&<div style={{border:'1px solid #8885',borderRadius:8,padding:12,marginTop:12,fontSize:13,lineHeight:1.8}}><strong>Image file details</strong>{details?<><div style={{overflowWrap:'anywhere'}}>{details.originalFilename}</div><div>Original file size: {size}</div><div>Dimensions: {dimensions?`${dimensions.width} × ${dimensions.height} px`:'Unavailable'}{details.mimeType?` · ${details.mimeType}`:''}</div>{Boolean(details.size&&details.size>500*1024)&&<div style={{color:'#d99223'}}>Large original: consider compression. The website serves optimised versions.</div>}<div style={{opacity:.7}}>Original file size may differ from the optimised image visitors download.</div></>:<div>{failed?'File details are temporarily unavailable.':'Loading file details…'}</div>}</div>}</div>;
}
