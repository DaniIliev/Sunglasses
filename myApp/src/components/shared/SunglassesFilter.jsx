import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../Sunglasses/Sunglasses.css";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoCheckmarkDone } from "react-icons/io5";
import { SunglassesContext } from "../../context/SunglassesContext";

const SunglassesFilter = () => {
  const [filters, setFilters] = useState({
    frameShape: false,
    frameColor: false,
    lensType: false,
    price: false,
  });

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

  const { t } = useTranslation();
  const {filterValues, setFilterValues} = useContext(SunglassesContext)

  const toggleFilter = (filterName) => {
      setFilters((prevState) => ({
        ...prevState,
        [filterName]: !prevState[filterName],
      }));
  };

  const handleFilterChange = (category, value) => {
    setFilterValues((prevFilters) => {
      const isSelected = prevFilters[category].includes(value);

      return {
        ...prevFilters,
        [category]: isSelected
          ? prevFilters[category].filter((item) => item !== value) // Премахване, ако вече е избран
          : [...prevFilters[category], value], // Добавяне, ако не е избран
      };
    });
  };

  const formatPrice = (value) => {
    return `${parseInt(value).toLocaleString()}лв`;
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(parseInt(e.target.value), maxPrice - 5); // Prevent overlap
    setMinPrice(value);
    setFilterValues((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(parseInt(e.target.value), minPrice + 5); // Prevent overlap
    setMaxPrice(value);
    setFilterValues((prev) => ({ ...prev, maxPrice: value }));
  };

  return (
    <>
<p
  className="sunglassesfilter"
  onClick={() => toggleFilter("gender")}
>
  <span>{t("sunglassesFilter.gender")}
    {filters.gender ? (
      <MdKeyboardArrowUp />
    ) : (
      <MdOutlineKeyboardArrowDown />
    )}
  </span>
</p>
{filters.gender && (
  <div className="checkboxes">
    {[
      // { name: "All", label: t("sunglassesFilter.all") }, // Дефолтна опция "ALL"
      { name: "Women", label: t("sunglassesFilter.women") },
      { name: "Man", label: t("sunglassesFilter.man") },
      { name: "Unisex", label: t("sunglassesFilter.unisex") },
    ].map((gender, index) => (
      <label key={index} className="container">
        {gender.label}
        <input
          type="checkbox"
          checked={
            Array.isArray(filterValues.gender) &&
            filterValues.gender.includes(gender.name)
          }
          onChange={() => handleFilterChange("gender", gender.name)}
        />
        <span className="checkmark"></span>
      </label>
    ))}
  </div>
)}


      <p
        className="sunglassesfilter"
        onClick={() => toggleFilter("frameShape")}
      >
        <span>{t("sunglassesFilter.frameShape")}
        {filters.frameShape ? (
          <MdKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}</span>
      </p>
      {filters.frameShape && (
        <div className="checkboxes">
          {[
            {
              name: "Round",
              label: t("sunglassesFilter.checkbox1"),
              img: "/images/round.jpeg",
            },
            {
              name: "Squared",
              label: t("sunglassesFilter.checkbox2"),
              img: "/images/squared.jpeg",
            },
            {
              name: "Rechtangular",
              label: t("sunglassesFilter.checkbox3"),
              img: "/images/rechtangular.jpeg",
            },
            {
              name: "Pilot/Aviator",
              label: t("sunglassesFilter.checkbox4"),
              img: "/images/pilotAviator.jpeg",
            },
            {
              name: "Cat eye",
              label: t("sunglassesFilter.checkbox5"),
              img: "/images/catEye.jpeg",
            },
          ].map((shape, index) => (
            <label key={index} className="container">
              {shape.label}
              <img src={shape.img} alt="" />
              <input
                type="checkbox"
                // checked={filterValues.frameShapes.includes(shape.name)}
                checked={
                  Array.isArray(filterValues.frameShapes) &&
                  filterValues.frameShapes.includes(shape.name)
                }
                onChange={() => handleFilterChange("frameShapes", shape.name)}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      )}

      <p
        className="sunglassesfilter"
        onClick={() => toggleFilter("frameColor")}
      >
        {t("sunglassesFilter.frameColor")}
        <span>{filters.frameColor ? (
          <MdKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}</span>
      </p>
      {filters.frameColor && (
        <div className="frame-colors">
          {[
            "black",
            "blue",
            "clear",
            "gold",
            "green",
            "grey",
            "multi",
            "neutral",
            "orange",
            "pink",
            "purple",
            "red",
            "silver",
            "tort",
            "white",
            "yellow",
          ].map((color) => (
            <div
              key={color}
              className="colorContainer"
              onClick={() => handleFilterChange("frameColor", color)}
            >
              <p className={color}></p>
              <div className="frameColorP" style={{textTransform: "uppercase"}}>
                {t(`${color}`)}
                <span>
                  {filterValues.frameColor.includes(color) ? (
                    <FaRegDotCircle />
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="sunglassesfilter" onClick={() => toggleFilter("lensColor")}>
        {t("sunglassesFilter.lensColor")}
        <span>{filters.lensColor ? (
          <MdKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}</span>
      </p>
      {filters.lensColor && (
        <div className="lens-colors">
          {[
            {
              name: "Standart sun lenses",
              label: t("sunglassesFilter.standart"),
              img: "/images/standartsunlenses.png",
            },
            {
              name: "Polarized",
              label: t("sunglassesFilter.polarized"),
              img: "/images/polarized.png",
            },
            {
              name: "Mirrored",
              label: t("sunglassesFilter.mirrored"),
              img: "/images/mirrored.png",
            },
            {
              name: "With a color transition",
              label: t("sunglassesFilter.transition"),
              img: "/images/colortransaction.png",
            },
            {
              name: "Diobtric sunglasses",
              label: t("sunglassesFilter.diobtric"),
              img: "/images/dioptric.png",
            },
          ].map((lens, index) => (
            <div
              key={index}
              className="lens-color-container"
              onClick={() => handleFilterChange("lensType", lens.name)}
            >
              <img src={lens.img} alt="" width={50} />
              <div className="lensP">
                {lens.label}
                <span>{filterValues.lensType.includes(lens.name)  ? (
                  <IoCheckmarkDone className="lensTypeCheckmark" />
                ) : (
                  ""
                )}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="sunglassesfilter" onClick={() => toggleFilter("price")}>
        {t("sunglassesFilter.price")}
        <span>{filters.price ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
      </p>
      {filters.price ? (
        <div className="filter-container">
          <h3>{t("sunglassesFilter.filterByPrice")}</h3>
          <div className="price-slider">
            {/* Min Price Slider */}
            <input
              type="range"
              className="slider min-slider"
              min="0"
              max="400"
              step="5"
              value={filterValues.minPrice}
              onChange={handleMinPriceChange}
            />
            {/* Max Price Slider */}
            <input
              type="range"
              className="slider max-slider"
              min="0"
              max="400"
              step="5"
              value={filterValues.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div className="price-labels">
            <span>
              Price: {formatPrice(minPrice)} — {formatPrice(maxPrice)}
            </span>
          </div>
          <button className="filter-button">FILTER</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SunglassesFilter;
