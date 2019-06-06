import * as React from 'react';
import { DraftStateT } from './useDraft/useDraft';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';

export type GeneralComposeStateT = {
    handleChange: Function;
};

type useHandleChangeT = {
    setInputValue: Function;
    onChange: ((text: string) => void) | undefined;
    draftState?: DraftStateT;
};

export function useHandleChange({ setInputValue, onChange, draftState }: useHandleChangeT) {
    const handleChange = React.useCallback(
        ({ text, mentions }: { text: string; mentions: UserWithOffset[] }) => {
            setInputValue(text);

            if (onChange) {
                onChange(text);
            }

            if (!!draftState) {
                if (draftState!!.changeDraft) {
                    draftState!!.changeDraft(text, mentions);
                }
            }
        },
        [],
    );

    return { handleChange };
}
