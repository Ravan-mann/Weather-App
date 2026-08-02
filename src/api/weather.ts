import { API_CONFIG } from "./config";
import type { Coordinates } from "./types";
import type { WeatherData } from "./types";
import type { ForecastData } from "./types";
import type { ReverseGeocodeData } from "./types";

class WeatherApi {
    private createUrl(
        endpoint: string,
        params: Record<string, string | number>
    ) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        });

        return `${endpoint}?${searchParams.toString()}`;
    }

    private async fetchData<T>(url: string): Promise<T> {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }

        return res.json();
    }

    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        });

        return this.fetchData<WeatherData>(url);
    }

    async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        });

        return this.fetchData<ForecastData>(url);
    }

    async reverseGeocode({ lat, lon }: Coordinates): Promise<ReverseGeocodeData[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1,
        });

        return this.fetchData<ReverseGeocodeData[]>(url);
    }
}

export const weatherApi = new WeatherApi();