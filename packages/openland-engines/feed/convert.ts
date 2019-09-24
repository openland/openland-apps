import { MessengerEngine } from '../MessengerEngine';
import * as Types from 'openland-api/Types';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';
import { isSameDate } from 'openland-engines/messenger/ConversationEngine';
import { DataSourceFeedDateItem, DataSourceFeedPostItem, DataSourceFeedItem, SlideProcessed, SlideInputLocal } from './types';
import UUID from 'uuid/v4';
import { findSpans } from 'openland-y-utils/findSpans';
import { PostSpanSymbolToType } from 'openland-y-utils/spans/Span';

export const convertSlides = (src: Types.FeedItemFull_slides[]): SlideProcessed[] => {
    return src.map(s => ({
        ...s,
        textSpans: s.text ? processSpans(s.text, s.spans) : [],
    }));
};

export const convertPost = (src: Types.Feed_feed_items, engine: MessengerEngine): DataSourceFeedPostItem => {
    return {
        type: 'post',
        key: src.id,
        id: src.id,
        date: parseInt(src.date, 10),
        author: src.author,
        reactions: src.reactions,
        edited: src.edited,
        canEdit: src.canEdit,
        commentsCount: src.commentsCount,
        message: src.message || undefined,
        fallback: src.fallback || '',
        reactionsReduced: reduceReactions(src.reactions, engine.user.id),
        reactionsLabel: getReactionsLabel(src.reactions, engine.user.id),
        slides: convertSlides(src.slides)
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

export const convertToSlideInputLocal = (src: Types.FeedItemFull): SlideInputLocal[] => {
    const res: SlideInputLocal[] = [];

    if (src.slides.length) {
        src.slides.map(slide => {
            if (slide.__typename === 'TextSlide') {
                res.push({
                    key: UUID(),
                    type: Types.SlideType.Text,
                    text: slide.text,
                    cover: slide.cover ? {
                        uuid: slide.cover.url.split('https://ucarecdn.com/')[1].split('/')[0],
                    } : null,
                    coverAlign: slide.coverAlign,
                    attachmentLocal: slide.attachments[0]
                });
            }
        });
    } else {
        res.push({
            key: UUID(),
            type: Types.SlideType.Text,
            text: src.message
        });
    }

    return res;
};

export const convertToSlideInput = (input: SlideInputLocal[]) => {
    const res: Types.SlideInput[] = [];
    const slides = input.map(i => ({ ...i }));

    for (let slide of slides) {
        slide.key = undefined;
        slide.text = slide.text && slide.text.length > 0 ? slide.text.trim() : undefined;

        const hasCover = slide.cover;
        const hasText = slide.text && slide.text.length > 0;
        const hasAttachment = slide.attachmentLocal;

        if (hasText) {
            slide.spans = findSpans(slide.text || '', PostSpanSymbolToType);
        } else {
            slide.text = undefined;
        }

        if (hasCover) {
            slide.coverAlign = hasText ? slide.coverAlign : Types.SlideCoverAlign.Cover;
        } else {
            slide.coverAlign = undefined;
        }

        if (hasAttachment) {
            slide.attachments = [slide.attachmentLocal!.id];
            slide.attachmentLocal = undefined;
        }

        if (hasCover || hasText || hasAttachment) {
            res.push(slide);
        }
    }

    return res;
};