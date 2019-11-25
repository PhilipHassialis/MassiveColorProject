import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import seedColors from "./seedColors.js"
import Palette from "./Palette"
import PaletteList from "./PaletteList"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { generatePalette } from "./colorHelpers"
import SingleColorPalette from "./SingleColorPalette"
import NewPaletteForm from "./NewPaletteForm"

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    const [palettes, setPalettes] = React.useState(savedPalettes || seedColors)
    const findPalette = id => palettes.find(palette => palette.id === id)

    const savePalette = newPalette => {
        setPalettes([...palettes, newPalette])
    }

    const deletePalette = id => {
        setPalettes(palettes.filter(palette => palette.id !== id))
    }

    React.useEffect(() => {
        window.localStorage.setItem("palettes", JSON.stringify(palettes))
    }, [palettes])

    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location}
                        classNames="fade"
                        timeout={500}
                    >
                        <Switch location={location}>
                            <Route
                                path="/palette/new"
                                exact
                                render={routeProps => (
                                    <div className="page">
                                        <NewPaletteForm
                                            {...routeProps}
                                            palettes={palettes}
                                            savePalette={savePalette}
                                        />
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={routeProps => (
                                    <div className="page">
                                        <PaletteList
                                            palettes={palettes}
                                            deletePalette={deletePalette}
                                            {...routeProps}
                                        />
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:id"
                                render={routeProps => (
                                    <div className="page">
                                        <Palette
                                            palette={generatePalette(
                                                findPalette(
                                                    routeProps.match.params.id
                                                )
                                            )}
                                        />
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:paletteId/:colorId"
                                render={routeProps => (
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
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
        // <div>
        //     <Palette palette={generatePalette(seedColors[3])} />
        // </div>
    )
}

export default App
