import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../Services';
import { PassengersCame } from './PassengersCame';
import { TicketsRegistered } from './TicketsRegistered';

export const CheckInEvents = () => {
  const [index, setIndex] = useState(0);
  const [intervalShowTime, setIntervalShowTime] = useState(0);

  const [checkInEvents, setCheckInEvents] = useState([]);
  const api = useMemo(() => new ApiService(), []);

  let intervalRefetchTime = 5000;
  useEffect(() => {
    if (!checkInEvents.length) setIntervalShowTime(intervalRefetchTime);
    else setIntervalShowTime(intervalRefetchTime / checkInEvents.length);
  }, [checkInEvents]);

  const fetchCheckInEvents = useCallback(() => {
    api.getCheckInEvents().then((data) => {
      setCheckInEvents(data);
      setIndex(0);
      console.log('checkInEvents', data);
    });
  }, [api]);

  useEffect(() => {
    fetchCheckInEvents();

    const interval = setInterval(() => {
      fetchCheckInEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchCheckInEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxArrayIndex =
        checkInEvents.length - 1 >= 0 ? checkInEvents.length - 1 : 0;

      setIndex(Math.min(index + 1, maxArrayIndex));
    }, intervalShowTime);

    return () => {
      clearInterval(interval);
    };
  }, [index, checkInEvents]);

  if (!checkInEvents[index]) return null;
  return (
    <div>
      {checkInEvents[index].type === 'passengers_came' && (
        <PassengersCame event={checkInEvents[index]} index={index} />
      )}
      {checkInEvents[index].type === 'tickets_registered' && (
        <TicketsRegistered event={checkInEvents[index]} />
      )}
    </div>
  );
};
