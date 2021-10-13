import config from './config';
import { Event } from '../../interfaces/eventInterfaces';

const api = config('eventos');

const locale = 'es-CO';
export const getSlashStyleDate = (date?: Date) =>
	date
		? Intl.DateTimeFormat(locale, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
		  })
				.format(date)
				.split('/')
				.reverse()
				.join('-')
		: undefined;

export const getHour = (date?: Date) =>
	date
		? Intl.DateTimeFormat(locale, {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
		  }).format(date)
		: undefined;

export const createEvent = async (event: Event) =>
	api.post<any>('', {
		...event,
		schedules: event.schedules.map(({ startDate, endDate, hourHands }) => ({
			startDate: getSlashStyleDate(startDate),
			endDate: getSlashStyleDate(endDate),
			hourHands: hourHands.map(({ startTime, endTime }) => ({
				startTime: getHour(startTime),
				endTime: getHour(endTime),
			})),
		})),
	});

export const getEvents = async () => api.get<Event[]>('');
export default api;
