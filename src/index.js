import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from './components/Navigation';
import ShoppingList from './components/ShoppingList';
import Recipe from './components/Recipe'

ReactDOM.render(

    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<ShoppingList />} />
            <Route path="/ShoppingList" element={<ShoppingList />} />
            <Route path="/Recipe" element={<Recipe />} />
        </Routes>
    </Router>,

    document.getElementById("root")
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
