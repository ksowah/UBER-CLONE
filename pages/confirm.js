import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import Vehicles from '../components/Vehicles';
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
  });

  const token = 'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'

const confirm = () => {

  const router = useRouter()
  const {pickup, dropoff} = router.query

  // ------------- client request -------------

    const [initialDestination, setInitialDestination] = useState([0,0])
    const [finalDestination, setFinalDestination] = useState([0,0])


    const getPickUp = (pickup) => {
         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`)
         .then ((res) => res.json()) 
         .then ((data) => {

            setInitialDestination(data.features[0].center)
         })
        
    }

    const getDropoff = async (dropoff)=> {
        const request = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`)
        const res = await request.json() 
        // finalDestination = res.features[0].center
        // console.log(finalDestination);
        setFinalDestination(res?.features[0]?.center)
    }
       

    useEffect(() => {
       getPickUp(pickup)
       getDropoff(dropoff)
    }, [pickup, dropoff])

  return (

    <>
         <Head>
            <title>Confirm Ride</title>
        </Head>
    
      <div className="">
            <div className='flex flex-col'> 
                <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '50vh',
                    width: '100vw'
                }}
                 fitBounds={[initialDestination, finalDestination]}
                 
                >
                <Layer type="symbol" id="marker"  layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
    
                <Marker
                    coordinates={initialDestination}
                    anchor="bottom">
                    <img src={'https://th.bing.com/th/id/R.6d7cede615c35d03034dbd85a1428382?rik=eOSNgMXl2ujVGw&pid=ImgRaw&r=0'}
                    className='h-8 animate-bounce'
                    />
                </Marker>
                <Marker
                    coordinates={finalDestination}
                    anchor="bottom">
                    <img src={'https://th.bing.com/th/id/R.6d7cede615c35d03034dbd85a1428382?rik=eOSNgMXl2ujVGw&pid=ImgRaw&r=0'}
                    className='h-8 animate-bounce'
                    />
                </Marker>
                </Map>
    
             </div>
    
             <div className='flex flex-col'>
                <div className='text-center w-full text-gray-400 p-2'>
                    choose a ride or swipe up for more
                </div> 
    
                <div className='border-t-2 border-b-2 h-60 overflow-auto scrollbar-hide'>
                    <Vehicles
                      pickup={initialDestination}
                      dropOff={finalDestination}
                    />
                </div>
             </div>
    
             <button className='w-full bg-black active:bg-gray-900 p-2 text-xl m-4 text-white scroll'>
                 Confirm UberX 
             </button>
      </div>
    </>
  );
};


export default confirm;
