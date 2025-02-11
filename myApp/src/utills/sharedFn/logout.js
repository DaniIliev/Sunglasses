const apiUrl = process.env.REACT_APP_API_URL; 

export const logout = async (setUser) => {
    localStorage.removeItem("token");

    // Изпращане на заявка към бекенда за изчистване на сесията
    try {
      const response = await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Ако използваш бисквитки
    });
    
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null)
}