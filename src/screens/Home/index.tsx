import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {
  const navigation = useNavigation();

  const CarData = {
    brand: 'audi',
    name: 'RS 5 Coupe',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail: 'https://cdn.sitewebmotors.com.br/uploads/userGallery/5fcfe53240728.png',
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }
  
  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList 
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => 
          <Car data={CarData} 
            onPress={handleCarDetails}
          />
        }
      />
      
    </Container>
  );
}