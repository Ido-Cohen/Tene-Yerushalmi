import React, {useMemo, useState} from 'react';
import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const MapDashboard = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries : ['places']

    })
    const [state, setState] = useState({lat: '', lin: ''});
    if (!isLoaded) return <div>Loading...</div>;
    return <Map/>
};
function Map() {
    const [selected, setSelected] = useState(null);

    const center = useMemo(() => ({lat: 31.4117257, lng: 35.0818155}),[]);
    return (<div className={"overflow-x-auto "}>
        <div className={"container"}>
            <PlacesAutoComplete setSelected={setSelected}/>
        </div>
        <GoogleMap zoom={10} center={center} mapContainerStyle={{width: '100%', height: '100vh'}}>
            {selected && <Marker position={selected}/>}
    </GoogleMap>
        </div>

    );
}

const PlacesAutoComplete = ({setSelected}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status,data},
        clearSuggestions
    } = usePlacesAutocomplete()

    const handleSelect = async (address) => {
      setValue(address,false);
      clearSuggestions();
      const result = await getGeocode({address});
      const {lat,lng} = await getLatLng(result[0]);
      setSelected({lat,lng});
    }
    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={(e) => {setValue(e.target.value)}} disabled={!ready} className={'combobox-input'} placeholder={"Search an address"}/>
        <ComboboxPopover>
            <ComboboxList>
                {status === 'OK' && data.map(({place_id,description}) => (<ComboboxOption key={place_id} value={description}/>))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}

export default MapDashboard;
