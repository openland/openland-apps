
//
// Pairing Heap implementation
// https://en.wikipedia.org/wiki/Pairing_heap
//

type Tree<T> = { element: { value: T, key: number }, subheaps: Tree<T>[] };
type Heap<T> = null | Tree<T>;

export class PairingHeap<T> {
    private _root: Heap<T> = null;
    private _count: number = 0;

    get count() {
        return this._count;
    }

    pop = () => {
        if (this._root === null) {
            return undefined;
        }
        let result = this._root.element.value;
        this.deleteMin();
        return result;
    }

    push = (value: T, key: number) => {
        this._root = this._meld({ element: { value, key }, subheaps: [] }, this._root);
        this._count++;
    }

    findMin = () => {
        if (this._root === null) {
            return undefined;
        } else {
            return this._root.element;
        }
    }

    deleteMin = () => {
        if (this._root === null) {
            throw Error('Heap is empty');
        }
        this._root = this._mergePairs(this._root.subheaps);
        this._count--;
    }

    private _meld = (heap1: Heap<T>, heap2: Heap<T>): Heap<T> => {
        if (heap1 === null) {
            return heap2;
        }
        if (heap2 === null) {
            return heap1;
        }
        if (heap1.element.key < heap2.element.key) {
            return { element: heap1.element, subheaps: [heap2, ...heap1.subheaps] };
        } else {
            return { element: heap2.element, subheaps: [heap1, ...heap2.subheaps] };
        }
    }

    private _mergePairs(list: Tree<T>[]): Heap<T> {
        if (list.length === 0) {
            return null;
        }
        if (list.length === 1) {
            return list[0];
        }
        return this._meld(this._meld(list[0], list[1]), this._mergePairs(list.slice(2)));
    }
}