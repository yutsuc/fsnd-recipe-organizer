import React from "react";
import RecipeForm from "./RecipeForm";

class AddRecipe extends React.Component {
    render = () => {
        const { classes } = this.props;
        return (
            <div>
                <RecipeForm />
            </div>
        );
    };
}
export default AddRecipe;