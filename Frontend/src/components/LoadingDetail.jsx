import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingDetail({ color, loading }) {
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
      <Box sx={{ height: 60 }}>
        <Fade
          in={!loading}
          style={{
            transitionDelay: !loading ? '800ms' : '0ms'
          }}
          unmountOnExit
        >
          <CircularProgress color={color} />
        </Fade>
      </Box>
    </Box>
  );
}
