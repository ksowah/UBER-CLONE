import Head from "next/head";
import Image from "next/image";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase";



const login = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const signIn =()=>{
           
            signInWithPopup(auth, provider)
            .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            console.log(token);
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorCode)
            // ...
    });

}
    
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
           
        <button className="w-full py-2 mt-4 bg-black text-white text-lg" onClick={signIn()}>
            Sign In With Google
        </button>
    </div>
  </>
  );
};

export default login;
