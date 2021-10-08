import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';

import theme from '../styles/theme';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) =>
					sheets.collect(<App {...props} />),
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [
				...React.Children.toArray(initialProps.styles),
				sheets.getStyleElement(),
			],
		};
	}

	render() {
		return (
			<Html lang="es">
				<Head>
					<meta
						name="theme-color"
						content={theme.palette.primary.main}
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" /> 
					<link
					rel="stylesheet"
					href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
					/>
				</Head>
				<body style={{ margin: 0, padding: 0 }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
