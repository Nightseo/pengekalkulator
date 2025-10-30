import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getGeneratedCalculators, getLatestCalculators } from '@/lib/generated-calculators'
import { categories } from '@/lib/categories'

export default async function Home() {
  const calculatorsData = await getGeneratedCalculators()
  const latestCalculators = await getLatestCalculators(5)
  return (
    <>
      <Header latestCalculators={latestCalculators} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-white border-b border-gray-200 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-white opacity-60"></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(209 213 219 / 0.3) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">Professionelle beregningsværktøjer til Danmark</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Præcise økonomiske beregninger
                <span className="text-primary-600"> til din virksomhed</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-2xl">
                Professionelle kalkulatorer til løn, skat, procenter og forretningsberegninger.
                Altid opdateret med gældende dansk lovgivning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#kalkulatorer" className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all">
                  <span>Udforsk kalkulatorer</span>
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium hover:border-primary-600 hover:text-primary-600 transition-all">
                  Læs mere
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-primary-600">18+</div>
                  <div className="text-sm text-gray-600 mt-1">Kalkulatorer</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Gratis</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">DK</div>
                  <div className="text-sm text-gray-600 mt-1">Lovgivning</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hvorfor vælge PengeKalkulator?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professionelle værktøjer designet til danske virksomheder og privatpersoner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 p-8 hover:border-primary-600 transition-all group">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hurtig & Præcis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Få øjeblikkelige og præcise resultater med vores optimerede beregningsalgoritmer.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-8 hover:border-primary-600 transition-all group">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dansk Lovgivning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Alle beregninger følger gældende danske regler og opdateres løbende.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-8 hover:border-primary-600 transition-all group">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Gratis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ingen skjulte gebyrer, ingen registrering. Professionelle værktøjer helt gratis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Udforsk efter kategori</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find den rette kalkulator til dit behov i vores organiserede kategorier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(categories).map((category) => (
                <Link
                  key={category.slug}
                  href={`/kategori/${category.slug}`}
                  className="bg-white border-2 border-gray-200 p-6 hover:border-primary-600 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>Se kalkulatorer</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="kalkulatorer" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Alle beregningsværktøjer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {Object.keys(calculatorsData).length} professionelle kalkulatorer klar til brug. Vælg den du har brug for.
              </p>
            </div>

            {Object.keys(calculatorsData).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(calculatorsData).map(([slug, calculator]) => (
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
            ) : (
              <div className="text-center py-12 bg-gray-50 border border-gray-200">
                <p className="text-gray-600">Ingen kalkulatorer er genereret endnu.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px'}}></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Få præcise økonomiske beregninger på sekunder
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Professionelle værktøjer der følger dansk lovgivning. Start med at bruge en kalkulator nu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#kalkulatorer" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-medium hover:bg-gray-100 transition-all">
                <span>Vælg kalkulator</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD Structured Data Schema for Home Page */}
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
                  width: 512,
                  height: 512,
                },
                description: 'Professionelle beregningsværktøjer til danske virksomheder og privatpersoner',
                sameAs: [],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  availableLanguage: 'Danish',
                },
              },
              // 2. WebSite Schema with SearchAction
              {
                '@type': 'WebSite',
                '@id': 'https://pengekalkulator.com/#website',
                url: 'https://pengekalkulator.com',
                name: 'PengeKalkulator',
                description: 'Omfattende samling af gratis online kalkulatorer til forretning, økonomi og finans',
                publisher: {
                  '@id': 'https://pengekalkulator.com/#organization',
                },
                inLanguage: 'da-DK',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://pengekalkulator.com/?s={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              // 3. WebPage Schema
              {
                '@type': 'WebPage',
                '@id': 'https://pengekalkulator.com/#webpage',
                url: 'https://pengekalkulator.com',
                name: 'PengeKalkulator - Gratis Beregningsværktøjer til Forretning og Økonomi',
                description: 'Omfattende samling af gratis online kalkulatorer til forretning, økonomi og finans. Hurtige, præcise beregninger for danske virksomheder og privatpersoner.',
                isPartOf: {
                  '@id': 'https://pengekalkulator.com/#website',
                },
                about: {
                  '@id': 'https://pengekalkulator.com/#organization',
                },
                inLanguage: 'da-DK',
              },
              // 4. ItemList Schema (List of Calculators)
              {
                '@type': 'ItemList',
                '@id': 'https://pengekalkulator.com/#calculators',
                name: 'Kalkulatorer',
                description: 'Samling af professionelle beregningsværktøjer',
                numberOfItems: Object.keys(calculatorsData).length,
                itemListElement: Object.entries(calculatorsData)
                  .slice(0, 10)
                  .map(([slug, calc], index) => ({
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
            ],
          }),
        }}
      />
    </>
  )
}
