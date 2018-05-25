import '../../../globals';
import * as React from 'react';
import Glamorous, { CSSProperties } from 'glamorous';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Sidebar } from '../../../components/Sidebar';
import { withFolders, withCreateFolderMutation, withFolder, withFolderActions, withFolderItems } from '../../../api';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLinkProps } from 'openland-x/XLink';
import { XLoader } from 'openland-x/XLoader';
import { XHeader } from 'openland-x/XHeader';
import { XIcon } from 'openland-x/XIcon';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';
import { XVertical } from 'openland-x-layout/XVertical';
import { TableParcels } from '../../../components/TableParcels';
import { XEmpty } from 'openland-x/XEmpty';
import { XButton } from 'openland-x/XButton';
import { XFooter } from 'openland-x/XFooter';

const SidebarItemsStyle = {
    height: 40,
    borderRadius: 4,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 4,
    marginRight: 4,
    color: '#334562',
    '& span': {
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    '& i': {
        fontSize: 18,
        marginRight: 6,
        color: '#bcc3cc'
    },
    '&:hover': {
        '& i': {
            color: '#334562'
        }
    }
} as CSSProperties;

const CreateFolderButonStyle = Glamorous(Sidebar.Item)({
    ...SidebarItemsStyle,
    position: 'relative',
    marginTop: 16,
    '&:hover': {
        color: '#334562',
        '& > i': {
            color: '#334562'
        }
    },
    '&::after': {
        content: `''`,
        display: 'block',
        position: 'absolute',
        top: -8,
        left: 10,
        width: 'calc(100% - 20px)',
        height: 1,
        backgroundColor: 'rgba(220, 222, 228, 0.6)'
    }
});

const CreateFolderButton = (props: XLinkProps) => (
    <CreateFolderButonStyle {...props}>
        <XIcon icon="add_circle" />
        <span>New folder</span>
    </CreateFolderButonStyle>
);

const CreateFolder = withCreateFolderMutation((props) => {
    return (
        <XModalForm
            title="Create folder"
            actionName="Create"
            target={(props as any).target || <CreateFolderButton />}
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
}) as React.ComponentClass<{ target?: any }>;

const Edit = withFolderActions((props) => {
    return (
        <XModalForm
            title="Edit folder"
            actionName="Rename"
            target={<XButton text="Edit" />}
            submitMutation={props.alterFolder}
            mutationDirect={true}
            secondaryActions={[{ actionName: 'Delete', submitMutation: props.deleteFolder, actionStyle: 'danger' }]}
        >
            <XForm.Text
                field="name"
                autofocus={true}
                value={props.folderName}
                placeholder="Folder name like 'Tower Opportunity' or 'Interesting lots'"
            />
        </XModalForm>
    );
}) as React.ComponentType<{ variables: { folderId: string }, folderName: string }>;

const SidebarItemWrapper = Glamorous(Sidebar.Item)({
    ...SidebarItemsStyle,
    justifyContent: 'space-between',
    '&.is-active': {
        color: '#654bfa',
        backgroundColor: '#eff1f3',
        '& i': {
            color: '#654bfa'
        },
        '& .counter': {
            opacity: 1,
            color: '#654bfa'
        }
    },
    '& .counter': {
        opacity: 0.5,
        color: '#334562'
    }
});

const SidebarItemTitle = Glamorous.div({
    minWidth: 0,
    maxWidth: '85%',
    display: 'flex',
    alignItems: 'center',
});

const SidebarItemCounter = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.43,
    textAlign: 'right',
});

interface SidebarProps extends XLinkProps {
    icon: string;
    title: string;
    counter: string | number;
}

const SidebarItem = (props: SidebarProps) => (
    <SidebarItemWrapper path={props.path}>
        <SidebarItemTitle>
            <XIcon icon={props.icon} />
            <span>{props.title}</span>
        </SidebarItemTitle>
        <SidebarItemCounter className="counter">{props.counter}</SidebarItemCounter>
    </SidebarItemWrapper>
);

const FolderItems = withFolderItems((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} />;
    }
    return (
        <>
            {props.data.items.pageInfo.itemsCount > 0 && (
                <TableParcels items={props.data.items.edges.map((v) => v.node.parcel)} />
            )}
            {props.data.items.pageInfo.itemsCount > 0 && (
                <XFooter text={props.data.items.pageInfo.itemsCount + ' items'}>
                    {props.data.items.pageInfo.currentPage > 1 && (
                        <XButton text="Prev" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }} />
                    )}
                    {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                        <XButton text="Next" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }} />
                    )}
                </XFooter>
            )}
            {props.data.items.pageInfo.itemsCount <= 0 && (
                <XEmpty icon="folder" text="You can find your first parcel at Explore" flexGrow={1} />
            )}
        </>
    );
});

const FolderContent = withFolder((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} />;
    }
    return (
        <XVertical flexGrow={1}>
            <XHeader text={props.data.folder.name}>
                <Edit variables={{ folderId: props.data.folder.id }} folderName={props.data.folder.name} />
            </XHeader>
            <FolderItems />
            {/* {props.data.folder.parcels.pageInfo.itemsCount > 0 && (
                <TableParcels items={props.data.folder.parcels.edges.map((v) => v.node)} />
            )}
            {props.data.folder.parcels.pageInfo.itemsCount <= 0 && (
                <XEmpty icon="folder" text="You can find your first parcel at Explore" flexGrow={1} />
            )} */}
        </XVertical>
    );
});

const NoFoldersTextContainer = Glamorous.div({
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'start',
    alignItems: 'center',
});

const EmptyWithMargin = Glamorous(XEmpty)({
    flexGrow: 1
});

const NewFolderForPlaceholder = Glamorous(CreateFolderButton)({
    '&::after': {
        display: 'none',
    }
});

export default withApp('Folders', 'viewer', withFolders((props) => {

    return (
        <>
            <XDocumentHead title={['Folders']} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Folders">
                        {props.data.folders.map((v) => {
                            const type = v.special;
                            let icon = '';
                            switch (type) {
                                case 'ALL':
                                    icon = 'star';
                                    break;
                                case 'FAVORITES':
                                    icon = 'favorite';
                                    break;
                                default:
                                    icon = 'folder';
                            }
                            return (
                                <SidebarItem key={v.id} path={'/folders/' + v.id} icon={icon} title={v.name} counter={v.parcelsCount} />
                            );
                        })}
                        <CreateFolder />
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {!props.router.routeQuery.folderId && props.data.loading && <XLoader loading={true} />}
                    {!props.data.loading && (!props.router.routeQuery.folderId || props.data.folders.map(folder => folder.id).indexOf(props.router.routeQuery.folderId) === -1) && props.data.folders.length > 0 &&
                        (
                            <XPageRedirect path={'/folders/' + props.data.folders[0].id} />
                        )}
                    {!props.data.loading && props.router.routeQuery.folderId && props.data.folders.length === 0 && (
                        <XPageRedirect path={'/folders/'} />

                    )}
                    {!props.data.loading && !props.router.routeQuery.folderId && props.data.folders && props.data.folders.length <= 0 && (
                        <EmptyWithMargin icon="folder">
                            <NoFoldersTextContainer>

                                You can organize parcels with folders
                            <CreateFolder target={(
                                    <NewFolderForPlaceholder />
                                )} />
                            </NoFoldersTextContainer>

                        </EmptyWithMargin>
                    )}
                    {props.router.routeQuery.folderId && <FolderContent variables={{ folderId: props.router.routeQuery.folderId }} />}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
