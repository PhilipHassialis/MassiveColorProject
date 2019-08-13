import React from "react";
import "./App.css";
import seedColors from "./seedColors.js";
import Palette from "./Palette";

function App() {
    return (
        <div>
            <Palette {...seedColors[3]} />
        </div>
    );
}

export default App;
