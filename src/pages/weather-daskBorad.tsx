import { AlertCircleIcon, MapPin, RefreshCcw } from 'lucide-react'
import {Button} from "@/components/ui/button";
import { useGeolocation } from '@/hooks/use-geolocation';
import { WeatherSkeleton } from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import CurrentWeather from "@/components/currentWeather"
import HourlyTemperature from '@/components/hourly-temprature';

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    loading: locationLoading,
    getLocation,
  } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  
  const handleRefresh = () =>{
    getLocation();
    if (coordinates){
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()

    }
  };
  
  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return ( <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Loaction Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
       <p>{locationError}</p>
       <Button onClick={getLocation} className="w-fit" variant="outline">
        <MapPin className="mr-2 h-4 w-4" />
        Enable Location
       </Button>
    
      </AlertDescription>
    </Alert>
    );
  }


   if (!coordinates) {
    return ( <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Loaction Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
       <p>Please enable location services to view weather information for your current location.</p>
       <Button onClick={getLocation} className="w-fit" variant="outline">
        <MapPin className="mr-2 h-4 w-4" />
        Enable Location
       </Button>
    
      </AlertDescription>
    </Alert>
    );
  }

  const locationData = locationQuery.data?.[0];
  const locationName = locationData?.name;

  if (weatherQuery.error || forecastQuery.error) {
        return ( <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Error</AlertTitle>
       <AlertDescription className="flex flex-col gap-2">
       <p>Fail to fecth weather data. plz try again</p>
       <Button onClick={handleRefresh} className="w-fit" variant="outline">
        <RefreshCcw className="mr-2 h-4 w-4" />
        retry
       </Button>  
    
      </AlertDescription>
    </Alert>
    );
  };

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton/>;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className='flex items-center justify-between '>
          <h1 className="text-xl font-bold tracking-tighter">{locationName ?? "MY location"}</h1>
          <Button variant="outline" 
          size={"icon"}
          onClick={handleRefresh}
          disabled = {weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <RefreshCcw 
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""}`} />
          </Button>
      </div>
 
      <div>
              <div className='grid gap-6'>
               <div className='flex flex-col lg:flex-row gap-4'> 
               <CurrentWeather
                data={weatherQuery.data}
                locationName={locationData}
                />
              <HourlyTemperature

                 data={forecastQuery.data}

              />
              {/* hourly temprature */}

                </div>
              </div>

              <div>
                {/* details */}
                {/* forecast */}
              </div>
      </div>

    </div>
  )
}

export default WeatherDashboard


