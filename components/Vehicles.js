import Image from "next/image";
import { useEffect, useState } from "react";
import { carList } from "../data/carList";

const Vehicles = ({pickup, dropOff}) => {

    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]}%2C${pickup[1]}%3B${dropOff[0]}%2C${dropOff[1]}?access_token=pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw`)
        .then((res)=> res.json())
        .then((data) => setDuration(data.routes[0].duration))
    }, [pickup, dropOff])

  return (
        <>
            {
                carList.map((car, index)=>(
            <div className="flex items-center justify-between hover:bg-gray-200 cursor-pointer w-full group px-4"  key={index}>
                <div className="flex items-center">
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
                <p className="font-bold">{`₵${((duration / 100)*car.multiplier).toFixed(2)}`}</p>
            </div>
        </div>

                ))
            }
      </>
           
  );
};

export default Vehicles;
