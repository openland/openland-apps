import { DraftHandleValue } from 'draft-js';

export function usePasteFiles({
    onPasteFile,
    focus,
}: {
    onPasteFile?: (file: any) => void;
    focus: Function;
}) {
    const onPasteFiles = (files: Blob[]): DraftHandleValue => {
        let file = files[0];
        if (!file) {
            return 'handled';
        }

        if (onPasteFile) {
            onPasteFile(file);
        }

        focus();
        return 'handled';
    };

    return { onPasteFiles };
}
