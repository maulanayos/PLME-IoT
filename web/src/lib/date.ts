export const formatDate = (date: Date, location = "id-ID", fallback = "-") => {
  if (!date) return fallback;
  return date.toLocaleDateString(location, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  });
};

export const formatDateShort = (
  date: Date,
  location = "id-ID",
  fallback = "-"
) => {
  if (!date) return fallback;
  return date.toLocaleDateString(location, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  });
};

export const formatDateTimeShort = (
  date: Date,
  location = "id-ID",
  fallback = "-"
) => {
  if (!date) return fallback;
  return date.toLocaleDateString(location, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "Asia/Jakarta",
  });
};


export const formatDateTime = (
  date: Date,
  location = "id-ID",
  fallback = "-"
) => {
  if (!date) return fallback;
  return date.toLocaleDateString(location, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

