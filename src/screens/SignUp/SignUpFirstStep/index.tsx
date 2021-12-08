import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  StepsContainer,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleNavigateBack} />
            <StepsContainer>
              <Bullet active />
              <Bullet />
            </StepsContainer>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>

          <Subtitle>
            faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
            />
          </Form>

          <Button
            title="Próximo"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
