import React from 'react';
import { StyleSheet, FlatList, TextInput, Pressable, View, Text, ScrollView } from 'react-native';

import useProducts from '@/hooks/useProducts';

import { ThemedText } from '@/components/segments/ThemedText';
import { ThemedView } from '@/components/segments/ThemedView';
import { ThemedPressable } from '@/components/segments/ThemedPressable';
import { useThemeColor } from '@/hooks/useThemeColor';

import { Link } from 'expo-router';

type ItemData = {
    id: string;
    name: string;
};

type ItemProps = {
    item: ItemData;
    onPress: () => void;
};
const color = useThemeColor();
const Item = ({ item, onPress }: ItemProps) => (
    <Link href={{
        pathname: "/details/[id]",
        params: { id: item.id }
    }} asChild style={styles.listaItem}>
        <Pressable onPress={onPress} style={({ pressed }) =>
            [(pressed ? color.themeDefaultBackgroundHover : color.themeDefaultBackground)]}>
            <View style={{ flex: 1 }}>
                <ThemedText type='item'>{item.name}</ThemedText>
                <ThemedText type='item_sub'>ID: {item.id}</ThemedText>
            </View>
            <ThemedText type='icon'>{'>'}</ThemedText>
        </Pressable>
    </Link>
);

interface Props {
    onChangeSelected: (value: string) => void;
}

//#A1CEDC
export const ListProducts: React.FC<Props> = (props) => {
    const [search, setSearch] = React.useState('');
    const [selectedId, setSelectedId] = React.useState('');
    const [data, setData] = React.useState<ItemData[]>([]);
    const deferredSearch = React.useDeferredValue(search);

    React.useEffect(() => {
        useProducts().getProducts().then((value: Array<any>) => setData(value));
    }, []);

    const renderItem = ({ item }: { item: ItemData }) => {
        return (
            <Item
                item={item}
                onPress={() => props.onChangeSelected(item.id)}
            />
        );
    };

    const handleSearch = (searchTerm: React.SetStateAction<string>) => {
        setSearch(searchTerm)
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toString().toLowerCase()) || item.id.includes(searchTerm.toString())
        );
        setData(filteredData);
    };

    return (
        <ThemedView style={styles.contain}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <TextInput
                        style={styles.buscador}
                        onChangeText={handleSearch}
                        value={deferredSearch}
                        placeholder="Search..."
                        keyboardType="web-search"
                        inputMode='search'
                    />
                </View>
                <View style={styles.stepContainer}>
                    {data ? <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                        style={[{ opacity: search !== deferredSearch ? 0.5 : 1 }, styles.lista]}
                    /> : <Text>No hay nada</Text>}
                </View>
            </ScrollView>
            <View style={styles.botones}>
                <Link href="/agregar" asChild>
                    <ThemedPressable>Agregar</ThemedPressable>
                </Link>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    contain: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,

    },
    buscador: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderColor: '#d6dae3',
        borderWidth: 1,
        marginTop: 40,
        marginBottom: 25,
    },
    listaItem: {
        borderWidth: 0.5,
        borderColor: '#d6dae3',
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lista: {
        borderWidth: 0.5,
        borderColor: '#d6dae3'
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    botones: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 25
    }
});
