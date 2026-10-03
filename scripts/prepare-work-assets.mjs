import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const images = [
  ['football', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1791035673/football_y9t37i.webp', 480],
  ['sanchez-arsenal', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1791032525/sanchez-watt_jgbxkj.webp', 1100],
  ['nelson-community', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1791032800/bf9e6be6-a3be-4bf8-9354-4a96b4f71191.png', 1800],
  ['digitech', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1786092155/31022d6e-b014-44f4-8d5c-dcbfd47f4324.png', 1200],
  ['ilearners', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634405/c4dd4da1-70ef-443b-9f4f-33d476f85eba.png', 1200],
  ['kinesis', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634697/c3f54d73-40a0-4dcc-9d28-b91ae55623db.png', 1200],
  ['immigration', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771632608/881bb1b0-fdc5-4d23-b193-ce556319128e.png', 1200],
  ['accounting', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771705118/3571ec1a-6804-45fb-a1e5-26263c03dfdd.png', 1200],
  ['magic-world', 'https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771919691/bd26f844-8741-4461-86ca-6099985f1a18.png', 1200],
];
await mkdir('public/assets/works', { recursive: true });
const selectedImages = process.argv[2] ? images.filter(([name]) => name === process.argv[2]) : images;
await Promise.all(selectedImages.map(async ([name, url, width]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const buffer = await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  await writeFile(`public/assets/works/${name}.webp`, buffer);
  console.log(`${name}: ${Math.round(buffer.length / 1024)} KB`);
}));
