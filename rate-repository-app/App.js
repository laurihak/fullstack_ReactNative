import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

export default function App() {
  console.log('Tunnel ready');
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
