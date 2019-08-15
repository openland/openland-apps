import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { removeLineBreakers } from 'openland-y-utils/spans/removeLineBreakers';
import { cropSpecSymbols } from 'openland-y-utils/spans/cropSpecSymbols';
import { animUnicodeToName } from 'openland-y-utils/data/emoji-data';
import { emojiAnimated } from 'openland-y-utils/emojiAnimated';
import { ReactionUser } from 'openland-engines/reactions/types';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        if (size === 'huge' && animUnicodeToName.has(text)) {
            return emojiAnimated(text);
        }

        return emoji(text);
    },

    processReactionsLabel(users: ReactionUser[]) {
        let usersString = '';
        if (users.length > 0) {
            if (users.length === 1) {
                usersString = users[0].name;
            } else if (users.length === 2) {
                usersString = users[0].name + ' and ' + users[1].name;
            } else {
                const othersCount = users.length - 1;
                usersString = users[0].name + ` and ${othersCount} others`;
            }
        }

        return usersString;
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType) {
        return cropSpecSymbols(spans, parent, symbolObject);
    },

    removeLineBreakers(spans: Span[]) {
        return removeLineBreakers(spans, ['code_block']);
    }
};