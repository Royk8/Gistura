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
	overrides: {
		MuiToolbar: {
			root: {
				backgroundColor: 'white',
			},
		},
	},
});

export default responsiveFontSizes(theme);
