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
  const yachtsHub = await client.fetch(`*[_type == "listingPage" && slug.current == "yachts-and-boats"][0]`);
  if (!yachtsHub) return;

  await client.patch(yachtsHub._id).set({
    'contentEn.hero': {
      eyebrow: 'MILLAN EXPERIENCES',
      title: 'Our Fleet',
      description: 'Explore the Caribbean in absolute comfort. From high-speed boats to luxurious multi-level yachts, our fleet is at your disposal.'
    },
    'contentEs.hero': {
      eyebrow: 'MILLAN EXPERIENCES',
      title: 'Nuestra Flota',
      description: 'Explora el Caribe con absoluta comodidad. Desde lanchas deportivas hasta lujosos yates de varios niveles, nuestra flota está a tu entera disposición.'
    }
  }).commit();

  console.log("Hero added!");
}

main().catch(console.error);
