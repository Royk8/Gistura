import React, { useState } from 'react';
import {
	Avatar,
	IconButton,
	AppBar,
	Toolbar,
	Theme,
	ButtonBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Menu, Person } from '@material-ui/icons';
import Link from 'next/link';
import SideMenu from '../atoms/SideMenu';
import CreateEvSideMenu from '../molecules/CreateEvSideMenu';

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
}));

const Header = () => {
	const [open, setOpen] = useState(false);
	const [openCreEv, setOpenCreEv] = useState(false);
	const classes = useStyles();
	const changeOpen = () => {
		setOpen(!open);
	};
	const changeOpenCreEv = () => {
		setOpenCreEv(!openCreEv);
	};
	return (
		<>
			<AppBar>
				<Toolbar>
					<IconButton
						edge="start"
						color="secondary"
						onClick={() => changeOpen()}
					>
						<Menu />
					</IconButton>
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
					<ButtonBase className={classes.avatarButton}>
						<Avatar className={classes.avatar}>
							<Person
								className={classes.avatarIcon}
								onClick={() => changeOpenCreEv()}
							/>
						</Avatar>
					</ButtonBase>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<SideMenu open={open} onClose={changeOpen} />
			<CreateEvSideMenu open={openCreEv} onClose={changeOpenCreEv} />
		</>
	);
};
export default Header;
