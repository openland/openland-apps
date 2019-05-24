import * as React from 'react';
import { View } from 'react-native';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import emojiData from 'openland-y-utils/data/emoji-data';
import { SuggestionsItemName, SuggestionsWrapper } from './Suggestions';

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
        const emojiMap = emojiData.shortToUnicode;
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
}

interface EmojiRenderProps {
    activeWord: string;
    redefineItems?: ({ shortname: string; unicode: string })[];

    onEmojiPress: (word: string | undefined, emoji: string) => void;
}

export const EmojiRender = (props: EmojiRenderProps) => {
    let theme = React.useContext(ThemeContext);
    let emojiWrapper = null;
    let emojiFiltered = props.redefineItems ? props.redefineItems : findEmojiByShortname(props.activeWord);

    if (emojiFiltered.length > 0) {
        emojiWrapper = (
            <SuggestionsWrapper>
                {emojiFiltered.map((item, index) => (
                    <ZListItemBase
                        key={'emoji-' + index}
                        onPress={() => props.onEmojiPress(props.activeWord, item.unicode)}
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

    return emojiWrapper;
}