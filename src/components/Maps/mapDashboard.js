import React, {useState} from 'react';
import {Map, Marker} from "pigeon-maps";
import moment from "moment";

const MapDashboard = () => {
    const [state, setState] = useState({lat: '', lin: ''});
    const anchorHover = (e) => {
        setState({lat: e.anchor[0], lin: e.anchor[1]});
    }
    console.log("heyyyyyyyy");
    return (
        <div className={"container center"}>
            <Map height={300} defaultCenter={[31.771959, 35.217018]} defaultZoom={7}>
                <Marker width={50} anchor={[31.771959, 35.217018]} onClick={(e) => anchorHover(e)}/>
            </Map>
            {state.lat ?
                <div className={"card z-depth-0"}>
                    <div className={"card-content"}>
                        <span className="card-title">maps trying</span>
                        <p>trying here</p>
                    </div>
                    <div className={"card-action gret lighten-4 grey-text"}>
                        <div>heyyy im here</div>
                    </div>
                </div>
                : null}
        </div>
    );
};

export default MapDashboard;
