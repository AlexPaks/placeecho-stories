/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_ORIGIN: string;
  readonly VITE_PUBLIC_API_PREFIX: string;
  readonly VITE_DEV_PORT: string;
  readonly VITE_TTS_PROVIDER: string;
  readonly VITE_TTS_VOICE_PROFILE: string;
  readonly VITE_TTS_FORMAT: string;
  readonly VITE_WAITLIST_SOURCE: string;
  readonly VITE_STORY_DEFAULT_STYLE: string;
  readonly VITE_STORY_DEFAULT_TYPE: string;
  readonly VITE_STORY_DEFAULT_PERSPECTIVE: string;
  readonly VITE_STORY_DEFAULT_REALISM: string;
  readonly VITE_STORY_VOICE_ENABLED: string;
  readonly VITE_STORY_VOICE_SPEED: string;
  readonly VITE_STORY_VOICE_TYPE: string;
  readonly VITE_STORY_VOICE_STYLE: string;
  readonly VITE_STORY_VOICE_PITCH: string;
  readonly VITE_STORY_NARRATION_EMOTION: string;
  readonly VITE_STORY_AUTOPLAY_AUDIO: string;
  readonly VITE_STORY_DOWNLOAD_AUDIO_AFTER_GENERATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
