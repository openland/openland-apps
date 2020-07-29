import { SparseIndex, SparseIndexState } from './SparseIndex';
describe('SparseIndex', () => {
    it('should create window', () => {
        let index = new SparseIndex(SparseIndex.EMPTY);

        // Empty state
        let state: SparseIndexState = { windows: [] };
        expect(index.state).toMatchObject(state);

        // Initial apply
        index.apply({ min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] });
        state = { windows: [{ min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] }] };
        expect(index.state).toMatchObject(state);

        // Second separate window
        index.apply({ min: 1, max: 8, items: [{ id: '4', sortKey: 1 }, { id: '5', sortKey: 2 }, { id: '6', sortKey: 3 }] });
        state = {
            windows: [
                { min: 1, max: 8, items: [{ id: '4', sortKey: 1 }, { id: '5', sortKey: 2 }, { id: '6', sortKey: 3 }] },
                { min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] }]
        };
        expect(index.state).toMatchObject(state);

        // Merge two windows
        index.apply({ min: 8, max: 10, items: [{ id: '7', sortKey: 10 }] });
        state = {
            windows: [
                {
                    min: 1, max: 20,
                    items: [
                        { id: '4', sortKey: 1 },
                        { id: '5', sortKey: 2 },
                        { id: '6', sortKey: 3 },
                        { id: '7', sortKey: 10 },
                        { id: '1', sortKey: 11 },
                        { id: '2', sortKey: 12 },
                        { id: '3', sortKey: 13 }
                    ]
                }
            ]
        };
        expect(index.state).toMatchObject(state);
    });

    it('should merge windows', () => {
        let index = new SparseIndex(SparseIndex.EMPTY);

        // First segment
        index.apply({ min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] });

        // Second segment
        index.apply({ min: 100, max: 120, items: [{ id: '10', sortKey: 101 }, { id: '20', sortKey: 102 }, { id: '30', sortKey: 103 }] });

        // Third segment
        index.apply({ min: 25, max: 28, items: [{ id: '4', sortKey: 26 }, { id: '5', sortKey: 27 }, { id: '6', sortKey: 28 }] });

        // Forth segment
        index.apply({ min: 50, max: 60, items: [{ id: '40', sortKey: 55 }] });

        let state: SparseIndexState = {
            windows: [
                { min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] },
                { min: 25, max: 28, items: [{ id: '4', sortKey: 26 }, { id: '5', sortKey: 27 }, { id: '6', sortKey: 28 }] },
                { min: 50, max: 60, items: [{ id: '40', sortKey: 55 }] },
                { min: 100, max: 120, items: [{ id: '10', sortKey: 101 }, { id: '20', sortKey: 102 }, { id: '30', sortKey: 103 }] },
            ]
        };
        expect(index.state).toMatchObject(state);

        // Merge
        index.apply({ min: 25, max: 51, items: [{ id: '44', sortKey: 25 }, { id: '45', sortKey: 51 }] });

        state = {
            windows: [
                { min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] },
                { min: 25, max: 60, items: [{ id: '44', sortKey: 25 }, { id: '4', sortKey: 26 }, { id: '5', sortKey: 27 }, { id: '6', sortKey: 28 }, { id: '45', sortKey: 51 }, { id: '40', sortKey: 55 }] },
                { min: 100, max: 120, items: [{ id: '10', sortKey: 101 }, { id: '20', sortKey: 102 }, { id: '30', sortKey: 103 }] },
            ]
        };
        expect(index.state).toMatchObject(state);

        // Merge with empty items
        index.apply({ min: 1, max: 120, items: [] });
        state = {
            windows: [
                {
                    min: 1, max: 120, items: [
                        { id: '1', sortKey: 11 },
                        { id: '2', sortKey: 12 },
                        { id: '3', sortKey: 13 },
                        { id: '44', sortKey: 25 },
                        { id: '4', sortKey: 26 },
                        { id: '5', sortKey: 27 },
                        { id: '6', sortKey: 28 },
                        { id: '45', sortKey: 51 },
                        { id: '40', sortKey: 55 },
                        { id: '10', sortKey: 101 },
                        { id: '20', sortKey: 102 },
                        { id: '30', sortKey: 103 }
                    ]
                }
            ]
        };
        expect(index.state).toMatchObject(state);

        // Append
        index.apply({ min: SparseIndex.MIN, max: 11, items: [{ id: '33', sortKey: 0 }] });
        state = {
            windows: [
                {
                    min: SparseIndex.MIN,
                    max: 120,
                    items: [
                        { id: '33', sortKey: 0 },
                        { id: '1', sortKey: 11 },
                        { id: '2', sortKey: 12 },
                        { id: '3', sortKey: 13 },
                        { id: '44', sortKey: 25 },
                        { id: '4', sortKey: 26 },
                        { id: '5', sortKey: 27 },
                        { id: '6', sortKey: 28 },
                        { id: '45', sortKey: 51 },
                        { id: '40', sortKey: 55 },
                        { id: '10', sortKey: 101 },
                        { id: '20', sortKey: 102 },
                        { id: '30', sortKey: 103 }
                    ]
                }
            ]
        };
        expect(index.state).toMatchObject(state);
    });

    it('should read consistently', () => {
        let index = new SparseIndex(SparseIndex.EMPTY);
        index.apply({ min: 10, max: 20, items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }] });
        index.apply({ min: 25, max: 28, items: [{ id: '4', sortKey: 26 }, { id: '5', sortKey: 27 }, { id: '6', sortKey: 28 }] });
        index.apply({ min: 50, max: 60, items: [{ id: '40', sortKey: 55 }] });
        index.apply({ min: 100, max: 120, items: [{ id: '10', sortKey: 101 }, { id: '20', sortKey: 102 }, { id: '30', sortKey: 103 }] });
        index.apply({ min: 200, max: SparseIndex.MAX, items: [{ id: '50', sortKey: 201 }, { id: '51', sortKey: 202 }, { id: '52', sortKey: 203 }] });

        // Forward cases
        let read = index.readAfter({ after: 11, limit: 1 });
        expect(read).toMatchObject({ items: [{ id: '2', sortKey: 12 }], completed: false });

        read = index.readAfter({ after: 11, limit: 2 });
        expect(read).toMatchObject({ items: [{ id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }], completed: false });

        read = index.readAfter({ after: 11, limit: 3 });
        expect(read).toMatchObject({ items: [{ id: '2', sortKey: 12 }, { id: '3', sortKey: 13 }], completed: false });

        read = index.readAfter({ after: 22, limit: 10 });
        expect(read).toBeNull();

        read = index.readAfter({ after: 200, limit: 2 });
        expect(read).toMatchObject({ items: [{ id: '50', sortKey: 201 }, { id: '51', sortKey: 202 }], completed: false });

        read = index.readAfter({ after: 200, limit: 3 });
        expect(read).toMatchObject({ items: [{ id: '50', sortKey: 201 }, { id: '51', sortKey: 202 }, { id: '52', sortKey: 203 }], completed: true });

        // Backward cases
        read = index.readBefore({ before: 13, limit: 1 });
        expect(read).toMatchObject({ items: [{ id: '2', sortKey: 12 }], completed: false });

        read = index.readBefore({ before: 13, limit: 2 });
        expect(read).toMatchObject({ items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }], completed: false });

        read = index.readBefore({ before: 13, limit: 3 });
        expect(read).toMatchObject({ items: [{ id: '1', sortKey: 11 }, { id: '2', sortKey: 12 }], completed: false });

        read = index.readBefore({ before: 22, limit: 10 });
        expect(read).toBeNull();
    });
});