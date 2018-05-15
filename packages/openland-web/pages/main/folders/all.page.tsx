import '../../../globals';
import * as React from 'react';
import Glamorous, { CSSProperties } from 'glamorous';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Sidebar } from '../../../components/Sidebar';
import { withFolders, withCreateFolderMutation, withFolder } from '../../../api';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLinkProps } from 'openland-x/XLink';
import { XLoader } from 'openland-x/XLoader';
import { XHeader } from 'openland-x/XHeader';
import { XIcon } from 'openland-x/XIcon';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';

const SidebarItemsStyle = {
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: 0.7,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 4,
    marginRight: 4,
    color: '#334562',
    '& > span': {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    '& > i': {
        fontSize: 18,
        marginRight: 6,
        color: '#bcc3cc'
    },
    '&:hover': {
        '& > i': {
            color: '#334562'
        }
    }
} as CSSProperties;

const SidebarItemStyle = Glamorous(Sidebar.Item)({
    ...SidebarItemsStyle,
    '&.is-active': {
        color: '#654bfa',
        backgroundColor: '#eff1f3',
        '& > i': {
            color: '#654bfa'
        }
    }
});

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
            target={<CreateFolderButton />}
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

interface SidebarProps extends XLinkProps {
    icon: string;
    title: string;
}

const SidebarItem = (props: SidebarProps) => (
    <SidebarItemStyle path={props.path}>
        <XIcon icon={props.icon} />
        <span>{props.title}</span>
    </SidebarItemStyle>
);

const FolderContent = withFolder((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} />;
    }
    return (
        <>
            <XHeader text={props.data.folder.name} />
        </>
    );
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
                                <SidebarItem key={v.id} path={'/folders/' + v.id} icon={icon} title={v.name} />
                            );
                        })}
                        <CreateFolder />
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {!props.router.routeQuery.folderId && <XLoader loading={true} />}
                    {!props.router.routeQuery.folderId && <XPageRedirect path={'/folders/' + props.data.folders[0].id} />}
                    {props.router.routeQuery.folderId && <FolderContent variables={{ folderId: props.router.routeQuery.folderId }} />}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
