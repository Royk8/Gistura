import { Location } from './locationInterfaces';
import { Schedule } from './scheduleInterfaces';

export interface Event {
	name: string;
	description?: string;
	imageUrls?: string[];
	minAge?: number;
	location: Location;
	price?: number;
	sponsor?: number; // id reference for intertface Sponsor
	sponsorPage?: string;
	schedules: Schedule[];
	category: number; // id reference for intertface EventCategory
}

export const initialEvent: Event = {
	category: 0,
	location: {
		address: '',
		city: '',
		country: '',
		latitude: 0,
		longitude: 0,
	},
	name: '',
	schedules: [
		{
			endDate: new Date(),
			hourHands: [
				{
					endTime: new Date(),
					startTime: new Date(),
				},
			],
			startDate: new Date(),
		},
	],
};
