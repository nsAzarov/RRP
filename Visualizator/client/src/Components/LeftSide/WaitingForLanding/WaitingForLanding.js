import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AirplaneSky } from '../../../icons';
import { ApiService } from '../../../Services';

export const WaitingForLanding = () => {
  const [waitingForLandingFlightEvents, setWaitingForLandingFlightEvents] =
    useState([]);
  const api = useMemo(() => new ApiService(), []);

  const fetchWaitingForLandingFlightEvents = useCallback(() => {
    api.getWaitingForLandingFlightEvents().then((data) => {
      setWaitingForLandingFlightEvents(data);
    });
  }, [api]);

  const intervalRefetchTime = 5000;
  useEffect(() => {
    fetchWaitingForLandingFlightEvents();

    const interval = setInterval(() => {
      fetchWaitingForLandingFlightEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchWaitingForLandingFlightEvents]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100px',
        width: '400px',
        border: waitingForLandingFlightEvents.length > 0 && '1px dashed grey',
        borderRadius: '4px',
        padding: '8px',
        overflow: 'auto',
        marginBottom: '30px'
      }}
    >
      {waitingForLandingFlightEvents.length > 0 && (
        <div>Waiting for landing</div>
      )}
      <div style={{ display: 'flex' }}>
        {waitingForLandingFlightEvents.map((event) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Flight: {event.flight}</div>
            <img
              src={AirplaneSky}
              alt="airplaneSky"
              style={{ width: '60px', height: '60px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
