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
  
  // const [lastIndex, setLastIndex] = useState(0); // Индекс за следващите 10 очила
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderMoreSunglasses, setLoaderMoreSunglasses] = useState(false)


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
        const result = await sunglassesService.getAll(); 
        setSunglasses(result);
        // setIsLoading(false)
        // setLastIndex(lastIndex + result.length);

        // if (result.length < 24) {
        //   setHasMore(false); 
        // }
      } catch (err) {
        console.error("Error fetching sunglasses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSunglasses();
  }, []);

  // const loadMoreSunglasses = async () => {
  //   if (isLoading || !hasMore) return; // Ако вече зареждаме или няма повече очила, не правим нищо

  //   setLoaderMoreSunglasses(true);

  //   try {
  //     const newSunglasses = await sunglassesService.getAll(lastIndex, 12); // Зареждаме следващите 10
  //     setSunglasses((prevSunglasses) => [...prevSunglasses, ...newSunglasses]); // Добавяме новите очила към старите
  //     // setFilteredSunglasses((prevSunglasses) => [...prevSunglasses, ...newSunglasses]);

  //     setLastIndex(lastIndex + newSunglasses.length); // Обновяваме последния индекс

  //     if (newSunglasses.length < 10) {
  //       setHasMore(false); // Ако няма повече очила, спираме зареждането
  //     }
  //   } catch (err) {
  //     console.error("Error fetching sunglasses:", err);
  //   } finally {
  //     setLoaderMoreSunglasses(false);
  //   }
  // };

  return (
    <SunglassesContext.Provider
      value={{
        sunglasses,
        isLoading,
        filteredSunglasses,
        setFilteredSunglasses,
        filterValues,
        setFilterValues,
        // loadMoreSunglasses,
        loaderMoreSunglasses,
        hasMore
      }}
    >
      {children}
    </SunglassesContext.Provider>
  );
};

export { SunglassesContext, SunglassesProvider };
