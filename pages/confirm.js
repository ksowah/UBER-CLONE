import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import Vehicles from '../components/Vehicles';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
  });

  const token = 'pk.eyJ1Ijoia3Nvd2FoIiwiYSI6ImNrejVyNHdhOTByazUycHJ4MWY5Z2tjOHYifQ.iMF7eI2jMGbqDMynRTLNGw'
  
  const address = 'ghana'
  const pickup = 'togo'

const confirm = ({response, destination}) => {

    console.log(response.features[0].center);
    console.log(destination.features[0].center);
  return (
  <div className="">
        <div className='flex flex-col'> 
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '60vh',
                width: '100vw'
            }}
            >
            <Layer type="symbol" id="marker"  layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>

            <Marker
                coordinates={[-0.2416815, 51.5285582], [-0.481747846041145, 51.3233379650232]}
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

            <div className='flex flex-col border-t-2 border-b-2 h-80 overflow-auto scrollbar-hide'>
                <Vehicles/>
                <Vehicles/>
                <Vehicles/>
                <Vehicles/>
            </div>
         </div>

         <button className='w-full bg-black active:bg-gray-900 p-2 text-xl m-4 text-white scroll'>
             Confirm UberX
         </button>
  </div>
  );
};


export const getServerSideProps = async () => {
   
    const request = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`
        )

    const endPoint = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?types=place%2Cpostcode%2Caddress&access_token=${token}`
        )
    const response = await request.json()
    const destination = await endPoint.json()
    
    return {
        props:{
            response: response,
            destination : destination
        }
    }
}

export default confirm;
