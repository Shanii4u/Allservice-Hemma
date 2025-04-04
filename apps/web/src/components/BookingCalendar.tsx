'use client';

import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '@/styles/fullcalendar.module.css';

export interface BookingCalendarProps {
  events: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
  }>;
  onEventClick?: (info: any) => void;
  onDateSelect?: (info: any) => void;
}

export function BookingCalendar({ events, onEventClick, onDateSelect }: BookingCalendarProps) {
  return (
    <div className={`h-[600px] w-full ${styles.calendar}`}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={onEventClick}
        selectable={true}
        select={onDateSelect}
        editable={true}
        dayMaxEvents={true}
        timeZone="Europe/Stockholm"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
      />
    </div>
  );
} 