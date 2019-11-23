import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";

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
    const maxColors = 20;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("teal");
    const { palettes } = props;
    const [colors, setColors] = React.useState([...palettes[0].colors]);
    const [newColorName, setNewColorName] = React.useState("");

    const paletteIsFull = colors.length >= maxColors;

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
            default:
                break;
        }
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
    };

    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = () => {
        // pick random color from existing palettes
        const allColors = palettes.map(p => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setColors([...colors, randomColor]);
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

    const handleSubmit = newPaletteName => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors
        };
        props.savePalette(newPalette);
        props.history.push("/");
    };

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                classes={classes}
                palettes={palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearColors}
                    >
                        Clear Palette
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRandomColor}
                        disabled={paletteIsFull}
                    >
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
                        style={{
                            backgroundColor: paletteIsFull
                                ? "grey"
                                : currentColor
                        }}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? "Palette is full" : "Add Color"}
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
