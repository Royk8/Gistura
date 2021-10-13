import { createTheme } from '@material-ui/core';
import { responsiveFontSizes } from '@material-ui/core/styles';

export const colors = {
	primary: '#FF6B00',
	secondary: '#7A3B00',
	grey: '#D3D3D3',
};

const theme = createTheme({
	palette: {
		primary: {
			main: colors.primary,
			contrastText: '#FFF',
		},
		secondary: {
			main: colors.secondary,
		},
	},
	typography: {
		h1: {
			fontSize: '1.6em',
			color: '#7A3B00',
			textAlign: 'center',
			fontWeight: 'bold',
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
			marginBottom: '0em',
		},
		body2: {
			fontSize: '1em',
			color: '#7A3B00',
			marginTop: '0.1em',
			marginBottom: '0.1em',
		},
	},
	overrides: {
		MuiToolbar: {
			root: {
				backgroundColor: 'white',
			},
		},
		MuiInputLabel: {
			asterisk: {
				color: colors.primary,
			},
			filled: {
				fontWeight: 400,
			},
		},
		MuiFilledInput: {
			root: {
				fontWeight: 500,
				color: colors.secondary,
				backgroundColor: 'rgba(122, 59, 0, 0.08)',
				'&:hover': {
					backgroundColor: 'rgba(122, 59, 0, 0.13)',
				},
				'&.Mui-focused': {
					backgroundColor: 'rgba(122, 59, 0, 0.15)',
				},
			},
		},
	},
});

export default responsiveFontSizes(theme);
