import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routers from "./router";

function App() {
    return (
        <BrowserRouter>
            <Routers/>
        </BrowserRouter>
    );
}

export default App;
