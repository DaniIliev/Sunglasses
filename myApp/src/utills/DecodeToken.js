export const decodeToken = (token) => {
    try {
      const base64Payload = token.split('.')[1]; 
      const payload = atob(base64Payload); 
      return JSON.parse(payload); 
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };