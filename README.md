# PlaceEcho Public Frontend

PlaceEcho is a public-facing web app for location-based storytelling. This frontend powers the marketing site, interactive story demo, waitlist flow, contact page, and supporting legal and informational pages.

## Features

- Marketing homepage with hero, feature, gallery, trust, demo, and waitlist sections
- Interactive story demo with GPS-aware context, story generation, and audio playback
- Public waitlist signup flow
- Contact page with backend-driven message submission
- Localized content with English and Hebrew support
- About, FAQ, Privacy, Terms, and Contact routes

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Local Development

1. Install dependencies:

```sh
npm install
```

2. Copy the example environment file and adjust values as needed:

```sh
cp .env.example .env.development
```

3. Start the development server:

```sh
npm run dev
```

The local dev port is environment-driven through `VITE_DEV_PORT`. The example configuration currently uses `5175`.

## Configuration

Runtime integration is configured through environment variables rather than hardcoded values.

Key variables from `.env.example`:

- `VITE_BACKEND_ORIGIN`: backend origin for public API requests
- `VITE_PUBLIC_API_PREFIX`: public API path prefix
- `VITE_DEV_PORT`: local Vite dev server port
- `VITE_WAITLIST_SOURCE`: source value sent with waitlist submissions
- `VITE_TTS_PROVIDER`: provider used for generated speech
- `VITE_TTS_VOICE_PROFILE`: default TTS voice profile
- `VITE_TTS_FORMAT`: default TTS audio format
- `VITE_STORY_DEFAULT_STYLE`: default story style
- `VITE_STORY_DEFAULT_TYPE`: default story type
- `VITE_STORY_DEFAULT_PERSPECTIVE`: default story perspective
- `VITE_STORY_DEFAULT_REALISM`: default realism value
- `VITE_STORY_VOICE_ENABLED`: default voice toggle
- `VITE_STORY_VOICE_SPEED`: default narration speed
- `VITE_STORY_VOICE_TYPE`: default voice type
- `VITE_STORY_VOICE_STYLE`: default voice style
- `VITE_STORY_VOICE_PITCH`: default voice pitch
- `VITE_STORY_NARRATION_EMOTION`: default narration emotion
- `VITE_STORY_AUTOPLAY_AUDIO`: autoplay behavior after story generation
- `VITE_STORY_DOWNLOAD_AUDIO_AFTER_GENERATION`: download behavior after story generation

Shared runtime config is assembled in `src/lib/config.ts`.

## Available Scripts

- `npm run dev`: start the local Vite development server
- `npm run build`: build the production bundle
- `npm run build:dev`: build using development mode
- `npm run lint`: run ESLint
- `npm run preview`: preview the production build locally
- `npm test`: run the Vitest suite once
- `npm run test:watch`: run Vitest in watch mode

## Project Structure

- `src/App.tsx`: top-level providers and route definitions
- `src/pages/Index.tsx`: homepage composition
- `src/lib/config.ts`: environment-backed runtime configuration
- `src/content/`: localized content for site sections
- `src/components/sections/`: homepage section components

## Notes

- The public frontend integrates with public backend endpoints for GPS context lookup, story generation, TTS, waitlist signup, and contact submissions.
- Anonymous public client continuity is handled automatically for public API requests.
- Content and UI labels are managed through the localized content layer instead of hardcoded page copy where possible.
