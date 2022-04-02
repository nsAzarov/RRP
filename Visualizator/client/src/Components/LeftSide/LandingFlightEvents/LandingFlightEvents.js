import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../../Services';
import { LandingFlight } from './LandingFlight';
import './LandingFlightEvents.css';

export const LandingFlightEvents = () => {
  const [index, setIndex] = useState(0);

  const [landingFlightEvents, setLandingFlightEvents] = useState([]);
  const api = useMemo(() => new ApiService(), []);

  let intervalRefetchTime = 5000;
  let intervalShowTime = 0;
  if (!landingFlightEvents.length) intervalShowTime = intervalRefetchTime;
  else intervalShowTime = intervalRefetchTime / landingFlightEvents.length;

  const fetchLandingFlightEvents = useCallback(() => {
    api.getLandingFlightEvents().then((data) => {
      setLandingFlightEvents(data);
      setIndex(0);
      console.log('landingFlightEvents', data);
    });
  }, [api]);

  useEffect(() => {
    fetchLandingFlightEvents();

    const interval = setInterval(() => {
      fetchLandingFlightEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchLandingFlightEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxArrayIndex =
        landingFlightEvents.length - 1 >= 0
          ? landingFlightEvents.length - 1
          : 0;

      setIndex(Math.min(index + 1, maxArrayIndex));
    }, intervalShowTime);

    return () => {
      clearInterval(interval);
    };
  }, [index, landingFlightEvents]);

  if (!landingFlightEvents[index]) return null;
  return (
    <div id="landingFlightEvents">
      <LandingFlight event={landingFlightEvents[index]} />
    </div>
  );
};
