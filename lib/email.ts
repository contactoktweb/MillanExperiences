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
                              ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#93bdbd;text-decoration:none;font-weight:500;">${phone} 💬 (Abrir WhatsApp)</a>`
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
              Configurado en <em>Sanity Global Config</em> · © ${new Date().getFullYear()} Millan Experiences.
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
      subject: `✨ Nueva Solicitud de Viaje: ${fullName}`,
      html: htmlContent,
    })

    if (response.error) {
      console.error('[RESEND ERROR]', response.error)
      return { success: false, error: response.error }
    }

    return { success: true, data: response.data }
  } else {
    console.log('[RESEND NOTICE] RESEND_API_KEY no está configurada en .env.local aún.')
    console.log(`[RESEND NOTICE] Correo preparado para: ${recipientEmail}`)
    console.log(`[RESEND NOTICE] Logo de Sanity utilizado: ${displayLogo}`)
    console.log(`[RESEND NOTICE] Datos del cliente: ${fullName} (${email}, ${phone})`)
    return { success: true, simulated: true }
  }
}
