import {
  Key,
  Compass,
  UtensilsCrossed,
  Plane,
  Wine,
  Users,
  PartyPopper,
  Heart,
  Settings,
  Home,
  LayoutGrid,
  Building,
  Palmtree,
  Sailboat,
  Ship,
  Star,
  MessageSquareHeart,
  Edit,
  UserCheck,
} from 'lucide-react'
import type { StructureResolver } from 'sanity/structure'

const createPropertyListItem = (
  S: any,
  schemaType: string,
  title: string,
  icon: any
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList(schemaType)
        .title(title)
        .child((documentId: string) =>
          S.list()
            .title(`Gestión: ${title}`)
            .items([
              S.listItem()
                .title('Editar Información')
                .icon(Edit)
                .child(
                  S.document()
                    .title('Editar Propiedad')
                    .schemaType(schemaType)
                    .documentId(documentId)
                ),
              S.listItem()
                .title('Reseñas de esta Propiedad')
                .icon(Star)
                .child(
                  S.documentList()
                    .title('Reseñas de Clientes')
                    .filter(
                      '_type == "review" && (propertySlug == *[_id == $id][0].slug.current || propertyName == *[_id == $id][0].title)'
                    )
                    .params({ id: documentId })
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        )
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Panel de Administración')
    .items([
      // 1. CONFIGURACIÓN GLOBAL, HOME & CLIENTES
      S.listItem()
        .title('Configuración Global')
        .icon(Settings)
        .id('globalConfig')
        .child(
          S.document()
            .title('Configuración Global')
            .schemaType('globalConfig')
            .documentId('globalConfig')
        ),

      S.listItem()
        .title('Página de Inicio (Home)')
        .icon(Home)
        .id('homePage')
        .child(
          S.document()
            .title('Página de Inicio')
            .schemaType('homePage')
            .documentId('homePage')
        ),

      S.listItem()
        .title('Solicitudes de Clientes (Leads)')
        .icon(UserCheck)
        .child(
          S.list()
            .title('Solicitudes de Clientes')
            .items([
              S.listItem()
                .title('Todas las Solicitudes')
                .icon(Users)
                .child(
                  S.documentList()
                    .title('Todas las Solicitudes')
                    .filter('_type == "clientLead"')
                    .defaultOrdering([{ field: 'createdAt', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('🟢 Nuevas Solicitudes')
                .child(
                  S.documentList()
                    .title('Nuevas Solicitudes')
                    .filter('_type == "clientLead" && status == "new"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('🟡 En Proceso / Cotizando')
                .child(
                  S.documentList()
                    .title('En Proceso de Cotización')
                    .filter('_type == "clientLead" && status == "in_progress"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('✅ Clientes Confirmados')
                .child(
                  S.documentList()
                    .title('Clientes Confirmados')
                    .filter('_type == "clientLead" && status == "confirmed"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // 2. EDICIÓN DIRECTA DE SERVICIOS (SINGLETONS)
      S.listItem()
        .title('Concierge')
        .icon(Key)
        .id('service-concierge')
        .child(
          S.document()
            .title('Página: Concierge')
            .schemaType('servicePage')
            .documentId('0k1Uv8Ew8Ls47g8R1rNiWo')
        ),

      S.listItem()
        .title('Tours Privados')
        .icon(Compass)
        .id('service-private-tours')
        .child(
          S.document()
            .title('Página: Tours Privados')
            .schemaType('servicePage')
            .documentId('X3hCWippD6zjeklfwQOl8i')
        ),

      S.listItem()
        .title('Chefs Privados')
        .icon(UtensilsCrossed)
        .id('service-private-chef')
        .child(
          S.document()
            .title('Página: Chefs Privados')
            .schemaType('servicePage')
            .documentId('0k1Uv8Ew8Ls47g8R1rNjUZ')
        ),

      S.listItem()
        .title('Aviación Privada')
        .icon(Plane)
        .id('service-private-aviation')
        .child(
          S.document()
            .title('Página: Aviación Privada')
            .schemaType('servicePage')
            .documentId('X3hCWippD6zjeklfwQOkjA')
        ),

      S.divider(),

      // 3. EDICIÓN DIRECTA DE EVENTOS (SINGLETONS)
      S.listItem()
        .title('Despedidas de Soltero(a)')
        .icon(Wine)
        .id('event-bachelor')
        .child(
          S.document()
            .title('Página: Despedidas de Soltero(a)')
            .schemaType('eventPage')
            .documentId('QLw8ZVvhSqyPOxrfRaE6Pn')
        ),

      S.listItem()
        .title('Grupos Corporativos')
        .icon(Users)
        .id('event-corporate')
        .child(
          S.document()
            .title('Página: Grupos Corporativos')
            .schemaType('eventPage')
            .documentId('QLw8ZVvhSqyPOxrfRaE95z')
        ),

      S.listItem()
        .title('Celebraciones')
        .icon(PartyPopper)
        .id('event-celebrations')
        .child(
          S.document()
            .title('Página: Celebraciones')
            .schemaType('eventPage')
            .documentId('QLw8ZVvhSqyPOxrfRaE9O3')
        ),

      S.listItem()
        .title('Bodas')
        .icon(Heart)
        .id('event-weddings')
        .child(
          S.document()
            .title('Página: Bodas')
            .schemaType('eventPage')
            .documentId('QLw8ZVvhSqyPOxrfRaE1oN')
        ),

      S.divider(),

      // 4. CATÁLOGOS PRINCIPALES (PORTADAS Y FAQS DE CATEGORÍA)
      S.listItem()
        .title('Portadas de Catálogos (FAQs & Hero)')
        .icon(LayoutGrid)
        .child(
          S.list()
            .title('Portadas de Catálogo')
            .items([
              S.listItem()
                .title('Catálogo: Villas de Lujo')
                .icon(Building)
                .child(
                  S.document()
                    .title('Catálogo: Villas de Lujo')
                    .schemaType('listingPage')
                    .documentId('QLw8ZVvhSqyPOxrfRZtYvP')
                ),
              S.listItem()
                .title('Catálogo: Islas Privadas')
                .icon(Palmtree)
                .child(
                  S.document()
                    .title('Catálogo: Islas Privadas')
                    .schemaType('listingPage')
                    .documentId('QLw8ZVvhSqyPOxrfRZtZOJ')
                ),
              S.listItem()
                .title('Catálogo: Yates y Catamaranes')
                .icon(Sailboat)
                .child(
                  S.document()
                    .title('Catálogo: Yates y Catamaranes')
                    .schemaType('listingPage')
                    .documentId('0k1Uv8Ew8Ls47g8R1rUA9Q')
                ),
              S.listItem()
                .title('Catálogo: Lanchas Deportivas')
                .icon(Ship)
                .child(
                  S.document()
                    .title('Catálogo: Lanchas Deportivas')
                    .schemaType('listingPage')
                    .documentId('QLw8ZVvhSqyPOxrfRZvqaN')
                ),
            ])
        ),

      S.divider(),

      // 5. INVENTARIO / PROPIEDADES INDIVIDUALES (CON EDICIÓN Y GESTIÓN DE RESEÑAS)
      createPropertyListItem(S, 'luxury-villas', 'Villas de Lujo', Building),
      createPropertyListItem(S, 'private-islands', 'Islas Privadas', Palmtree),
      createPropertyListItem(S, 'yachts-catamarans', 'Yates y Catamaranes', Sailboat),
      createPropertyListItem(S, 'speedboats', 'Lanchas Deportivas', Ship),

      S.divider(),

      // 6. GESTIÓN CENTRALIZADA DE RESEÑAS
      S.listItem()
        .title('Gestión de Reseñas')
        .icon(Star)
        .child(
          S.list()
            .title('Reseñas de Clientes')
            .items([
              S.listItem()
                .title('Todas las Reseñas (General)')
                .icon(MessageSquareHeart)
                .child(
                  S.documentList()
                    .title('Todas las Reseñas')
                    .filter('_type == "review"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('Reseñas por Villa de Lujo')
                .icon(Building)
                .child(
                  S.documentTypeList('luxury-villas')
                    .title('Seleccione una Villa')
                    .child((villaId: string) =>
                      S.documentList()
                        .title('Reseñas de la Villa')
                        .filter(
                          '_type == "review" && (propertySlug == *[_id == $id][0].slug.current || propertyName == *[_id == $id][0].title)'
                        )
                        .params({ id: villaId })
                        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    )
                ),
              S.listItem()
                .title('Reseñas por Isla Privada')
                .icon(Palmtree)
                .child(
                  S.documentTypeList('private-islands')
                    .title('Seleccione una Isla')
                    .child((islandId: string) =>
                      S.documentList()
                        .title('Reseñas de la Isla')
                        .filter(
                          '_type == "review" && (propertySlug == *[_id == $id][0].slug.current || propertyName == *[_id == $id][0].title)'
                        )
                        .params({ id: islandId })
                        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    )
                ),
              S.listItem()
                .title('Reseñas por Yate o Catamarán')
                .icon(Sailboat)
                .child(
                  S.documentTypeList('yachts-catamarans')
                    .title('Seleccione un Yate')
                    .child((yachtId: string) =>
                      S.documentList()
                        .title('Reseñas del Yate')
                        .filter(
                          '_type == "review" && (propertySlug == *[_id == $id][0].slug.current || propertyName == *[_id == $id][0].title)'
                        )
                        .params({ id: yachtId })
                        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    )
                ),
              S.listItem()
                .title('Reseñas por Lancha Deportiva')
                .icon(Ship)
                .child(
                  S.documentTypeList('speedboats')
                    .title('Seleccione una Lancha')
                    .child((boatId: string) =>
                      S.documentList()
                        .title('Reseñas de la Lancha')
                        .filter(
                          '_type == "review" && (propertySlug == *[_id == $id][0].slug.current || propertyName == *[_id == $id][0].title)'
                        )
                        .params({ id: boatId })
                        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    )
                ),
            ])
        ),
    ])
