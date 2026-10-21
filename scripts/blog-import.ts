/**
 * Sube los artículos semilla del blog (lib/blog/seed) a Sanity:
 * categorías, imágenes principales (desde /public) y artículos EN/ES.
 *
 *   pnpm blog:import              # DRY-RUN: muestra lo que haría, no escribe
 *   pnpm blog:import --apply      # crea lo que falte (no toca lo ya editado en Sanity)
 *   pnpm blog:import --apply --overwrite   # reemplaza también los artículos existentes
 *
 * Requiere en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * y SANITY_API_WRITE_TOKEN (token con permiso Editor).
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { seedPosts } from '../lib/blog/seed'
import { headingId, seedToPortableText } from '../lib/blog/portable-text'
import type { Locale, SeedPost } from '../lib/blog/types'

dotenv.config({ path: '.env.local' })

const APPLY = process.argv.includes('--apply')
const OVERWRITE = process.argv.includes('--overwrite')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a94tk6u3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (APPLY && !token) {
  console.error('❌ SANITY_API_WRITE_TOKEN no está definido en .env.local (necesario para --apply).')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

const categoryId = (post: SeedPost) => `blogCategory-${headingId(post.content.en.category)}`
const postId = (post: SeedPost) => `blogPost-${post.slug}`

function buildContent(post: SeedPost, locale: Locale) {
  const c = post.content[locale]
  return {
    _type: 'blogPostContent',
    title: c.title,
    description: c.description,
    takeaways: c.takeaways,
    body: seedToPortableText(c.body, `${locale}b`),
    faqs: c.faqs.map((f, i) => ({ _type: 'faq', _key: `${locale}faq${i}`, question: f.question, answer: f.answer })),
    cta: c.cta,
    seo: { metaTitle: c.metaTitle, metaDescription: c.metaDescription },
  }
}

async function uploadImage(publicPath: string, cache: Map<string, string>) {
  if (cache.has(publicPath)) return cache.get(publicPath)!
  const file = path.join(process.cwd(), 'public', publicPath)
  const asset = await client.assets.upload('image', await readFile(file), { filename: path.basename(file) })
  cache.set(publicPath, asset._id)
  return asset._id
}

async function main() {
  console.log(`\n📝 Blog → Sanity (${projectId}/${dataset}) — ${APPLY ? 'APLICANDO' : 'DRY-RUN'}${OVERWRITE ? ' + overwrite' : ''}\n`)

  // Categorías (en el orden en que aparecen los artículos)
  const categories = new Map<string, { titleEn: string; titleEs: string; order: number }>()
  for (const post of seedPosts) {
    if (!categories.has(categoryId(post))) {
      categories.set(categoryId(post), {
        titleEn: post.content.en.category,
        titleEs: post.content.es.category,
        order: categories.size + 1,
      })
    }
  }

  const existing: string[] = APPLY
    ? await client.fetch('*[_id in $ids]._id', { ids: seedPosts.map(postId) })
    : []

  if (!APPLY) {
    for (const [id, c] of categories) console.log(`  categoría  ${id}  (${c.titleEs} / ${c.titleEn})`)
    for (const post of seedPosts) console.log(`  artículo   ${postId(post)}  imagen: /public${post.image}`)
    console.log('\nNada se escribió. Ejecuta con --apply para subirlo.\n')
    return
  }

  const tx = client.transaction()
  for (const [id, c] of categories) {
    tx.createIfNotExists({
      _id: id,
      _type: 'blogCategory',
      titleEn: c.titleEn,
      titleEs: c.titleEs,
      slug: { _type: 'slug', current: id.replace('blogCategory-', '') },
      order: c.order,
    })
  }

  const images = new Map<string, string>()
  let created = 0
  let skipped = 0
  for (const [i, post] of seedPosts.entries()) {
    if (existing.includes(postId(post)) && !OVERWRITE) {
      console.log(`  = ${post.slug} ya existe en Sanity (usa --overwrite para reemplazarlo)`)
      skipped++
      continue
    }
    const assetId = await uploadImage(post.image, images)
    const doc = {
      _id: postId(post),
      _type: 'blogPost',
      slug: { _type: 'slug', current: post.slug },
      publishedAt: `${post.publishedAt}T12:00:00.000Z`,
      category: { _type: 'reference', _ref: categoryId(post) },
      featured: i === 0,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        altEn: post.content.en.imageAlt,
        altEs: post.content.es.imageAlt,
      },
      relatedLinks: post.related.map((r, j) => ({
        _type: 'relatedLink',
        _key: `rel${j}`,
        href: r.href,
        labelEn: r.label.en,
        labelEs: r.label.es,
      })),
      keywords: post.keywords,
      contentEn: buildContent(post, 'en'),
      contentEs: buildContent(post, 'es'),
    }
    tx.createOrReplace(doc)
    console.log(`  + ${post.slug} (imagen subida)`)
    created++
  }

  await tx.commit()
  console.log(`\n✅ Listo: ${categories.size} categorías, ${created} artículos subidos, ${skipped} sin cambios.\n`)
}

main().catch((error) => {
  console.error('❌ Error importando el blog:', error.message || error)
  process.exit(1)
})
