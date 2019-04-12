import * as React from 'react';
import { SaveDraftMessageVariables, SaveDraftMessage } from 'openland-api/Types';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import * as DraftStore from './DraftStore';

export type DraftStateT = {
    getNextDraft: Function;
    beDrafted: boolean;
    setBeDrafted: Function;
    getDefaultValue: Function;
    changeDraft: Function;
    cleanDraft: Function;
};

export function useDraft({
    conversationId,
    saveDraftMessage,
    draft,
}: {
    draft?: string | null;
    conversationId?: string;
    saveDraftMessage: (variables: SaveDraftMessageVariables) => Promise<SaveDraftMessage>;
}) {
    const [beDrafted, setBeDrafted] = React.useState(false);

    const changeDraft = async (message: string, mentions: UserWithOffset[]) => {
        if (!beDrafted) {
            setBeDrafted(true);
        }

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
        beDrafted,
        setBeDrafted,
        getDefaultValue,
        changeDraft,
        cleanDraft,
    };
}
