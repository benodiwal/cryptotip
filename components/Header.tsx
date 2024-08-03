'use client';

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";

const Header = () => {

  const session = useSession();

  return (
    <div className="flex justify-between py-2 px-4 border-b">
      <div className="text-xl font-bold flex flex-col justify-center">Cryptotip</div>
      <div>
        {
           session.data?.user ? <Button onClick={() => signOut()}>Logout</Button> : <Button onClick={() => signIn()}>Signin</Button>        
        }        
      </div>
    </div>
  )
}

export default Header
