import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import Vehicles from '../components/Vehicles';
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
  });

  const token = 'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'


const confirm = () => {

  const router = useRouter()
  const {pickup, dropoff} = router.query

  
  const [long, setLong] = useState(-2);
  const [lat, setLat] = useState(5);

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



  // ------------- client request -------------

    const [initialDestination, setInitialDestination] = useState([-2, 5])
    const [finalDestination, setFinalDestination] = useState([-4, 6])


    const getPickUp = (pickup) => {
         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?proximity=${long},${lat}&types=place%2Cpostcode%2Caddress&access_token=${token}`)
         .then ((res) => res.json()) 
         .then ((data) => {
          data.features && setInitialDestination(data.features[0].center)
         })
        
    }

    const getDropoff = (dropoff)=> {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?proximity=${long},${lat}&types=place%2Cpostcode%2Caddress&access_token=${token}`)
        .then( res =>  res.json() )
        .then((data)=>{
          data.featudata && setFinalDestination(data.features[0].center)
        })
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

        <Link href={'/search'}>
          <div className='rounded-full h-fit p-1 absolute z-10 bg-white m-4 cursor-pointer shadow-md'>
            <ArrowLeftIcon
              className='h-10 w-15'
            />
          </div>
        </Link>
    
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
                    <img src={'https://www.pngplay.com/wp-content/uploads/9/Map-Marker-Transparent-PNG.png'}
                    className='h-10 animate-bounce'
                    />
                </Marker>
                <Marker
                    coordinates={finalDestination}
                    anchor="bottom">
                    <img src={'https://www.pngplay.com/wp-content/uploads/9/Map-Marker-Transparent-PNG.png'}
                    className='h-10 animate-bounce'
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
