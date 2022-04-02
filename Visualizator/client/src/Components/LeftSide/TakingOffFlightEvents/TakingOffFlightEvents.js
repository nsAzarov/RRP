import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../../Services';
import { TakingOffFlight } from './TakingOffFlight';
import './TakingOffFlightEvents.css';

export const TakingOffFlightEvents = () => {
  const [index, setIndex] = useState(0);

  const [takingOffFlightEvents, setTakingOffFlightEvents] = useState([]);
  const api = useMemo(() => new ApiService(), []);

  let intervalRefetchTime = 5000;
  let intervalShowTime = 0;
  if (!takingOffFlightEvents.length) intervalShowTime = intervalRefetchTime;
  else intervalShowTime = intervalRefetchTime / takingOffFlightEvents.length;

  const fetchTakingOffFlightEvents = useCallback(() => {
    api.getTakingOffFlightEvents().then((data) => {
      setTakingOffFlightEvents(data);
      setIndex(0);
      console.log('takingOffFlightEvents', data);
    });
  }, [api]);

  useEffect(() => {
    fetchTakingOffFlightEvents();

    const interval = setInterval(() => {
      fetchTakingOffFlightEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchTakingOffFlightEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxArrayIndex =
        takingOffFlightEvents.length - 1 >= 0
          ? takingOffFlightEvents.length - 1
          : 0;

      setIndex(Math.min(index + 1, maxArrayIndex));
    }, intervalShowTime);

    return () => {
      clearInterval(interval);
    };
  }, [index, takingOffFlightEvents]);

  if (!takingOffFlightEvents[index]) return null;
  return (
    <div id="takingOffFlightEvents">
      <TakingOffFlight event={takingOffFlightEvents[index]} />
    </div>
  );
};
