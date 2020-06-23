import React, { Fragment } from "react";
import { useAuth0 } from "../utils/react-auth0-spa";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const Profile = () => {
    const { user } = useAuth0();

    return (
        <div>
            {user && <Fragment>
                <img src={user.picture} alt="Profile" />
                <Typography variant="h5">{user.name}</Typography>
                <TextField multiline fullWidth disabled
                    margin="normal"
                    label="JWT Token"
                    rows={5}
                    defaultValue={localStorage.getItem("jwt_token")}
                    variant="outlined"
                />
            </Fragment>}
        </div>
    );
};

export default Profile;