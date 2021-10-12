import React, { useState } from 'react';
import {
	Box,
	Button,
	makeStyles,
	Typography,
	Dialog,
	Divider,
	IconButton,
	Theme
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useCategory from '../../hooks/Category';
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles((theme: Theme) => ({
	buttonContainer: {
		alignItems: 'center',
		marginBottom: 10
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(0.1),
		top: theme.spacing(0.1),
		color: theme.palette.grey[500],
	},
	divider: {
		background: '#7A3B00',
	},
	imgContainer: {
		height: 400,
		width: "100%",
		display: 'table-cell',
		textAlign: 'center',
		verticalAlign: 'middle',
	
	},
	img: {
		objectFit: 'cover',
		width: "100%",
		height: 400
	},
	paper: {
		width: 400,
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 10
	},
	simpleButton: {
		color: 'primary',
		width: 120,

	},
	timeButton: {
		width: 180
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

function formatTime(time: string): string {
	let minutes = time.substring(3,5);
	let hours = parseInt(time.substring(0,3), 10);
	const ampm = (hours > 12)? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	return hours + ':' + minutes + ' ' + ampm;
}

interface Props {
	open: boolean;
	onClose: () => void;
	event: any,
	fechas: any[];
}

function SchedulePopUp({ open, onClose, event, fechas }: Props) {
	const classes = useStyles();

	const horarios = fechas.map((fecha : any) => {

		const timeButtons = (hourHands: any) => {
			return hourHands.map((hour: any) => {
				const st : string = hour['startTime'];
				const en : string = hour['endTime'];
				const hourText = `${formatTime(st)} - ${formatTime(en)}`;
				let variante = 'outlined';
				const selectButton = ((variant : string) => {
					if(variant === 'outlined')
						variant = 'contained';
					else
						variant = 'outlined'
				})
				return (
					<Button
					variant={variante}
					className={classes.timeButton}
					onClick={selectButton(variante)}
					>
						<Typography variant="h2">{hourText}</Typography>
					</Button>)		
			});	
		};		
		return(
			<Box sx={{ marginTop: '10px' }}>
				<Typography variant='h2' color='primary'>{fecha['start']} </Typography>
				{timeButtons(fecha.hourHands)}
			</Box>);
	})

	return (
		<Dialog
			open={open}
			onClose={onClose}
			classes={{ paper: classes.paper }}
		>
			<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          		<CloseIcon />
        	</IconButton>
			<Box sx={{ marginLeft: '10px' }}>
				<Typography variant="h1" align="left">
					{event.name}
				</Typography>
				<Typography variant="body2">Horarios</Typography>
			</Box>
			<Divider />
			<div className={classes.buttonContainer} >
				{horarios}
			</div>
			<Divider />
			<div>
				<Button onClick={onClose} className={classes.simpleButton}>
					Regresar
				</Button>
			</div>
		</Dialog>
	);
}

function MarkerPopUp(props: any) {
	const [open, setOpen] = useState(false);
	const { event } = props;
	const classes = useStyles();

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

		const end = () => {
			if (diaSemana === finDiaSemana && finMes === mes) {
				return '';
			}
			return `${finDiaSemana} ${finDiaMes} de ${finMes}`;
		}

		fechas.push({
			start: `${diaSemana} ${diaMes} de ${mes}`,
			end: end(),
			hourHands: event.schedules[i].hourHands
		});
	}

	const isFechas : boolean = !(fechas.length === 0)

	const rangoDeFechas = () => {
		if (!isFechas) {
			return '';
		}
		if (fechas.at(-1).end === '') {
			if(fechas.length === 1){
				return `${fechas[0].start}`;
			}
			return `${fechas[0].start} - ${fechas.at(-1).start}`;
		}
		return `${fechas[0].start} - ${fechas.at(-1).end}`;
	};



	const restriction = event.minAge
		? `Edad Minima: ${event.minAge} años.`
		: 'Sin restricciones de edad';
	const description = event.description || '';

	const { category } = event;
	const price = (event.price && event.price !== '0')
		? `$ ${event.price}`
		: 'Entrada Gratuita';
		
	const imageurl = event.imageUrls[0];

	const {Component: CategoryLabel} = useCategory({id:category, label:true}) || {Component: () => <></>}

	const ImgUrl = ({ url }: { url: string }) => {
		if (url == null) {
			return <div />;
		}
		return (
			<div >
				<img src={url} className={classes.img} alt={url} />
			</div>
		);
	};

	
	const eventUrl = () => {
		if(event.sponsorPage != null){
			let sponsorUrl : string = event.sponsorPage;
			if (!sponsorUrl.startsWith('http')){
				sponsorUrl = 'https://' + event.sponsorPage;
			}
			return (
					<Button href={sponsorUrl} target='_blank'>
						<Typography variant="h2" color="primary">
							Página del Evento
						</Typography>
					</Button> );
		}
		return(	<></>)
	};

	const changeOpen = () => {
		setOpen(!open);
	};

	const Horarios = () => {
		if(isFechas){
			return(
			<Button onClick={() => changeOpen()}>
				<Typography variant="h2" color="primary">
					Horarios
				</Typography>
			</Button>
			)
		}
		return (<></>);
	}

	return (
		<Box>
			<ImgUrl url={imageurl} />
			<Typography variant="h1">
				{' '}
				<b> {event.name} </b>{' '}
			</Typography>
			<Typography variant="h2">{rangoDeFechas()}</Typography>
			<Typography display="inline" variant="h2">
				<CategoryLabel/> 
			</Typography>
			<Typography display="inline" variant="h2" color="primary">
				{price}{' '}
			</Typography>
			<br />
			<br />
			<Typography variant="h2">{description} </Typography>
			<br />
			<Typography variant="h2">
				{address} {specs}{' '}
			</Typography>
			<Typography variant="body2">{restriction}</Typography>
			<br />

			<Box sx={{ alignContent: 'center', display: 'inline-block' }}>
				{eventUrl()}{Horarios()}

			</Box>
			<SchedulePopUp
				event={event}
				fechas={fechas}
				onClose={() => changeOpen()}
				open={open}
			/>
		</Box>
	);
}

export default MarkerPopUp;
