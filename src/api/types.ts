export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
        country: string;
    };
    name: string;
    dt: number;
    timezone: number;
    cod: number;
} 

export interface ForecastData {
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherCondition[];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>;
    city: {
        name: string;
        sunrise: number;
        sunset: number;
        timezone: number;
    };  
        country: string;
}
export interface ReverseGeocodeData {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}
export interface GeocodingResponse {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}
export interface AqiResponse {
    
  "coord": [
    50.0,
    50.0
  ],
  "list": [
    {
      "dt": 1606147200,
      "main": {
        "aqi": 4.0
      },
      "components": {
        "co": 203.609,
        "no": 0.0,
        "no2": 0.396,
        "o3": 75.102,
        "so2": 0.648,
        "pm2_5": 23.253,
        "pm10": 92.214,
        "nh3": 0.117
      }
    }
  ]
    }
