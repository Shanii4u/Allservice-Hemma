import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from '../i18n';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, defaultLocale });

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Europe/Stockholm',
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
      strong: (chunks) => chunks
    },
    locale
  };
}); 