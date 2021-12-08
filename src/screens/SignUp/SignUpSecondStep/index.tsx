import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
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

export function SignUpSecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();

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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
            />
            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Candidatar"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
