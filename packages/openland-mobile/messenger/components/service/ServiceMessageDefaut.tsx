import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { renderPreprocessedText } from '../AsyncMessageContentView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

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
                marginTop={16}
                marginBottom={8}
                marginLeft={10}
                marginRight={10}
                flexDirection="column"
                alignItems="center"
            >
                <ASText
                    color={props.theme.foregroundSecondary}
                    fontSize={12}
                    lineHeight={17}
                    marginLeft={6}
                    fontWeight={TextStyles.weight.medium}
                    marginRight={6}
                    textAlign="center"
                >
                    {parts}
                </ASText>
            </ASFlex >
        </ASFlex >
    );
};
