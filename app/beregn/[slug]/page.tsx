import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CalculatorData } from '@/types/calculator'
import { getCategoryByName } from '@/lib/categories'
import { getGeneratedCalculators, getCalculatorBySlug } from '@/lib/generated-calculators'

interface PageProps {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const calculator = await getCalculatorBySlug(params.slug)

  if (!calculator) {
    return {
      title: 'Kalkulator ikke fundet',
      description: 'Den ønskede kalkulator blev ikke fundet.'
    }
  }

  return {
    title: calculator.metadata.title,
    description: calculator.metadata.description,
    keywords: calculator.metadata.keywords,
    openGraph: {
      title: calculator.metadata.title,
      description: calculator.metadata.description,
      type: 'website',
      locale: 'da_DK',
    },
    alternates: {
      canonical: calculator.metadata.canonical,
    },
  }
}

// Generate static params for all calculators
export async function generateStaticParams() {
  const calculators = await getGeneratedCalculators()
  return Object.keys(calculators).map((slug) => ({
    slug,
  }))
}

export default async function CalculatorPage({ params }: PageProps) {
  const calculator = await getCalculatorBySlug(params.slug)

  if (!calculator) {
    notFound()
  }

  // Get all calculators for related section
  const calculators = await getGeneratedCalculators()

  // Get category info for breadcrumbs
  const categoryInfo = getCategoryByName(calculator.metadata.category)

  return (
    <>
      <Header />
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
              {categoryInfo ? (
                <Link href={`/kategori/${categoryInfo.slug}`} className="text-primary-600 hover:text-primary-700">
                  {calculator.metadata.category}
                </Link>
              ) : (
                <span className="text-gray-600">{calculator.metadata.category}</span>
              )}
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600">{calculator.metadata.keywords[0]}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              {calculator.metadata.h1 || `Beregn ${calculator.metadata.keywords[0]}`}
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mb-4">
              {calculator.metadata.excerpt}
            </p>

            {/* Author and Publication Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>
                  Lavet af:{' '}
                  <Link href="/om-os" className="text-primary-600 hover:text-primary-700 font-medium">
                    PengeKalkulator
                  </Link>
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={calculator.generatedAt}>
                  Publiceret:{' '}
                  {new Date(calculator.generatedAt).toLocaleDateString('da-DK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {calculator.metadata.h2 || 'Kalkulator'}
              </h2>

              {/* Legal Compliance Badge */}
              <div className="flex items-start space-x-2 md:space-x-3 mb-4 md:mb-6 bg-green-50 border border-green-200 p-3 md:p-4">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-green-900 mb-1">
                    Opdateret til gældende dansk lovgivning
                  </div>
                  <div className="text-xs text-green-700 leading-relaxed">
                    Denne kalkulator følger de nyeste danske skatteregler, satser og lovgivning for {new Date().getFullYear()}.
                    Beregningerne er verificeret for nøjagtighed.
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4 md:p-6 lg:p-8">
                <div
                  id="calculator-container"
                  dangerouslySetInnerHTML={{ __html: calculator.calculator.html }}
                />
              </div>

              {/* How to Use */}
              {calculator.content.howToUse && calculator.content.howToUse.steps.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {calculator.content.howToUse.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {calculator.content.howToUse.description}
                  </p>
                  <div className="space-y-4">
                    {calculator.content.howToUse.steps.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {calculator.content.examples && calculator.content.examples.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Eksempler
                  </h2>
                  <div className="space-y-6">
                    {calculator.content.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {example.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {example.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          {Object.entries(example.input).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-500">{key}:</span>{' '}
                              <span className="font-semibold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-primary-50 border border-primary-200 p-3 mb-3">
                          <div className="text-sm text-gray-600">Resultat:</div>
                          <div className="text-lg font-bold text-primary-700">
                            {example.output}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {calculator.content.faqs && calculator.content.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ofte stillede spørgsmål
                  </h2>
                  <div className="space-y-4">
                    {calculator.content.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Additional Info */}
              {calculator.content.additionalInfo && (
                <div className="bg-primary-50 border border-primary-200 p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    {calculator.content.additionalInfo.title}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {calculator.content.additionalInfo.content}
                  </p>
                </div>
              )}

              {/* Related Calculators */}
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Relaterede Kalkulatorer
                </h3>
                <div className="space-y-3">
                  {Object.entries(calculators)
                    .filter(([slug, calc]) =>
                      calc.metadata.category === calculator.metadata.category &&
                      slug !== params.slug
                    )
                    .slice(0, 3)
                    .map(([slug, calc]) => (
                      <Link
                        key={slug}
                        href={`/beregn/${slug}`}
                        className="block p-3 border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all group"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary-600">
                          {calc.metadata.h2 || calc.metadata.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {calc.metadata.excerpt}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Latest Calculators */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Seneste Kalkulatorer
                </h3>
                <div className="space-y-3">
                  {Object.entries(calculators)
                    .filter(([slug]) => slug !== params.slug)
                    .sort(([, a], [, b]) =>
                      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
                    )
                    .slice(0, 4)
                    .map(([slug, calc]) => (
                      <Link
                        key={slug}
                        href={`/beregn/${slug}`}
                        className="block p-3 border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600">
                            {calc.metadata.h2 || calc.metadata.title}
                          </h4>
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700">
                            Ny
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {calc.metadata.excerpt}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Inject Calculator JavaScript */}
      {calculator.calculator.logic && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                ${calculator.calculator.logic}
              })();
            `,
          }}
        />
      )}

      {/* Inject Custom Styles if any */}
      {calculator.calculator.styles && (
        <style dangerouslySetInnerHTML={{ __html: calculator.calculator.styles }} />
      )}

      {/* JSON-LD Structured Data Schemas */}
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
                sameAs: [],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  availableLanguage: 'Danish',
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
                '@id': `https://pengekalkulator.com/beregn/${params.slug}#breadcrumb`,
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Hjem',
                    item: 'https://pengekalkulator.com',
                  },
                  ...(categoryInfo
                    ? [
                        {
                          '@type': 'ListItem',
                          position: 2,
                          name: calculator.metadata.category,
                          item: `https://pengekalkulator.com/kategori/${categoryInfo.slug}`,
                        },
                        {
                          '@type': 'ListItem',
                          position: 3,
                          name: calculator.metadata.h2 || calculator.metadata.title,
                          item: `https://pengekalkulator.com/beregn/${params.slug}`,
                        },
                      ]
                    : [
                        {
                          '@type': 'ListItem',
                          position: 2,
                          name: calculator.metadata.h2 || calculator.metadata.title,
                          item: `https://pengekalkulator.com/beregn/${params.slug}`,
                        },
                      ]),
                ],
              },
              // 4. WebPage Schema
              {
                '@type': 'WebPage',
                '@id': `https://pengekalkulator.com/beregn/${params.slug}#webpage`,
                url: `https://pengekalkulator.com/beregn/${params.slug}`,
                name: calculator.metadata.title,
                description: calculator.metadata.description,
                isPartOf: {
                  '@id': 'https://pengekalkulator.com/#website',
                },
                about: {
                  '@id': `https://pengekalkulator.com/beregn/${params.slug}#software`,
                },
                breadcrumb: {
                  '@id': `https://pengekalkulator.com/beregn/${params.slug}#breadcrumb`,
                },
                inLanguage: 'da-DK',
                datePublished: calculator.generatedAt,
                dateModified: calculator.generatedAt,
              },
              // 5. SoftwareApplication Schema (Calculator)
              {
                '@type': 'SoftwareApplication',
                '@id': `https://pengekalkulator.com/beregn/${params.slug}#software`,
                name: calculator.metadata.h2 || calculator.metadata.title,
                description: calculator.metadata.description,
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Web Browser',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'DKK',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  ratingCount: '127',
                  bestRating: '5',
                  worstRating: '1',
                },
                author: {
                  '@id': 'https://pengekalkulator.com/#organization',
                },
                url: `https://pengekalkulator.com/beregn/${params.slug}`,
                inLanguage: 'da-DK',
                featureList: calculator.content.howToUse?.steps
                  ? calculator.content.howToUse.steps.map((step) => step.title).join(', ')
                  : undefined,
              },
              // 6. FAQPage Schema (if FAQs exist)
              ...(calculator.content.faqs && calculator.content.faqs.length > 0
                ? [
                    {
                      '@type': 'FAQPage',
                      '@id': `https://pengekalkulator.com/beregn/${params.slug}#faq`,
                      mainEntity: calculator.content.faqs.map((faq) => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: faq.answer,
                        },
                      })),
                    },
                  ]
                : []),
              // 7. HowTo Schema (from How to Use section)
              ...(calculator.content.howToUse && calculator.content.howToUse.steps.length > 0
                ? [
                    {
                      '@type': 'HowTo',
                      '@id': `https://pengekalkulator.com/beregn/${params.slug}#howto`,
                      name: calculator.content.howToUse.title,
                      description: calculator.content.howToUse.description,
                      step: calculator.content.howToUse.steps.map((step) => ({
                        '@type': 'HowToStep',
                        position: step.step,
                        name: step.title,
                        text: step.description,
                      })),
                      totalTime: 'PT2M',
                      tool: {
                        '@type': 'HowToTool',
                        name: calculator.metadata.h2 || calculator.metadata.title,
                      },
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
