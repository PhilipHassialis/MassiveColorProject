import React from "react";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors.js";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
    const findPalette = id => palettes.find(palette => palette.id === id);

    const savePalette = newPalette => {
        setPalettes([...palettes, newPalette]);
    };

    const deletePalette = id => {
        setPalettes(palettes.filter(palette => palette.id !== id));
    };

    React.useEffect(() => {
        window.localStorage.setItem("palettes", JSON.stringify(palettes));
    }, [palettes]);

    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition classNames="page" timeout={1000}>
                        <Switch location={location}>
                            <Route
                                path="/palette/new"
                                exact
                                render={routeProps => (
                                    <Page>
                                        <NewPaletteForm
                                            {...routeProps}
                                            palettes={palettes}
                                            savePalette={savePalette}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={routeProps => (
                                    <Page>
                                        <PaletteList
                                            palettes={palettes}
                                            deletePalette={deletePalette}
                                            {...routeProps}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:id"
                                render={routeProps => (
                                    <Page>
                                        <Palette
                                            palette={generatePalette(
                                                findPalette(
                                                    routeProps.match.params.id
                                                )
                                            )}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:paletteId/:colorId"
                                render={routeProps => (
                                    <Page>
                                        <SingleColorPalette
                                            colorId={
                                                routeProps.match.params.colorId
                                            }
                                            palette={generatePalette(
                                                findPalette(
                                                    routeProps.match.params
                                                        .paletteId
                                                )
                                            )}
                                        />
                                    </Page>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    );
}

export default App;
