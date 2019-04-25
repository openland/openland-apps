export type ThemeKind = 'light' | 'dark';

class ThemeControllerImpl {
    private _theme: ThemeKind = 'light';
    private _watchers: ((theme: ThemeKind) => void)[] = [];

    get theme(): ThemeKind {
        return this._theme;
    }

    set theme(theme: ThemeKind) {
        this._theme = theme;
        for (let w of this._watchers) {
            w(theme);
        }
    }

    watch(handler: (theme: ThemeKind) => void) {
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