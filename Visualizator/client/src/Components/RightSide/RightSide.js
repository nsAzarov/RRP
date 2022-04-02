import React from 'react';
import { CheckInWrapper } from '../CheckInEvents';
import { TicketSalesWrapper } from '../TicketSalesEvents';

export const RightSide = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <TicketSalesWrapper />
      <CheckInWrapper />
    </div>
  );
};
