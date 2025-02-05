export const createPurchase = async (formData) => {
    try {
        const response = await fetch("http://localhost:5200/purchase", {
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
      } catch (error) {
        console.error("Грешка при fetch:", error);
      }
}