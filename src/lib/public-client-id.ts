const CLIENT_ID_COOKIE_NAME = 'pe_client_id';
const CLIENT_ID_HEADER_NAME = 'X-PlaceEcho-Client-Id';
const CLIENT_ID_COOKIE_MAX_AGE_SECONDS = 31_536_000;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isBrowser = () => typeof document !== 'undefined';

const readCookie = (name: string) => {
  if (!isBrowser()) {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const match = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(cookiePrefix));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(cookiePrefix.length));
};

const isValidPublicClientId = (value: string | null) => !!value && UUID_PATTERN.test(value.trim());

const writeCookie = (name: string, value: string) => {
  if (!isBrowser()) {
    return;
  }

  const attributes = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    `Max-Age=${CLIENT_ID_COOKIE_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ];

  if (window.location.protocol === 'https:') {
    attributes.push('Secure');
  }

  document.cookie = attributes.join('; ');
};

export const getOrCreatePublicClientId = () => {
  const existingValue = readCookie(CLIENT_ID_COOKIE_NAME);

  if (isValidPublicClientId(existingValue)) {
    return existingValue!.trim();
  }

  const nextValue = crypto.randomUUID();
  writeCookie(CLIENT_ID_COOKIE_NAME, nextValue);
  return nextValue;
};

export const getPublicClientHeaders = (): Record<string, string> => ({
  [CLIENT_ID_HEADER_NAME]: getOrCreatePublicClientId(),
});
