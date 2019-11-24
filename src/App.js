import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors.js";
import Palette from "./Palette";
import PaletteList from "./PaletteList";

import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
    const findPalette = id => palettes.find(palette => palette.id === id);

    const savePalette = newPalette => {
        setPalettes([...palettes, newPalette]);
    };

    React.useEffect(() => {
        window.localStorage.setItem("palettes", JSON.stringify(palettes));
    }, [palettes]);

    return (
        <Switch>
            <Route
                path="/palette/new"
                exact
                render={routeProps => (
                    <NewPaletteForm
                        {...routeProps}
                        palettes={palettes}
                        savePalette={savePalette}
                    />
                )}
            />
            <Route
                exact
                path="/"
                render={routeProps => (
                    <PaletteList palettes={palettes} {...routeProps} />
                )}
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
            <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                    <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                            findPalette(routeProps.match.params.paletteId)
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
