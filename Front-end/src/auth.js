module.exports.isAuthenticated = () => {

    if (sessionStorage.getItem('loginToken')) {

        return true;
    } else {
        return false;
    }
}

module.exports.isAdmin = () => {

    if (sessionStorage.getItem('isAdmin')) {
        console.log('Admin account logged in');
        return true;
    } else {
        console.log('User account logged in');
        return false;
    }
}