import { DraftStateT } from './useDraft/useDraft';
import { InputMethodsStateT } from './useInputMethods';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

export type GeneralComposeStateT = {
    handleChange: Function;
};

type useHandleChangeT = {
    setInputValue: Function;
    onChange: ((text: string) => void) | undefined;
    draftState?: DraftStateT;
    inputMethodsState: InputMethodsStateT;
};

export function useHandleChange({ setInputValue, onChange, draftState }: useHandleChangeT) {
    const supportDraft = () => {
        return !!draftState;
    };

    const handleChange = ({ text, mentions }: { text: string; mentions: UserWithOffset[] }) => {
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
