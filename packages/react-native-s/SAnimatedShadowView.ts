import { SAnimatedProperty } from './SAnimatedProperty';

export class SAnimatedShadowView {
    readonly name: string;
    readonly opacity: SAnimatedProperty;
    readonly translateX: SAnimatedProperty;
    readonly translateY: SAnimatedProperty;
    
    constructor(name: string) {
        this.name = name;
        this.opacity = new SAnimatedProperty(name, 'opacity', 0);
        this.translateX = new SAnimatedProperty(name, 'translateX', 0);
        this.translateY = new SAnimatedProperty(name, 'translateY', 0);
    }
}