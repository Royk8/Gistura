import 'date-fns';

import React, { FC, useState } from 'react';
import { Typography, IconButton, Collapse } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import HourHand from './HourHand';
import {
	Schedule as ScheduleInterface,
	HourHand as HourHandInterface,
} from '../../interfaces/scheduleInterfaces';

type HourHandValueFunction = (
	current: ScheduleInterface,
) => HourHandInterface[];

interface Props {
	data: ScheduleInterface;
	index: number;
	onUpdate: (options: {
		add?: ScheduleInterface;
		update?: {
			index: number;
			field: keyof ScheduleInterface;
			value: Date | HourHandValueFunction;
		};
		remove?: {
			index: number;
		};
	}) => void;
}

const useStyles = makeStyles(() => ({
	row: {
		display: 'flex',
		width: '100%',
		'&>*': {
			width: '49%',
			'&:not(:last-child)': {
				marginRight: '2%',
			},
		},
	},
	collapseTitle: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

const Schedule: FC<Props> = ({ data, index, onUpdate }) => {
	const { startDate, endDate, hourHands } = data;
	const [open, setOpen] = useState({ start: false, end: false });
	const [showTimes, setShowTimes] = useState(true);

	const classes = useStyles();

	const handleChangeDate = (
		field: 'startDate' | 'endDate',
		value: Date | null,
	) => {
		if (
			value?.getMonth() !== data[field].getMonth() ||
			value?.getDate() !== data[field].getDate()
		) {
			setOpen({ start: false, end: false });
		}
		if (value) {
			onUpdate({
				update: {
					field,
					index,
					value,
				},
			});
			if (field === 'startDate' && value > endDate) {
				onUpdate({
					update: {
						field: 'endDate',
						index,
						value,
					},
				});
			}
		}
	};

	const updateHourHand = ({
		add,
		update,
		remove,
	}: {
		add?: HourHandInterface;
		update?: {
			index: number;
			field: keyof HourHandInterface;
			value: Date;
		};
		remove?: {
			index: number;
		};
	}) => {
		if (add) {
			onUpdate({
				update: {
					field: 'hourHands',
					index,
					value: (currentSchedule) => [
						...currentSchedule.hourHands,
						add,
					],
				},
			});
		} else if (remove) {
			onUpdate({
				update: {
					field: 'hourHands',
					index,
					value: (currentSchedule) =>
						currentSchedule.hourHands.filter(
							(_, i) => i !== remove.index,
						),
				},
			});
		} else if (update) {
			onUpdate({
				update: {
					field: 'hourHands',
					index,
					value: (currentSchedule) =>
						currentSchedule.hourHands.map((currentHourHand, i) =>
							i === update.index
								? {
										...currentHourHand,
										[update.field]: update.value,
								  }
								: currentHourHand,
						),
				},
			});
		}
	};

	return (
		<>
			<div className={classes.row}>
				<KeyboardDatePicker
					open={open.start}
					onClick={() =>
						setOpen((current) => ({ ...current, start: true }))
					}
					onClose={() =>
						setOpen((current) => ({ ...current, start: false }))
					}
					variant="inline"
					format="MM/dd/yyyy"
					label="Inicio"
					value={startDate}
					onChange={(date) => handleChangeDate('startDate', date)}
					minDate={new Date()}
					inputVariant="filled"
					helperText="Fecha de inicio"
				/>
				<KeyboardDatePicker
					open={open.end}
					onClick={() =>
						setOpen((current) => ({ ...current, end: true }))
					}
					onClose={() =>
						setOpen((current) => ({ ...current, end: false }))
					}
					variant="inline"
					format="MM/dd/yyyy"
					label="Finalización"
					value={endDate}
					onChange={(date) => handleChangeDate('endDate', date)}
					minDate={startDate}
					inputVariant="filled"
					helperText="Fecha de finalización"
				/>
			</div>
			<div>
				<Typography className={classes.collapseTitle}>
					Horarios por día
					<span>
						{showTimes && (
							<IconButton
								onClick={() =>
									updateHourHand({
										add: {
											startTime: new Date(),
											endTime: new Date(),
										},
									})
								}
							>
								<Add />
							</IconButton>
						)}
						<IconButton
							onClick={() => setShowTimes((current) => !current)}
						>
							{showTimes ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
					</span>
				</Typography>
			</div>
			<Collapse in={showTimes}>
				{hourHands.map((hourHand, i) => (
					<HourHand
						data={hourHand}
						index={i}
						onUpdate={updateHourHand}
						key={`SCHEDULE_${index}_HOUR_HAND_${i}`}
					/>
				))}
			</Collapse>
		</>
	);
};

export default Schedule;
