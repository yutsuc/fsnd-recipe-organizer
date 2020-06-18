import React from "react";
import { Switch, Route } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import RecipesDrawer from "./RecipesDrawer";
import AddRecipe from "./AddRecipe";
import Recipe from "./Recipe";

class App extends React.Component {
    state = {
        mobileOpen: false,
    }

    componentDidMount = () => {

    }

    handleDrawerToggle = () => {
        this.setState( prevState => ({ mobileOpen: !prevState.mobileOpen }));
    }

    render = () => {
        const { mobileOpen } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" aria-label="open drawer" onClick={this.handleDrawerToggle} className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <RecipesDrawer open={mobileOpen} handleDrawerClose={this.handleDrawerToggle} drawerWidth={drawerWidth} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/"><Typography>Welcome to Recipe Organizer, please log in to continue</Typography></Route>
                        <Route exact path="/add"><AddRecipe /></Route>
                        <Route exact path="/recipes/:id"><Recipe /></Route>
                    </Switch>
                </main>
            </div>
        );
    }
}

const drawerWidth = 200;
const styles = theme => ({
    app: {
        display: "flex",
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

export default withStyles(styles)(App);
