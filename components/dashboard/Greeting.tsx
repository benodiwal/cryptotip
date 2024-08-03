import { FC } from "react"

type GreetingProps = {
    image: string;
    name: string;
};

const Greeting: FC<GreetingProps> = ({ image, name }) => {
  return (
    <div className="flex p-12">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">
            Welcome back, {name}
        </div>
    </div>
  )
}

export default Greeting
