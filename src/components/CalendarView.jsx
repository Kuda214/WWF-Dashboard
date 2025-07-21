import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localizer from "../utils/localizer";
import React from "react";

// Updated responsive styles
/* Updated responsive styles */
const responsiveStyles = `
  .rbc-calendar {
    font-size: 0.875rem; /* Base font size for better readability */
  }

  .rbc-month-view .rbc-event {
    padding: 4px 6px !important; /* Increased padding for content */
    font-size: 0.75rem !important; /* Base font size for events */
    min-height: 1.75rem !important; /* Increased min-height to prevent cutoff */
    line-height: 1.25rem !important; /* Taller line height for better text fit */
    border-radius: 0.25rem !important;
    overflow: hidden; /* Prevent text overflow */
    text-overflow: ellipsis; /* Add ellipsis for long titles */
    white-space: nowrap; /* Prevent text wrapping to avoid cutoff */
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .rbc-time-slot {
    min-height: 2rem !important; /* Ensure time slots are tall enough */
  }

  .rbc-toolbar {
    font-size: 0.875rem;
    padding: 0.5rem;
  }

  .rbc-toolbar button {
    padding: 0.25rem 0.5rem;
  }

  /* Extra small screens (max-width: 640px) */
  @media (max-width: 640px) {
    .rbc-calendar {
      font-size: 0.75rem;
    }
    .rbc-month-view .rbc-event {
      padding: 2px 4px !important;
      font-size: 0.65rem !important;
      min-height: 1.5rem !important; /* Adjusted for smaller screens */
      line-height: 1.2rem !important;
    }
    .rbc-time-slot {
      min-height: 1.5rem !important;
    }
    .rbc-toolbar {
      font-size: 0.75rem;
      padding: 0.25rem;
    }
  }

  /* Medium screens (641px - 1024px) */
  @media (min-width: 641px) and (max-width: 1024px) {
    .rbc-calendar {
      font-size: 0.85rem;
    }
    .rbc-month-view .rbc-event {
      padding: 3px 5px !important;
      font-size: 0.75rem !important;
      min-height: 1.75rem !important;
      line-height: 1.3rem !important;
    }
    .rbc-time-slot {
      min-height: 1.75rem !important;
    }
    .rbc-toolbar {
      font-size: 0.85rem;
    }
  }

  /* Large screens (min-width: 1025px) */
  @media (min-width: 1025px) {
    .rbc-calendar {
      font-size: 1rem;
    }
    .rbc-month-view .rbc-event {
      padding: 4px 6px !important;
      font-size: 0.85rem !important;
      min-height: 2rem !important; /* Larger height for large screens */
      line-height: 1.5rem !important;
    }
    .rbc-time-slot {
      min-height: 2.25rem !important;
    }
  }

  /* Ensure events in week/day views are not cut off */
  .rbc-time-view .rbc-event {
    padding: 4px 6px !important;
    min-height: 2rem !important;
    font-size: 0.75rem !important;
    line-height: 1.25rem !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.25rem !important;
  }

  /* Handle overlapping events */
  .rbc-event.rbc-event-overlap {
    opacity: 0.85; /* Slightly transparent to show overlap */
    min-height: 1.75rem !important; /* Ensure height for overlapping events */
  }

  /* Optional: Improve tooltip visibility for long titles */
  .rbc-event:hover {
    z-index: 10; /* Ensure hovered events are visible */
  }

`;

// Empty toolbar component
const NoToolbar = () => <></>;

// Default events for July 21, 2025
const defaultEvents = [
  {
    id: 1,
    title: "Project Alpha Deadline",
    start: new Date("2025-07-21T11:00:00+02:00"),
    end: new Date("2025-07-21T12:00:00+02:00"),
    color: "orange",
    tooltip: "Final milestone due today for Project Alpha",
  },
  {
    id: 2,
    title: "Marketing Report Due",
    start: new Date("2025-07-30T09:00:00+02:00"),
    end: new Date("2025-07-30T10:00:00+02:00"),
    color: "blue",
    tooltip: "Submit quarterly marketing performance report",
  },
];

const CalendarView = ({
  events = [],
  onSelectSlot,
  onSelectEvent,
  height = "600px", // Increased default height
  showToolbar = true,
}) => {
  const allEvents = [...defaultEvents, ...events].filter(event => event.start && event.end);

  const eventPropGetter = (event) => {
    const backgroundColor = event.color || "#3B82F6";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "0.25rem",
        border: "none",
        padding: "2px 4px",
        fontSize: "0.75rem sm:0.85rem lg:0.9rem",
        minHeight: "1.25rem sm:1.5rem lg:1.75rem",
        lineHeight: "1.25rem sm:1.5rem lg:1.75rem",
        display: "flex",
        alignItems: "center",
      },
      title: event.tooltip || event.title,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 text-gray-700 min-w-0 min-h-[200px] sm:min-h-[300px] max-h-[70vh]">
      <style>{responsiveStyles}</style>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day"]}
        defaultView="month"
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        style={{ height: height, color: "gray" }}
        components={{
          toolbar: showToolbar ? undefined : NoToolbar,
        }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default CalendarView;