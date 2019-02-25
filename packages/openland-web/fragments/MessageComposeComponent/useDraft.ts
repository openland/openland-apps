import * as React from 'react';
import { SaveDraftMessageVariables, SaveDraftMessage } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import * as DraftStore from './DraftStore';

export type DraftStateT = {
    getNextDraft: Function;
    beDrafted: boolean;
    setBeDrafted: Function;
    getDefaultValue: Function;
    changeDraft: Function;
    cleanDraft: Function;
};

// TODO decalare state object
export function useDraft({
    conversationId,
    saveDraft,
    draft,
}: {
    draft?: string | null;
    conversationId?: string;
    saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
}) {
    const [beDrafted, setBeDrafted] = React.useState(false);

    const changeDraft = (message: string) => {
        if (!beDrafted) {
            setBeDrafted(true);
        }

        if (conversationId) {
            DraftStore.setDraftMessage(conversationId, message);
        }

        saveDraft({
            variables: {
                conversationId,
                message,
            },
        });
    };

    const getNextDraft = () => {
        let result = '';
        const storedDraft = DraftStore.getDraftMessage(conversationId);

        if (storedDraft === null) {
            if (draft !== null && draft !== undefined) {
                result = draft;
            }
        } else {
            result = storedDraft;
        }

        return result;
    };

    const getDefaultValue = () => {
        return getNextDraft();
    };

    const cleanDraft = () => {
        changeDraft('');
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
