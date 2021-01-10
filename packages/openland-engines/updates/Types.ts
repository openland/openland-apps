import { ShortUpdate, ShortSequence } from 'openland-api/spacex.types';

export type UpdateEvent = ShortUpdate;
export type UpdateSequenceState = ShortSequence;
export type UpdateSequenceDiff = ShortSequence;

export type ShortUser = {
    id: string;
    name: string;
    photo: string | null;
};