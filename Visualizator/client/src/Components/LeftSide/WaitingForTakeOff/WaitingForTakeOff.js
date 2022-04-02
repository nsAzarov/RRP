import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AirplaneLand } from '../../../icons';
import { ApiService } from '../../../Services';

export const WaitingForTakeOff = () => {
  const [waitingForTakeOffFlightEvents, setWaitingForTakeOffFlightEvents] =
    useState([]);
  const api = useMemo(() => new ApiService(), []);

  const fetchWaitingForTakeOffFlightEvents = useCallback(() => {
    api.getWaitingForTakeOffFlightEvents().then((data) => {
      setWaitingForTakeOffFlightEvents(data);
    });
  }, [api]);

  const intervalRefetchTime = 5000;
  useEffect(() => {
    fetchWaitingForTakeOffFlightEvents();

    const interval = setInterval(() => {
      fetchWaitingForTakeOffFlightEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchWaitingForTakeOffFlightEvents]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100px',
        width: '400px',
        border: waitingForTakeOffFlightEvents.length > 0 && '1px dashed grey',
        borderRadius: '4px',
        padding: '8px',
        overflow: 'auto',
        marginTop: '30px'
      }}
    >
      {waitingForTakeOffFlightEvents.length > 0 && (
        <div>Waiting for take off</div>
      )}
      <div style={{ display: 'flex' }}>
        {waitingForTakeOffFlightEvents.map((event) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Flight: {event.flight}</div>
            <img
              src={AirplaneLand}
              alt="airplaneLand"
              style={{ width: '60px', height: '60px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
