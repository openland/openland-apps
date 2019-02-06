import * as React from 'react';
import { SaveDraftMessageVariables, SaveDraftMessage } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import * as DraftStore from './DraftStore';

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

        DraftStore.setDraftMessage(conversationId, message);
        saveDraft({
            variables: {
                conversationId,
                message,
            },
        });
    };

    const getNextDraft = () => {
        let result = DraftStore.getDraftMessage(conversationId);

        if (result === '' && draft && draft !== '') {
            result = draft;
        }
        return result;
    };

    const getDefaultValue = () => {
        return DraftStore.getDraftMessage(conversationId);
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
