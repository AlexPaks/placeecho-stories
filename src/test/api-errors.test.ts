import { describe, expect, it } from 'vitest';

import { extractApiErrorDetails, getGenerateErrorMessage } from '@/lib/api-errors';

describe('extractApiErrorDetails', () => {
  it('reads the code from multiple backend shapes', () => {
    expect(extractApiErrorDetails({ code: 'INVALID_GENERATE_REQUEST' }).code).toBe('INVALID_GENERATE_REQUEST');
    expect(extractApiErrorDetails({ error: { code: 'GPS_OR_CONTEXT_REQUIRED' } }).code).toBe('GPS_OR_CONTEXT_REQUIRED');
    expect(extractApiErrorDetails({ error: { type: 'INVALID_JSON_BODY' } }).code).toBe('INVALID_JSON_BODY');
    expect(extractApiErrorDetails({ details: { code: 'INVALID_REASON' } }).code).toBe('INVALID_REASON');
    expect(extractApiErrorDetails({ errors: [{ code: 'INVALID_GENERATE_REQUEST' }] }).code).toBe('INVALID_GENERATE_REQUEST');
  });

  it('reads fallback messages when no known code exists', () => {
    expect(extractApiErrorDetails({ message: 'Readable backend message' }).message).toBe('Readable backend message');
    expect(extractApiErrorDetails({ errors: [{ message: 'Nested readable message' }] }).message).toBe('Nested readable message');
  });
});

describe('getGenerateErrorMessage', () => {
  it('maps known validation codes to user-friendly messages', () => {
    expect(getGenerateErrorMessage({ data: { code: 'INVALID_GENERATE_REQUEST' } })).toBe(
      'Please choose a valid location before generating a story.',
    );
    expect(getGenerateErrorMessage({ data: { error: { code: 'GPS_OR_CONTEXT_REQUIRED' } } })).toBe(
      'Add a location name or use GPS before generating a story.',
    );
  });

  it('falls back to backend messages when a code is not available', () => {
    expect(getGenerateErrorMessage({ data: { message: 'Context is missing a place name.' } })).toBe(
      'Context is missing a place name.',
    );
  });

  it('returns a generic message for unknown shapes', () => {
    expect(getGenerateErrorMessage({ data: { unexpected: true } })).toBe(
      'Something went wrong generating your story. Please try again.',
    );
  });
});
