import React, { FC, useEffect, useState } from 'react';
import {
	Avatar,
	// IconButton,
	AppBar,
	Toolbar,
	Theme,
	ButtonBase,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Snackbar,
	Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { /* Menu as MenuIcon, */ Person } from '@material-ui/icons';
import Link from 'next/link';
import SideMenu from '../atoms/SideMenu';
import CreateEvSideMenu from '../molecules/CreateEvSideMenu';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { isLogged, toggleLogin } from '../../state/slices/authSlice';
import {
	setEvents,
	selectEvents,
	setCreateEvent,
	fetchEvents,
} from '../../state/slices/eventSlice';

const useStyles = makeStyles((theme: Theme) => ({
	logo: {
		flexGrow: 1,
		marginLeft: theme.spacing(2),
	},
	logoLink: {
		cursor: 'pointer',
		width: 'fit-content',
	},
	avatarButton: {
		borderRadius: '50%',
		color: theme.palette.secondary.main,
	},
	avatar: {
		backgroundColor: 'white',
	},
	avatarIcon: {
		color: theme.palette.secondary.main,
	},
	content: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: 0,
		backgroundColor: 'white',
		overflowX: 'hidden',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.leavingScreen - 100,
		}),
		marginRight: 450,
	},
	snackbar: {
		'&>div': {
			backgroundColor: theme.palette.primary.main,
			fontWeight: 500,
		},
	},
}));

const Header: FC = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [token, setToken] = useState({ value: '', error: '' });
	const [anchorButton, setAnchorButton] = useState<
		(EventTarget & HTMLButtonElement) | null
	>(null);

	const classes = useStyles();
	const { logged } = useAppSelector(isLogged);
	const { createEvent } = useAppSelector(selectEvents);
	const dispatch = useAppDispatch();

	const changeOpen = () => {
		setOpen(!open);
	};

	const changeOpenCreEv = () => {
		dispatch(setCreateEvent(!createEvent));
	};

	const handleLogin = () => {
		const currentToken = (process.env.NEXT_PUBLIC__API_KEY || '').replace(
			'Bearer ',
			'',
		);
		if (currentToken && token.value === currentToken) {
			setToken((current) => ({
				...current,
				error: '',
			}));
			dispatch(toggleLogin());
			setOpenLogin(false);
		} else {
			setToken((current) => ({
				...current,
				error: 'Token invalido, intente nuevamente',
			}));
		}
	};

	useEffect(() => {
		if (createEvent) {
			setOpenSnackbar(false);
		}
	}, [createEvent]);

	return (
		<>
			<AppBar>
				<Toolbar>
					{/*               
                        <IconButton
                            edge="start"
                            color="secondary"
                            onClick={() => changeOpen()}
                        >
                            <MenuIcon />
                        </IconButton>
                    */}
					<div className={classes.logo}>
						<Link href="/" passHref>
							<div className={classes.logoLink}>
								<img
									src="/assets/logo.svg"
									width={88.47}
									height={48}
									alt="Logo de Gistura"
								/>
							</div>
						</Link>
					</div>
					<ButtonBase
						onClick={(e) => setAnchorButton(e.currentTarget)}
						className={classes.avatarButton}
					>
						<Avatar className={classes.avatar}>
							<Person className={classes.avatarIcon} />
						</Avatar>
					</ButtonBase>
					<Menu
						open={!!anchorButton}
						anchorEl={anchorButton}
						onClose={() => setAnchorButton(null)}
						keepMounted
					>
						{logged ? (
							[
								<MenuItem
									key="CREATE_EVENT_MENU_ITEM"
									onClick={() => {
										setAnchorButton(null);
										setOpenSnackbar(true);
										dispatch(setEvents([]));
									}}
								>
									Crear Evento
								</MenuItem>,
								<MenuItem
									key="LOGOUT_MENU_ITEM"
									onClick={() => {
										setAnchorButton(null);
										dispatch(toggleLogin());
										setOpenSnackbar(false);
										dispatch(setCreateEvent(false));
										dispatch(fetchEvents());
									}}
								>
									Cerrar Sesión
								</MenuItem>,
							]
						) : (
							<MenuItem
								onClick={() => {
									setOpenLogin(true);
									setAnchorButton(null);
								}}
							>
								Iniciar Sesión
							</MenuItem>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<SideMenu open={open} onClose={changeOpen} />
			{createEvent && (
				<CreateEvSideMenu
					open={createEvent}
					onClose={changeOpenCreEv}
				/>
			)}
			<div
				className={`${classes.content} ${
					createEvent ? classes.contentShift : ''
				}`}
			>
				{children}
			</div>
			<Dialog
				open={openLogin}
				onClose={() => setOpenLogin(false)}
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle>Iniciar Sesión</DialogTitle>
				<DialogContent>
					<TextField
						value={token.value}
						onChange={({ target }) =>
							setToken({
								error: '',
								value: target.value,
							})
						}
						variant="filled"
						label="Token"
						helperText={
							token.error ||
							'Digite el Token de autenticación para continuar'
						}
						error={!!token.error}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenLogin(false)}>
						Cancelar
					</Button>
					<Button
						onClick={handleLogin}
						variant="contained"
						color="primary"
					>
						Entrar
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={openSnackbar}
				TransitionComponent={(props) => (
					<Slide {...props} direction="up" />
				)}
				color="primary"
				message="Para continuar, haz click en el lugar del mapa donde será tu evento"
				className={classes.snackbar}
			/>
		</>
	);
};
export default Header;
