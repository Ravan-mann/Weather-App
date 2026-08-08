import * as React from "react";
import { Button } from "./ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { Search, Loader2, XCircle, Ghost, Clock } from "lucide-react";
import { useSearchLocationQuery } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
const CitySearch = () => {


    const [open, setOpen] = React.useState(false);          
    const [query, setQuery] = React.useState("");
    const { data: locations,isLoading } = useSearchLocationQuery(query);
    const navigate = useNavigate();

    const {history ,clearHistory ,addToHistory} = useSearchHistory();

    const handleSelect = (cityData: string) => {
      const [name, lat, lon,country ] = cityData.split("|");

      addToHistory.mutate({
        query,
        name,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        contry: country,
      });
      // add logic to navigate to the city page with the selected city data
      navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
      setOpen(false);
    }

    return (
    <>
     <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
        <CommandInput placeholder="search cities..."
        value={query}
        onValueChange={setQuery} />
          <CommandList>
            {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
            {/* <CommandGroup heading="Favorites">
              <CommandItem>Calendar</CommandItem>
            </CommandGroup> */}
            {history.length > 0 && (
              <>
              <CommandSeparator />  
              <CommandGroup>
                <div className="flex items-center justify-between px-2 py-2">
                  <p className="text-xs text-muted-foreground">Recent Search</p>
                  <Button
                  variant = "ghost"
                  size="sm"
                  onClick={ () => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4">
                      Clear
                    </XCircle>
                  </Button>
                </div>
                {history.map((location)=>{
                  return <CommandItem key={`${location.name}-${location.contry}`}
                    value={`${location.name}|${location.lat}|${location.lon}|${location.contry}`} 
                    onSelect={(cityData) => {
                      handleSelect(cityData);
                    }}>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{location.name}</span>
                    {location.state && (
                      <span className="text-muted-foreground">
                        {location.state}, {location.contry}
                      </span>
                    )}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(location.searchAt ,"MMM d,h:m a")}
                      </span>
                    </CommandItem>
                })}
            </CommandGroup>
              </>
          )}
          {/* suggestion */}
            <CommandSeparator />
            {locations && locations.length > 0 && (
              <CommandGroup key="suggestions" heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) 
                }
                {locations.map((location) => {
                  return (
                    <CommandItem key={`${location.name}-${location.country}`}
                    value={`${location.name}|${location.lat}|${location.lon}|${location.country}`} 
                    onSelect={(cityData) => {
                      handleSelect(cityData);
                    }}>
                      <Search className="h-4 w-4" />
                      <span className="">
                        {location.name}
                      </span>
                    {location.state && (
                      <span className="text-muted-foreground">
                        {location.state}, {location.country}
                      </span>
                    )}

                    </CommandItem>
                    );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
      </>
    );
};
export default CitySearch;