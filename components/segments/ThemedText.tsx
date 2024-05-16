import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title'
  | 'item' | 'item_sub' | 'item_sub_bold' | 'icon' 
  | 'big' | 'big_bold'
  | 'inputText' | 'inputError';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor();

  return (
    <Text
      style={[
        type === 'title' ? styles.title : undefined,
        ///////
        type === 'item' ? [styles.item, color.themeText] : undefined,
        type === 'item_sub' ? [styles.item_sub, color.themeTextSecondary] : undefined,
        type === 'item_sub_bold' ? [styles.item_sub_bold, color.themeText] : undefined,
        type === 'icon' ? [styles.icon, color.themeTextSecondary] : undefined,
        ///////
        type === 'big' ? [styles.big, color.themeText] : undefined,
        type === 'big_bold' ? [styles.big_bold, color.themeText] : undefined,
        ///////
        type === 'default' ? styles.default : undefined,
        ///////
        type === 'inputText' ? [styles.inputText, color.themeText] : undefined,
        type === 'inputError' ? [styles.inputError, color.themeTextError] : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({

  /////////////////////////////////////
  //   ESTILOS PARA TEXTO TITULO
  ////////////////////////////////////
  title: {
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 32,
    color: '#2B478C',
    fontFamily: 'serif'
  },

  /////////////////////////////////////
  //   ESTILOS PARA TEXTO ITEM
  ////////////////////////////////////
  item: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
  },
  item_sub: {
    fontSize: 12,
  },
  item_sub_bold: {
    fontSize: 12,
    fontWeight: '700'
  },
  icon: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  /////////////////////////////////////
  //   ESTILOS PARA TEXTO INPUT
  ////////////////////////////////////
  inputText:{
    fontSize: 15,
    fontWeight: '600'
  },
  inputError:{
    fontSize: 12
  },

  /////////////////////////////////////
  //   ESTILOS PARA TEXTO VARIOS
  ////////////////////////////////////
  big: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'serif'
  },
  big_bold: {
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'serif'
  },

  ///////////////////////////////////
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
});
