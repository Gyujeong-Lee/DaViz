import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilState } from 'recoil';
import { loadingstate } from '../utils/state';

export default function DelayingAppearance() {
  const [loading] = useRecoilState(loadingstate);
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ height: 40 }}>
        <Fade
          in={!loading}
          style={{
            transitionDelay: !loading ? '800ms' : '0ms'
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
    </Box>
  );
}
