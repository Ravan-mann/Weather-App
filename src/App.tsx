import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/them-provider";
import { WeatherDashboard } from "./pages/weather-daskBorad";
import CityPage from "./pages/city-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable refetching on window focus
    },
  },
}); 

function App() {
  return (
    <div>
       <QueryClientProvider client={queryClient}>

      <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      </ThemeProvider>
      </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>
    </div>
  )
}

export default App