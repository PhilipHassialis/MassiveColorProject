import React from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar(props) {
    const { level, changeLevel } = props;
    const [format, setFormat] = React.useState("hex");

    const handleChange = e => {
        setFormat(e.target.value);
        props.handleChange(e.target.value);
    };

    return (
        <header className="Navbar">
            <div className="logo">
                <a href="#">React Color Picker</a>
            </div>

            <div className="slider-container">
                <span>Level: {level}</span>
                <div className="slider">
                    <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                </div>
            </div>

            <div className="select-container">
                <Select value={format} onChange={e => handleChange(e)}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb (255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgb (255,255,255,1.0)</MenuItem>
                </Select>
            </div>
        </header>
    );
}
