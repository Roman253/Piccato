module.exports.isAuthenticated = () => {

    if(sessionStorage.getItem(['loginToken'])) {
        return true;
    } else {
        return false;
    }
}