import { Resend } from 'resend'

interface LeadEmailData {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  services?: string[]
  startDate?: string
  endDate?: string
  message?: string
  leadId?: string
}

// In-memory set to prevent duplicate email dispatches for the same order within the runtime
const dispatchedOrderEmails = new Set<string>()

export async function sendLeadNotificationEmail(
  data: LeadEmailData,
  recipientEmail: string,
  logoUrl?: string
) {
  const { firstName, lastName, email, phone, services, startDate, endDate, message } = data
  const fullName = `${firstName} ${lastName || ''}`.trim()

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM || 'Millan Experiences <onboarding@resend.dev>'

  const displayLogo =
    logoUrl ||
    'https://cdn.sanity.io/images/a94tk6u3/production/f7465d95ee177c82054798409f858e0905482698-1649x720.png'

  const servicesHtml =
    services && services.length > 0
      ? services
          .map(
            (s) =>
              `<span style="display:inline-block;background:#18323c;color:#c8b487;padding:6px 12px;margin:3px;border-radius:3px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border:1px solid rgba(200,180,135,0.3);">${s}</span>`
          )
          .join('')
      : '<span style="color:#888;">No especificado</span>'

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud de Viaje - Millan Experiences</title>
</head>
<body style="margin:0;padding:0;background-color:#0b181d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f4efe4;-webkit-font-smoothing:antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b181d;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#13272f;border:1px solid rgba(200,180,135,0.35);border-radius:4px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.6);">
          
          <!-- Header con Logo de Sanity -->
          <tr>
            <td align="center" style="padding:40px 30px 30px;background-color:#0e1e24;border-bottom:1px solid rgba(200,180,135,0.25);">
              <img src="${displayLogo}" alt="Millan Experiences" width="180" style="display:block;max-width:180px;height:auto;margin:0 auto 15px;object-fit:contain;" />
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:#93bdbd;text-transform:uppercase;font-weight:600;">Nueva Solicitud de Experiencia</p>
            </td>
          </tr>
          
          <!-- Cuerpo Principal -->
          <tr>
            <td style="padding:40px 35px;">
              <p style="margin:0 0 25px;font-size:16px;line-height:1.6;color:#f4efe4;">
                Has recibido una nueva solicitud de viaje desde el formulario web de <strong style="color:#c8b487;">Millan Experiences</strong>:
              </p>

              <!-- Tarjeta de Detalles del Cliente -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#18323c;border:1px solid rgba(244,239,228,0.12);border-radius:4px;margin-bottom:25px;">
                <tr>
                  <td style="padding:22px 25px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="35%" style="color:#93bdbd;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Cliente:</td>
                        <td style="color:#f4efe4;font-size:15px;font-weight:bold;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Correo:</td>
                        <td style="color:#c8b487;font-size:15px;">
                          <a href="mailto:${email}" style="color:#c8b487;text-decoration:none;font-weight:500;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Teléfono:</td>
                        <td style="color:#f4efe4;font-size:15px;">
                          ${
                            phone
                              ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#93bdbd;text-decoration:none;font-weight:500;">${phone} (Abrir WhatsApp)</a>`
                              : '<span style="color:#888;">No especificado</span>'
                          }
                        </td>
                      </tr>
                      ${
                        startDate || endDate
                          ? `
                      <tr>
                        <td style="color:#93bdbd;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Fechas:</td>
                        <td style="color:#f4efe4;font-size:14px;">${startDate || 'Flexible'} &rarr; ${endDate || 'Flexible'}</td>
                      </tr>
                      `
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Servicios Solicitados -->
              <div style="margin-bottom:25px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">Servicios de Interés:</p>
                <div>${servicesHtml}</div>
              </div>

              <!-- Mensaje del Cliente -->
              ${
                message
                  ? `
              <div style="margin-bottom:30px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">Mensaje / Visión del Viaje:</p>
                <div style="background-color:#18323c;padding:18px;border-left:3px solid #c8b487;color:#f4efe4;font-size:14px;line-height:1.6;font-style:italic;border-radius:0 3px 3px 0;">
                  “${message}”
                </div>
              </div>
              `
                  : ''
              }

              <!-- Botón CTA a Sanity Studio -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:35px;">
                <tr>
                  <td align="center">
                    <a href="https://www.millan-experiences.com/admin" target="_blank" style="display:inline-block;background-color:#c8b487;color:#13272f;padding:14px 34px;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border-radius:2px;box-shadow:0 4px 15px rgba(200,180,135,0.25);">
                      Ver y Gestionar en Sanity
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer del Email -->
          <tr>
            <td align="center" style="padding:25px 20px;background-color:#0e1e24;border-top:1px solid rgba(200,180,135,0.15);font-size:11px;color:rgba(244,239,228,0.5);letter-spacing:1px;line-height:1.6;">
              Notificación automática enviada a <strong style="color:#c8b487;">${recipientEmail}</strong>.<br>
              <a href="https://www.kytcode.lat" target="_blank" style="color:#c8b487;text-decoration:none;display:inline-block;margin-top:6px;">Desarrollado por K&T <span style="color:#ffffff;">&#9829;</span></a> · © ${new Date().getFullYear()} Millan Experiences.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  if (apiKey) {
    const resend = new Resend(apiKey)

    const response = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `Nueva Solicitud de Viaje: ${fullName}`,
      html: htmlContent,
    })

    if (response.error) {
      console.error('[RESEND ERROR]', response.error)
      return { success: false, error: response.error }
    }

    return { success: true, data: response.data }
  } else {
    console.log('[RESEND NOTICE] RESEND_API_KEY no está configurada en .env.local aún.')
    return { success: true, simulated: true }
  }
}

export interface StoreOrderItem {
  name: string
  quantity: number
  priceCOP: number
}

export interface StoreOrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  destination: string
  deliveryDate: string
  notes?: string
  items: StoreOrderItem[]
  totalAmount: number
  wompiTransactionId?: string
  paymentMethod?: string
}

/**
 * Envia correos de confirmación tanto al comprador como al correo de administración de la web.
 * Incluye plantilla con logo oficial, estética de lujo acorde a la web y desglose completo.
 */
export async function sendStoreOrderPaidEmails(
  data: StoreOrderEmailData,
  customAdminEmail?: string,
  customLogoUrl?: string
) {
  // Idempotency: avoid sending duplicate emails for the exact same order or transaction
  const dispatchKey = `${data.orderId}_${data.wompiTransactionId || 'done'}`
  if (dispatchedOrderEmails.has(dispatchKey)) {
    console.log(`[RESEND NOTICE] Correos para la orden ${data.orderId} ya fueron enviados previamente. Se omite duplicado.`)
    return { success: true, alreadyDispatched: true }
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM || 'Millan Experiences <onboarding@resend.dev>'

  // Obtener logo y correo de administración desde Sanity o valores predeterminados
  let adminEmail = customAdminEmail || 'millanexperiences@gmail.com'
  let displayLogo =
    customLogoUrl ||
    'https://cdn.sanity.io/images/a94tk6u3/production/f7465d95ee177c82054798409f858e0905482698-1649x720.png'

  if (!customAdminEmail || !customLogoUrl) {
    try {
      const res = await fetch(
        'https://a94tk6u3.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22globalConfig%22%5D%5B0%5D%7B%20email%2C%20%22logoUrl%22%3A%20logo.asset-%3Eurl%20%7D',
        { next: { revalidate: 3600 } }
      )
      const sanityData = await res.json()
      if (sanityData?.result?.email && !customAdminEmail) {
        adminEmail = sanityData.result.email
      }
      if (sanityData?.result?.logoUrl && !customLogoUrl) {
        displayLogo = sanityData.result.logoUrl
      }
    } catch (e) {
      console.warn('[SANITY GLOBAL CONFIG FETCH WARNING]', e)
    }
  }

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(data.totalAmount)

  // Filas de productos para la tabla
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid rgba(244,239,228,0.08);color:#f4efe4;font-size:13px;font-weight:500;">
          ${item.name}
        </td>
        <td align="center" style="padding:12px 14px;border-bottom:1px solid rgba(244,239,228,0.08);color:#c8b487;font-size:13px;font-weight:bold;">
          x${item.quantity}
        </td>
        <td align="right" style="padding:12px 14px;border-bottom:1px solid rgba(244,239,228,0.08);color:#93bdbd;font-size:13px;">
          ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(item.priceCOP)}
        </td>
        <td align="right" style="padding:12px 14px;border-bottom:1px solid rgba(244,239,228,0.08);color:#f4efe4;font-size:13px;font-weight:600;">
          ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(item.priceCOP * item.quantity)}
        </td>
      </tr>
    `
    )
    .join('')

  const whatsappConciergeUrl = `https://wa.me/573107102651?text=${encodeURIComponent(
    `Hola Millan Experiences, tengo una consulta sobre mi compra #${data.orderId} a nombre de ${data.customerName}.`
  )}`

  // ===========================================================================
  // 1. PLANTILLA PARA EL CLIENTE COMPRADOR (GRACIAS POR TU COMPRA)
  // ===========================================================================
  const customerHtmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Gracias por tu compra! - Millan Experiences</title>
</head>
<body style="margin:0;padding:0;background-color:#0b181d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f4efe4;-webkit-font-smoothing:antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b181d;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#13272f;border:1px solid rgba(200,180,135,0.35);border-radius:4px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.6);">
          
          <!-- Encabezado con Logo Oficial de Millan Experiences -->
          <tr>
            <td align="center" style="padding:38px 25px 26px;background-color:#0e1e24;border-bottom:1px solid rgba(200,180,135,0.25);">
              <img src="${displayLogo}" alt="Millan Experiences" width="180" style="display:block;max-width:180px;height:auto;margin:0 auto 14px;object-fit:contain;" />
              <div style="display:inline-block;background:#059669;color:#ffffff;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:2px;">
                Pago Confirmado Exitosamente
              </div>
            </td>
          </tr>

          <!-- Contenido Principal -->
          <tr>
            <td style="padding:36px 32px;">
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:normal;color:#f4efe4;font-family:Georgia,serif;line-height:1.3;">
                ¡Gracias por tu compra, <span style="color:#c8b487;">${data.customerName}</span>!
              </h1>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:rgba(244,239,228,0.85);">
                Hemos recibido tu pago exitosamente. Tu pedido de la <strong style="color:#c8b487;">Boutique & Cava Millan Experiences</strong> está confirmado y nuestro equipo de concierge náutico ya se encuentra coordinando el alistamiento a temperatura ideal.
              </p>

              <!-- Tarjeta de Datos de Entrega y Pago -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#18323c;border:1px solid rgba(244,239,228,0.12);border-radius:4px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="38%" style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Código de Pedido:</td>
                        <td style="color:#c8b487;font-size:15px;font-weight:bold;font-family:monospace;">${data.orderId}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">ID de Transacción:</td>
                        <td style="color:#ffffff;font-size:12px;font-family:monospace;">${data.wompiTransactionId || 'Aprobada'}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Método de Pago:</td>
                        <td style="color:#f4efe4;font-size:13px;text-transform:uppercase;">${data.paymentMethod || 'Pago Electrónico Seguro'}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Fecha de Entrega:</td>
                        <td style="color:#f4efe4;font-size:13px;font-weight:bold;">${data.deliveryDate}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Lugar de Entrega:</td>
                        <td style="color:#f4efe4;font-size:13px;font-weight:bold;">${data.destination}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Teléfono Registrado:</td>
                        <td style="color:#f4efe4;font-size:13px;">${data.customerPhone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Detalle de Productos Solicitados -->
              <p style="margin:0 0 10px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">
                Resumen de Productos Adquiridos:
              </p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border:1px solid rgba(244,239,228,0.12);border-radius:4px;overflow:hidden;">
                <thead>
                  <tr style="background-color:#0e1e24;">
                    <th align="left" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Producto</th>
                    <th align="center" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Cant</th>
                    <th align="right" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Unitario</th>
                    <th align="right" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td colspan="3" style="padding:12px 14px;font-size:12px;color:#93bdbd;border-top:1px solid rgba(244,239,228,0.12);">Alistamiento & Servicio Náutico:</td>
                    <td align="right" style="padding:12px 14px;font-size:12px;color:#c8b487;border-top:1px solid rgba(244,239,228,0.12);font-weight:bold;">Incluido</td>
                  </tr>
                  <tr style="background-color:#0e1e24;">
                    <td colspan="3" style="padding:14px 14px;font-weight:bold;color:#f4efe4;font-size:14px;letter-spacing:1px;">TOTAL PAGADO:</td>
                    <td align="right" style="padding:14px 14px;font-weight:bold;color:#c8b487;font-size:16px;">${formattedTotal}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Instrucciones especiales si fueron ingresadas -->
              ${
                data.notes
                  ? `
              <div style="background-color:#18323c;padding:16px 18px;border-left:3px solid #c8b487;border-radius:0 3px 3px 0;margin-bottom:24px;font-size:13px;line-height:1.5;">
                <strong style="color:#93bdbd;display:block;margin-bottom:4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Instrucciones Especiales / Hielo / Copas:</strong>
                <span style="color:#f4efe4;">"${data.notes}"</span>
              </div>
              `
                  : ''
              }

              <!-- Aviso de Regla Náutica de 8 Horas -->
              <div style="background-color:rgba(200,180,135,0.12);border:1px solid rgba(200,180,135,0.35);padding:16px 18px;border-radius:3px;margin-bottom:28px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:bold;color:#c8b487;text-transform:uppercase;letter-spacing:1px;">
                  Compromiso de Calidad & Frío Náutico
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(244,239,228,0.85);">
                  Todos los pedidos se preparan con al menos <strong>8 horas de anticipación</strong> para garantizar temperatura idónea de servicio en cava, hielo purificado y cristalería fina en tu muelle o villa de entrega.
                </p>
              </div>

              <!-- Botón Contacto WhatsApp -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                <tr>
                  <td align="center">
                    <a href="${whatsappConciergeUrl}" target="_blank" style="display:inline-block;background-color:#25D366;color:#ffffff;padding:14px 28px;font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border-radius:3px;box-shadow:0 4px 15px rgba(37,211,102,0.3);">
                      Contactar al Concierge por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer del Email -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#0e1e24;border-top:1px solid rgba(200,180,135,0.15);font-size:11px;color:rgba(244,239,228,0.5);letter-spacing:1px;line-height:1.6;">
              Millan Experiences · Cartagena de Indias, Colombia.<br>
              <a href="https://www.kytcode.lat" target="_blank" style="color:#c8b487;text-decoration:none;display:inline-block;margin-top:6px;">Desarrollado por K&T <span style="color:#ffffff;">&#9829;</span></a> · © ${new Date().getFullYear()} Millan Experiences.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  // ===========================================================================
  // 2. PLANTILLA PARA LA ADMINISTRACIÓN DE LA WEB
  // ===========================================================================
  const adminHtmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Compra Pagada en Tienda - Millan Experiences</title>
</head>
<body style="margin:0;padding:0;background-color:#0b181d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f4efe4;-webkit-font-smoothing:antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b181d;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#13272f;border:1px solid rgba(200,180,135,0.35);border-radius:4px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.6);">
          
          <!-- Encabezado con Logo -->
          <tr>
            <td align="center" style="padding:38px 25px 26px;background-color:#0e1e24;border-bottom:1px solid rgba(200,180,135,0.25);">
              <img src="${displayLogo}" alt="Millan Experiences" width="180" style="display:block;max-width:180px;height:auto;margin:0 auto 14px;object-fit:contain;" />
              <div style="display:inline-block;background:#059669;color:#ffffff;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:2px;">
                Nueva Compra Pagada · Tienda Online
              </div>
            </td>
          </tr>

          <!-- Contenido Principal -->
          <tr>
            <td style="padding:36px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:normal;color:#f4efe4;font-family:Georgia,serif;line-height:1.3;">
                Nueva Venta Confirmada: <span style="color:#c8b487;">${formattedTotal}</span>
              </h1>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:rgba(244,239,228,0.85);">
                Se ha confirmado con éxito un pago electrónico para la <strong style="color:#c8b487;">Boutique & Cava Millan Experiences</strong>. A continuación los detalles completos para alistamiento náutico:
              </p>

              <!-- Tarjeta de Detalles del Cliente y Entrega -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#18323c;border:1px solid rgba(244,239,228,0.12);border-radius:4px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="38%" style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Código de Pedido:</td>
                        <td style="color:#c8b487;font-size:16px;font-weight:bold;font-family:monospace;">${data.orderId}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">ID de Transacción:</td>
                        <td style="color:#ffffff;font-size:13px;font-family:monospace;">${data.wompiTransactionId || 'Aprobada'}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Cliente / Titular:</td>
                        <td style="color:#f4efe4;font-size:14px;font-weight:bold;">${data.customerName}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Teléfono / WhatsApp:</td>
                        <td style="color:#f4efe4;font-size:14px;">
                          <a href="https://wa.me/${data.customerPhone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#93bdbd;text-decoration:none;font-weight:bold;">${data.customerPhone} (Abrir Chat)</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Correo Electrónico:</td>
                        <td style="color:#c8b487;font-size:14px;">
                          <a href="mailto:${data.customerEmail}" style="color:#c8b487;text-decoration:none;">${data.customerEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Destino de Entrega:</td>
                        <td style="color:#f4efe4;font-size:14px;font-weight:bold;">${data.destination}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Fecha de Entrega:</td>
                        <td style="color:#f4efe4;font-size:14px;font-weight:bold;">${data.deliveryDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Detalle de Productos -->
              <p style="margin:0 0 10px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">
                Productos a Despachar:
              </p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border:1px solid rgba(244,239,228,0.12);border-radius:4px;overflow:hidden;">
                <thead>
                  <tr style="background-color:#0e1e24;">
                    <th align="left" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Producto</th>
                    <th align="center" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Cant</th>
                    <th align="right" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Unitario</th>
                    <th align="right" style="padding:10px 14px;color:#93bdbd;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="background-color:#0e1e24;">
                    <td colspan="3" style="padding:14px 14px;font-weight:bold;color:#f4efe4;font-size:14px;letter-spacing:1px;">TOTAL COBRADO:</td>
                    <td align="right" style="padding:14px 14px;font-weight:bold;color:#c8b487;font-size:16px;">${formattedTotal}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Instrucciones especiales si existen -->
              ${
                data.notes
                  ? `
              <div style="background-color:#18323c;padding:16px 18px;border-left:3px solid #c8b487;border-radius:0 3px 3px 0;margin-bottom:24px;font-size:13px;line-height:1.5;">
                <strong style="color:#93bdbd;display:block;margin-bottom:4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Instrucciones / Notas Especiales:</strong>
                <span style="color:#f4efe4;">"${data.notes}"</span>
              </div>
              `
                  : ''
              }

              <!-- Botón Contactar al Cliente -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/${data.customerPhone.replace(/[^0-9]/g, '')}" target="_blank" style="display:inline-block;background-color:#c8b487;color:#13272f;padding:14px 28px;font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border-radius:3px;box-shadow:0 4px 15px rgba(200,180,135,0.25);">
                      Abrir WhatsApp con el Cliente
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer del Email -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#0e1e24;border-top:1px solid rgba(200,180,135,0.15);font-size:11px;color:rgba(244,239,228,0.5);letter-spacing:1px;line-height:1.6;">
              Notificación automática para la administración · Millan Experiences.<br>
              <a href="https://www.kytcode.lat" target="_blank" style="color:#c8b487;text-decoration:none;display:inline-block;margin-top:6px;">Desarrollado por K&T <span style="color:#ffffff;">&#9829;</span></a> · © ${new Date().getFullYear()} Millan Experiences.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  // Disparar ambos correos mediante Resend
  if (apiKey) {
    try {
      const resend = new Resend(apiKey)

      const [customerRes, adminRes] = await Promise.allSettled([
        // 1. Correo al comprador
        resend.emails.send({
          from: fromEmail,
          to: [data.customerEmail],
          replyTo: adminEmail,
          subject: `¡Gracias por tu compra en Millan Experiences! [Pedido #${data.orderId}]`,
          html: customerHtmlContent,
        }),
        // 2. Correo a la administración de la web
        resend.emails.send({
          from: fromEmail,
          to: [adminEmail],
          replyTo: data.customerEmail,
          subject: `Nueva Compra Pagada en Tienda [${data.orderId}] - ${data.customerName} (${formattedTotal})`,
          html: adminHtmlContent,
        }),
      ])

      dispatchedOrderEmails.add(dispatchKey)

      const customerSuccess = customerRes.status === 'fulfilled' && !customerRes.value.error
      const adminSuccess = adminRes.status === 'fulfilled' && !adminRes.value.error

      if (!customerSuccess) {
        console.error('[RESEND ERROR - CORREO COMPRADOR]', customerRes)
      }
      if (!adminSuccess) {
        console.error('[RESEND ERROR - CORREO ADMINISTRACION]', adminRes)
      }

      console.log(
        `[RESEND STORE NOTIFICATIONS] Orden: ${data.orderId} | Comprador (${data.customerEmail}): ${customerSuccess ? 'ENVIADO' : 'FALLO'} | Admin (${adminEmail}): ${adminSuccess ? 'ENVIADO' : 'FALLO'}`
      )

      return {
        success: customerSuccess || adminSuccess,
        customerSent: customerSuccess,
        adminSent: adminSuccess,
      }
    } catch (err) {
      console.error('[RESEND DISPATCH ERROR]', err)
      return { success: false, error: err }
    }
  }

  console.log(
    `[RESEND SIMULATION] Orden ${data.orderId} pagada por ${formattedTotal}. Simulado envío a comprador (${data.customerEmail}) y a admin (${adminEmail}).`
  )
  dispatchedOrderEmails.add(dispatchKey)
  return { success: true, simulated: true }
}

// Compatibilidad retroactiva para cualquier import previo
export const sendStoreOrderPaidEmail = sendStoreOrderPaidEmails
