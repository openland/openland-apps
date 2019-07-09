import { ThemeGlobalKind } from 'openland-y-utils/themes/types';

class ThemeControllerImpl {
    private _theme: ThemeGlobalKind = 'LightBlue';
    private _watchers: ((theme: ThemeGlobalKind) => void)[] = [];

    get theme(): ThemeGlobalKind {
        return this._theme;
    }

    set theme(theme: ThemeGlobalKind) {
        this._theme = theme;
        for (let w of this._watchers) {
            w(theme);
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