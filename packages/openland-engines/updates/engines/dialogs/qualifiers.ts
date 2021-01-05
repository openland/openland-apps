import { DialogQualifier } from './DialogQualifier';

export const unreadQualifier: DialogQualifier = (src) => src.counter > 0;
export const defaultQualifier: DialogQualifier = (src) => src.sortKey !== null;
export const privateQualifier: DialogQualifier = (src) => src.kind === 'private';
export const groupQualifier: DialogQualifier = (src) => src.kind === 'group-secret' || src.kind === 'group-shared';