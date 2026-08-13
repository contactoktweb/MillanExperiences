import { createProductSchema } from './productFactory'
import { Home, Ship, Plane, UtensilsCrossed, Key, Compass, GlassWater, Users, PartyPopper, Heart } from 'lucide-react'

// VILLAS E ISLAS
export const luxuryVillasSchema = createProductSchema('luxury-villas', 'Villas Privadas', Home)
export const privateIslandsSchema = createProductSchema('private-islands', 'Islas Privadas', Compass)

// YATES Y LANCHAS
export const yachtsCatamaransSchema = createProductSchema('yachts-catamarans', 'Yates y Catamaranes', Ship)
export const speedboatsSchema = createProductSchema('speedboats', 'Lanchas', Ship)

// SERVICIOS
export const conciergeSchema = createProductSchema('concierge', 'Concierge', Key)
export const privateToursSchema = createProductSchema('private-tours', 'Tours Privados', Compass)
export const privateChefSchema = createProductSchema('private-chef', 'Chefs Privados', UtensilsCrossed)
export const privateAviationSchema = createProductSchema('private-aviation', 'Aviación Privada', Plane)

// GRUPOS Y EVENTOS
export const bachelorPartiesSchema = createProductSchema('bachelor-bachelorette-parties', 'Despedidas de Soltero(a)', GlassWater)
export const corporateGroupsSchema = createProductSchema('corporate-groups', 'Grupos Corporativos', Users)
export const celebrationsSchema = createProductSchema('birthdays-and-celebrations', 'Celebraciones', PartyPopper)
export const weddingsSchema = createProductSchema('weddings', 'Bodas', Heart)

export const individualProductSchemas = [
  luxuryVillasSchema,
  privateIslandsSchema,
  yachtsCatamaransSchema,
  speedboatsSchema,
  conciergeSchema,
  privateToursSchema,
  privateChefSchema,
  privateAviationSchema,
  bachelorPartiesSchema,
  corporateGroupsSchema,
  celebrationsSchema,
  weddingsSchema
]
