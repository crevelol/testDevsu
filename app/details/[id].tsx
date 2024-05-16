import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Header } from '@/components/Header';
import { DetailsProduct } from '@/components/products/DetailsProduct';

//Parametros traidos de la pantalla index
type SearchParams = {
  id: string;
};
//#A1CEDC
export default function Details() {
  const { id } = useLocalSearchParams<SearchParams>();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFF', dark: '#1D3D47' }}
      headerImage={
        <Header />
      }>
        <DetailsProduct selected={id || ''} />
    </ParallaxScrollView>
  );
}