import type { GeocodingResponse , WeatherData } from "@/api/types"
import { Card, CardContent,   } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
 


interface CurrentWeatherProps {
    data:WeatherData,
    locationName?:GeocodingResponse
}

const CurrentWeather = ({data ,locationName}:CurrentWeatherProps) => {
    const {
        weather:[currentWeather],
        main : {temp ,feels_like,temp_min,temp_max,humidity}, 
        wind: {speed},
    }= data;


  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;


    return(
        <Card className="overflow-hidden">
            <CardContent className="p-6"> 
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="spavce-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-2xl font-bold tracking-tight">{locationName?.name}</h2>
                                {locationName?.state && (
                                    <span className="text-muted-foreground">
                                        ,{locationName.state}    
                                    </span>
                                )}
                            </div>
                                <p className="text-sm text-muted-foreground"
                                >{locationName?.country}</p>
                    </div>
                    {/* temp */}
                    <div className="flex items-center gap-2">
                        <p className="text-5xl font-bold tracking-tight">
                            {formatTemp(temp)}
                        </p>
                        <div className="space-y-1">
                            {/* feel */}
                            <p className="text-muted-foreground text-sm font-medium">Feel like {formatTemp(feels_like)}</p>
                                <div className="flex gap-2 tex-sm font-medium">
                                    {/* min */}
                                    <span className="flex items-center gap-1 text-blue-500 ">
                                        <ArrowDown className="h-3 w-3"/>
                                        {formatTemp(temp_min)}
                                    </span>
                                    {/* max */}
                                    <span className="flex items-center gap-1 text-red-500 ">
                                        <ArrowUp className="h-3 w-3"/>
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                        </div>

                    </div>            
                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-500"/>
                        <div className="sapce-y-0.5">
                            <p className="text-sm font-medium">Humidity</p>
                            <p className="text-sm font-medium-foreground">{humidity}%</p>
                        </div> 
                    </div>
                    <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-500"/>
                        <div className="sapce-y-0.5">
                            <p className="text-sm font-medium">Wind Speed</p>
                            <p className="text-sm font-medium-foreground">{speed} m/s</p>
                        </div> 
                    </div>
                </div>

                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative flex aspect-square w-full max-w-50 items-center justify-center">
                        <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} 
                        alt={currentWeather.description}
                        className="h-full w-full object-contain" />
                        <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capitalize">{currentWeather.description}</p>
                        </div>
                    </div>
                </div>
                </div>     
            </CardContent>
        </Card>
        );
};
export default CurrentWeather;