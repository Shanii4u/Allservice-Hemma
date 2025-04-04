'use client';

import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { Navigation } from '@/components/Navigation';
import { useParams } from 'next/navigation';

export function Providers({ children, messages }: { children: React.ReactNode; messages: any }) {
  const params = useParams();
  const locale = params?.locale as string || 'sv';

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navigation />
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
} 