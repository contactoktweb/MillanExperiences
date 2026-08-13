import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a94tk6u3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function run() {
  try {
    const res = await client.create({ _type: 'review', name: 'Test', status: 'pending' })
    console.log("Success! Created doc:", res._id)
    await client.delete(res._id)
    console.log("Cleaned up test doc.")
  } catch (err: any) {
    console.error("Token error:", err.message)
  }
}
run()
