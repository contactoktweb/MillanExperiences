import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal-page"
import { contact } from "@/lib/site-data"
import { buildMetadata, getLocale } from "@/lib/seo"

const content = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: October 25, 2026",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Millan Experiences collects, uses and protects your personal data, in accordance with Colombian data protection law (Law 1581 of 2012), and how to exercise your rights.",
    intro:
      "Millan Experiences, based in Cartagena de Indias, Colombia, respects your privacy. This policy explains what personal data we collect through www.millan-experiences.com and our communication channels, how we use it and how you can exercise your rights, in accordance with Colombian Law 1581 of 2012 and Decree 1377 of 2013.",
    sections: [
      {
        title: "1. Data controller",
        paragraphs: [
          `Millan Experiences, Cartagena de Indias, Bolívar, Colombia. Email: [${contact.email}](mailto:${contact.email}) · Phone and WhatsApp: ${contact.phone}.`,
        ],
      },
      {
        title: "2. Data we collect",
        items: [
          "**Contact and quote requests:** name, email, phone, country, travel dates, group size, services of interest and any details you share with us.",
          "**Reservations and boutique orders:** name, email, phone, delivery location (villa, boat or dock), reservation number and the products ordered.",
          "**Reviews:** the name, text, rating and photos you choose to publish.",
          "**Payments:** card and bank payments are processed by Wompi (Bancolombia). We do not receive or store your card details; we only receive the transaction status and reference.",
          "**Browsing:** anonymous, aggregated visit statistics (Vercel Analytics), a cookie that remembers your language and your boutique cart stored in your own browser.",
        ],
      },
      {
        title: "3. How we use your data",
        items: [
          "To answer your requests and prepare tailor-made proposals.",
          "To manage reservations, payments, deliveries and the services of your trip with our partners (villas, boats, chefs, transport).",
          "To send you transactional messages about your bookings and orders.",
          "To improve our website and services.",
          "To comply with legal, tax and accounting obligations.",
        ],
        paragraphs: ["We do not sell your personal data. We only share it with the providers needed to deliver the services you request."],
      },
      {
        title: "4. Service providers",
        paragraphs: [
          "We rely on trusted providers that process data on our behalf: Sanity (content and request management), Resend (email delivery), Wompi (payment processing) and Vercel (hosting and anonymous analytics). Some of these providers store data outside Colombia, with security measures consistent with this policy.",
        ],
      },
      {
        title: "5. Your rights",
        paragraphs: ["As a data subject you have the right to:"],
        items: [
          "Know, update and correct your personal data.",
          "Request proof of the authorization you gave us.",
          "Be informed about how your data has been used.",
          "Revoke your authorization and/or request the deletion of your data when there is no legal or contractual duty to keep it.",
          "File complaints with the Superintendence of Industry and Commerce (SIC).",
        ],
      },
      {
        title: "6. How to exercise your rights",
        paragraphs: [
          `Write to [${contact.email}](mailto:${contact.email}) with your full name, the request and a contact channel. We answer inquiries within ten (10) business days and complaints within fifteen (15) business days, as provided by Law 1581 of 2012.`,
        ],
      },
      {
        title: "7. Security and retention",
        paragraphs: [
          "We apply reasonable technical and organizational measures to protect your data, and keep it only for as long as needed for the purposes described or as required by law.",
        ],
      },
      {
        title: "8. Changes to this policy",
        paragraphs: ["We may update this policy. The current version is always available on this page, with its date of last update."],
      },
    ] as LegalSection[],
  },
  es: {
    eyebrow: "Legal",
    title: "Política de Privacidad",
    updated: "Última actualización: 25 de octubre de 2026",
    metaTitle: "Política de Privacidad y Tratamiento de Datos",
    metaDescription:
      "Cómo Millan Experiences recolecta, usa y protege tus datos personales, conforme a la Ley 1581 de 2012 de protección de datos en Colombia, y cómo ejercer tus derechos.",
    intro:
      "Millan Experiences, con sede en Cartagena de Indias, Colombia, respeta tu privacidad. Esta política explica qué datos personales recolectamos a través de www.millan-experiences.com y nuestros canales de comunicación, cómo los usamos y cómo puedes ejercer tus derechos, de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        paragraphs: [
          `Millan Experiences, Cartagena de Indias, Bolívar, Colombia. Correo: [${contact.email}](mailto:${contact.email}) · Teléfono y WhatsApp: ${contact.phone}.`,
        ],
      },
      {
        title: "2. Datos que recolectamos",
        items: [
          "**Solicitudes de contacto y cotización:** nombre, correo, teléfono, país, fechas de viaje, tamaño del grupo, servicios de interés y cualquier detalle que compartas con nosotros.",
          "**Reservas y pedidos de la boutique:** nombre, correo, teléfono, lugar de entrega (villa, embarcación o muelle), número de reserva y productos solicitados.",
          "**Reseñas:** el nombre, texto, calificación y fotos que decidas publicar.",
          "**Pagos:** los pagos con tarjeta y transferencias se procesan a través de Wompi (Bancolombia). No recibimos ni almacenamos los datos de tu tarjeta; solo recibimos el estado y la referencia de la transacción.",
          "**Navegación:** estadísticas de visitas anónimas y agregadas (Vercel Analytics), una cookie que recuerda tu idioma y el carrito de la boutique guardado en tu propio navegador.",
        ],
      },
      {
        title: "3. Para qué usamos tus datos",
        items: [
          "Responder tus solicitudes y preparar propuestas a la medida.",
          "Gestionar reservas, pagos, entregas y los servicios de tu viaje con nuestros aliados (villas, embarcaciones, chefs, transporte).",
          "Enviarte mensajes sobre tus reservas y pedidos.",
          "Mejorar nuestro sitio web y nuestros servicios.",
          "Cumplir obligaciones legales, tributarias y contables.",
        ],
        paragraphs: ["No vendemos tus datos personales. Solo los compartimos con los proveedores necesarios para prestar los servicios que solicitas."],
      },
      {
        title: "4. Proveedores de servicios",
        paragraphs: [
          "Trabajamos con proveedores de confianza que tratan datos por cuenta nuestra: Sanity (gestión de contenidos y solicitudes), Resend (envío de correos), Wompi (procesamiento de pagos) y Vercel (alojamiento y estadísticas anónimas). Algunos de estos proveedores almacenan datos fuera de Colombia, con medidas de seguridad acordes con esta política.",
        ],
      },
      {
        title: "5. Tus derechos",
        paragraphs: ["Como titular de los datos tienes derecho a:"],
        items: [
          "Conocer, actualizar y rectificar tus datos personales.",
          "Solicitar prueba de la autorización otorgada.",
          "Ser informado sobre el uso que se ha dado a tus datos.",
          "Revocar la autorización y/o solicitar la supresión de tus datos cuando no exista un deber legal o contractual de conservarlos.",
          "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
        ],
      },
      {
        title: "6. Cómo ejercer tus derechos",
        paragraphs: [
          `Escribe a [${contact.email}](mailto:${contact.email}) indicando tu nombre completo, la solicitud y un medio de contacto. Atendemos consultas en un máximo de diez (10) días hábiles y reclamos en un máximo de quince (15) días hábiles, según la Ley 1581 de 2012.`,
        ],
      },
      {
        title: "7. Seguridad y conservación",
        paragraphs: [
          "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos y los conservamos solo durante el tiempo necesario para las finalidades descritas o el exigido por la ley.",
        ],
      },
      {
        title: "8. Cambios a esta política",
        paragraphs: ["Podemos actualizar esta política. La versión vigente estará siempre disponible en esta página, con su fecha de última actualización."],
      },
    ] as LegalSection[],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const c = content[locale]
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: "/privacy-policy", locale })
}

export default async function PrivacyPolicyPage() {
  const c = content[await getLocale()]
  return <LegalPage eyebrow={c.eyebrow} title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />
}
