import { createContext, useEffect, useState } from "react";
import * as sunglassesService from "../services/sunglassesService";

const SunglassesContext = createContext(null);

const SunglassesProvider = ({ children }) => {
  const [sunglasses, setSunglasses] = useState([]);
  const [filteredSunglasses, setFilteredSunglasses] = useState([]);
  const [filterValues, setFilterValues] = useState({
    sort: "newest",
    frameShapes: [],
    frameColor: [],
    lensType: [],
    minPrice: 0,
    maxPrice: 400,
    query: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    sunglassesService
      .getAll()
      .then((result) => {
        setSunglasses(result);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SunglassesContext.Provider
      value={{
        sunglasses,
        isLoading,
        filteredSunglasses,
        setFilteredSunglasses,
        filterValues,
        setFilterValues,
      }}
    >
      {children}
    </SunglassesContext.Provider>
  );
};

export { SunglassesContext, SunglassesProvider };
