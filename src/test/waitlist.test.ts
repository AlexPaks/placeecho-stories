import { describe, expect, it } from 'vitest';

import { buildSendAppLinkPayload } from '@/lib/waitlist';

describe('buildSendAppLinkPayload', () => {
  it('supports email-only submission', () => {
    expect(
      buildSendAppLinkPayload(
        {
          name: '   ',
          email: ' user@example.com ',
          reason: '   ',
        },
        'landing_page',
      ),
    ).toEqual({
      email: 'user@example.com',
      source: 'landing_page',
      marketing_opt_in: false,
    });
  });

  it('includes trimmed optional fields when provided', () => {
    expect(
      buildSendAppLinkPayload(
        {
          name: ' Alex ',
          email: ' user@example.com ',
          reason: ' clicked hero CTA after reading pricing ',
        },
        'landing_page',
        true,
      ),
    ).toEqual({
      email: 'user@example.com',
      name: 'Alex',
      source: 'landing_page',
      marketing_opt_in: true,
      reason: 'clicked hero CTA after reading pricing',
    });
  });
});
