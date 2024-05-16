import { Text, type TextProps, StyleSheet, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'delete' | 'edit' | 'default';
};

export function ThemedPressable({
    style,
    lightColor,
    darkColor,
    type = 'default',
    children,
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor();

    return (
        <Pressable style={({pressed}) => [
            type === 'delete' ? styles.deletePress : undefined,
            type === 'edit' ? styles.editPress : undefined,
            type === 'default' ? styles.defaultPress : undefined,
            (pressed && type === 'delete') ? styles.deletePressHover : undefined,
            (pressed && type === 'edit') ? styles.editPressHover : undefined,
            (pressed && type === 'default') ? styles.defaultPressHover : undefined,
            style,
        ]} {...rest}>
            <Text style={[
                type === 'delete' ? styles.delete : undefined,
                type === 'edit' ? [styles.edit, color.themeText] : undefined,
                type === 'default' ? [styles.default, color.themeText] : undefined,
            ]}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    ///////////////////////////////////////
    //   ESTLOS BOTON DELETE
    ///////////////////////////////////////
    delete: {
        fontSize: 12.5,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'white',
    },
    deletePress: {
        backgroundColor: '#d50606',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    deletePressHover: {
        backgroundColor: '#D53232',
    },
    ///////////////////////////////////////
    //   ESTLOS BOTON EDIT
    ///////////////////////////////////////
    edit: {
        fontSize: 12.5,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
    },
    editPress: {
        backgroundColor: '#e8edf3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    editPressHover: {
        backgroundColor: '#C6CBD1',
    },
    ///////////////////////////////////////
    //   ESTLOS BOTON DEFAULT
    ///////////////////////////////////////
    default: {
        fontSize: 12.5,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
    },
    defaultPress: {
        backgroundColor: '#ffdd00',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    defaultPressHover: {
        backgroundColor: '#FFEA64',
    }
});
