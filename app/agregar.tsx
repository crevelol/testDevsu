import React from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Header } from '@/components/Header';
import AgregarProduct from '@/components/products/actions/ActionProduct';

export default function Agregar() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFF', dark: '#1D3D47' }}
            headerImage={
                <Header />
            }>
            <AgregarProduct action={'add'} id={'0'} />
        </ParallaxScrollView>
    );
}