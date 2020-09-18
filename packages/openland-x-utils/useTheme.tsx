import * as React from 'react';

interface ThemeContext {
    theme: null | 'dark' | 'light';
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light" | null>>;
}

const ThemeContext = React.createContext<ThemeContext>({
    theme: null,
    setTheme: () => {
        // nope
    }
});

export const ThemeProvider = React.memo((props: {children: any}) => {
    const [theme, setTheme] = React.useState<null | 'dark' | 'light'>(null);

    const changeMeta = (t: 'dark' | 'light') => {
        let metaThemeColor = document.querySelector('meta[name=theme-color]');
        let metaSupportedColorSchemes = document.querySelector('meta[name=supported-color-schemes]');
        let metaColorScheme = document.querySelector('meta[name=color-scheme]');
        if (metaThemeColor && metaSupportedColorSchemes && metaColorScheme) {
            metaThemeColor.setAttribute('content', t === 'dark' ? '#111214' : '#fff');
            metaSupportedColorSchemes.setAttribute('content', t === 'dark' ? 'dark' : 'light');
            metaColorScheme.setAttribute('content', t === 'dark' ? 'dark' : 'light');
        }
    };

    React.useEffect(() => {
        let match = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(match.matches ? 'dark' : 'light');
        changeMeta(match.matches ? 'dark' : 'light');
        const listener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
            changeMeta(e.matches ? 'dark' : 'light');
        };
        match.addListener(listener);
        if (localStorage.getItem('interactive_app_theme') === 'LIGHT') {
            setTheme('light');
            changeMeta('light');
        }
        if (localStorage.getItem('interactive_app_theme') === 'DARK') {
            setTheme('dark');
            changeMeta('dark');
        }
        return () => match.removeListener(listener);
    });

    return (
        <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
});

export const useTheme = () => React.useContext(ThemeContext);