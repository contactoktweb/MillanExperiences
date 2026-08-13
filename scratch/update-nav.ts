import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const config = await client.fetch(`*[_type == "globalConfig"][0]`);
  if (!config) return;

  const newNav = config.mainNavigation.map(item => {
    if (item.labelEn === 'Villas & Islands' || item.labelEs === 'Villas e Islas') {
      item.href = '/villas-and-islands';
      item.cta.href = '/villas-and-islands';
    }
    if (item.labelEn === 'Boats & Yachts' || item.labelEs === 'Yates y Lanchas') {
      item.href = '/yachts-and-boats';
      item.cta.href = '/yachts-and-boats';
    }
    return item;
  });

  await client.patch(config._id).set({ mainNavigation: newNav }).commit();
  console.log("Updated navigation!");
}

main().catch(console.error);
