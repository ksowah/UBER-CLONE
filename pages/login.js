import Head from "next/head";
import Image from "next/image";


const login = () => {
  return( 
    <>
        <Head>
            <title>Uber Login</title>
        </Head>

    <div className="h-screen bg-gray-200 p-4 w-auto">
           <div>
              <Image
                src={' https://i.ibb.co/n6LWQM4/Post.png'}
                height={35}
                width={100}
              />
            </div>

            <div className="max-w-full  lg:max-w-2xl">
                <div className="text-5xl pt-4 mr-4 mt-4 text-gray-500">
                    <h1>Log in to access your account</h1>
                </div>
                
                <div className='w-full object-contain px-2'>
                    <img 
                        src="https://i.ibb.co/CsV9RYZ/login-image.png"
                        className=" object-contain"
                    />
                </div>
            </div>
           
        <button className="w-full py-2 mt-4 bg-black text-white text-lg">
            Sign In With Google
        </button>
    </div>
  </>
  );
};

export default login;
