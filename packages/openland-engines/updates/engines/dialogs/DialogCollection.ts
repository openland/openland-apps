import { SortedArray } from './../counters/utils/SortedArray';
import { defaultQualifier } from './qualifiers';
import { DialogState } from './DialogState';
import { DialogQualifier } from './DialogQualifier';

export class DialogCollection {
    readonly qualifier: DialogQualifier;

    state: DialogState[] = [];

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

    //
    // Handler
    //

    private _doAdd(src: DialogState) {
        this.state = SortedArray.dialogs.add(this.state, src);
    }

    private _doRemove(src: DialogState) {
        this.state = SortedArray.dialogs.remove(this.state, src);
    }

    private _doUpdate(old: DialogState, updated: DialogState) {
        this.state = SortedArray.dialogs.add(SortedArray.dialogs.remove(this.state, old), updated);
    }
}