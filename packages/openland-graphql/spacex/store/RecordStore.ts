
export type RecordValueString = {
    type: 'string',
    value: string
};
export type RecordValueNumber = {
    type: 'number',
    value: number
};
export type RecordValueBoolean = {
    type: 'boolean',
    value: boolean
};
export type RecordValueNull = {
    type: 'null'
};
export type RecordValueReference = {
    type: 'reference',
    key: string
};

export type RecordValueList = {
    type: 'list',
    values: RecordValue[]
};

export type RecordValue =
    | RecordValueString
    | RecordValueNumber
    | RecordValueBoolean
    | RecordValueNull
    | RecordValueReference
    | RecordValueList;

export type Record = {
    key: string;
    fields: { [key: string]: RecordValue }
};

export type RecordSet = { [key: string]: Record };

export type ChangedRecord = { [key: string]: string };

function isRecordValueEquals(a: RecordValue, b: RecordValue) {
    if (a.type !== b.type) {
        return false;
    }

    if (a.type === 'number' && b.type === 'number') {
        return a.value === b.value;
    }
    if (a.type === 'boolean' && b.type === 'boolean') {
        return a.value === b.value;
    }
    if (a.type === 'string' && b.type === 'string') {
        return a.value === b.value;
    }
    if (a.type === 'null' && b.type === 'null') {
        return true;
    }
    if (a.type === 'reference' && b.type === 'reference') {
        return a.key === b.key;
    }
    if (a.type === 'list' && b.type === 'list') {
        let la = a.values;
        let lb = b.values;
        if (la.length !== lb.length) {
            return false;
        }
        for (let i = 0; i < la.length; i++) {
            if (!isRecordValueEquals(la[i], lb[i])) {
                return false;
            }
        }
        return true;
    }

    return true;
}

export class RecordStore {
    private inMemory: { [key: string]: Record } = {};

    //
    // Loading
    //

    isInMemory = (key: string) => {
        return !!this.inMemory[key];
    }

    loaded = (set: RecordSet) => {
        for (let k in set) {
            if (set.hasOwnProperty(k)) {
                this.loadedRecord(set[k]);
            }
        }
    }

    loadedRecord = (record: Record) => {
        if (!!this.inMemory[record.key]) {
            throw Error('Record ' + record.key + ' already loaded');
        }
        this.inMemory[record.key] = record;
    }

    //
    // Read
    //

    read = (key: string): Record => {
        if (!this.inMemory[key]) {
            throw Error('Record ' + key + ' not loaded yet');
        }
        return this.inMemory[key]!;
    }

    //
    // Merging
    //

    merge = (set: RecordSet): { [key: string]: ChangedRecord } => {
        let res: { [key: string]: ChangedRecord } = {};
        for (let k in set) {
            if (set.hasOwnProperty(k)) {
                this._merge(set[k], res);
            }
        }
        return res;
    }

    mergeRecord = (record: Record): { [key: string]: ChangedRecord } => {
        let res: { [key: string]: ChangedRecord } = {};
        this._merge(record, res);
        return res;
    }

    private _merge = (record: Record, changed: { [key: string]: ChangedRecord }) => {
        let fields: { [key: string]: RecordValue } = {};
        let changedFields: { [key: string]: string } = {};
        let ex = this.inMemory[record.key];
        if (ex) {
            for (let f in ex.fields) {
                if (ex.fields.hasOwnProperty(f)) {
                    fields[f] = ex.fields[f];
                }
            }
        }

        for (let f in record.fields) {
            if (record.fields.hasOwnProperty(f)) {
                let exf = ex ? ex.fields[f] : null;
                if (!exf || !isRecordValueEquals(exf, record.fields[f])) {
                    changedFields[f] = f;
                    fields[f] = record.fields[f];
                }
            }
        }

        if (Object.keys(changedFields).length > 0) {
            this.inMemory[record.key] = { key: record.key, fields };
            changed[record.key] = changedFields;
        }
    }
}