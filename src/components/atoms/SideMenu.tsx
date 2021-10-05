import React, { useEffect, useState } from 'react';
import {
	Avatar,
	IconButton,
	AppBar,
	Toolbar,
	Theme,
	ButtonBase,
	Drawer,
    InputBase,
    Box,
    OutlinedInput,
    FormControl,
    Button,
    Grid,
    Input,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Menu, Person, Search, Star, Event, Category, Sort } from '@material-ui/icons';
import Link from 'next/link';
import { Paper } from 'material-ui';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        height: 'calc(100% - 60px)',
        top: 60,
        width: 250,
        padding: 25
    },
    box: {
        width: 200,
        height: 50,
        p: 20,
        color: theme.palette.secondary.main,
        display: 'flex', 
        flexWrap: 'wrap'
    },
    boxs: {
        width: 200,
        height: 50,
        p: 50,
        border: 200,
        color: theme.palette.secondary.main
    },
    formControl: {
        variant : 'outlined'
    },
    iconButton: {
        size:'small'
    },
    gridCon :{
        spacing: 2
    }
    
}));

const SearchInput = (props : any) => {
    const classes = useStyles();
    return (
            <FormControl style={{width:"100%"}}>
                <OutlinedInput endAdornment={<Search/>}
                    placeholder="Buscar evento"                        
                />
            </FormControl>
    );
}

const IconHub = (props : any) => {
    const classes = useStyles();
    return(

            <Grid container spacing={6} >
                <Grid item xs>
                    <Tooltip title='Favoritos'>
                        <IconButton aria-label="Agregar a Favoritos" size='small' className={classes.iconButton}>
                            <Star/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={8}>
                    <Tooltip title='Fechas'>
                        <IconButton size='small'>
                            <Event/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Categorías'>
                        <IconButton size='small'>
                            <Category/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Filtros'>
                        <IconButton size='small'>
                            <Sort/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

    );
}

const SideMenu = (props : any) => {
	//const [open, setOpen] = useState(props.open);
    /*const [handleOpen, setHandleOpen] = useState(() => {
        setHandleOpen(props.handleOpen)
    });*/
	const classes = useStyles();

    /*const handleDrawerOpen = () => {
        setOpen(true);
        console.log("Drawing the open!");
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(props.open)
        console.log("Fuck")
    },[open])*/

	return (
		<>
			<Drawer open={props.open} 
                transitionDuration={100} 
                anchor='left' 
                onClose={props.onClose}
                variant="persistent"
                classes={{paper: classes.paper}}>  
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
