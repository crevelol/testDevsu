import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

import { ThemedText } from './ThemedText';

export type ThemedTextInputProps = TextInputProps & {
    label?: string;
    validado?: boolean;
    error?: string;
    text?: string;
    setText?: () => void;
    editar?: boolean;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'item'
    | 'item_sub' | 'icon' | 'big' | 'item_sub_bold';
};

export function ThemedInput({
    style,
    validado,
    text,
    label,
    error,
    setText,
    editar,
    type = 'default',
    ...rest
}: ThemedTextInputProps) {

    return (
        <View style={styles.fondo}>
            <ThemedText type='inputText' style={styles.label}>{label}</ThemedText>
            <TextInput
                style={[styles.input, validado && styles.inputError ]}
                onChangeText={setText}
                editable={editar}
                value={text}
                {...rest}
            />
            <ThemedText type='inputError' style={validado ? styles.error : styles.oculto}>{ error }</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderColor: '#d6dae3',
        borderWidth: 1,
    },
    inputError: {
        borderColor: 'red',
    },
    fondo: {
        paddingVertical: 3,
    },
    label: {
        marginBottom: 5
    },
    error: {
        marginTop: 5
    },
    oculto: {
        color: 'white'
    }
});
