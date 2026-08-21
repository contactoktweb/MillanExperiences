import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { sendLeadNotificationEmail } from '@/lib/email'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { firstName, lastName, email, phone, services, startDate, endDate, message } = data

    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required.' },
        { status: 400 }
      )
    }

    // 1. Guardar el Lead en Sanity
    const doc = {
      _type: 'clientLead',
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      services: Array.isArray(services) ? services : [],
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      message: message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    const createdLead = await writeClient.create(doc)

    // 2. Obtener el correo y logo configurados en Configuración Global de Sanity
    let recipientEmail = 'millanexperiences@gmail.com'
    let logoUrl: string | undefined = undefined
    try {
      const globalConfig = await writeClient.fetch('*[_type == "globalConfig"][0]{ email, "logoUrl": logo.asset->url }')
      if (globalConfig?.email) {
        recipientEmail = globalConfig.email
      }
      if (globalConfig?.logoUrl) {
        logoUrl = globalConfig.logoUrl
      }
    } catch (fetchErr) {
      console.warn('Could not fetch globalConfig email/logo, using defaults:', fetchErr)
    }

    // 3. Enviar notificación por correo con Resend usando el logo de Sanity
    let emailResult = null
    try {
      emailResult = await sendLeadNotificationEmail(
        {
          firstName: doc.firstName,
          lastName: doc.lastName,
          email: doc.email,
          phone: doc.phone,
          services: doc.services,
          startDate: doc.startDate,
          endDate: doc.endDate,
          message: doc.message,
          leadId: createdLead._id,
        },
        recipientEmail,
        logoUrl
      )
    } catch (mailErr) {
      console.error('Error sending lead notification email via Resend:', mailErr)
      // No fallamos la respuesta para no perder el registro en Sanity
    }

    return NextResponse.json({
      success: true,
      lead: createdLead,
      emailSent: Boolean(emailResult?.success),
      recipientEmail,
    })
  } catch (error: any) {
    console.error('Error submitting contact lead to Sanity:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
