import { useLocalStorage } from './use-local-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
interface SearchHistoryItem {
    id: string;
    query: string;
    lon: number;
    lat: number;
    name: string;
    contry: string;
    state?: string;
    searchAt: number;
}
export function useSearchHistory (){
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>('searchHistory', []);
    
    const queryClient = useQueryClient();

    const historyQuery = useQuery({
        queryKey: ["searchHistory"],
        queryFn: () => history,
        initialData: history,

    });

    const addToHistory = useMutation({
        mutationFn: async (
            search: Omit<SearchHistoryItem, 'id' | 'searchAt'>,
        ) => {
            const newSearch: SearchHistoryItem = {
                ...search,
                id: `${search.lon}-${search.lat}-${Date.now()}`,
                searchAt: Date.now(),
            };

            const filteredHistory = history.filter(
                (item) => item.lon !== newSearch.lon || item.lat !== newSearch.lat,
            );
            const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
            setHistory(newHistory);
            return newHistory;
        },
        onSuccess: (newHistory) => {
            queryClient.setQueryData(["searchHistory"], newHistory);
        }
    });

    const clearHistory = useMutation({
        mutationFn: async () => {
            setHistory([]);
            return [];
        },
    onSuccess:() => {
        queryClient.setQueryData(["searchHistory"], []);
    }

    })
    return {
        history:historyQuery.data ?? [],
        addToHistory,
        clearHistory,
    }
}