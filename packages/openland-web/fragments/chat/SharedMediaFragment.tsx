import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile, SharedMediaType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_sender } from 'openland-api/Types';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView, XViewProps } from 'react-mental';
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
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

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

interface SharedItemMedia extends SharedItem {
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
export const DateDivider = React.memo((props: { date: string }) => {
    return (
        <div className={cx(DateClass, TextTitle3)}>
            {props.date}
            <div className={c1}>{Corner}</div>
            <div className={c2}>{Corner}</div>
            <div className={c3}>{Corner}</div>
            <div className={c4}>{Corner}</div>
        </div>
    );
});
export const Footer = () => (
    <XView position="relative" width="100%" height={56}>
        <div className={cf1}>{Corner}</div>
        <div className={cf2}>{Corner}</div>
    </XView>
);

const MediaItemClass = css`
    display: flex;
    width: 25%;    
    position: relative;
    @media (max-width: 750px) {
        width: calc(100% / 3);    
    }

    &:before {
        content: '';
        display: block;
        padding-top: 100%;
    }
`;
const MediaItemContentClass = css`
    position: absolute;
    top:1px;
    left: 1px;
    
    display: block;
    width: calc(100% - 2px);
`;
export const MediaItem = (props: { item: SharedItemMedia }) => {
    return (
        <div className={MediaItemClass}>
            <img src={`https://ucarecdn.com/${props.item.attach.fileId}/-/format/auto/-/scale_crop/138x138/smart/`} className={MediaItemContentClass} />
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
            items.push(<DateDivider date={i.date} />);
        }
        if (i.attach.__typename === 'MessageAttachmentFile' && i.attach.fileMetadata.isImage) {
            items.push(<MediaItem item={i as SharedItemMedia} />);
        } else {
            items.push(<XView padding={8} flexGrow={1}>
                {JSON.stringify(i)}
            </XView>);
        }
    }
    return (
        <div className={cx(SharedMediaContainerClass, layout === 'mobile' && SharedMediaContainerMobileClass, !props.active && SharedMediaContainerHiddenClass)}>
            {items}
            <Footer />
            {loading && (
                <XView width="100%" height={56} alignItems="center" justifyContent="center">
                    <XLoader />
                </XView>
            )}
        </div>
    );
}));

interface TabItem {
    title: string;
    counter?: number;
    selected: boolean;
}
const useTabs = (config: (string | [string, (number | null)?])[], initial?: string): [TabItem[], string, (key: string) => void] => {
    const conf = config.map(c => Array.isArray(c) ? c : [c, undefined]) as [string, number?][];
    const [selected, setSelected] = React.useState<string>(initial || conf[0][0]);
    const items = conf.map((item, index) => ({ title: item[0], counter: item[1], selected: !selected ? index === 0 : item[0] === selected }));
    return [items, selected, setSelected];
};

const TabClass = css`
    display: flex;
    flex-direction: row;
    padding: 16px 8px;
    color: var(--foregroundSecondary);
    :hover{
        color: var(--foregroundPrimary);
    }
    cursor: pointer;
    user-select: none;    
`;

const TabSelectedClass = css`
    color: var(--foregroundPrimary);
`;

const Tab = React.memo((props: TabItem & { setSelected: (tabKey: String) => void, innerRef: React.RefObject<HTMLDivElement> }) => {
    const onClick = React.useCallback(() => props.setSelected(props.title), []);
    return (
        <div onClick={onClick} className={cx(TextTitle3, TabClass, props.selected && TabSelectedClass)} ref={props.innerRef}>
            {props.title} <XView marginLeft={4} color="var(--foregroundTertiary)">{props.counter}</XView>
        </div>
    );
});

const TabLineClass = css`
    position: absolute;
    border-radius: 0px 0px 100px 100px;
    height: 2px;
    width: 48px;
    top: 0;
    left: 8px;
    background: var(--foregroundPrimary);
    will-change: transform, width;
    transition: width 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99), transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);

`;
const Tabs = React.memo((props: { tabs: TabItem[], setSelected: (tabKey: String) => void } & XViewProps) => {
    let { tabs, setSelected, ...style } = props;
    const refs = React.useMemo<React.RefObject<HTMLDivElement>[]>(() => props.tabs.map(_ => React.createRef()), [props.tabs.length]);
    const lineRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (lineRef.current) {
            let index = props.tabs.findIndex(t => t.selected);
            let currentTabRef = refs[index];
            if (index === -1) {
                lineRef.current.style.display = 'none';
            } else {
                lineRef.current.style.transform = `translateX(${refs.reduce((offset, next, i) => offset + ((i < index && next.current) ? next.current!.clientWidth : 0), 0)}px)`;
                if (currentTabRef.current) {
                    lineRef.current.style.width = `${currentTabRef.current.offsetWidth - 16}px`;

                }
            }
        }
    }, [props.selected, props.tabs]);
    return (
        <XView flexDirection="row" height={56} {...style}>
            <div ref={lineRef} className={TabLineClass} />
            {tabs.map((t, i) => <Tab key={t.title} innerRef={refs[i]} {...t} setSelected={setSelected} />)}
        </XView>
    );
});

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
    const [_, menuShow] = usePopper({ placement: 'bottom-end', marginTop: -56, marginRight: -8 }, props.menu);
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
