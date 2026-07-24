import { RefreshCcw } from 'lucide-react'
import {Button} from "@/components/ui/button";
import { useGeolocation } from '@/hooks/use-geolocation';

const WeatherDashboard = () => {
  const { coordinates ,error, isLoading ,getLocation } = useGeolocation();

  console.log("coordinates", coordinates);

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      console.log("Refreshing weather data for coordinates:", coordinates);
      // Here you can call your API to fetch the latest weather data using the coordinates
    }
  };
  

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className='flex items-center justify-between '>
          <h1 className="text-xl font-bold tracking-tighter">MY location</h1>
          <Button variant="outline" 
          size={"icon"}
          onClick={() => {
            // refresh the page
            window.location.reload();
          }}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
      </div>

      {/* current weather */}
    </div>
  )
}

export default WeatherDashboard


