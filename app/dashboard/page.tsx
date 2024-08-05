import ProfileCard from "@/components/dashboard/ProfileCard";
import getUserWallet from "../actions/getUserWallet";

const Dashboard = async () => {
  
  const { error, userWallet } = await getUserWallet();
  
  if (error || !userWallet?.publicKey) {
    return (
      <div>
          No solana wallet found
      </div>
      )
  }
   
    return (
    <div>
      <ProfileCard publicKey=""/>     
    </div>
  )
}

export default Dashboard;
