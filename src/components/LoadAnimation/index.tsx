import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCart from '../../assets/loadingCar.json';

import {
  Container,
} from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCart}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
