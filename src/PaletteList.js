import React from "react"
import MiniPalette from "./MiniPalette"
import { withStyles } from "@material-ui/styles"
import styles from "./styles/PaletteListStyles"
import { Link } from "react-router-dom"

const PaletteList = props => {
    const { palettes, classes, deletePalette } = props

    const goToPalette = id => {
        props.history.push(`/palette/${id}`)
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>React colors</h1>
                    <Link to="/palette/new">Create new palette</Link>
                </nav>
                <div className={classes.palettes}>
                    {palettes.map(palette => (
                        <MiniPalette
                            key={palette.id}
                            id={palette.id}
                            {...palette}
                            handleClick={() => goToPalette(palette.id)}
                            handleDelete={deletePalette}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(PaletteList)
