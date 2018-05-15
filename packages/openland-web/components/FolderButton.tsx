import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { withAddToFolderMutation, FolderSelect } from '../api';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';

const AddToFolderModal = withAddToFolderMutation((props) => {
    return (
        <XModalForm
            submitMutation={props.addToFolder}
            mutationDirect={true}
            actionName="Save"
            defaultValues={{ parcelId: (props as any).parcelId }}
            target={<XButton text={'Add to folders'} />}
        >
            <XForm.Select component={FolderSelect} field="folderId" />
        </XModalForm >
    );
}) as React.ComponentType<{ parcelId: string }>;

export function FolderButton(props: { folder?: { id: string, name: string } | null, parcelId: string }) {
    if (props.folder) {
        return <XButton text={'In ' + props.folder.name} />;
    } else {
        return <AddToFolderModal parcelId={props.parcelId} />;
    }
}