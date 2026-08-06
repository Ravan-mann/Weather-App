import { useTheme } from "@/context/them-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import CitySearch from "./city-searh";
const Header = () => {
   const { theme ,setTheme } = useTheme();
   const isDark = theme === "dark";
    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

             <Link to={"/"}>
                <img src="/imagess.jpg" alt="Logo" className="h-8 w-auto"/>
            </Link>
        
            <div className="flex  gap-4">
                {/* search */}
                <CitySearch />
                {/* theme toggle */}
                <div onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                    {isDark ? (
                        <Sun className="w-6 h-6 text-yellow-500 cursor-pointer rotate-0 transition-all" />
                    ) : (
                        <Moon className="w-6 h-6 text-blue-500 cursor-pointer rotate-0 transition-all" />
                    )}
                </div>
            </div>
         </div>
        </header>
    );
}
export default Header;