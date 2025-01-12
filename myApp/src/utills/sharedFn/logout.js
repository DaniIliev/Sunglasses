export const logout = async (setUser) => {
    localStorage.removeItem("token");

    // Изпращане на заявка към бекенда за изчистване на сесията
    try {
      const response = await fetch("http://localhost:5200/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Ако използваш бисквитки
    });
    
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null)
}