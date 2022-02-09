import Head from "next/head";
import Image from "next/image";
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {app} from "../firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Login = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const route = useRouter()

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                route.push('/')
            }
        })
    
    }, [])

    
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
           
        <button className="w-full py-2 mt-4 bg-black text-white text-lg" onClick={()=>signInWithRedirect(auth, provider) .catch(error => alert(error.code))}>
            Sign In With Google
        </button>
    </div>
  </>
  );
};

export default Login;
