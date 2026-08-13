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
  console.log("Creating Yachts & Boats Hub...");
  await client.create({
    _type: 'listingPage',
    title: 'Hub: Yates y Lanchas',
    slug: { _type: 'slug', current: 'yachts-and-boats' },
    isHub: true,
    contentEn: {
      hubLeft: {
        title: 'Yachts & Catamarans',
        href: '/yachts-catamarans'
      },
      hubRight: {
        title: 'Speedboats',
        href: '/speedboats'
      }
    },
    contentEs: {
      hubLeft: {
        title: 'Yates y Catamaranes',
        href: '/yachts-catamarans'
      },
      hubRight: {
        title: 'Lanchas Rápidas',
        href: '/speedboats'
      }
    }
  });

  console.log("Creating Villas & Islands Hub...");
  await client.create({
    _type: 'listingPage',
    title: 'Hub: Villas e Islas',
    slug: { _type: 'slug', current: 'villas-and-islands' },
    isHub: true,
    contentEn: {
      hubLeft: {
        title: 'Luxury Villas',
        href: '/luxury-villas'
      },
      hubRight: {
        title: 'Private Islands',
        href: '/private-islands'
      }
    },
    contentEs: {
      hubLeft: {
        title: 'Villas Privadas',
        href: '/luxury-villas'
      },
      hubRight: {
        title: 'Islas Privadas',
        href: '/private-islands'
      }
    }
  });
  
  console.log("Done.");
}

main().catch(console.error);
