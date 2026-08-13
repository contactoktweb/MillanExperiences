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
  const villasHub = await client.fetch(`*[_type == "listingPage" && slug.current == "villas-and-islands"][0]`);
  if (!villasHub) return;

  await client.patch(villasHub._id).set({
    'contentEn.hero': {
      eyebrow: 'MILLAN EXPERIENCES',
      title: 'Our Properties',
      description: 'Discover the most exclusive properties in the Caribbean. Hand-picked for the ultimate luxury experience.'
    },
    'contentEs.hero': {
      eyebrow: 'MILLAN EXPERIENCES',
      title: 'Nuestras Propiedades',
      description: 'Descubre las propiedades más exclusivas del Caribe. Seleccionadas cuidadosamente para brindarte la mejor experiencia.'
    }
  }).commit();

  console.log("Hero added to villas!");
}

main().catch(console.error);
