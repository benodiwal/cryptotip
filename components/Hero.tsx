'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Hero = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="text-6xl font-medium">
        <span>
          The crypto of tomorrow, 
        </span>
        <span className="text-blue-500 pl-4"> 
         today
        </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet with just a Google Account.
        </div>
        <div className="flex justify-center pt-2 text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-8 flex justify-center">
            {session.data?.user ? <Button 
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => {
                router.push("/dashboard");
            }}>Go to Dashboard</Button> : <Button 
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => {
                signIn("google");
            }}>Login with Google</Button>}
        </div>
    </div>
  )
}

export default Hero
