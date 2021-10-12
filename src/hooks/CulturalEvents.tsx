import { useEffect, useState } from 'react';

export function useFetchEventsJSON() {
	const [cultural, setCultural] = useState<[] | null>();
	const url = 'https://backtura.gistura.com/v1/eventos';
	const accessToken =
		'Bearer RVJSRSBjb24gRVJSRSBDSUdBUlJPIEVSUkUgY29uIEVSUkUgQkFSUklMCm1pIG1hbWEgbWUgbWltYQptYXJnb3QgZXMgbGEgbWVqb3I=';

	const fetchApi = async () => {
		const response = await fetch(url, {
			headers: { Authorization: accessToken },
		});
		const respondeJSON = await response.json();
		setCultural(respondeJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return { cultural };
}

export default useFetchEventsJSON;
