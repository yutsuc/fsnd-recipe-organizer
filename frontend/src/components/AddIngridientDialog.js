import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class AddIngridientDialog extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        saveIngridient: PropTypes.func.isRequired,
        closeDialog: PropTypes.func.isRequired,
    }

    state = {
        name: "",
        quantity: "",
        unit: "",
    }

    handleSave = () => {
        const { name, quantity, unit } = this.state;
        this.props.saveIngridient({ name, quantity, unit });
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            name: "",
            quantity: "",
            unit: "",
        });
        this.props.closeDialog();
    }

    render = () => {
        const { open } = this.props;
        const { name, quantity, unit } = this.state;
        return (
            <Dialog open={open} onClose={this.handleClose}>
                <DialogTitle>Add Ingridient</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense"
                        label="Name"
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        required fullWidth />
                    <TextField margin="dense"
                        label="Quantity"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={quantity}
                        onChange={(e) => this.setState({ quantity: e.target.value })}
                        required fullWidth />
                    <TextField margin="dense"
                        label="Unit"
                        value={unit}
                        onChange={(e) => this.setState({ unit: e.target.value })}
                        required fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={this.handleSave} disabled={!(name && quantity && unit)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddIngridientDialog;