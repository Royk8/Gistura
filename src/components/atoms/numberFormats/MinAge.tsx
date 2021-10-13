import React, { FC } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

const MinAgeCustomFormat: FC<NumberFormatProps> = (props) => {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={({ floatValue }) => {
				if (onChange) {
					onChange({
						target: {
							value: floatValue,
						},
					} as any);
				}
			}}
			thousandSeparator
			isNumericString
			allowNegative={false}
			suffix=" años"
			isAllowed={({ value }) => {
				const parsed = Number(value);
				return Number.isNaN(parsed) || (parsed >= 0 && parsed < 100);
			}}
		/>
	);
};

export default MinAgeCustomFormat;
