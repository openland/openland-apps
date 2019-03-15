import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { Container } from './views/Container';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPrprocessedText } from '../AsyncMessageContentView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export interface ServiceMessageDefaultProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    let preprocessed = preprocessText(props.message.text || '', props.message.spans);

    let parts = preprocessed.map((p, i) => renderPrprocessedText(p, i, props.message, props.onUserPress));

    return (
        <Container>
            <ASText
                color={DefaultConversationTheme.serviceTextColor}
                fontSize={12}
                lineHeight={17}
                height={20}
                marginLeft={6}
                fontWeight={TextStyles.weight.medium}
                marginRight={6}
            >
                {parts}
            </ASText>
        </Container>
    );
};
