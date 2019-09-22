import { DataSourceItem } from 'openland-y-utils/DataSource';
import * as Types from 'openland-api/Types';
import { Span } from 'openland-y-utils/spans/Span';
import { ReactionReduced } from 'openland-engines/reactions/types';

export interface SlideProcessed extends Types.SlideFragment {
    textSpans: Span[];
}

export interface DataSourceFeedPostItem extends DataSourceItem {
    type: 'post';
    id: string;
    date: number;
    author: Types.FeedPostAuthorFragment;
    edited: boolean;
    canEdit: boolean;
    commentsCount: number;
    fallback: string;
    reactions: Types.FeedItemFull_reactions[];
    reactionsReduced: ReactionReduced[];
    reactionsLabel: string;
    slides: SlideProcessed[];
}

export interface DataSourceFeedDateItem extends DataSourceItem {
    type: 'date';
    label: string;
}

export type DataSourceFeedItem = DataSourceFeedPostItem | DataSourceFeedDateItem;

export type SlideInputLocalAttachment = Types.GlobalSearch_items_User | Types.GlobalSearch_items_SharedRoom | Types.GlobalSearch_items_Organization;
export interface SlideInputLocal extends Types.SlideInput {
    key?: string;
    attachmentLocal?: SlideInputLocalAttachment;
}