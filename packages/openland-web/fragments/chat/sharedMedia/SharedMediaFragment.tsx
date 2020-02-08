import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile, SharedMediaType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_sender, SharedMedia_sharedMedia_edges_node_message } from 'openland-api/spacex.types';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView, XViewRouter } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { TextTitle3, TextStyles } from 'openland-web/utils/TextStyles';
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
import { showChatPicker } from '../showChatPicker';
import { MediaContent } from './MediaContent';
import { DocContent } from './DocContent';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { convertPartialMessage } from 'openland-engines/messenger/ConversationEngine';
import { RichContent } from './RichContent';

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
    dateRaw: string;
    message: SharedMedia_sharedMedia_edges_node_message;
}

export interface SharedItemFile extends SharedItem {
    attach: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;
}

export interface SharedItemRich extends SharedItem {
    attach: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment;
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

export const sharedItemMenu = (messenger: MessengerEngine, router: XViewRouter, ctx: UPopperController, item: SharedItem) => {
    const builder = new UPopperMenuBuilder();
    builder.item({
        title: 'Forward', icon: <ForwardIcon />, onClick: () => {
            showChatPicker(id => {
                if (item.message.__typename !== 'GeneralMessage') {
                    return;
                }
                messenger.forward([convertPartialMessage(item.message, 'somewhere', messenger)], id);
                router.navigate('/mail/' + id);
            });
        }
    });
    return builder.build(ctx);
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

export const Placeholder = (props: { mediaTypes: SharedMediaType[]; }) => {
    return (
        <XView flexDirection="column" alignItems="center" justifyContent="center" height="calc(100vh - 56px)" width="100%">
            <img
                height={200}
                src="https://cdn.openland.com/shared/art/art-shared.png"
                srcSet="https://cdn.openland.com/shared/art/art-shared@2x.png 2x, https://cdn.openland.com/shared/art/art-shared@3x.png 3x"
            />
            <XView {...TextStyles.Title1} color="var(--foregroundPrimary)" marginTop={12} >{props.mediaTypes.includes(SharedMediaType.IMAGE) ? 'No media yet' : props.mediaTypes.includes(SharedMediaType.LINK) ? 'No links yet' : 'No files yet'}</XView>
            <XView {...TextStyles.Body} color="var(--foregroundSecondary)" marginTop={8} >{props.mediaTypes.includes(SharedMediaType.IMAGE) ? 'Share photos and videos in this chat, and they will appear here' : props.mediaTypes.includes(SharedMediaType.LINK) ? 'Share links in this chat, and they will appear here' : 'Share files in this chat, and they will appear here'}</XView>
        </XView>
    );
};

export const SharedMedia = React.memo(React.forwardRef((props: SharedMediaProps, ref: React.RefObject<Paginated>) => {
    const client = useClient();
    const [loading, setLoadin] = React.useState(false);
    const [data, setData] = React.useState<SharedItem[]>([]);
    const [after, setAfter] = React.useState<string | null>();
    const loadMore = React.useCallback(async () => {
        if ((after || after === undefined) && !loading) {
            setLoadin(true);
            let res = await client.querySharedMedia({ chatId: props.chatId, after, mediaTypes: props.mediaTypes, first: 30 });
            let nextAfter: string | undefined = undefined;
            setData(currentData => res.sharedMedia.edges.reduce((attaches, next) => {
                nextAfter = next.cursor;
                if (next.node.message.__typename === 'GeneralMessage') {
                    let sender = next.node.message.sender;
                    let d = new Date(Number.parseInt(next.node.message.date, 10));
                    let date = monthsFull[d.getMonth()] + ' ' + d.getFullYear();
                    for (let attach of next.node.message.attachments) {
                        if (attach.__typename === 'MessageAttachmentFile' || attach.__typename === 'MessageRichAttachment') {
                            attaches.push({ sender, date, attach, message: next.node.message, dateRaw: next.node.message.date });
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
                items.push(<DocContent item={i as SharedItemFile} />);
            } else if (i.attach.__typename === 'MessageRichAttachment') {
                items.push(<RichContent item={i as SharedItemRich} />);
            } else {
                items.push(<XView padding={8} flexGrow={1}>Unknown content</XView>);
            }

        }
    }
    const initialLoading = loading && items.length === 0;
    const isEmpty = !loading && items.length === 0;
    return (
        <div className={cx(SharedMediaContainerClass, layout === 'mobile' && SharedMediaContainerMobileClass, !props.active && SharedMediaContainerHiddenClass)}>
            {items}
            {initialLoading && <XView flexGrow={1} height="calc(100vh - 56px)"><XLoader loading={true} /></XView>}
            {isEmpty && <Placeholder mediaTypes={props.mediaTypes} />}
            {!initialLoading && !isEmpty && <Footer useCorners={props.mediaTypes.includes(SharedMediaType.IMAGE)}>
                {loading && <XLoader loading={true} />}
            </Footer>}
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
    const counters = client.useSharedMediaCounters({ chatId: unicorn.id }, { suspense: false });
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
