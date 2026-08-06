import type { Coordinates } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "@/api/weather";

export const WEATHER_KEY = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    });
}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.getForecast(coordinates) : null,
        enabled: !!coordinates,
    });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    });
}

export function useSearchLocationQuery(query: string | null) {
    return useQuery({
        queryKey: WEATHER_KEY.search(query ?? ""),
        queryFn: () => (query ? weatherApi.searchLocation(query) : null),
        enabled: !!query && query.length >= 3,
    });
}