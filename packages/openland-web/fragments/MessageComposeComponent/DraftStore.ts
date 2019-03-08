type MentionsT = any;

const getDraftKey = (conversationId?: string): string => {
    if (!conversationId) {
        return '';
    }
    return 'conversation_draft_2_' + conversationId;
};

export const getDraftMessage = (
    conversationId?: string,
): { text: string | null; mentions?: MentionsT } => {
    let text, mentions;
    if (!conversationId) {
        text = null;
    }

    text = window.localStorage.getItem(`${getDraftKey(conversationId)}_text`) || '';
    mentions = window.localStorage.getItem(`${getDraftKey(conversationId)}_mentions`) || [];

    let draftKey = getDraftKey(conversationId);

    if (text === draftKey) {
        text = null;
    }

    return { text, mentions };
};

export const setDraftMessage = (
    conversationId?: string,
    src?: string,
    mentions?: MentionsT,
): void => {
    if (!conversationId) {
        return;
    }
    if (src === undefined) {
        return;
    }

    window.localStorage.setItem(`${getDraftKey(conversationId)}_text`, src);
    window.localStorage.setItem(
        `${getDraftKey(conversationId)}_mentions`,
        JSON.stringify(mentions),
    );
};

export const cleanDraftMessage = (conversationId?: string): void => {
    if (!conversationId) {
        return;
    }

    let draftKey = getDraftKey(conversationId);
    window.localStorage.setItem(`${draftKey}_text`, draftKey);
    window.localStorage.setItem(`${draftKey}_mentions`, '[]');
};
