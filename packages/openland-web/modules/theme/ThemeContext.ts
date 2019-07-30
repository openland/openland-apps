import * as React from 'react';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const ThemeContext = React.createContext<ThemeGlobal>(ThemeLightBlue);
