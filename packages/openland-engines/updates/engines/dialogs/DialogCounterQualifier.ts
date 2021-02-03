import { DialogQualifier } from './DialogQualifier';
import { DialogState } from './DialogState';

export type DialogCounterQualifier = (src: DialogState) => number;

export function createCounterQualifier(kind: 'all' | 'unread' | 'unread-distinct' | 'mentions' | 'mentions-distinct', source: DialogQualifier): DialogCounterQualifier {
    return (src: DialogState) => {
        if (kind === 'all') {
            if (source(src)) {
                return 1;
            } else {
                return 0;
            }
        } else if (kind === 'unread') {
            if (source(src)) {
                return src.counter;
            } else {
                return 0;
            }
        } else if (kind === 'unread-distinct') {
            if (source(src)) {
                if (src.counter > 0) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        } else if (kind === 'mentions') {
            if (source(src)) {
                return src.mentions;
            } else {
                return 0;
            }
        } else if (kind === 'mentions-distinct') {
            if (source(src)) {
                if (src.mentions > 0) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }
        return 0;
    };
}