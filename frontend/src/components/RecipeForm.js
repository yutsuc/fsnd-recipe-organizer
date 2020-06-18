import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from '@material-ui/icons/Add';
import IngridientsTable from "./IngridientsTable";
import { saveRecipe } from "../actions/recipes";

class RecipeForm extends React.Component {
    static propTypes = {
        recipe: PropTypes.object,
    }

    state = {
        id: -1,
        recipeTitle: "",
        ingridients: [],
        instructions: "",
    }

    componentDidMount = () => {
        const { recipe } = this.props;
        if (recipe !== undefined) {
            this.setState({
                id: recipe.id,
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
        const { id, recipeTitle, ingridients, instructions } = this.state;
        this.props.dispatch(saveRecipe(id, recipeTitle, ingridients, instructions));
        this.setState({
            id: -1,
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
        const { id, recipeTitle, ingridients, instructions } = this.state;
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
                <Fab className={classes.fab} aria-label="add-or-save-button"
                    color="primary"
                    type="submit"
                    disabled={!(recipeTitle && ingridients.length !== 0)}
                    onClick={(e) => this.handleSaveRecipe(e)}>
                        {id === -1 ? <AddIcon /> : <SaveIcon />}
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

export default withStyles(styles)(RecipeForm);