type ApiErrorDetails = {
  code?: string;
  message?: string;
};

const GENERIC_GENERATE_ERROR = 'Something went wrong generating your story. Please try again.';
const GENERIC_CONTACT_ERROR = 'Something went wrong sending your message. Please try again.';

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null;

const asNonEmptyString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : undefined);

export const extractApiErrorDetails = (data: unknown): ApiErrorDetails => {
  const root = asRecord(data);
  const errorRecord = asRecord(root?.error);
  const detailsRecord = asRecord(root?.details);
  const firstError = Array.isArray(root?.errors) ? asRecord(root.errors[0]) : null;

  return {
    code:
      asNonEmptyString(root?.code) ??
      asNonEmptyString(errorRecord?.code) ??
      asNonEmptyString(errorRecord?.type) ??
      asNonEmptyString(detailsRecord?.code) ??
      asNonEmptyString(firstError?.code),
    message:
      asNonEmptyString(root?.message) ??
      asNonEmptyString(errorRecord?.message) ??
      asNonEmptyString(detailsRecord?.message) ??
      asNonEmptyString(firstError?.message),
  };
};

const getApiErrorData = (error: unknown) => {
  const record = asRecord(error);
  return record?.data;
};

export const getGenerateErrorMessage = (error: unknown) => {
  const errorData = getApiErrorData(error);

  if (!errorData) {
    return GENERIC_GENERATE_ERROR;
  }

  const { code, message } = extractApiErrorDetails(errorData);

  switch (code) {
    case 'INVALID_GENERATE_REQUEST':
    case 'INVALID_JSON_BODY':
      return 'Please choose a valid location before generating a story.';
    case 'GPS_OR_CONTEXT_REQUIRED':
      return 'Add a location name or use GPS before generating a story.';
    case 'INVALID_REASON':
      return 'The request could not be processed. Please review your input and try again.';
    default:
      if (message) {
        return message;
      }

      if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
        console.warn('Unhandled backend error shape', errorData);
      }

      return GENERIC_GENERATE_ERROR;
  }
};

export const getContactErrorMessage = (error: unknown) => {
  const errorData = getApiErrorData(error);

  if (!errorData) {
    return GENERIC_CONTACT_ERROR;
  }

  const { code, message } = extractApiErrorDetails(errorData);

  switch (code) {
    case 'INVALID_JSON_BODY':
    case 'INVALID_CONTACT_REQUEST':
      return 'Please review your details and try again.';
    case 'INVALID_EMAIL':
      return 'Please enter a valid email address.';
    case 'INVALID_MESSAGE':
      return 'Please enter a message before sending.';
    default:
      if (message) {
        return message;
      }

      if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
        console.warn('Unhandled backend error shape', errorData);
      }

      return GENERIC_CONTACT_ERROR;
  }
};
