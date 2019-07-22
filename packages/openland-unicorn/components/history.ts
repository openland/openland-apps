import { TabHistoryRecord } from './history';
export interface TabHistoryRecord {
    id: string;
    tab: number;
    stacks: {
        pages: string[]
    }[];
}

export function isTabHistory(src: any): src is TabHistoryRecord {
    if (typeof src !== 'object') {
        return false;
    }

    if (typeof src.id !== 'string') {
        return false;
    }
    if (typeof src.tab !== 'number') {
        return false;
    }
    if (!Array.isArray(src.stacks)) {
        return false;
    }
    for (let s of src.stacks) {
        if (!Array.isArray(s.pages)) {
            return false;
        }
        for (let s2 of s.pages) {
            if (typeof s2 !== 'string') {
                return false;
            }
        }
    }

    return true;
}