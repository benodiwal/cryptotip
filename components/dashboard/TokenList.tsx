import { TokenWithBalance } from "@/types/token";
import { FC } from "react";

type TokenListProps = {
    tokens: TokenWithBalance[]
};
const TokenList: FC<TokenListProps> = ({ tokens }) => {
  return (
    <div>
         {tokens.map(token => <TokenRow key={token.name} token={token} />)}
    </div>
  )
}

type TokenRowProps = {
    token: TokenWithBalance
};
const TokenRow: FC<TokenRowProps> = ({token}) => {
    return <div className="flex justify-between">
        <div className="flex">
            <div>
                <img src={token.image} className="h-10 w-10 rounded-full mr-2" />
            </div>
            <div>
                <div className="font-bold">
                    {token.name}
                </div>
                <div className="font-slim">
                    1 {token.name} = ~${token.price}
                </div>
            </div>
        </div>
        <div>
            <div>
                <div className="font-bold flex justify-end">
                    {token.usdBalance}
                </div>
                <div className="font-slim flex justify-end">
                    {token.balance}
                </div>
            </div>
        </div>
    </div>
}

export default TokenList;
