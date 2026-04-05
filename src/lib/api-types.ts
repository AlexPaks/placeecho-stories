export interface GpsCoordinates {
  lat: number;
  lng: number;
}

export interface FromGpsRequest {
  lat: number;
  lng: number;
}

export interface FromGpsResponse {
  placeName?: string | null;
  city?: string | null;
  country?: string | null;
  poi?: string | null;
  rawAddress?: string | null;
  placeKind?: string | null;
  streetName?: string | null;
  streetNumber?: string | null;
  neighborhood?: string | null;
  region?: string | null;
  confidence?: number | null;
  source?: string | null;
}

export interface GenerateStoryRequest {
  context?: {
    place_name?: string;
    city?: string;
    country?: string;
    poi?: string;
    raw_address?: string;
    place_kind?: string;
    street_name?: string;
    street_number?: string;
    neighborhood?: string;
    region?: string;
    confidence?: number;
    source?: string;
  };
  preferences: {
    length: string;
    style: string;
    type: string;
    perspective: string;
    realism: number;
    story_language: string;
    system_language: string;
    poi: string[];
    voice_enabled: boolean;
    voice_speed: number;
    voice_type: string;
    voice_style: string;
    voice_pitch: string;
    narration_emotion: string;
    autoPlayStoryAudio: boolean;
    downloadAudioAfterGeneration: boolean;
  };
  gps?: GpsCoordinates;
  voice_note_text?: string;
  photo_taken_at?: string;
  user_timezone: string;
  another_story: boolean;
}

export interface GeneratedStory {
  id: string;
  title: string;
  summary?: string | null;
  text: string;
  language: string;
  rating?: number | null;
  audio_url?: string | null;
  image_url?: string | null;
  share_url?: string | null;
  voice_note_present?: boolean;
  voice_transcript_original?: string | null;
  voice_transcript_en?: string | null;
  voice_language_detected?: string | null;
}

export interface GenerateStoryResponse {
  story: GeneratedStory;
  providerUsed?: string;
  warningKey?: string | null;
  cached: boolean;
  context?: FromGpsResponse;
  ttsError?: string | null;
  degraded_mode: boolean;
}

export interface GenerateTtsRequest {
  text: string;
  language?: string;
  voiceProfile?: string;
  format?: string;
  provider?: string;
  voice_enabled?: boolean;
  voice_speed?: number;
  voice_type?: string;
  voice_style?: string;
  voice_pitch?: string;
  narration_emotion?: string;
}

export interface GenerateTtsResponse {
  audioUrl: string;
  providerUsed?: string;
  cached?: boolean;
  durationMs?: number;
}

export interface SendAppLinkRequest {
  email: string;
  name?: string;
  source?: string;
  marketing_opt_in?: boolean;
  reason?: string;
}

export interface SendAppLinkResponse {
  ok: boolean;
  queued: boolean;
  contact_id: string | null;
  email_outbox_id: string | null;
  degraded_mode: boolean;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export interface ContactResponse {
  ok: boolean;
  queued: boolean;
  email_outbox_id?: string | null;
  degraded_mode?: boolean;
}
