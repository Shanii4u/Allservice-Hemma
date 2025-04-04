'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { BookingCalendar } from '@/components/BookingCalendar';

interface Booking {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
}

export default function CalendarPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const locale = useLocale();

  // Mock data (replace with API calls)
  const initialBookings: Booking[] = [
    {
      id: '1',
      title: 'House Cleaning',
      start: '2024-03-15T10:00:00',
      end: '2024-03-15T12:00:00',
    },
    {
      id: '2',
      title: 'Window Cleaning',
      start: '2024-03-16T14:00:00',
      end: '2024-03-16T16:00:00',
    },
  ];

  const handleEventClick = (info: any) => {
    const booking = initialBookings.find(b => b.id === info.event.id);
    if (booking) {
      // Handle event click
      console.log('Event clicked:', booking);
    }
  };

  const handleDateSelect = (info: any) => {
    // Handle date selection
    console.log('Date selected:', info.startStr, info.endStr);
  };

  if (!session) {
    router.push(`/${locale}/auth/signin`);
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Calendar</h1>
      <BookingCalendar
        events={initialBookings}
        onEventClick={handleEventClick}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
} 