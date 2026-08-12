import { defineField, defineType } from 'sanity'
import { MessageSquareHeart } from 'lucide-react'

export const review = defineType({
  name: 'review',
  title: 'Reseñas (Reviews)',
  type: 'document',
  icon: MessageSquareHeart,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio (Cita)',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Calificación (1-5)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5).required(),
    }),
    defineField({
      name: 'context',
      title: 'Contexto / Opcional',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'string',
    }),
    defineField({
      name: 'isGoogleReview',
      title: '¿Es un Google Review?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Imágenes Adjuntas',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'status',
      title: 'Estado de Aprobación',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Aprobado', value: 'approved' },
          { title: 'Rechazado', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      const stars = '⭐️'.repeat(rating || 0)
      return {
        title: `${title} - ${stars}`,
        subtitle: subtitle === 'approved' ? '✅ Aprobado' : subtitle === 'rejected' ? '❌ Rechazado' : '⏳ Pendiente',
      }
    }
  }
})
