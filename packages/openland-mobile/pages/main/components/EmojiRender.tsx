import * as React from 'react';
import { View, Text, Dimensions, TextStyle } from 'react-native';
import { TextStyles, AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ScrollView } from 'react-native-gesture-handler';
import { isAndroid } from 'openland-mobile/utils/isAndroid';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import emojiData from 'openland-y-utils/data/emoji-data';

export const findEmojiByShortname = (activeWord: string) => {
    let emojiMap = emojiData.shortToUnicode;
    let emojiFiltered: ({ shortname: string; unicode: string })[] = [];

    const COUNT_SUGGESTIONS_TO_SHOW = 100;

    for (let k of emojiMap.keys()) {
        if (emojiFiltered.length >= COUNT_SUGGESTIONS_TO_SHOW) {
            break;
        }

        if (k.toLowerCase().startsWith(activeWord.toLowerCase())) {
            emojiFiltered.push({ shortname: k, unicode: emojiMap.get(k) });
        }
    }

    return emojiFiltered.reverse();
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
            <>
                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
                <ScrollView keyboardShouldPersistTaps="always" maxHeight={186}>
                    <View height={6} />
                    {emojiFiltered.map((item, index) => {
                        let shortname = item.shortname;
                        let unicode = item.unicode;
        
                        return (
                            <ZListItemBase
                                key={'emoji-' + index}
                                onPress={() => props.onEmojiPress(props.activeWord, unicode)}
                                separator={false}
                                height={40}
                                underlayColor="rgba(0, 0, 0, 0.03)"
                            >
                                <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                                    <View paddingLeft={16} paddingRight={12} height={40} alignItems="center" justifyContent="center">
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                width: Dimensions.get('window').width - 63,
                                                fontWeight: TextStyles.weight.medium,
                                                color: theme.textColor
                                            } as TextStyle}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {unicode}{'   '}{shortname}
                                        </Text>
                                    </View>
                                </View>
                            </ZListItemBase>
                        )
                    })}
                    <View height={6} />
                </ScrollView>
                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
            </>
        );
    }

    return emojiWrapper;
}