export class SearchContext {
    value: string = '';
    readonly onChanged: () => void;
    headerOnChanged?: () => void;
    constructor(onChanged: () => void) {
        this.onChanged = onChanged;
    }
}