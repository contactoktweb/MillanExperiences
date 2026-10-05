import { defineType, defineField } from 'sanity'
import { Layers } from 'lucide-react'

export const storeCategory = defineType({
  name: 'storeCategory',
  title: 'Tienda: Categoría',
  type: 'document',
  icon: Layers,
  fields: [
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
      name: 'order',
      title: 'Orden',
      description: 'Posición en los filtros de la tienda (menor aparece primero).',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Categoría padre',
      description: 'Opcional. Se usa para agrupar subcategorías (ej. Cava premium).',
      type: 'reference',
      to: [{ type: 'storeCategory' }],
    }),
  ],
  orderings: [
    { title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', parent: 'parent.title' },
    prepare: ({ title, parent }) => ({
      title,
      subtitle: parent ? `Subcategoría de ${parent}` : 'Categoría principal',
    }),
  },
})
