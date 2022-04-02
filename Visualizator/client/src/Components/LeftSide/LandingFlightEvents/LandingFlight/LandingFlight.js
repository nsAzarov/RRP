import React from 'react';
import { Aeroplane } from '../../../../icons';
import './LandingFlight.css';

export const LandingFlight = ({ event }) => {
  return (
    <div id="landingFlightWrapper">
      <div id="landingPlaneWrapper" key={event.flight}>
        <span id="landingFlightTitle">Flight: {event.flight}</span>
        <img src={Aeroplane} alt="aeroplane" id="landingPlaneImage" />
      </div>
    </div>
  );
};
