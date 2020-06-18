import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import IngridientsTable from "./IngridientsTable";
import { addRecipe } from "../actions";
import { getRecipe } from "../utils/api";

class RecipeForm extends React.Component {
    static propTypes = {
        id: PropTypes.number,
    }
    state = {
        id: -1,
        recipeTitle: "",
        ingridients: [],
        instructions: "",
    }

    componentDidMount = () => {
        const { id } = this.props;
        if (id !== undefined) {
            const recipe = getRecipe(id);
            this.setState({
                id: id,
                recipeTitle: recipe.title,
                ingridients: recipe.ingridients,
                instructions: recipe.instructions,
            });
        }
    }

    handleSaveIngridient = (ingridient) => {
        this.setState(prevState => ({
            ingridients: prevState.ingridients.concat([ingridient])
        }));
    }

    handleSaveRecipe = (e) => {
        e.preventDefault();
        const { recipeTitle, ingridients, instructions } = this.state;
        this.props.dispatch(addRecipe({ recipeTitle, ingridients, instructions }));
        this.setState({
            recipeTitle: "",
            ingridients: [],
            instructions: "",
        });
    }

    handleInstructionsChange = e => {
        this.setState({ instructions: e.target.value })
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    render = () => {
        const { recipeTitle, ingridients, instructions } = this.state;
        const { classes } = this.props;
        return (
            <form>
                <TextField autoFocus margin="dense"
                    label="Recipe Title"
                    value={recipeTitle}
                    onChange={(e) => this.setState({ recipeTitle: e.target.value })}
                    required fullWidth />
                <div className={classes.ingridients} >
                    <InputLabel>Ingridients *</InputLabel>
                    <IngridientsTable ingridients={ingridients} saveIngridient={this.handleSaveIngridient} />
                </div>
                <TextField
                    margin="dense"
                    label="Instructions"
                    value={instructions}
                    onChange={(e) => this.handleInstructionsChange(e)}
                    rows={8}
                    onKeyDown={this.handleKeyDown}
                    multiline fullWidth />
                <Fab className={classes.fab} aria-label="add"
                    color="primary"
                    type="submit"
                    disabled={!(recipeTitle && ingridients.length !== 0)}
                    onClick={(e) => this.handleSaveRecipe(e)}>
                    <SaveIcon />
                </Fab>
            </form>
        );
    };
}

const styles = theme => ({
    ingridients: {
        marginTop: theme.spacing(2),
    },
    fab: {
        top: "auto",
        left: "auto",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        position: "fixed",
    },
});

export default connect()(withStyles(styles)(RecipeForm));