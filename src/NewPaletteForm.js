import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}));

const NewPaletteForm = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("teal");
    const [colors, setColors] = React.useState([
        { color: "blue", name: "blue" }
    ]);
    const [newColorName, setNewColorName] = React.useState("");
    const [newPaletteName, setNewPaletteName] = React.useState("");
    const { palettes } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addNewColor = () => {
        const newColor = { color: currentColor, name: newColorName };
        setColors([...colors, newColor]);
        setNewColorName("");
    };

    const removeColor = colorName => {
        let newColors = [...colors];
        newColors = newColors.filter(color => color.name !== colorName);
        setColors([...newColors]);
    };

    const handleChange = e => {
        switch (e.target.name) {
            case "newColorName":
                setNewColorName(e.target.value);
                break;
            case "newPaletteName":
                setNewPaletteName(e.target.value);
                break;
            default:
                break;
        }
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            colors.every(({ color }) => color !== currentColor)
        );
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }, [colors, currentColor, palettes]);

    const handleSubmit = () => {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors
        };
        props.savePalette(newPalette);
        props.history.push("/");
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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
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
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">Design your palette</Typography>
                <div>
                    <Button variant="contained" color="secondary">
                        Clear Palette
                    </Button>
                    <Button variant="contained" color="primary">
                        Random Color
                    </Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={newColor => {
                        setCurrentColor(newColor.hex);
                    }}
                />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        onChange={handleChange}
                        // validators={[
                        //     "required",
                        //     "isColorNameUnique",
                        //     "isColorUnique"
                        // ]}
                        validators={["required", "isColorNameUnique"]}
                        errorMessages={[
                            "Color name is required",
                            "Color name must be unique",
                            "Color must be unique"
                        ]}
                        // errorMessages={[
                        //     "Color name is required",
                        //     "Color name must be unique"
                        // ]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: currentColor }}
                        type="submit"
                    >
                        Add Color
                    </Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    onSortEnd={onSortEnd}
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                />
            </main>
        </div>
    );
};

export default NewPaletteForm;
