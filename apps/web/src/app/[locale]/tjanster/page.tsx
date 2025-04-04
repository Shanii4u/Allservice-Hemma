'use client';

import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('Services');

  const services = [
    {
      title: 'Städning',
      description: 'Professionell städservice för hem och kontor',
      icon: '🧹',
    },
    {
      title: 'Trädgårdsarbete',
      description: 'Underhåll och skötsel av trädgårdar',
      icon: '🌿',
    },
    {
      title: 'Renovering',
      description: 'Mindre renoveringar och reparationer',
      icon: '🔨',
    },
    {
      title: 'Fönsterputsning',
      description: 'Professionell fönsterputsning',
      icon: '🪟',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 