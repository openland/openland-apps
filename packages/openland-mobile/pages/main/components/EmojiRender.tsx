import * as React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { shortToUnicode } from 'openland-y-utils/data/emoji-data';
import { SuggestionsItemName, SuggestionsWrapper } from './Suggestions';
import { EmojiWordCollectionType } from 'openland-y-utils/emojiWordMap';

interface EmojiSuggestion {
    shortname: string;
    unicode: string;
}

const defaultRecentEmoji: EmojiSuggestion[] = [
    { shortname: ':thumbsup:', unicode: '👍' },
    { shortname: ':kissing_heart:', unicode: '😘' },
    { shortname: ':grinning:', unicode: '😀' },
    { shortname: ':heart_eyes:', unicode: '😍' },
    { shortname: ':laughing:', unicode: '😆' },
    { shortname: ':joy:', unicode: '😂' },
    { shortname: ':stuck_out_tongue_winking_eye:', unicode: '😜' },
    { shortname: ':sweat_smile:', unicode: '😅' },
    { shortname: ':scream:', unicode: '😱' },
    { shortname: ':sleeping:', unicode: '😴' },
    { shortname: ':smile:', unicode: '😄' },
    { shortname: ':smiley:', unicode: '😃' },
];

export const findEmojiByShortname = (activeWord: string) => {
    if (activeWord === ':') {
        return defaultRecentEmoji;
    } else {
        const emojiMap = shortToUnicode;
        let res: EmojiSuggestion[] = [];

        for (let k of emojiMap.keys()) {
            if (res.length >= 20) {
                break;
            }

            if (k.toLowerCase().startsWith(activeWord.toLowerCase())) {
                res.push({ shortname: k, unicode: emojiMap.get(k) });
            }
        }

        res.sort((a, b) => a.shortname.localeCompare(b.shortname));

        return res;
    }
};

interface EmojiRenderProps {
    activeWord: string;
    redefineItems?: ({ shortname: string; unicode: string })[];

    onEmojiPress: (word: string | undefined, emoji: string) => void;
}

export const EmojiRender = (props: EmojiRenderProps) => {
    const { activeWord, redefineItems, onEmojiPress } = props;
    const theme = React.useContext(ThemeContext);
    const emojiFiltered = redefineItems ? redefineItems : findEmojiByShortname(activeWord);

    if (emojiFiltered.length > 0) {
        return (
            <SuggestionsWrapper>
                {emojiFiltered.map(item => (
                    <ZListItemBase
                        key={'emoji-' + item.unicode}
                        onPress={() => onEmojiPress(activeWord, item.unicode)}
                        separator={false}
                        height={40}
                        underlayColor="rgba(0, 0, 0, 0.03)"
                    >
                        <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                            <View paddingLeft={16} paddingRight={12} height={40} alignItems="center" justifyContent="center">
                                <SuggestionsItemName theme={theme} name={item.unicode + '   ' + item.shortname} />
                            </View>
                        </View>
                    </ZListItemBase>
                ))}
            </SuggestionsWrapper>
        );
    }

    return null;
};

interface EmojiRenderRowProps {
    activeWord: string;
    items: EmojiWordCollectionType;
    onEmojiPress: (word: string | undefined, emoji: string) => void;
}

export const EmojiRenderRow = (props: EmojiRenderRowProps) => {
    const { activeWord, items, onEmojiPress } = props;
    const theme = React.useContext(ThemeContext);

    if (items.length > 0) {
        return (
            <SuggestionsWrapper>
                <View height={40} width={Dimensions.get('screen').width} overflow="hidden" flexDirection="row" justifyContent="center">
                    {items.slice(0, 5).map(item => (
                        <TouchableOpacity
                            key={'emoji-' + item[2]}
                            onPress={() => onEmojiPress(activeWord, item[2])}
                        >
                            <View width={50} height={40} alignItems="center" justifyContent="center">
                                <Text style={{ fontSize: 26, color: theme.foregroundPrimary }} allowFontScaling={false}>
                                    {item[2]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </SuggestionsWrapper>
        );
    }

    return null;
};