import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Abaut,
} from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages >
        <ImageSlider imagesUrl={['https://cdn.sitewebmotors.com.br/uploads/userGallery/5fcfe53240728.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 50</Price>
          </Rent>
        </Details>

        <Abaut>
          Este e automovel desportivo. Surgiu do lendario
          touro de lide indultado napraca Real Maestranza de Sevilla.
          E um belissimno carro para quem gosta de acelerar.
        </Abaut>
      </Content>
    </Container>
  );
}