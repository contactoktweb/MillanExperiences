import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal-page"
import { contact } from "@/lib/site-data"
import { buildMetadata, getLocale } from "@/lib/seo"

const content = {
  en: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    updated: "Last updated: October 25, 2026",
    metaTitle: "Terms & Conditions",
    metaDescription:
      "Terms for booking villas, private islands, boats, concierge services and boutique orders with Millan Experiences in Cartagena, Colombia: deposits, cancellations and house rules.",
    intro:
      "These terms apply to the services arranged through Millan Experiences and to the use of www.millan-experiences.com. Each proposal or confirmation we send you may include specific conditions, which prevail over these general terms.",
    sections: [
      {
        title: "1. Our services",
        paragraphs: [
          "Millan Experiences is a destination management and private concierge company based in Cartagena de Indias. We design and coordinate stays in private villas and islands, boat charters, private chefs, tours, transport, events and other experiences, which are delivered by us or by selected local partners.",
        ],
      },
      {
        title: "2. Quotes and reservations",
        items: [
          "Experiences are tailor-made: we send a written proposal with prices, inclusions and conditions before anything is confirmed.",
          "Unless the proposal states otherwise, a reservation is confirmed with a **50% non-refundable deposit**; the balance is paid on the date indicated in the confirmation.",
          "Prices are quoted in the currency stated in the proposal and may vary until the reservation is confirmed.",
        ],
      },
      {
        title: "3. Cancellations and changes",
        paragraphs: [
          "Cancellation conditions are specified in each proposal. In general, if you cancel after confirming, the deposit is not refunded, and you will not be asked to pay the remaining balance. Changes of dates or services are subject to availability and may change the price.",
        ],
      },
      {
        title: "4. Villas and private islands",
        items: [
          "The number of guests may not exceed the capacity of the property, and every guest must be registered before arrival.",
          "Visitors, gatherings and events require prior approval and may involve additional charges, deposits or staff.",
          "Guests must respect house rules, quiet hours and neighbours, and are responsible for damage caused during the stay.",
          "Check-in is usually at 3:00 p.m. and check-out at 11:00 a.m., unless otherwise agreed.",
        ],
      },
      {
        title: "5. Boats and activities at sea",
        paragraphs: [
          "Boat charters are subject to weather and sea conditions and to the instructions of the maritime authorities. The captain may modify or cancel an itinerary for safety reasons. Vessels may not exceed their authorized passenger capacity. National park fees and port taxes are included only when stated in the proposal.",
        ],
      },
      {
        title: "6. Boutique orders",
        paragraphs: [
          "Orders from our private boutique must be placed at least 8 hours in advance and are delivered to the agreed villa, boat or dock. Payments are processed securely through Wompi. Alcoholic beverages are sold only to adults of legal drinking age.",
        ],
      },
      {
        title: "7. Third-party providers",
        paragraphs: [
          "Some services are provided by independent partners (properties, vessels, restaurants, transport). We select them carefully and coordinate them on your behalf; each partner is responsible for the delivery of its own service.",
        ],
      },
      {
        title: "8. Website use",
        paragraphs: [
          "The content of this website — texts, photographs and brand — belongs to Millan Experiences or is used with permission, and may not be reproduced without authorization. Information about third-party venues is provided as a recommendation and may change without notice.",
        ],
      },
      {
        title: "9. Applicable law and contact",
        paragraphs: [
          `These terms are governed by the laws of the Republic of Colombia. For any question, write to [${contact.email}](mailto:${contact.email}) or call ${contact.phone}. See also our [Privacy Policy](/privacy-policy).`,
        ],
      },
    ] as LegalSection[],
  },
  es: {
    eyebrow: "Legal",
    title: "Términos y Condiciones",
    updated: "Última actualización: 25 de octubre de 2026",
    metaTitle: "Términos y Condiciones",
    metaDescription:
      "Condiciones para reservar villas, islas privadas, embarcaciones, servicios de concierge y pedidos de la boutique con Millan Experiences en Cartagena: depósitos, cancelaciones y normas.",
    intro:
      "Estos términos aplican a los servicios coordinados a través de Millan Experiences y al uso de www.millan-experiences.com. Cada propuesta o confirmación que te enviemos puede incluir condiciones específicas, que prevalecen sobre estos términos generales.",
    sections: [
      {
        title: "1. Nuestros servicios",
        paragraphs: [
          "Millan Experiences es una empresa de gestión de destinos y concierge privado con sede en Cartagena de Indias. Diseñamos y coordinamos estadías en villas e islas privadas, alquiler de embarcaciones, chefs privados, tours, transporte, eventos y otras experiencias, prestadas por nosotros o por aliados locales seleccionados.",
        ],
      },
      {
        title: "2. Cotizaciones y reservas",
        items: [
          "Las experiencias se diseñan a la medida: enviamos una propuesta escrita con precios, inclusiones y condiciones antes de confirmar cualquier servicio.",
          "Salvo que la propuesta indique otra cosa, la reserva se confirma con un **depósito del 50% no reembolsable**; el saldo se paga en la fecha indicada en la confirmación.",
          "Los precios se expresan en la moneda indicada en la propuesta y pueden variar hasta que la reserva quede confirmada.",
        ],
      },
      {
        title: "3. Cancelaciones y cambios",
        paragraphs: [
          "Las condiciones de cancelación se especifican en cada propuesta. En general, si cancelas después de confirmar, el depósito no se reembolsa y no se te cobrará el saldo restante. Los cambios de fechas o servicios están sujetos a disponibilidad y pueden modificar el precio.",
        ],
      },
      {
        title: "4. Villas e islas privadas",
        items: [
          "El número de huéspedes no puede superar la capacidad de la propiedad y todo huésped debe registrarse antes de su llegada.",
          "Las visitas, reuniones y eventos requieren aprobación previa y pueden implicar cargos adicionales, depósitos o personal extra.",
          "Los huéspedes deben respetar las normas de la casa, los horarios de descanso y a los vecinos, y responden por los daños causados durante la estadía.",
          "El check-in suele ser a las 3:00 p. m. y el check-out a las 11:00 a. m., salvo acuerdo distinto.",
        ],
      },
      {
        title: "5. Embarcaciones y actividades en el mar",
        paragraphs: [
          "El alquiler de embarcaciones está sujeto a las condiciones del clima y del mar y a las instrucciones de las autoridades marítimas. El capitán puede modificar o cancelar un itinerario por razones de seguridad. Las embarcaciones no pueden superar su capacidad autorizada de pasajeros. Las tasas del parque nacional e impuestos portuarios solo están incluidos cuando así lo indica la propuesta.",
        ],
      },
      {
        title: "6. Pedidos de la boutique",
        paragraphs: [
          "Los pedidos de nuestra boutique privada deben hacerse con al menos 8 horas de anticipación y se entregan en la villa, embarcación o muelle acordado. Los pagos se procesan de forma segura a través de Wompi. Las bebidas alcohólicas solo se venden a mayores de edad.",
        ],
      },
      {
        title: "7. Proveedores terceros",
        paragraphs: [
          "Algunos servicios son prestados por aliados independientes (propiedades, embarcaciones, restaurantes, transporte). Los seleccionamos cuidadosamente y los coordinamos por ti; cada aliado es responsable de la prestación de su propio servicio.",
        ],
      },
      {
        title: "8. Uso del sitio web",
        paragraphs: [
          "El contenido de este sitio —textos, fotografías y marca— pertenece a Millan Experiences o se usa con autorización, y no puede reproducirse sin permiso. La información sobre lugares de terceros se ofrece como recomendación y puede cambiar sin previo aviso.",
        ],
      },
      {
        title: "9. Ley aplicable y contacto",
        paragraphs: [
          `Estos términos se rigen por las leyes de la República de Colombia. Para cualquier inquietud, escribe a [${contact.email}](mailto:${contact.email}) o llama al ${contact.phone}. Consulta también nuestra [Política de Privacidad](/privacy-policy).`,
        ],
      },
    ] as LegalSection[],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const c = content[locale]
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: "/terms-and-conditions", locale })
}

export default async function TermsPage() {
  const c = content[await getLocale()]
  return <LegalPage eyebrow={c.eyebrow} title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />
}
