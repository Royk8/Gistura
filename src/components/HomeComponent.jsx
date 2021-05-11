import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

function Home() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <a className="App-link" href="map" rel="noopener noreferrer">
                        <img src={logo} className="App-logo" alt="logo" />
                    </a>
                    <p> Proximamente en su tienda más cercana xF 🥳</p>
                    <a className="App-link" href="map" rel="noopener noreferrer">
                        GIStura
                    </a>
                </header>
            </div>
        </BrowserRouter>
    );
}

export default Home;