import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['sv', 'en'] as const;
export const defaultLocale = 'sv' as const;
export const defaultTimeZone = 'Europe/Stockholm';

export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export default async function config({ locale }: { locale: string }) {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: defaultTimeZone,
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      }
    },
    defaultTranslationValues: {
      globalString: 'Global string'
    },
    onError(error: any) {
      if (error.code === 'MISSING_MESSAGE') {
        console.warn('Missing message:', error.message);
        return error.key;
      }
      throw error;
    },
    getMessageFallback({ key, namespace }: { key: string; namespace?: string }) {
      return `${namespace}.${key}`;
    }
  };
} 