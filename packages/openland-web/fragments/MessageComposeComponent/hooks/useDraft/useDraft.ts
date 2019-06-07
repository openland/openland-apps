import * as React from 'react';
import { SaveDraftMessageVariables, SaveDraftMessage } from 'openland-api/Types';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';
import * as DraftStore from './DraftStore';

export type DraftStateT = {
    getNextDraft: Function;
    getDefaultValue: Function;
    changeDraft: Function;
    cleanDraft: Function;
};

type useDraftT = {
    draft?: string | null;
    conversationId?: string;
    saveDraftMessage: (variables: SaveDraftMessageVariables) => Promise<SaveDraftMessage>;
};

export function useDraft({ conversationId, saveDraftMessage, draft }: useDraftT) {
    const changeDraft = async (message: string, mentions: UserWithOffset[]) => {
        if (conversationId) {
            DraftStore.setDraftMessage(conversationId, message, mentions);
        }

        await saveDraftMessage({
            conversationId: conversationId!!,
            message,
        });
    };

    const getNextDraft = () => {
        let text = '';
        let mentions: UserWithOffset[] = [];

        const storedDraft = DraftStore.getDraftMessage(conversationId);

        if (storedDraft.text === null) {
            if (draft !== null && draft !== undefined) {
                text = draft;
            }
        } else {
            text = storedDraft.text;
            mentions = storedDraft.mentions;
        }

        return { text, mentions };
    };

    const getDefaultValue = () => {
        return getNextDraft();
    };

    const cleanDraft = () => {
        changeDraft('', []);
        DraftStore.cleanDraftMessage(conversationId);
    };

    return {
        getNextDraft,
        getDefaultValue,
        changeDraft,
        cleanDraft,
    };
}
