import { format, isToday, isYesterday } from "date-fns";

export function formatTableDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "MMM dd");
}
