import type { Coordinates } from "../api/types";
import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    loading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        loading: true
    });

    const getLocation = useCallback(() => {
        setLocationData(prevState => ({ ...prevState, loading: true, error: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                loading: false
            });
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                loading: false
            });
        }, (error) => {
            let errorMessage: string;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out. Please try again or search for a city manually.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
                    break;
            }
            setLocationData({
                coordinates: null,
                error: errorMessage,
                loading: false,
            });
        }, {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 60000,
        });
    }, []);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return {
        ...locationData,
        getLocation,
    };
}