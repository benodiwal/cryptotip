import AxiosClient from "@/lib/http";
import { TokenWithBalance } from "@/types/token";
import { useEffect, useState } from "react"

const useTokens = (address: string) => {
    const [tokenBalances, setTokenBalances] = useState<{
        totalBalance: number,
        tokens: TokenWithBalance[],
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AxiosClient.get(`/api/tokens?address=${address}`)
        .then(res => {
            setTokenBalances(res.data);
            setLoading(false);
        });
    }, []);

    return { loading, tokenBalances };
}

export default useTokens;
