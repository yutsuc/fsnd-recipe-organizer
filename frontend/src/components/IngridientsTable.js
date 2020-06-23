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
import AddIngridientDialog from "./AddIngridientDialog";

class IngridientsTable extends React.Component {
    static propTypes = {
        ingridients: PropTypes.array.isRequired,
        saveIngridient: PropTypes.func.isRequired,
        canEdit: PropTypes.bool.isRequired,
    }

    state = {
        openAddIngridientDialog: false,
    }

    render = () => {
        const { classes, ingridients, saveIngridient, canEdit } = this.props;
        const { openAddIngridientDialog } = this.state;
        return (
            <div>
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    className={classes.addIngridientBtn}
                    onClick={() => this.setState({ openAddIngridientDialog: true })}
                    disabled={!canEdit}
                >
                    Add Ingridient
                </Button>
                <AddIngridientDialog open={openAddIngridientDialog} saveIngridient={saveIngridient} closeDialog={() => this.setState({ openAddIngridientDialog: false })} />
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
                            {ingridients && ingridients.map((ing, index) => (
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
    addIngridientBtn: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
});

export default withStyles(styles)(IngridientsTable);