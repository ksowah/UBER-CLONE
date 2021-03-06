import Head from 'next/head'
import Image from 'next/image'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import Link from 'next/link'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { app } from '../firebase';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
});


export default function Home() {

  const auth = getAuth(app)
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);

  useEffect(()=>{
    return onAuthStateChanged(auth, user => {
      if(user){
        setUser({
          name: user.displayName,
          image: user.photoURL
        })
      }else{
        setUser(null)
        router.push('/login')
      }
    })

  }, [])



  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
     alert('OOOOPS!! looks like we can\'t get your location ')
    }

  }

  useEffect(()=>{
    getLocation()
  }, [long, lat])


  function showPosition(position) {
    if(position.coords.latitude && position.coords.longitude){
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    }
  }

  
  return (
    <div className='flex flex-col'>
      <Head>
        <title>Uber</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* MAP */}
      <div className='flex flex-col'> 
     
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '60vh',
              width: '100vw'
            }}

               fitBounds={[[long, lat], [long, lat]]}
          >
            <Layer type="symbol" id="marker"  layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>

            <Marker
                    coordinates={[long, lat]}
                    anchor="bottom">
                    <img src={'https://www.pngplay.com/wp-content/uploads/9/Map-Marker-Transparent-PNG.png'}
                    className='h-10 animate-bounce'
                    />
            </Marker>

          </Map>
      </div>

            {/* BOTTOM BUTTONS */}
    <div className='p-4'>
      <header className='flex justify-between items-center my-8 px-4'>
            <div>
              <Image
                src={'https://th.bing.com/th/id/R.ee430489d1505483166c19ab9ed00d4e?rik=9h%2bv%2fqv8kXnGKQ&pid=ImgRaw&r=0'}
                height={30}
                width={100}
              />
            </div>
            <div className='flex items-center'>
                <div className='mr-4 text-sm font-bold'>{user && user.name}</div>
                <img
                  src={user && user.image}
                  className='rounded-full border-gray-200 p-px h-12 cursor-pointer'
                  onClick={()=>signOut(auth)}
                />
                {/* image */}
            </div>
      </header>

      {/* BUTTONS */}
      <div className='flex'>
        <Link href={'/search'}>
            <div className='bg-gray-200 flex-1 m-2 flex flex-col text-xl h-fit w-fit
                              rounded-lg justify-center text-center cursor-pointer
                              pb-4 font-bold transform hover:scale-105 transition'>
              <Image
                src={'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png'}
                className='h-3/5'
                height={25}
                width={35}
                layout='responsive'
              />
              <p>Ride</p>
              
            </div>
         </Link>
            
         <Link href={'/search'}>   
              <div className='bg-gray-200 flex-1 m-2 flex flex-col text-xl
                                rounded-lg justify-center text-center pb-4 cursor-pointer 
                                font-bold transform hover:scale-105 transition'>
              <Image
                  src={'https://i.ibb.co/n776JLm/bike.png'}
                  className='h-3/5'
                  height={50}
                  width={70}
                  layout='responsive'
                />
                Wheel
              </div>

            </Link>
             
             <Link href={'/search'}>
                <div className='bg-gray-200 flex-1 m-2 flex flex-col text-xl cursor-pointer
                                  rounded-lg justify-center text-center pb-4 
                                  font-bold transform hover:scale-105 transition'>
                <Image
                    src={'https://i.ibb.co/5RjchBg/uberschedule.png'}
                    className='h-3/5'
                    height={50}
                    width={70}
                    layout='responsive'
                  />
                Reserve
                </div>
            </Link>

      </div>
      <Link href={'/search'}>
        <div className='h-20 bg-gray-200 text-2xl p-4 mt-8 flex items-center'>
          <p>Where to?</p>
        </div>
      </Link>
    </div> 
      
    </div>
  )
}
