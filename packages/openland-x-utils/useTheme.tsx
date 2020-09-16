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
    React.useEffect(() => {
        let match = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(match.matches ? 'dark' : 'light');
        const listener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };
        match.addEventListener('change', listener);
        if (localStorage.getItem('interactive_app_theme') === 'LIGHT') {
            setTheme('light');
        }
        if (localStorage.getItem('interactive_app_theme') === 'DARK') {
            setTheme('dark');
        }
        return () => match.removeEventListener('change', listener);
    });

    return (
        <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
});

export const useTheme = () => React.useContext(ThemeContext);