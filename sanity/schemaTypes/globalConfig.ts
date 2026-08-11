import { defineType, defineField } from 'sanity'
import { Settings } from 'lucide-react'

export const globalConfig = defineType({
  name: 'globalConfig',
  title: 'Configuración Global',
  type: 'document',
  // @ts-ignore - Setting icon is valid in Sanity Studio v3 but types might complain
  icon: Settings,
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Sube una imagen cuadrada (ej. 32x32 o 64x64) para el ícono de la pestaña del navegador. Formato recomendado: .png o .ico',
      options: {
        accept: 'image/png, image/x-icon, image/jpeg, image/svg+xml'
      }
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      type: 'image',
      description: 'Sube el logo que aparecerá en el menú principal (Header).',
      options: {
        accept: 'image/png, image/jpeg, image/svg+xml'
      }
    }),
    defineField({
      name: 'email',
      title: 'Correo de Notificaciones',
      type: 'string',
      description: 'La dirección de correo electrónico que recibirá notificaciones y se mostrará en el pie de página.',
      validation: (rule) => rule.email()
    }),
    defineField({
      name: 'phone',
      title: 'Número de Teléfono',
      type: 'string',
      description: 'Se mostrará en el pie de página (ej. +57 310 710 2651)'
    }),
    defineField({
      name: 'whatsapp',
      title: 'Enlace de WhatsApp',
      type: 'url',
      description: 'La URL completa de WhatsApp, ej. https://wa.me/573107102651',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Menú de Navegación Principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'labelEn', type: 'string', title: 'Nombre (Inglés)' }),
            defineField({ name: 'labelEs', type: 'string', title: 'Nombre (Español)' }),
            defineField({ name: 'href', type: 'string', title: 'Enlace (URL)' }),
            defineField({ name: 'descEn', type: 'text', title: 'Descripción Mega Menú (Inglés)' }),
            defineField({ name: 'descEs', type: 'text', title: 'Descripción Mega Menú (Español)' }),
            defineField({ name: 'image', type: 'image', title: 'Imagen Mega Menú' }),
            defineField({
              name: 'children',
              title: 'Sub-enlaces',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'labelEn', type: 'string', title: 'Nombre (Inglés)' }),
                    defineField({ name: 'labelEs', type: 'string', title: 'Nombre (Español)' }),
                    defineField({ name: 'href', type: 'string', title: 'Enlace' }),
                  ]
                }
              ]
            }),
            defineField({
              name: 'cta',
              title: 'Botón CTA Mega Menú',
              type: 'object',
              fields: [
                defineField({ name: 'labelEn', type: 'string', title: 'Texto Botón (Inglés)' }),
                defineField({ name: 'labelEs', type: 'string', title: 'Texto Botón (Español)' }),
                defineField({ name: 'href', type: 'string', title: 'Enlace Botón' }),
              ]
            })
          ],
          preview: {
            select: { title: 'labelEn', subtitle: 'href' }
          }
        }
      ]
    }),
  ],
})
