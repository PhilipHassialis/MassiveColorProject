import React, { useState } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

const SingleColorPalette = props => {
    const { palette, colorId } = props;
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
            showLink={false}
        />
    ));

    const changeFormat = val => {
        setFormat({ format: val });
    };

    return (
        <div className="Palette">
            <NavBar handleChange={changeFormat} showingAllColors={false} />
            <div className="Palette-colors">{colorBoxes}</div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
};

export default SingleColorPalette;
