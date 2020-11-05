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
    prev?: currentT[];
    next?: currentT[];
    current: currentT[];
}

export function useImageViewer(data: dataT, currentId: string, inverted?: boolean): ImageViewerCb {
    let hasPrev = false;
    let hasNext = false;
    let prevCursor = null;
    let nextCursor = null;
    let prev;
    let next;

    let current;

    const getMsg = (i: number) => data.edges[i].node.message as messageT;
    const messageToData = (m: messageT) => m.attachments.map(attach => (
        {
            fileId: (attach as fileT).fileId,
            imageWidth: (attach as fileT).fileMetadata.imageWidth || 0,
            imageHeight: (attach as fileT).fileMetadata.imageHeight || 0,
            filePreview: (attach as fileT).filePreview || '',
            date: parseInt(m.date, 10),
            senderName: m.sender.name,
        }
    ));
    const setCurrent = (i: number) => {
        current = messageToData(getMsg(i));
    };
    setCurrent(0);

    if (data.edges.length === 3) {
        hasPrev = true;
        hasNext = true;
        setCurrent(1);

        prev = getMsg(2);
        prevCursor = prev.id;
        next = getMsg(0);
        nextCursor = next.id;
        if (inverted) {
            prev = getMsg(0);
            prevCursor = prev.id;
            next = getMsg(2);
            nextCursor = next.id;
        }
    }

    if (data.edges.length === 2 && !inverted) {
        if (getMsg(1).id === currentId) {
            setCurrent(1);
            next = getMsg(0);
            nextCursor = next.id;
            hasNext = true;
        }
        if (getMsg(0).id === currentId) {
            prev = getMsg(1);
            prevCursor = prev.id;
            hasPrev = true;
        }
    }

    if (data.edges.length === 2 && inverted) {
        if (getMsg(1).id === currentId) {
            setCurrent(1);
            prev = getMsg(0);
            prevCursor = prev.id;
            hasPrev = true;
        }
        if (getMsg(0).id === currentId) {
            next = getMsg(1);
            nextCursor = next.id;
            hasNext = true;
        }
    }

    return {
        hasPrevPage: hasPrev,
        hasNextPage: hasNext,
        prevCursor,
        nextCursor,
        prev: prev ? messageToData(prev) : undefined,
        next: next ? messageToData(next) : undefined,
        current: (current as any) as currentT[],
    };
}
