const validateToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('token not found');
            return null;
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.user;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export { validateToken };
