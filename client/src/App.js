import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from "./components/Header.js";
import { Menu } from './components/Menu.js';

function App() {
    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <Menu />
            </BrowserRouter>

        </div>
    );
}

export default App;
