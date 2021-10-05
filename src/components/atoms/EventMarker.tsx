import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { icon, Map, marker } from 'leaflet';
import { ICONS } from '../../../public/Icons';

import 'leaflet/dist/leaflet.css';
import { makeStyles, Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({

}));


function RenderPopUp(props : any){
    const event = props.event;
    const restriction = (event.minAge)? "Edad Minima" + event.minAge: "Sin restricciones de edad";
    const address = event.location.address || "";
    const specs = event.location.specs || "";
    const startDate = new Date(event.schedules[0].startDate);
    const daysArray = ['Domingo','Lunes',"Martes","Miércoles","Jueves","Viernes","Sábado"];
    const monthsArray = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const diaSemana = daysArray[startDate.getDay()]
    const diaMes = startDate.getDate();
    const mes = monthsArray[startDate.getMonth()];
    const endDate = new Date(event.schedules[0].endDate);
    const finDiaSemana = daysArray[endDate.getDay()];
    const finDiaMes = endDate.getDate();
    const finMes = monthsArray[endDate.getMonth()];

    const final = (() => {
        if (diaSemana == finDiaSemana && finDiaMes == finDiaMes && finMes == mes){
            return ""
        }
        return (<div>- {finDiaSemana} {finDiaMes} de {finMes}</div>)
    })
    
    return(
        <div>
            <Typography ></Typography>
            <b>{event.name}</b>         
            <br />
            {diaSemana} {diaMes} de {mes} {final}
            <br />
            ID:{event.id}
            <br />
            {restriction}
            <br />
            Direccion: {address} {specs}
            <br />
        </div>
    )
}

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
                    <Popup>
                        <RenderPopUp event={evento} />
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

