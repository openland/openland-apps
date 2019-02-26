const getDraftKey = (conversationId?: string): string => {
    if (!conversationId) {
        return '';
    }
    return 'conversation_draft_1_' + conversationId;
};

export const getDraftMessage = (conversationId?: string): string | null => {
    let result;
    if (!conversationId) {
        result = null;
    }

    result = window.localStorage.getItem(getDraftKey(conversationId)) || '';
    let draftKey = getDraftKey(conversationId);

    if (result === draftKey) {
        result = null;
    }

    return result;
};

export const setDraftMessage = (conversationId?: string, src?: string): void => {
    if (!conversationId) {
        return;
    }
    if (src === undefined) {
        return;
    }

    window.localStorage.setItem(getDraftKey(conversationId), src);
};

export const cleanDraftMessage = (conversationId?: string): void => {
    if (!conversationId) {
        return;
    }

    let draftKey = getDraftKey(conversationId);
    window.localStorage.setItem(draftKey, draftKey);
};
