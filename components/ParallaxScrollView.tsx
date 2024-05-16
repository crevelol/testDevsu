import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedView } from '@/components/segments/ThemedView';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({children, headerImage}: Props) {
  //const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.base}>
      <View>
        {headerImage}
      </View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    gap: 16,
    flex: 1,
  },
});
