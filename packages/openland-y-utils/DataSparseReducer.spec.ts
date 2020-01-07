import { WINDOW_START } from './DataSparseSourse';
import { createEmptyDataSparseState, reduceDataSparseState, DataSparseReducerState } from './DataSparseReducer';

function expectWindows(state: DataSparseReducerState, loaded: boolean, windows: { [key: number]: string[] }) {
    expect(Object.keys(state.windows)).toEqual(Object.keys(windows));
    expect(state.allLoaded).toBe(loaded);
}

describe('DataSparceSource', () => {
    it('should load data', () => {
        let state = createEmptyDataSparseState();
        expectWindows(state, false, {});

        // Loading initial first batch
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: WINDOW_START,
            items: ['1', '2', '3'],
            needMore: true
        });
        expectWindows(state, false, {
            [WINDOW_START]: ['1', '2', '3']
        });

        // Loading completed
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: WINDOW_START,
            items: ['4'],
            needMore: false
        });
        expectWindows(state, true, {
            [WINDOW_START]: ['1', '2', '3', '4']
        });

        // Expect to throw error on next loading events
        expect(() => reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: 0,
            items: ['10', '11', '12'],
            needMore: true
        })).toThrowError('Unable to load more already loaded list');
    });

    it('should create windows', () => {
        let state = createEmptyDataSparseState();
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: WINDOW_START,
            items: ['1', '2', '3'],
            needMore: true
        });

        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: 0,
            items: ['10', '11', '12'],
            needMore: true
        });

        expectWindows(state, false, {
            [WINDOW_START]: ['1', '2', '3'],
            [0]: ['10', '11', '12']
        });
    });

    it('should merge windows', () => {
        let state = createEmptyDataSparseState();
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: WINDOW_START,
            items: ['1', '2', '3'],
            needMore: true
        });
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: 0,
            items: ['10', '11', '12'],
            needMore: true
        });
        state = reduceDataSparseState(state, {
            type: 'loaded',
            direction: 'backward',
            window: WINDOW_START,
            items: ['4', '5', '10'],
            needMore: true
        });
        expectWindows(state, false, {
            [WINDOW_START]: ['1', '2', '3', '4', '5', '10', '11', '12'],
        });
    });
});