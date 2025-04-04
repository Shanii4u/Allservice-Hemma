'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button, useToast } from '@all-service-hemma/ui';
import Link from 'next/link';

interface WorkAssignment {
  id: string;
  employee: {
    user: {
      name: string;
      email: string;
    };
  };
  customer: {
    user: {
      name: string;
      email: string;
    };
  };
  taskType: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  priority: string;
  status: string;
}

export default function WorkStatus() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard.work');
  const params = useParams();
  const locale = params?.locale as string || 'sv';
  const toast = useToast();
  const [assignments, setAssignments] = useState<WorkAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'ADMIN') {
      router.push(`/${locale}/dashboard`);
      return;
    }

    fetchAssignments();
  }, [session, status, router, locale]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/work/status');
      if (!response.ok) {
        throw new Error('Failed to fetch work assignments');
      }
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching work assignments:', error);
      toast.addToast(
        error instanceof Error ? error.message : t('status.error'),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/work/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update work assignment status');
      }

      toast.addToast(t('status.updateSuccess'), 'success');
      fetchAssignments();
    } catch (error) {
      console.error('Error updating work assignment:', error);
      toast.addToast(
        error instanceof Error ? error.message : t('status.updateError'),
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
        <h1 className="text-2xl font-bold">{t('status.title')}</h1>
        <Link href={`/${locale}/dashboard/work/assign`}>
          <Button>{t('assign.title')}</Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.employee')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.taskType')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.time')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.priority')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.employee.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.customer.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {t(`assign.taskTypes.${assignment.taskType}`)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(assignment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(assignment.startTime).toLocaleTimeString()} - {new Date(assignment.endTime).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                    assignment.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    assignment.priority === 'NORMAL' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {t(`assign.priorities.${assignment.priority.toLowerCase()}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={assignment.status}
                    onChange={(e) => handleStatusChange(assignment.id, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="PENDING">{t('status.statuses.pending')}</option>
                    <option value="IN_PROGRESS">{t('status.statuses.inProgress')}</option>
                    <option value="COMPLETED">{t('status.statuses.completed')}</option>
                    <option value="CANCELLED">{t('status.statuses.cancelled')}</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => {
                      const el = document.createElement('textarea');
                      el.value = assignment.description;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);
                      toast.addToast(t('status.descriptionCopied'), 'success');
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {t('status.viewDescription')}
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