import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { divIcon, icon, Map, marker } from 'leaflet';
import { makeStyles, Theme } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { ICONS } from '../../../public/Icons';
import MarkerPopUp from '../atoms/MarkerPopUp';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/redux';
import { selectCategories } from '../../state/slices/categorySlice';
import Icon from '../../interfaces/iconInterfaces';

const useStyles = makeStyles((theme: Theme) => ({}));

function findIcon(type: string) {
	const iconDir = ICONS.find((icono) => icono.name === type);
	if (iconDir == null) {
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

	const vacio = <div />;
	if (props.events == null) {
		console.warn("Void");
		return vacio;
	}
	console.log("Eventmarker")
	const {categories} = useAppSelector(selectCategories);

	const eventos = props.events.map((evento: any) => {
		
		if (
			evento.location.latitude == null ||
			evento.location.longitude == null ||
			!evento.isActive
		) {
			return vacio;
		}
		//const iconAddress = findIcon(evento.category);
		/*const typeIcons = icon({
			iconUrl: iconAddress,
			iconSize: [38, 95],
		});*/

		const categoryName = categories.find((category)=>(category.id === evento.category));
		const Icono = (Icons as any)[categoryName?.icon.name || 'Menu'];
		console.log(Icono);
		const typeIcon = () => (divIcon({
			html: ReactDOMServer.renderToString(
				categoryName?.icon.type === Icon.Types.MATERIAL_UI ? <Icono /> : <div></div> ),
		}))

		const coordinate = {
			lat: evento.location.latitude,
			lng: evento.location.longitude,
		};

		return (
			<div>
				<Marker
					position={coordinate}
					icon={typeIcon()}
					title={evento.name}
				>
					<Popup maxWidth={500}>
						<MarkerPopUp event={evento} />
					</Popup>
				</Marker>
			</div>
		);
	});

	return <div>{eventos}</div>;
};

export default EventMarker;
