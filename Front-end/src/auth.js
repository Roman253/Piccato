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
            console.log('Admin account logged in');
            return true;
        } else {
            console.log('User account logged in');
            return false;
        }
    }
}