import React, { Component } from 'react';
import { Button, Container, Grid, Avatar } from '@material-ui/core';


class Header extends Component {

    render(){
        return(
            <div>
                <Container>
                    <Grid container direction='row' justify="flex-start" alignItems='center'>
                        <Grid container item xs={6}>
                            <Button  aria-controls="simple-menu" aria-haspopup='true' >
                                <img src='menu.svg' />
                            </Button>
                            <img src='Group 1 1.svg' />                            
                        </Grid>             
                        <Grid container item xs={6} justify='flex-end'>
                            <Avatar className='orange'>
                                <Avatar src="person.svg"/>
                            </Avatar>
                        </Grid>       
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Header
