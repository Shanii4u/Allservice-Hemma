'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      
      <div className="prose lg:prose-xl">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">{t('ourStory.title')}</h2>
          <p className="text-gray-600 mb-4">
            Allservice Hemma grundades med visionen att erbjuda högkvalitativa hem- och 
            underhållstjänster till rimliga priser. Vi tror på att skapa långsiktiga 
            relationer med våra kunder genom pålitligt och professionellt arbete.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">{t('ourValues.title')}</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-gray-600">
              <strong>Kvalitet</strong> - Vi strävar efter perfektion i varje uppdrag
            </li>
            <li className="text-gray-600">
              <strong>Pålitlighet</strong> - Vi håller våra löften och levererar i tid
            </li>
            <li className="text-gray-600">
              <strong>Kundservice</strong> - Vi sätter alltid kundens behov först
            </li>
            <li className="text-gray-600">
              <strong>Hållbarhet</strong> - Vi använder miljövänliga produkter och metoder
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">{t('team.title')}</h2>
          <p className="text-gray-600 mb-4">
            Vårt team består av erfarna och dedikerade medarbetare som delar vår passion 
            för kvalitet och kundservice. Alla våra anställda är försäkrade och har 
            genomgått noggrann bakgrundskontroll.
          </p>
        </section>
      </div>
    </div>
  );
} 