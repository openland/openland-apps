import { DataSourceItem } from 'openland-y-utils/DataSource';
import * as Types from 'openland-api/Types';
import { Span } from 'openland-y-utils/spans/Span';
import { ReactionReduced } from 'openland-engines/reactions/types';

export interface DataSourceFeedPostItem extends DataSourceItem {
    type: 'post';
    id: string;
    date: number;
    author: Types.FeedPostAuthorFragment;
    text?: string;
    edited: boolean;
    reactions: Types.FeedItemFull_reactions[];
    attachments: Types.FeedItemFull_attachments[];
    spans: Types.FeedItemFull_spans[];
    commentsCount: number;
    fallback: string;
    textSpans: Span[];
    reactionsReduced: ReactionReduced[];
    reactionsLabel: string;
}

export interface DataSourceFeedDateItem extends DataSourceItem {
    type: 'date';
    label: string;
}

export type DataSourceFeedItem = DataSourceFeedPostItem | DataSourceFeedDateItem;