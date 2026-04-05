import {
  ContactRequest,
  ContactResponse,
  FromGpsRequest,
  FromGpsResponse,
  GenerateStoryRequest,
  GenerateStoryResponse,
  GenerateTtsRequest,
  GenerateTtsResponse,
  SendAppLinkRequest,
  SendAppLinkResponse,
} from '@/lib/api-types';
import { APP_CONFIG } from '@/lib/config';
import { getPublicClientHeaders } from '@/lib/public-client-id';

export const BACKEND_ORIGIN = APP_CONFIG.backendOrigin;
export const PUBLIC_API_BASE = APP_CONFIG.publicApiBase;

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type PostJsonOptions = {
  headers?: HeadersInit;
  query?: Record<string, string | undefined>;
};

const isPublicApiPath = (path: string) => `${APP_CONFIG.publicApiPrefix}${path}`.startsWith('/public/v1/');

const parseResponseBody = <TResponse>(text: string) => {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as TResponse;
  } catch {
    return text;
  }
};

const buildUrl = (path: string, query?: Record<string, string | undefined>) => {
  const url = new URL(`${PUBLIC_API_BASE}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
};

async function postJson<TResponse, TPayload extends object>(
  path: string,
  payload: TPayload,
  options?: PostJsonOptions,
): Promise<TResponse> {
  const headers = {
    'Content-Type': 'application/json',
    ...(isPublicApiPath(path) ? getPublicClientHeaders() : {}),
    ...options?.headers,
  };
  const response = await fetch(buildUrl(path, options?.query), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const data = parseResponseBody<TResponse>(text);

  if (!response.ok) {
    throw new ApiError(`API request failed with status ${response.status}`, response.status, data);
  }

  return data as TResponse;
}

export const generateStory = (payload: GenerateStoryRequest) =>
  postJson<GenerateStoryResponse, GenerateStoryRequest>('/stories/generate', payload);

export const generateTts = (payload: GenerateTtsRequest) =>
  postJson<GenerateTtsResponse, GenerateTtsRequest>('/tts/generate', payload);

export const sendAppLink = (payload: SendAppLinkRequest) =>
  postJson<SendAppLinkResponse, SendAppLinkRequest>('/site/send-app-link', payload);

export const sendContactMessage = (payload: ContactRequest) =>
  postJson<ContactResponse, ContactRequest>('/site/contact', payload);

export const getContextFromGps = (payload: FromGpsRequest, language?: string) =>
  postJson<FromGpsResponse, FromGpsRequest>('/context/from-gps', payload, {
    query: language
      ? {
          lang: language,
        }
      : undefined,
    headers: language
      ? {
          'Accept-Language': language,
        }
      : undefined,
  });
