import React from "react";
import "./App.css";
import seedColors from "./seedColors.js";
import Palette from "./Palette";
import { generatePalette } from "./colorHelpers";

function App() {
    console.log(generatePalette(seedColors[4]));
    return (
        <div>
            <Palette palette={generatePalette(seedColors[3])} />
        </div>
    );
}

export default App;
