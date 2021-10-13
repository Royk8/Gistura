import React, { FC, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { Schedule } from '@material-ui/icons';

import { HourHand as HourHandInterface } from '../../interfaces/scheduleInterfaces';

interface Props {
	data: HourHandInterface;
	index: number;
	onUpdate: (options: {
		add?: HourHandInterface;
		update?: {
			index: number;
			field: keyof HourHandInterface;
			value: Date;
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
}));

const HourHand: FC<Props> = ({ data, index, onUpdate }) => {
	const { endTime, startTime } = data;

	const [endTimeError, setEndTimeError] = useState('');
	const [open, setOpen] = useState({ start: false, end: false });

	const classes = useStyles();

	const handleChangeTime = (
		field: keyof HourHandInterface,
		value: Date | null,
	) => {
		if (value) {
			onUpdate({
				update: {
					field,
					index,
					value,
				},
			});
			if (field === 'startTime' && value > endTime) {
				onUpdate({
					update: {
						field: 'endTime',
						index,
						value,
					},
				});
				setEndTimeError('');
			} else if (field === 'endTime' && value < startTime) {
				setEndTimeError(
					'La hora salida debe ser despues a la hora de entrada del evento',
				);
			} else {
				setEndTimeError('');
			}
		}
	};

	return (
		<div className={classes.row}>
			<KeyboardTimePicker
				ampm
				open={open.start}
				variant="inline"
				label="Entrada"
				value={startTime}
				onChange={(date) => handleChangeTime('startTime', date)}
				helperText="Hora de entrada"
				inputVariant="filled"
				keyboardIcon={<Schedule />}
				onClick={() =>
					setOpen((current) => ({ ...current, start: true }))
				}
				onClose={() =>
					setOpen((current) => ({ ...current, start: false }))
				}
			/>
			<Tooltip title={endTimeError}>
				<KeyboardTimePicker
					ampm
					open={open.end}
					variant="inline"
					label="Salida"
					value={endTime}
					onChange={(date) => handleChangeTime('endTime', date)}
					helperText="Hora de salida"
					error={!!endTimeError}
					inputVariant="filled"
					keyboardIcon={<Schedule />}
					onClick={() =>
						setOpen((current) => ({ ...current, end: true }))
					}
					onClose={() =>
						setOpen((current) => ({ ...current, end: false }))
					}
				/>
			</Tooltip>
		</div>
	);
};

export default HourHand;
