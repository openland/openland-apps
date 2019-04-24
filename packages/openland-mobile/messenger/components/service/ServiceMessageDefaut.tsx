import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPreprocessedText } from '../AsyncMessageContentView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASFlex } from 'react-native-async-view/ASFlex';

export interface ServiceMessageDefaultProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    theme: AppTheme;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    let text = (props.message.text || '').replace('\n', ' ');
    let preprocessed = preprocessText(text, props.message.spans);

    let parts = preprocessed.map((span, i) => renderPreprocessedText(span, i, props.message, props.theme, props.onUserPress));

    return (
        <ASFlex
            backgroundColor={props.theme.backgroundColor}
            flexDirection="column"

            alignItems="center"
        >
            <ASFlex
                marginTop={16}
                marginBottom={8}
                // backgroundColor="rgba(153,162,176,0.6)"
                // borderRadius={10}
                marginLeft={10}
                marginRight={10}
                flexDirection="column"
                alignItems="center"
            >
                <ASText
                    color={props.theme.textSecondaryColor}
                    fontSize={12}
                    lineHeight={17}
                    height={20}
                    marginLeft={6}
                    fontWeight={TextStyles.weight.medium}
                    marginRight={6}
                >
                    {parts}
                </ASText>
            </ASFlex >
        </ASFlex >
    );
};
