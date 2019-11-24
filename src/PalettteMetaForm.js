import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PalettteMetaForm = props => {
    const [open] = React.useState(true);
    const [newPaletteName, setNewPaletteName] = React.useState("");
    const { palettes, handleSubmit, hideForm } = props;

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
        <Dialog
            open={open}
            onClose={hideForm}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Choose a palette name
            </DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                {" "}
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for a unique name for your palette
                    </DialogContentText>
                    <Picker />
                    <TextValidator
                        value={newPaletteName}
                        label="Palette Name"
                        name="newPaletteName"
                        onChange={handleChange}
                        validators={["required", "isPaletteNameUnique"]}
                        fullWidth
                        margin="normal"
                        errorMessages={[
                            "Palette name is required",
                            "Palette name already used"
                        ]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
};
export default PalettteMetaForm;
