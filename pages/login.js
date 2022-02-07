import Head from "next/head";
import Image from "next/image";


const login = () => {
  return( 
    <>
        <Head>
            <title>Login</title>
        </Head>

    <div className="h-screen w-screen bg-gray-200 p-4">
           <div>
              <Image
                src={'https://th.bing.com/th/id/R.ee430489d1505483166c19ab9ed00d4e?rik=9h%2bv%2fqv8kXnGKQ&pid=ImgRaw&r=0'}
                height={30}
                width={100}
              />
            </div>
            <div className="text-5xl pt-4 text-gray-500">
                <h1>Log in to access your account</h1>
            </div>
        <button className="w-full py-2 mt-4 bg-black text-white text-lg">
            Sign In With Google
        </button>
    </div>
  </>
  );
};

export default login;
