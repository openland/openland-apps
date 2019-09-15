import { MessengerEngine } from '../MessengerEngine';
import * as Types from 'openland-api/Types';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';
import { isSameDate } from 'openland-engines/messenger/ConversationEngine';
import { DataSourceFeedDateItem, DataSourceFeedPostItem, DataSourceFeedItem } from './types';

export const convertPost = (src: Types.Feed_feed_items, engine: MessengerEngine): DataSourceFeedPostItem => {
    return {
        type: 'post',
        key: src.id,
        id: src.id,
        date: parseInt(src.date, 10),
        author: src.author,
        text: src.message || undefined,
        reactions: src.reactions,
        attachments: src.attachments,
        edited: src.edited,
        spans: src.spans,
        commentsCount: src.commentsCount,
        fallback: src.fallback || src.message || '',
        textSpans: src.message ? processSpans(src.message, src.spans) : [],
        reactionsReduced: reduceReactions(src.reactions, engine.user.id),
        reactionsLabel: getReactionsLabel(src.reactions, engine.user.id),
    };
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TODAY_LABEL = 'Today';
const YESTERDAY_LABEL = 'Yesterday';

export const convertDate = (src: string): DataSourceFeedDateItem => {
    const date = new Date(parseInt(src, 10));
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let now = new Date();
    let label = TODAY_LABEL;
    if (now.getFullYear() === year) {
        if (now.getMonth() === month && now.getDate() - 1 === day) {
            label = YESTERDAY_LABEL;
        } else if (now.getMonth() !== month || now.getDate() !== day) {
            label = MONTHS[month] + ' ' + day;
        }
    } else {
        label = year + ', ' + MONTHS[month] + ' ' + date;
    }

    return {
        type: 'date',
        key: `date-${year}-${month}-${day}`,
        label,
    };
};

export const convertItems = (items: Types.Feed_feed_items[], engine: MessengerEngine): DataSourceFeedItem[] => {
    const res: DataSourceFeedItem[] = [];
    let prevDate: string | undefined;

    items.map((i) => {
        if (i.__typename === 'FeedPost') {
            if (res.length <= 0) {
                const date = convertDate(i.date);

                if (date.label !== TODAY_LABEL) {
                    res.push(date);
                }
            }

            if (prevDate && !isSameDate(prevDate, i.date)) {
                res.push(convertDate(i.date));
            }

            res.push(convertPost(i, engine));

            prevDate = i.date;
        }
    });

    return res;
};