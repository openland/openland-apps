import { DraftStateT } from './useDraft';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';
import { MentionsStateT } from './useMentions';

export type GeneralComposeStateT = {
    handleChange: Function;
};

export function useHandleChange({
    setInputValue,
    mentionsState,
    onChange,
    draftState,
}: {
    setInputValue: Function;
    mentionsState?: MentionsStateT;
    onChange: ((text: string) => void) | undefined;
    draftState?: DraftStateT;
}) {
    const supportDraft = () => {
        return !!draftState;
    };

    const handleChange = ({ text, mentions }: { text: string; mentions: MentionDataT[] }) => {
        if (mentionsState) {
            mentionsState.setCurrentMentions(mentions);
        }

        setInputValue(text);

        if (onChange) {
            onChange(text);
        }

        if (supportDraft()) {
            if (draftState!!.changeDraft && draftState!!.beDrafted!!) {
                draftState!!.changeDraft(text, mentions);
            }
        }
    };

    return { handleChange };
}
