import * as React from 'react';
import { Clipboard, Text } from 'react-native';

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

    if (fullLength || isSmallText(text, maxCharacters, maxLineBreaks)) {
        return (
            <ZText
                text={text}
                linkify={true}
                style={{ ...TextStyles.Body, paddingHorizontal: 16 }}
            />
        );
    }

    return (
        <Text style={{ ...TextStyles.Body, paddingHorizontal: 16 }} onLongPress={handleLongPress}>
            <ZText text={getShortText(text, maxCharacters, maxLineBreaks)} linkify={true} />
            <Text
                style={{ ...TextStyles.Label1, color: theme.accentPrimary }}
                onPress={() => setFullLength(true)}
            >
                Show more
            </Text>
        </Text>
    );
});
