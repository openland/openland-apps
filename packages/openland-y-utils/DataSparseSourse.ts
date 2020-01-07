import { backoff } from 'openland-y-utils/timer';

export type SparseLoader<T> = (before?: string, after?: string) => Promise<{ needMore: boolean, items: T[] }>;
export type KeyExtractor<T> = (item: T) => string;

export const WINDOW_START = -2;
export const WINDOW_END = -1;

export class DataSparseSource<T> {
    private readonly loader: SparseLoader<T>;
    private readonly keyExtractor: KeyExtractor<T>;

    private readonly windows = new Map<number, string[]>();
    private readonly itemWindow = new Map<string, number>();

    private allLoaded = false;
    private startLoaded = false;
    private startLoading = false;

    constructor(loader: SparseLoader<T>, keyExtractor: KeyExtractor<T>) {
        this.loader = loader;
        this.keyExtractor = keyExtractor;
    }

    createWindow = () => {
        if (!this.startLoaded && !this.startLoading) {
            this.startLoading = true;
            (async () => {
                let loaded = await backoff(async () => await this.loader());
                this.mergeLoadedMore(WINDOW_START, loaded.needMore, loaded.items);
            })();
        }
        // TODO: Return Window
    }

    createWindowFromKey = (key: string) => {
        //
    }

    private mergeLoadedMore = (window: number, needMore: boolean, src: T[]) => {

        // First we search for window merge candidates
        let knownWindows = new Set<number>();
        for (let i of src) {
            let key = this.keyExtractor(i);
            let exw = this.itemWindow.get(key);
            if (exw !== undefined) {
                if (exw !== window) {
                    knownWindows.add(exw);
                }
            }
        }

        if (knownWindows.size === 0) {
            // Expand provided window
        } else {
            //
            // Use minimum window id as target window for merging
            //  - We use "-2" id for start window and this rule 
            //    will merge eventually everything to start window.
            //
            let target = window;
            for (let k of knownWindows) {
                target = Math.min(k, target);
            }

            //
        }

        // Mark as all loaded
        if (window === WINDOW_START && !needMore) {
            this.allLoaded = true;
        }
    }

    // append = async (items: T[]) => {
    //     //
    // }

    // update = async (item: T) => {
    //     //
    // }

    // remove = async (key: string) => {
    //     //
    // }
}