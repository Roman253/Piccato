module.exports.isAuthenticated = () => {

    if (sessionStorage.getItem('loginToken')) {

        return true;
    } else {
        return false;
    }
}

module.exports.isAdmin = () => {

    if (sessionStorage.getItem('isAdmin')) {
        console.log('The admin is here bois');
        return true;
    } else {
        console.log('No admin');
        return false;
    }
}