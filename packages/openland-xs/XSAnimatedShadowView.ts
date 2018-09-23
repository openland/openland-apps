import { XSAnimated } from './XSAnimated';
import { randomKey } from './utils/randomKey';

export class XSAnimatedShadowView {
    private key = randomKey();
    private mountedElement?: HTMLElement;

    private _translateX?: string | number;
    private _translateXPending?: string | number;
    private _translateY?: string | number;
    private _translateYPending?: string | number;
    private _opacity?: number;
    private _opacityPending?: number;

    private _isAnimating = false;

    constructor(initial?: { translateX?: string | number, translateY?: string | number, opacity?: number }) {
        if (initial && initial.translateX !== undefined) {
            this._translateX = initial.translateX;
            this._translateXPending = initial.translateX;
        }
        if (initial && initial.translateY !== undefined) {
            this._translateY = initial.translateY;
            this._translateYPending = initial.translateY;
        }
        if (initial && initial.opacity !== undefined) {
            this._opacity = initial.opacity;
            this._opacityPending = initial.opacity;
        }
    }

    get translateX() {
        return this._translateXPending;
    }
    set translateX(value: string | number | undefined) {
        this._translateXPending = value;
        if (this.mountedElement) {
            this._translateX = value;
        }
        this.handleChanged();
    }

    get translateY() {
        return this._translateYPending;
    }
    set translateY(value: string | number | undefined) {
        this._translateYPending = value;
        if (this.mountedElement) {
            this._translateY = value;
        }
        this.handleChanged();
    }

    get opacity() {
        return this._opacityPending;
    }
    set opacity(value: number | undefined) {
        this._opacityPending = value;
        if (this.mountedElement) {
            this._opacity = value;
        }
        this.handleChanged();
    }

    onPreMount = (element: HTMLElement) => {
        this.withoutAnimations(element, () => {
            this.applyValues(element, true);
        });
    }

    onMount = (element: HTMLElement) => {
        this.mountedElement = element;
        this.mountedElement.addEventListener('transitionend', this.handleTransitionEnd);
        this.handleTransitionStart();
        this.applyValues(element, false);
    }

    onUnmount = () => {
        this.mountedElement!!.removeEventListener('transitionend', this.handleTransitionEnd);
        this.mountedElement = undefined;
    }

    private handleChanged = () => {
        if (this.mountedElement) {
            if (XSAnimated.isAnimating) {
                this.handleTransitionStart();
                this.applyValues(this.mountedElement, false);
            } else {
                this.withoutAnimations(this.mountedElement, () => {
                    this.applyValues(this.mountedElement!!, false);
                });
            }
        }
    }

    private handleTransitionStart = () => {
        if (!this._isAnimating) {
            this._isAnimating = true;
            if (this.mountedElement!!) {
                (this.mountedElement!!.style as any).willChange = 'opacity,transform';
            }
        }
    }

    private handleTransitionEnd = () => {
        if (this._isAnimating) {
            this._isAnimating = false;
            if (this.mountedElement!!) {
                (this.mountedElement!!.style as any).willChange = null;
            }
        }
    }

    private applyValues(element: HTMLElement, premount: boolean) {
        let transform = '';

        let translateX = premount ? this._translateX : this._translateXPending;
        if (translateX !== undefined) {
            if (transform !== '') {
                transform += ',';
            }
            transform = 'translateX(' + translateX + ')';
        }

        let translateY = premount ? this._translateY : this._translateYPending;
        if (translateY !== undefined) {
            if (transform !== '') {
                transform += ',';
            }
            transform += 'translateY(' + translateY + ')';
        }

        if (transform !== '') {
            element.style.transform = transform;
        } else {
            element.style.transform = null;
        }

        let opacity = premount ? this._opacity : this._opacityPending;
        if (opacity !== undefined) {
            element.style.opacity = opacity + '';
        } else {
            element.style.opacity = null;
        }
    }

    private withoutAnimations(element: HTMLElement, callback: () => void) {
        let ex = element.style.transition;
        element.style.transition = null;
        callback();
        element.style.transition = ex;
    }
}