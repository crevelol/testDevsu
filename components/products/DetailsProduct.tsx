import React from 'react';
import { Modal, StyleSheet, View, Image, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import useProducts from '@/hooks/useProducts';

import { ThemedText } from '@/components/segments/ThemedText';
import { ThemedView } from '@/components/segments/ThemedView';
import { ThemedPressable } from '@/components/segments/ThemedPressable';

interface Props {
    selected: string;
}

type ItemData = {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
};

//#A1CEDC
export const DetailsProduct: React.FC<Props> = (props) => {

    const [data, setData] = React.useState<ItemData>({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '2000-12-01',
        date_revision: '2001-12-01'
    });

    const [modal, setModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        useProducts().getProducts().then((value: ItemData[]) => setData(value.filter(e => e.id.includes(props.selected))[0]));
    }, []);

    function fechaliberacion() {
        const fech = new Date(data.date_release)
        return fech.toISOString().split('T')[0];
    }

    function fecharevision() {
        const fech2 = new Date(data.date_revision)
        return fech2.toISOString().split('T')[0];
    }

    function eliminar() {
        useProducts().deleteProduct(props.selected).then((res: any) => location.href = '/')
    }

    return (
        <ThemedView style={styles.titleContainer}>
            <ScrollView>
            <View style={styles.row}>
                <View style={styles.col}>
                    <ThemedText type='big'>ID: {props.selected}</ThemedText>
                    <ThemedText type='item_sub'>Informacion adicional</ThemedText>
                </View>
            </View>
            <View style={styles.row_p}>
                <View style={styles.col}>
                    <View style={styles.row}>
                        <ThemedText type='item_sub' style={styles.info}>Nombre</ThemedText>
                        <ThemedText type='item_sub_bold'>{data.name}</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText type='item_sub' style={styles.info}>Descripcion</ThemedText>
                        <ThemedText type='item_sub_bold'>{data.description}</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText type='item_sub' style={styles.info}>Logo</ThemedText>
                    </View>
                    <View style={styles.rowc}>
                        <Image style={styles.tinyLogo}
                            source={{
                                uri: data.logo,
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <ThemedText type='item_sub' style={styles.info}>Fecha liberación</ThemedText>
                        <ThemedText type='item_sub_bold'>{fechaliberacion()}</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText type='item_sub' style={styles.info}>Fecha revisión</ThemedText>
                        <ThemedText type='item_sub_bold'>{fecharevision()}</ThemedText>
                    </View>
                </View>
            </View>
            </ScrollView>
            <View style={styles.completo}>
                <Link href={{
                    pathname: "/edit/[id]",
                    params: { id: props.selected }
                }} asChild ><ThemedPressable type='edit' style={styles.boton}>Editar</ThemedPressable>
                </Link>
                <ThemedPressable type='delete' style={styles.boton} onPress={() => setModal(!modal)}>Eliminar</ThemedPressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}

                onRequestClose={() => {

                }}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.modalView}>
                        <View style={{ width: '95%', alignItems: 'flex-end', paddingBottom: 15, paddingRight: 10 }}>
                            <Pressable onPress={() => setModal(!modal)}>
                                <Image
                                    source={require('@/assets/images/x.png')}
                                    style={styles.salir}
                                    resizeMode='contain'
                                />
                            </Pressable>
                        </View>
                        <ThemedText style={styles.total} type='inputText'>¿Estas seguro de eliminar el producto {data.name}?</ThemedText>
                        <ThemedPressable style={styles.totalboton} onPress={eliminar}>Confirmar</ThemedPressable>
                        <ThemedPressable style={styles.totalboton} type='edit' onPress={() => setModal(!modal)}>Cancelar</ThemedPressable>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: 10,
        color: 'white',
        flex: 1,
    },
    row: {
        marginVertical: 8,
        flexDirection: 'row'
    },
    row_p: {
        marginVertical: 8,
        marginHorizontal: 15,
        flexDirection: 'row'
    },

    rowc: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    col: {
        marginVertical: 10,
        flex: 1
    },
    info: {
        flex: 1,
    },
    completo: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    boton: {
        marginBottom: 15
    },
    tinyLogo: {
        width: '90%',
        height: 200,
        paddingVertical: 40
    },
    modalView: {
        backgroundColor: '#ffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    total: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: 30,
        paddingHorizontal: 6,
        borderColor: '#CFCFCF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    totalboton: {
        width: '95%',
        marginTop: 15,
        marginHorizontal: 20,
    },
    salir: {
        width: 12,
        height: 12
    }
});
