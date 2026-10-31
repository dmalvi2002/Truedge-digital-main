import {defineField} from 'sanity';
import catalog from './page-image-catalog.json';
import {PageImagesInput} from './PageImagesInput';

const images=new Map(Object.values(catalog).flat().map(image=>[image.key,image]));
export const imageAltField=defineField({
  name:'imageAlt',title:'Images & alt text',type:'object',group:'images',components:{input:PageImagesInput},
  fields:[...images.values()].map(image=>defineField({name:image.key,title:image.label,type:'object',fields:[
    defineField({name:'alt',title:'Image description (alt text)',type:'text',rows:3}),
    defineField({name:'decorative',title:'Decorative image',type:'boolean'}),
  ]})),
});
