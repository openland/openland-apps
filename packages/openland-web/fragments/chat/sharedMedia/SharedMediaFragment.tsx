import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile, SharedMediaType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_sender } from 'openland-api/Types';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { TextTitle3, TextStyles, TextDetail } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import DropIcon from 'openland-icons/s/ic-dropdown-16.svg';
import ForwardIcon from 'openland-icons/s/ic-forward-24.svg';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TabItem, useTabs, Tabs } from 'openland-web/components/unicorn/UTabs';
import { MediaContent } from './MediaContent';
import { fileIcon, fileFormat } from '../messenger/message/content/DocumentContent';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showChatPicker } from '../showChatPicker';

interface SharedMediaProps {
    chatId: string;
    mediaTypes: SharedMediaType[];
    active: boolean;
}
interface Paginated {
    loadMore: () => void;
}
interface SharedItem {
    attach: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile | SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment;
    sender: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_sender;
    date: string;
}

export interface SharedItemFile extends SharedItem {
    attach: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;
}

const DateClass = css`
    position: relative;
    width: 100%;
    margin-top: 15px;
    padding-top: 12px;
    padding-bottom: 12px;
    :first-child{
        margin-top: 0;
    }
    @media (max-width: 750px) {
        margin-left: 16px;    
    }
`;

const Corner = <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H0V8C0 3.58172 3.58172 0 8 0Z" fill="var(--backgroundPrimary)" />
</svg>;

const c1 = css`position: absolute; bottom: -15px; left: 1px; z-index: 1;`;
const c2 = css`position: absolute; bottom: -17px; right: -1px; z-index: 1; transform: rotate(90deg);`;
const c3 = css`position: absolute; top: -32px; left: -1px; z-index: 1; transform: rotate(270deg);`;
const c4 = css`position: absolute; top: -30px; right: 1px; z-index: 1; transform: rotate(180deg);`;
const cf1 = css`position: absolute; top: -15px; left: 0; z-index: 1; transform: rotate(270deg);`;
const cf2 = css`position: absolute; top: -14px; right: 1px; z-index: 1; transform: rotate(180deg);`;
export const DateDivider = React.memo((props: { date: string, useCorners: boolean }) => {
    const layout = useLayout();
    return (
        <div className={cx(DateClass, TextTitle3)}>
            {props.date}
            {layout === 'desktop' && props.useCorners && (
                <>
                    <div className={c1}>{Corner}</div>
                    <div className={c2}>{Corner}</div>
                    <div className={c3}>{Corner}</div>
                    <div className={c4}>{Corner}</div>
                </>
            )}
        </div>
    );
});
export const Footer = (props: { useCorners: boolean, children: any }) => {
    const layout = useLayout();
    return (
        <XView position="relative" width="100%" height={56} alignItems="center" justifyContent="center">
            {props.children}
            {layout === 'desktop' && props.useCorners && (
                <>
                    <div className={cf1}>{Corner}</div>
                    <div className={cf2}>{Corner}</div>
                </>
            )}
        </XView>
    );
};

export const sharedItemMenu = (ctx: UPopperController, item: SharedItem) => {
    const builder = new UPopperMenuBuilder();
    builder.item({
        title: 'Forward', icon: <ForwardIcon />, onClick: () => {
            showChatPicker(id => {
                // TODO: handle
            });
        }
    });
    return builder.build(ctx);
};

const FileIconContainer = css`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    margin-right: 16px;
    justify-content: center;
`;
const FileIconTextClass = css`
position: absolute;
    z-index: 1;
    bottom: 6px;
    color: var(--foregroundContrast);
`;
const DocumentContetContainer = css`
    display: flex;
    width: 100%;
    height: 56px;
    padding: 8px 16px;
    flex-direction: row;
    margin: 0 -16px;
    border-radius: 8px;
    :hover {
        background-color: var(--backgroundTertiary);
        .menu-container{
            opacity: 1;
        }
    }
`;
const MenuContainer = css`
    opacity: 0;
`;

// TODO: add animations from messages, extract single component
// prevent hide active umore button 
const DocumentContet = (props: { item: SharedItemFile }) => {
    const menuClick = React.useCallback((ctx: UPopperController) => {
        return sharedItemMenu(ctx, props.item);
    }, []);
    return (
        <div className={DocumentContetContainer}>
            <div className={FileIconContainer}>
                {fileIcon[fileFormat(props.item.attach.fileMetadata.name)]}
                <div className={cx(TextDetail, FileIconTextClass)} color="var(--foregroundContrast)">{fileFormat(props.item.attach.fileMetadata.name)}</div>
            </div>
            <XView flexDirection="column" flexGrow={1}>
                <XView {...TextStyles.Label1} color="var(--foregroundPrimary)">{props.item.attach.fileMetadata.name}</XView>
                <XView {...TextStyles.Caption} color="var(--foregroundSecondary)">{`${formatBytes(props.item.attach.fileMetadata.size)}  ·  ${props.item.sender.name}`}</XView>
            </XView>
            <div className={cx('menu-container', MenuContainer)}>
                <UMoreButton menu={menuClick} />
            </div>
        </div>
    );
};

const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SharedMediaContainerClass = css`
    display: flex;
    justify-content: 'flex-start';
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 15px;
`;
const SharedMediaContainerMobileClass = css`
    margin: 0 -1px;
`;
const SharedMediaContainerHiddenClass = css`
    display: none;
`;
export const SharedMedia = React.memo(React.forwardRef((props: SharedMediaProps, ref: React.RefObject<Paginated>) => {

    const client = useClient();
    const [loading, setLoadin] = React.useState(false);
    const [data, setData] = React.useState<SharedItem[]>([]);
    const [after, setAfter] = React.useState<string | null>();
    const loadMore = React.useCallback(async () => {
        if (after || after === undefined && !loading) {
            setLoadin(true);
            let res = await client.querySharedMedia({ chatId: props.chatId, after, mediaTypes: props.mediaTypes, first: 30 });
            console.warn(res);
            let nextAfter: string | undefined = undefined;
            setData(currentData => res.sharedMedia.edges.reduce((attaches, next) => {
                nextAfter = next.cursor;
                if (next.node.message.__typename === 'GeneralMessage') {
                    let sender = next.node.message.sender;
                    let d = new Date(Number.parseInt(next.node.message.date, 10));
                    let date = monthsFull[d.getMonth()] + ' ' + d.getFullYear();
                    for (let attach of next.node.message.attachments) {
                        if (attach.__typename === 'MessageAttachmentFile' || attach.__typename === 'MessageRichAttachment') {
                            attaches.push({ sender, date, attach });
                        }
                    }
                }
                return attaches;
            }, currentData));
            setAfter(res.sharedMedia.pageInfo.hasNextPage ? nextAfter : null);
            setLoadin(false);
        }
    }, [after, loading]);

    React.useImperativeHandle(ref, () => ({ loadMore }));
    // load first batch on first show
    React.useEffect(() => {
        if (props.active && data.length === 0) {
            (async () => loadMore())();
        }
    }, [props.active]);
    const layout = useLayout();
    const items = [];
    let lastDate: string | undefined;
    for (let i of data) {
        if (lastDate !== i.date) {
            lastDate = i.date;
            items.push(<DateDivider date={i.date} useCorners={props.mediaTypes.includes(SharedMediaType.IMAGE)} />);
        }
        // wtf check index on backend, it apperars that non-image can appear in SharedMediaType.IMAGE
        if (props.mediaTypes.includes(SharedMediaType.IMAGE)) {
            if (i.attach.__typename === 'MessageAttachmentFile' && i.attach.fileMetadata.isImage) {
                items.push(<MediaContent item={i as SharedItemFile} />);
            }
        } else {
            if (i.attach.__typename === 'MessageAttachmentFile') {
                items.push(<DocumentContet item={i as SharedItemFile} />);
            } else {
                items.push(<XView padding={8} flexGrow={1}> {JSON.stringify(i)} </XView>);
            }

        }
    }
    return (
        <div className={cx(SharedMediaContainerClass, layout === 'mobile' && SharedMediaContainerMobileClass, !props.active && SharedMediaContainerHiddenClass)}>
            {items}
            <Footer useCorners={props.mediaTypes.includes(SharedMediaType.IMAGE)}>
                {loading && <XLoader />}
            </Footer>
        </div>
    );
}));

const MenuIcons = {
    'Media': <MediaIcon />,
    'Files': <FileIcon />,
    'Links': <LinkIcon />,
};

const TabsMenuMobile = React.memo((props: { items: (TabItem & { icon: React.ReactElement })[], selectTab: (tab: string) => void, ctx: UPopperController }) => {
    const builder = new UPopperMenuBuilder();
    props.items.map(i => ({ ...i, title: (<XView flexDirection="row">{i.title}<XView color="var(--foregroundTertiary)" marginLeft={8}>{i.counter}</XView></XView>), onClick: () => props.selectTab(i.title) })).map(builder.item);
    return builder.build(props.ctx);
});

const TabsMenuMobileButton = (props: { menu: (ctx: UPopperController) => JSX.Element, selected: string }) => {
    const [, menuShow] = usePopper({ placement: 'bottom-end', marginTop: -56, marginRight: -8 }, props.menu);
    return (
        <XView {...TextStyles.Label1} color="var(--foregroundSecondary)" flexDirection="row" onClick={menuShow} paddingVertical={16} alignItems="center" >
            <XView marginRight={10}>{props.selected}</XView><UIcon size={16} icon={<DropIcon />} />
        </XView>
    );
};

const loadMoreThreshold = 200;
export const SharedMediaFragment = () => {
    const client = useClient();
    const unicorn = useUnicorn();
    const counters = client.useWithoutLoaderSharedMediaCounters({ chatId: unicorn.id });
    const [items, selected, setSelected] = useTabs([
        ['Media', counters && (counters.counters.images)],
        ['Files', counters && counters.counters.documents + counters.counters.videos],
        ['Links', counters && counters.counters.links]
    ]);
    const paginatedMedia = React.useRef<Paginated>(null);
    const paginatedFiles = React.useRef<Paginated>(null);
    const paginatedLinks = React.useRef<Paginated>(null);
    const onScroll = React.useCallback((values: XScrollValues) => {
        const d = values.scrollHeight - (values.clientHeight + values.scrollTop);
        const paginated = (selected === 'Media' ? paginatedMedia : selected === 'Files' ? paginatedFiles : paginatedLinks).current;
        if (d < loadMoreThreshold && paginated) {
            paginated.loadMore();
        }
    }, [selected]);
    const layout = useLayout();

    return (
        <Page onScroll={onScroll} track={"SharedMedia"} >
            <UHeader
                documentTitle="Shared"
                titleView={(
                    <XView flexDirection="row" height={56} flexGrow={1}>
                        <XView paddingVertical={12} {...TextStyles.Title1}>Shared</XView>
                        <XView flexGrow={1} />
                        {counters && layout === 'desktop' && <Tabs tabs={items} setSelected={setSelected} justifyContent="flex-end" />}
                        {layout === 'mobile' && <TabsMenuMobileButton selected={selected} menu={ctx => <TabsMenuMobile selectTab={setSelected} items={items.map(i => ({ ...i, icon: MenuIcons[i.title] }))} ctx={ctx} />} />}
                    </XView>
                )}
            />
            <SharedMedia active={selected === 'Media'} mediaTypes={[SharedMediaType.IMAGE]} ref={paginatedMedia} chatId={unicorn.id} />
            {/* keep video in files until backend start sending video previews */}
            <SharedMedia active={selected === 'Files'} mediaTypes={[SharedMediaType.DOCUMENT, SharedMediaType.VIDEO]} ref={paginatedFiles} chatId={unicorn.id} />
            <SharedMedia active={selected === 'Links'} mediaTypes={[SharedMediaType.LINK]} ref={paginatedLinks} chatId={unicorn.id} />
        </Page>
    );
};