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

const islandsData = [
  {
    "slug": "isla-mambo",
    "name": "Isla Mambo",
    "location": "Rosario Islands",
    "capacity_pax": 14,
    "rooms": 7,
    "bathrooms": 7,
    "amenities": ["Wi-Fi", "Air conditioning", "TV"]
  },
  {
    "slug": "isla-coco",
    "name": "Isla Coco",
    "location": "Rosario Islands",
    "capacity_pax": 18,
    "rooms": 7,
    "bathrooms": 8, // Using the catalog value to be safe, instead of 18.5 which is likely a typo
    "amenities": ["Tennis Court", "Pool"]
  },
  {
    "slug": "isla-del-mar",
    "name": "Isla del Mar",
    "location": "Rosario Islands",
    "capacity_pax": 16,
    "rooms": 7,
    "bathrooms": 9,
    "amenities": []
  },
  {
    "slug": "isla-amores",
    "name": "Isla Amores",
    "location": "Rosario Islands",
    "capacity_pax": 20, // Using catalog value
    "rooms": 6,
    "bathrooms": 0, // Not provided
    "amenities": ["Pool", "Day beds", "4 Oceanfront Villas"]
  },
  {
    "slug": "isla-boni",
    "name": "Isla Boni",
    "location": "Rosario Islands",
    "capacity_pax": 17,
    "rooms": 6,
    "bathrooms": 6.5,
    "amenities": []
  },
  {
    "slug": "isla-tamba",
    "name": "Isla Tamba",
    "location": "Rosario Islands",
    "capacity_pax": 20,
    "rooms": 7,
    "bathrooms": 9,
    "amenities": ["Pool", "Jacuzzi", "Kayak", "Gym"]
  }
];

const cancellationEn = `If the Coast Guard deems conditions unsafe before boarding, you will receive a full refund.

If the boat becomes unavailable for any reason, and we can not find a boat with the similar characteristics, a full refund will also be issued.

A 50% deposit is required to confirm your reservation. This deposit is non-refundable.

If you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.`;

const cancellationEs = `Si la Guardia Costera considera que las condiciones son inseguras antes de abordar, recibirá un reembolso completo.

Si el barco deja de estar disponible por cualquier motivo y no podemos encontrar un barco con características similares, también se emitirá un reembolso completo.

Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.`;

async function main() {
  console.log("Starting upload of Private Islands to Sanity...");

  for (const island of islandsData) {
    const doc = {
      _type: 'private-islands',
      title: island.name,
      slug: { current: island.slug },
      details: {
        location: island.location,
        capacity: island.capacity_pax,
        rooms: island.rooms,
        bathrooms: island.bathrooms || undefined,
        dimensions: ''
      },
      amenities: island.amenities,
      cancellationPolicyEn: cancellationEn,
      cancellationPolicyEs: cancellationEs,
    };

    // Check if it already exists
    const query = `*[_type == "private-islands" && slug.current == $slug][0]`;
    const existing = await client.fetch(query, { slug: island.slug });

    if (existing) {
      console.log(`Updating existing island: ${island.name}`);
      await client.patch(existing._id).set(doc).commit();
    } else {
      console.log(`Creating new island: ${island.name}`);
      await client.create(doc);
    }
  }

  console.log("All islands processed successfully!");
}

main().catch(console.error);
