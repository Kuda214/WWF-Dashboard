// src/utils/localizer.js or localizer.jsx

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale"; // ✅ ES module import
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default localizer;
