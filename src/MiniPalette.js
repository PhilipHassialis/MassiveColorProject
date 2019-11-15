import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "pink",
        "& h1": {
            color: "white",
            "& span": {
                backgroundColor: "yellow"
            }
        }
    }
};

const MiniPalette = props => {
    const { classes } = props;
    return (
        <div className={classes.main}>
            <h1>MiniPalette</h1>
            <section className={classes.secondary}>
                <h1>
                    Test
                    <span>Test span</span>
                </h1>
            </section>
        </div>
    );
};

export default withStyles(styles)(MiniPalette);
