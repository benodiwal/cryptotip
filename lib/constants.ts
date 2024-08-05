import { Connection } from "@solana/web3.js";
import AxiosClient from "./http";
import { SUPPORTED_TOKENS } from "./tokens";

type Prices = {
    [key: string]: {
        price: string;
    }
};

let LAST_UPDATED: number | null = null;
let prices: Prices = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc");
export const getSupportedTokens = async () => {
    if (!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await AxiosClient.get('https://price.jup.ag/v6/price?ids=SOL,USDC,USDT');
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
        } catch (e: unknown) {
            console.error(e);
        }
    }
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        price: prices[s.name].price,
    }));
}
