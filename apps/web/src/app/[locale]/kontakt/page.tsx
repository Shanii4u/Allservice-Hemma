'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('contactInfo.title')}</h2>
          <div className="space-y-4">
            <p className="flex items-center">
              <span className="mr-2">📍</span>
              <span>Storgatan 123<br />123 45 Stockholm</span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">📞</span>
              <span>+46 123 456 789</span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">✉️</span>
              <span>info@allservicehemma.se</span>
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">{t('openingHours.title')}</h3>
          <div className="space-y-2">
            <p>Måndag - Fredag: 08:00 - 17:00</p>
            <p>Lördag: 10:00 - 15:00</p>
            <p>Söndag: Stängt</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('contactForm.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contactForm.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contactForm.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {t('contactForm.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('contactForm.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 