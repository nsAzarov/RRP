import React from 'react';
import { Tickets } from '../../icons';
import { TicketSalesEvents } from './TicketSalesEvents';

export const TicketSalesWrapper = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        width: '500px'
      }}
    >
      <img
        src={Tickets}
        alt="tickets"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '150px',
          height: '150px'
        }}
      />
      <TicketSalesEvents />
    </div>
  );
};
