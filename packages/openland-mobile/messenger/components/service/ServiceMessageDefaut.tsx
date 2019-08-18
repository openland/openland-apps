import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { renderPreprocessedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export interface ServiceMessageDefaultProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    theme: ThemeGlobal;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    const { message, theme, onUserPress, onGroupPress } = props;
    let parts = renderPreprocessedText(message.textSpans, message, theme, onUserPress, onGroupPress);

    return (
        <ASFlex
            backgroundColor={props.theme.backgroundPrimary}
            flexDirection="column"
            alignItems="center"
        >
            <ASFlex
                marginTop={7}
                marginBottom={7}
                marginLeft={36}
                marginRight={36}
                flexDirection="column"
                alignItems="center"
            >
                <ASText
                    color={props.theme.foregroundSecondary}
                    fontSize={13}
                    lineHeight={18}
                    textAlign="center"
                >
                    {parts}
                </ASText>
            </ASFlex >
        </ASFlex >
    );
};
