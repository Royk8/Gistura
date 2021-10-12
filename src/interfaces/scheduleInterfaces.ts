export interface Schedule {
	startDate: Date;
	endDate: Date;
	hourHands: HourHand[];
}

export interface HourHand {
	startTime: Date;
	endTime: Date;
}
