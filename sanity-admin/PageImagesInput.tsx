import {useState, type CSSProperties} from 'react';
import {PatchEvent, set, setIfMissing, unset, useFormValue, type ObjectInputProps} from 'sanity';
import catalog from './page-image-catalog.json';

type Entry = {key:string;source:string;label:string;sections:string[];alt:string;bytes?:number;width?:number;height?:number;format?:string};
const pages = catalog as Record<string,Entry[]>;
const card:CSSProperties = {border:'1px solid var(--card-border-color, #7775)',borderRadius:10,overflow:'hidden',marginBottom:12};
const small:CSSProperties = {fontSize:12,opacity:.75,lineHeight:1.6};
const input:CSSProperties = {width:'100%',boxSizing:'border-box',padding:10,color:'inherit',background:'transparent',border:'1px solid #8887',borderRadius:6,font:'inherit'};
function size(bytes?:number) {return bytes ? bytes>=1048576?`${(bytes/1048576).toFixed(2)} MB`:`${Math.round(bytes/1024*10)/10} KB` : 'File size unavailable (external URL)';}

function ImageEntry({entry,value,onAlt,onDecorative,onReset,readOnly}: {entry:Entry;value?:{alt?:string;decorative?:boolean};onAlt:(value:string)=>void;onDecorative:(value:boolean)=>void;onReset:()=>void;readOnly?:boolean}) {
  const [dimensions,setDimensions]=useState<{width:number;height:number}|null>(null);
  const [failed,setFailed]=useState(false);
  const source = entry.source.startsWith('/') ? `https://www.truedgedigital.co.uk${entry.source}` : entry.source;
  const width=entry.width||dimensions?.width, height=entry.height||dimensions?.height;
  return <details style={card}>
    <summary style={{display:'flex',gap:14,padding:14,cursor:'pointer',alignItems:'center'}}>
      <div style={{width:104,height:76,flexShrink:0,background:'#8882',borderRadius:6,display:'grid',placeItems:'center',overflow:'hidden'}}>
        {failed?<span style={small}>Preview unavailable</span>:<img src={source} alt="" loading="lazy" referrerPolicy="no-referrer" style={{width:'100%',height:'100%',objectFit:'contain'}} onError={()=>setFailed(true)} onLoad={e=>setDimensions({width:e.currentTarget.naturalWidth,height:e.currentTarget.naturalHeight})} />}
      </div>
      <div style={{minWidth:0,flex:1}}><strong>{entry.label}</strong><div style={small}>{entry.sections.join(' · ')}</div><div style={small}>{width&&height?`${width} × ${height} px`:'Dimensions appear when the preview loads'} · {size(entry.bytes)}</div><div style={small}>{entry.source.startsWith('/')?'Website file':'External URL'}{entry.format?` · ${entry.format.toUpperCase()}`:''}{value?.decorative?' · Decorative':value?.alt?.trim()?' · Custom alt text':' · Original alt text'}</div></div>
      <span aria-hidden="true">⌄</span>
    </summary>
    <div style={{padding:'0 16px 16px',display:'grid',gap:12}}>
      <label style={{display:'grid',gap:8,fontSize:14}}>Image description (alt text)
        <textarea style={input} rows={3} value={value?.alt||''} placeholder={entry.alt||'Describe what the image shows. Leave empty to keep the current description.'} disabled={readOnly||value?.decorative} onChange={e=>onAlt(e.target.value)} />
      </label>
      <label style={{fontSize:13,display:'flex',gap:8,alignItems:'center'}}><input type="checkbox" style={{appearance:'auto',width:16,height:16,accentColor:'#8097ff'}} checked={value?.decorative===true} disabled={readOnly} onChange={e=>onDecorative(e.target.checked)} />Decorative image — use empty alt text</label>
      <p style={{...small,margin:0}}>Keep descriptions useful and natural. Empty fields keep the website’s existing wording. Decorative images should not repeat nearby text. An image hidden from screen readers by the page design stays hidden.</p>
      <div style={{display:'flex',gap:14,flexWrap:'wrap',fontSize:13,alignItems:'center'}}><a href={source} target="_blank" rel="noreferrer">View original image ↗</a><button type="button" style={{border:'1px solid #8886',padding:'6px 10px',borderRadius:5,opacity:readOnly||!value ? .5:1}} disabled={readOnly||!value} onClick={onReset}>Restore original description</button></div>
      <div style={{...small,overflowWrap:'anywhere'}}>{entry.source}</div>
      {Boolean(entry.bytes&&entry.bytes>500*1024)&&<div style={{fontSize:13,color:'#d99223'}}>Large original file. Review compression with your developer. Visitors may receive a smaller optimised version.</div>}
    </div>
  </details>;
}

export function PageImagesInput(props:ObjectInputProps) {
  const route=useFormValue(['routePath']) as string;
  const [query,setQuery]=useState('');
  const entries=pages[route]||[];
  const value=props.value as Record<string,{alt?:string;decorative?:boolean}>|undefined;
  const visible=entries.filter(entry=>`${entry.label} ${entry.sections.join(' ')} ${entry.source}`.toLowerCase().includes(query.toLowerCase().trim()));
  function update(key:string,field:string,value:string|boolean) {props.onChange(PatchEvent.from([setIfMissing({_type:'imageAlt'}),setIfMissing({_type:key},[key]),set(value,[key,field])]));}
  return <div style={{display:'grid',gap:12}}>
    <p style={{fontSize:14,lineHeight:1.65,margin:0}}>Edit descriptions for images on this page. The pictures, links and layout stay unchanged. Expand a card to edit. Changes go live after you publish this page.</p>
    <input aria-label="Find an image on this page" placeholder="Find an image or section…" style={input} value={query} onChange={e=>setQuery(e.target.value)} />
    <div style={small}>{visible.length} of {entries.length} images · File sizes refer to original files, not download sizes. Repeated images on this page share one control.</div>
    {!entries.length&&<p>No fixed content images on this page. Blog article images are managed inside each post.</p>}
    {!!entries.length&&!visible.length&&<p>No matching images. Try a section name or clear your search.</p>}
    <div>{visible.map(entry=><ImageEntry key={entry.key} entry={entry} value={value?.[entry.key]} readOnly={props.readOnly} onAlt={text=>update(entry.key,'alt',text)} onDecorative={checked=>update(entry.key,'decorative',checked)} onReset={()=>props.onChange(PatchEvent.from(unset([entry.key])))} />)}</div>
    <p style={small}>Sizes and dimensions of website files are recorded when the admin is built. For external images, dimensions load with the preview; file size may be unavailable. Interface icons and code-drawn shapes are not image files.</p>
  </div>;
}
