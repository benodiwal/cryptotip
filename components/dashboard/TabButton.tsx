import { FC, ReactNode } from "react"
import { Button } from "../ui/button"

type TabButtonProps = {
    active: boolean;
    children: ReactNode;
    onClick: () => void
};

const TabButton: FC<TabButtonProps> = ({ active, children, onClick }) => {
  return (
    <Button
    className={`w-full text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${active ? "bg-blue-500" : "bg-blue-300"}`}
    onClick={onClick}
    >
        {children}
    </Button>
  )
}

export default TabButton
