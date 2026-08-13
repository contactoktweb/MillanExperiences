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
  console.log('Fetching listing pages...');
  const pages = await client.fetch(`*[_type == "listingPage"]{
    _id,
    title,
    contentEn { grid { items } },
    contentEs { grid { items } }
  }`);

  for (const page of pages) {
    console.log(`Processing page: ${page.title}`);
    const items = page.contentEn?.grid?.items || [];
    
    for (const item of items) {
      if (!item.title) continue;
      
      const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      console.log(`  Creating property: ${item.title} (${slug})`);
      
      try {
        await client.create({
          _type: 'property',
          title: item.title,
          slug: { _type: 'slug', current: slug },
          category: {
            _type: 'reference',
            _ref: page._id,
          },
          mainImage: item.image,
          details: {
            location: item.location,
            capacity: item.capacity,
            rooms: item.rooms,
            bathrooms: item.bathrooms,
            dimensions: item.dimensions,
          }
        });
        console.log(`  -> Success`);
      } catch (err) {
        console.error(`  -> Failed:`, err.message);
      }
    }
  }
}

migrate().catch(console.error);
