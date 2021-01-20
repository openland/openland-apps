import { DialogState } from './../../dialogs/DialogState';
import { sortedArrayAdd, sortedArrayAddIndex } from './sortedArrayAdd';
import { sortedArrayFind } from './sortedArrayFind';

export class SortedArray<T> {

    static create<T>(comparator: (a: T, b: T) => number) {
        return new SortedArray(comparator);
    }

    static numbers = SortedArray.create((a: number, b: number) => a - b);
    static dialogs = SortedArray.create((a: DialogState, b: DialogState) => {
        // NOTE: Order is reversed
        if (a.sortKey! < b.sortKey!) {
            return 1;
        } else if (a.sortKey! > b.sortKey!) {
            return -1;
        } else {
            return a.key.localeCompare(b.key);
        }
    });
    static dialogsIndex = SortedArray.create((a: { key: string, sortKey: number }, b: { key: string, sortKey: number }) => {
        // NOTE: Order is reversed
        if (a.sortKey < b.sortKey) {
            return 1;
        } else if (a.sortKey > b.sortKey) {
            return -1;
        } else {
            return a.key.localeCompare(b.key);
        }
    });

    private readonly comparator: (a: T, b: T) => number;

    private constructor(comparator: (a: T, b: T) => number) {
        this.comparator = comparator;
    }

    remove(src: T[], value: T): T[] {
        return src.filter((v) => this.comparator(v, value) !== 0); // TODO: Make faster?
    }

    add(src: T[], value: T): T[] {
        return sortedArrayAdd(src, value, this.comparator);
    }

    addIndex(src: T[], value: T): number {
        return sortedArrayAddIndex(src, value, this.comparator);
    }

    find(src: T[], value: T): number {
        return sortedArrayFind(src, value, this.comparator);
    }
}