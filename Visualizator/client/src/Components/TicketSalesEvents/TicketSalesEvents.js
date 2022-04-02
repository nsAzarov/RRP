import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../Services';
import { PassengersCame } from './PassengersCame';
import { TicketsBought } from './TicketsBought';

export const TicketSalesEvents = () => {
  const [index, setIndex] = useState(0);
  const [intervalShowTime, setIntervalShowTime] = useState(0);

  const [ticketSalesEvents, setTicketSalesEvents] = useState([]);
  const api = useMemo(() => new ApiService(), []);

  let intervalRefetchTime = 5000;
  useEffect(() => {
    if (!ticketSalesEvents.length) setIntervalShowTime(intervalRefetchTime);
    else setIntervalShowTime(intervalRefetchTime / ticketSalesEvents.length);
  }, [ticketSalesEvents]);

  const fetchTicketSalesEvents = useCallback(() => {
    api.getTicketSalesEvents().then((data) => {
      setTicketSalesEvents(data);
      setIndex(0);
      console.log('ticketSalesEvents', data);
    });
  }, [api]);

  useEffect(() => {
    fetchTicketSalesEvents();

    const interval = setInterval(() => {
      fetchTicketSalesEvents();
    }, intervalRefetchTime);

    return () => {
      clearInterval(interval);
    };
  }, [fetchTicketSalesEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxArrayIndex =
        ticketSalesEvents.length - 1 >= 0 ? ticketSalesEvents.length - 1 : 0;

      setIndex(Math.min(index + 1, maxArrayIndex));
    }, intervalShowTime);

    return () => {
      clearInterval(interval);
    };
  }, [index, ticketSalesEvents]);

  if (!ticketSalesEvents[index]) return null;
  return (
    <div>
      {ticketSalesEvents[index].type === 'passengers_came' && (
        <PassengersCame
          event={ticketSalesEvents[index]}
          index={index}
          intervalShowTime={intervalShowTime}
        />
      )}
      {ticketSalesEvents[index].type === 'tickets_bought' && (
        <TicketsBought event={ticketSalesEvents[index]} />
      )}
    </div>
  );
};
