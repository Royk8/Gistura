import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { latLngBounds, Map, marker, icon } from 'leaflet';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EventMarker from '../atoms/EventMarker';

import 'leaflet/dist/leaflet.css';
import customTheme from '../../styles/theme';

const useStyles = makeStyles((theme: Theme) => ({
	map: {
		width: '100vw',
		[theme.breakpoints.down('sm')]: {
			height: 'calc(100vh - 56px)',
		},
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100vh - 64px)',
		},
	},
}));

const MapViewer = () => {
	const [map, setMap] = useState<Map | null>(null);
	const [currentLocation, setCurrentLocation] = useState<[number, number]>([
		0, 0,
	]);

	/*Bloquear coordenadas en Medellín
	const corners = [
		{ lat: 6.092365, lng: -75.695086 },
		{ lat: 6.466048, lng: -75.359317 },
	];*/

	const evnts = [ 
		{cord : {lat: 6.2726313123734085, lng: -75.5671962 },
		type : "Concert",
		info : {
			name : "Concierto por la paz",
			place : "Parque Norte"
			},
		},
		{cord : {lat: 6.270440780963118, lng: -75.56680409987322 },
		type : "Art",
		info : {
			name : "Concierto por la guerra",
			place : "Estadio Cincuentenario"
			},
		},	
	];

	//const latLngBound = latLngBounds(corners[0], corners[1]);
	const classes = useStyles();


	useEffect(() => {
		if (navigator?.geolocation && map) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const coords: [number, number] = [
						position.coords.latitude,
						position.coords.longitude,
					];

					map.setView(coords, 16);
					setCurrentLocation(coords);
				},
				console.error,
				{ enableHighAccuracy: true },
			);
		}
	}, [map]);

	return (
		<div id="hellowis">
			<MapContainer
				center={[6.2519059, -75.5680812]}
				whenCreated={setMap}
				className={classes.map}
				zoom={14}
				scrollWheelZoom
				zoomControl={false}
			>
				<ZoomControl position="bottomright" />
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
				/>
				{currentLocation[0] && currentLocation[1] && (
					<Circle
						center={currentLocation}
						radius={200}
						pathOptions={{
							color: customTheme.palette.primary.main,
						}}
						eventHandlers={{
							click: () => map?.setView(currentLocation, 16),
						}}
					/>
				)}
				<EventMarker events={evnts} />
			</MapContainer>			
		</div>
	);
};

export default MapViewer;
