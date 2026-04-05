import { useState } from 'react';

import { getContextFromGps } from '@/lib/api';
import { FromGpsResponse, GpsCoordinates } from '@/lib/api-types';
import { formatGpsLabel } from '@/lib/location';

const mapGeolocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Location permission was denied.';
    case error.POSITION_UNAVAILABLE:
      return 'Location is currently unavailable.';
    case error.TIMEOUT:
      return 'Location request timed out.';
    default:
      return 'Unable to get your current location.';
  }
};

export const useCurrentPosition = (language: string) => {
  const [coords, setCoords] = useState<GpsCoordinates | null>(null);
  const [resolvedLabel, setResolvedLabel] = useState<string | null>(null);
  const [resolvedContext, setResolvedContext] = useState<FromGpsResponse | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      const message = 'Location is not supported by this browser.';
      setLocationError(message);
      throw new Error(message);
    }

    setIsLocating(true);
    setLocationError(null);

    return new Promise<{ coords: GpsCoordinates; resolvedLabel: string; resolvedContext: FromGpsResponse | null }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const nextCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoords(nextCoords);

          try {
            const nextContext = await getContextFromGps(nextCoords, language);
            const nextLabel = nextContext.placeName?.trim() || formatGpsLabel(nextCoords);

            setResolvedContext(nextContext);
            setResolvedLabel(nextLabel);
            setIsLocating(false);
            resolve({ coords: nextCoords, resolvedLabel: nextLabel, resolvedContext: nextContext });
          } catch (_error) {
            const fallbackLabel = formatGpsLabel(nextCoords);
            setResolvedContext(null);
            setResolvedLabel(fallbackLabel);
            setLocationError('Unable to resolve a place name for your location. Using coordinates instead.');
            setIsLocating(false);
            resolve({ coords: nextCoords, resolvedLabel: fallbackLabel, resolvedContext: null });
          }
        },
        (error) => {
          const message = mapGeolocationError(error);
          setLocationError(message);
          setIsLocating(false);
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  };

  return {
    coords,
    resolvedLabel,
    resolvedContext,
    isLocating,
    locationError,
    requestLocation,
  };
};
