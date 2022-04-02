import React from 'react';
import { CheckIn } from '../../icons';
import { CheckInEvents } from './CheckInEvents';

export const CheckInWrapper = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        width: '500px'
      }}
    >
      <img
        src={CheckIn}
        alt="checkin"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '150px',
          height: '150px'
        }}
      />
      <CheckInEvents />
    </div>
  );
};
