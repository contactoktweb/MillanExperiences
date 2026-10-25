import type { SeedPost } from "../types"

export const villaRentalFaq: SeedPost = {
  slug: "cartagena-villa-rental-faq",
  image: "/millan/limitless-villas.webp",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  keywords: [
    "villa rental Cartagena",
    "private villa Cartagena",
    "Cartagena villa with staff",
    "Cartagena villa with chef",
    "party villa Cartagena",
    "Walled City villa",
    "Getsemaní villa",
  ],
  related: [
    { href: "/luxury-villas", label: { en: "Private Villas", es: "Villas Privadas" } },
    { href: "/services/private-chef", label: { en: "Private Chef", es: "Chef Privado" } },
    { href: "/services/concierge", label: { en: "Concierge", es: "Concierge" } },
  ],
  content: {
    en: {
      title: "Renting a Private Villa in Cartagena: Your Questions Answered",
      metaTitle: "Villa Rental in Cartagena: Staff, Chef, Parties & More",
      description:
        "Visitors, staff and private chef, parties, Wi-Fi, distance to the clubs, neighbourhood safety, last-minute guests and how far ahead to book — straight answers before you rent a villa in Cartagena.",
      metaDescription:
        "Can you have visitors or a party? Is staff included? Wi-Fi, safety, nightlife and when to book: straight answers about renting a villa in Cartagena.",
      category: "Villas & Stays",
      imageAlt: "Private villa in Cartagena with an illuminated pool in a colonial courtyard",
      takeaways: [
        "Our villas are in the Walled City (Historic Center) and Getsemaní, the safest and most walkable areas of Cartagena, minutes on foot from its best restaurants and clubs.",
        "Daily on-site staff (housekeeping and maintenance) is included, with a concierge on call 24/7; a private chef, bartender or chauffeur can be added.",
        "Visitors and gatherings are possible with prior approval from the villa: guest numbers must stay within the house's capacity and neighbours' rest hours must be respected.",
        "Any extra guest — even at the last minute — must be registered in advance; it is usually possible if the villa has capacity left, and may carry an additional charge.",
        "Book 3–6 months ahead for high season (mid-December to mid-January, Easter week, June–July) and 6–12 months ahead for large groups.",
      ],
      body: [
        {
          type: "p",
          text: "A private villa is the most comfortable way to experience Cartagena with family or friends: your own pool, terraces, staff and space for everyone under one roof. Before booking, the same questions always come up. Here are honest answers, based on how stays work in the villas we manage in the Walled City and Getsemaní.",
        },
        { type: "h2", id: "visitors", text: "Can we receive visitors at the villa?" },
        {
          type: "p",
          text: "Yes, in most villas you can receive visitors, provided you let us know in advance. For security, the staff need to know who is coming in, and the total number of people in the house must not exceed the capacity of the villa. Visitors who will stay overnight count as guests and must be registered.",
        },
        {
          type: "tip",
          title: "Good to know",
          text: "Send us the names of your visitors and the approximate time they will arrive. Staff will be ready to welcome them, and the house remains secure for your group.",
        },
        { type: "h2", id: "staff-and-chef", text: "Is staff or a private chef included?" },
        {
          type: "p",
          text: "Every villa includes **daily on-site staff for housekeeping and maintenance**, and many have staff available 24/7. On top of that, your Millan Experiences **concierge is on call throughout your stay** for reservations, transport or last-minute changes.",
        },
        {
          type: "p",
          text: "A [private chef](/services/private-chef) is not included by default, but it is one of the most requested services: breakfasts at the villa, a welcome dinner or a full menu for every day. Chefs adapt the menu to allergies and dietary preferences, which we collect before you arrive. You can also add a bartender, waiters for an event, a chauffeur or in-villa spa treatments.",
        },
        { type: "h2", id: "parties", text: "Can we throw a party at the villa?" },
        {
          type: "p",
          text: "Villas are ideal for celebrations — a birthday dinner, pre-drinks before going out or a pool afternoon with music — but they are homes in residential neighbourhoods, not event venues. That is why:",
        },
        {
          type: "ul",
          items: [
            "**Any gathering beyond your registered group must be approved in advance** by the villa.",
            "**The total number of people cannot exceed the house's capacity**, and some villas set a lower limit for events.",
            "**Music must be kept at a reasonable volume**, especially at night, out of respect for neighbours and local regulations.",
            "**Events may require an additional fee or security deposit**, extra staff or private security.",
          ],
        },
        {
          type: "p",
          text: "If you are planning a [bachelor or bachelorette party](/bachelor-bachelorette-parties) or a [celebration](/birthdays-and-celebrations), tell us before booking: we will recommend the right villa for your plan and organise the music, decoration and catering.",
        },
        { type: "h2", id: "wifi", text: "Do the villas have Wi-Fi?" },
        {
          type: "p",
          text: "Yes, Wi-Fi is a standard amenity in our villas. If you plan to work remotely, hold video calls or stream, let us know before booking and we will confirm the connection and coverage of the house you are interested in.",
        },
        { type: "h2", id: "nightlife", text: "Is the villa close to the clubs and nightlife?" },
        {
          type: "p",
          text: "Very close. Our villas are located in the **Walled City (Historic Center)** and **Getsemaní**, where most of Cartagena's best restaurants, rooftops and clubs are found. From most villas you can walk to dinner and to the bars in a few minutes, and get back without depending on a car. For the more distant spots, such as the rooftops in Bocagrande, a car takes around 10 minutes.",
        },
        {
          type: "p",
          text: "See our selection of [the best rooftops, bars and clubs in Cartagena](/blog/best-rooftops-bars-clubs-cartagena) and [our favourite restaurants](/blog/best-restaurants-cartagena).",
        },
        { type: "h2", id: "safety", text: "Is the neighbourhood safe?" },
        {
          type: "p",
          text: "The Walled City and Getsemaní are the most visited areas of Cartagena, with constant movement of people, a strong police and tourist-police presence and a lively atmosphere until late. Like any major tourist destination, common sense applies:",
        },
        {
          type: "ul",
          items: [
            "Use pre-arranged transport or official apps late at night.",
            "Avoid displaying jewellery, cash or expensive phones on the street.",
            "Keep your drinks in sight and never accept drinks from strangers.",
            "Keep passports and valuables in the villa safe.",
          ],
        },
        {
          type: "p",
          text: "For a full comparison of the areas, read our guide on [where to stay in Cartagena](/blog/where-to-stay-in-cartagena-neighborhoods).",
        },
        { type: "h2", id: "extra-guest", text: "What if an extra person joins at the last minute?" },
        {
          type: "p",
          text: "It is usually possible, as long as the villa still has capacity for one more person. Every guest must be registered before arriving at the house, and an additional person may carry an extra charge depending on the villa. Write to your concierge as soon as you know: the earlier we know, the easier it is to prepare beds, towels and access.",
        },
        { type: "h2", id: "when-to-book", text: "How far in advance should we book the villa?" },
        {
          type: "ul",
          items: [
            "**High season** (mid-December to mid-January, Easter week, June–July and long weekends): 3 to 6 months ahead.",
            "**Large groups, weddings or villas for 15–20 people**: 6 to 12 months ahead, as there are few houses of that size.",
            "**Rest of the year**: 4 to 8 weeks is usually enough, although popular villas can fill up sooner.",
          ],
        },
        {
          type: "p",
          text: "A **50% non-refundable deposit** confirms the reservation. Check-in is usually at 3:00 p.m. and check-out at 11:00 a.m., and both can often be adjusted on request.",
        },
        { type: "h2", id: "hotel-or-villa", text: "Still deciding between a hotel and a villa?" },
        {
          type: "p",
          text: "It depends on the size of your group and the kind of trip. We compare both options in detail in [Hotel or private villa in Cartagena?](/blog/hotel-or-private-villa-cartagena)",
        },
      ],
      faqs: [
        {
          question: "Can we receive visitors at a villa in Cartagena?",
          answer:
            "Yes, in most villas, with advance notice. Staff need to know who is coming in, the total number of people cannot exceed the villa's capacity, and visitors who stay overnight must be registered as guests.",
        },
        {
          question: "Is staff included in the villa rental?",
          answer:
            "Yes. Daily on-site staff for housekeeping and maintenance is included, many villas have staff 24/7, and your Millan Experiences concierge is on call throughout your stay. A private chef, bartender or chauffeur can be added.",
        },
        {
          question: "Are parties allowed in Cartagena villas?",
          answer:
            "Gatherings and celebrations are possible with prior approval: the number of people must stay within the villa's capacity, music must be kept at a reasonable volume at night, and events may require an extra fee, deposit or additional staff.",
        },
        {
          question: "Are the villas close to the nightlife?",
          answer:
            "Yes. The villas are in the Walled City and Getsemaní, a few minutes' walk from Cartagena's main restaurants, rooftops and clubs.",
        },
        {
          question: "How far in advance should I book a villa in Cartagena?",
          answer:
            "Three to six months ahead for high season (mid-December to mid-January, Easter week and June–July) and six to twelve months ahead for large groups or weddings. Outside those dates, four to eight weeks is usually enough.",
        },
      ],
      cta: {
        title: "Find the right villa for your group.",
        text: "Tell us your dates, group size and plans, and we will recommend the villa that fits — with staff, chef and every detail arranged.",
        label: "See villas & ask",
        href: "/luxury-villas",
      },
    },
    es: {
      title: "Alquilar una villa privada en Cartagena: respuestas a tus preguntas",
      metaTitle: "Alquiler de villas en Cartagena: staff, chef, fiestas y más",
      description:
        "Visitas, staff y chef privado, fiestas, wifi, distancia a las discotecas, seguridad del barrio, personas adicionales a último minuto y con cuánta anticipación reservar: respuestas claras antes de alquilar una casa en Cartagena.",
      metaDescription:
        "¿Se reciben visitas o se puede hacer rumba? ¿Incluye staff? Wifi, seguridad, discotecas y cuándo reservar: lo que debes saber al alquilar casa en Cartagena.",
      category: "Villas y estadías",
      imageAlt: "Villa privada en Cartagena con piscina iluminada en un patio colonial",
      takeaways: [
        "Nuestras villas están en la Ciudad Amurallada (Centro Histórico) y Getsemaní, las zonas más seguras y caminables de Cartagena, a minutos a pie de los mejores restaurantes y discotecas.",
        "El staff diario (limpieza y mantenimiento) está incluido, con concierge disponible 24/7; se puede añadir chef privado, bartender o conductor.",
        "Se pueden recibir visitas y hacer reuniones con autorización previa de la villa: sin superar la capacidad de la casa y respetando el descanso de los vecinos.",
        "Toda persona adicional —incluso a último minuto— debe registrarse antes; normalmente es posible si la casa tiene cupo y puede tener un costo adicional.",
        "Reserva con 3 a 6 meses de anticipación para temporada alta (mediados de diciembre a mediados de enero, Semana Santa, junio–julio) y de 6 a 12 meses para grupos grandes.",
      ],
      body: [
        {
          type: "p",
          text: "Una villa privada es la forma más cómoda de vivir Cartagena en familia o con amigos: piscina propia, terrazas, staff y espacio para todos bajo el mismo techo. Antes de reservar, siempre surgen las mismas preguntas. Aquí van respuestas honestas, basadas en cómo funcionan las estadías en las villas que manejamos en la Ciudad Amurallada y Getsemaní.",
        },
        { type: "h2", id: "visitas", text: "¿Se pueden recibir visitantes en la casa?" },
        {
          type: "p",
          text: "Sí, en la mayoría de las villas puedes recibir visitas, siempre que nos avises con anticipación. Por seguridad, el staff necesita saber quién entra, y el número total de personas en la casa no puede superar la capacidad de la villa. Si alguna visita se va a quedar a dormir, cuenta como huésped y debe registrarse.",
        },
        {
          type: "tip",
          title: "Bueno saberlo",
          text: "Envíanos los nombres de tus visitas y la hora aproximada de llegada. El staff estará listo para recibirlas y la casa sigue siendo segura para tu grupo.",
        },
        { type: "h2", id: "staff-y-chef", text: "¿La casa incluye staff o chef?" },
        {
          type: "p",
          text: "Todas las villas incluyen **staff diario en la casa para limpieza y mantenimiento**, y muchas cuentan con personal disponible 24/7. Además, tu **concierge de Millan Experiences está disponible durante toda la estadía** para reservas, transporte o cambios de último minuto.",
        },
        {
          type: "p",
          text: "El [chef privado](/services/private-chef) no viene incluido por defecto, pero es uno de los servicios más solicitados: desayunos en la villa, una cena de bienvenida o un menú completo para todos los días. Los chefs adaptan el menú a alergias y preferencias, que recogemos antes de tu llegada. También puedes sumar bartender, meseros para un evento, conductor o tratamientos de spa en la casa.",
        },
        { type: "h2", id: "rumba", text: "¿Se puede hacer rumba en la casa?" },
        {
          type: "p",
          text: "Las villas son ideales para celebrar —una cena de cumpleaños, la previa antes de salir o una tarde de piscina con música—, pero son casas en barrios residenciales, no salones de eventos. Por eso:",
        },
        {
          type: "ul",
          items: [
            "**Toda reunión con personas fuera de tu grupo registrado debe aprobarse con anticipación** por la villa.",
            "**El número total de personas no puede superar la capacidad de la casa**, y algunas villas fijan un límite menor para eventos.",
            "**La música debe mantenerse a un volumen razonable**, sobre todo en la noche, por respeto a los vecinos y a la normativa local.",
            "**Los eventos pueden requerir un cargo adicional o un depósito de garantía**, personal extra o seguridad privada.",
          ],
        },
        {
          type: "p",
          text: "Si estás planeando una [despedida de soltero(a)](/bachelor-bachelorette-parties) o una [celebración](/birthdays-and-celebrations), cuéntanos antes de reservar: te recomendaremos la villa adecuada para tu plan y organizamos la música, la decoración y el catering.",
        },
        { type: "h2", id: "wifi", text: "¿Las casas tienen wifi?" },
        {
          type: "p",
          text: "Sí, el wifi es un servicio estándar en nuestras villas. Si vas a teletrabajar, tener videollamadas o hacer streaming, avísanos antes de reservar y te confirmamos la conexión y la cobertura de la casa que te interesa.",
        },
        { type: "h2", id: "discotecas", text: "¿La casa queda cerca de las discotecas?" },
        {
          type: "p",
          text: "Muy cerca. Nuestras villas están en la **Ciudad Amurallada (Centro Histórico)** y en **Getsemaní**, donde se concentran la mayoría de los mejores restaurantes, rooftops y discotecas de Cartagena. Desde casi todas las villas puedes ir caminando a cenar y a los bares en pocos minutos, y regresar sin depender de un carro. Para los lugares más lejanos, como los rooftops de Bocagrande, en carro son unos 10 minutos.",
        },
        {
          type: "p",
          text: "Mira nuestra selección de [los mejores rooftops, bares y discotecas de Cartagena](/blog/best-rooftops-bars-clubs-cartagena) y de [nuestros restaurantes favoritos](/blog/best-restaurants-cartagena).",
        },
        { type: "h2", id: "seguridad", text: "¿Es seguro el barrio?" },
        {
          type: "p",
          text: "La Ciudad Amurallada y Getsemaní son las zonas más visitadas de Cartagena, con movimiento constante de personas, alta presencia de policía y policía de turismo y ambiente hasta tarde. Como en cualquier gran destino turístico, aplica el sentido común:",
        },
        {
          type: "ul",
          items: [
            "Usa transporte acordado previamente o aplicaciones oficiales en la noche.",
            "Evita mostrar joyas, efectivo o celulares costosos en la calle.",
            "No pierdas de vista tu bebida y nunca aceptes bebidas de desconocidos.",
            "Guarda pasaportes y objetos de valor en la caja fuerte de la villa.",
          ],
        },
        {
          type: "p",
          text: "Para comparar todas las zonas, lee nuestra guía sobre [dónde alojarse en Cartagena](/blog/where-to-stay-in-cartagena-neighborhoods).",
        },
        { type: "h2", id: "persona-adicional", text: "¿Hay problema si viene una persona adicional a último minuto?" },
        {
          type: "p",
          text: "Normalmente se puede, siempre que la villa tenga cupo para una persona más. Todo huésped debe quedar registrado antes de llegar a la casa, y la persona adicional puede tener un costo extra según la villa. Escríbele a tu concierge apenas lo sepas: cuanto antes lo sepamos, más fácil es preparar camas, toallas y accesos.",
        },
        { type: "h2", id: "cuando-reservar", text: "¿Con cuánta anticipación hay que reservar la casa?" },
        {
          type: "ul",
          items: [
            "**Temporada alta** (mediados de diciembre a mediados de enero, Semana Santa, junio–julio y puentes festivos): de 3 a 6 meses antes.",
            "**Grupos grandes, bodas o villas para 15–20 personas**: de 6 a 12 meses antes, porque hay pocas casas de ese tamaño.",
            "**Resto del año**: de 4 a 8 semanas suele ser suficiente, aunque las villas más buscadas pueden llenarse antes.",
          ],
        },
        {
          type: "p",
          text: "La reserva se confirma con un **depósito del 50% no reembolsable**. El check-in suele ser a las 3:00 p. m. y el check-out a las 11:00 a. m., y ambos pueden ajustarse a menudo bajo solicitud.",
        },
        { type: "h2", id: "hotel-o-casa", text: "¿Todavía dudas entre hotel o casa?" },
        {
          type: "p",
          text: "Depende del tamaño de tu grupo y del tipo de viaje. Comparamos ambas opciones en detalle en [¿Hotel o villa privada en Cartagena?](/blog/hotel-or-private-villa-cartagena)",
        },
      ],
      faqs: [
        {
          question: "¿Se pueden recibir visitas en una villa en Cartagena?",
          answer:
            "Sí, en la mayoría de las villas, avisando con anticipación. El staff necesita saber quién entra, el total de personas no puede superar la capacidad de la villa y las visitas que se queden a dormir deben registrarse como huéspedes.",
        },
        {
          question: "¿El alquiler de la villa incluye staff?",
          answer:
            "Sí. Incluye staff diario en la casa para limpieza y mantenimiento, muchas villas tienen personal 24/7 y tu concierge de Millan Experiences está disponible toda la estadía. Se puede añadir chef privado, bartender o conductor.",
        },
        {
          question: "¿Se puede hacer fiesta en las casas de Cartagena?",
          answer:
            "Se pueden hacer reuniones y celebraciones con autorización previa: sin superar la capacidad de la villa, con música a volumen razonable en la noche y, en algunos casos, con un cargo adicional, depósito o personal extra.",
        },
        {
          question: "¿Las villas quedan cerca de la vida nocturna?",
          answer:
            "Sí. Las villas están en la Ciudad Amurallada y Getsemaní, a pocos minutos caminando de los principales restaurantes, rooftops y discotecas de Cartagena.",
        },
        {
          question: "¿Con cuánta anticipación debo reservar una villa en Cartagena?",
          answer:
            "De tres a seis meses antes para temporada alta (mediados de diciembre a mediados de enero, Semana Santa y junio–julio) y de seis a doce meses para grupos grandes o bodas. Fuera de esas fechas, de cuatro a ocho semanas suele bastar.",
        },
      ],
      cta: {
        title: "Encuentra la villa ideal para tu grupo.",
        text: "Cuéntanos tus fechas, el tamaño del grupo y tus planes, y te recomendaremos la villa adecuada, con staff, chef y cada detalle listo.",
        label: "Ver villas y consultar",
        href: "/luxury-villas",
      },
    },
  },
}
