import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            // @ts-ignore
            setError(err instanceof Error ? error : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autofetch) {
            fetchData();
        }
    }, [autofetch]);

    return { data, loading, error, refetch:fetchData, reset };
}


export default useFetch;