import { defineQuery } from 'next-sanity'

export const globalConfigQuery = defineQuery(`
  *[_type == "globalConfig"][0]{
    "faviconUrl": favicon.asset->url,
    "logoUrl": logo.asset->url,
    email,
    phone,
    whatsapp,
    instagram,
    linkedin,
    tiktok,
    mainNavigation[]{
      ...,
      "imageUrl": image.asset->url
    }
  }
`)

export const approvedReviewsQuery = defineQuery(`
  *[_type == "review" && status == "approved" && defined(quote) && quote != ""] | order(_createdAt desc) {
    _id,
    name,
    quote,
    rating,
    context,
    date,
    isGoogleReview,
    "imageUrl": image.asset->url,
    images[]{
      ...,
      "asset": {
        "url": asset->url
      }
    }
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    contentEn {
      hero {
        ...,
        slides[]{ ..., "imageUrl": image.asset->url }
      },
      coreServices {
        ...,
        services[]{ ..., "imageUrl": image.asset->url }
      },
      whyMillan {
        ...,
        "mainImageUrl": mainImage.asset->url,
        "secondaryImageUrl": secondaryImage.asset->url
      },
      testimonialsSection {
        ...,
        "sideImageUrl": sideImage.asset->url,
        list[]{
          ...,
          "imageUrl": image.asset->url,
          images[]{
            ...,
            "asset": {
              "url": asset->url
            }
          }
        }
      }
    },
    contentEs {
      hero {
        ...,
        slides[]{ ..., "imageUrl": image.asset->url }
      },
      coreServices {
        ...,
        services[]{ ..., "imageUrl": image.asset->url }
      },
      whyMillan {
        ...,
        "mainImageUrl": mainImage.asset->url,
        "secondaryImageUrl": secondaryImage.asset->url
      },
      testimonialsSection {
        ...,
        "sideImageUrl": sideImage.asset->url,
        list[]{
          ...,
          "imageUrl": image.asset->url,
          images[]{
            ...,
            "asset": {
              "url": asset->url
            }
          }
        }
      }
    }
  }
`)
export const servicePageQuery = defineQuery(`
  *[_type == "servicePage" && slug.current == $slug][0]{
    contentEn {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      whatWeHandle {
        ...,
        "imageUrl": image.asset->url
      },
      exploreGrid {
        ...,
        cards[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      faq,
      relatedServices {
        ...,
        cards[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      seoFaq
    },
    contentEs {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      whatWeHandle {
        ...,
        "imageUrl": image.asset->url
      },
      exploreGrid {
        ...,
        cards[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      faq,
      relatedServices {
        ...,
        cards[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      seoFaq
    }
  }
`)

export const servicePathsQuery = defineQuery(`
  *[_type == "servicePage" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const listingPageQuery = defineQuery(`
  *[_type == "listingPage" && slug.current == $slug][0]{
    contentEn {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      processSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      grid {
        items[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      bentoBanner {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      seoFaq
    },
    contentEs {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      processSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      grid {
        items[]{
          ...,
          "imageUrl": image.asset->url
        }
      },
      bentoBanner {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      seoFaq
    }
  }
`)

export const eventPageQuery = defineQuery(`
  *[_type == "eventPage" && slug.current == $slug][0]{
    contentEn {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      quoteSection,
      experienceSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      whyMillan,
      addons[]{
        ...,
        "imageUrl": image.asset->url
      },
      possibilities[]{
        ...,
        "imageUrl": image.asset->url
      }
    },
    contentEs {
      seo,
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      quoteSection,
      experienceSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      whyMillan,
      addons[]{
        ...,
        "imageUrl": image.asset->url
      },
      possibilities[]{
        ...,
        "imageUrl": image.asset->url
      }
    }
  }
`)

export const pageBySlugQuery = defineQuery(`
  *[_type in ["listingPage", "eventPage"] && slug.current == $slug][0]{
    _type,
    isHub,
    "slug": slug.current,
    "properties": *[_type == ^.slug.current]{
      title,
      "slug": slug.current,
      "location": details.location,
      "dimensions": details.dimensions,
      "capacity": details.capacity,
      "rooms": details.rooms,
      "bathrooms": details.bathrooms,
      "imageUrl": mainImage.asset->url
    },
    contentEn {
      seo,
      hubLeft {
        title,
        description,
        "imageUrl": image.asset->url,
        href
      },
      hubRight {
        title,
        description,
        "imageUrl": image.asset->url,
        href
      },
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      processSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      bentoBanner {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      quoteSection,
      experienceSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      whyMillan,
      addons[]{
        ...,
        "imageUrl": image.asset->url
      },
      possibilities[]{
        ...,
        "imageUrl": image.asset->url
      },
      seoFaq
    },
    contentEs {
      seo,
      hubLeft {
        title,
        description,
        "imageUrl": image.asset->url,
        href
      },
      hubRight {
        title,
        description,
        "imageUrl": image.asset->url,
        href
      },
      hero {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      processSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      bentoBanner {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      quoteSection,
      experienceSteps[]{
        ...,
        "imageUrl": image.asset->url
      },
      whyMillan,
      addons[]{
        ...,
        "imageUrl": image.asset->url
      },
      possibilities[]{
        ...,
        "imageUrl": image.asset->url
      },
      seoFaq
    }
  }
`)

export const propertyBySlugQuery = defineQuery(`
  *[_type == $categorySlug && slug.current == $slug][0]{
    _type,
    title,
    "slug": slug.current,
    "categorySlug": _type,
    "mainImageUrl": mainImage.asset->url,
    gallery[]{
      asset->{url}
    },
    descriptionEn,
    descriptionEs,
    details,
    amenities,
    price,
    cancellationPolicyEn,
    cancellationPolicyEs,
    faqs,
    complementaryExperiences[]{
      ...,
      image{
        asset->{url}
      }
    }
  }

`)

export const propertyReviewsQuery = defineQuery(`
  *[_type == "review" && status == "approved" && propertySlug == $slug] | order(_createdAt desc) {
    _id,
    name,
    quote,
    rating,
    context,
    date,
    propertyName,
    propertySlug,
    isGoogleReview,
    images[]{
      asset->{url}
    }
  }
`)
