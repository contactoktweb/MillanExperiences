import type { StoreDestination, StorePriority } from "./store-constants"

export type Locale = "es" | "en"

const CATEGORY_TRANSLATIONS: Record<string, { es: string; en: string }> = {
  // Categorías principales de Sanity
  "aseo personal": { es: "Aseo Personal", en: "Personal Care & Toiletries" },
  "bebes y ninos": { es: "Bebés y Niños", en: "Babies & Kids" },
  "bebés y niños": { es: "Bebés y Niños", en: "Babies & Kids" },
  "cafe y desayuno": { es: "Café y Desayuno", en: "Coffee & Breakfast" },
  "café y desayuno": { es: "Café y Desayuno", en: "Coffee & Breakfast" },
  "cava premium": { es: "Cava Premium", en: "Premium Cellar" },
  "celebraciones y detalles": { es: "Celebraciones y Detalles", en: "Celebrations & Gifts" },
  "cerveza, cava basica y mixers": { es: "Cerveza, Cava Básica y Mixers", en: "Beer, Basic Cellar & Mixers" },
  "cerveza, cava básica y mixers": { es: "Cerveza, Cava Básica y Mixers", en: "Beer, Basic Cellar & Mixers" },
  "cocina y despensa": { es: "Cocina y Despensa", en: "Kitchen & Pantry" },
  "farmacia y bienestar": { es: "Farmacia y Bienestar", en: "Pharmacy & Wellness" },
  "frutas y snacks": { es: "Frutas y Snacks", en: "Fruits & Snacks" },
  "gourmet italiano": { es: "Gourmet Italiano", en: "Italian Gourmet" },
  "hidratacion y bebidas": { es: "Hidratación y Bebidas", en: "Hydration & Beverages" },
  "hidratación y bebidas": { es: "Hidratación y Bebidas", en: "Hydration & Beverages" },
  "sol, playa y a bordo": { es: "Sol, Playa y a Bordo", en: "Sun, Beach & Onboard" },
  "tabaco": { es: "Tabaco", en: "Tobacco & Cigars" },
  "vinos y licores italianos": { es: "Vinos y Licores Italianos", en: "Italian Wines & Spirits" },

  // Subcategorías de Cava Premium en Sanity
  "aguardientes y licores nacionales": { es: "Aguardientes y Licores Nacionales", en: "Colombian Spirits & Aguardiente" },
  "aperitivos, licores y cognac": { es: "Aperitivos, Licores y Cognac", en: "Aperitifs, Liqueurs & Cognac" },
  "champagne, espumosos y vinos": { es: "Champagne, Espumosos y Vinos", en: "Champagne, Sparkling & Wines" },
  "gin": { es: "Gin", en: "Gin" },
  "ginebra": { es: "Ginebra", en: "Gin" },
  "ron": { es: "Ron", en: "Rum" },
  "tequila y mezcal": { es: "Tequila y Mezcal", en: "Tequila & Mezcal" },
  "vodka": { es: "Vodka", en: "Vodka" },
  "whisky y bourbon": { es: "Whisky y Bourbon", en: "Whiskey & Bourbon" },

  // Variaciones y términos de catálogo
  "cava": { es: "Cava", en: "Cellar" },
  "champagne": { es: "Champagne", en: "Champagne" },
  "espumosos": { es: "Espumosos", en: "Sparkling Wines" },
  "vino tinto": { es: "Vino Tinto", en: "Red Wine" },
  "vino blanco": { es: "Vino Blanco", en: "White Wine" },
  "vino rosado": { es: "Vino Rosado", en: "Rosé Wine" },
  "vinos": { es: "Vinos", en: "Wines" },
  "licores": { es: "Licores", en: "Spirits & Liqueurs" },
  "licores y destilados": { es: "Licores y Destilados", en: "Spirits & Liquors" },
  "tequila": { es: "Tequila", en: "Tequila" },
  "mezcal": { es: "Mezcal", en: "Mezcal" },
  "whisky": { es: "Whisky", en: "Whiskey" },
  "bourbon": { es: "Bourbon", en: "Bourbon" },
  "cervezas": { es: "Cervezas", en: "Beers" },
  "cerveza": { es: "Cerveza", en: "Beer" },
  "aguas y refrescos": { es: "Aguas y Refrescos", en: "Waters & Soft Drinks" },
  "aguas": { es: "Aguas", en: "Waters" },
  "refrescos": { es: "Refrescos", en: "Soft Drinks" },
  "gaseosas": { es: "Gaseosas", en: "Sodas" },
  "tonicas": { es: "Tónicas", en: "Tonics" },
  "tónicas": { es: "Tónicas", en: "Tonics" },
  "snacks y complementos gourmet": { es: "Snacks y Gourmet", en: "Gourmet Snacks" },
  "snacks": { es: "Snacks", en: "Snacks" },
  "gourmet": { es: "Gourmet", en: "Gourmet" },
  "hielo y suministros": { es: "Hielo y Suministros", en: "Ice & Supplies" },
  "hielo": { es: "Hielo", en: "Ice" },
  "suministros": { es: "Suministros", en: "Supplies" },
  "despensa": { es: "Despensa", en: "Pantry" },
  "cocina": { es: "Cocina", en: "Kitchen" },
  "farmacia": { es: "Farmacia", en: "Pharmacy" },
  "bienestar": { es: "Bienestar", en: "Wellness" },
  "cafe": { es: "Café", en: "Coffee" },
  "café": { es: "Café", en: "Coffee" },
  "desayuno": { es: "Desayuno", en: "Breakfast" },
  "frutas": { es: "Frutas", en: "Fruits" },
  "sol y playa": { es: "Sol y Playa", en: "Sun & Beach" },
  "a bordo": { es: "A Bordo", en: "Onboard" },
  "bebes": { es: "Bebés", en: "Babies" },
  "bebés": { es: "Bebés", en: "Babies" },
  "ninos": { es: "Niños", en: "Kids" },
  "niños": { es: "Niños", en: "Kids" },
}

export function translateCategory(label: string, locale: Locale): string {
  if (!label) return ""
  if (locale !== "en") return label
  const clean = label.trim()
  const lower = clean.toLowerCase()
  const unaccented = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return CATEGORY_TRANSLATIONS[lower]?.en || CATEGORY_TRANSLATIONS[unaccented]?.en || label
}

export function translatePresentation(presentation: string, locale: Locale): string {
  if (locale !== "en") return presentation
  return presentation
    .replace(/\bUnidad\b/gi, "Unit")
    .replace(/\bBotellas?\b/gi, (match) => match.toLowerCase().endsWith("s") ? "Bottles" : "Bottle")
    .replace(/\bLatas?\b/gi, (match) => match.toLowerCase().endsWith("s") ? "Cans" : "Can")
    .replace(/\bBolsas?\b/gi, (match) => match.toLowerCase().endsWith("s") ? "Bags" : "Bag")
    .replace(/\bBandejas?\b/gi, (match) => match.toLowerCase().endsWith("s") ? "Trays" : "Tray")
    .replace(/\bCoco frío \(unidad\)\b/gi, "Chilled coconut (unit)")
    .replace(/\bCocos frescos\b/gi, "Fresh coconuts")
    .replace(/\bsegún tienda\b/gi, "standard size")
}

export function translatePriority(priority: StorePriority | undefined, locale: Locale): string {
  if (!priority) return ""
  if (locale === "en") {
    return priority === "esencial" ? "Essential" : "Recommended"
  }
  return priority === "esencial" ? "Esencial" : "Recomendado"
}

export function translateDestination(dest: StoreDestination | string, locale: Locale): string {
  if (!dest) return ""
  if (locale !== "en") {
    if (dest === "Casa/Villa") return "Casa / Villa"
    return dest
  }
  const clean = dest.trim()
  const lower = clean.toLowerCase()
  const unaccented = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  const map: Record<string, string> = {
    "casa/villa": "House / Villa",
    "casa / villa": "House / Villa",
    "casa": "House",
    "villa": "Villa",
    "lancha": "Speedboat",
    "yate": "Yacht",
    "catamaran": "Catamaran",
    "catamarán": "Catamaran",
    "cartagena": "Cartagena",
    "islas del rosario": "Rosario Islands",
    "baru": "Barú",
    "barú": "Barú",
    "cholon": "Cholón",
    "cholón": "Cholón",
    "tierra bomba": "Tierra Bomba",
    "tierrabomba": "Tierra Bomba",
    "centro historico": "Historic Center",
    "centro histórico": "Historic Center",
    "zona norte": "North Zone",
    "getsemani": "Getsemani",
    "getsemaní": "Getsemani",
  }

  return map[lower] || map[unaccented] || clean
}

const PRODUCT_NAME_TRANSLATIONS: Record<string, string> = {
  "Hielo en cubos": "Ice Cubes",
  "Agua con gas": "Sparkling Water",
  "Agua sin gas": "Still Natural Water",
  "Coco frío (unidad)": "Chilled Fresh Coconut",
  "Limonada natural": "Fresh Lemonade",
  "Aceite EVO con trufa negra — Línea ORO": "Extra Virgin Olive Oil with Black Truffle — Gold Line",
  "Aceite EVO con trufa blanca — Línea ORO": "Extra Virgin Olive Oil with White Truffle — Gold Line",
  "Salsa de trufa": "Gourmet Truffle Sauce",
  "Crema de trufa blanca & Parmigiano Reggiano": "White Truffle Cream & Parmigiano Reggiano",
  "Carpaccio de trufa de verano": "Summer Truffle Carpaccio",
  "Trufa de verano entera": "Whole Summer Truffle",
  "Grana Padano 12 meses": "Grana Padano 12 Months",
  "Parmigiano Reggiano 14 meses": "Parmigiano Reggiano 14 Months",
  "Parmigiano Reggiano 24 meses": "Parmigiano Reggiano 24 Months",
  "Parmigiano Reggiano 36 meses": "Parmigiano Reggiano 36 Months",
  "Parmigiano Reggiano 48 meses": "Parmigiano Reggiano 48 Months",
  "Parmigiano Reggiano 60 meses": "Parmigiano Reggiano 60 Months",
  "Mascarpone": "Artisanal Mascarpone",
  "Gorgonzola Dolce": "Gorgonzola Dolce Cheese",
  "Pecorino Sardo Maduro DOP (cuña)": "Aged Sardinian Pecorino DOP (wedge)",
  "Pecorino Smeraldo (cuña)": "Pecorino Smeraldo (wedge)",
  "Pecorino Romano (cuña)": "Pecorino Romano (wedge)",
  "Bottarga en vaso": "Bottarga in Glass Jar",
  "Bottarga rallada": "Grated Bottarga",
  "Bottarga entera": "Whole Bottarga",
  "Leche de almendras Silk": "Silk Almond Milk",
  "Pandebonos": "Fresh Traditional Pandebonos",
  "Queso costeño": "Traditional Costeño Cheese",
  "Gomitas Trululu": "Trululu Gummies",
  "Protector solar corporal Nivea Sun SPF 50": "Nivea Sun SPF 50 Body Sunscreen",
  "Repelente OFF!": "OFF! Insect Repellent",
  "Flotador inflable": "Inflatable Ocean Float",
  "Parlante Bluetooth resistente al agua": "Waterproof Bluetooth Speaker",
  "Pastillas para el mareo (Mareol / Dramamine)": "Motion Sickness Relief (Dramamine)",
  "Preservativos Today": "Today Wellness Essentials",
  "Pañales Huggies / Pampers": "Huggies / Pampers Diapers",
  "Fórmula infantil NAN / Similac": "NAN / Similac Baby Formula",
  "Aceite de oliva extra virgen": "Extra Virgin Olive Oil",
  "Carbón vegetal para asar": "Grill Charcoal",
  "Punta de anca de res": "Prime Beef Coulotte Steak",
  "Platos desechables biodegradables": "Biodegradable Disposable Plates",
  "Bolsas de basura": "Eco-Friendly Waste Bags",
}

export function translateProductName(name: string, locale: Locale): string {
  if (locale !== "en") return name
  return PRODUCT_NAME_TRANSLATIONS[name.trim()] || name
}

const STORE_DESCRIPTION_MAP: Record<string, { es: string; en: string }> = {
  "Lo más pedido a bordo. 1 bolsa por cada 4 personas.": {
    es: "Imprescindible a bordo. Recomendamos 1 bolsa por cada 4 personas.",
    en: "Essential on board. We recommend 1 bag per 4 guests.",
  },
  "Opción premium para yate.": {
    es: "Selección premium para navegación y villas de lujo.",
    en: "Premium selection for yacht charters and luxury villas.",
  },
  "Muy valorado por huéspedes extranjeros.": {
    es: "Favorito refrescante de nuestros huéspedes internacionales.",
    en: "A refreshing favorite among our international guests.",
  },
  "Mixer para whisky.": {
    es: "Acompañante ideal para whisky y coctelería clásica.",
    en: "Ideal mixer for whiskey and classic cocktails.",
  },
  "Mixer para gin tonic.": {
    es: "Mezclador clásico para gin tonic y cócteles botánicos.",
    en: "Classic mixer for gin & tonic and botanical cocktails.",
  },
  "Mixer para whisky y mojito.": {
    es: "Mezclador refrescante para cócteles caribeños y mojitos.",
    en: "Refreshing mixer for Caribbean cocktails and mojitos.",
  },
  "Sabor local.": {
    es: "Sabor y tradición local del Caribe colombiano.",
    en: "Authentic Colombian Caribbean flavor and tradition.",
  },
  "Hidratación y resaca.": {
    es: "Electrolitos e hidratación profunda bajo el sol caribeño.",
    en: "Deep hydration and electrolytes under the Caribbean sun.",
  },
  "Desayuno y mimosas.": {
    es: "Ideal para desayunos al fresco y mimosas al amanecer.",
    en: "Ideal for fresh breakfasts and morning mimosas.",
  },
  "El licor colombiano más pedido.": {
    es: "El licor tradicional insignia de Colombia.",
    en: "The iconic traditional spirit of Colombia.",
  },
  "Aperol Spritz con Prosecco Maestri Milano.": {
    es: "Ideal para preparar Aperol Spritz junto al mar.",
    en: "Perfect for refreshing Aperol Spritz cocktails by the sea.",
  },
  "Evita vidrio a bordo.": {
    es: "Presentación práctica y segura para navegación marina.",
    en: "Safe and convenient packaging for nautical cruising.",
  },
  "Whisky más vendido en la Costa.": {
    es: "Whisky escocés clásico, predilecto en el Caribe.",
    en: "Classic Scotch whisky, a Caribbean favorite.",
  },
  "Yate / cliente VIP.": {
    es: "Selección exclusiva de alta gama para ocasiones especiales.",
    en: "Exclusive top-shelf selection for special occasions.",
  },
  "VIP.": {
    es: "Reserva exclusiva para momentos memorables.",
    en: "Exclusive reserve for memorable moments.",
  },
  "Edición especial. VIP.": {
    es: "Edición especial de reserva para invitados distinguidos.",
    en: "Special reserve edition for distinguished guests.",
  },
  "Irlandés.": {
    es: "Auténtico whiskey irlandés de triple destilación.",
    en: "Authentic triple-distilled Irish whiskey.",
  },
  "Ron colombiano premium.": {
    es: "Ron añejo colombiano galardonado internacionalmente.",
    en: "Internationally acclaimed aged Colombian rum.",
  },
  "Ron blanco premium.": {
    es: "Ron blanco refinado, base ideal para mojitos y daiquirís.",
    en: "Refined white rum, ideal for mojitos and daiquiris.",
  },
  "Mojito.": {
    es: "Base perfecta para mojitos frescos preparados a bordo.",
    en: "Perfect base for fresh mojitos crafted on board.",
  },
  "Gin venezolano amazónico.": {
    es: "Ginebra artesanal destilada con botánicos amazónicos.",
    en: "Artisanal gin distilled with exotic Amazonian botanicals.",
  },
  "Espumoso accesible para brindis a bordo.": {
    es: "Espumoso fresco y vibrante, ideal para brindis al atardecer.",
    en: "Crisp and vibrant sparkling wine, perfect for sunset toasts.",
  },
  "Servir con hielo, ideal yate.": {
    es: "Servir muy frío con abundante hielo, perfecto a bordo.",
    en: "Serve well-chilled over ice, perfect for sunny cruising.",
  },
  "Negroni / Spritz.": {
    es: "Aperitivo amargo esencial para Negroni y Spritz.",
    en: "Essential Italian bitter for Negronis and Spritzes.",
  },
  "Margaritas / Cosmopolitan.": {
    es: "Licor de naranja premium para Margaritas y Cosmopolitans.",
    en: "Premium orange liqueur for Margaritas and Cosmopolitans.",
  },
  "Sin lactosa / vegana.": {
    es: "Alternativa vegetal sin lactosa.",
    en: "Plant-based, lactose-free alternative.",
  },
  "Panadería.": {
    es: "Tradicional de panadería recién horneada.",
    en: "Freshly baked Colombian artisan bakery delicacy.",
  },
  "El olvido más frecuente del huésped.": {
    es: "Protección solar dermatológica esencial para el día en altamar.",
    en: "Essential broad-spectrum sun protection for sunny days at sea.",
  },
  "Islas y atardecer.": {
    es: "Protección contra insectos para el atardecer en islas y bahías.",
    en: "Insect protection for afternoon and sunset in the islands.",
  },
  "Foto en el mar.": {
    es: "Flotador premium para disfrutar y relajarse en el agua.",
    en: "Premium water float for relaxing in the Caribbean sea.",
  },
  "Ofrecer siempre en salidas a islas.": {
    es: "Prevención recomendada contra el mareo en navegación marina.",
    en: "Recommended motion sickness prevention for maritime cruising.",
  },
  "Ítem discreto.": {
    es: "Artículo de cuidado personal con entrega confidencial.",
    en: "Personal wellness product with discreet delivery.",
  },
  "Casas con BBQ.": {
    es: "Carbón vegetal de alto rendimiento para asados en villa o catamarán.",
    en: "High-grade charcoal for barbecues at your villa or catamaran.",
  },
  "Picnic en isla.": {
    es: "Menaje biodegradable ecológico para almuerzos y picnics en islas.",
    en: "Eco-friendly biodegradable tableware for island picnics.",
  },
  "Dejar la isla limpia.": {
    es: "Suministro ecológico para la recolección responsable de residuos.",
    en: "Eco-friendly bags for responsible waste management on islands.",
  },
}

export function translateStoreDescription(desc: string | undefined, locale: Locale): string | null {
  if (!desc) return null
  const trimmed = desc.trim()

  // Clean up internal vendor / pricing notes
  if (
    trimmed.includes("Precio lista Maestri Milano") ||
    trimmed.includes("cruzar precio") ||
    trimmed.includes("Lista Tienda Costa 2026") ||
    trimmed.includes("Evaluar alquiler vs venta") ||
    trimmed.includes("validar peso")
  ) {
    return locale === "en"
      ? "Imported gourmet Italian delicacy curated for private yachts and villas."
      : "Delicadeza gourmet importada de Italia seleccionada para yates y villas privadas."
  }

  const mapped = STORE_DESCRIPTION_MAP[trimmed]
  if (mapped) {
    return mapped[locale]
  }

  return trimmed
}

export const STORE_I18N = {
  es: {
    bannerTitle: "Boutique & Cava Privada",
    bannerSubtitle:
      "Cava exclusiva, licores ultra-premium y delicias náuticas preparadas y enfriadas con al menos 8 horas de anticipación a tu embarque.",
    notice8HoursTitle: "Reserva Previa Requerida (Mínimo 8 Horas)",
    notice8HoursBody:
      "Por protocolo náutico de alta gama, todas las bebidas y alimentos se reciben, enfrían a temperatura óptima y alistan con antelación antes de subir a bordo de tu yate o villa.",
    searchPlaceholder: "Buscar champagne, vinos, snacks, hielo...",
    destinationFilter: "Destino:",
    all: "Todos",
    allDestinations: "Todos los destinos",
    productsCount: (count: number) => `${count} ${count === 1 ? "producto disponible" : "productos disponibles"}`,
    unitPrice: "Precio unitario",
    viewSelect: "Ver & Seleccionar",
    select: "Seleccionar",
    addToCartQuick: (name: string) => `Añadir 1 ${name} a la reserva`,
    quickAddTooltip: "Añadir rápido a la reserva",
    addToCartSuccess: "Añadido",
    noProductsFound: "No se encontraron productos con los filtros seleccionados.",
    clearFilters: "Restablecer filtros",
    loadMore: "Cargar más productos",
    floatingCart: "Tu Carrito",
    loadErrorTitle: "Catálogo temporalmente no disponible",
    loadErrorBody: "Estamos sincronizando la cava de la tienda. Puedes comunicarte directamente con nuestro Concierge para tu pedido.",
    contactConcierge: "Contactar a Concierge",
    // Modal
    modalClose: "Cerrar modal de producto",
    modalQuickOptions: "Opciones de compra rápida:",
    modalQuantity: "Cantidad a Reservar:",
    modalUnits: "Unidades:",
    modalPresets: [
      { qty: 6, label: "6 Unidades", detail: "Media docena" },
      { qty: 12, label: "12 Unidades", detail: "1 docena" },
      { qty: 24, label: "24 Unidades", detail: "2 docenas" },
    ],
    modalSubtotal: "Subtotal a reservar:",
    modalAddButton: "Agregar a mi Reserva",
    modalAddedSuccess: "¡Agregado a tu Reserva!",
    modalIdealFor: "Ideal para:",
    modalNotice: "Servicio a bordo o villa. Mínimo 8 horas de anticipación para alistamiento en frío.",
    // Cart Drawer
    cartTitle: "Tu Reserva",
    cartStoreName: "Boutique & Cava Millan",
    cartEmpty: "Tu carrito está vacío",
    cartEmptySubtitle: "Explora nuestra cava de licores, vinos, cervezas y comida gourmet para armar tu experiencia a bordo.",
    cartExplore: "Ver Catálogo",
    cartItemsCount: (count: number) => `${count} ${count === 1 ? "artículo" : "artículos"} seleccionados`,
    cartNotice8HoursTitle: "Regla de Anticipación: Mínimo 8 Horas",
    cartNotice8HoursBody: "Para garantizar el alistamiento, frío idóneo y entrega en muelle o villa, tu reserva debe programarse con al menos 8 horas de antelación.",
    cartSubtotalProducts: "Subtotal productos:",
    cartNauticalService: "Alistamiento & Servicio náutico:",
    cartIncluded: "Incluido",
    cartTotalToConfirm: "Total a Confirmar:",
    cartDeliverySectionTitle: "Datos de Entrega & Reserva",
    cartFullName: "Nombre Completo *",
    cartFullNamePlaceholder: "Ej. Sofia Vergara / John Smith",
    cartPhone: "Teléfono / WhatsApp *",
    cartPhonePlaceholder: "+57 300 000 0000",
    cartEmail: "Correo Electrónico *",
    cartEmailPlaceholder: "nombre@ejemplo.com",
    cartDeliveryDate: "Fecha de Entrega *",
    cartSameDayWarningTitle: "Aviso de Entrega Rápida:",
    cartSameDayWarningBody: "Has seleccionado entrega para el día de hoy. Nuestro concierge coordinará contigo de inmediato por WhatsApp los tiempos de alistamiento y logística en muelle o villa.",
    cartDestination: "Lugar / Yate / Villa de Entrega *",
    cartDestinationPlaceholder: "Ej. Yate Cohiba en Muelle Los Pegasos, o Casa Hilda",
    cartNotes: "Instrucciones Especiales / Hielo / Copas",
    cartNotesPlaceholder: "Ej. Llevar abundante hielo, copas de champagne y rodajas de lima...",
    cartPaymentMethods: "Formas de pago disponibles",
    cartSsl: "Cifrado 256-bit SSL",
    cartCardsBadge: "Tarjetas de Crédito / Débito",
    cartSecurityNote: "Tus pagos son procesados de forma instantánea y 100% segura con altos estándares de protección bancaria y cifrado de datos.",
    cartPayNow: "Pagar ahora",
    cartProcessing: "Procesando pago seguro...",
    cartRemoveItem: (name: string) => `Eliminar ${name}`,
    cartErrors: {
      fullName: "Ingresa tu nombre completo.",
      phone: "Ingresa un teléfono o WhatsApp de contacto.",
      email: "Ingresa un correo electrónico válido.",
      deliveryDate: "Selecciona la fecha de entrega.",
      destination: "Indica el yate, muelle o villa de entrega.",
    },
  },
  en: {
    bannerTitle: "Private Boutique & Cellar",
    bannerSubtitle:
      "Exclusive cellar, ultra-premium spirits, and nautical delicacies chilled and prepared at least 8 hours in advance for your voyage.",
    notice8HoursTitle: "Advance Reservation Required (Minimum 8 Hours)",
    notice8HoursBody:
      "In line with luxury nautical standards, all beverages and provisions are procured, chilled to optimal temperature, and provisioned prior to boarding your yacht or villa.",
    searchPlaceholder: "Search champagne, wines, snacks, ice...",
    destinationFilter: "Destination:",
    all: "All",
    allDestinations: "All destinations",
    productsCount: (count: number) => `${count} ${count === 1 ? "product available" : "products available"}`,
    unitPrice: "Unit price",
    viewSelect: "View & Select",
    select: "Select",
    addToCartQuick: (name: string) => `Add 1 ${name} to cart`,
    quickAddTooltip: "Quick add to order",
    addToCartSuccess: "Added",
    noProductsFound: "No products found matching the selected filters.",
    clearFilters: "Reset filters",
    loadMore: "Load more products",
    floatingCart: "Your Cart",
    loadErrorTitle: "Catalog temporarily unavailable",
    loadErrorBody: "We are syncing the boutique cellar. Please contact our Concierge team directly to place your order.",
    contactConcierge: "Contact Concierge",
    // Modal
    modalClose: "Close product modal",
    modalQuickOptions: "Quick purchase options:",
    modalQuantity: "Quantity to Reserve:",
    modalUnits: "Units:",
    modalPresets: [
      { qty: 6, label: "6 Units", detail: "Half dozen" },
      { qty: 12, label: "12 Units", detail: "1 dozen" },
      { qty: 24, label: "24 Units", detail: "2 dozens" },
    ],
    modalSubtotal: "Subtotal to reserve:",
    modalAddButton: "Add to Reservation",
    modalAddedSuccess: "Added to your Reservation!",
    modalIdealFor: "Ideal for:",
    modalNotice: "Onboard or villa delivery. Minimum 8 hours advance notice required for chilled staging.",
    // Cart Drawer
    cartTitle: "Your Reservation",
    cartStoreName: "Millan Boutique & Cellar",
    cartEmpty: "Your cart is empty",
    cartEmptySubtitle: "Explore our cellar of spirits, fine wines, beers, and gourmet selections to complement your onboard experience.",
    cartExplore: "View Catalog",
    cartItemsCount: (count: number) => `${count} ${count === 1 ? "item" : "items"} selected`,
    cartNotice8HoursTitle: "Advance Notice Policy: Minimum 8 Hours",
    cartNotice8HoursBody: "To ensure proper chilling, staging, and prompt delivery at your pier or villa, orders must be scheduled at least 8 hours in advance.",
    cartSubtotalProducts: "Products subtotal:",
    cartNauticalService: "Staging & Nautical Service:",
    cartIncluded: "Included",
    cartTotalToConfirm: "Total to Confirm:",
    cartDeliverySectionTitle: "Delivery & Reservation Details",
    cartFullName: "Full Name *",
    cartFullNamePlaceholder: "E.g. John Smith / Sofia Vergara",
    cartPhone: "Phone / WhatsApp *",
    cartPhonePlaceholder: "+1 (555) 000-0000",
    cartEmail: "Email Address *",
    cartEmailPlaceholder: "name@example.com",
    cartDeliveryDate: "Delivery Date *",
    cartSameDayWarningTitle: "Same-Day Delivery Notice:",
    cartSameDayWarningBody: "You have selected delivery for today. Our concierge will coordinate with you immediately via WhatsApp to verify staging times and pier or villa logistics.",
    cartDestination: "Delivery Location / Yacht / Villa *",
    cartDestinationPlaceholder: "E.g. Yacht Cohiba at Los Pegasos Pier, or Casa Hilda",
    cartNotes: "Special Instructions / Ice / Glassware",
    cartNotesPlaceholder: "E.g. Extra ice, champagne flutes, sliced limes...",
    cartPaymentMethods: "Available payment methods",
    cartSsl: "256-bit SSL Encryption",
    cartCardsBadge: "Credit / Debit Cards",
    cartSecurityNote: "Your transactions are processed instantly and 100% securely with premier banking protection and data encryption.",
    cartPayNow: "Pay now",
    cartProcessing: "Processing secure payment...",
    cartRemoveItem: (name: string) => `Remove ${name}`,
    cartErrors: {
      fullName: "Please enter your full name.",
      phone: "Please enter a contact phone or WhatsApp number.",
      email: "Please enter a valid email address.",
      deliveryDate: "Please select a delivery date.",
      destination: "Please indicate the yacht, pier, or villa for delivery.",
    },
  },
}
