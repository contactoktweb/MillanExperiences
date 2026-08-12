import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Creamos un cliente de Sanity con el token de escritura
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    const name = formData.get('name') as string
    const quote = formData.get('quote') as string
    const rating = Number(formData.get('rating') || 5)
    
    if (!name || !quote) {
      return NextResponse.json({ error: 'Name and quote are required' }, { status: 400 })
    }

    // Subir imágenes si existen
    const imageFiles = formData.getAll('images') as File[]
    const uploadedImages = []

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        // Convert File to ArrayBuffer then to Buffer
        const buffer = Buffer.from(await file.arrayBuffer())
        
        // Upload to Sanity
        const asset = await writeClient.assets.upload('image', buffer, {
          filename: file.name,
          contentType: file.type
        })
        
        uploadedImages.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        })
      }
    }

    // Crear el documento de la reseña
    const reviewDoc = {
      _type: 'review',
      name,
      quote,
      rating,
      date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }), // e.g. "agosto 2026"
      isGoogleReview: false,
      status: 'pending',
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
    }

    const createdReview = await writeClient.create(reviewDoc)

    return NextResponse.json({ success: true, review: createdReview })
  } catch (error: any) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
