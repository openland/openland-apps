import * as React from 'react';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { CommentsModalInner } from './CommentsModalInner';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';

export const CommentsModal = () => {
    return (
        <XModalForm
            width={800}
            noPadding
            targetQuery="comments"
            defaultData={{
                input: {},
            }}
            defaultAction={async () => {
                //
            }}
            customFooter={null}
        >
            <UploadContextProvider>
                <CommentsModalInner />
            </UploadContextProvider>
        </XModalForm>
    );
};
