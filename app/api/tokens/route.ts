import { getSupportedTokens } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { getAccountBalance } from "./utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as string;

    if (!address) {
      return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }

    const supportedTokens = await getSupportedTokens();
    const balances = await Promise.all(supportedTokens.map(token => getAccountBalance(token, address)));

    const tokens = supportedTokens.map((token, index) => ({
      ...token,
      balance: balances[index].toFixed(2),
      usdBalance: (balances[index] * Number(token.price)).toFixed(2),
    }));

    const totalBalance = tokens.reduce((acc, val) => acc + Number(val.usdBalance), 0).toFixed(2);

    return NextResponse.json({ tokens, totalBalance });
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
