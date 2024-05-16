import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Header } from '@/components/Header';
import AgregarProduct from '@/components/products/actions/ActionProduct';
//Parametros traidos de la pantalla detalles
type SearchParams = {
    id: string;
};

export default function Editar() {
    const { id } = useLocalSearchParams<SearchParams>();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFF', dark: '#1D3D47' }}
            headerImage={
                <Header />
            }>
            <AgregarProduct action={'edit'} id={id || ''} />
        </ParallaxScrollView>
    );
}