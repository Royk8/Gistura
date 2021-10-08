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

function getDayOfWeek(date : number) : string{
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

function getMonthName(month : number) : string {
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

function formatTime(date: Date) {
	let h = date.getHours();
	let am = ' AM';
	if (h > 12) {
		am = ' PM';
		h -= 12;
	} else if (h === 12) {
		am = ' PM';
	}
	const ho = h.toString().padStart(2, '0');
	const mi = date.getMinutes().toString().padStart(2, '0');
	return `${ho}:${mi}${am}`;
}

function SchedulePopUp(props: any) {
	const [selectionColor, setSelectionColor] = useState<string>('default');
	const classes = useStyles();
	const { event } = props;
	const daysArray = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
	];
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

	const Fechas = event.schedules.map((fecha: any) => {
		const startDate = new Date(fecha.startDate);
		const diaSemana = daysArray[startDate.getDay()];
		const diaMes = startDate.getDate();
		const mes = monthsArray[startDate.getMonth()];
		const hour = formatTime(startDate);

		const endDate = new Date(fecha.endDate);
		const finDiaSemana = daysArray[endDate.getDay()];
		const finDiaMes = endDate.getDate();
		const finMes = monthsArray[endDate.getMonth()];

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
		);
	});
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			classes={{ paper: classes.paper }}
		>
			<Box sx={{ marginLeft: '10px' }}>
				<Typography variant="h1" align="left">
					{event.name}
				</Typography>
				<Typography variant="body2">Horarios</Typography>
			</Box>
			<Divider />
			{Fechas}
			<Divider />
		</Dialog>
	);
}

function MarkerPopUp(props: any) {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const { event } = props;

	const address = event.location.address || '';
	const specs = event.location.specs || '';
	const schedulesSize = Object.keys(event.schedules).length;
	let fechaInicio = Array(schedulesSize);

	for(let i = 0; i < schedulesSize; i++){

		const startDate = new Date(event.schedules[i].startDate);
		const diaSemana = getDayOfWeek(startDate.getDay());
		const diaMes = startDate.getDate();
		const mes = getMonthName(startDate.getMonth());

		const endDate = new Date(event.schedules[i].endDate);
		const finDiaSemana = getDayOfWeek(endDate.getDay());
		const finDiaMes = endDate.getDate();
		const finMes = getMonthName(endDate.getMonth());

		fechaInicio[i] = `${diaSemana} ${diaMes} de ${mes}`;

		const FinalDate = () => {
			if (
				diaSemana == finDiaSemana &&
				finDiaMes == finDiaMes &&
				finMes == mes
			) {
				return <div />;
			}
			return (
				<>
					- {finDiaSemana} {finDiaMes} de {finMes}
				</>
			);
		};
	}



	const restriction = event.minAge? 
		`Edad Minima: ${event.minAge} años.`
		: 'Sin restricciones de edad';
	const description = event.description || '';
	const sponsor = event.sponsor || '';
	const { category } = event;
	const { price } = event;
	const imageurl = event.imageUrls[0];

	

	const ImgUrl = (props: any) => {
		if (props.url == null) {
			return <div />;
		}
		return (
			<div>
				<img src={props.url} width="100%" />
			</div>
		);
	};

	const changeOpen = () => {
		setOpen(!open);
	};
//{diaSemana} {diaMes} de {mes} <FinalDate />
	return (
		<Box>
			<ImgUrl url={imageurl} />
			<Typography variant="h1">
				{' '}
				<b> {event.name} </b>{' '}
			</Typography>
			<Typography variant="h2">
				
			</Typography>
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
			<Typography variant="h2" color="primary">
				{sponsor}{' '}
			</Typography>
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
				dates={fechaCompleta}
			/>
		</Box>
	);
}

export default MarkerPopUp;
