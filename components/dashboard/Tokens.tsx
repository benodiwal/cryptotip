import { TokenWithBalance } from "@/types/token";
import { FC, useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import TokenList from "./TokenList";

type TokensProps = {
  publicKey: string;
  loading: boolean;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithBalance[]
  } | null;
};

const Tokens: FC<TokensProps> = ({ publicKey, loading, tokenBalances }) => {
  const [copied, setCopied] = useState<boolean>(false);
  
  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false)
      }, 3000)
      return () => {
        clearTimeout(timeout);
      }
    }
  }, [copied])
  
  if (loading) {
    return "Loading..."
  }
  
  return <div className="text-slate-500">
    <div className="mx-12 py-2">
            Account assets
        </div>
        <div className="flex justify-between mx-12">
            <div className="flex">
                <div className="text-5xl font-bold text-black">
                    ${tokenBalances?.totalBalance}
                </div>
                <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                    USD
                </div>
            </div>

            <div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}
                </Button>
            </div>
        </div>

        <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div>
    </div>
}
 
export default Tokens
