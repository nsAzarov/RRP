import React from 'react';
import { Airport } from '../../icons';

export const Center = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <div
        style={{ fontSize: '32px', textAlign: 'center', marginBottom: '5px' }}
      >
        Airport
      </div>
      <img
        src={Airport}
        alt="airport"
        style={{ width: '270px', height: '270px' }}
      />
    </div>
  );
};
