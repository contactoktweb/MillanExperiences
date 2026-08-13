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
  console.log('Fetching old properties...');
  const properties = await client.fetch(`*[_type == "property"]{
    _id,
    title,
    slug,
    category->{
      slug
    },
    mainImage,
    details,
    amenities,
    price,
    gallery,
    descriptionEn,
    descriptionEs
  }`);

  for (const prop of properties) {
    const catSlug = prop.category?.slug?.current;
    if (!catSlug) continue;

    console.log(`Processing property: ${prop.title} in category: ${catSlug}`);
    
    let newType = '';
    let newSubcategory = '';

    if (catSlug === 'luxury-villas' || catSlug === 'private-islands') {
      newType = 'villasAndIslands';
      newSubcategory = catSlug;
    } else if (catSlug === 'yachts-catamarans' || catSlug === 'speedboats') {
      newType = 'yachtsAndBoats';
      newSubcategory = catSlug;
    } else {
      console.log(`  -> Skipping due to unknown category: ${catSlug}`);
      continue;
    }

    try {
      await client.create({
        _type: newType,
        title: prop.title,
        slug: prop.slug,
        subcategory: newSubcategory,
        mainImage: prop.mainImage,
        details: prop.details,
        amenities: prop.amenities,
        price: prop.price,
        gallery: prop.gallery,
        descriptionEn: prop.descriptionEn,
        descriptionEs: prop.descriptionEs
      });
      console.log(`  -> Migrated to ${newType} (${newSubcategory})`);
      
      // Delete old property document
      await client.delete(prop._id);
      console.log(`  -> Deleted old property document`);
    } catch (err) {
      console.error(`  -> Failed:`, err.message);
    }
  }
}

migrate().catch(console.error);
