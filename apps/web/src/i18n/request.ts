import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './navigation';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
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