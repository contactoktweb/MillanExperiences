import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config({ path: '.env.local' });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function uploadImageFromUrl(url: string, filename: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data: any[] = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(data);
          const asset = await client.assets.upload('image', buffer, { filename });
          resolve(asset._id);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const query = `*[_type == "luxury-villas" && slug.current == "casa-hilda"][0]`;
  let casaHilda = await client.fetch(query);

  if (!casaHilda) return console.log("Failed to find Casa Hilda");

  const exp1Id = await uploadImageFromUrl('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', 'transport.jpg');
  const exp2Id = await uploadImageFromUrl('https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80', 'concierge.jpg');
  const exp3Id = await uploadImageFromUrl('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', 'chef.jpg');

  const cancellationEn = `If the Coast Guard deems conditions unsafe before boarding, you will receive a full refund.

If the boat becomes unavailable for any reason, and we can not find a boat with the similar characteristics, a full refund will also be issued.

A 50% deposit is required to confirm your reservation. This deposit is non-refundable.

If you cancel after making the reservation, you will forfeit the deposit but will not be required to pay the remaining 50%.`;

  const cancellationEs = `Si la Guardia Costera considera que las condiciones son inseguras antes de abordar, recibirá un reembolso completo.

Si el barco deja de estar disponible por cualquier motivo y no podemos encontrar un barco con características similares, también se emitirá un reembolso completo.

Se requiere un depósito del 50% para confirmar su reserva. Este depósito no es reembolsable.

Si cancela después de hacer la reserva, perderá el depósito pero no tendrá que pagar el 50% restante.`;

  await client.patch(casaHilda._id).set({
    details: {
      location: 'Historic Center',
      capacity: 15,
      rooms: 7,
      bathrooms: 8,
      dimensions: ''
    },
    amenities: [
      'Rooftop pool with a 200" projector',
      '24/7 Staff',
      'BBQ area',
      'Rooftop bar'
    ],
    cancellationPolicyEn: cancellationEn,
    cancellationPolicyEs: cancellationEs,
    faqs: [
      {
        _key: 'faq1',
        questionEn: 'When should I request reservations for restaurants or activities?',
        questionEs: '¿Cuándo debo solicitar reservas para restaurantes o actividades?',
        answerEn: 'We recommend sharing your preferences as soon as your travel dates are confirmed. Exclusive restaurants, private yachts, and high-demand experiences often book up weeks or months in advance. Once you give us your wishlist, our team will proactively handle the outreach and secure your spots.',
        answerEs: 'Recomendamos compartir sus preferencias tan pronto como se confirmen sus fechas de viaje. Restaurantes exclusivos y yates a menudo se reservan con meses de anticipación.'
      },
      {
        _key: 'faq2',
        questionEn: 'Can your private chefs accommodate specific dietary restrictions?',
        questionEs: '¿Pueden sus chefs privados adaptarse a restricciones dietéticas específicas?',
        answerEn: 'Absolutely. Our curated network of private chefs is highly experienced in designing bespoke menus tailored to any dietary requirement, allergy, or personal preference. We gather all this information well before your arrival to ensure every in-home dining experience is flawless and safe.',
        answerEs: 'Absolutamente. Nuestra red de chefs privados está altamente experimentada en diseñar menús a medida.'
      },
      {
        _key: 'faq3',
        questionEn: 'Will I have support available during the actual trip?',
        questionEs: '¿Tendré apoyo disponible durante el viaje real?',
        answerEn: 'Yes. While we meticulously orchestrate your itinerary in advance, we know that true luxury requires flexibility. Your dedicated concierge team is available throughout your stay to manage last-minute adjustments, coordinate additional transportation, or secure new reservations, giving you absolute peace of mind.',
        answerEs: 'Sí. Su equipo de concierge dedicado está disponible durante toda su estancia para darle absoluta tranquilidad.'
      }
    ],
    complementaryExperiences: [
      {
        _key: 'exp1',
        titleEn: 'Private Transportation',
        titleEs: 'Transporte Privado',
        descriptionEn: 'Enhance your experience with our Private Transportation service. We’ll handle seamless airport pick-ups and door-to-door transfers, ensuring every transition throughout your day feels smooth, effortless, and perfectly timed—so you feel secure while enjoying each moment.',
        descriptionEs: 'Mejore su experiencia con nuestro servicio de Transporte Privado. Nos encargaremos de recogidas en el aeropuerto y traslados puerta a puerta.',
        image: { _type: 'image', asset: { _type: 'reference', _ref: exp1Id } },
        href: '/contact'
      },
      {
        _key: 'exp2',
        titleEn: 'Concierge Service',
        titleEs: 'Servicio de Concierge',
        descriptionEn: 'Elevate your stay with our full-service concierge. We’ll handle every detail—from reservations and grocery shopping to tours and activity planning—while crafting a fully customized itinerary. From the moment you arrive and throughout your stay, we’ll be by your side to ensure a seamless experience.',
        descriptionEs: 'Eleve su estancia con nuestro servicio de concierge completo. Manejaremos cada detalle, desde reservas hasta planificación de actividades.',
        image: { _type: 'image', asset: { _type: 'reference', _ref: exp2Id } },
        href: '/contact'
      },
      {
        _key: 'exp3',
        titleEn: 'Private Chef',
        titleEs: 'Chef Privado',
        descriptionEn: 'Indulge in a private chef experience with personalized menus tailored to you and your friends. From fresh, locally sourced ingredients to seamless in-villa service, every meal is carefully prepared—so you can relax and enjoy every bite.',
        descriptionEs: 'Disfrute de una experiencia con chef privado con menús personalizados. Cada comida es cuidadosamente preparada.',
        image: { _type: 'image', asset: { _type: 'reference', _ref: exp3Id } },
        href: '/contact'
      }
    ]
  }).commit();

  console.log("Casa Hilda updated successfully!");
}

main().catch(console.error);
