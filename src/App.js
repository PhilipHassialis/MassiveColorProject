import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors.js";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers";

function App() {
    const findPalette = id => seedColors.find(palette => palette.id === id);

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => <PaletteList palettes={seedColors} />}
            />
            <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette
                        palette={generatePalette(
                            findPalette(routeProps.match.params.id)
                        )}
                    />
                )}
            />
        </Switch>
        // <div>
        //     <Palette palette={generatePalette(seedColors[3])} />
        // </div>
    );
}

export default App;
