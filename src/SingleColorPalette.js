import React, { useState } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

const SingleColorPalette = props => {
    const { palette, colorId, classes } = props;
    const { paletteName, emoji } = palette;
    const [format, setFormat] = useState({ format: "hex" });

    const gatherShades = (palette, colorToFilterBy) => {
        // all shades of given color
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }

        return shades.slice(1);
    };

    const _shades = gatherShades(palette, colorId);

    const colorBoxes = _shades.map(color => (
        <ColorBox
            key={color.name}
            background={color[format.format]}
            name={color.name}
            id={color.id}
            showingFullPalette={false}
        />
    ));

    const changeFormat = val => {
        setFormat({ format: val });
    };

    return (
        <div className={classes.Palette}>
            <NavBar handleChange={changeFormat} showingAllColors={false} />
            <div className={classes.PaletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${palette.id}`}>GO BACK</Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
};

export default withStyles(styles)(SingleColorPalette);
