import {
    PicSharedMedia_chatSharedMedia,
    PicSharedMedia_chatSharedMedia_edges_node_message_GeneralMessage,
    PicSharedMedia_chatSharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile,
} from 'openland-api/spacex.types';

type dataT = PicSharedMedia_chatSharedMedia;
type messageT = PicSharedMedia_chatSharedMedia_edges_node_message_GeneralMessage;
type fileT = PicSharedMedia_chatSharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;

export type currentT = {
    fileId: string;
    imageWidth: number;
    imageHeight: number;
    filePreview: string;
    date: number;
    senderName: string;
};

export interface ImageViewerCb {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevCursor: string | null;
    nextCursor: string | null;
    index: number;
    count: number;
    current: currentT;
}

export function useImageViewer(data: dataT, currentId: string): ImageViewerCb {
    let hasPrev = false;
    let hasNext = false;
    let prevCursor = null;
    let nextCursor = null;
    let index = data.edges[0].index;
    let count = data.pageInfo.itemsCount;

    let current;

    const getMsg = (i: number) => data.edges[i].node.message as messageT;

    const setCurrent = (i: number) => {
        current = {
            fileId: (getMsg(i).attachments[0] as fileT).fileId,
            imageWidth: (getMsg(i).attachments[0] as fileT).fileMetadata.imageWidth || 0,
            imageHeight: (getMsg(i).attachments[0] as fileT).fileMetadata.imageHeight || 0,
            filePreview: (getMsg(i).attachments[0] as fileT).filePreview || '',
            date: parseInt(getMsg(i).date, 10),
            senderName: getMsg(i).sender.name,
        };
        index = data.edges[i].index;
    };
    setCurrent(0);

    if (data.edges.length === 3) {
        hasPrev = true;
        hasNext = true;
        setCurrent(1);
        prevCursor = getMsg(2).id;
        nextCursor = getMsg(0).id;
    }

    if (data.edges.length === 2) {
        if (getMsg(1).id === currentId) {
            setCurrent(1);
            nextCursor = getMsg(0).id;
            hasNext = true;
        }
        if (getMsg(0).id === currentId) {
            prevCursor = getMsg(1).id;
            hasPrev = true;
        }
    }

    return {
        hasPrevPage: hasPrev,
        hasNextPage: hasNext,
        prevCursor: prevCursor,
        nextCursor: nextCursor,
        index: index,
        count: count,
        current: current as any as currentT,
    };
}
