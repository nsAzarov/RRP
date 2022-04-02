import React from 'react';

export const TicketsRegistered = ({ event }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '160px',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        borderRadius: '8px',
        width: 'fit-content',
        padding: '4px'
      }}
    >
      <div>Tickets registered:</div>
      {event.ticketsRegisteredArr.map((ticket) => (
        <div>
          Flight {ticket.flight} - {ticket.tickets}
        </div>
      ))}
    </div>
  );
};
