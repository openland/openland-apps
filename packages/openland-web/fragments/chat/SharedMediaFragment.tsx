import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile, SharedMediaType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_sender } from 'openland-api/Types';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

interface SharedMediaProps {
    chatId: string;
    mediaTypes: SharedMediaType[];
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
export const DateDivider = React.memo((props: { date: string }) => {
    return (
        <div className={cx(DateClass, TextTitle3)}>{props.date}</div>
    );
});

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
export const SharedMedia = React.forwardRef((props: SharedMediaProps, ref: React.RefObject<Paginated>) => {

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
    React.useEffect(() => {
        (async () => loadMore())();
    }, []);
    const layout = useLayout();
    const items = [];
    let lastDate: string | undefined;
    for (let i of data) {
        if (lastDate !== i.date) {
            lastDate = i.date;
            items.push(<DateDivider date={i.date} />);
        }
        if (i.attach.__typename === 'MessageAttachmentFile') {
            items.push(<MediaItem item={i as SharedItemMedia} />);
        }
        // add other types here
    }
    return <>
        <XView justifyContent="flex-start" flexWrap="wrap" flexDirection="row" marginHorizontal={layout === 'mobile' ? -1 : 15}>
            {items}
        </XView>
        {loading && (
            <XView height={56} alignItems="center" justifyContent="center">
                <XLoader />
            </XView>
        )}</>;
});

const loadMoreThreshold = 200;
export const SharedMediaFragment = () => {
    // const client = useClient();
    const unicorn = useUnicorn();
    // const counters = client.useWithoutLoaderSharedMediaCounters({ chatId: unicorn.id });
    const paginatedChildRef = React.useRef<Paginated>(null);
    const onScroll = React.useCallback((values: XScrollValues) => {
        const d = values.scrollHeight - (values.clientHeight + values.scrollTop);
        if (d < loadMoreThreshold && paginatedChildRef.current) {
            paginatedChildRef.current.loadMore();
        }
    }, []);
    return (
        <Page onScroll={onScroll} track={"SharedMedia"} >
            <UHeader documentTitle="Shared" title="Shared" />
            <SharedMedia ref={paginatedChildRef} chatId={unicorn.id} mediaTypes={[SharedMediaType.IMAGE, SharedMediaType.VIDEO]} />
        </Page>
    );
};
