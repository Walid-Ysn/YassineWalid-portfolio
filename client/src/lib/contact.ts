const CONTACT_EMAIL = "yassine.walid40@gmail.com";

export function getGmailComposeUrl({
  subject = "",
  body = "",
}: {
  subject?: string;
  body?: string;
} = {}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    ...(subject ? { su: subject } : {}),
    ...(body ? { body } : {}),
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export { CONTACT_EMAIL };
