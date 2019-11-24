import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import useStyles from "./styles/PaletteFormNavStyles";
import PalettteMetaForm from "./PalettteMetaForm";

const PaletteFormNav = props => {
    const { open, palettes, handleSubmit, handleDrawerOpen } = props;

    const classes = useStyles();
    const [formShowing, setFormShowing] = React.useState(false);

    const showForm = () => {
        setFormShowing(true);
    };

    const hideForm = () => {
        setFormShowing(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create new palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Go back
                        </Button>
                    </Link>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={showForm}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && (
                <PalettteMetaForm
                    palettes={palettes}
                    handleSubmit={handleSubmit}
                    hideForm={hideForm}
                />
            )}
        </div>
    );
};

export default PaletteFormNav;
