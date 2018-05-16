import * as React from 'react';
import { XButton, XButtonSize } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { withFolders, withSetFolderMutation } from '../api';
import { XButtonMutation } from 'openland-x/XButtonMutation';
import { XModalContext } from 'openland-x-modal/XModalContext';

const ButtonMoveToFolder = withSetFolderMutation((props) => {
    return (
        <XModalContext.Consumer>
            {(modal) => (
                <XButtonMutation
                    text={(props as any).text}
                    mutation={props.setFolder}
                    variables={{ parcelId: (props as any).parcelId, folderId: (props as any).folderId }}
                    onSuccess={modal!!.close}
                />
            )}
        </XModalContext.Consumer>
    );
}) as React.ComponentType<{ text: string, parcelId: string, folderId?: string }>;

const FolderForm = withFolders((props) => {
    return (
        <XVertical>
            {props.data.folders && props.data.folders.map((v) => (
                <ButtonMoveToFolder key={v.id} parcelId={(props as any).parcelId} text={v.name} folderId={v.id} />
            ))}
            <ButtonMoveToFolder key="_remove" parcelId={(props as any).parcelId} text="Remove" />
        </XVertical>
    );
}) as React.ComponentType<{ parcelId: string, size?: XButtonSize }>;

export class FolderButton extends React.PureComponent<{ folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize, width?: number }, { show: boolean }> {
    constructor(props: { folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize }) {
        super(props);
        this.state = { show: false };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, true);
    }

    handleClose = () => {
        console.warn('handleClose');
        this.setState({ show: false });
    }

    handleClickOutside = (e: any) => {
        console.warn(e);
        // const el = this.container;
        // if (!el.contains(e.target)) {
        //     onClickOutside(e);
        // }
    }

    render() {
        let button;
        if (this.props.folder) {
            button = <XButton width={this.props.width} icon="folder" text={this.props.folder.name} style="primary" size={this.props.size} onClick={() => this.setState({ show: true })} />;
        } else {
            button = <XButton width={this.props.width} icon="add" style="electric" size={this.props.size} text={'Save to folder'} onClick={() => this.setState({ show: true })} />;
        }
        return (
            <XPopper
                show={this.state.show}
                content={
                    <XModalContext.Provider value={{ close: this.handleClose }}>
                        <FolderForm parcelId={this.props.parcelId} />
                    </XModalContext.Provider>}
                padding={10}
                arrow={null}
                placement="bottom">
                {button}
            </XPopper>
        );
    }
}