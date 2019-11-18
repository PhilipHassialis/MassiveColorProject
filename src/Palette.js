import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    PaletteColors: {
        height: "90%"
    }
};

class Palette extends Component {
    state = {
        level: 500,
        format: "hex"
    };

    changeLevel = level => {
        this.setState({ level });
    };

    changeFormat = val => {
        this.setState({ format: val });
    };

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const { classes } = this.props;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name}
                id={color.id}
                paletteId={id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true}
            />
        ));

        return (
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors={true}
                />
                <div className={classes.PaletteColors}>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
