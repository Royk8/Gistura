import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/dist/shared/lib/router/router';

import theme from '../styles/theme';

const MyApp = (props: AppProps) => {
	const { Component, pageProps } = props;

	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles?.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Gistura - Encuentra tu evento</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};

export default MyApp;
