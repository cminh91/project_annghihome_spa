const authService = () => {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;
  
    const isAuthenticated = () => {
        if (isLocalStorageAvailable) {
            const token = localStorage.getItem("jwt-token");
            if (!token) return false;
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationDate = tokenData?.exp ? new Date(tokenData.exp * 1000) : null;
            return expirationDate ? expirationDate > new Date() : true;
        }
        return false;
    };
  
    const login = (token) => {
        if (isLocalStorageAvailable) {
            localStorage.setItem("jwt-token", token);
        }
    };
  
    const logout = () => {
        if (isLocalStorageAvailable) {
            localStorage.removeItem("jwt-token");
        }
    };
  
    return {
        isAuthenticated,
        login,
        logout,
    };
};

export default authService;