import React from 'react';
import { View, StyleSheet } from 'react-native';

import useProducts from '@/hooks/useProducts';

import { ThemedText } from '@/components/segments/ThemedText';
import { ThemedInput } from '@/components/segments/ThemedInput';
import { ThemedPressable } from '@/components/segments/ThemedPressable';

//#A1CEDC
// Estructura de los datos del producto
type ItemData = {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string
};

interface MyActionProps {
    action: string;
    id: string;
}

export default function AgregarProduct({ action, id }: MyActionProps) {
    // Configuracion inicial de las fechas
    const hoy = new Date();
    const añoMasHoy = new Date()
    añoMasHoy.setFullYear(añoMasHoy.getFullYear() + 1)
    
    const [formulario, setFormulario] = React.useState<ItemData>({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: hoy.toISOString().split('T')[0],
        date_revision: añoMasHoy.toISOString().split('T')[0]
    });
    const [exist, setExist] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (action == 'edit') {
            useProducts().getProducts().then((value: ItemData[]) => {
                const info = value.filter(e => e.id.includes(id))[0];
                const fecha1 = new Date(info.date_release)
                const fecha2 = new Date(info.date_revision)
                setFormulario({
                    id: info.id,
                    name: info.name,
                    description: info.description,
                    logo: info.logo,
                    date_release: fecha1.toISOString().split('T')[0],
                    date_revision: fecha2.toISOString().split('T')[0]
                })
            });
        }
    }, []);

    const [validado, setValidado] = React.useState(false)

    const validar = () => {
        const fecha = new Date(formulario.date_release)
        const fecha2 = new Date(hoy.toISOString().split('T')[0])
        if (fecha >= fecha2) {
            return true
        } else {
            return false
        }
    }

    const registrar = () => {
        const fecha = new Date(formulario.date_release)
        const fecha2 = new Date(formulario.date_revision)
        setValidado(true)
        if (action == 'add') {
            useProducts().verificarProduct(formulario.id).then((res: boolean) => {
                console.log(res)
                setExist(res)
            })
        }
        if ((formulario.id.length >= 3 && !exist) && formulario.name.length >= 5
            && formulario.description.length >= 10 && formulario.logo.length > 0
            && fecha2 >= fecha) {
            const body = {
                id: formulario.id,
                name: formulario.name,
                description: formulario.description,
                logo: formulario.logo,
                date_release: fecha.toISOString().split('T')[0],
                date_revision: fecha2.toISOString().split('T')[0]
            }
            if (action == 'add') {
                useProducts().uploadProduct(body).then((res: ItemData) => {
                    location.href = '/';
                    console.log(res)
                })
            } else {
                useProducts().updateProduct(body).then((res: ItemData) => {
                    location.href = '/';
                    console.log(res)
                })
            }

        }
    }

    const handleChange = (name: keyof ItemData, value: string) => {
        if (name == 'id') {
            if (value.length == 6 && formulario.id.length < value.length) {
                setFormulario({
                    ...formulario,
                    [name]: value.slice(0, 5) + '-' + value.slice(5)
                });
            } else if (value.length == 6 && formulario.id.length > value.length) {
                setFormulario({
                    ...formulario,
                    [name]: value.slice(0, 5)
                });
            } else {
                setFormulario({
                    ...formulario,
                    [name]: value
                });
            }
        } else if (name == 'date_release') {
            const año = new Date(value)
            if (año.toString() != 'Invalid Date') {
                año.setFullYear(año.getFullYear() + 1)
                setFormulario({
                    ...formulario,
                    ['date_revision']: año.toISOString().split('T')[0],
                    [name]: value
                });
            } else {
                setFormulario({
                    ...formulario,
                    ['date_revision']: 'Fecha mal escrita',
                    [name]: value
                });
            }


        } else {
            setFormulario({
                ...formulario,
                [name]: value
            });
        }
    };

    return (

        <View style={styles.completo}>
            <View style={styles.title}>
                {action == 'add' ? <ThemedText type='big_bold'>Formulario de registro</ThemedText> : <ThemedText type='big_bold'>Editar registro</ThemedText>}
            </View>
            <View style={styles.completo}>
                <ThemedInput label='ID' error='Id no es valido o (Minimo 3 caracteres)' value={formulario.id} onChangeText={(value) => {handleChange('id', value);setExist(false)}} maxLength={11} validado={(!(formulario.id.length >= 3) && validado) || exist} readOnly={action == 'edit'} />
                <ThemedInput label='name' error='name no es valido (Minimo 5 caracteres)' value={formulario.name} onChangeText={(value) => handleChange('name', value)} maxLength={100} validado={!(formulario.name.length >= 5) && validado} />
                <ThemedInput label='description' error='Este campo es requerido! (Minimo 10 caracteres)' value={formulario.description} onChangeText={(value) => handleChange('description', value)} maxLength={200} validado={!(formulario.description.length >= 10) && validado} />
                <ThemedInput label='Logo' error='Este campo es requerido!' value={formulario.logo} onChangeText={(value) => handleChange('logo', value)} validado={!(formulario.logo.length > 0) && validado} />
                <ThemedInput label='Fecha Liberación' error='Fecha posterior o la actual' value={formulario.date_release} onChangeText={(value) => handleChange('date_release', value)} validado={!(validar()) && validado} />
                <ThemedInput label='Fecha Revisión' value={formulario.date_revision} readOnly />
            </View>
            <View style={styles.botones}>
                <ThemedPressable onPress={registrar}>Enviar</ThemedPressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    completo: {
        flex: 1,
        marginTop: 15
    },
    title: {
        marginTop: 15
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderColor: '#d6dae3',
        borderWidth: 1,
    },
    botones: {

        justifyContent: 'flex-end',
        marginBottom: 25
    }
});
