import React from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar(props) {
    const { level, changeLevel } = props;
    const [format, setFormat] = React.useState("hex");
    const [open, setOpen] = React.useState(false);

    const handleChange = e => {
        setFormat(e.target.value);
        setOpen(true);
        props.handleChange(e.target.value);
    };

    return (
        <header className="Navbar">
            <div className="logo">
                {/* eslint-disable-next-line */}
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
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton onClick={() => setOpen(false)} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                ]}
                onClose={() => setOpen(false)}
            ></Snackbar>
        </header>
    );
}
