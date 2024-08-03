'use client';

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
      Dashboard      
    </div>
  )
}

export default Dashboard;
