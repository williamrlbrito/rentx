import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Apointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      <Content>
        <Apointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Apointments>

        <FlatList
          data={cars}
          keyExtractor={car => car.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item.car}/>
          )}
        />
      </Content>
    </Container>
  );
}
