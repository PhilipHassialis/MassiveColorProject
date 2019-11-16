import React from "react";
import ColorBox from "./ColorBox";

const SingleColorPalette = props => {
    const { palette, colorId } = props;

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
            background={color.hex}
            name={color.name}
            id={color.id}
            showLink={false}
        />
    ));

    return (
        <div className="Palette">
            <h1>Single color palette</h1>
            <div className="Palette-colors">{colorBoxes}</div>
        </div>
    );
};

export default SingleColorPalette;
