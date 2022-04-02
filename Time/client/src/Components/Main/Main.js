import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../Services';

export const Main = () => {
  const [time, setTime] = useState(undefined);
  const [multiplicator, setMultiplicator] = useState(undefined);
  const api = useMemo(() => new ApiService(), []);

  const fetchTime = useCallback(() => {
    api.getTime().then((data) => {
      setTime(data.time);
      setMultiplicator(data.multiplicator);
    });
  }, []);

  const changeMultiplicator = useCallback((value) => {
    api.changeMultiplicator(value).then((data) => {
      setTime(data.time);
      setMultiplicator(data.multiplicator);
    });
  }, []);

  useEffect(() => {
    fetchTime();
    const interval = setInterval(() => fetchTime(), 500);
    return () => {
      clearInterval(interval);
    };
  }, [fetchTime]);

  return (
    <Box sx={{ maxWidth: '70%', margin: '100px auto' }}>
      {!!time && (
        <Typography variant="h4" align="center" paddingBottom={'20px'}>
          Date:{' '}
          {new Date(time).toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      )}
      {!!multiplicator && (
        <Typography variant="h4" align="center" paddingBottom={'20px'}>
          Multiplicator: 1 real second = {multiplicator} virtual minute
        </Typography>
      )}
      <Box>
        <Typography variant="h5" align="center" paddingBottom={'20px'}>
          Change Multiplicator
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ margin: '0 5px' }}
            onClick={() => changeMultiplicator(1)}
          >
            x1
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 5px' }}
            onClick={() => changeMultiplicator(2)}
          >
            x2
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 5px' }}
            onClick={() => changeMultiplicator(5)}
          >
            x5
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 5px' }}
            onClick={() => changeMultiplicator(10)}
          >
            x10
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
