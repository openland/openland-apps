import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage, SharedMediaType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import * as humanize from 'humanize';
import { DataSource } from 'openland-y-utils/DataSource';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export enum SharedMediaItemType {
    MEDIA = 'MEDIA',
    DOCUMENT = 'DOCUMENT',
    LINK = 'LINK',
}

export interface DataSourceSharedMediaDateItem {
    key: string;
    dateLabel: string;
    type: 'date';
    isFirst: boolean;
}

export interface DataSourceSharedDocumentItem {
    key: string;
    type: SharedMediaItemType.DOCUMENT;
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
    dateLabel: string;
    attachment: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;
}

export interface DataSourceSharedMediaRow {
    key: string;
    type: SharedMediaItemType.MEDIA;
    dateLabel: string;
    messages: SharedMedia_sharedMedia_edges_node_message_GeneralMessage[];
    entries: { message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage, attachment: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile }[];
}

export interface DataSourceSharedLinkItem {
    key: string;
    type: SharedMediaItemType.LINK;
    dateLabel: string;
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
    attachment: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment;
}

export type SharedMediaDataSourceItem = DataSourceSharedMediaDateItem | DataSourceSharedDocumentItem | DataSourceSharedMediaRow | DataSourceSharedLinkItem;

type MediaRowOrDateItem = DataSourceSharedMediaRow | DataSourceSharedMediaDateItem;

const makeDateLabel = (date: string) => humanize.date('F Y', parseInt(date, 10) / 1000);

export class SharedMediaEngine {
    readonly dataSource: DataSource<SharedMediaDataSourceItem>;
    readonly client: OpenlandClient;
    readonly chatId: string;
    readonly mediaType: SharedMediaItemType;
    readonly typesToFetch: SharedMediaType[];

    numColumns = 3;
    itemsPerPage = 10;
    isLoading = false;

    cursor?: string;
    hasNextPage?: boolean;

    constructor(client: OpenlandClient, chatId: string, type: SharedMediaItemType) {
        this.client = client;
        this.chatId = chatId;
        this.mediaType = type;

        if (type === SharedMediaItemType.MEDIA) {
            this.itemsPerPage = 6 * this.numColumns;
        }

        const typesMap = {
            [SharedMediaItemType.MEDIA]: [SharedMediaType.IMAGE],
            [SharedMediaItemType.DOCUMENT]: [SharedMediaType.DOCUMENT, SharedMediaType.VIDEO],
            [SharedMediaItemType.LINK]: [SharedMediaType.LINK],
        };

        this.typesToFetch = typesMap[this.mediaType];

        this.dataSource = new DataSource(() => {
            this.loadMore();
        }, () => {
            // do nothing
        });
    }

    start = async () => {
        this.isLoading = true;
        const data = await this.client.querySharedMedia({
            chatId: this.chatId,
            mediaTypes: this.typesToFetch,
            first: this.itemsPerPage,
        }, { fetchPolicy: 'network-only' });
        const { edges, pageInfo } = data.sharedMedia;

        const messages = edges.map(edge => edge.node.message) as SharedMedia_sharedMedia_edges_node_message_GeneralMessage[];
        let items = messages
            .reduce((acc, m) => {
                for (let a of m.attachments) {
                    const dateLabel = makeDateLabel(m.date);
                    const last = acc[acc.length - 1];
                    if (!last) {
                        acc.push({ key: dateLabel, dateLabel, type: 'date', isFirst: true });
                    } else if (last.dateLabel !== dateLabel) {
                        acc.push({ key: dateLabel, dateLabel, type: 'date', isFirst: false });
                    }

                    if (this.mediaType === SharedMediaItemType.MEDIA) {
                        if (a.__typename === 'MessageAttachmentFile') {
                            this.addMediaMessage(acc as MediaRowOrDateItem[], m, a);
                        }
                    } else if (this.mediaType === SharedMediaItemType.DOCUMENT) {
                        if (a.__typename === 'MessageAttachmentFile') {
                            acc.push({
                                key: m.id,
                                type: this.mediaType,
                                dateLabel,
                                message: m,
                                attachment: a
                            });
                        }
                    } else if (this.mediaType === SharedMediaItemType.LINK) {
                        if (a.__typename === 'MessageRichAttachment') {
                            acc.push({
                                key: m.id,
                                type: this.mediaType,
                                dateLabel,
                                message: m,
                                attachment: a
                            });
                        }
                    }
                }

                return acc;
            }, [] as SharedMediaDataSourceItem[]);

        const lastEdge = edges[edges.length - 1];
        this.cursor = String(lastEdge && lastEdge.cursor);
        this.hasNextPage = pageInfo.hasNextPage;

        this.dataSource.initialize(items, !this.hasNextPage, true);
        this.isLoading = false;
    }

    destroy() {
        this.dataSource.destroy();
    }

    loadMore = async () => {
        if (this.hasNextPage && !this.isLoading) {
            this.isLoading = true;
            const data = await this.client.querySharedMedia({
                chatId: this.chatId,
                mediaTypes: this.typesToFetch,
                first: this.itemsPerPage,
                after: this.cursor
            }, { fetchPolicy: 'network-only' });
            const { edges, pageInfo } = data.sharedMedia;
            const messages = edges.map(edge => edge.node.message);
            const items = messages
                .reduce((acc, m) => {
                    if (m.__typename !== 'GeneralMessage') {
                        return acc;
                    }
                    const dateLabel = makeDateLabel(m.date);
                    const last = acc[acc.length - 1];

                    const existingLast = this.dataSource.getAt(this.dataSource.getSize() - 1);
                    for (let a of m.attachments) {
                        let delta = existingLast.type === SharedMediaItemType.MEDIA ? this.numColumns - existingLast.messages.length : 0;

                        if (!last && existingLast.dateLabel !== dateLabel) {
                            acc.push({ key: dateLabel, dateLabel, type: 'date', isFirst: false });
                            console.warn("push 1");
                            delta = 0;
                        } else if (last && last.dateLabel !== dateLabel) {
                            acc.push({ key: dateLabel, dateLabel, type: 'date', isFirst: false });
                            console.warn("push 2");
                        }

                        if (this.mediaType === SharedMediaItemType.MEDIA) {
                            if (a.__typename === 'MessageAttachmentFile') {
                                if (delta > 0) {
                                    (existingLast as DataSourceSharedMediaRow).messages.push(m);
                                    (existingLast as DataSourceSharedMediaRow).entries.push({ message: m, attachment: a });
                                    this.dataSource.updateItem(existingLast);
                                } else {
                                    this.addMediaMessage(acc as MediaRowOrDateItem[], m, a);
                                }
                            }
                        } else if (this.mediaType === SharedMediaItemType.DOCUMENT) {
                            if (a.__typename === 'MessageAttachmentFile') {
                                acc.push({
                                    key: m.id,
                                    type: this.mediaType,
                                    dateLabel,
                                    message: m,
                                    attachment: a
                                });
                            }
                        } else if (this.mediaType === SharedMediaItemType.LINK) {
                            if (a.__typename === 'MessageRichAttachment') {
                                acc.push({
                                    key: m.id,
                                    type: this.mediaType,
                                    dateLabel,
                                    message: m,
                                    attachment: a
                                });
                            }

                        }
                    }

                    return acc;
                }, [] as SharedMediaDataSourceItem[]);

            const lastEdge = edges[edges.length - 1];
            this.cursor = String(lastEdge && lastEdge.cursor);
            this.hasNextPage = pageInfo.hasNextPage;
            console.warn(items.length);

            this.dataSource.loadedMore(items, !this.hasNextPage);
            this.isLoading = false;
        }

    }

    addMediaMessage(items: MediaRowOrDateItem[], message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage, attachment: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile) {
        const last = items[items.length - 1];
        const dateLabel = makeDateLabel(message.date);
        if (!last || last.type === 'date' || last.dateLabel !== dateLabel || last.messages.length === this.numColumns) {
            const newItem = {
                key: message.id,
                type: SharedMediaItemType.MEDIA as SharedMediaItemType.MEDIA,
                dateLabel,
                messages: [message],
                entries: [{ message, attachment }]
            };
            items.push(newItem);
        } else {
            last.messages.push(message);
            last.entries.push({ message, attachment });
        }
    }
}