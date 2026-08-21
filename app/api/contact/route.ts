import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

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

    return NextResponse.json({ success: true, lead: createdLead })
  } catch (error: any) {
    console.error('Error submitting contact lead to Sanity:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
