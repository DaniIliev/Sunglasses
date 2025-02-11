const apiUrl = process.env.REACT_APP_API_URL; 

export const createPurchase = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/purchase`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Грешка от сървъра:", errorData);
          return;
        }
        const data = await response.json();
        alert("Тhe order is successful");
        return data;
      } catch (error) {
        console.error("Грешка при fetch:", error);
      }
}

export const getPurchaseById = async (id) => {
  try{
    const response = await fetch(`${apiUrl}/purchase/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Грешка от сървъра:", errorData);
      return;
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Грешка при fetch:", error);
  }
}

