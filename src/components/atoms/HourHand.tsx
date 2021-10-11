import React, {useState, Fragment} from "react";
import {
    Typography
} from "@material-ui/core";

//from https://material-ui-pickers.dev/demo/timepicker
import { TimePicker, KeyboardTimePicker } from "@material-ui/pickers";

function HourHand() {
  const [selectedStartTime, handleStartTimeChange] = useState<Date | null>(
    new Date('2021-10-09T21:11:54'),);
  const [selectedEndTime, handleEndTimeChange] = useState<Date | null>(
    new Date('2021-10-09T21:11:54'),);

  return (
    <Fragment>
        <Typography variant="h6">Horas</Typography>
        <KeyboardTimePicker
        ampm={false}
        variant="inline"
        label="Hora de inicio"
        value={selectedStartTime}
        onChange={handleStartTimeChange}
        />
        <KeyboardTimePicker
        ampm={false}
        variant="inline"
        label="Hora de finalización"
        value={selectedEndTime}
        onChange={handleEndTimeChange}
        />
    </Fragment>
  );
}

export default HourHand;
