import { FC, useState } from "react"
import Greeting from "./Greeting"
import { Button } from "../ui/button";
import Tokens from "./Tokens";
import Swap from "./Swap";
import TabButton from "./TabButton";

type ProfileCardProps = {
    session: any
};
type Tab = "tokens" | "swap";

const tabs: { id: Tab; name: string }[] = [
    { id: "tokens", name: "Tokens" },
    { id: "swap", name: "Swap" },
];

const ProfileCard: FC<ProfileCardProps> = ({ session }) => {
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");

  return (
    <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow-md w-full">
            <Greeting 
            image={session.data?.user?.image ?? ""}
            name={session.data?.user?.name ?? ""}
            />
            <div className="w-full flex px-10 gap-x-[20px] justify-center">
                {
                  tabs.map((tab) => (
                    <TabButton 
                    key={tab.id}
                    active={selectedTab === tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    >
                        {tab.name}
                    </TabButton>
                    ))
                }
            </div>
            <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}>
                <Tokens />
            </div>
            <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}>
                <Swap />
            </div>
        </div>
    </div>
  )
}

export default ProfileCard
