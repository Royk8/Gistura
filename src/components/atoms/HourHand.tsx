import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

// from https://material-ui-pickers.dev/demo/timepicker
import { KeyboardTimePicker } from '@material-ui/pickers';

function HourHand() {
	const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
		new Date(),
	);
	const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
		new Date(),
	);

	const currentTime = new Date();

	const handleStartTimeChange = (time: Date | null) => {
		if(selectedEndTime && time){ 
			if(time <= selectedEndTime){
				setSelectedStartTime(time);
			}
		}
	};

	const handleEndTimeChange = (time: Date | null) => {
		if(selectedStartTime && time){
			if(time >= selectedStartTime && time>currentTime){
				setSelectedEndTime(time);
			}
		}
	};

	return (
		<>
			<Typography variant="h6">Horas</Typography>
			<KeyboardTimePicker
				ampm={false}
				variant="inline"
				label="Hora de inicio"
				value={selectedStartTime}
				onChange={handleStartTimeChange}
				helperText="La hora de inicio ha de ser antes de la final"
			/>
			<KeyboardTimePicker
				ampm={false}
				variant="inline"
				label="Hora de finalización"
				value={selectedEndTime}
				onChange={handleEndTimeChange}
				helperText="La hora final ha de ser antes inicial"
			/>
		</>
	);
}

export default HourHand;
