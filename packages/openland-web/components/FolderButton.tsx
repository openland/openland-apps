import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { XButton, XButtonSize, XButtonStyle } from 'openland-x/XButton';
import { XPopper, Placement } from 'openland-x/XPopper';
import { withFolders, withSetFolderMutation, withCreateFolderMutation, withCreateFolderFromSearchMutation, withAddToFolderFromSearchMutation } from '../api';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XMutation } from 'openland-x/XMutation';

const FolderEntry = Glamorous(XMutation)<{ selected?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: props.selected ? '#f8f8fb' : undefined,
    cursor: props.selected ? 'default' : 'pointer',
    ':hover': {
        backgroundColor: '#f8f8fb'
    },
    '> a': {
        margin: 10
    }
}));

const FolderEntryContent = Glamorous.div<{ selected?: boolean }>((props) => ({
    flexGrow: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    color: props.selected ? '#654bfa' : '#334562',
    '> i': {
        padding: 10,
        color: props.selected ? '#654bfa' : '#BCC3CC'
    },
    '> span': {
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

// little dirty hacks, dont tell anyone 0_-
const Loader = Glamorous(XButton)({
    backgroundColor: 'transparent',
    color: 'transparent',
    ':hover, :active, :focus': {
        color: 'transparent',
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    '&.parcel-folder-button .loading-icon': {
        left: 'auto',
        right: 0
    }
});

const ButtonMoveParcelToFolder = withSetFolderMutation((props) => {
    return (
        <XModalContext.Consumer>
            {(modal) => (
                <FolderEntry
                    selected={(props as any).remove}
                    mutation={props.setFolder}
                    active={!(props as any).remove}
                    variables={{ parcelId: (props as any).parcelId, folderId: (props as any).folderId }}
                    onSuccess={modal!!.close}>
                    <FolderEntryContent selected={(props as any).remove}>
                        <XIcon icon="folder" />
                        <span>{(props as any).text}</span>
                    </FolderEntryContent>
                    {(props as any).remove && (
                        <XButton
                            size="small"
                            action={() => props.setFolder({ variables: { parcelId: (props as any).parcelId, folder: null } as any })}
                            onSuccess={modal!!.close}
                            text="Remove"
                            style="danger"
                        />
                    )}
                    {!(props as any).remove && (
                        <Loader
                            className="parcel-folder-button"
                            text="Remove"
                            size="small"
                            style="flat"
                        />
                    )}
                </FolderEntry>
            )}
        </XModalContext.Consumer>
    );
}) as React.ComponentType<{ text: string, parcelId: string, folderId?: string, style?: XButtonStyle, remove?: boolean }>;

const ButtonMoveSearchResultsToFolder = withAddToFolderFromSearchMutation((props) => {
    return (
        <XModalContext.Consumer>
            {(modal) => (
                <FolderEntry
                    selected={(props as any).remove}
                    mutation={props.addToFolderFromSearch}
                    active={!(props as any).remove}
                    variables={{
                        query: (props as any).query,
                        city: (props as any).city,
                        county: (props as any).county,
                        folderId: (props as any).folderId,
                        state: (props as any).state
                    }}
                    onSuccess={modal!!.close}>
                    <FolderEntryContent >
                        <XIcon icon="folder" />
                        {(props as any).text}
                    </FolderEntryContent>

                    <Loader
                        text="Remove"
                        size="small"
                        style="flat" />

                </FolderEntry>

            )}
        </XModalContext.Consumer>
    );
}) as React.ComponentType<{
    text: string, query?: string | null,
    state: string,
    county: string,
    city: string,
    folderId: string,
    style?: XButtonStyle,
}>;

const CreateFolderComponent = ((mutation: any, targetQuery: string) => {
    return (
        <XModalForm
            title="Create folder"
            actionName="Create"
            targetQuery={targetQuery}
            // target={<XButton icon="add" text="New Folder" style="electric" />}
            submitMutation={mutation}
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

const CreateFolderWithParcels = withCreateFolderMutation(((props) => CreateFolderComponent(props.createFolder, 'newFolderFromParcel')));
const CreateFolderFromSearch = withCreateFolderFromSearchMutation(((props) => CreateFolderComponent(props.createFolderFromSearch, 'newFolderFromSearch')));

const FolderPopupWrapper = Glamorous.div({
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 350px)',
    marginTop: -10,
    marginBottom: -10,
    marginLeft: -10,
    marginRight: -10,
    borderRadius: 5
});

const AddFolderButton = Glamorous(XButton)({
    border: 'none',
    borderRadius: 0,
    borderBottom: '1px solid rgba(220, 222, 228, 0.6)',
    height: 48
});

const FolderForm = withFolders((props) => {
    return (
        <>
            <XPopper.Invalidator />
            <FolderPopupWrapper>
                <AddFolderButton text="Add to new folder" style="electric" query={{ field: (props as any).parcelId ? 'newFolderFromParcel' : 'newFolderFromSearch', value: 'true' }} autoClose={true} />
                {(props as any).parcelId && props.data.folders && props.data.folders.map((v) => (
                    <ButtonMoveParcelToFolder key={v.id} parcelId={(props as any).parcelId} text={v.name} folderId={v.id} remove={(props as any).currentFolder && v.id === (props as any).currentFolder.id} />
                ))}

                {(props as any).search && props.data.folders && props.data.folders.map((v) => (
                    <ButtonMoveSearchResultsToFolder {...(props as any).search} folderId={v.id} key={v.id} text={v.name} />
                ))}
            </FolderPopupWrapper>
        </>
    );
}) as React.ComponentType<{
    parcelId?:
    string, search?: {
        query: string,
        city: string,
        county: string,
        state: string
    }, size?: XButtonSize, currentFolder?: { id: string, name: string } | null
}>;

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 11,
    // pointerEvents: 'none'
}));
interface FolderButtonProps {
    folder?: { id: string, name: string } | null; parcelId?: string; search?: {
        query: string;
        city: string;
        county: string;
        state: string
    };
    size?: XButtonSize;
    width?: number;
    text?: string;
    style?: XButtonStyle;
    icon?: string | null;
    placement?: Placement;
    target?: any;
    show?: boolean;
    menuMinWidth?: number;
    handleClose?: () => void;
}

export class FolderButton extends React.PureComponent<FolderButtonProps, { show: boolean }> {

    container?: Element;
    menuWidth?: number;
    menuMinWidth: number;

    componentDidUpdate() {

        if (this.props.show !== undefined && this.props.show !== this.state.show) {
            this.setState({ show: this.props.show });
        }
    }

    constructor(props: { folder?: { id: string, name: string } | null, parcelId: string, size?: XButtonSize }) {
        super(props);
        this.state = { show: false };
        this.menuMinWidth = this.props.menuMinWidth || 170;
    }

    handleClose = () => {

        if (this.props.handleClose) {
            this.props.handleClose();
        }
        this.setState({ show: false });

    }

    switch = () => {
        this.setState({ show: !this.state.show });
    }

    onTargetCreated = (el: any) => {
        this.container = el;
    }

    componentWillUpdate() {
        if (this.container) {
            let node = (ReactDOM.findDOMNode(this.container) as any);
            if (node) {
                this.menuWidth = node.offsetWidth >= this.menuMinWidth ? node.offsetWidth : this.menuMinWidth;
            }
        }
    }

    render() {

        let target = this.props.target;
        if (!target) {
            if (this.props.folder) {
                target = <XButton width={this.props.width} icon={this.props.icon === null ? undefined : this.props.icon ? this.props.icon : 'folder'} text={this.props.text !== undefined ? this.props.text : this.props.folder.name} style={this.props.style !== undefined ? this.props.style : 'primary'} size={this.props.size} onClick={this.switch} zIndex={11} />;
            } else {
                target = <XButton width={this.props.width} icon={this.props.icon === null ? undefined : this.props.icon ? this.props.icon : 'add'} style={this.props.style !== undefined ? this.props.style : this.state.show === true ? 'flat' : 'electric'} size={this.props.size} text={this.props.text !== undefined ? this.props.text : 'Save to folder'} onClick={this.switch} zIndex={11} />;

            }
        }

        target = React.cloneElement(target, { innerRef: this.onTargetCreated });

        return (
            <>
                {this.props.parcelId && (
                    <CreateFolderWithParcels variables={{ initialParcels: [this.props.parcelId] }} />
                )}

                {this.props.search && (
                    <CreateFolderFromSearch variables={{
                        query: this.props.search.query,
                        city: this.props.search.city,
                        county: this.props.search.county,
                        state: this.props.search.state
                    }} />
                )}
                <Shadow active={this.state.show} />
                <XPopper
                    show={this.state.show}
                    content={
                        <XModalContext.Provider value={{ close: this.handleClose }}>
                            <FolderForm parcelId={this.props.parcelId} currentFolder={this.props.folder} search={this.props.search} />
                        </XModalContext.Provider>}
                    padding={10}
                    arrow={null}
                    placement={this.props.placement || 'top'}
                    width={this.menuWidth}
                    onClickOutside={this.handleClose}
                >
                    {target}
                </XPopper>
            </>
        );
    }
}