type Item = { id: string, sortKey: number };
type Window = { min: number, max: number, items: Item[] };

/**
 * Check if point is within interval
 */
function pointInInterval(min: number, max: number, point: number) {
    return min <= point && point <= max;
}

/**
 * Check if integer interval intersects
 */
function intersects(min1: number, max1: number, min2: number, max2: number) {
    if (pointInInterval(min1, max1, min2)) {
        return true;
    }
    if (pointInInterval(min1, max1, max2)) {
        return true;
    }
    if (pointInInterval(min2, max2, min1)) {
        return true;
    }
    if (pointInInterval(min2, max2, max1)) {
        return true;
    }
    return false;
}

export type SparseIndexState = {
    windows: {
        min: number,
        max: number,
        items: { id: string, sortKey: number }[]
    }[]
};

export class SparseIndex {
    static readonly MIN = Number.MIN_SAFE_INTEGER;
    static readonly MAX = Number.MAX_SAFE_INTEGER;
    static readonly EMPTY: SparseIndexState = { windows: [] };

    private _windows: Window[];
    private _ids = new Map<string, number>();
    private _sortKey = new Map<number, string>();

    constructor(state: SparseIndexState) {

        // Process items
        for (let w of state.windows) {
            for (let i of w.items) {
                if (i.sortKey < w.min || w.max < i.sortKey) {
                    throw Error('Broken index');
                }
                if (this._ids.has(i.id)) {
                    throw Error('id ' + i.id + ' already exists');
                }
                if (this._sortKey.has(i.sortKey)) {
                    throw Error('sortKey ' + i.sortKey + ' already exists');
                }
                this._ids.set(i.id, i.sortKey);
                this._sortKey.set(i.sortKey, i.id);
            }
        }

        // Process windows
        this._windows = state.windows.map((v) => ({
            min: v.min,
            max: v.max,
            items: v.items.map((i) => ({ id: i.id, sortKey: i.sortKey }))
        }));
    }

    get state(): SparseIndexState {
        return {
            windows: this._windows.map((v) => ({
                min: v.min,
                max: v.max,
                items: v.items.map((i) => ({ id: i.id, sortKey: i.sortKey }))
            }))
        };
    }

    getIdBySortKey = (sortKey: number) => {
        let res = this._sortKey.get(sortKey);
        if (res) {
            return res;
        } else {
            return null;
        }
    }

    isInIndex = (id: string) => {
        return this._ids.has(id);
    }

    delete = (ids: string[]) => {
        for (let id of ids) {
            let sortKey = this._ids.get(id);
            if (sortKey === undefined) {
                throw Error('Unable to find item ' + id);
            }

            let w = this._windows.find((v) => pointInInterval(v.min, v.max, sortKey!));
            if (!w) {
                throw Error('Internal error');
            }

            // Remove item from window
            w.items = w.items.filter((v) => v.id !== id);

            // Remove id references
            this._ids.delete(id);
            this._sortKey.delete(sortKey);
        }
    }

    apply = (args: { min: number, max: number, items: { id: string, sortKey: number }[] }) => {

        // Chek inputs
        if (!Number.isSafeInteger(args.min)) {
            throw Error('Invalid arguments');
        }
        if (!Number.isSafeInteger(args.max)) {
            throw Error('Invalid arguments');
        }
        for (let i = 0; i < args.items.length; i++) {
            let itm = args.items[i];

            // Check sort key
            if (!Number.isSafeInteger(itm.sortKey)) {
                throw Error('Invalid arguments');
            }
            if (itm.sortKey > args.max) {
                throw Error('Invalid arguments');
            }
            if (itm.sortKey < args.min) {
                throw Error('Invalid arguments');
            }

            // Chek unique values
            if (this._ids.has(itm.id)) {
                throw Error('Invalid arguments');
            }
            if (this._sortKey.has(itm.sortKey)) {
                throw Error('Invalid arguments');
            }

            // Chech monotonic order
            if (i > 0) {
                if (itm.sortKey < args.items[i - 1].sortKey) {
                    throw Error('Invalid arguments');
                }
            }
        }

        // Persist item ids
        for (let i of args.items) {
            this._ids.set(i.id, i.sortKey);
            this._sortKey.set(i.sortKey, i.id);
        }

        // Find windows
        let prev: Window[] = [];
        let intersected: Window[] = [];
        let post: Window[] = [];
        for (let w of this._windows) {
            if (intersects(w.min, w.max, args.min, args.max)) {
                intersected.push(w);
            } else {
                if (w.max < args.min) {
                    prev.push(w);
                } else {
                    post.push(w);
                }
            }
        }

        // Merge loaded
        if (intersected.length > 0) {
            // Merge and sort items
            let items: Item[] = [];
            for (let i of args.items) {
                items.push(i);
            }
            for (let iw of intersected) {
                for (let i of iw.items) {
                    items.push(i);
                }
            }
            items.sort((a, b) => a.sortKey - b.sortKey);

            let w: Window = { min: Math.min(args.min, intersected[0].min), max: Math.max(args.max, intersected[intersected.length - 1].max), items };
            this._windows = [...prev, w, ...post];
        } else {
            let w: Window = { min: args.min, max: args.max, items: args.items };
            this._windows = [...prev, w, ...post];
        }
    }

    readAfter = (args: { after: number, limit: number }) => {
        let window = this._windows.find((v) => v.min <= args.after && args.after <= v.max);
        if (!window) {
            return null;
        }

        // Find all items
        let res: { id: string, sortKey: number }[] = [];
        let totalCount = 0;
        for (let i of window.items) {
            if (i.sortKey > args.after) {
                if (res.length < args.limit) {
                    res.push({ id: i.id, sortKey: i.sortKey });
                }
                totalCount++;
            }
        }

        if (res.length < args.limit) {
            // If less than limit then it could be completed only for last window
            return {
                items: res,
                completed: window.max === Number.MAX_SAFE_INTEGER
            };
        } else {
            if (res.length < totalCount) {
                // If there is more items in current window = mask as not-completed
                return {
                    items: res,
                    completed: false
                };
            } else {
                // If read all items and last window then mark as completed
                return {
                    items: res,
                    completed: window.max === Number.MAX_SAFE_INTEGER
                };
            }
        }
    }

    readBefore = (args: { before: number, limit: number }) => {
        let window = this._windows.find((v) => v.min <= args.before && args.before <= v.max);
        if (!window) {
            return null;
        }

        // Find all items
        let res: { id: string, sortKey: number }[] = [];
        let totalCount = 0;
        for (let i = window.items.length - 1; i >= 0; i--) {
            let itm = window.items[i];
            if (itm.sortKey < args.before) {
                if (res.length < args.limit) {
                    res.unshift({ id: itm.id, sortKey: itm.sortKey });
                }
                totalCount++;
            }
        }

        if (res.length < args.limit) {
            // If less than limit then it could be completed only for last window
            return {
                items: res,
                completed: window.min === Number.MIN_SAFE_INTEGER
            };
        } else {
            if (res.length < totalCount) {
                // If there is more items in current window = mask as not-completed
                return {
                    items: res,
                    completed: false
                };
            } else {
                // If read all items and last window then mark as completed
                return {
                    items: res,
                    completed: window.min === Number.MIN_SAFE_INTEGER
                };
            }
        }
    }
}