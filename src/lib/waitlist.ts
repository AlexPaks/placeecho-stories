import { SendAppLinkRequest } from '@/lib/api-types';

type WaitlistFormInput = {
  name: string;
  email: string;
  reason: string;
};

export const buildSendAppLinkPayload = (
  formData: WaitlistFormInput,
  source: string,
  marketingOptIn = false,
): SendAppLinkRequest => {
  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedReason = formData.reason.trim();

  return {
    email: trimmedEmail,
    source,
    marketing_opt_in: marketingOptIn,
    ...(trimmedName ? { name: trimmedName } : {}),
    ...(trimmedReason ? { reason: trimmedReason } : {}),
  };
};
