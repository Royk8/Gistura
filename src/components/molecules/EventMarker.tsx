import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { icon, Map, marker } from 'leaflet';
import { ICONS } from '../../../public/Icons';
import { makeStyles, Theme } from '@material-ui/core';
import MarkerPopUp from '../atoms/MarkerPopUp';
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles((theme: Theme) => ({

}));

function findIcon(type : string){
    const iconDir = ICONS.find(icono => icono.name === type);
    if(iconDir == null){
        return 'Varios eventos.svg';
    }        
/*
category-
description
isActive
location-
minAge
name-
price
schedules
sponsor
imageUrls
*/
    return iconDir.url;
}

const EventMarker = (props: any) => {
    const vacio = (<div></div>)
    if(props.events == null){
        return vacio;
    }
    const eventos = props.events.map((evento : any) => {
        if(evento.location.latitude == null || 
            evento.location.longitude == null ||
            !evento.isActive){
            return vacio;
        }
        const iconAddress = findIcon(evento.category);
        const typeIcons = icon({
            iconUrl: iconAddress,    
            iconSize:     [38, 95],
        });

        const coordinate = {lat: evento.location.latitude, lng: evento.location.longitude};
      
        return (
            <div>
                <Marker position={coordinate} icon={typeIcons} title={evento.name}>
                    <Popup maxWidth={500}>
                        <MarkerPopUp event={evento} />
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

