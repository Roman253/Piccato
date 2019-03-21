module.exports.isAuthenticated = () => {
    
    if (sessionStorage.getItem('userData')) {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData.authToken) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports.isAdmin = () => {

    if (sessionStorage.getItem('userData')) {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData.role == 'admin') {
            return true;
        } else {
            return false;
        }
    }
}