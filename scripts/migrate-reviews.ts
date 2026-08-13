import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Ensure you run this with: npx tsx scripts/migrate-reviews.ts
// And have SANITY_API_WRITE_TOKEN set in .env.local

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a94tk6u3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN no está definido en las variables de entorno.")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Default to jpeg if can't infer
    let contentType = response.headers.get('content-type') || 'image/jpeg'
    
    console.log(`Subiendo imagen: ${filename}...`)
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Error subiendo imagen ${url}:`, error)
    return null
  }
}

async function run() {
  const reviewsFile = path.join(process.cwd(), 'scratch/extracted-reviews.json')
  
  if (!fs.existsSync(reviewsFile)) {
    console.error("❌ No se encontró el archivo scratch/extracted-reviews.json")
    process.exit(1)
  }

  const reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'))
  console.log(`Encontradas ${reviews.length} reseñas para migrar.`)

  for (const review of reviews) {
    console.log(`\nProcesando reseña de: ${review.name}`)
    
    const uploadedImages = []
    
    // Subir cada foto adjunta
    for (let i = 0; i < review.photos.length; i++) {
      const url = review.photos[i]
      const sanitizedName = review.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const filename = `${sanitizedName}-photo-${i+1}.jpg`
      const imageAsset = await uploadImageFromUrl(url, filename)
      if (imageAsset) {
        uploadedImages.push(imageAsset)
      }
    }

    const doc = {
      _type: 'review',
      name: review.name,
      rating: review.rating,
      date: review.date,
      quote: review.text,
      isGoogleReview: true,
      status: 'approved', // Las importadas entran aprobadas por defecto
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
    }

    try {
      const result = await client.create(doc)
      console.log(`✅ Creado en Sanity con ID: ${result._id}`)
    } catch (error) {
      console.error(`❌ Error creando documento para ${review.name}:`, error)
    }
  }
  
  console.log("\n🎉 Migración completada.")
}

run()
