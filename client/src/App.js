import  React,{useState, useEffect} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from "./Api";
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({});

  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100w",
    height: "100vh",
    latitude:37.7577 ,
    longitude: -122.4376,
    zoom: 3
  });

  const getEntries = async  ()=>{
    const logEntries = await listLogEntries();
    setLogEntries(logEntries)
  }
 
  useEffect(()=>{
  getEntries()
  },[])

  const showAddMarkerPopup = (e) => {
   const [longitude, latitude ]  = e.lngLat
   setAddEntryLocation({
     latitude, longitude
   })

  }
  console.log(process.env);
  return (
    <ReactMapGL 
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
      >
       {
         logEntries.map(entry =>(
        <React.Fragment key={entry._id} >
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-10 } 
            >
             <div onClick={()=> setShowPopup({ [entry._id]:true})} >

             <svg viewBox="0 0 24 24" width="32" height="32" stroke="#FFFF00" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
           </div>
           </Marker>
           { showPopup[entry._id] ?(<Popup

          latitude={entry.latitude}
        longitude={entry.longitude}
       closeButton={true}
       closeOnClick={false}
       onClose={() => setShowPopup({})}
       anchor="top">
         <div className="popup" >
           {entry.image && <img src={entry.image} alt={entry.title} />  }
           <h3>{entry.title}</h3>
           <p>{entry.comments}</p>
         </div>

       </Popup>) :null
       }
         </ React.Fragment>
         ))
       }
       {
         addEntryLocation ? (
           <React.Fragment>
           <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10 } 
            >
             <div onClick={()=> setShowPopup({ [addEntryLocation._id]:true})} >

             <svg viewBox="0 0 24 24" width="32" 
             style={{height:`${6 * viewport.zoom }px`,width:`${6 * viewport.zoom }px`}}
             height="32" stroke="#00FFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="marker"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
           </div>
           </Marker>
              <Popup

latitude={addEntryLocation.latitude}
longitude={addEntryLocation.longitude}
closeButton={true}
closeOnClick={false}
onClose={() => setAddEntryLocation(null)}
anchor="top">
<div className="popup" >
  <LogEntryForm location={addEntryLocation} onClose={()=>{
    
    setAddEntryLocation(null)
    getEntries()
  }}  
  />
</div>

</Popup>
           </React.Fragment>
         ): null
       }
       
        </ReactMapGL>
  );
}
export default App