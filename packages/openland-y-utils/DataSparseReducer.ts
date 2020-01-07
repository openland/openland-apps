import { WINDOW_START, WINDOW_END } from './DataSparseSourse';

export interface DataSparseReducerState {
    windows: { [key: number]: string[] };
    itemWindow: { [key: string]: number };
    allLoaded: boolean;
}

export type DataSparseReducerAction =
    | {
        type: 'loaded';
        direction: 'backward' | 'forward';
        window: number;
        items: string[];
        needMore: boolean;
    };

export function createEmptyDataSparseState(): DataSparseReducerState {
    return { windows: {}, itemWindow: {}, allLoaded: false };
}

export function reduceDataSparseState(state: DataSparseReducerState, action: DataSparseReducerAction): DataSparseReducerState {

    if (action.type === 'loaded') {

        if (state.allLoaded) {
            throw Error('Unable to load more already loaded list');
        }

        // First we search for window merge candidates
        let knownWindows = new Set<number>();
        knownWindows.add(action.window);
        for (let i of action.items) {
            let exw = state.itemWindow[i];
            if (exw !== undefined) {
                knownWindows.add(exw);
            }
        }

        if (knownWindows.size <= 1) {
            // Expand provided window

            // Item Window Associations
            let itemWindow = { ...state.itemWindow };
            for (let i of action.items) {
                itemWindow[i] = action.window;
            }

            // Window lists
            let windows = { ...state.windows };
            if (windows[action.window] === undefined) {
                windows[action.window] = [];
            }
            if (action.direction === 'backward') {
                if (action.window === WINDOW_END) {
                    throw Error('Unable to perform backward loading for end window');
                } else {
                    windows[action.window] = [...windows[action.window], ...action.items];
                }
            } else if (action.direction === 'forward') {
                if (action.window === WINDOW_START) {
                    throw Error('Unable to perform forward loading for start window');
                } else {
                    windows[action.window] = [...action.items, ...windows[action.window]];
                }
            }

            // Mark as all loaded
            let allLoaded: boolean = state.allLoaded;
            if (action.window === WINDOW_START && !action.needMore) {
                allLoaded = true;
            }

            return {
                itemWindow,
                windows,
                allLoaded
            };

        } else {
            //
            // Use minimum window id as target window for merging
            //  - We use "-2" id for start window and this rule 
            //    will merge eventually everything to start window.
            //
            let target = action.window;
            for (let k of knownWindows) {
                target = Math.min(k, target);
            }

            // Item Window Associations
            let itemWindow = { ...state.itemWindow };
            for (let k of knownWindows) {
                if (k !== target && state.windows[k]) {
                    for (let i of state.windows[k]) {
                        itemWindow[i] = target;
                    }
                }
            }
            for (let i of action.items) {
                itemWindow[i] = target;
            }

            // How to merge windows is not obvious:
            // two windows before merge could have items in different order, ex:
            // 1) a, b, c, d
            // 2) e, d, f, g
            // For simplicity once we found item from another window we are merging whole window in place 
            // and marking this window as merged

            let windowItems = state.windows[target];
            let merged = new Set<number>();
            if (action.direction === 'backward') {
                for (let i of action.items) {
                    let tw = state.itemWindow[i];
                    if (tw === undefined) {
                        tw = action.window;
                    }
                    if (tw === target) {
                        windowItems.push(i);
                    } else {
                        if (merged.has(tw)) {
                            continue;
                        }
                        merged.add(tw);
                        for (let i2 of state.windows[tw]) {
                            windowItems.push(i2);
                        }
                    }
                }
            } else {
                throw Error('Not implemented');
            }

            let windows = { ...state.windows };
            windows[target] = windowItems;

            for (let w of merged) {
                if (w !== target) {
                    delete windows[w];
                }
            }

            let allLoaded: boolean = state.allLoaded;
            if (action.window === WINDOW_START && !action.needMore) {
                allLoaded = true;
            }

            return {
                itemWindow,
                windows,
                allLoaded
            };
        }
    }

    throw Error('Not implemented');
}

// export class DataSparseSourceState<T> {
//     private readonly windows = new Map<number, string[]>();
//     private readonly itemWindow = new Map<string, number>();

//     mergeLoadedMore = (window: number, needMore: boolean, src: string[]) => {

//         // First we search for window merge candidates
//         let knownWindows = new Set<number>();
//         for (let i of src) {
//             let exw = this.itemWindow.get(i);
//             if (exw !== undefined) {
//                 if (exw !== window) {
//                     knownWindows.add(exw);
//                 }
//             }
//         }

//         if (knownWindows.size === 0) {
//             // Expand provided window
//         } else {
//             //
//             // Use minimum window id as target window for merging
//             //  - We use "-2" id for start window and this rule 
//             //    will merge eventually everything to start window.
//             //
//             let target = window;
//             for (let k of knownWindows) {
//                 target = Math.min(k, target);
//             }

//             //
//         }

//         // Mark as all loaded
//         if (window === WINDOW_START && !needMore) {
//             this.allLoaded = true;
//         }
//     }
// }