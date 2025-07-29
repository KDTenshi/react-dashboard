export const getDateString = (timestamp: number, format: "short" | "long" = "short") => {
  const date = new Date(timestamp);

  const parameters: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: format === "short" ? "2-digit" : "long",
    year: format === "short" ? "2-digit" : "numeric",
  };

  return date.toLocaleDateString("en-GB", parameters);
};
