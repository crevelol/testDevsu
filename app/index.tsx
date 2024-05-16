import React from 'react';
import { BackHandler, Alert } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Header } from '@/components/Header';
import { ListProducts } from '@/components/products/ListProducts';

export default function HomeScreen() {
  const [selectedId, setSelectedId] = React.useState('');

  React.useEffect(() => {
    // Alerta cuando se retrocede que imprime un modal de salida
    const backAction = () => {
      if (selectedId !== '') {
        setSelectedId('')
      } else {
        Alert.alert('Salir', '¿Esta seguro que desea salir?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'SI', onPress: () => BackHandler.exitApp() },
        ]);
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedId]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFF', dark: '#1D3D47' }}
      headerImage={
        <Header />
      }>
      
        <ListProducts onChangeSelected={(id: string) => { setSelectedId(id) }} />
    </ParallaxScrollView>
  );
}