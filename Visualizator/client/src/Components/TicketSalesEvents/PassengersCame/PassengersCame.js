import React from 'react';
import { Person, Person2 } from '../../../icons';

export const PassengersCame = ({ event, index, intervalShowTime }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '110px',
        right: '0',
        width: '350px'
      }}
    >
      <Passengers
        number={event.requestedTicketsNumber}
        index={index}
        intervalShowTime={intervalShowTime}
      />
    </div>
  );
};

const Passengers = ({ number, index, intervalShowTime }) => {
  console.log('Tickets Passengers index', index);
  return (
    <div className="passengersWrapper">
      <div
        key={index}
        className="passengers"
        style={{
          animation: `walkingPassengers ${intervalShowTime / 1000}s linear`
        }}
      >
        <div
          style={{
            textAlign: 'center',
            width: 'fit-content',
            fontSize: '26px'
          }}
        >
          {number}
        </div>
        <div
          style={{
            display: 'flex',
            width: 'fit-content'
          }}
        >
          <img
            src={Person2}
            alt="person2"
            style={{
              width: '75px',
              height: '75px'
            }}
            className="passenger"
          />
          <img
            src={Person}
            alt="person"
            style={{
              width: '75px',
              height: '75px'
            }}
            className="passenger"
          />
        </div>
      </div>
    </div>
  );
};
