import { defineField, defineType } from 'sanity'
import { ShoppingCart } from 'lucide-react'

export const storeOrder = defineType({
  name: 'storeOrder',
  title: 'Tienda: Pedido',
  type: 'document',
  icon: ShoppingCart,
  fields: [
    defineField({
      name: 'orderId',
      title: 'Código de Pedido',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado del Pedido',
      type: 'string',
      options: {
        list: [
          { title: 'Solicitud de Pago (Pendiente)', value: 'pending_payment' },
          { title: 'Pagado y Aprobado', value: 'paid' },
          { title: 'Confirmado por Concierge', value: 'confirmed' },
          { title: 'Pago Rechazado por Banco', value: 'declined' },
          { title: 'Cancelado', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending_payment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total a Pagar (COP)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Método de Pago',
      type: 'string',
      description: 'Tarjeta de Crédito / Débito, PSE, Nequi, etc.',
    }),
    defineField({
      name: 'transactionId',
      title: 'ID de Transacción Pasarela',
      type: 'string',
      description: 'Identificador único de la transacción en la pasarela de pagos.',
    }),
    defineField({
      name: 'customerName',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Correo Electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Lugar / Yate / Villa de Entrega',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliveryDate',
      title: 'Fecha de Entrega Programada',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Instrucciones Especiales / Hielo / Copas',
      type: 'text',
      description: 'Notas y requerimientos especiales indicados por el cliente.',
    }),
    defineField({
      name: 'items',
      title: 'Productos del Pedido',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Producto',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quantity',
              title: 'Cantidad',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'priceCOP',
              title: 'Precio Unitario (COP)',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'presentation',
              title: 'Presentación',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              quantity: 'quantity',
              priceCOP: 'priceCOP',
              presentation: 'presentation',
            },
            prepare: ({ name, quantity, priceCOP, presentation }) => {
              const formattedPrice = priceCOP
                ? new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0,
                  }).format(priceCOP * (quantity || 1))
                : ''
              return {
                title: `${quantity || 1}x ${name || 'Producto'}`,
                subtitle: `${presentation ? presentation + ' · ' : ''}${formattedPrice}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'conciergeNotes',
      title: 'Notas Internas del Concierge',
      type: 'text',
      description: 'Anotaciones privadas del equipo de Millan Experiences sobre muelle, logística o despacho.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Fecha y Hora de Creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última Actualización',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerName',
      status: 'status',
      totalAmount: 'totalAmount',
      createdAt: 'createdAt',
    },
    prepare: ({ orderId, customerName, status, totalAmount, createdAt }) => {
      const statusLabels: Record<string, string> = {
        pending_payment: 'Solicitud Pendiente',
        paid: 'Pagado',
        confirmed: 'Confirmado',
        declined: 'Rechazado',
        cancelled: 'Cancelado',
      }
      const statusLabel = (status && statusLabels[status]) || status || 'Nuevo'
      const formattedTotal = totalAmount
        ? new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0,
          }).format(totalAmount)
        : '$0'

      const dateStr = createdAt ? new Date(createdAt).toLocaleDateString('es-CO') : ''

      return {
        title: `${orderId || 'Pedido'} · ${customerName || 'Cliente'}`,
        subtitle: `${statusLabel} · ${formattedTotal} · ${dateStr}`,
      }
    },
  },
})
