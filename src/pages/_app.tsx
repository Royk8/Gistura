import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';

import theme from '../styles/theme';
import store from '../state/store';

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
				<Provider store={store}>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						locale={esLocale}
					>
						<CssBaseline />
						<Component {...pageProps} />
					</MuiPickersUtilsProvider>
				</Provider>
			</ThemeProvider>
		</>
	);
};

export default MyApp;
