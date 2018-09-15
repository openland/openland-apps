import { SAnimatedPropertyName, SAnimated } from './SAnimated';

export class SAnimatedProperty {
    readonly name: string;
    readonly property: SAnimatedPropertyName;
    private _value: number;

    get value(): number {
        return this._value;
    }
    set value(newValue: number) {
        if (newValue !== this._value) {
            let oldValue = this._value;
            this._value = newValue;
            SAnimated.onPropertyChanged(this, oldValue);
        }
    }

    constructor(name: string, property: SAnimatedPropertyName, value: number) {
        this.name = name;
        this.property = property;
        this._value = value;
    }
}