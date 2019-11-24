import React from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorPickerFormStyles";

const ColorPickerForm = props => {
    const { paletteIsFull, addNewColor, colors, classes } = props;
    const [currentColor, setCurrentColor] = React.useState("teal");
    const [newColorName, setNewColorName] = React.useState("");

    const handleChange = e => {
        switch (e.target.name) {
            case "newColorName":
                setNewColorName(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        const newColor = { color: currentColor, name: newColorName };
        addNewColor(newColor);
        setNewColorName("");
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
    }, [colors, currentColor]);

    return (
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={newColor => {
                    setCurrentColor(newColor.hex);
                }}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    value={newColorName}
                    variant="filled"
                    name="newColorName"
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Color name"
                    className={classes.colorNameInput}
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
                        backgroundColor: paletteIsFull ? "grey" : currentColor
                    }}
                    type="submit"
                    disabled={paletteIsFull}
                    className={classes.addColor}
                >
                    {paletteIsFull ? "Palette is full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    );
};
export default withStyles(styles)(ColorPickerForm);
