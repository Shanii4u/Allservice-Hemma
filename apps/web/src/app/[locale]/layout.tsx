'use client';

import '../globals.css';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import Link from 'next/link';
import { ToastProvider } from '@all-service-hemma/ui';
import { SessionProvider } from 'next-auth/react';
import { useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

// Define supported locales
const locales = ['sv', 'en'];

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Stockholm">
          <SessionProvider>
            <ToastProvider>
              <header className="header">
                <nav className="container py-4">
                  <div className="flex items-center justify-between">
                    <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
                      Allservice Hemma
                    </Link>
                    <div className="flex items-center space-x-8">
                      <Link href={`/${locale}/tjanster`} className="nav-link">
                        Tjänster
                      </Link>
                      <Link href={`/${locale}/om-oss`} className="nav-link">
                        Om oss
                      </Link>
                      <Link href={`/${locale}/kontakt`} className="nav-link">
                        Kontakt
                      </Link>
                      <Link href={`/${locale}/auth/signin`} className="btn-primary">
                        Logga in
                      </Link>
                    </div>
                  </div>
                </nav>
              </header>

              <main className="flex-grow container py-8">
                {children}
              </main>

              <footer className="footer py-8">
                <div className="container">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Allservice Hemma</h3>
                      <p className="text-gray-600">
                        Professional cleaning and maintenance services for your home.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                      <p className="text-gray-600">
                        Email: info@allservicehemma.se<br />
                        Tel: +46 123 456 789
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Följ oss</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="nav-link">Facebook</a>
                        <a href="#" className="nav-link">Instagram</a>
                        <a href="#" className="nav-link">LinkedIn</a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                    © {new Date().getFullYear()} Allservice Hemma. Alla rättigheter förbehållna.
                  </div>
                </div>
              </footer>
            </ToastProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 