import { GpsCoordinates } from '@/lib/api-types';

export const formatGpsLabel = ({ lat, lng }: GpsCoordinates) => `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

export const normalizeLocationLabel = (value: string) => value.trim().toLowerCase();
