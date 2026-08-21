import nodemailer from 'nodemailer'

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
  recipientEmail: string
) {
  const { firstName, lastName, email, phone, services, startDate, endDate, message } = data
  const fullName = `${firstName} ${lastName || ''}`.trim()
  
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT) || 465
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
  const fromEmail = process.env.SMTP_FROM || smtpUser || 'notifications@millan-experiences.com'

  const servicesHtml = services && services.length > 0
    ? services.map(s => `<span style="display:inline-block;background:#18323c;color:#c8b487;padding:6px 12px;margin:3px;border-radius:4px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border:1px solid rgba(200,180,135,0.3);">${s}</span>`).join('')
    : '<span style="color:#888;">No especificado</span>'

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Solicitud de Cliente - Millan Experiences</title>
</head>
<body style="margin:0;padding:0;background-color:#0b181d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f4efe4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b181d;padding:40px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#13272f;border:1px solid rgba(200,180,135,0.3);border-radius:4px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 30px;background-color:#0e1e24;border-bottom:1px solid rgba(200,180,135,0.2);">
              <h1 style="margin:0;font-size:24px;font-weight:300;letter-spacing:3px;text-transform:uppercase;color:#c8b487;">MILLAN EXPERIENCES</h1>
              <p style="margin:8px 0 0;font-size:12px;letter-spacing:2px;color:#93bdbd;text-transform:uppercase;">Nueva Solicitud de Experiencia / Lead</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px 35px;">
              <p style="margin:0 0 25px;font-size:16px;line-height:1.6;color:#f4efe4;">
                Has recibido una nueva solicitud de viaje desde el formulario web:
              </p>

              <!-- Lead Details Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#18323c;border:1px solid rgba(244,239,228,0.1);border-radius:4px;margin-bottom:25px;">
                <tr>
                  <td style="padding:20px 25px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="35%" style="color:#93bdbd;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Cliente:</td>
                        <td style="color:#f4efe4;font-size:15px;font-weight:bold;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Correo:</td>
                        <td style="color:#c8b487;font-size:15px;">
                          <a href="mailto:${email}" style="color:#c8b487;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#93bdbd;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Teléfono:</td>
                        <td style="color:#f4efe4;font-size:15px;">
                          ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color:#93bdbd;text-decoration:none;">${phone} 💬 (WhatsApp)</a>` : '<span style="color:#888;">No especificado</span>'}
                        </td>
                      </tr>
                      ${startDate || endDate ? `
                      <tr>
                        <td style="color:#93bdbd;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Fechas:</td>
                        <td style="color:#f4efe4;font-size:14px;">${startDate || 'Flexible'} → ${endDate || 'Flexible'}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Services of interest -->
              <div style="margin-bottom:25px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">Servicios Solicitados:</p>
                <div>${servicesHtml}</div>
              </div>

              <!-- Message -->
              ${message ? `
              <div style="margin-bottom:30px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#93bdbd;">Mensaje / Visión del Cliente:</p>
                <div style="background-color:#18323c;padding:18px;border-left:3px solid #c8b487;color:#f4efe4;font-size:14px;line-height:1.6;font-style:italic;">
                  “${message}”
                </div>
              </div>
              ` : ''}

              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:30px;">
                <tr>
                  <td align="center">
                    <a href="https://www.millan-experiences.com/admin" target="_blank" style="display:inline-block;background-color:#c8b487;color:#13272f;padding:14px 32px;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                      Ver y Gestionar en Sanity
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:25px;background-color:#0e1e24;border-top:1px solid rgba(200,180,135,0.1);font-size:11px;color:rgba(244,239,228,0.5);letter-spacing:1px;">
              Notificación automática enviada a <strong>${recipientEmail}</strong> (configurado en Sanity Global Config).<br>© ${new Date().getFullYear()} Millan Experiences.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  // Send via SMTP if credentials are provided
  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: `"Millan Experiences" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `✨ Nueva Solicitud de Viaje: ${fullName}`,
      html: htmlContent,
    })

    return { success: true, messageId: info.messageId }
  } else {
    console.log(`[EMAIL NOTIFICATION] No custom SMTP credentials configured yet in .env.local.`);
    console.log(`[EMAIL NOTIFICATION] Email successfully prepared for: ${recipientEmail}`);
    console.log(`[EMAIL NOTIFICATION] Subject: ✨ Nueva Solicitud de Viaje: ${fullName}`);
    console.log(`[EMAIL NOTIFICATION] Lead Data:`, { fullName, email, phone, services, startDate, endDate, message });
    return { success: true, simulated: true }
  }
}
