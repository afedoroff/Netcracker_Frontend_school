import React, { useState } from 'react';
import { Appearance } from 'react-native';
import { ColorTheme, DARK_COLORS, LIGHT_COLORS } from '../Constant/Colors';

export const ThemeContext = React.createContext({
  isDark: false,
  colors: LIGHT_COLORS,
  setColorScheme: (scheme: string) => {},
});

type Props = {
    children: React.ReactNode;
};
export interface Theme {
    isDark: boolean,
    colors: ColorTheme,
    setColorScheme: (scheme: string) => {},
  }

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const defaultTheme = {
    isDark,
    colors: isDark ? DARK_COLORS : LIGHT_COLORS,
    setColorScheme: (scheme: string) => {
      setIsDark(scheme === 'dark');
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};