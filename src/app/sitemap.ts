import search from '@/utils/algolia/search'
import serverFetch from '@/utils/fetch/server-fetch'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.VERCEL_URL || 'http://localhost:3001'

const getProSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const response = await serverFetch('products')
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }

  const products: IProduct[] = await response.json()

  const sitemaps: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/pro/${product.price.lookup_key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: `${BASE_URL}/pro`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...sitemaps,
  ]
}

const getSubjectsSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const subjects = await search<IASubject>({ index: 'subjects', hitsPerPage: 1000 })

  const sitemaps: MetadataRoute.Sitemap = subjects.hits.map((subject) => ({
    url: `${BASE_URL}/subjects/${subject.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: `${BASE_URL}/subjects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...sitemaps,
  ]
}

const getLessonsSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const lessons = await search<IALesson>({ index: 'lessons', hitsPerPage: 1000 })

  const sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/lessons`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  for (let lesson of lessons.hits) {
    sitemaps.push({
      url: `${BASE_URL}/lessons/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    for (let episode of lesson.episodes) {
      sitemaps.push({
        url: `${BASE_URL}/lessons/${lesson.slug}/${episode.episodeId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return sitemaps
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: BASE_URL + '/sign-up',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    },
    {
      url: BASE_URL + '/sign-in',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    },
    {
      url: BASE_URL + '/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: BASE_URL + '/terms-of-service',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: BASE_URL + '/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...(await getLessonsSitemap()),
    ...(await getSubjectsSitemap()),
    ...(await getProSitemap()),
  ]
}
