import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});
async function main() {
  const docs = await client.fetch(`*[_type == "luxury-villas"]{_id, _type, title, "slug": slug.current}`);
  console.log(docs);
}
main().catch(console.error);
