import * as React from 'react';
import { FullMessage_GeneralMessage } from 'openland-api/Types';
import { View } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { extractContent } from './extractContent';

export interface ZMessageViewProps {
    message: FullMessage_GeneralMessage;
    size?: 'small' | 'default';
}

export const ZMessageView = React.memo<ZMessageViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { message } = props;

    const handleUserPress = React.useCallback((id: string) => {
        const router = getMessenger().history.navigationManager;

        router.push('ProfileUser', { id });
    }, []);

    const isSmall = props.size && props.size === 'small' ? true : false;
    const content = extractContent({
        theme,
        message,

        onUserPress: handleUserPress,
        onMediaPress: (fileMeta, event) => { return; },
        onDocumentPress: (document) => { return; },
    }, isSmall);

    return (
        <View>
            {content}
        </View>
    );
});