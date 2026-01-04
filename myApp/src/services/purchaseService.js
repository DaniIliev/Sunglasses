import { REACT_APP_API_URL } from "../env";

const apiUrl = REACT_APP_API_URL;

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
};
export const getAll = async () => {
  const data = await fetch(`${apiUrl}/purchase`, {
    method: "GET",
    credentials: "include",
  });
  const purchase = await data.json();

  return purchase;
};

export const getPurchaseById = async (id) => {
  try {
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
  } catch (error) {
    console.error("Грешка при fetch:", error);
  }
};

export const markAsSeen = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/purchase/${id}/seen`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seen: true }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Грешка от сървъра:", errorData);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Грешка при fetch:", error);
    return null;
  }
};

export const deletePurchase = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/purchase/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Грешка от сървъра:", errorData);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Грешка при fetch:", error);
    return null;
  }
};

export const markOutOfStock = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/purchase/${id}/out-of-stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Грешка от сървъра:", errorData);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Грешка при fetch:", error);
    return null;
  }
};
