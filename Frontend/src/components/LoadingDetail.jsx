import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingDetail({ size, color, loading }) {
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [loading]
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ height: 40 }}>
        <Fade
          in={!loading}
          style={{
            transitionDelay: !loading ? '0ms' : '800ms'
          }}
          unmountOnExit
        >
          <CircularProgress size={size} disableShrink color={color} />
        </Fade>
      </Box>
    </Box>
  );
}
