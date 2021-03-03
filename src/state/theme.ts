import { atom, selector } from 'recoil';
import { IColorTheme } from '../interfaces/ColorTheme';
import { DarkTheme } from '../themes/darkTheme';

type availableThemes = 'dark';

export const selectedColorTheme = atom<availableThemes>({
  key: 'PAGE_SELECTED_THEME',
  default: 'dark',
});

export const colorTheme = selector<IColorTheme>({
  key: 'PAGE_THEME',
  get: ({ get }) => {
    const themeName = get(selectedColorTheme);

    switch (themeName) {
      case 'dark':
        return DarkTheme;
      default:
        // Fallback to dark theme for unknown themes
        return DarkTheme;
    }
  },
});
