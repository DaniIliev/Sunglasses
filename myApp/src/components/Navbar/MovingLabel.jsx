import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BsCashStack, BsSunglasses } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import { GiReturnArrow } from 'react-icons/gi';
import { SiAuthy } from 'react-icons/si';
import PhoneIcon from '@mui/icons-material/Phone';

export const MovingLabel = ({ t }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const items = [
    { icon: <BsCashStack />, text: t('navBar.cashOnDelivery') },
    // { icon: <MdLocalShipping />, text: t('navBar.freeShipping') },
    // { icon: <BsSunglasses />, text: t('navBar.magicMirror') },
    { icon: <GiReturnArrow />, text: t('navBar.return') },
    {icon: <PhoneIcon /> , text: t('ПРИ ВЪЗНИКВАНЕ НА ПРОБЛЕМ С ПОРЪЧКАТА, МОЛЯ СВЪРЖЕТЕ СЕ С НАС НА ТЕЛЕФОН: 0885188355')},
    { icon: <SiAuthy />, text: t('navBar.authorized') },
  ];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        background: 'radial-gradient(circle, rgba(245, 142, 151, 1) 0%, rgba(148, 187, 233, 1) 100%)',
        color: '#000',
        p: 1,
        position: 'relative',
        fontSize: isMobile ? '0.8rem' : '1rem',
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'inline-flex',
          animation: 'scrollLeft 35s linear infinite',
          gap: isMobile ? 3 : 5,
          whiteSpace: 'nowrap',
          alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <Box component={'div'} key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{item.icon}</Box>
            <Typography variant="body2"  sx={{ m: 0 }}>{item.text}</Typography>
          </Box>
        ))}
      </Box>

      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
};
