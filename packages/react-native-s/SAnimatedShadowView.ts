import { SAnimatedProperty } from './SAnimatedProperty';

export class SAnimatedShadowView {
    readonly name: string;
    private readonly _opacity: SAnimatedProperty;
    private readonly _translateX: SAnimatedProperty;
    private readonly _translateY: SAnimatedProperty;
    private readonly _iosWidth: SAnimatedProperty;
    private readonly _iosHeight: SAnimatedProperty;

    get opacity() {
        return this._opacity.value;
    }
    set opacity(value: number) {
        this._opacity.value = value;
    }

    get translateX() {
        return this._translateX.value;
    }
    set translateX(value: number) {
        this._translateX.value = value;
    }

    get translateY() {
        return this._translateY.value;
    }
    set translateY(value: number) {
        this._translateY.value = value;
    }

    get iosWidth() {
        return this._iosWidth.value;
    }
    set iosWidth(value: number) {
        this._iosWidth.value = value;
    }

    get iosHeight() {
        return this._iosHeight.value;
    }
    set iosHeight(value: number) {
        this._iosHeight.value = value;
    }

    constructor(name: string, initial?: { opacity?: number, translateX?: number }) {
        this.name = name;
        this._opacity = new SAnimatedProperty(name, 'opacity', initial && initial.opacity !== undefined ? initial.opacity : 1);
        this._translateX = new SAnimatedProperty(name, 'translateX', initial && initial.translateX !== undefined ? initial.translateX : 0);
        this._translateY = new SAnimatedProperty(name, 'translateY', 0);
        this._iosWidth = new SAnimatedProperty(name, 'ios-width', 0);
        this._iosHeight = new SAnimatedProperty(name, 'ios-height', 0);
    }
}