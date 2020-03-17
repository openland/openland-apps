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

export function useImageViewer(data: dataT): ImageViewerCb {
    let prevCursor = null;
    let nextCursor = null;
    let index = data.edges[0].index;
    let count = data.pageInfo.itemsCount;

    const getMsg = (i: number) => data.edges[i].node.message as messageT;

    let current = {
        fileId: (getMsg(0).attachments[0] as fileT).fileId,
        imageWidth: (getMsg(0).attachments[0] as fileT).fileMetadata.imageWidth || 0,
        imageHeight: (getMsg(0).attachments[0] as fileT).fileMetadata.imageHeight || 0,
        filePreview: (getMsg(0).attachments[0] as fileT).filePreview || '',
        date: parseInt(getMsg(0).date, 10),
        senderName: getMsg(0).sender.name,
    };

    if (data.edges.length === 3) {
        prevCursor = (data.edges[1].node.message as messageT).id;
        nextCursor = (data.edges[2].node.message as messageT).id;
    }

    if (data.edges.length === 2) {
        if (data.pageInfo.hasNextPage) {
            prevCursor = (data.edges[1].node.message as messageT).id;
        }
        if (data.pageInfo.hasPreviousPage) {
            nextCursor = (data.edges[1].node.message as messageT).id;
        }
    }

    return {
        hasPrevPage: data.pageInfo.hasNextPage,
        hasNextPage: data.pageInfo.hasPreviousPage,
        prevCursor: prevCursor,
        nextCursor: nextCursor,
        index: index,
        count: count,
        current: current,
    };
}
