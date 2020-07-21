import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import {  MessageCounterReactions } from 'openland-api/spacex.types';

export const getReactionFullCounter = (reactions: MessageCounterReactions[]) => {
    return TextRenderProccessor.processReactionCounters(reactions);
};