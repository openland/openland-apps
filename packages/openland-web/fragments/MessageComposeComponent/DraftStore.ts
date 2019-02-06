const getDraftKey = (conversationId?: string): string => {
    if (!conversationId) {
        return '';
    }
    return 'conversation_draft_1_' + conversationId;
};

export const getDraftMessage = (conversationId?: string): string => {
    if (!conversationId) {
        return '';
    }

    const message = window.localStorage.getItem(getDraftKey(conversationId)) || '';
    let draftKey = getDraftKey(conversationId);

    if (message === draftKey) {
        return '';
    }

    return message;
};

export const setDraftMessage = (conversationId?: string, src?: string): void => {
    if (!conversationId) {
        throw Error('no conversationId');
    }
    if (src === undefined) {
        throw Error('no src');
    }

    window.localStorage.setItem(getDraftKey(conversationId), src);
};

export const cleanDraftMessage = (conversationId?: string): void => {
    if (!conversationId) {
        throw Error('no conversationId');
    }

    let draftKey = getDraftKey(conversationId);
    window.localStorage.setItem(draftKey, draftKey);
};
