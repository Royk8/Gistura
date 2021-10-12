import React, { useEffect, useRef, useState } from 'react';
import {
	Drawer,
	Typography,
	TextField,
	IconButton,
	Theme,
	MenuItem,
	Collapse,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as Icons from '@material-ui/icons';

import * as CustomIcons from '../atoms/icons/MapIcons';
import MinAgeCustomFormat from '../atoms/numberFormats/MinAge';
import PriceCustomFormat from '../atoms/numberFormats/Price';
import Schedule from '../atoms/Schedule';
import { useAppSelector } from '../../hooks/redux';
import { selectCategories } from '../../state/slices/categorySlice';
import { Event, initialEvent } from '../../interfaces/eventInterfaces';
import { Location } from '../../interfaces/locationInterfaces';
import {
	Schedule as ScheduleInterface,
	HourHand,
} from '../../interfaces/scheduleInterfaces';
import { Icon as IconNamespace } from '../../interfaces/iconInterfaces';
import { getReverseInfo } from '../../api/nominatim/reverseApi';
import { createEvent } from '../../api/backtura/eventApi';
import { selectEvents } from '../../state/slices/eventSlice';

const useStyles = makeStyles((theme: Theme) => ({
	drawerPaper: {
		width: 'min(450px, 100%)',
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			top: 64,
		},
		[theme.breakpoints.down('sm')]: {
			height: 'calc(100% - 56px)',
			top: 56,
		},
		padding: 25,
		zIndex: 1000,
	},
	drawer: {
		width: 'min(450px, 100%)',
	},
	categoryItem: {
		display: 'flex',
		alignItems: 'center',
		'&>*': {
			margin: theme.spacing(1),
		},
	},
	row: {
		width: '100%',
		display: 'flex',
		'&>*': {
			width: '49%',
			'&:not(:last-child)': {
				marginRight: '2%',
			},
		},
	},
	collapse: {
		minHeight: 'auto !important',
	},
	collapseTitle: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

type EventValueFunction = (currentEvent: Event) => any;
type ScheduleValueFunction = (currentEvent: ScheduleInterface) => HourHand[];

const CreateEvSideMenu = ({ open, onClose }: any) => {
	const [event, setEvent] = useState<Event>(initialEvent);
	const [showDates, setShowDates] = useState(true);

	const paperRef = useRef<HTMLDivElement>(null);
	const classes = useStyles();
	const { categories } = useAppSelector(selectCategories);
	const { location: reduxLocation } = useAppSelector(selectEvents);

	const { ExpandMore, ExpandLess, Add } = Icons;
	const disableSubmit =
		!event.name || !event.category || !event.location || !event.schedules;

	const updateEvent = (
		field: keyof Event,
		value?: string | number | EventValueFunction,
	) => {
		setEvent((current) => ({
			...current,
			[field]: typeof value === 'function' ? value(current) : value,
		}));
	};

	const updateLocation = (field: keyof Location, value: string | number) => {
		updateEvent('location', ({ location }) => ({
			...location,
			[field]: value,
		}));
	};

	const goToBottom = (timeout?: number) => {
		setTimeout(() => {
			if (paperRef?.current) {
				paperRef.current.scrollTo({
					behavior: 'smooth',
					top: paperRef.current.getBoundingClientRect().bottom + 1000,
				});
			}
		}, timeout || 50);
	};

	const updateSchedule = ({
		add,
		update,
		remove,
	}: {
		add?: ScheduleInterface;
		update?: {
			index: number;
			field: keyof ScheduleInterface;
			value: Date | ScheduleValueFunction;
		};
		remove?: {
			index: number;
		};
	}) => {
		if (add) {
			goToBottom();
			updateEvent('schedules', ({ schedules }) => [...schedules, add]);
		} else if (remove) {
			updateEvent('schedules', ({ schedules }) =>
				schedules.filter((_, index) => index !== remove.index),
			);
		} else if (update) {
			updateEvent('schedules', ({ schedules }) =>
				schedules.map((schedule, index) =>
					index === update.index
						? {
								...schedule,
								[update.field]:
									typeof update.value === 'function'
										? update.value(schedule)
										: update.value,
						  }
						: schedule,
				),
			);
		}
	};

	const handleSubmit = async () => {
		await createEvent(event);
	};

	useEffect(() => {
		getReverseInfo(reduxLocation).then(({ data }) => {
			updateEvent('location', (currentEvent) => ({
				...currentEvent.location,
				city: data.address?.city || '',
				country: data.address?.country || '',
				latitude: Number(data.lat),
				longitude: Number(data.lon),
				address: data.name,
				specs: data.display_name.replace(`${data.name}, `, ''),
			}));
		});
	}, [reduxLocation]);

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				classes={{ paper: classes.drawerPaper }}
				PaperProps={{
					ref: paperRef,
				}}
				open={open}
				onClose={onClose}
				transitionDuration={100}
			>
				<TextField
					required
					label="Nombre"
					variant="filled"
					helperText="Nombre del evento"
					value={event?.name || ''}
					onChange={({ target }) => updateEvent('name', target.value)}
				/>
				<TextField
					required
					select
					label="Categoría"
					variant="filled"
					helperText="Selecciona una categoría para el evento"
					value={event?.category || ''}
					onChange={({ target }) =>
						updateEvent('category', target.value)
					}
					SelectProps={{
						renderValue: (value) =>
							categories.find(({ id }) => id === value)?.name,
					}}
				>
					{categories.map(({ id, name, icon, color }) => {
						const Icon =
							icon.type === IconNamespace.Types.CUSTOM
								? (CustomIcons as any)[icon.name]
								: (Icons as any)[icon.name];
						return (
							<MenuItem
								key={`CATEGORY_SELECTOR_${id}`}
								value={id}
								style={{ color }}
							>
								<div className={classes.categoryItem}>
									<Icon color="inherit" />
									<Typography color="inherit">
										{name}
									</Typography>
								</div>
							</MenuItem>
						);
					})}
				</TextField>
				<TextField
					multiline
					label="Descripción"
					variant="filled"
					helperText="Descripción del evento"
					value={event?.description || ''}
					onChange={({ target }) =>
						updateEvent('description', target.value)
					}
				/>
				<div className={classes.row}>
					<TextField
						label="Edad mínima"
						variant="filled"
						helperText="Edad mínima en años"
						value={event?.minAge || ''}
						onChange={({ target }) => {
							const value = Number(target.value);
							if (value > 0 && value < 100) {
								updateEvent('minAge', value);
							} else if (Number.isNaN(value)) {
								updateEvent('minAge', undefined);
							}
						}}
						InputProps={{
							inputComponent: MinAgeCustomFormat as any,
						}}
					/>
					<TextField
						label="Precio"
						variant="filled"
						helperText="Precio en pesos"
						value={event?.price || ''}
						onChange={({ target }) => {
							const value = Number(target.value);
							if (value >= 0) {
								updateEvent('price', value);
							} else if (Number.isNaN(value)) {
								updateEvent('price', undefined);
							}
						}}
						InputProps={{
							inputComponent: PriceCustomFormat as any,
						}}
					/>
				</div>
				<TextField
					label="Pagina web"
					autoComplete="url"
					variant="filled"
					helperText="Página web del evento"
					value={event?.sponsorPage || ''}
					onChange={({ target }) =>
						updateEvent('sponsorPage', target.value)
					}
				/>
				<TextField
					required
					label="Dirección"
					autoComplete="street-address"
					variant="filled"
					helperText="Dirección del evento"
					value={event?.location.address || ''}
					onChange={({ target }) =>
						updateLocation('address', target.value)
					}
				/>
				<div className={classes.row}>
					<TextField
						required
						disabled
						label="Ciudad"
						variant="filled"
						helperText="Ciudad del evento"
						value={event?.location.city || ''}
					/>
					<TextField
						required
						disabled
						label="País"
						variant="filled"
						helperText="País del evento"
						value={event?.location.country || ''}
					/>
				</div>
				<TextField
					multiline
					label="Especificaciones"
					autoComplete="address-level4"
					variant="filled"
					helperText="Información orientativa sobre la dirección del evento"
					value={event?.location.specs || ''}
					onChange={({ target }) =>
						updateLocation('specs', target.value)
					}
				/>
				<div className={classes.row}>
					<TextField
						required
						disabled
						label="Latitud"
						variant="filled"
						helperText="País del evento"
						value={event?.location.latitude || ''}
					/>
					<TextField
						required
						disabled
						label="Longitud"
						variant="filled"
						helperText="País del evento"
						value={event?.location.longitude || ''}
					/>
				</div>
				<div>
					<Typography className={classes.collapseTitle}>
						Fechas
						<span>
							{showDates && (
								<IconButton
									onClick={() =>
										updateSchedule({
											add: {
												endDate: new Date(),
												hourHands: [],
												startDate: new Date(),
											},
										})
									}
								>
									<Add />
								</IconButton>
							)}
							<IconButton
								onClick={() =>
									setShowDates((current) => !current)
								}
							>
								{showDates ? <ExpandLess /> : <ExpandMore />}
							</IconButton>
						</span>
					</Typography>
				</div>
				<Collapse in={showDates} className={classes.collapse}>
					{event.schedules.map((schedule, i) => (
						<Schedule
							data={schedule}
							index={i}
							onUpdate={updateSchedule}
							key={`SCHEDULE_LIST_ITEM_${i}`}
						/>
					))}
				</Collapse>
				<Button
					onClick={handleSubmit}
					color="primary"
					variant="contained"
					disabled={disableSubmit}
				>
					Crear Evento
				</Button>
			</Drawer>
		</>
	);
};

export default CreateEvSideMenu;
