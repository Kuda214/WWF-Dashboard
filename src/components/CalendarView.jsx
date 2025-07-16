import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localizer from "../utils/localizer";
import React from "react";

// Empty toolbar component to disable built-in toolbar
const NoToolbar = () => <></>;

// Default events
const defaultEvents = [
  {
    id: 1,
    title: "Project Alpha Deadline",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    color: "orange",
    tooltip: "Final milestone due today for Project Alpha",
  },
  {
    id: 2,
    title: "Marketing Report Due",
    start: new Date(new Date().setDate(new Date().getDate() + 9)), // tomorrow
    end: new Date(new Date().setDate(new Date().getDate() +9)),
    color: "blue",
    tooltip: "Submit quarterly marketing performance report",
  },
];

const CalendarView = ({
  events = [],
  onSelectSlot,
  onSelectEvent,
  height = "69vh",
  showToolbar = true,
}) => {
  const allEvents = [...defaultEvents, ...events];

  const eventPropGetter = (event) => {
    const backgroundColor = event.color || "#3B82F6"; // default blue
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
        padding: "2px 6px",
        fontSize: "0.85rem",
      },
      title: event.tooltip || event.title,
    };
  };

  return (
    <div
      className="bg-white dark:bg-white rounded-lg shadow-md p-4 text-lg text-gray-700"
      style={{ height }}
    >
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
        style={{ height: "100%", color: "gray" }}
        components={{
          toolbar: showToolbar ? undefined : NoToolbar,
        }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default CalendarView;
