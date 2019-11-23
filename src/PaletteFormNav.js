import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

const PaletteFormNav = props => {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } = props;
    const [newPaletteName, setNewPaletteName] = React.useState("");

    const handleChange = e => {
        switch (e.target.name) {
            case "newPaletteName":
                setNewPaletteName(e.target.value);
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }, [palettes]);

    return (
        <div>
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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm
                        onSubmit={() => handleSubmit(newPaletteName)}
                    >
                        <TextValidator
                            value={newPaletteName}
                            label="Palette Name"
                            name="newPaletteName"
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Palette name is required",
                                "Palette name already used"
                            ]}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                        <Link to="/">
                            <Button variant="contained" color="secondary">
                                Go back
                            </Button>
                        </Link>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default PaletteFormNav;
