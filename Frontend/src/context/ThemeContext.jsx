import { createContext } from "react";

export const ThemeContext = createContext({
  theme: 'dark',
  buttonBackgroundTheme: 'rgba(0,0,0,0)',
  objectBackgroundTheme: '#08133ad2',
  colorTheme: '#ffffff',
  sliderColor: '#1677ff',
  selectedBackgroundTheme: '#1677ff',
  selectedColorTheme: '#ffffff',

  loginBackgroundThemeBody: '#000',
  loginBackgroundThemeHeader: '#000',
});