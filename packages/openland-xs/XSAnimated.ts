class XSAnimatedImplementation {

    private _isAnimating = false;

    get isAnimating() {
        return this._isAnimating;
    }
    set isAnimating(value: boolean) {
        this._isAnimating = value;
    }

    animate = (callback: () => void) => {
        let prev = this._isAnimating;
        this._isAnimating = true;
        callback();
        this._isAnimating = prev;
    }
}

export const XSAnimated = new XSAnimatedImplementation();