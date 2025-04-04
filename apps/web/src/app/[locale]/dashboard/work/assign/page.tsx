'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button, useToast } from '@all-service-hemma/ui';

export default function WorkAssign() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard.work');
  const params = useParams();
  const locale = params?.locale as string || 'sv';
  const toast = useToast();

  const [formData, setFormData] = useState({
    employeeId: '',
    taskType: '',
    customerId: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    priority: 'normal',
  });

  // Mock data (replace with API calls)
  const employees = [
    { id: '1', name: 'Employee 1' },
    { id: '2', name: 'Employee 2' },
  ];

  const customers = [
    { id: '1', name: 'Customer 1' },
    { id: '2', name: 'Customer 2' },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    router.push(`/${locale}/dashboard`);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/work/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
          startTime: new Date(`${formData.date}T${formData.startTime}`).toISOString(),
          endTime: new Date(`${formData.date}T${formData.endTime}`).toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to assign work');
      }

      toast.addToast(t('assign.success'), 'success');
      router.push(`/${locale}/dashboard/work/status`);
      router.refresh();
    } catch (error) {
      console.error('Work assignment error:', error);
      toast.addToast(
        error instanceof Error ? error.message : t('assign.error'),
        'error'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('assign.title')}</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
              {t('assign.employee')}
            </label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">{t('assign.selectEmployee')}</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerId">
              {t('assign.customer')}
            </label>
            <select
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">{t('assign.selectCustomer')}</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskType">
              {t('assign.taskType')}
            </label>
            <select
              id="taskType"
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">{t('assign.selectTaskType')}</option>
              <option value="cleaning">{t('assign.taskTypes.cleaning')}</option>
              <option value="maintenance">{t('assign.taskTypes.maintenance')}</option>
              <option value="gardening">{t('assign.taskTypes.gardening')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                {t('assign.date')}
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                {t('assign.priority')}
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="low">{t('assign.priorities.low')}</option>
                <option value="normal">{t('assign.priorities.normal')}</option>
                <option value="high">{t('assign.priorities.high')}</option>
                <option value="urgent">{t('assign.priorities.urgent')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                {t('assign.startTime')}
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                {t('assign.endTime')}
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              {t('assign.description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit">
              {t('assign.submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 