'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@all-service-hemma/ui';
import { useParams } from 'next/navigation';

export function Navigation() {
  const t = useTranslations('Navigation');
  const { data: session } = useSession();
  const params = useParams();
  const locale = params?.locale as string || 'sv';

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href={`/${locale}`} 
                className="text-xl font-bold text-blue-600 hover:text-blue-700"
              >
                Allservice Hemma
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                {t('services')}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href={`/${locale}/dashboard`}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {t('signOut')}
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/auth/signin`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {t('signIn')}
              </Link>
            )}
            <div className="flex items-center space-x-2 border-l pl-4 ml-4 border-gray-200">
              <Link
                href="/en"
                className={`text-sm font-medium ${locale === 'en' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
              >
                EN
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/sv"
                className={`text-sm font-medium ${locale === 'sv' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
              >
                SV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 