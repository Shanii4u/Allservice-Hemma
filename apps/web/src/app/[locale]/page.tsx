import { useTranslations } from 'next-intl';
import { Button } from '@all-service-hemma/ui';
import { ServiceCard } from '@/components/ServiceCard';

export default function HomePage() {
  const t = useTranslations('Home');

  const services = [
    {
      title: t('services.items.residential.title'),
      description: t('services.items.residential.description'),
    },
    {
      title: t('services.items.commercial.title'),
      description: t('services.items.commercial.description'),
    },
    {
      title: t('services.items.deep.title'),
      description: t('services.items.deep.description'),
    },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Välkommen till Allservice Hemma
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Vi erbjuder professionella städ- och underhållstjänster för ditt hem
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Städtjänster</h2>
          <p className="text-gray-600">
            Professionell städning för hem och kontor
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Trädgårdsarbete</h2>
          <p className="text-gray-600">
            Underhåll och skötsel av din trädgård
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Fastighetsskötsel</h2>
          <p className="text-gray-600">
            Komplett service för din fastighet
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-primary-600 text-white">
        <div className="container py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10">
              <Button
                variant="secondary"
                size="lg"
                className="mr-4"
              >
                {t('hero.bookNow')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
              >
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 