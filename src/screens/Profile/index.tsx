import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const navegation = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const { user, signOut, updateUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [avatar, setAvatar] = useState(user.avatar);

  function handleBack() {
    navegation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (result.cancelled) {
      return;
    }

    if (!result.uri) {
      return;
    }

    setAvatar(result.uri);
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        driverLicense: Yup.string().required('CNH obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);
      await updateUser({
        ...user,
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert('Perfil atualizado com sucesso!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach(async (error) => {
          Alert.alert(error);
        });

        return;
      }

      Alert.alert('Erro ao atualizar perfil', 'Ocorreu um erro ao atualizar seu perfil, tente novamente.');
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut} >
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }}/> }
              <PhotoButton onPress={handleAvatarSelect} >
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit'
              ?
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir senha'
                />
              </Section>
            }

            <Button
              title='Salvar'
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
