'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button, useToast } from '@all-service-hemma/ui';
import Link from 'next/link';

interface Employee {
  id: string;
  user: {
    name: string;
    email: string;
  };
  department: string;
  startDate: string;
  skills: string | null;
}

export default function EmployeeList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard.employees');
  const params = useParams();
  const locale = params?.locale as string || 'sv';
  const toast = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'ADMIN') {
      router.push(`/${locale}/dashboard`);
      return;
    }

    fetchEmployees();
  }, [session, status, router, locale]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees/list');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.addToast(
        error instanceof Error ? error.message : t('list.error'),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('list.confirmDelete'))) return;

    try {
      const response = await fetch(`/api/employees/list?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      toast.addToast(t('list.deleteSuccess'), 'success');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.addToast(
        error instanceof Error ? error.message : t('list.deleteError'),
        'error'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('list.title')}</h1>
        <Link href={`/${locale}/dashboard/employees/register`}>
          <Button>{t('register.title')}</Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.department')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.startDate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.skills')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('list.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {t(`register.departments.${employee.department}`)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(employee.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {employee.skills || t('list.noSkills')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/${locale}/dashboard/employees/edit/${employee.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    {t('list.edit')}
                  </Link>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t('list.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 