import React from "react"
import clsx from "clsx"
import useStyles from "./styles/NewPaletteFormStyles"
import Drawer from "@material-ui/core/Drawer"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Button from "@material-ui/core/Button"
import DraggableColorList from "./DraggableColorList"
import { arrayMove } from "react-sortable-hoc"
import PaletteFormNav from "./PaletteFormNav"
import ColorPickerForm from "./ColorPickerForm"

const NewPaletteForm = props => {
    const maxColors = 20
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const { palettes } = props
    const [colors, setColors] = React.useState([...palettes[0].colors])

    const paletteIsFull = colors.length >= maxColors

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const addNewColor = newColor => {
        setColors([...colors, newColor])
    }

    const removeColor = colorName => {
        let newColors = [...colors]
        newColors = newColors.filter(color => color.name !== colorName)
        setColors([...newColors])
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex))
    }

    const clearColors = () => {
        setColors([])
    }

    const addRandomColor = () => {
        // pick random color from existing palettes
        const allColors = palettes.map(p => p.colors).flat()
        let rand = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[rand]
        setColors([...colors, randomColor])
    }

    const handleSubmit = palette => {
        const newPalette = {
            paletteName: palette.newPaletteName,
            id: palette.newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors,
            emoji: palette.emoji,
        }
        props.savePalette(newPalette)
        props.history.push("/")
    }

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
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
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Design your palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}
                            className={classes.button}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                            className={classes.button}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        addNewColor={addNewColor}
                        colors={colors}
                    />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    onSortEnd={onSortEnd}
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                    distance={5}
                />
            </main>
        </div>
    )
}

export default NewPaletteForm
