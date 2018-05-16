import * as React from 'react';
import { XButton, XButtonStyle, XButtonSize } from 'openland-x/XButton';
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
            target={<XButton icon="add" style={(props as any).style} size={(props as any).size} text={'Save to folder'} />}
        >
            <XForm.Select component={FolderSelect} field="folderId" />
        </XModalForm>
    );
}) as React.ComponentType<{ parcelId: string, style?: XButtonStyle, size?: XButtonSize }>;

export function FolderButton(props: { folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize }) {
    if (props.folder) {
        return <XButton icon="folder" text={props.folder.name} style="primary" size={props.size} path={'/folders/' + props.folder.id} />;
    } else {
        return <AddToFolderModal parcelId={props.parcelId} style="electric" size={props.size} />;
    }
}