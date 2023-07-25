import useSWR from "swr";
import Bot, {RequestBot} from "@/api/types/bot";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface SWCOutput<T, ErrorT=any> {
    data?: T;
    error?: ErrorT;
    loading: boolean;
}

export function useDoRequest<RequestT = any, ErrorT = any>(url: string): SWCOutput<RequestT, ErrorT> {
    const {data, error, isLoading} = useSWR<RequestT, ErrorT>(url, fetcher);
    return {data, error, loading: isLoading};
}

export function useGetBot(botSlug: string): SWCOutput<Bot>  {
    const {data, error, loading} = useDoRequest<RequestBot>(`/api/bots/${botSlug}`);
    if (data){
        const newData: Bot = {
            ...data,
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
        };
        return {data: newData, error, loading};
    }
    return {data, error, loading};
}
