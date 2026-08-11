import { Briefcase, LayoutGrid, PartyPopper } from 'lucide-react'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Configuración Global')
        .id('globalConfig')
        .child(
          S.document()
            .schemaType('globalConfig')
            .documentId('globalConfig')
        ),
      S.listItem()
        .title('Inicio (Home Page)')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      // Service Pages (Dynamic)
      S.listItem()
        .title('Páginas de Servicios')
        .icon(Briefcase)
        .child(
          S.documentTypeList('servicePage')
            .title('Páginas de Servicios')
        ),
        
      // Listing Pages (Villas, Islands, etc.)
      S.listItem()
        .title('Catálogos (Villas, Islas)')
        .icon(LayoutGrid)
        .child(
          S.documentTypeList('listingPage')
            .title('Catálogos (Villas, Islas)')
        ),

        // Event Pages (Dynamic)
      S.listItem()
        .title('Páginas de Eventos')
        .icon(PartyPopper)
        .child(
          S.documentTypeList('eventPage')
            .title('Eventos (Grupos, Bodas)')
        ),
      
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['globalConfig', 'homePage', 'servicePage', 'listingPage', 'eventPage'].includes(listItem.getId() as string)
      ),
    ])
