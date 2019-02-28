import { DraftStateT } from './useDraft';
import { MentionDataT } from './useMentions';

export type GeneralComposeStateT = {
    handleChange: Function;
};

export function useGeneralCompose({
    setInputValue,
    onChange,
    draftState,
}: {
    setInputValue: Function;
    onChange: ((text: string) => void) | undefined;
    draftState?: DraftStateT;
}) {
    const supportDraft = () => {
        return !!draftState;
    };

    const handleChange = ({ text, mentions }: { text: string; mentions: MentionDataT[] }) => {
        setInputValue(text);

        if (onChange) {
            onChange(text);
        }

        if (supportDraft()) {
            if (draftState!!.changeDraft && draftState!!.beDrafted!!) {
                draftState!!.changeDraft(text);
            }
        }
    };

    return { handleChange };
}
