import { ThemeGlobalKind, getThemeByType } from 'openland-y-utils/themes/ThemeGlobal';

class ThemeControllerImpl {
    private _appearance: ThemeGlobalKind = { theme: 'System', accent: 'Default', displayFeaturedIcon: true };
    private _watchers: ((theme: ThemeGlobalKind) => void)[] = [];

    get appearance(): ThemeGlobalKind {
        return this._appearance;
    }

    set appearance(appearance: ThemeGlobalKind) {
        let accent = appearance.accent;
        if (!accent) {
            const resolvedThemeObject = getThemeByType(appearance.theme);
            const resolvedAccentType = this._appearance.accent || 'Default';
            accent = resolvedThemeObject.supportedAccents.includes(resolvedAccentType) ? resolvedAccentType : 'Default';
        }

        this._appearance = {
            ...appearance,
            accent,
            displayFeaturedIcon: typeof appearance.displayFeaturedIcon !== 'undefined' ? appearance.displayFeaturedIcon : this._appearance.displayFeaturedIcon,
        };

        for (let w of this._watchers) {
            w(this._appearance);
        }
    }

    watch(handler: (appearance: ThemeGlobalKind) => void, callImmediately: boolean = true) {
        this._watchers.push(handler);
        if (callImmediately) {
            handler(this._appearance);
        }
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