import type { SeedPost } from "../types"
import { venueBlocks, type VenueGroup } from "./venues"

const groups: VenueGroup[] = [
  {
    id: { en: "fine-dining", es: "alta-cocina" },
    title: { en: "Fine dining and tasting menus", es: "Alta cocina y menús de degustación" },
    intro: {
      en: "For a special night: the tables that have put Cartagena on the international gastronomic map. Book well in advance.",
      es: "Para una noche especial: las mesas que pusieron a Cartagena en el mapa gastronómico internacional. Reserva con buena anticipación.",
    },
    venues: [
      {
        name: "Celele",
        instagram: "celele_restaurante",
        text: {
          en: "One of Latin America's top restaurants, ranked No. 5 on Latin America's 50 Best Restaurants 2025. Contemporary Caribbean cuisine rooted in the biodiversity, ingredients and traditions of Colombia's Caribbean coast. Reserve well ahead.",
          es: "Uno de los mejores restaurantes de Latinoamérica, número 5 en Latin America's 50 Best Restaurants 2025. Cocina caribeña contemporánea inspirada en la biodiversidad, los ingredientes y las tradiciones de la costa Caribe colombiana. Reserva con mucha anticipación.",
        },
        dress: "standard",
      },
      {
        name: "Carmen",
        instagram: "carmenrestaurante",
        text: {
          en: "Colombia's biodiversity through contemporary techniques: carefully crafted dishes that showcase Caribbean-coast ingredients in an elegant, intimate setting. Don't miss the 7-course tasting menu.",
          es: "La biodiversidad de Colombia a través de técnicas contemporáneas: platos elaborados con ingredientes de la costa Caribe en un ambiente elegante e íntimo. No te pierdas su menú de degustación de 7 tiempos.",
        },
        dress: "standard",
      },
      {
        name: "Rabo de Pez",
        instagram: "rabodepez",
        text: {
          en: "Creative fine-dining Colombian cuisine focused on seafood and local specialty ingredients, paired with thoughtful cocktails and exceptional service.",
          es: "Cocina colombiana creativa de alto nivel, enfocada en mariscos e ingredientes locales, acompañada de cócteles cuidadosamente pensados y un servicio excepcional.",
        },
        dress: "standard",
      },
      {
        name: "El Curato",
        instagram: "elcuratoctg",
        text: {
          en: "A Latin bistro with Caribbean vibes by Álvaro Clavijo, one of Colombia's most acclaimed chefs. Known for its fresh produce and gluten-free options.",
          es: "Bistró latino con aire caribeño del chef Álvaro Clavijo, uno de los más reconocidos de Colombia. Destaca por sus productos frescos y sus opciones sin gluten.",
        },
        dress: "standard",
      },
      {
        name: "Don Juan",
        instagram: "donjuancartagena",
        text: {
          en: "Contemporary Colombian cuisine celebrating local produce, seafood and meats with creative yet approachable dishes. Ideal for lunch or dinner in the historic center.",
          es: "Cocina colombiana contemporánea que celebra el producto local, los mariscos y las carnes con platos creativos y cercanos. Ideal para almorzar o cenar en el centro histórico.",
        },
        dress: {
          en: "Casual for lunch, formal for dinner; no tank tops or beachwear.",
          es: "Casual al almuerzo y formal en la cena; sin camisetas sin mangas ni ropa de playa.",
        },
      },
    ],
  },
  {
    id: { en: "dinner-and-music", es: "cena-con-musica" },
    title: { en: "Dinner with music and atmosphere", es: "Cenas con música y ambiente" },
    intro: {
      en: "Restaurants where dinner turns into a night out: live music, DJs, shows and cocktails. Perfect for groups and celebrations.",
      es: "Restaurantes donde la cena se convierte en plan de noche: música en vivo, DJ, shows y cócteles. Perfectos para grupos y celebraciones.",
    },
    venues: [
      {
        name: "Casa Salvaje",
        instagram: "casasalvaje.ctg",
        text: {
          en: "Four spaces under one roof: Kanibal (steakhouse), Salvaje (Nikkei), La Dominicana (Italian and brunch) and Ono Culto (Japanese speakeasy). A bit of everything in one place — great food, cocktails, music and party vibes.",
          es: "Cuatro espacios bajo un mismo techo: Kanibal (carnes), Salvaje (nikkei), La Dominicana (italiano y brunch) y Ono Culto (speakeasy japonés). Un poco de todo en un solo lugar: buena comida, cócteles, música y ambiente de fiesta.",
        },
        dress: "standard",
      },
      {
        name: "NIKU",
        instagram: "nikurestaurante",
        text: {
          en: "A sophisticated Nikkei restaurant blending Japanese technique with Peruvian flavour: refined sushi, sashimi, ceviches and creative cocktails in a stylish setting, often with live music, a DJ or a show.",
          es: "Sofisticado restaurante nikkei que une la técnica japonesa con el sabor peruano: sushi, sashimi, ceviches y cócteles creativos en un ambiente elegante, a menudo con música en vivo, DJ o show.",
        },
        dress: "standard",
      },
      {
        name: "La Vitrola",
        instagram: "lavitrolacartagena",
        text: {
          en: "Cuban-inspired rhythms with Caribbean soul: vibrant Cuban-Latin cuisine, live music every night and an electric atmosphere in the heart of the historic district.",
          es: "Ritmos de inspiración cubana con alma caribeña: cocina cubano-latina, música en vivo todas las noches y un ambiente vibrante en el corazón del centro histórico.",
        },
        dress: {
          en: "Gentlemen must wear long trousers; no hats, flip-flops, tank tops or sportswear.",
          es: "Los caballeros deben usar pantalón largo; sin gorras, chanclas, camisetas sin mangas ni ropa deportiva.",
        },
      },
      {
        name: "Ana",
        instagram: "anarestaurantectg",
        text: {
          en: "Caribbean and Asian flavours in a creative atmosphere with live shows and music — one of the most memorable dining experiences in the historic center.",
          es: "Sabores caribeños y asiáticos en un ambiente creativo con show y música en vivo: una de las experiencias gastronómicas más memorables del centro histórico.",
        },
        dress: "standard",
      },
      {
        name: "Lobo de Mar",
        instagram: "lobodemarcartagena",
        text: {
          en: "Ocean-inspired ingredients and land-crafted flavours in a vibrant, sharing-style dining experience, with inventive cocktails and live music in the old town.",
          es: "Ingredientes del mar y sabores de la tierra en una experiencia para compartir, vibrante, con cócteles creativos y música en vivo en el centro histórico.",
        },
        dress: "standard",
      },
      {
        name: "Manglar",
        instagram: "manglar.ctg",
        text: {
          en: "Open-flame cooking and coastal Colombian flavours, paired with crafted cocktails and a tropical ambience with live music or a DJ.",
          es: "Cocina a la llama y sabores de la costa colombiana, con cócteles de autor y un ambiente tropical con música en vivo o DJ.",
        },
        dress: "none",
      },
    ],
  },
  {
    id: { en: "rooftop-dining", es: "rooftops-para-cenar" },
    title: { en: "Rooftop dining with views", es: "Cenar en un rooftop con vista" },
    intro: {
      en: "Dinner above the rooftops of the Walled City, ideally timed with the sunset.",
      es: "Cenar por encima de los tejados de la Ciudad Amurallada, idealmente a la hora del atardecer.",
    },
    venues: [
      {
        name: "Viva la Vida",
        instagram: "vivalavida.ctg",
        text: {
          en: "A trendy rooftop with elevated sushi, craft cocktails, live DJs and panoramic views of the bay, the Clock Tower and the Walled City. Japanese cuisine with Colombian influences and sunset-to-nightlife energy.",
          es: "Rooftop de moda con sushi de autor, coctelería, DJ en vivo y vista panorámica de la bahía, la Torre del Reloj y la Ciudad Amurallada. Cocina japonesa con influencias colombianas y energía del atardecer a la noche.",
        },
        dress: "standard",
      },
      {
        name: "Apogeo",
        instagram: "apogeorestaurante",
        text: {
          en: "Mediterranean elegance and Latin passion in a rooftop-style setting in the heart of Cartagena: refined cuisine, creative cocktails and panoramic views.",
          es: "Elegancia mediterránea y pasión latina en un ambiente tipo rooftop en el corazón de Cartagena: cocina refinada, cócteles creativos y vista panorámica.",
        },
        dress: "standard",
      },
    ],
  },
  {
    id: { en: "mediterranean-and-steak", es: "mediterraneo-y-carnes" },
    title: { en: "Mediterranean and steakhouses", es: "Mediterráneo y carnes" },
    intro: {
      en: "For when the group wants something different from Caribbean cuisine.",
      es: "Para cuando el grupo quiere algo distinto a la cocina caribeña.",
    },
    venues: [
      {
        name: "Máximo",
        instagram: "maximo.mediterraneo",
        text: {
          en: "Bold Mediterranean flavours where truffle and pistachio take centre stage — from the crusted tuna and truffled beef to the pistachio profiteroles.",
          es: "Sabores mediterráneos intensos donde la trufa y el pistacho son protagonistas: del atún en costra y la carne trufada a los profiteroles de pistacho.",
        },
        dress: "standard",
      },
      {
        name: "Roman",
        instagram: "romanrestaurante",
        text: {
          en: "Mediterranean and Greek flavours with Caribbean inspiration. Ideal for sharing and discovering bold tastes in an elegant, relaxed setting.",
          es: "Sabores mediterráneos y griegos con inspiración caribeña. Ideal para compartir y descubrir sabores intensos en un ambiente elegante y relajado.",
        },
        dress: "standard",
      },
      {
        name: "La Cabrera",
        instagram: "lacabrera.cartagena",
        text: {
          en: "A popular Argentine steakhouse in the historic center, known for its high-quality cuts, generous portions and wine selection.",
          es: "Popular parrilla argentina en el centro histórico, conocida por sus cortes de alta calidad, porciones generosas y su carta de vinos.",
        },
        dress: "standard",
      },
      {
        name: "Quebracho",
        instagram: "quebrachoparrilla",
        text: {
          en: "An Argentine-style grill (parrilla) in the historic center, centred on premium cuts cooked over the fire.",
          es: "Parrilla de estilo argentino en el centro histórico, centrada en cortes premium a la brasa.",
        },
        dress: "standard",
      },
    ],
  },
  {
    id: { en: "local-flavour", es: "sabor-local" },
    title: { en: "Authentic local flavour", es: "Auténtico sabor local" },
    intro: {
      en: "Traditional Caribbean cooking and relaxed bistros, many of them in Getsemaní.",
      es: "Cocina caribeña tradicional y bistrós relajados, muchos de ellos en Getsemaní.",
    },
    venues: [
      {
        name: "Candé",
        instagram: "canderestaurante",
        text: {
          en: "A 100% cartagenera culinary experience: fresh seafood, traditional soups and local meats, served in a vibrant atmosphere with live music and folkloric dance.",
          es: "Una experiencia 100% cartagenera: mariscos frescos, sopas tradicionales y carnes locales, en un ambiente vibrante con música en vivo y danza folclórica.",
        },
        dress: "standard",
      },
      {
        name: "Salón Tropical",
        instagram: "salon_tropical_",
        text: {
          en: "A vibrant Getsemaní spot serving fresh, locally sourced Caribbean flavours in a lively tropical setting with live music — Cartagena's true gastronomic spirit.",
          es: "Un lugar vibrante en Getsemaní con sabores caribeños frescos y de origen local, en un ambiente tropical animado con música en vivo: el verdadero espíritu gastronómico de Cartagena.",
        },
        dress: "none",
      },
      {
        name: "Mar de las Antillas",
        instagram: "mardelasantillasctg",
        text: {
          en: "Over 30 years of culinary tradition in Getsemaní, capturing the essence of Cartagena's Caribbean culture. Try the seafood casserole, fried fish, ceviches and traditional rice dishes.",
          es: "Más de 30 años de tradición culinaria en Getsemaní, con la esencia de la cultura caribeña de Cartagena. Prueba la cazuela de mariscos, el pescado frito, los ceviches y los arroces tradicionales.",
        },
        dress: "none",
      },
      {
        name: "Sambal",
        instagram: "sambal_bistro",
        text: {
          en: "A Caribbean-inspired bistro with creative local flavours and elevated coastal dishes, perfect for a relaxed, flavourful meal in lively Getsemaní.",
          es: "Bistró de inspiración caribeña con sabores locales creativos y platos costeños elevados, perfecto para una comida relajada en el animado Getsemaní.",
        },
        dress: { en: "Casual chic: stylish but relaxed.", es: "Casual chic: con estilo pero relajado." },
      },
      {
        name: "Casual",
        instagram: "casual_bistro_local",
        text: {
          en: "A relaxed, modern local bistro in Getsemaní offering fresh, creative cuisine, signature cocktails and a laid-back yet stylish dining experience.",
          es: "Bistró local moderno y relajado en Getsemaní, con cocina fresca y creativa, cócteles de autor y un ambiente descomplicado pero con estilo.",
        },
        dress: "none",
      },
    ],
  },
]

export const bestRestaurants: SeedPost = {
  slug: "best-restaurants-cartagena",
  image: "/millan/cel-exp-dinner.webp",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  keywords: [
    "best restaurants Cartagena",
    "where to eat in Cartagena",
    "fine dining Cartagena",
    "Celele Cartagena",
    "Cartagena restaurants dress code",
    "Getsemaní restaurants",
  ],
  related: [
    { href: "/services/private-chef", label: { en: "Private Chef", es: "Chef Privado" } },
    { href: "/services/concierge", label: { en: "Concierge", es: "Concierge" } },
    { href: "/luxury-villas", label: { en: "Private Villas", es: "Villas Privadas" } },
  ],
  content: {
    en: {
      title: "The Best Restaurants in Cartagena: Our Concierge's Picks",
      metaTitle: "Best Restaurants in Cartagena: 22 Picks by Our Concierge",
      description:
        "From Celele and tasting menus to rooftops with a view, dinners with live music and authentic Caribbean flavour in Getsemaní: the 22 restaurants we recommend to our guests, with dress codes and booking tips.",
      metaDescription:
        "Celele, Carmen, NIKU, Viva la Vida and more: 22 restaurants in Cartagena recommended by our concierge, with dress codes and booking tips.",
      category: "Food & Nightlife",
      imageAlt: "Candle-lit dinner table set for a group at sunset in Cartagena",
      takeaways: [
        "Cartagena is one of Latin America's great food destinations: Celele was ranked No. 5 on Latin America's 50 Best Restaurants 2025.",
        "For a special night, book fine-dining restaurants such as Celele, Carmen or Rabo de Pez well in advance, especially in high season.",
        "Many restaurants enforce a dress code: no hats, flip-flops, tank tops or sportswear — and some require long trousers for men.",
        "For dinner with music and atmosphere, try Casa Salvaje, NIKU, La Vitrola or Ana; for views, Viva la Vida or Apogeo.",
        "For authentic local flavour, Getsemaní has classics like Mar de las Antillas, Salón Tropical and Candé.",
      ],
      body: [
        {
          type: "p",
          text: "Eating well is one of the great reasons to visit Cartagena. The city combines the ingredients of the Caribbean — seafood, coconut, tropical fruit — with a new generation of chefs who have placed it among the best food destinations in Latin America. This is the list our concierge team shares with guests, organised by type of plan. All restaurants are in or near the Walled City and Getsemaní, a short walk from our [villas](/luxury-villas).",
        },
        {
          type: "tip",
          title: "Before you go",
          text: "Dinner is usually served from 7:30 p.m. and the best restaurants fill up early. Bills often include a suggested 10% voluntary service charge. And if you prefer to stay in, a private chef can bring this level of cuisine to your villa.",
        },
        ...venueBlocks(groups, "en"),
        { type: "h2", id: "tips", text: "Tips for dining out in Cartagena" },
        {
          type: "ul",
          items: [
            "**Book ahead:** a few days for most restaurants, and several weeks for Celele or for groups in high season.",
            "**Check the dress code:** many places do not allow hats, flip-flops, tank tops or sportswear.",
            "**Plan the order of the night:** dinner at 7:30–8:00 p.m., then a rooftop or club. See our guide to [rooftops, bars and clubs](/blog/best-rooftops-bars-clubs-cartagena).",
            "**Large groups:** some restaurants have private rooms or fixed menus; we can arrange them for you.",
            "**Night at home:** a [private chef](/services/private-chef) at the villa is the best alternative for a relaxed group dinner.",
          ],
        },
        {
          type: "p",
          text: "Our [concierge](/services/concierge) handles reservations at all these restaurants, including the hardest tables to get. Send us your dates and preferences before you arrive.",
        },
      ],
      faqs: [
        {
          question: "What is the best restaurant in Cartagena?",
          answer:
            "Celele is considered one of the best: it was ranked No. 5 on Latin America's 50 Best Restaurants 2025 for its contemporary Caribbean cuisine. Carmen and Rabo de Pez are also excellent choices for a special night.",
        },
        {
          question: "Do restaurants in Cartagena have a dress code?",
          answer:
            "Many do. The most common rule is no hats, flip-flops, tank tops or sportswear, and some, like La Vitrola, require long trousers for men. In Getsemaní there are more relaxed places with no dress code.",
        },
        {
          question: "Do I need a reservation for restaurants in Cartagena?",
          answer:
            "For the most popular restaurants, yes — a few days ahead in general and several weeks ahead for Celele or for large groups in high season.",
        },
        {
          question: "Is tipping included in Cartagena restaurants?",
          answer:
            "Bills usually include a suggested 10% voluntary service charge. You can accept it, adjust it or ask to remove it.",
        },
      ],
      cta: {
        title: "The best tables, already booked.",
        text: "Tell us your dates and tastes, and our concierge will reserve restaurants for every night of your trip.",
        label: "Book my dinners",
        href: "/contact",
      },
    },
    es: {
      title: "Los mejores restaurantes de Cartagena: la selección de nuestro concierge",
      metaTitle: "Mejores restaurantes en Cartagena: 22 recomendados",
      description:
        "De Celele y los menús de degustación a rooftops con vista, cenas con música en vivo y auténtico sabor caribeño en Getsemaní: los 22 restaurantes que recomendamos a nuestros huéspedes, con código de vestimenta y consejos para reservar.",
      metaDescription:
        "Celele, Carmen, NIKU, Viva la Vida y más: 22 restaurantes en Cartagena recomendados por nuestro concierge, con código de vestimenta y consejos.",
      category: "Gastronomía y vida nocturna",
      imageAlt: "Mesa para cenar en grupo iluminada con velas al atardecer en Cartagena",
      takeaways: [
        "Cartagena es uno de los grandes destinos gastronómicos de Latinoamérica: Celele quedó número 5 en Latin America's 50 Best Restaurants 2025.",
        "Para una noche especial, reserva con buena anticipación restaurantes de alta cocina como Celele, Carmen o Rabo de Pez, sobre todo en temporada alta.",
        "Muchos restaurantes tienen código de vestimenta: sin gorras, chanclas, camisetas sin mangas ni ropa deportiva, y algunos exigen pantalón largo a los hombres.",
        "Para cenar con música y ambiente, prueba Casa Salvaje, NIKU, La Vitrola o Ana; para la vista, Viva la Vida o Apogeo.",
        "Para el auténtico sabor local, Getsemaní tiene clásicos como Mar de las Antillas, Salón Tropical y Candé.",
      ],
      body: [
        {
          type: "p",
          text: "Comer bien es una de las grandes razones para visitar Cartagena. La ciudad combina los ingredientes del Caribe —mariscos, coco, frutas tropicales— con una nueva generación de chefs que la han puesto entre los mejores destinos gastronómicos de Latinoamérica. Esta es la lista que nuestro equipo de concierge comparte con los huéspedes, organizada por tipo de plan. Todos están en la Ciudad Amurallada, Getsemaní o muy cerca, a poca distancia caminando de nuestras [villas](/luxury-villas).",
        },
        {
          type: "tip",
          title: "Antes de salir",
          text: "La cena suele servirse desde las 7:30 p. m. y los mejores restaurantes se llenan temprano. La cuenta normalmente incluye una propina voluntaria sugerida del 10%. Y si prefieres quedarte en casa, un chef privado puede llevar este nivel de cocina a tu villa.",
        },
        ...venueBlocks(groups, "es"),
        { type: "h2", id: "consejos", text: "Consejos para salir a comer en Cartagena" },
        {
          type: "ul",
          items: [
            "**Reserva con tiempo:** unos días antes para la mayoría de restaurantes, y varias semanas para Celele o para grupos en temporada alta.",
            "**Revisa el código de vestimenta:** muchos lugares no permiten gorras, chanclas, camisetas sin mangas ni ropa deportiva.",
            "**Planea el orden de la noche:** cena a las 7:30–8:00 p. m. y luego un rooftop o una discoteca. Mira nuestra guía de [rooftops, bares y discotecas](/blog/best-rooftops-bars-clubs-cartagena).",
            "**Grupos grandes:** algunos restaurantes tienen salones privados o menús cerrados; podemos organizarlos por ti.",
            "**Noche en casa:** un [chef privado](/services/private-chef) en la villa es la mejor alternativa para una cena de grupo relajada.",
          ],
        },
        {
          type: "p",
          text: "Nuestro [concierge](/services/concierge) gestiona reservas en todos estos restaurantes, incluso en las mesas más difíciles de conseguir. Envíanos tus fechas y preferencias antes de llegar.",
        },
      ],
      faqs: [
        {
          question: "¿Cuál es el mejor restaurante de Cartagena?",
          answer:
            "Celele es considerado uno de los mejores: quedó número 5 en Latin America's 50 Best Restaurants 2025 por su cocina caribeña contemporánea. Carmen y Rabo de Pez también son excelentes opciones para una noche especial.",
        },
        {
          question: "¿Los restaurantes de Cartagena tienen código de vestimenta?",
          answer:
            "Muchos sí. La regla más común es no usar gorras, chanclas, camisetas sin mangas ni ropa deportiva, y algunos, como La Vitrola, exigen pantalón largo a los hombres. En Getsemaní hay lugares más relajados sin código de vestimenta.",
        },
        {
          question: "¿Hay que reservar en los restaurantes de Cartagena?",
          answer:
            "En los más populares, sí: unos días antes en general y varias semanas antes para Celele o para grupos grandes en temporada alta.",
        },
        {
          question: "¿La propina está incluida en los restaurantes de Cartagena?",
          answer:
            "La cuenta suele incluir una propina voluntaria sugerida del 10%. Puedes aceptarla, ajustarla o pedir que la retiren.",
        },
      ],
      cta: {
        title: "Las mejores mesas, ya reservadas.",
        text: "Cuéntanos tus fechas y gustos, y nuestro concierge reservará restaurantes para cada noche de tu viaje.",
        label: "Reservar mis cenas",
        href: "/contact",
      },
    },
  },
}
