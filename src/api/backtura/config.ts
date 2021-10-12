import axios from 'axios';

type URLS = 'categorias' | 'eventos';

const backturaInstance = (instanceURL: URLS, version?: number) =>
	axios.create({
		baseURL: `https://backtura.gistura.com/v${
			version || '1'
		}/${instanceURL}`,
		headers: {
			Authorization: process.env.NEXT_PUBLIC__API_KEY || '',
		},
	});

export default backturaInstance;
