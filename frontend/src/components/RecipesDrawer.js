import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";

const RecipesDrawer = (props) => {
    const recipeTitles = useSelector(state => Object.keys(state).sort());
    const classes = useStyles(props);
    const drawerItems = (
        <Fragment>
            <div className={classes.toolbar} style={{ textAlign: "center" }}>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: "none" }}>
                    Recipe Organizer {/* Recipe Resizer */}
                </Typography>
                <Typography variant="body1" style={{ color: "gray" }}>beta</Typography>
            </div>
            <List>
                <ListItem button component={Link} to="/add">
                    <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                    <ListItemText primary="Add Recipe" />
                </ListItem>
                {recipeTitles.map((r, i) => (
                    <ListItem button key={i} component={Link} to={`/recipes/${i}`}>
                        <ListItemText primary={r} />
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