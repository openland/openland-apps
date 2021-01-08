import { DataSource } from 'openland-y-utils/DataSource';
import { SortedArray } from './../counters/utils/SortedArray';
import { defaultQualifier } from './qualifiers';
import { DialogState } from './DialogState';
import { DialogQualifier } from './DialogQualifier';

export class DialogCollection {
    readonly qualifier: DialogQualifier;

    state: DialogState[] = [];
    source: DataSource<DialogState> = new DataSource(() => {/* Nothing to do */ });
    private inited = false;

    constructor(qualifier: DialogQualifier) {
        this.qualifier = (src) => defaultQualifier(src) && qualifier(src);
    }

    onDialogAdded(src: DialogState) {
        if (this.qualifier(src)) {
            this._doAdd(src);
        }
    }

    onDialogRemoved(src: DialogState) {
        if (this.qualifier(src)) {
            this._doRemove(src);
        }
    }

    onDialogUpdated(old: DialogState, updated: DialogState) {
        let oldQualified = this.qualifier(old);
        let updatedQualified = this.qualifier(updated);
        if (oldQualified && updatedQualified) {
            this._doUpdate(old, updated);
        } else if (!oldQualified && updatedQualified) {
            this._doAdd(updated);
        } else if (oldQualified && !updatedQualified) {
            this._doRemove(old);
        }
    }

    onDialogsLoaded() {
        this.inited = true;
        this.source.initialize(this.state, true, true);
    }

    //
    // Handler
    //

    private _doAdd(src: DialogState) {
        let index = SortedArray.dialogs.addIndex(this.state, src);

        // Update state and source
        if (this.inited) {
            this.source.addItem(src, index);
        }
        this.state = SortedArray.dialogs.add(this.state, src);
    }

    private _doRemove(src: DialogState) {
        let index = SortedArray.dialogs.find(this.state, src);

        // Update state and source
        if (this.inited) {
            this.source.removeItem(this.state[index].key);
        }
        this.state = SortedArray.dialogs.remove(this.state, src);
    }

    private _doUpdate(old: DialogState, updated: DialogState) {
        let oldIndex = SortedArray.dialogs.find(this.state, old);
        this.state = SortedArray.dialogs.add(SortedArray.dialogs.remove(this.state, old), updated);
        let toIndex = SortedArray.dialogs.find(this.state, updated);

        // Update source
        if (this.inited) {
            this.source.updateItem(updated);
            if (oldIndex !== toIndex) {
                this.source.moveItem(old.key, toIndex);
            }
        }
    }
}