
// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};

export function getPermissions() {
    const token = localStorage.getItem("jwt_token");
    if (!token)
        return [];
    const tokenObj = parseJwt(token);
    return tokenObj["permissions"];
}