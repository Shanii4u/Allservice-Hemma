import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Booking {
  id: string;
  customerName: string;
  serviceType: string;
  startTime: Date;
  endTime: Date;
}

interface CalendarProps {
  bookings: Booking[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const timeSlots = Array.from({ length: 10 }, (_, i) => i + 8); // 8am to 5pm

export const Calendar: React.FC<CalendarProps> = ({
  bookings,
  selectedDate,
  onDateChange,
}) => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="flex flex-col w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center p-4">
        <button onClick={() => onDateChange(addDays(selectedDate, -7))}>
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h2>
        <button onClick={() => onDateChange(addDays(selectedDate, 7))}>
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="border-r">
          <div className="h-12"></div> {/* Header spacer */}
          {timeSlots.map((hour) => (
            <div key={hour} className="h-20 border-t p-2 text-sm">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day) => (
          <div key={day.toString()} className="flex-1">
            <div className="h-12 border-b p-2 text-center">
              <div className="font-semibold">
                {format(day, 'EEE', { locale: sv })}
              </div>
              <div>{format(day, 'd/M')}</div>
            </div>
            {timeSlots.map((hour) => (
              <div
                key={`${day}-${hour}`}
                className="h-20 border-t relative"
              >
                {/* Bookings will be rendered here */}
                {bookings
                  .filter((booking) => {
                    const bookingDate = booking.startTime;
                    return (
                      format(bookingDate, 'yyyy-MM-dd') ===
                      format(day, 'yyyy-MM-dd')
                    );
                  })
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="absolute bg-blue-600 text-white p-2 rounded m-1"
                      style={{
                        top: '0',
                        height: '95%',
                        width: '95%',
                      }}
                    >
                      <div className="text-sm font-semibold">
                        {booking.serviceType}
                      </div>
                      <div className="text-xs">{booking.customerName}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 