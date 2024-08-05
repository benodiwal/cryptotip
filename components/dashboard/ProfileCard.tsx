'use client';

import { FC, useState } from "react"
import Greeting from "./Greeting"
import Tokens from "./Tokens";
import Swap from "./Swap";
import TabButton from "./TabButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type ProfileCardProps = {
    publicKey: string
};
type Tab = "tokens" | "swap";

const tabs: { id: Tab; name: string }[] = [
    { id: "tokens", name: "Tokens" },
    { id: "swap", name: "Swap" },
];

const ProfileCard: FC<ProfileCardProps> = ({ publicKey }) => {
    const session = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");

    if (session.status === 'loading') {
      return (
        <div>
          Loading ...
        </div>
        );
    }

    if (!session.data?.user) {
      router.push('/');
      return;
    }
 

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
