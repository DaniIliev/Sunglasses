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
    gender: ''
  });
  
  const [lastIndex, setLastIndex] = useState(0); // Индекс за следващите 10 очила
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  // useEffect(() => {
  //   setIsLoading(true);
  //   sunglassesService
  //     .getAll()
  //     .then((result) => {
  //       setSunglasses(result);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const loadSunglasses = async () => {
      setIsLoading(true);
      try {
        const result = await sunglassesService.getAll(lastIndex, 10); // Извличаме първите 10 очила
        setSunglasses(result);
        // setFilteredSunglasses(result);
        setIsLoading(false)
        setLastIndex(lastIndex + result.length); // Увеличаваме индекса за следващите очила

        if (result.length < 10) {
          setHasMore(false); // Ако не са заредени 10, значи няма повече очила за зареждане
        }
      } catch (err) {
        console.error("Error fetching sunglasses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSunglasses();
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
