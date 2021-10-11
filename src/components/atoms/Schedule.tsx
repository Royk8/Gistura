import 'date-fns';

import React, { useState } from 'react';
import { Typography, Grid, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import HourHand from './HourHand';

const Schedule = () => {
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
		new Date('2021-10-09T21:11:54'),
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
		new Date('2021-10-10T21:11:54'),
	);

	const handleStartDateChange = (date: Date | null) => {
		setSelectedStartDate(date);
	};

	const handleEndDateChange = (date: Date | null) => {
		setSelectedEndDate(date);
	};

	const [HourHands, setHourHands] = useState<String[]>(['']);

	return (
		<>
			<Typography variant="h6">Fechas</Typography>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Grid container justifyContent="space-around">
					<Grid item>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							id="date-picker-inline"
							label="Fecha de inicio"
							value={selectedStartDate}
							onChange={handleStartDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</Grid>
				</Grid>
			</MuiPickersUtilsProvider>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Grid container justifyContent="space-around">
					<Grid item>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							id="date-picker-inline"
							label="Fecha de finalización"
							value={selectedEndDate}
							onChange={handleEndDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</Grid>
				</Grid>
			</MuiPickersUtilsProvider>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				{HourHands.map(() => (
					<HourHand />
				))}
				<IconButton
					onClick={() => {
						setHourHands([...HourHands, '']);
					}}
				>
					<Add />
				</IconButton>
			</MuiPickersUtilsProvider>
		</>
	);
};

export default Schedule;
