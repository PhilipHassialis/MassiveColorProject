import React from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/NavbarStyles";

const Navbar = props => {
    const { level, changeLevel, showingAllColors, classes } = props;
    const [format, setFormat] = React.useState("hex");
    const [open, setOpen] = React.useState(false);

    const handleChange = e => {
        setFormat(e.target.value);
        setOpen(true);
        props.handleChange(e.target.value);
    };

    return (
        <header className={classes.Navbar}>
            <div className={classes.logo}>
                {/* eslint-disable-next-line */}
                <Link to="/">React Color Picker</Link>
            </div>

            {showingAllColors && (
                <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>
            )}

            <div className={classes.selectContainer}>
                <Select value={format} onChange={e => handleChange(e)}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb (255,255,255)</MenuItem>
                    <MenuItem value="rgba">
                        RGBA - rgb (255,255,255,1.0)
                    </MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                message={
                    <span id="message-id">
                        Format changed to {format.toUpperCase()}
                    </span>
                }
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton
                        onClick={() => setOpen(false)}
                        color="inherit"
                        key="close"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
                onClose={() => setOpen(false)}
            ></Snackbar>
        </header>
    );
};

export default withStyles(styles)(Navbar);
