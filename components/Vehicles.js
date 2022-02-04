import Image from "next/image";

const Vehicles = () => {
  return (
      <div className="flex items-center justify-between hover:bg-gray-200 cursor-pointer w-full group">
        <div className="flex items-center">
                <Image
                    src={'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png'}
                    height={120}
                    width={130}
                    className="group-hover:animate-pulse"
                />

                <div className="flex flex-col">
                    <h4 className="font-bold">Uber X</h4>
                    <p className="text-blue-300">5 mins away</p>
                </div>
        </div>

            <div className="px-5">
                <p className="font-bold">$0.00</p>
            </div>
        </div>
  );
};

export default Vehicles;
