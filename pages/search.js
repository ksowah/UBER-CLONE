import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react';

const search = () => {

    const accessToken = 'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')

  return (
  <div className='bg-gray-200 h-screen'>
      <Head>
          <title>Search destination</title>
      </Head>

    <Link href={'/'}>
        <div className='bg-white px-4 cursor-pointer'>
        <ArrowLeftIcon className='h-10 w-17'/>
      </div>
    </Link>
      

      <div className='flex bg-white items-center justify-center px-4 mb-4'>
      <div className='flex bg-white flex-col items-center mr-4 justify-center'>
            <div className=''>
               <Image
                    src={' https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png'}
                    width={10}
                    height={10}
               />
            </div>

            <div className='mb-0 pb-0'>
                <Image
                    src={'https://img.icons8.com/ios/50/9CA3AF/vertical-line.png'}
                    height={35}
                    width={15}
                />
            </div>
            
            <div className=''>
            <Image
                    src={' https://img.icons8.com/windows/50/000000/square-full.png'}
                    width={10}
                    height={10}
               />
            </div>

            
      </div>
      
                <div className='flex flex-col bg-white flex-1'>
                    <input type={'text'} 
                    placeholder='Enter pickup location' 
                    className='h-10 bg-gray-200 flex flex-1 my-2 rounded-2 p-2 outline-none border-none'
                    value={pickup}
                    onChange={(e)=>setPickup(e.target.value)}
                    />
                    <input type={'text'} 
                    placeholder='Where to?' 
                    className='bg-gray-200 h-10 flex flex-1 my-2 rounded-2 p-2 outline-none border-none'
                    value={dropoff}
                    onChange={(e)=>setDropoff(e.target.value)}
                    />
                </div>

            
            <div className='h-10 w-10 bg-gray-200 rounded-full ml-3 p-1'>
                <PlusIcon />
            </div>
      </div>
      
      <div className='flex items-center bg-white px-4 py-2'>
          <StarIcon className='h-12 text-white bg-gray-400 p-2 rounded-full mr-2'/>
          Saved Places
      </div>

        <div className='px-4 w-full'>
            <Link href={
                {
                    pathname: 'confirm',
                    query: {
                        pickup: pickup,
                        dropoff: dropoff
                    }
                }
            }>
                <button className='w-full m-4 p-2 bg-black text-white text-2xl active:bg-gray-900'>
                Confirm Location
                </button>
            </Link>
        </div>

      

  </div>
  );
};

export default search;
