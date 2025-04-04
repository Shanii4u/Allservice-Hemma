'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Footer() {
  const t = useTranslations('Footer');
  const params = useParams();
  const locale = params?.locale as string || 'sv';

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-gray-900">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-gray-900">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-gray-900">
                  {t('cleaning')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-gray-900">
                  {t('maintenance')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-gray-900">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-600 hover:text-gray-900">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Allservice Hemma i Järfälla AB</li>
              <li>info@allservicehemma.se</li>
              <li>070-123 45 67</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Allservice Hemma i Järfälla AB. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 