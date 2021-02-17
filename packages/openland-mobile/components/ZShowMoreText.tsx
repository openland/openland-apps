import * as React from 'react';
import { Clipboard, Platform, Text, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

import { getShortText, isSmallText } from 'openland-y-utils/isSmallText';
import { ZText } from './ZText';
import { TextStyles } from '../styles/AppStyles';
import { ThemeContext } from '../themes/ThemeContext';
import ActionSheet from './ActionSheet';
import Toast from './Toast';

const MAX_CHARACTERS = 190;
const MAX_LINE_BREAKS = 5;

interface ZShowMoreProps {
    text: string;
    maxCharacters?: number;
    maxLineBreaks?: number;
}

export const ZShowMoreText = React.memo<ZShowMoreProps>((props) => {
    const { text, maxCharacters = MAX_CHARACTERS, maxLineBreaks = MAX_LINE_BREAKS } = props;
    const [fullLength, setFullLength] = React.useState(false);
    const theme = React.useContext(ThemeContext);

    const handleLongPress = React.useCallback(() => {
        ActionSheet.builder()
            .action('Copy', () => {
                Clipboard.setString(text);
                Toast.showCopied();
            }, undefined, require('assets/ic-copy-24.png'))
            .show(true);
    }, [text]);

    let content;
    if (fullLength || isSmallText(text, maxCharacters, maxLineBreaks)) {
        content = (
            <ZText
                text={text}
                linkify={true}
                style={{ ...TextStyles.Body, paddingHorizontal: 16, color: theme.foregroundPrimary }}
            />
        );
    } else {
        content = (
            <Text
                style={{ ...TextStyles.Body, paddingHorizontal: 16, color: theme.foregroundPrimary }}
            >
                <ZText text={getShortText(text, maxCharacters, maxLineBreaks)} linkify={true} />
                    <Text
                        allowFontScaling={false}
                        onPress={() => setFullLength(true)}
                        style={{ ...TextStyles.Label1, color: theme.accentPrimary }}
                    >
                        Show more
                    </Text>
            </Text>
        );
    }

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback
                onLongPress={handleLongPress}
                style={{ backgroundColor: theme.backgroundPrimary, paddingVertical: 6 }}
                background={TouchableNativeFeedback.Ripple(theme.backgroundPrimaryActive, false)}
                delayPressIn={20}
            >
                {content}
            </TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={theme.backgroundPrimaryActive}
                onLongPress={handleLongPress}
                style={{ backgroundColor: theme.backgroundPrimary, paddingVertical: 6 }}
            >
                {content}
            </TouchableHighlight>
        );
    }
});
