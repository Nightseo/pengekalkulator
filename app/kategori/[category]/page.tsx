import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getGeneratedCalculators, getLatestCalculators } from '@/lib/generated-calculators'
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/categories'
import { keywordsConfig } from '@/scripts/keywords-config'

interface PageProps {
  params: { category: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryInfo = getCategoryBySlug(params.category)

  if (!categoryInfo) {
    return {
      title: 'Kategori ikke fundet',
      description: 'Den ønskede kategori blev ikke fundet.'
    }
  }

  return {
    title: categoryInfo.metaTitle,
    description: categoryInfo.metaDescription,
    openGraph: {
      title: categoryInfo.metaTitle,
      description: categoryInfo.metaDescription,
      type: 'website',
      locale: 'da_DK',
    },
    alternates: {
      canonical: `https://pengekalkulator.com/kategori/${params.category}`,
    },
  }
}

// Generate static params for all categories
export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({
    category: slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const categoryInfo = getCategoryBySlug(params.category)

  if (!categoryInfo) {
    notFound()
  }

  // Get all generated calculators
  const calculatorsData = await getGeneratedCalculators()
  const latestCalculators = await getLatestCalculators(5)

  // Filter calculators by category
  const categoryCalculators = Object.entries(calculatorsData).filter(([slug, calc]) => {
    // Find the keyword config for this slug
    const config = keywordsConfig.find(k => k.slug === slug)
    return config && config.category === categoryInfo.name
  })

  return (
    <>
      <Header latestCalculators={latestCalculators} />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                Hjem
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600">Kategorier</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600">{categoryInfo.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl">
              {categoryInfo.description}
            </p>
            <div className="bg-gray-50 border border-gray-200 p-6 max-w-4xl">
              <p className="text-gray-700 leading-relaxed">
                {categoryInfo.seoText}
              </p>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {categoryCalculators.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Kalkulatorer i {categoryInfo.name}
                </h2>
                <p className="text-gray-600">
                  {categoryCalculators.length} {categoryCalculators.length === 1 ? 'kalkulator' : 'kalkulatorer'} tilgængelig
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCalculators.map(([slug, calculator]) => (
                  <Link
                    key={slug}
                    href={`/beregn/${slug}`}
                    className="bg-white border border-gray-200 p-8 hover:border-primary-600 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {calculator.metadata.h2 || calculator.metadata.title}
                      </h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {calculator.metadata.excerpt}
                    </p>
                    <div className="inline-flex items-center text-primary-600 text-sm font-semibold">
                      <span>Brug kalkulator</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Andre tilgængelige kalkulatorer
                </h2>
                <p className="text-gray-600">
                  Der er endnu ingen kalkulatorer i {categoryInfo.name}. Se andre tilgængelige kalkulatorer:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(calculatorsData).slice(0, 6).map(([slug, calculator]) => (
                  <Link
                    key={slug}
                    href={`/beregn/${slug}`}
                    className="bg-white border border-gray-200 p-8 hover:border-primary-600 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {calculator.metadata.h2 || calculator.metadata.title}
                      </h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {calculator.metadata.excerpt}
                    </p>
                    <div className="inline-flex items-center text-primary-600 text-sm font-semibold">
                      <span>Brug kalkulator</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* All Categories */}
        <div className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Andre kategorier
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getAllCategorySlugs()
                .filter(slug => slug !== params.category)
                .map((slug) => {
                  const cat = getCategoryBySlug(slug)
                  if (!cat) return null
                  return (
                    <Link
                      key={slug}
                      href={`/kategori/${slug}`}
                      className="bg-white border border-gray-200 p-4 hover:border-primary-600 hover:shadow-sm transition-all"
                    >
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {cat.name}
                      </h3>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* JSON-LD Structured Data Schema for Category Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              // 1. Organization Schema
              {
                '@type': 'Organization',
                '@id': 'https://pengekalkulator.com/#organization',
                name: 'PengeKalkulator',
                url: 'https://pengekalkulator.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://pengekalkulator.com/icon.png',
                },
              },
              // 2. WebSite Schema
              {
                '@type': 'WebSite',
                '@id': 'https://pengekalkulator.com/#website',
                url: 'https://pengekalkulator.com',
                name: 'PengeKalkulator',
                publisher: {
                  '@id': 'https://pengekalkulator.com/#organization',
                },
                inLanguage: 'da-DK',
              },
              // 3. BreadcrumbList Schema
              {
                '@type': 'BreadcrumbList',
                '@id': `https://pengekalkulator.com/kategori/${params.category}#breadcrumb`,
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Hjem',
                    item: 'https://pengekalkulator.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Kategorier',
                    item: 'https://pengekalkulator.com/#kategorier',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: categoryInfo.name,
                    item: `https://pengekalkulator.com/kategori/${params.category}`,
                  },
                ],
              },
              // 4. CollectionPage Schema
              {
                '@type': 'CollectionPage',
                '@id': `https://pengekalkulator.com/kategori/${params.category}#webpage`,
                url: `https://pengekalkulator.com/kategori/${params.category}`,
                name: categoryInfo.metaTitle,
                description: categoryInfo.metaDescription,
                isPartOf: {
                  '@id': 'https://pengekalkulator.com/#website',
                },
                breadcrumb: {
                  '@id': `https://pengekalkulator.com/kategori/${params.category}#breadcrumb`,
                },
                inLanguage: 'da-DK',
                about: {
                  '@type': 'Thing',
                  name: categoryInfo.name,
                  description: categoryInfo.description,
                },
              },
              // 5. ItemList Schema (Calculators in this category)
              ...(categoryCalculators.length > 0
                ? [
                    {
                      '@type': 'ItemList',
                      '@id': `https://pengekalkulator.com/kategori/${params.category}#calculators`,
                      name: `${categoryInfo.name} Kalkulatorer`,
                      description: categoryInfo.description,
                      numberOfItems: categoryCalculators.length,
                      itemListElement: categoryCalculators.map(([slug, calc], index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        item: {
                          '@type': 'SoftwareApplication',
                          name: calc.metadata.h2 || calc.metadata.title,
                          description: calc.metadata.excerpt,
                          url: `https://pengekalkulator.com/beregn/${slug}`,
                          applicationCategory: 'FinanceApplication',
                          operatingSystem: 'Web Browser',
                          offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'DKK',
                          },
                        },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />
    </>
  )
}
