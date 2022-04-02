import React from 'react';
import { Aeroplane } from '../../../../icons';
import './TakingOffFlight.css';

export const TakingOffFlight = ({ event }) => {
  return (
    <div id="takingOffFlightWrapper">
      <div id="takingOffPlaneWrapper" key={event.flight}>
        <img src={Aeroplane} alt="aeroplane" id="tackingOffPlaneImage" />
        <span id="takingOffFlightTitle">Flight: {event.flight}</span>
      </div>
    </div>
  );
};
