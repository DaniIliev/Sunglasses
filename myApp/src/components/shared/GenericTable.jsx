import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";

const GenericTable = ({
  columns,
  data,
  renderRow,
  renderMobileCard,
  emptyMessage = "Няма налични данни",
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  // Mobile view - Card layout
  if (isMobile && renderMobileCard) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, ...sx }}
      >
        {data.map((item, index) => renderMobileCard(item, index))}
      </Box>
    );
  }

  // Desktop view - Table layout
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        width: "95%",
        margin: "0 auto",
        borderRadius: 2,
        overflow: "hidden",
        ...sx,
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || "left"}
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  ...column.headerSx,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id || index}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#fafafa",
                },
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                transition: "background-color 0.2s",
              }}
            >
              {renderRow(item, index)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
