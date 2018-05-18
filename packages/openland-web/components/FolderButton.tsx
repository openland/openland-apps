import * as React from 'react';
import { XButton, XButtonSize, XButtonStyle } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { withFolders, withSetFolderMutation, withCreateFolderMutation } from '../api';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XMutation } from 'openland-x/XMutation';
import { XButtonMutation } from 'openland-x/XButtonMutation';

const FolderEntry = Glamorous.div((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    ':hover': {
        backgroundColor: '#f8f8fb'
    },
    '> a': {
        margin: 10
    },
    // '& .loader': {
    //     display: (props as any).loading ? undefined : 'none' 
    // }
}));

const FolderEntryContent = Glamorous.div({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    '> i': {
        padding: 10
    }
});

const ButtonMoveToFolder = withSetFolderMutation((props) => {
    return (
        <XModalContext.Consumer>
            {(modal) => (
                <XMutation
                    mutation={props.setFolder}
                    variables={{ parcelId: (props as any).parcelId, folderId: (props as any).folderId }}
                    onSuccess={modal!!.close}>
                    <FolderEntry>
                        <FolderEntryContent>
                            <XIcon icon="folder" />
                            {(props as any).text}
                        </FolderEntryContent>
                        {(props as any).remove && (
                            <XButtonMutation
                                size="small"
                                mutation={props.setFolder}
                                variables={{ parcelId: (props as any).parcelId, folder: null }}
                                onSuccess={modal!!.close}
                                text="Remove"
                                style="danger" />
                        )}

                    </FolderEntry>

                </XMutation>

            )}
        </XModalContext.Consumer>
    );
}) as React.ComponentType<{ text: string, parcelId: string, folderId?: string, style?: XButtonStyle, remove?: boolean }>;

const CreateFolder = withCreateFolderMutation((props) => {
    return (
        <XModalForm
            title="Create folder"
            actionName="Create"
            targetQuery="newFolder"
            // target={<XButton icon="add" text="New Folder" style="electric" />}
            submitMutation={props.createFolder}
            mutationDirect={true}
        >
            <XForm.Text
                field="name"
                autofocus={true}
                placeholder="Folder name like 'Tower Opportunity' or 'Interesting lots'"
            />
        </XModalForm>
    );
});

const FolderForm = withFolders((props) => {
    return (
        <>
            <XPopper.Invalidator />
            <XVertical>
                <XButton icon="add" text="New Folder" style="electric" query={{ field: 'newFolder', value: 'true' }} autoClose={true} />
                {props.data.folders && props.data.folders.map((v) => (
                    <ButtonMoveToFolder key={v.id} parcelId={(props as any).parcelId} text={v.name} folderId={v.id} remove={(props as any).currentFolder && v.id === (props as any).currentFolder.id} />
                ))}
            </XVertical>
        </>
    );
}) as React.ComponentType<{ parcelId: string, size?: XButtonSize, currentFolder?: { id: string, name: string } | null }>;

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 10,
    // pointerEvents: 'none'
}));

const Button = Glamorous(XButton)<{ active?: boolean }>((props) => ({
    zIndex: props.active ? 10 : undefined
}));

export class FolderButton extends React.PureComponent<{ folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize, width?: number, menuWidth?: number }, { show: boolean }> {
    constructor(props: { folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize }) {
        super(props);
        this.state = { show: false };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        let button;
        if (this.props.folder) {
            button = <Button width={this.props.width} icon="folder" text={this.props.folder.name} style="primary" size={this.props.size} onClick={() => this.setState({ show: !this.state.show })} active={this.state.show} zIndex={10} />;
        } else {
            button = <Button width={this.props.width} icon="add" style={this.state.show === true ? 'flat' : 'electric'} size={this.props.size} text={'Save to folder'} onClick={() => this.setState({ show: !this.state.show })} active={this.state.show} zIndex={10} />;

        }
        return (
            <>
                <CreateFolder variables={{ initialParcels: [this.props.parcelId] }} />
                <Shadow active={this.state.show} />
                <XPopper
                    show={this.state.show}
                    content={
                        <XModalContext.Provider value={{ close: this.handleClose }}>
                            <FolderForm parcelId={this.props.parcelId} currentFolder={this.props.folder} />
                        </XModalContext.Provider>}
                    padding={10}
                    arrow={null}
                    placement="top"
                    width={this.props.menuWidth}
                    onClickOutside={this.handleClose}>
                    {button}
                </XPopper>
            </>
        );
    }
}