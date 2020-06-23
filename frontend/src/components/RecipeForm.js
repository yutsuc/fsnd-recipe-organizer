import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from '@material-ui/icons/Add';
import IngridientsTable from "./IngridientsTable";
import { saveRecipe } from "../actions/recipes";
import { getPermissions } from "../utils/auth";

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

    componentDidUpdate = (prevProps) => {
        if (prevProps.id !== this.props.id) {
            this.setState({
                id: this.props.recipe.id,
                recipeTitle: this.props.recipe.title,
                ingridients: this.props.recipe.ingridients,
                instructions: this.props.recipe.instructions,
            });
        }
    }

    componentWillUnmount = () => {
        this.setState({
            id: -1,
            recipeTitle: "",
            ingridients: [],
            instructions: "",
        });
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
        this.props.history.push("/");
    }

    handleInstructionsChange = e => {
        this.setState({ instructions: e.target.value })
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    render = () => {
        const { id, recipeTitle, ingridients, instructions } = this.state;
        const { classes } = this.props;
        const canUpdate = !(id !== -1 && !getPermissions().includes("patch:recipes"));
        return (
            <form>
                <TextField autoFocus margin="dense"
                    label="Recipe Title"
                    value={recipeTitle}
                    onChange={(e) => this.setState({ recipeTitle: e.target.value })}
                    disabled= {!canUpdate}
                    required fullWidth />
                <div className={classes.ingridients} >
                    <InputLabel>Ingridients *</InputLabel>
                    {ingridients &&<IngridientsTable ingridients={ingridients} saveIngridient={this.handleSaveIngridient} canEdit={canUpdate} />}
                </div>
                <TextField
                    margin="dense"
                    label="Instructions"
                    value={instructions}
                    onChange={(e) => this.handleInstructionsChange(e)}
                    rows={8}
                    onKeyDown={this.handleKeyDown}
                    disabled= {!canUpdate}
                    multiline fullWidth />
                <Fab className={classes.fab} aria-label="add-or-save-button"
                    color="primary"
                    type="submit"
                    disabled={!(recipeTitle && ingridients && ingridients.length !== 0) || !canUpdate}
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

const mapStateToProps = ({ recipes }, props) => {
    const { id } = props;
    return {
        recipe: recipes && recipes.find(r => r.id === id)
    };
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(RecipeForm)));