import { DataSparseSource } from './DataSparseSource';

function createDataSource() {
    return new DataSparseSource<{ key: string, seq: number }>({
        key: (i) => i.key,
        seq: (i) => i.seq
    });
}

describe('DataSparseSource', () => {
    it('should append and prepend new items', () => {
        let ds = createDataSource();
        ds.mutator.append({ key: '1', seq: DataSparseSource.UNKNOWN });
        ds.mutator.append({ key: '2', seq: 1 });
        ds.mutator.append({ key: '3', seq: 2 });
        ds.mutator.append({ key: '4', seq: 3 });
        expect(ds.dump()).toMatchSnapshot();

        ds.mutator.prepend({ key: '5', seq: DataSparseSource.UNKNOWN });
        ds.mutator.prepend({ key: '6', seq: -1 });
        ds.mutator.prepend({ key: '7', seq: -2 });
        ds.mutator.prepend({ key: '8', seq: -3 });
        expect(ds.dump()).toMatchSnapshot();

        // Weird input should lead to merging
        ds.mutator.append({ key: '9', seq: -4 });
        expect(ds.dump()).toMatchSnapshot();

        expect(() => ds.mutator.append({ key: '4', seq: 3 })).toThrowError('Item 4 already exists');
        expect(() => ds.mutator.prepend({ key: '4', seq: 3 })).toThrowError('Item 4 already exists');
    });

    it('should merge prepend new items', () => {
        let ds = createDataSource();
        ds.mutator.append({ key: '1', seq: DataSparseSource.UNKNOWN });
        ds.mutator.append({ key: '2', seq: 1 });
        ds.mutator.append({ key: '3', seq: 2 });
        ds.mutator.append({ key: '4', seq: 3 });
        expect(ds.dump()).toMatchSnapshot();

        ds.mutator.prepend({ key: '5', seq: DataSparseSource.UNKNOWN });
        ds.mutator.prepend({ key: '6', seq: -1 });
        ds.mutator.prepend({ key: '7', seq: -2 });
        ds.mutator.prepend({ key: '8', seq: -3 });
        expect(ds.dump()).toMatchSnapshot();

        // Weird input should lead to merging
        ds.mutator.prepend({ key: '9', seq: 4 });
        expect(ds.dump()).toMatchSnapshot();
    });
});