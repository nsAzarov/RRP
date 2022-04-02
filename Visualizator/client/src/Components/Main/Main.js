import React from 'react';
import { Center } from '../Center';
import { LeftSide } from '../LeftSide';
import { RightSide } from '../RightSide';

export const Main = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
        margin: '100px auto'
      }}
    >
      <LeftSide />
      <Center />
      <RightSide />
    </div>
  );
};
