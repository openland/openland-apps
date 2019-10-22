import { ThemeGlobalKind, getThemeByType } from 'openland-y-utils/themes/ThemeGlobal';

class ThemeControllerImpl {
    private _theme: ThemeGlobalKind = { theme: 'Light', accent: 'Default' };
    private _watchers: ((theme: ThemeGlobalKind) => void)[] = [];

    get theme(): ThemeGlobalKind {
        return this._theme;
    }

    set theme(theme: ThemeGlobalKind) {
        if (!theme.accent) {
            const resolvedThemeObject = getThemeByType(theme.theme);
            const resolvedAccentType = this._theme.accent || 'Default';

            this._theme = {
                theme: theme.theme,
                accent: resolvedThemeObject.supportedAccents.includes(resolvedAccentType) ? resolvedAccentType : 'Default'
            };
        } else {
            this._theme = theme;
        }
        for (let w of this._watchers) {
            w(this._theme);
        }
    }

    watch(handler: (theme: ThemeGlobalKind) => void) {
        this._watchers.push(handler);
        handler(this._theme);
        return () => {
            let index = this._watchers.indexOf(handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this._watchers.splice(index, 1);
            }
        };
    }
}

export const ThemeController = new ThemeControllerImpl();