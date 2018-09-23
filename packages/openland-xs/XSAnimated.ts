class XSAnimatedImplementation {

    private _isAnimating = false;

    get isAnimating() {
        return this._isAnimating;
    }
    set isAnimating(value: boolean) {
        this._isAnimating = value;
    }

    animate = (callback: () => void, completed?: () => void) => {
        let prev = this._isAnimating;
        this._isAnimating = true;
        callback();
        this._isAnimating = prev;
        if (completed) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => { completed(); }, 500);
                });
            });
        }
    }
}

export const XSAnimated = new XSAnimatedImplementation();