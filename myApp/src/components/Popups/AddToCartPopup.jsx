import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddToCartPopup = ({ product, onClose }) => {
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [product, onClose]);

  if (!product) return null;

  return (
    <Dialog
      open={!!product}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, px: 2, py: 1.5 }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Продукт добавен
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar
            src={product?.images?.[0]}
            alt={product?.name}
            variant="rounded"
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="subtitle1" sx={{textTransform: 'uppercase'}} fontWeight={500}>
            {product?.name}
          </Typography>
        </Box>
        <Typography variant="body2">
          Добавихте <strong style={{textTransform: 'uppercase'}}>{product?.name}</strong> към вашата количка!
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Затвори
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant="contained"
          color="primary"
        >
          Към количката
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCartPopup;


// export default AddToCartPopup