import type { SeedPost } from "../types"
import { venueBlocks, type VenueGroup } from "./venues"

const NO_FLIPFLOPS = {
  en: "No flip-flops, tank tops or sportswear.",
  es: "Sin chanclas, camisetas sin mangas ni ropa deportiva.",
}

const groups: VenueGroup[] = [
  {
    id: { en: "rooftops-and-cocktails", es: "rooftops-y-cocteleria" },
    title: { en: "Rooftops and cocktail bars", es: "Rooftops y bares de coctelería" },
    intro: {
      en: "For sunset drinks and the start of the night, with views over the domes of the Walled City or the bay.",
      es: "Para los tragos del atardecer y el comienzo de la noche, con vista a las cúpulas de la Ciudad Amurallada o a la bahía.",
    },
    venues: [
      {
        name: "Alquímico",
        instagram: "alquimicocartagena",
        text: {
          en: "A multi-level cocktail destination renowned worldwide for its inventive mixology, immersive ambiance and rooftop party — No. 8 on The World's 50 Best Bars 2024.",
          es: "Un destino de coctelería de varios pisos reconocido en el mundo por su mixología creativa, su ambiente inmersivo y su fiesta en la terraza: número 8 en The World's 50 Best Bars 2024.",
        },
        dress: { en: "No flip-flops.", es: "Sin chanclas." },
      },
      {
        name: "51 Sky Bar",
        instagram: "51skybar",
        text: {
          en: "On the 51st floor in Bocagrande, this rooftop lounge offers panoramic city and sea views, crafted cocktails and a chic atmosphere — perfect for sunset drinks.",
          es: "En el piso 51 en Bocagrande, este rooftop ofrece vista panorámica de la ciudad y el mar, coctelería de autor y un ambiente chic, perfecto para los tragos del atardecer.",
        },
        dress: "standard",
      },
      {
        name: "Casa Pura",
        instagram: "casapurarooftop",
        text: {
          en: "A rooftop restaurant and bar with spectacular sunset views, an international fusion menu, creative cocktails, live DJ sessions and a vibrant atmosphere in the heart of the old city.",
          es: "Restaurante y bar en la azotea con atardeceres espectaculares, menú de fusión internacional, cócteles creativos, DJ en vivo y un ambiente vibrante en el corazón del centro histórico.",
        },
        dress: "none",
      },
      {
        name: "Mirador",
        instagram: "miradorculturebar",
        text: {
          en: "The rooftop with the best view of the Clock Tower, in the heart of the old city: panoramic views, crafted cocktails and a party vibe, from brunch to late-night DJ sets.",
          es: "El rooftop con la mejor vista de la Torre del Reloj, en pleno centro histórico: vista panorámica, cócteles de autor y ambiente de fiesta, del brunch a los sets de DJ en la noche.",
        },
        dress: {
          en: "Casual during the day; smart casual recommended in the evening.",
          es: "Casual de día; se recomienda smart casual en la noche.",
        },
      },
      {
        name: "Buenavida",
        instagram: "buenavidamarisqueria_",
        text: {
          en: "Caribbean seafood culture with rooftop flair: a lively three-floor house offering brunch, dinner and cocktails under the stars in the Walled City.",
          es: "La cultura del marisco caribeño con estilo rooftop: una casa animada de tres pisos con brunch, cena y cócteles bajo las estrellas en la Ciudad Amurallada.",
        },
        dress: {
          en: "No flip-flops, sleeveless shirts or sportswear in the rooftop area.",
          es: "Sin chanclas, camisetas sin mangas ni ropa deportiva en el rooftop.",
        },
      },
      {
        name: "Townhouse",
        instagram: "townhousecartagena",
        text: {
          en: "Perched above a boutique art hotel in the old town, Townhouse Rooftop serves global fusion dishes, cocktails and poolside lounge vibes from day into night.",
          es: "Sobre un hotel boutique de arte en el centro histórico, Townhouse Rooftop ofrece cocina de fusión global, cócteles y ambiente lounge junto a la piscina, del día a la noche.",
        },
        dress: "none",
      },
      {
        name: "El Barón",
        instagram: "elbaroncafe",
        text: {
          en: "A classic cocktail bar in the historic center where artisanal mixology meets an elegant ambiance and authentic nights out on the plaza.",
          es: "Un clásico bar de coctelería en el centro histórico, donde la mixología artesanal se une a un ambiente elegante y a noches auténticas en la plaza.",
        },
        dress: "none",
      },
    ],
  },
  {
    id: { en: "clubs", es: "discotecas" },
    title: { en: "Clubs and dancing", es: "Discotecas y baile" },
    intro: {
      en: "Where the night really begins — usually after 11 p.m. Upscale clubs enforce their dress code at the door.",
      es: "Donde de verdad empieza la noche, normalmente después de las 11 p. m. Las discotecas más exclusivas aplican su código de vestimenta en la puerta.",
    },
    venues: [
      {
        name: "La Movida",
        instagram: "lamovidacartagena",
        text: {
          en: "Trendy and high-energy, La Movida is Cartagena's destination for live DJs, rooftop vibes, signature cocktails and a stylish crowd.",
          es: "De moda y con mucha energía, La Movida es el destino de Cartagena para DJ en vivo, ambiente de rooftop, cócteles de autor y un público con estilo.",
        },
        dress: {
          en: "Upscale dress code enforced (resort wear / tropical chic).",
          es: "Código de vestimenta exigente (resort wear / tropical chic).",
        },
      },
      {
        name: "La Jugada",
        instagram: "lajugadaclubhouse",
        text: {
          en: "A stylish club combining upscale cocktails, modern cuisine and party energy — ideal for a fashionable night out and great for a rooftop photo.",
          es: "Una discoteca con estilo que combina coctelería premium, cocina moderna y energía de fiesta: ideal para una noche elegante y para una foto en el rooftop.",
        },
        dress: {
          en: "Upscale dress code enforced (tropical chic).",
          es: "Código de vestimenta exigente (tropical chic).",
        },
      },
      {
        name: "Café Havana",
        instagram: "cafehavana_cartagena",
        text: {
          en: "A vibrant Cuban-style club in Getsemaní, where live salsa bands, energetic rhythms and a festive crowd bring the night alive — with the best mojitos in town.",
          es: "Un vibrante club de estilo cubano en Getsemaní, donde las orquestas de salsa en vivo, los ritmos y un público festivo llenan la noche, con los mejores mojitos de la ciudad.",
        },
        dress: { en: "Tropical chic.", es: "Tropical chic." },
      },
      {
        name: "El Pasquín",
        instagram: "elpasquindejoaco",
        text: {
          en: "A club perfect for a lively brunch-and-party plan, with a strong local identity, bold music and vibrant drinks for an energetic social scene.",
          es: "Un club perfecto para un plan de brunch y fiesta, con fuerte identidad local, música potente y bebidas vibrantes para un ambiente social lleno de energía.",
        },
        dress: NO_FLIPFLOPS,
      },
      {
        name: "Sala de Despecho",
        instagram: "saladedespecho.co",
        text: {
          en: "A lively nightlife spot made for singing along, dancing and celebrating with friends: upbeat Latin music, a festive crowd and high energy late into the night.",
          es: "Un lugar hecho para cantar, bailar y celebrar con amigos: música latina, público festivo y mucha energía hasta tarde en la noche.",
        },
        dress: NO_FLIPFLOPS,
      },
      {
        name: "Casa D",
        instagram: "casa.d_cartagena",
        text: {
          en: "A lively late-night spot where retro vibes, signature cocktails and sing-along Latin and international classics set the tone for an energetic night out.",
          es: "Un lugar animado para la madrugada, donde el ambiente retro, los cócteles de autor y los clásicos latinos e internacionales para cantar marcan el ritmo de la noche.",
        },
        dress: NO_FLIPFLOPS,
      },
    ],
  },
  {
    id: { en: "casual", es: "plan-casual" },
    title: { en: "Something casual", es: "Algo casual" },
    intro: {
      en: "For a refreshing stop while exploring the Walled City.",
      es: "Para una parada refrescante mientras recorres la Ciudad Amurallada.",
    },
    venues: [
      {
        name: "FUBAR",
        instagram: "fubarcartagena",
        text: {
          en: "A fun, casual frozen-cocktail bar known for natural fruit daiquiris, margaritas and tropical flavours — an easy stop to cool down before a night out or while exploring the Walled City.",
          es: "Un bar casual y divertido de cócteles frozen, conocido por sus daiquiris y margaritas de fruta natural y sabores tropicales: una parada ideal para refrescarse antes de salir o mientras recorres la Ciudad Amurallada.",
        },
        dress: "none",
      },
    ],
  },
]

export const nightlife: SeedPost = {
  slug: "best-rooftops-bars-clubs-cartagena",
  image: "/millan/exp-night.webp",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  keywords: [
    "Cartagena nightlife",
    "best rooftops Cartagena",
    "best bars Cartagena",
    "clubs in Cartagena",
    "Alquímico Cartagena",
    "Getsemaní nightlife",
  ],
  related: [
    { href: "/bachelor-bachelorette-parties", label: { en: "Bachelor & Bachelorette Parties", es: "Despedidas de Soltero(a)" } },
    { href: "/luxury-villas", label: { en: "Private Villas", es: "Villas Privadas" } },
    { href: "/services/concierge", label: { en: "Concierge", es: "Concierge" } },
  ],
  content: {
    en: {
      title: "Cartagena Nightlife: The Best Rooftops, Bars and Clubs",
      metaTitle: "Cartagena Nightlife: Best Rooftops, Bars & Clubs",
      description:
        "Alquímico, La Movida, Café Havana, 51 Sky Bar and more: the rooftops, cocktail bars and clubs we recommend in Cartagena, with dress codes, timings and tips for a great night out.",
      metaDescription:
        "Alquímico, La Movida, Café Havana, 51 Sky Bar and more: the best rooftops, bars and clubs in Cartagena, with dress codes and night-out tips.",
      category: "Food & Nightlife",
      imageAlt: "Friends toasting on a rooftop at sunset with the domes of Cartagena's Walled City behind them",
      takeaways: [
        "Most of Cartagena's nightlife is in the Walled City and Getsemaní, within walking distance of each other.",
        "Start with sunset drinks on a rooftop — Alquímico (No. 8 on The World's 50 Best Bars 2024), Mirador, Casa Pura or 51 Sky Bar in Bocagrande.",
        "Clubs fill up after 11 p.m., especially Thursday to Saturday; La Movida and La Jugada enforce an upscale, tropical-chic dress code.",
        "For live salsa, Café Havana in Getsemaní is a classic; for singing along, Sala de Despecho and Casa D.",
        "Book tables in advance for groups and use pre-arranged transport at night.",
      ],
      body: [
        {
          type: "p",
          text: "Cartagena's nights are as memorable as its days. The evening begins with a cocktail as the sun sets over the domes of the Walled City, continues with a long dinner and ends dancing to salsa, reggaeton or Latin classics until late. This is our selection of rooftops, bars and clubs, organised by moment of the night. Almost all are in the Walled City and Getsemaní, a short walk from our [villas](/luxury-villas).",
        },
        {
          type: "tip",
          title: "Dress the part",
          text: "Tropical chic works almost everywhere: linen shirts, light dresses, loafers or elegant sandals. Avoid flip-flops, tank tops and sportswear — they are refused at most rooftops and clubs.",
        },
        ...venueBlocks(groups, "en"),
        { type: "h2", id: "how-to-plan", text: "How to plan the perfect night out" },
        {
          type: "ol",
          items: [
            "**6:00 p.m. — Sunset on a rooftop:** Alquímico, Mirador, Casa Pura or 51 Sky Bar.",
            "**8:00 p.m. — Dinner:** pick from [our favourite restaurants in Cartagena](/blog/best-restaurants-cartagena).",
            "**11:00 p.m. — Club:** La Movida, La Jugada or Café Havana for salsa.",
            "**Late night:** Sala de Despecho or Casa D to sing until closing.",
          ],
        },
        { type: "h2", id: "tips", text: "Nightlife tips" },
        {
          type: "ul",
          items: [
            "**Book tables in advance** for groups, especially from Thursday to Saturday and in high season.",
            "**Some clubs charge a cover** on busy nights or have minimum spends for tables.",
            "**Move around with pre-arranged transport** or official apps at night, especially to and from Bocagrande.",
            "**Keep your drinks in sight** and never accept drinks from strangers.",
            "**Celebrating?** Read our [bachelor and bachelorette party guide](/blog/cartagena-bachelor-bachelorette-party-guide).",
          ],
        },
        {
          type: "p",
          text: "Our [concierge](/services/concierge) can book tables, arrange transport and plan the whole night for your group. And if you are staying in a villa, check what you can do at home in our [villa rental FAQ](/blog/cartagena-villa-rental-faq).",
        },
      ],
      faqs: [
        {
          question: "Where is the nightlife in Cartagena?",
          answer:
            "Mainly in the Walled City and Getsemaní, where rooftops, cocktail bars and clubs are within walking distance of each other. Bocagrande has some panoramic rooftops such as 51 Sky Bar, about 10 minutes away by car.",
        },
        {
          question: "What time do clubs open in Cartagena?",
          answer:
            "Bars and rooftops are busy from sunset, but clubs usually fill up after 11 p.m. and stay open until the early hours, especially from Thursday to Saturday.",
        },
        {
          question: "What should I wear to go out in Cartagena?",
          answer:
            "Tropical chic: linen shirts, light dresses, loafers or elegant sandals. Most rooftops and clubs do not allow flip-flops, tank tops or sportswear, and La Movida and La Jugada enforce an upscale dress code.",
        },
        {
          question: "What is the best bar in Cartagena?",
          answer:
            "Alquímico is the most acclaimed: it was ranked No. 8 on The World's 50 Best Bars 2024 for its inventive mixology and rooftop atmosphere.",
        },
        {
          question: "Where can I dance salsa in Cartagena?",
          answer:
            "Café Havana in Getsemaní is the classic spot for live salsa bands. La Vitrola, in the historic center, combines dinner with live Cuban music every night.",
        },
      ],
      cta: {
        title: "Your night, perfectly planned.",
        text: "Tables, transport and the right spots for your group — our concierge takes care of it.",
        label: "Plan my night out",
        href: "/contact",
      },
    },
    es: {
      title: "Vida nocturna en Cartagena: los mejores rooftops, bares y discotecas",
      metaTitle: "Rumba en Cartagena: mejores rooftops, bares y discotecas",
      description:
        "Alquímico, La Movida, Café Havana, 51 Sky Bar y más: los rooftops, bares de coctelería y discotecas que recomendamos en Cartagena, con código de vestimenta, horarios y consejos para una gran noche.",
      metaDescription:
        "Alquímico, La Movida, Café Havana, 51 Sky Bar y más: los mejores rooftops, bares y discotecas de Cartagena, con código de vestimenta y consejos.",
      category: "Gastronomía y vida nocturna",
      imageAlt: "Amigos brindando en un rooftop al atardecer con las cúpulas de la Ciudad Amurallada de Cartagena de fondo",
      takeaways: [
        "La mayor parte de la vida nocturna de Cartagena está en la Ciudad Amurallada y Getsemaní, a poca distancia caminando entre sí.",
        "Empieza con los tragos del atardecer en un rooftop: Alquímico (número 8 en The World's 50 Best Bars 2024), Mirador, Casa Pura o 51 Sky Bar en Bocagrande.",
        "Las discotecas se llenan después de las 11 p. m., sobre todo de jueves a sábado; La Movida y La Jugada exigen un código de vestimenta elegante, tropical chic.",
        "Para salsa en vivo, Café Havana en Getsemaní es un clásico; para cantar, Sala de Despecho y Casa D.",
        "Reserva mesa con anticipación si vas en grupo y usa transporte acordado en la noche.",
      ],
      body: [
        {
          type: "p",
          text: "Las noches de Cartagena son tan memorables como sus días. La noche empieza con un cóctel mientras el sol cae sobre las cúpulas de la Ciudad Amurallada, sigue con una cena larga y termina bailando salsa, reguetón o clásicos latinos hasta tarde. Esta es nuestra selección de rooftops, bares y discotecas, organizada según el momento de la noche. Casi todos están en la Ciudad Amurallada y Getsemaní, a una corta caminata de nuestras [villas](/luxury-villas).",
        },
        {
          type: "tip",
          title: "Vístete para la ocasión",
          text: "El tropical chic funciona en casi todas partes: camisas de lino, vestidos ligeros, mocasines o sandalias elegantes. Evita chanclas, camisetas sin mangas y ropa deportiva: no las permiten en la mayoría de rooftops y discotecas.",
        },
        ...venueBlocks(groups, "es"),
        { type: "h2", id: "como-planear", text: "Cómo planear la noche perfecta" },
        {
          type: "ol",
          items: [
            "**6:00 p. m. — Atardecer en un rooftop:** Alquímico, Mirador, Casa Pura o 51 Sky Bar.",
            "**8:00 p. m. — Cena:** elige entre [nuestros restaurantes favoritos de Cartagena](/blog/best-restaurants-cartagena).",
            "**11:00 p. m. — Discoteca:** La Movida, La Jugada o Café Havana para salsa.",
            "**Madrugada:** Sala de Despecho o Casa D para cantar hasta el cierre.",
          ],
        },
        { type: "h2", id: "consejos", text: "Consejos para salir de rumba" },
        {
          type: "ul",
          items: [
            "**Reserva mesa con anticipación** si vas en grupo, sobre todo de jueves a sábado y en temporada alta.",
            "**Algunas discotecas cobran cover** en noches concurridas o tienen consumo mínimo por mesa.",
            "**Muévete con transporte acordado** o aplicaciones oficiales en la noche, especialmente desde y hacia Bocagrande.",
            "**No pierdas de vista tu bebida** y nunca aceptes bebidas de desconocidos.",
            "**¿Vas a celebrar?** Lee nuestra [guía de despedidas de soltero(a)](/blog/cartagena-bachelor-bachelorette-party-guide).",
          ],
        },
        {
          type: "p",
          text: "Nuestro [concierge](/services/concierge) puede reservar mesas, coordinar el transporte y planear toda la noche para tu grupo. Y si te alojas en una villa, revisa qué puedes hacer en casa en nuestras [preguntas frecuentes sobre villas](/blog/cartagena-villa-rental-faq).",
        },
      ],
      faqs: [
        {
          question: "¿Dónde está la rumba en Cartagena?",
          answer:
            "Principalmente en la Ciudad Amurallada y Getsemaní, donde los rooftops, bares de coctelería y discotecas quedan a poca distancia caminando entre sí. En Bocagrande hay rooftops panorámicos como 51 Sky Bar, a unos 10 minutos en carro.",
        },
        {
          question: "¿A qué hora abren las discotecas en Cartagena?",
          answer:
            "Los bares y rooftops se animan desde el atardecer, pero las discotecas suelen llenarse después de las 11 p. m. y siguen abiertas hasta la madrugada, sobre todo de jueves a sábado.",
        },
        {
          question: "¿Qué ropa usar para salir de noche en Cartagena?",
          answer:
            "Tropical chic: camisas de lino, vestidos ligeros, mocasines o sandalias elegantes. La mayoría de rooftops y discotecas no permiten chanclas, camisetas sin mangas ni ropa deportiva, y La Movida y La Jugada exigen un código de vestimenta elegante.",
        },
        {
          question: "¿Cuál es el mejor bar de Cartagena?",
          answer:
            "Alquímico es el más reconocido: quedó número 8 en The World's 50 Best Bars 2024 por su mixología creativa y su ambiente en la terraza.",
        },
        {
          question: "¿Dónde bailar salsa en Cartagena?",
          answer:
            "Café Havana, en Getsemaní, es el lugar clásico para escuchar orquestas de salsa en vivo. La Vitrola, en el centro histórico, combina la cena con música cubana en vivo todas las noches.",
        },
      ],
      cta: {
        title: "Tu noche, perfectamente planeada.",
        text: "Mesas, transporte y los lugares ideales para tu grupo: nuestro concierge se encarga.",
        label: "Planear mi noche",
        href: "/contact",
      },
    },
  },
}
