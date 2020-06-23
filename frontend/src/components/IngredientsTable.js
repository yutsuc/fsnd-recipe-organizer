import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PropTypes from "prop-types";
import AddIngredientDialog from "./AddIngredientDialog";

class IngredientsTable extends React.Component {
    static propTypes = {
        ingredients: PropTypes.array.isRequired,
        saveIngredient: PropTypes.func.isRequired,
        canEdit: PropTypes.bool.isRequired,
    }

    state = {
        openAddIngredientDialog: false,
    }

    render = () => {
        const { classes, ingredients, saveIngredient, canEdit } = this.props;
        const { openAddIngredientDialog } = this.state;
        return (
            <div>
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    className={classes.addIngredientBtn}
                    onClick={() => this.setState({ openAddIngredientDialog: true })}
                    disabled={!canEdit}
                >
                    Add Ingredient
                </Button>
                <AddIngredientDialog open={openAddIngredientDialog} saveIngredient={saveIngredient} closeDialog={() => this.setState({ openAddIngredientDialog: false })} />
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell>Unit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients && ingredients.map((ing, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{ing.name}</TableCell>
                                    <TableCell align="right">{ing.quantity}</TableCell>
                                    <TableCell>{ing.unit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const styles = theme => ({
    tableContainer: {
        paddingBottom: theme.spacing(2),
        minWidth: "100%",
        width: "max-content",
    },
    addIngredientBtn: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
});

export default withStyles(styles)(IngredientsTable);