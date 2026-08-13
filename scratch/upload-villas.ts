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

const villasData = [
  {
    "slug": "casa-hilda",
    "name": "Casa Hilda",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 15, "rooms": 7, "bathrooms": 8 },
    "amenities": []
  },
  {
    "slug": "casa-carlo",
    "name": "Casa Carlo",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 15, "rooms": 7, "bathrooms": 8.5 },
    "amenities": []
  },
  {
    "slug": "casa-clinton",
    "name": "Casa Clinton",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 8, "rooms": 4, "bathrooms": 6 },
    "amenities": ["Elevator", "Wine cellar", "Rooftop pool", "BBQ area", "Rooftop bar"]
  },
  {
    "slug": "casa-alas",
    "name": "Casa Alas",
    "location": "Getsemani",
    "catalog_card": { "capacity_pax": 10, "rooms": 4, "bathrooms": 5 },
    "amenities": ["Rooftop pool", "24/7 Staff", "BBQ area", "Rooftop bar"]
  },
  {
    "slug": "casa-kaki",
    "name": "Casa Kaki",
    "location": "Getsemani",
    "catalog_card": { "capacity_pax": 12, "rooms": 6, "bathrooms": 7 },
    "amenities": ["Two pools", "Spacious rooftop lounge"] // inferred
  },
  {
    "slug": "casa-eliza",
    "name": "Casa Eliza",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 16, "rooms": 6, "bathrooms": 8 },
    "amenities": ["Unique pool", "Rooftop jacuzzi"]
  },
  {
    "slug": "casa-lea",
    "name": "Casa Lea",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 10, "rooms": 4, "bathrooms": 4.5 },
    "amenities": []
  },
  {
    "slug": "casa-jade",
    "name": "Casa Jade",
    "location": "Getsemani",
    "catalog_card": { "capacity_pax": 20, "rooms": 10, "bathrooms": 10.5 },
    "amenities": ["Colonial charm with modern bohemian style"]
  },
  {
    "slug": "casa-macondo",
    "name": "Casa Macondo",
    "location": "Historic Center",
    "catalog_card": { "capacity_pax": 6, "rooms": 3, "bathrooms": 5 },
    "amenities": []
  }
];

const cancellationEn = `A 50% deposit is required to confirm your reservation. This deposit is non-refundable.

If you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.`;

const cancellationEs = `Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.`;

async function main() {
  console.log("Starting upload of Villas to Sanity...");

  for (const villa of villasData) {
    // If it's Casa Hilda, we already fully updated it, so we skip it to prevent overriding rich data.
    if (villa.slug === "casa-hilda") {
      console.log(`Skipping ${villa.name} (already populated)...`);
      continue;
    }

    const doc = {
      _type: 'luxury-villas',
      title: villa.name,
      slug: { current: villa.slug },
      details: {
        location: villa.location,
        capacity: villa.catalog_card.capacity_pax,
        rooms: villa.catalog_card.rooms,
        bathrooms: villa.catalog_card.bathrooms,
        dimensions: ''
      },
      amenities: villa.amenities,
      cancellationPolicyEn: cancellationEn,
      cancellationPolicyEs: cancellationEs,
    };

    // Check if it already exists
    const query = `*[_type == "luxury-villas" && slug.current == $slug][0]`;
    const existing = await client.fetch(query, { slug: villa.slug });

    if (existing) {
      console.log(`Updating existing villa: ${villa.name}`);
      await client.patch(existing._id).set(doc).commit();
    } else {
      console.log(`Creating new villa: ${villa.name}`);
      await client.create(doc);
    }
  }

  console.log("All villas processed successfully!");
}

main().catch(console.error);
