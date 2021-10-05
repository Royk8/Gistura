import React from 'react';
import {
	IconButton,
	Theme,
	Drawer,
	OutlinedInput,
	FormControl,
	Grid,
	Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Search, Star, Event, Category, Sort } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		height: 'calc(100% - 60px)',
		top: 60,
		width: 250,
		padding: 25,
	},
	box: {
		width: 200,
		height: 50,
		p: 20,
		color: theme.palette.secondary.main,
		display: 'flex',
		flexWrap: 'wrap',
	},
	boxs: {
		width: 200,
		height: 50,
		p: 50,
		border: 200,
		color: theme.palette.secondary.main,
	},
	formControl: {
		variant: 'outlined',
	},
	iconButton: {
		size: 'small',
	},
	gridCon: {
		spacing: 2,
	},
}));

const SearchInput = () => (
	<FormControl style={{ width: '100%' }}>
		<OutlinedInput endAdornment={<Search />} placeholder="Buscar evento" />
	</FormControl>
);

const IconHub = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={6}>
			<Grid item xs>
				<Tooltip title="Favoritos">
					<IconButton
						aria-label="Agregar a Favoritos"
						size="small"
						className={classes.iconButton}
					>
						<Star />
					</IconButton>
				</Tooltip>
			</Grid>
			<Grid item xs={8}>
				<Tooltip title="Fechas">
					<IconButton size="small">
						<Event />
					</IconButton>
				</Tooltip>
				<Tooltip title="Categorías">
					<IconButton size="small">
						<Category />
					</IconButton>
				</Tooltip>
				<Tooltip title="Filtros">
					<IconButton size="small">
						<Sort />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};

const SideMenu = ({ open, onClose }: any) => {
	// const [open, setOpen] = useState(props.open);
	/* const [handleOpen, setHandleOpen] = useState(() => {
        setHandleOpen(props.handleOpen)
    }); */
	const classes = useStyles();

	/* const handleDrawerOpen = () => {
        setOpen(true);
        console.log("Drawing the open!");
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(props.open)
        console.log("Fuck")
    },[open]) */

	return (
		<>
			<Drawer
				open={open}
				transitionDuration={100}
				anchor="left"
				onClose={onClose}
				variant="persistent"
				classes={{ paper: classes.paper }}
			>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<SearchInput />
					</Grid>
					<Grid item xs>
						<IconHub />
					</Grid>
				</Grid>
			</Drawer>
		</>
	);
};

export default SideMenu;
