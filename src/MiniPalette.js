import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

const MiniPalette = props => {
    const {
        classes,
        paletteName,
        emoji,
        colors,
        openDialog,
        id,
        goToPalette,
    } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            key={color.name}
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
        ></div>
    ));

    const deletePalette = e => {
        e.stopPropagation();
        openDialog(id);
    };

    const handleClick = () => {
        goToPalette(id);
    };

    return (
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.delete}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onClick={e => deletePalette(e)}
                />
            </div>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
};

export default React.memo(withStyles(styles)(MiniPalette));
