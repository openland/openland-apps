import { ThemeGlobalKind, getThemeByType } from 'openland-y-utils/themes/ThemeGlobal';

class ThemeControllerImpl {
    private _appearance: ThemeGlobalKind = { theme: 'Light', accent: 'Default' };
    private _watchers: ((theme: ThemeGlobalKind) => void)[] = [];

    get appearance(): ThemeGlobalKind {
        return this._appearance;
    }

    set appearance(appearance: ThemeGlobalKind) {
        if (!appearance.accent) {
            const resolvedThemeObject = getThemeByType(appearance.theme);
            const resolvedAccentType = this._appearance.accent || 'Default';

            this._appearance = {
                theme: appearance.theme,
                accent: resolvedThemeObject.supportedAccents.includes(resolvedAccentType) ? resolvedAccentType : 'Default'
            };
        } else {
            this._appearance = appearance;
        }
        for (let w of this._watchers) {
            w(this._appearance);
        }
    }

    watch(handler: (appearance: ThemeGlobalKind) => void) {
        this._watchers.push(handler);
        handler(this._appearance);
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