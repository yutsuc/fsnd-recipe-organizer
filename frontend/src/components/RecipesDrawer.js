import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import { useAuth0 } from "../utils/react-auth0-spa";
import { getPermissions } from "../utils/auth";
import { handleDeleteRecipe } from "../actions/recipes";

const RecipesDrawer = (props) => {
    const recipes = useSelector(state => state.recipes);
    const classes = useStyles(props);
    const { isAuthenticated } = useAuth0();
    const canDelete = getPermissions().includes("delete:recipe");
    let history = useHistory();
    const dispatch = useDispatch();
    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(handleDeleteRecipe(id));
        history.replace("/");
    };
    const drawerItems = (
        <Fragment>
            <div className={classes.toolbar} style={{ textAlign: "center" }}>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: "none" }}>
                    Recipe Organizer
                </Typography>
                <Typography variant="body1" style={{ color: "gray" }}>beta</Typography>
            </div>
            <List>
                {isAuthenticated && <ListItem button component={Link} to="/add">
                    <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                    <ListItemText primary="Add Recipe" />
                </ListItem>}
                {recipes && recipes.map(r => (
                    <ListItem button key={r.id} component={Link} to={`/recipes/${r.id}`} disabled={!isAuthenticated}>
                        <ListItemText primary={r.title} />
                        <IconButton aria-label="delete" hidden={!canDelete} onClick={(e) => handleDelete(e, r.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
    return (
        <nav className={classes.drawer}>
            {/* mobile drawer */}
            <Hidden smUp>
                <Drawer
                    variant="temporary"
                    open={props.open}
                    onClose={props.handleDrawerClose}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawerItems}
                </Drawer>
            </Hidden>
            {/* desktop drawer */}
            <Hidden xsDown>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawerItems}
                </Drawer>
            </Hidden>
        </nav>
    );
};

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: props => props.drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: props => props.drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

export default RecipesDrawer;