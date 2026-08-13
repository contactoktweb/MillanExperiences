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

async function migrate() {
  console.log('Fetching properties from temporary schemas...');
  const properties = await client.fetch(`*[_type in ["villasAndIslands", "yachtsAndBoats"]]`);

  for (const prop of properties) {
    if (!prop.subcategory) continue;
    
    console.log(`Processing property: ${prop.title} - changing to type: ${prop.subcategory}`);
    
    try {
      await client.create({
        ...prop,
        _id: undefined, // Let Sanity generate a new ID
        _type: prop.subcategory,
        subcategory: undefined, // Remove subcategory field as it's no longer needed
      });
      console.log(`  -> Migrated to ${prop.subcategory}`);
      
      // Delete old document
      await client.delete(prop._id);
      console.log(`  -> Deleted old document`);
    } catch (err) {
      console.error(`  -> Failed:`, err.message);
    }
  }
}

migrate().catch(console.error);
