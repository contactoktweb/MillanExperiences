import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function uploadLocalImage(filepath: string, filename: string) {
  console.log(`Uploading ${filename}...`);
  const buffer = fs.readFileSync(filepath);
  const asset = await client.assets.upload('image', buffer, {
    filename: filename
  });
  return asset._id;
}

async function main() {
  const yachtsHub = await client.fetch(`*[_type == "listingPage" && slug.current == "yachts-and-boats"][0]`);
  const villasHub = await client.fetch(`*[_type == "listingPage" && slug.current == "villas-and-islands"][0]`);

  if (!yachtsHub || !villasHub) return;

  const assetYacht = await uploadLocalImage('scratch/yacht.jpg', 'yacht.jpg');
  const assetSpeedboat = await uploadLocalImage('scratch/speedboat.jpg', 'speedboat.jpg');
  const assetVilla = await uploadLocalImage('scratch/villa.jpg', 'villa.jpg');
  const assetIsland = await uploadLocalImage('scratch/island.jpg', 'island.jpg');

  // Update Yachts Hub
  await client.patch(yachtsHub._id).set({
    'contentEn.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetYacht } },
    'contentEs.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetYacht } },

    'contentEn.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetSpeedboat } },
    'contentEs.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetSpeedboat } }
  }).commit();

  // Update Villas Hub
  await client.patch(villasHub._id).set({
    'contentEn.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetVilla } },
    'contentEs.hubLeft.image': { _type: 'image', asset: { _type: 'reference', _ref: assetVilla } },

    'contentEn.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetIsland } },
    'contentEs.hubRight.image': { _type: 'image', asset: { _type: 'reference', _ref: assetIsland } }
  }).commit();

  console.log("Done uploading real images!");
}

main().catch(console.error);
