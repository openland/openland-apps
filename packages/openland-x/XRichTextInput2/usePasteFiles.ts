import { DraftHandleValue } from 'draft-js';

export function usePasteFiles({
    onPasteFile,
    resetAndFocus,
}: {
    onPasteFile?: (file: any) => void;
    resetAndFocus: Function;
}) {
    const onPasteFiles = (files: Blob[]): DraftHandleValue => {
        let file = files[0];
        if (!file) {
            return 'handled';
        }

        if (onPasteFile) {
            onPasteFile(file);
        }

        resetAndFocus();
        return 'handled';
    };

    return { onPasteFiles };
}
