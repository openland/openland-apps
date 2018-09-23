import { XSAnimated } from './XSAnimated';

export class XSAnimatedShadowView {
    private mountedElement?: HTMLElement;
    private _translateX?: string | number;
    private _translateXPending?: string | number;

    constructor(initial?: { translateX?: string | number }) {
        if (initial && initial.translateX !== undefined) {
            this._translateX = initial.translateX;
            this._translateXPending = initial.translateX;
        }
    }

    get translateX() {
        return this._translateXPending;
    }
    set translateX(value: string | number | undefined) {
        this._translateXPending = value;
        if (this.mountedElement) {
            this._translateX = value;
            if (XSAnimated.isAnimating) {
                this.applyValues(this.mountedElement, false);
            } else {
                this.withoutAnimations(this.mountedElement, () => {
                    this.applyValues(this.mountedElement!!, false);
                });
            }
        }
        // } else {
        //     this._translateX = value;
        //     if (this.mountedElement) {
        //         if (this._translateX) {
        //             this.mountedElement.style.transform = 'translateX(' + this._translateX + ')';
        //         } else {
        //             this.mountedElement.style.transform = null;
        //         }
        //     }
        // }
    }

    onPreMount = (element: HTMLElement) => {
        this.withoutAnimations(element, () => {
            this.applyValues(element, true);
        });
    }

    onMount = (element: HTMLElement) => {
        this.mountedElement = element;
        this.mountedElement.addEventListener('transitionend', this.handleTransitionEnd);
        this.applyValues(element, false);
    }

    onUnmount = () => {
        this.mountedElement!!.removeEventListener('transitionend', this.handleTransitionEnd);
        this.mountedElement = undefined;
    }

    private handleTransitionEnd = () => {
        console.log('transitionend');
    }

    private applyValues(element: HTMLElement, premount: boolean) {
        let translateX = premount ? this._translateX : this._translateXPending;
        if (translateX) {
            element.style.transform = 'translateX(' + translateX + ')';
        } else {
            element.style.transform = null;
        }
    }

    private withoutAnimations(element: HTMLElement, callback: () => void) {
        let ex = element.style.transition;
        element.style.transition = null;
        callback();
        element.style.transition = ex;
    }
}