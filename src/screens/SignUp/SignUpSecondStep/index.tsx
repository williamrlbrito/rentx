import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

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

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleNavigateBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não são iguais');
      return;
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora e só fazer o login\ne aproveitar.`,
        nextScreenRoute: 'SignIn',
      });
    }).catch(() => {
      Alert.alert('Opa', 'Houve um erro ao criar a conta');
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleNavigateBack} />
            <StepsContainer>
              <Bullet />
              <Bullet active />
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
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Candidatar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
