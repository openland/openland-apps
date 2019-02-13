import { DraftStateT } from './useDraft';
import { QuoteStateT } from './useQuote';

export type GeneralComposeStateT = {
    handleChange: Function;
    handleDialogDone: Function;
};

export function useGeneralCompose({
    setInputValue,
    quoteState,
    onChange,
    onSendFile,
    draftState,
}: {
    setInputValue: Function;
    quoteState?: QuoteStateT;
    onChange: ((text: string) => void) | undefined;
    onSendFile?: Function;
    draftState?: DraftStateT;
}) {
    const supportDraft = () => {
        return !!draftState;
    };

    const handleChange = (value: string) => {
        setInputValue(value);

        if (onChange) {
            onChange(value);
        }

        if (supportDraft()) {
            if (
                draftState!!.changeDraft &&
                quoteState &&
                quoteState.quoteMessagesId!!.length &&
                draftState!!.beDrafted!!
            ) {
                draftState!!.changeDraft(value);
            }
        }
    };

    const handleDialogDone = (r: UploadCare.File) => {
        setInputValue('');
        if (onSendFile) {
            onSendFile(r);
        }
    };

    return { handleChange, handleDialogDone };
}
