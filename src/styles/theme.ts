import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FF6B00',
		},
		secondary: {
			main: '#7A3B00',
		},
	},
	typography: {
		h1: {
			fontSize: '1.6em',			
			color: '#7A3B00',
			textAlign: 'center',
			fontWeight: 'bold'
			
		},
		h2: {
			fontSize: '1em',			
			color: '#7A3B00',
			fontWeight: 'bold',
		},
		body1: {
			fontSize: '1em',			
			color: '#7A3B00',
			fontWeight: 'bold',
			marginTop: '0em',
			marginBottom: '0em'
		},
		body2: {
			fontSize: '1em',			
			color: '#7A3B00',
			marginTop: '0.1em',
			marginBottom: '0.1em'
		},
	},
	overrides: {
		MuiToolbar: {
			root: {
				backgroundColor: 'white',
			},
		},
	},
});

export default responsiveFontSizes(theme);
