import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useMediaQuery,
    useTheme,
    Button,
  } from "@mui/material";
import { useTranslation } from "react-i18next";
  import { IoIosCloseCircle } from "react-icons/io";
  
  export const OrderDetailsModal = ({ open, onClose, purchase }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const {t} = useTranslation()
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{t('Детайли за поръчката')}</Typography>
          <IconButton onClick={onClose} color="error">
            <IoIosCloseCircle size={28} />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Снимка')}</TableCell>
                <TableCell>{t('Име')}</TableCell>
                <TableCell>{t('Количество')}</TableCell>
                <TableCell>{t('Цена')} ({t('бр')}.)</TableCell>
                <TableCell>{t('Общо')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchase?.sunglasses?.map((el) => (
                <TableRow key={el._id}>
                  <TableCell>
                    <img
                      src={el.images[0] || "/images/COPY1.webp"}
                      alt={el.name || "Слънчеви очила"}
                      style={{ width: 60, borderRadius: 6 }}
                    />
                  </TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.quantity}</TableCell>
                  <TableCell>{Number(el.price).toFixed(2)} лв</TableCell>
                  <TableCell>{(el.price * el.quantity).toFixed(2)} лв</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose} color="primary">{t('Затвори')}</Button>
        </DialogActions>
      </Dialog>
    );
  };
  