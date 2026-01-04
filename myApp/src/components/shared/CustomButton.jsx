import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  children,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  sx = {},
  ...props
}) => {
  const customStyles = {
    backgroundColor:
      variant === "contained" && color === "primary" ? "#EEAECA" : undefined,
    color: variant === "contained" && color === "primary" ? "#000" : undefined,
    borderColor:
      variant === "outlined" && color === "primary" ? "#EEAECA" : undefined,
    "&:hover": {
      backgroundColor:
        variant === "contained" && color === "primary" ? "#e89bb8" : undefined,
      borderColor:
        variant === "outlined" && color === "primary" ? "#e89bb8" : undefined,
    },
    "&:active": {
      backgroundColor:
        variant === "contained" && color === "primary" ? "#d687a6" : undefined,
    },
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    ...sx,
  };

  return (
    <Button
      variant={variant}
      color={color === "primary" ? "inherit" : color}
      fullWidth={fullWidth}
      sx={customStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
