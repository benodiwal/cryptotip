export type TokenDetails = {
    name: string;
    mint: string;
    native: boolean;
    price: string;
    image: string;
    decimals: number;
};

export type TokenWithBalance = TokenDetails & {
    balance: string;
    usdBalance: string;
};
