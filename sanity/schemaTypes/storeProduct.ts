import { defineType, defineField } from 'sanity'
import { Wine } from 'lucide-react'
import {
  STORE_DESTINATIONS,
  STORE_PRIORITIES,
  STORE_PRODUCT_STATUSES,
} from '../../lib/store-constants'

/**
 * Producto de la tienda. Solo contiene datos PÚBLICOS: el dataset de Sanity es
 * público, por lo que costos, proveedor y márgenes nunca se guardan aquí.
 */
export const storeProduct = defineType({
  name: 'storeProduct',
  title: 'Tienda: Producto',
  type: 'document',
  icon: Wine,
  fields: [
    defineField({
      name: 'externalId',
      title: 'ID externo',
      description: 'Clave estable del Excel (MILLAN-0001). No modificar.',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'presentation',
      title: 'Presentación',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio (COP)',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'storeCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinations',
      title: 'Destinos',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: [...STORE_DESTINATIONS] },
    }),
    defineField({
      name: 'priority',
      title: 'Prioridad',
      type: 'string',
      options: { list: STORE_PRIORITIES.map((p) => ({ ...p })) },
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Nota',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen',
      description: 'Opcional. Las imágenes no vienen del Excel; el script nunca las modifica.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      description: 'Solo los productos "Activo" se muestran al cliente.',
      type: 'string',
      options: { list: STORE_PRODUCT_STATUSES.map((s) => ({ ...s })), layout: 'radio' },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      presentation: 'presentation',
      status: 'status',
      media: 'mainImage',
    },
    prepare: ({ title, presentation, status, media }) => ({
      title,
      subtitle: `${presentation ?? ''} · ${status === 'active' ? 'Activo' : 'Borrador'}`,
      media,
    }),
  },
})
