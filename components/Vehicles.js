import Image from "next/image";
import { carList } from "../data/carList";

const Vehicles = () => {
  return (
        <>
            
            {
                carList.map((car, index)=>(
            <div className="flex items-center justify-between hover:bg-gray-200 cursor-pointer w-full group px-4">
                <div className="flex items-center" key={index}>
                        <Image
                        src={car.imgUrl}
                        height={120}
                        width={130}
                        className="group-hover:animate-pulse"
                        />

                    <div className="flex flex-col ml-4">
                        <h4 className="font-bold">{car.service}</h4>
                        <p className="text-blue-500 text-sm">5 mins away</p>
                    </div>
                </div>

                <div className="px-5">
                <p className="font-bold">$0.00</p>
            </div>
        </div>

                ))
            }
      </>
           
  );
};

export default Vehicles;
