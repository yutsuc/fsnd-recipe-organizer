import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "../utils/react-auth0-spa";
import RecipesDrawer from "./RecipesDrawer";
import AddRecipe from "./AddRecipe";
import Recipe from "./Recipe";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" aria-label="open drawer" onClick={() => setMobileOpen(!mobileOpen)} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    {!isAuthenticated && (<Button className={classes.loginButton} onClick={() => loginWithRedirect({})}>Log In</Button>)}
                    {isAuthenticated && (<Button className={classes.profileButton} component={Link} to="/profile">Profile</Button>)}
                    {isAuthenticated && (<Button className={classes.logoutButton} onClick={() => logout()}>Log out</Button>)}
                </Toolbar>
            </AppBar>
            <RecipesDrawer open={mobileOpen} handleDrawerClose={() => setMobileOpen(!mobileOpen)} drawerWidth={drawerWidth} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/"><Typography>Welcome to Recipe Organizer{isAuthenticated? "" : ", please log in to continue"}</Typography></Route>
                    <PrivateRoute exact path="/add" component={AddRecipe} />
                    <PrivateRoute exact path="/recipes/:id" component={Recipe} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
            </main>
        </div>
    );
}

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
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
    loginButton: {
        color: "#FFFFFF",
        marginLeft: "auto"
    },
    logoutButton: {
        color: "#FF5733",
        marginLeft: "10px"
    },
    profileButton: {
        color: "#FFFFFF",
        marginLeft: "auto"
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default App;
