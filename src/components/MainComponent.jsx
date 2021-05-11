import React, { Component } from 'react';
import MapViewer from './MapViewer';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Button from "@material-ui/core/Button";
import { Grid } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
    constructor(props){
        super(props);
    }


    render(){
        
        const Map = () => {
            return(
                <Grid>
                    <Header />
                    <MapViewer />
                </Grid>
            );
        }
        return(
            <div>
                <Grid>                    
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/map" component={Map} />
                        <Redirect to="/home" />
                    </Switch>
                </Grid>
            </div>
        );
    }

}

export default Main;