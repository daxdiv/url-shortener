export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const isValidUrl = (s: string) => {
  let url;

  try {
    url = new URL(s);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const formatDate = (date: Date) => {
  const locale = navigator.language;
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return formatter.format(date);
};
