'use client';

import ProfileCard from "@/components/dashboard/ProfileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();

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
    <div>
      <ProfileCard session={session}/>     
    </div>
  )
}

export default Dashboard;
