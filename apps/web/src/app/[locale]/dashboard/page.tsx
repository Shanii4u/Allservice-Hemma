'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@all-service-hemma/ui';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const params = useParams();
  const locale = params?.locale as string || 'sv';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin`);
    }
  }, [status, router, locale]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('welcome', { name: session.user.name || 'User' })}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Booking Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('bookings.title')}</h2>
          <div className="space-y-4">
            <Link href={`/${locale}/dashboard/bookings/calendar`}>
              <Button variant="outline" className="w-full justify-start">
                {t('bookings.viewCalendar')}
              </Button>
            </Link>
            <Link href={`/${locale}/dashboard/bookings/new`}>
              <Button variant="outline" className="w-full justify-start">
                {t('bookings.createNew')}
              </Button>
            </Link>
            <Link href={`/${locale}/dashboard/bookings/list`}>
              <Button variant="outline" className="w-full justify-start">
                {t('bookings.manageExisting')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Customer Management */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('customers.title')}</h2>
            <div className="space-y-4">
              <Link href={`/${locale}/dashboard/customers/register`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('customers.register')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/customers/list`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('customers.manage')}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Employee Management */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('employees.title')}</h2>
            <div className="space-y-4">
              <Link href={`/${locale}/dashboard/employees/register`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('employees.register')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/employees/list`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('employees.manage')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/employees/schedule`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('employees.schedule')}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Work Assignment */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('work.title')}</h2>
            <div className="space-y-4">
              <Link href={`/${locale}/dashboard/work/assign`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('work.assign')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/work/status`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('work.status')}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Reports */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('reports.title')}</h2>
            <div className="space-y-4">
              <Link href={`/${locale}/dashboard/reports/bookings`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('reports.bookings')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/reports/employees`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('reports.employees')}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/reports/revenue`}>
                <Button variant="outline" className="w-full justify-start">
                  {t('reports.revenue')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 