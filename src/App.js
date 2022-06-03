import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Navigation,
    Recipe,
    ShoppingList

} from "./components";


ReactDOM.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<ShoppingList />} />
            <Route path="/Recipe" element={<Recipe />} />
        </Routes>
    </Router>,

    document.getElementById("root")
);

serviceWorker.unregister();