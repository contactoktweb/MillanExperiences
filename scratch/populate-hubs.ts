import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';

dotenv.config({ path: '.env.local' });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadImage(res.headers.location));
      }
      const data: any[] = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`Downloading ${filename}...`);
  const buffer = await downloadImage(url);
  
  console.log(`Uploading ${filename}...`);
  const asset = await client.assets.upload('image', buffer, {
    filename: filename
  });
  return asset._id;
}

async function main() {
  const yachtsHub = await client.fetch(`*[_type == "listingPage" && slug.current == "yachts-and-boats"][0]`);
  const villasHub = await client.fetch(`*[_type == "listingPage" && slug.current == "villas-and-islands"][0]`);

  if (!yachtsHub || !villasHub) return;

  const urlYacht = 'https://picsum.photos/id/10/1200/800';
  const urlSpeedboat = 'https://picsum.photos/id/11/1200/800';
  const urlVilla = 'https://picsum.photos/id/12/1200/800';
  const urlIsland = 'https://picsum.photos/id/13/1200/800';

  const assetYacht = await uploadImageFromUrl(urlYacht, 'yacht.jpg');
  const assetSpeedboat = await uploadImageFromUrl(urlSpeedboat, 'speedboat.jpg');
  const assetVilla = await uploadImageFromUrl(urlVilla, 'villa.jpg');
  const assetIsland = await uploadImageFromUrl(urlIsland, 'island.jpg');

  // Update Yachts Hub
  await client.patch(yachtsHub._id).set({
    'contentEn.hubLeft.description': 'Experience the ultimate luxury on the water. Perfect for private events, sunset cruises, and multi-day charters.',
    'contentEs.hubLeft.description': 'Experimenta el máximo lujo en el agua. Perfecto para eventos privados, cruceros al atardecer y viajes de varios días.',
    'contentEn.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetYacht } },
    'contentEs.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetYacht } },

    'contentEn.hubRight.description': 'Feel the adrenaline and explore the Rosario Islands with speed, comfort, and premium service.',
    'contentEs.hubRight.description': 'Siente la adrenalina y explora las Islas del Rosario con velocidad, comodidad y servicio premium.',
    'contentEn.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetSpeedboat } },
    'contentEs.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetSpeedboat } }
  }).commit();

  // Update Villas Hub
  await client.patch(villasHub._id).set({
    'contentEn.hubLeft.description': 'Exclusive properties curated for your comfort. Enjoy private chefs, pools, and historic colonial architecture.',
    'contentEs.hubLeft.description': 'Propiedades exclusivas curadas para tu comodidad. Disfruta de chefs privados, piscinas y arquitectura colonial.',
    'contentEn.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetVilla } },
    'contentEs.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetVilla } },

    'contentEn.hubRight.description': 'Your own piece of the Caribbean. Complete privacy and premium amenities surrounded by crystal clear waters.',
    'contentEs.hubRight.description': 'Tu propio pedazo del Caribe. Privacidad total y comodidades premium rodeadas de aguas cristalinas.',
    'contentEn.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetIsland } },
    'contentEs.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetIsland } }
  }).commit();

  console.log("Done!");
}

main().catch(console.error);
