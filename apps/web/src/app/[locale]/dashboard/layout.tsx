'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@all-service-hemma/ui';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const params = useParams();
  const locale = params?.locale as string || 'sv';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    router.push(`/${locale}/auth/signin`);
    return null;
  }

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
              {t('title')}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? '←' : '→'}
            </Button>
          </div>

          <nav className="space-y-2">
            {/* Bookings Section */}
            <div className="mb-4">
              <h3 className={`text-sm font-semibold text-gray-500 mb-2 ${!isSidebarOpen && 'hidden'}`}>
                {t('bookings.title')}
              </h3>
              <div className="space-y-1">
                <Link href={`/${locale}/dashboard/bookings/calendar`}>
                  <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                    {isSidebarOpen ? t('bookings.viewCalendar') : '📅'}
                  </Button>
                </Link>
                <Link href={`/${locale}/dashboard/bookings/new`}>
                  <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                    {isSidebarOpen ? t('bookings.createNew') : '➕'}
                  </Button>
                </Link>
                <Link href={`/${locale}/dashboard/bookings/list`}>
                  <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                    {isSidebarOpen ? t('bookings.manageExisting') : '📋'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Admin Only Sections */}
            {isAdmin && (
              <>
                {/* Customers Section */}
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold text-gray-500 mb-2 ${!isSidebarOpen && 'hidden'}`}>
                    {t('customers.title')}
                  </h3>
                  <div className="space-y-1">
                    <Link href={`/${locale}/dashboard/customers/register`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('customers.register') : '👥'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/customers/list`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('customers.manage') : '📋'}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Employees Section */}
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold text-gray-500 mb-2 ${!isSidebarOpen && 'hidden'}`}>
                    {t('employees.title')}
                  </h3>
                  <div className="space-y-1">
                    <Link href={`/${locale}/dashboard/employees/register`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('employees.register') : '👤'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/employees/list`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('employees.manage') : '📋'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/employees/schedule`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('employees.schedule') : '📅'}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Work Section */}
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold text-gray-500 mb-2 ${!isSidebarOpen && 'hidden'}`}>
                    {t('work.title')}
                  </h3>
                  <div className="space-y-1">
                    <Link href={`/${locale}/dashboard/work/assign`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('work.assign') : '📝'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/work/status`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('work.status') : '📊'}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Reports Section */}
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold text-gray-500 mb-2 ${!isSidebarOpen && 'hidden'}`}>
                    {t('reports.title')}
                  </h3>
                  <div className="space-y-1">
                    <Link href={`/${locale}/dashboard/reports/bookings`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('reports.bookings') : '📊'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/reports/employees`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('reports.employees') : '👥'}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/dashboard/reports/revenue`}>
                      <Button variant="ghost" className={`w-full justify-start ${!isSidebarOpen && 'justify-center'}`}>
                        {isSidebarOpen ? t('reports.revenue') : '💰'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 