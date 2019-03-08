import * as React from 'react';
import { SaveDraftMessageVariables, SaveDraftMessage } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';
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

    const changeDraft = (message: string, mentions: MentionDataT[]) => {
        if (!beDrafted) {
            setBeDrafted(true);
        }

        if (conversationId) {
            DraftStore.setDraftMessage(conversationId, message, mentions);
        }

        saveDraft({
            variables: {
                conversationId,
                message,
            },
        });
    };

    const getNextDraft = () => {
        let text = '';
        let mentions: MentionDataT[] = [];
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
