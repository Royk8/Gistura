import config from './config';
import Nominatim from '../../interfaces/nominatimInterfaces';

const api = config('reverse');

export const getReverseInfo = async ({
	lat,
	lon,
}: Nominatim.Api.ReverseRequest) =>
	api.get<Nominatim.Api.ReverseResponse>(
		`?format=jsonv2&lat=${lat}&lon=${lon}`,
	);

export default api;
