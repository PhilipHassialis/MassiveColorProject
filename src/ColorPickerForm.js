import React from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const ColorPickerForm = props => {
    const { paletteIsFull, addNewColor, colors } = props;
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
            />
            <ValidatorForm onSubmit={handleSubmit}>
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
                        backgroundColor: paletteIsFull ? "grey" : currentColor
                    }}
                    type="submit"
                    disabled={paletteIsFull}
                >
                    {paletteIsFull ? "Palette is full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    );
};
export default ColorPickerForm;
