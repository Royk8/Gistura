import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Map } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EventMarker from './EventMarker';
import { useFetchEventsJSON } from '../../hooks/CulturalEvents';
import 'leaflet/dist/leaflet.css';
import customTheme from '../../styles/theme';
import { useAppDispatch } from '../../hooks/redux';
import { setLocation } from '../../state/slices/eventSlice';

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

	const { cultural } = useFetchEventsJSON();
	const dispatch = useAppDispatch();

	const EventosFuncionales = () =>
		cultural ? <EventMarker eventos={cultural} /> : null;

	const classes = useStyles();

	useEffect(() => {
		map?.addEventListener('click', ({ latlng }: any) => {
			dispatch(
				setLocation({
					lat: latlng.lat.toString(),
					lon: latlng.lng.toString(),
				}),
			);
		});
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
				{EventosFuncionales()}
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
			</MapContainer>
		</div>
	);
};

export default MapViewer;
