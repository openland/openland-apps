export type KeyExtractor<T> = (item: T) => string;
export type SeqExtractor<T> = (item: T) => number;

function isUnknown(v: number) {
    return Number.isNaN(v);
}

interface Mutator<T> {
    prepend(item: T): void;
    append(item: T): void;
    // loaded(items: T[],beginEnded: ): void;
}

export class DataSparseSource<T> {
    static readonly UNKNOWN = Number.NaN;

    readonly keyExtractor: KeyExtractor<T>;
    readonly seqExtractor: SeqExtractor<T>;
    readonly mutator: Mutator<T>;

    //
    // Numbering of elements is in ascending order:
    // 
    // | 1 <- first/begin
    // | 2
    // | 3 <- firstWindowCursor
    // | <empty>
    // ....
    // | <empty>
    // | 1234 <- lastWindowCursor
    // | 1235
    // | 1236 <- last/end
    //

    // Maximum id in first window
    private _completed = false;
    private _firstWindowCursor: number = DataSparseSource.UNKNOWN;
    private _firstWindow: T[] = [];
    // Minimum id in last window
    private _lastWindowCursor: number = DataSparseSource.UNKNOWN;
    private _lastWindow: T[] = [];
    // All windows except first and last one
    private _windows: { start: number, end: number, items: T[] }[] = [];
    // All items
    private _items = new Map<string, { item: T, deleted: boolean }>();

    constructor(extractors: { key: KeyExtractor<T>, seq: SeqExtractor<T> }) {
        this.keyExtractor = extractors.key;
        this.seqExtractor = extractors.seq;
        this.mutator = {
            prepend: this._prepend,
            append: this._append
        };
    }

    //
    // Mutations
    //

    private _append = (item: T): void => {
        let seq = this.seqExtractor(item);
        let key = this.keyExtractor(item);

        // Internal key value store
        if (this._items.has(key)) {
            throw Error('Item ' + key + ' already exists');
        }
        this._items.set(key, { item: item, deleted: false });

        // Check if merging required
        if (!this._completed && !isUnknown(seq)) {
            // If seq is known we should check for merge
            if ((isUnknown(this._lastWindowCursor) || seq < this._lastWindowCursor)) {
                this._lastWindowCursor = seq;
                // If lastWindowCursor is unknown or seq is bigger then we should check for merge

                if (!isUnknown(this._firstWindowCursor) && seq <= this._firstWindowCursor) {
                    // seq is smaller than first window seq - merge needed
                    this._lastWindow = [...this._firstWindow, ...this._lastWindow];
                    this._completed = true;
                }
            }
        }

        // Append item
        this._lastWindow.push(item);
    }

    private _prepend = (item: T): void => {
        let seq = this.seqExtractor(item);
        let key = this.keyExtractor(item);

        // Internal key value store
        if (this._items.has(key)) {
            throw Error('Item ' + key + ' already exists');
        }
        this._items.set(key, { item: item, deleted: false });

        // Check if merging required
        if (!this._completed && !isUnknown(seq)) {
            // If seq is known we should check for merge
            if ((isUnknown(this._firstWindowCursor) || this._firstWindowCursor < seq)) {
                this._firstWindowCursor = seq;
                // If _firstWindowCursor is unknown or seq is smaller then we should check for merge

                if (!isUnknown(this._lastWindowCursor) && this._lastWindowCursor <= seq) {
                    // seq is smaller than first window seq - merge needed
                    this._lastWindow = [...this._firstWindow, ...this._lastWindow];
                    this._completed = true;
                }
            }
        }

        // Append item
        if (this._completed) {
            this._lastWindow.unshift(item);
        } else {
            this._firstWindow.unshift(item);
        }
    }

    //
    // Dump
    //

    dump = () => {
        if (this._completed) {
            return {
                last: {
                    items: [...this._lastWindow]
                }
            };
        }
        let res: any = {};
        if (this._firstWindow.length > 0) {
            res.first = {
                end: this._firstWindowCursor,
                items: [...this._firstWindow]
            };
        }
        if (this._windows.length !== 0) {
            res.windows = [];
            for (let w of this._windows) {
                res.windows.push({
                    start: w.start,
                    end: w.end,
                    items: [...w.items]
                });
            }
        }
        if (this._lastWindow.length > 0) {
            res.last = {
                start: this._lastWindowCursor,
                items: [...this._lastWindow]
            };
        }
        return res;
    }
}