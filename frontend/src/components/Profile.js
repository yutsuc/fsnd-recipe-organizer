import React, { Fragment, useState } from "react";
import { useAuth0 } from "../utils/react-auth0-spa";

const Profile = () => {
    const { loading, user, getTokenSilently } = useAuth0();
    const [token, setToken] = useState("");
    getTokenSilently().then(res => setToken(res));


    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" />
            <h2>{user.name}</h2>
            <p>{user.nickname}</p>
            <p>{user.email}</p>
            <textarea style={{width: "100%", resize: "none"}}defaultValue={token} rows={5} readOnly />
        </Fragment>
    );
};

export default Profile;