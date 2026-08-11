import { type SchemaTypeDefinition } from 'sanity'
import { globalConfig } from './globalConfig'
import { homePage } from './homePage'
import { servicePage } from './servicePage'
import { listingPage } from './listingPage'
import { eventPage } from './eventPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalConfig, homePage, servicePage, listingPage, eventPage],
}
