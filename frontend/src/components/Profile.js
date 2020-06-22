import React, { Fragment } from "react";
import { useAuth0 } from "../utils/react-auth0-spa";

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" />
            <h2>{user.name}</h2>
            <p>{user.nickname}</p>
            <p>{user.email}</p>
            <textarea style={{width: "100%", resize: "none"}}defaultValue={localStorage.getItem("jwt_token")} rows={5} readOnly />
        </Fragment>
    );
};

export default Profile;