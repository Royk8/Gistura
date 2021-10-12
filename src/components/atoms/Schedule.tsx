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
		new Date(),
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
		new Date(),
	);

	const todayDate = new Date();

	const handleStartDateChange = (date: Date | null) => {
		if(selectedEndDate && date){ // si end date y date existen
			if(date <= selectedEndDate){
				setSelectedStartDate(date);
			}
		}
	};

	const handleEndDateChange = (date: Date | null) => {
		if(selectedStartDate && date){ // si end date y date existen
			if(date >= selectedStartDate && date >= todayDate){
				setSelectedEndDate(date);
			}
		}
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
							helperText="La fecha de inicio ha de ser antes o la misma de la de finalización"
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
							helperText="La fecha de fin ha de ser despues o la misma de la de inicio"
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
