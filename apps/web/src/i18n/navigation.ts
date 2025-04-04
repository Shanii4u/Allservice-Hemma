import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'sv'] as const;
export const defaultLocale = 'sv';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, defaultLocale });

export async function requestLocale() {
  return defaultLocale;
} 