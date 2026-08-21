import { defineField, defineType } from 'sanity'
import { UserCheck } from 'lucide-react'

export const clientLead = defineType({
  name: 'clientLead',
  title: 'Clientes y Solicitudes (Leads)',
  type: 'document',
  icon: UserCheck,
  fields: [
    defineField({
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Servicios de Interés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Fecha Inicio de Viaje',
      type: 'string',
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha Fin de Viaje',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Mensaje / Visión del Viaje',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Foto / Imagen de Referencia (Editable)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Imagen o foto de referencia del cliente o de su itinerario.',
    }),
    defineField({
      name: 'status',
      title: 'Estado del Cliente',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Nuevo', value: 'new' },
          { title: '🟡 En Contacto / Cotizando', value: 'in_progress' },
          { title: '✅ Confirmado / Cliente', value: 'confirmed' },
          { title: '⚪️ Archivado', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notas Internas del Concierge',
      type: 'text',
      description: 'Notas privadas para el equipo sobre requerimientos o estado de la cotización.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Fecha de Registro',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      status: 'status',
      services: 'services',
      media: 'image',
    },
    prepare({ firstName, lastName, email, status, services, media }) {
      const fullName = `${firstName || ''} ${lastName || ''}`.trim() || email || 'Cliente sin nombre'
      const statusIcon = status === 'new' ? '🟢' : status === 'in_progress' ? '🟡' : status === 'confirmed' ? '✅' : '⚪️'
      const serviceList = Array.isArray(services) && services.length > 0 ? ` [${services.join(', ')}]` : ''
      return {
        title: `${statusIcon} ${fullName}`,
        subtitle: `${email || ''}${serviceList}`,
        media,
      }
    }
  }
})
