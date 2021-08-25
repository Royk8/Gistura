import React from 'react';
import dynamic from 'next/dynamic';

import Header from '../components/organisms/Header';

const Home = () => {
	const MapViewer = dynamic(() => import('../components/atoms/MapViewer'), {
		ssr: false,
	});

	return (
		<>
			<Header />
			<MapViewer />
		</>
	);
};

export default Home;
