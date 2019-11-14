import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors.js";
import Palette from "./Palette";
import { generatePalette } from "./colorHelpers";

function App() {
    console.log(generatePalette(seedColors[4]));
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => <h1>Palette list goes here</h1>}
            />
            <Route
                exact
                path="/palette/:id"
                render={() => <h1>Individual palette</h1>}
            />
        </Switch>
        // <div>
        //     <Palette palette={generatePalette(seedColors[3])} />
        // </div>
    );
}

export default App;
