import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage, SharedMediaType } from 'openland-api/Types';
import * as humanize from 'humanize';
import { DataSource } from 'openland-y-utils/DataSource';
import { OpenlandClient } from 'openland-api/OpenlandClient';

export type SharedMediaItemType = 'document' | 'media' | 'link';

interface DataSourceSharedMediaDateItem {
    key: string;
    dateLabel: string;
    type: 'date';
}

interface DataSourceSharedDocumentItem {
    key: string;
    type: 'document';
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
    dateLabel: string;
}

interface DataSourceSharedMediaItem {
    key: string;
    type: 'media';
    dateLabel: string;
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
}

interface DataSourceSharedLinkItem {
    key: string;
    type: 'link';
    dateLabel: string;
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
}

export type SharedMediaDataSourceItem = DataSourceSharedMediaDateItem | DataSourceSharedDocumentItem | DataSourceSharedMediaItem | DataSourceSharedLinkItem;

const makeDateLabel = (date: string) => humanize.date('F Y', parseInt(date, 10) / 1000);

export class SharedMediaEngine {
    readonly dataSource: DataSource<any>;
    readonly client: OpenlandClient;
    readonly chatId: string;
    readonly mediaType: 'media' | 'document' | 'link';

    itemsPerPage = 10;
    isLoading = false;

    cursor?: string;
    hasNextPage?: boolean;

    constructor(client: OpenlandClient, chatId: string, type: SharedMediaItemType) {
        this.client = client;
        this.chatId = chatId;
        this.mediaType = type;

        const typesToFetch = {
            media: [SharedMediaType.IMAGE, SharedMediaType.VIDEO],
            document: [SharedMediaType.DOCUMENT],
            link: [SharedMediaType.LINK],
        };

        this.dataSource = new DataSource(() => {
            this.loadMore(typesToFetch[this.mediaType]);
        }, () => {
            // do nothing
        });

        this.start(typesToFetch[this.mediaType]);
    }

    start = async (mediaTypes: SharedMediaType[]) => {
        this.isLoading = true;
        const data = await this.client.querySharedMedia({
            chatId: this.chatId,
            mediaTypes,
            first: this.itemsPerPage,
        }, { fetchPolicy: 'network-only' });
        const { edges, pageInfo } = data.sharedMedia;

        const messages = edges.map(edge => edge.node.message) as SharedMedia_sharedMedia_edges_node_message_GeneralMessage[];
        const items = messages
            .reduce((acc, m) => {
                const dateLabel = makeDateLabel(m.date);
                const last = acc[acc.length - 1];
                if (!last) {
                    acc.push({ key: dateLabel, dateLabel, type: 'date' });
                } else if (last.dateLabel !== dateLabel) {
                    acc.push({ key: dateLabel, dateLabel, type: 'date' });
                }

                acc.push({
                    key: m.id,
                    type: this.mediaType,
                    dateLabel,
                    message: m,
                });
                return acc;
            }, [] as SharedMediaDataSourceItem[]);

        const lastEdge = edges[edges.length - 1];
        this.cursor = String(lastEdge && lastEdge.cursor);
        this.hasNextPage = pageInfo.hasNextPage;

        this.dataSource.initialize(items, !this.hasNextPage, true);
        this.isLoading = false;
    }

    loadMore = async (mediaTypes: SharedMediaType[]) => {
        if (this.hasNextPage || !this.isLoading) {
            this.isLoading = true;
            const data = await this.client.querySharedMedia({
                chatId: this.chatId,
                mediaTypes,
                first: this.itemsPerPage,
                after: this.cursor
            }, { fetchPolicy: 'network-only' });
            const { edges, pageInfo } = data.sharedMedia;

            const messages = edges.map(edge => edge.node.message) as SharedMedia_sharedMedia_edges_node_message_GeneralMessage[];
            const items = messages
                .reduce((acc, m) => {
                    const dateLabel = makeDateLabel(m.date);
                    const last = acc[acc.length - 1];

                    const existingLast = this.dataSource.getAt(this.dataSource.getSize() - 1);

                    if (!last && existingLast.date !== dateLabel) {
                        acc.push({ key: dateLabel, dateLabel, type: 'date' });
                    } else if (last && last.dateLabel !== dateLabel) {
                        acc.push({ key: dateLabel, dateLabel, type: 'date' });
                    }

                    acc.push({
                        key: m.id,
                        type: this.mediaType,
                        dateLabel,
                        message: m,
                    });

                    return acc;
                }, [] as SharedMediaDataSourceItem[]);

            const lastEdge = edges[edges.length - 1];
            this.cursor = String(lastEdge && lastEdge.cursor);
            this.hasNextPage = pageInfo.hasNextPage;

            this.dataSource.loadedMore(items, !this.hasNextPage);
            this.isLoading = false;
        }
    }
}