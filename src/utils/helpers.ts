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
