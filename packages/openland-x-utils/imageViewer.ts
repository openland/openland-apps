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
    let index = 0;
    let count = data.pageInfo.itemsCount;

    const getMsg = (i: number) => data.edges[i].node.message as messageT;

    let current: currentT = {
        fileId: (getMsg(0).attachments[0] as fileT).fileId,
        imageWidth: (getMsg(0).attachments[0] as fileT).fileMetadata.imageWidth || 0,
        imageHeight: (getMsg(0).attachments[0] as fileT).fileMetadata.imageHeight || 0,
        filePreview: (getMsg(0).attachments[0] as fileT).filePreview || '',
        date: parseInt(getMsg(0).date, 10),
        senderName: getMsg(0).sender.name,
    };

    if (data.edges.length === 3) {
        hasNext = true;
        hasPrev = true;
        current = {
            fileId: (getMsg(1).attachments[0] as fileT).fileId,
            imageWidth: (getMsg(1).attachments[0] as fileT).fileMetadata.imageWidth || 0,
            imageHeight: (getMsg(1).attachments[0] as fileT).fileMetadata.imageHeight || 0,
            filePreview: (getMsg(1).attachments[0] as fileT).filePreview || '',
            date: parseInt(getMsg(1).date, 10),
            senderName: getMsg(1).sender.name,
        };
        index = data.edges[1].index;
        prevCursor = (data.edges[0].node.message as messageT).id;
        nextCursor = (data.edges[2].node.message as messageT).id;
    }

    if (data.edges.length === 2) {
        data.edges.map((i, j) => {
            if ((i.node.message as messageT).id === currentId) {
                current = {
                    fileId: (getMsg(j).attachments[0] as fileT).fileId,
                    imageWidth: (getMsg(j).attachments[0] as fileT).fileMetadata.imageWidth || 0,
                    imageHeight: (getMsg(j).attachments[0] as fileT).fileMetadata.imageHeight || 0,
                    filePreview: (getMsg(j).attachments[0] as fileT).filePreview || '',
                    date: parseInt(getMsg(j).date, 10),
                    senderName: getMsg(j).sender.name,
                };
                index = i.index;
                hasPrev = j === 1;
                hasNext = j === 0;

                if (hasPrev) {
                    prevCursor = getMsg(0).id;
                }
                if (hasNext) {
                    nextCursor = getMsg(1).id;
                }

                return;
            }
        });
    }

    return {
        hasNextPage: hasNext,
        hasPrevPage: hasPrev,
        prevCursor: prevCursor,
        nextCursor: nextCursor,
        index: index,
        count: count,
        current: current,
    };
}
