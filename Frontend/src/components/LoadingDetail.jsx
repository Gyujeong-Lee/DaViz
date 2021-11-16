import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilValue } from 'recoil';
import { detailLoadingState } from '../recoil/detailAtom';

export default function LoadingDetail() {
  const detailLoading = useRecoilValue(detailLoadingState);
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [detailLoading]
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ height: 40 }}>
        <Fade
          in={!detailLoading}
          style={{
            transitionDelay: !detailLoading ? '800ms' : '0ms'
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
    </Box>
  );
}
