import React, {useMemo, useState} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
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
import Dropdown from "../Auth/Dropdown";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

const cities = [
    {value: {lat: 31.7833, lng: 35.2167}, label: 'ירושלים'},
    {value: {lat: 32.109333, lng: 34.855499}, label: 'תל אביב'},
    {value: {lat: 32.794044, lng: 34.989571}, label: 'חיפה'},
    {value: {lat: 31.2589, lng: 34.7978}, label: 'באר שבע'},
    {value: {lat: 29.55805, lng: 34.94821}, label: 'אילת'},
    {value: {lat: 33.20733, lng: 35.57212}, label: 'קרית שמונה'},
]
const MapDashboard = (props) => {
    // const {isLoaded} = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries: ['places']
    //
    // })
    const{users} = props;
    const [state, setState] = useState({lat: '', lin: ''});
    // if (!isLoaded) return <div>Loading...</div>;
    return <Map users={users}/>
};

function Map(props) {
    const {users} = props;
    const [selected, setSelected] = useState(null);
    const center = useMemo(() => ({lat: 31.4117257, lng: 35.0818155}), []);
    const [newCenter, setNewCenter] = useState();


    const handleDropdown = (event) => {
        setNewCenter(event);
    };
    return (<div className={"overflow-x-auto pt-5"}>
            <div className={"bg-white text-blue-600 text-right container flex"} style={{width:120}}>
                <Dropdown type={"ערים"} values={cities} reference={handleDropdown}/>
                {/*<PlacesAutoComplete setSelected={setSelected}/>*/}
            </div>
            <GoogleMap zoom={11} center={newCenter ? newCenter : center}
                       mapContainerStyle={{width: '100%', height: '100vh'}}>
                {users && users.map(user => {
                    return <Marker position={user?.geoAddress} />
                })}
                {/*{selected && <Marker position={selected}/>}*/}
            </GoogleMap>
        </div>

    );
}

export const PlacesAutoComplete = ({setSelected,setSelectedAddress}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete()

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        const result = await getGeocode({address});
        const {lat, lng} = await getLatLng(result[0]);
        setSelected({lat, lng});
        setSelectedAddress(address);
    }
    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={(e) => {
            setValue(e.target.value)
        }} disabled={!ready} className={'block border border-grey-light w-full p-3 rounded mb-4 text-right'}
                       placeholder={"כתובת מגורים"}/>
        <ComboboxPopover>
            <ComboboxList>
                {status === 'OK' && data.map(({place_id, description}) => (
                    <ComboboxOption key={place_id} value={description}/>))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        handle: state.auth.handle
    }
}
export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'messages'

    }, {
        collection: 'users'
    }
]))(MapDashboard);
