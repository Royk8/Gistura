import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import Header from '../components/organisms/Header';
import { useAppDispatch } from '../hooks/redux';
import { fetchCategories } from '../state/slices/categorySlice';

const Home = () => {
	const MapViewer = dynamic(
		() => import('../components/molecules/MapViewer'),
		{
			ssr: false,
		},
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	return (
		<>
			<Header />
			<MapViewer />
		</>
	);
};

export default Home;
