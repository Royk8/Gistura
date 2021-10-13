import axios from 'axios';

type URLS = 'reverse';

const nominatimInstance = (instanceURL: URLS) =>
	axios.create({
		baseURL: `https://nominatim.openstreetmap.org/${instanceURL}`,
	});

export default nominatimInstance;
