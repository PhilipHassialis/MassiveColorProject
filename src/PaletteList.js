import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

export default function PaletteList({ palettes }) {
    return (
        <div>
            <h1>React colors</h1>
            {palettes.map(palette => (
                <MiniPalette {...palette} />
            ))}
        </div>
    );
}
