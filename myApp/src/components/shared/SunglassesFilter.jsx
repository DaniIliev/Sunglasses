import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SunglassesContext } from "../../context/SunglassesContext";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Typography,
  Box,
  Chip,
  Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../Sunglasses/Sunglasses.css";
import "./SunglassesFilter.css";

const SunglassesFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

  const { t } = useTranslation();
  const { filterValues, setFilterValues } = useContext(SunglassesContext);

  const handleFilterChange = (category, value) => {
    setFilterValues((prevFilters) => {
      const isSelected = prevFilters[category].includes(value);

      return {
        ...prevFilters,
        [category]: isSelected
          ? prevFilters[category].filter((item) => item !== value)
          : [...prevFilters[category], value],
      };
    });
  };

  const formatPrice = (value) => {
    return `€${parseInt(value).toLocaleString()}`;
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
    setFilterValues((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  const updateSort = (newSort) => {
    setFilterValues((prev) => ({ ...prev, sort: newSort }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Sort By */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">{t("Sort by")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            value={filterValues.sort || "newest"}
            onChange={(e) => updateSort(e.target.value)}
          >
            <FormControlLabel
              value="newest"
              control={
                <Radio
                  sx={{
                    color: "#e89bb8",
                    "&.Mui-checked": { color: "#e89bb8" },
                  }}
                />
              }
              label={t("Newest")}
              sx={{
                padding: "4px 8px",
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(232, 155, 184, 0.08)" },
              }}
            />
            <FormControlLabel
              value="ascending"
              control={
                <Radio
                  sx={{
                    color: "#e89bb8",
                    "&.Mui-checked": { color: "#e89bb8" },
                  }}
                />
              }
              label={t("Price Ascending")}
              sx={{
                padding: "4px 8px",
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(232, 155, 184, 0.08)" },
              }}
            />
            <FormControlLabel
              value="descending"
              control={
                <Radio
                  sx={{
                    color: "#e89bb8",
                    "&.Mui-checked": { color: "#e89bb8" },
                  }}
                />
              }
              label={t("Price Descending")}
              sx={{
                padding: "4px 8px",
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(232, 155, 184, 0.08)" },
              }}
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Gender Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            {t("sunglassesFilter.gender")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {[
              { name: "Women", label: t("sunglassesFilter.women") },
              { name: "Man", label: t("sunglassesFilter.man") },
              { name: "Unisex", label: t("sunglassesFilter.unisex") },
            ].map((gender, index) => (
              <Box
                key={index}
                onClick={() => handleFilterChange("gender", gender.name)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Checkbox
                  checked={
                    Array.isArray(filterValues.gender) &&
                    filterValues.gender.includes(gender.name)
                  }
                  onChange={() => handleFilterChange("gender", gender.name)}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    padding: "4px",
                    marginRight: 1,
                    color: "#e89bb8",
                    "&.Mui-checked": { color: "#e89bb8" },
                  }}
                />
                <Typography>{gender.label}</Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Frame Shape Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            {t("sunglassesFilter.frameShape")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
              <Box
                key={index}
                onClick={() => handleFilterChange("frameShapes", shape.name)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  padding: "12px",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={shape.img}
                  alt={shape.label}
                  sx={{
                    width: 60,
                    height: 20,
                    objectFit: "cover",
                    objectPosition: "center",
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
                  {shape.label}
                </Typography>
                {Array.isArray(filterValues.frameShapes) &&
                  filterValues.frameShapes.includes(shape.name) && (
                    <CheckCircleIcon
                      sx={{ color: "#EEAECA" }}
                      fontSize="small"
                    />
                  )}
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Frame Color Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            {t("sunglassesFilter.frameColor")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {[
              { color: "black", bg: "#000000" },
              { color: "blue", bg: "#0000FF" },
              { color: "clear", bg: "#C0C0C0" },
              { color: "gold", bg: "#FFD700" },
              { color: "green", bg: "#008000" },
              { color: "grey", bg: "#808080" },
              {
                color: "multi",
                bg: "linear-gradient(45deg, red, blue, yellow)",
              },
              { color: "neutral", bg: "#FFDEAD" },
              { color: "orange", bg: "#FFA500" },
              { color: "pink", bg: "#FFC0CB" },
              { color: "purple", bg: "#800080" },
              { color: "red", bg: "#FF0000" },
              { color: "silver", bg: "#C0C0C0" },
              { color: "tort", bg: "#8B4513" },
              { color: "white", bg: "#FFFFFF" },
              { color: "yellow", bg: "#FFFF00" },
            ].map(({ color, bg }) => (
              <Box
                key={color}
                onClick={() => handleFilterChange("frameColor", color)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  padding: "10px 12px",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: bg,
                    border: "2px solid",
                    borderColor: filterValues.frameColor.includes(color)
                      ? "#EEAECA"
                      : "#ddd",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
                <Typography
                  sx={{
                    flex: 1,
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    fontWeight: filterValues.frameColor.includes(color)
                      ? 600
                      : 400,
                  }}
                >
                  {t(`${color}`)}
                </Typography>
                {filterValues.frameColor.includes(color) && (
                  <CheckCircleIcon sx={{ color: "#EEAECA" }} fontSize="small" />
                )}
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Lens Color Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            {t("sunglassesFilter.lensColor")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
              <Box
                key={index}
                onClick={() => handleFilterChange("lensType", lens.name)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  padding: "12px",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="img"
                  src={lens.img}
                  alt={lens.label}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    flexShrink: 0,
                    backgroundColor: "white",

                    padding: "8px",
                  }}
                />
                <Typography sx={{ flex: 1, fontWeight: 500 }}>
                  {lens.label}
                </Typography>
                {filterValues.lensType.includes(lens.name) && (
                  <CheckCircleIcon sx={{ color: "#EEAECA" }} />
                )}
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            {t("sunglassesFilter.price")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {t("sunglassesFilter.filterByPrice")}
            </Typography>
            <Slider
              value={[filterValues.minPrice, filterValues.maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={400}
              step={5}
              sx={{
                mt: 2,
                color: "#EEAECA",
                "& .MuiSlider-thumb": {
                  width: 18,
                  height: 18,
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(238, 174, 202, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  height: 4,
                },
                "& .MuiSlider-rail": {
                  height: 4,
                  backgroundColor: "#e0e0e0",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                padding: "8px 12px",
                backgroundColor: "rgba(238, 174, 202, 0.08)",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {formatPrice(filterValues.minPrice)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                —
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatPrice(filterValues.maxPrice)}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SunglassesFilter;
