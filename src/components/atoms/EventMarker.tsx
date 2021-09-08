import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { icon, Map, marker } from 'leaflet';
import { ICONS } from '../../../public/Icons';

import 'leaflet/dist/leaflet.css';


function RenderPopUp(props : any){
    return(
        <div>
            {props.eventInfo.name}
            <br />
            {props.eventInfo.place}
        </div>
    )
}

function findIcon(type : string){
    const iconDir = ICONS.find(icono => icono.name === type);
    if(iconDir == null){
        return "";
    }    
    return iconDir.url;
}

const EventMarker = (props: any) => {
    const eventos = props.events.map((evento : any) => {
        const iconAdress = findIcon(evento.type);
        const typeIcons = icon({
            iconUrl: iconAdress,    
            iconSize:     [38, 95],
        });
        
        return (
            <div>
                <Marker position={evento.cord} icon={typeIcons} title={evento.info.name}>
                    <Popup>
                        <RenderPopUp eventInfo={evento.info} />
                    </Popup>
                </Marker>
            </div>
        );
    });

    return(
        <div>
            {eventos}
        </div>
    );
}


export default EventMarker;


