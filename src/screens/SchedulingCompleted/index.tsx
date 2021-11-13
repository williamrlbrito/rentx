import React from 'react';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

export function SchedulingCompleted() {
  const { width } = useWindowDimensions();
  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro alugado</Title>

        <Message>
          Agora voce so precisa ir {'\n'}
          ate a concessionaria da RENTX {'\n'}
          pegar o seu automovel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" />
      </Footer>
    </Container>
  );
}