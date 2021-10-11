import React, { useState } from 'react';
import {
	Box,
	Button,
	makeStyles,
	Typography,
	Dialog,
	Divider,
} from '@material-ui/core';
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles(() => ({
	paper: {
		width: 300,
		height: 300,
	},
	divider: {
		background: '#7A3B00',
	},
}));

function getDayOfWeek(date: number): string {
	const daysArray = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
	];
	return daysArray[date];
}

function getMonthName(month: number): string {
	const monthsArray = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	];
	return monthsArray[month];
}

interface Props {
	open: boolean;
	onClose: () => void;
	event: any;
}

function SchedulePopUp({ open, onClose, event }: Props) {
	const classes = useStyles();

	/* const Fechas = event.schedules.map((fecha: any) => {
		const startDate = new Date(fecha.startDate);
		const diaSemana = getDayOfWeek(startDate.getDay());
		const diaMes = startDate.getDate();
		const mes = getMonthName(startDate.getMonth());
		const hour = formatTime(startDate);

		const endDate = new Date(fecha.endDate);
		const finDiaSemana = getDayOfWeek(endDate.getDay());
		const finDiaMes = endDate.getDate();
		const finMes = getMonthName(endDate.getMonth());

		const selectButton = () => {
			if (selectionColor === 'default') {
				setSelectionColor('primary');
			} else {
				setSelectionColor('default');
			}
		};

		return (
			<Box sx={{ marginLeft: '10px' }}>
				<Typography variant="h2">
					{diaSemana} {diaMes} de {mes}
				</Typography>
				<Button
					variant="contained"
					color={selectionColor}
					onClick={selectButton}
				>
					<Typography variant="h2">{hour}</Typography>
				</Button>
			</Box>
		);{Fechas}
	}); */
	return (
		<Dialog
			open={open}
			onClose={onClose}
			classes={{ paper: classes.paper }}
		>
			<Box sx={{ marginLeft: '10px' }}>
				<Typography variant="h1" align="left">
					{event.name}
				</Typography>
				<Typography variant="body2">Horarios</Typography>
			</Box>
			<Divider />
			No Hay Fechas
			<Divider />
		</Dialog>
	);
}

function MarkerPopUp(props: any) {
	const [open, setOpen] = useState(false);
	const { event } = props;

	const address = event.location.address || '';
	const specs = event.location.specs || '';
	const schedulesSize = Object.keys(event.schedules).length;

	const fechas: any[] = [];

	for (let i = 0; i < schedulesSize; i += 1) {
		const startDate = new Date(event.schedules[i].startDate);
		const diaSemana = getDayOfWeek(startDate.getDay());
		const diaMes = startDate.getDate();
		const mes = getMonthName(startDate.getMonth());

		const endDate = new Date(event.schedules[i].endDate);
		const finDiaSemana = getDayOfWeek(endDate.getDay());
		const finDiaMes = endDate.getDate();
		const finMes = getMonthName(endDate.getMonth());

		fechas.push({
			start: `${diaSemana} ${diaMes} de ${mes}`,
			end: () => {
				if (diaSemana === finDiaSemana && finMes === mes) {
					return '';
				}
				return `${finDiaSemana} ${finDiaMes} de ${finMes}`;
			},
		});
	}

	const rangoDeFechas = () => {
		if (fechas.length === 0) {
			return '';
		}
		if (fechas.at(-1).end === '') {
			return `${fechas[0].start} - ${fechas.at(-1).start}`;
		}
		return `${fechas[0].start} - ${fechas.at(-1).end}`;
	};

	const restriction = event.minAge
		? `Edad Minima: ${event.minAge} años.`
		: 'Sin restricciones de edad';
	const description = event.description || '';
	const { category } = event;
	const { price } = event;
	const imageurl = event.imageUrls[0];

	const ImgUrl = ({ url }: { url: string }) => {
		if (url == null) {
			return <div />;
		}
		return (
			<div>
				<img src={url} width="100%" alt={url} />
			</div>
		);
	};

	const changeOpen = () => {
		setOpen(!open);
	};

	return (
		<Box>
			<ImgUrl url={imageurl} />
			<Typography variant="h1">
				{' '}
				<b> {event.name} </b>{' '}
			</Typography>
			<Typography variant="h2">{rangoDeFechas}</Typography>
			<Typography display="inline" variant="h2">
				{category} -{' '}
			</Typography>
			<Typography display="inline" variant="h2" color="primary">
				${price}{' '}
			</Typography>
			<br />
			<br />
			<Typography variant="h2">{description} </Typography>
			<Typography variant="h2">
				{address} {specs}{' '}
			</Typography>
			<Typography variant="body2">{restriction}</Typography>
			<br />

			<Box sx={{ alignContent: 'center' }}>
				<Button>
					<Typography variant="h2" color="primary">
						Página del Evento
					</Typography>
				</Button>
				<Button onClick={() => changeOpen()}>
					<Typography variant="h2" color="primary">
						Horarios
					</Typography>
				</Button>
			</Box>
			<SchedulePopUp
				event={event}
				onClose={() => changeOpen()}
				open={open}
			/>
		</Box>
	);
}

export default MarkerPopUp;
