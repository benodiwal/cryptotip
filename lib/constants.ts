import { Connection } from "@solana/web3.js";
import AxiosClient from "./http";
import { SUPPORTED_TOKENS } from "./tokens";

type Prices = {
    [key: string]: {
        price: string;
    }
};

const API_URL = 'https://price.jup.ag/v6/price?ids=SOL,USDC,USDT';
const SOLANA_MAINNET_URL = "https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc";
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

let lastUpdated: number | null = null;
let prices: Prices = {};

export const connection = new Connection(SOLANA_MAINNET_URL);

export const getSupportedTokens = async () => {
    const now = Date.now();
    if (!lastUpdated || now - lastUpdated >= TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await AxiosClient.get(API_URL);
            prices = response.data.data;
            lastUpdated = now;
        } catch (error: unknown) {
            console.error(error);
        }
    }
    return SUPPORTED_TOKENS.map(token => ({
        ...token,
        price: prices[token.name]?.price ?? 'N/A',
    }));
}

getSupportedTokens();
