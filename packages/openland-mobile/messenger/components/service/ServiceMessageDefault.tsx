import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { Container } from './views/Container';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

export interface ServiceMessageDefaultProps {
    message?: string;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    if (typeof props.message !== 'string') {
        return null;
    }

    return (
        <Container>
            <ASText
                color={DefaultConversationTheme.serviceTextColor}
                fontSize={12}
                lineHeight={17}
                height={20}
                marginLeft={6}
                marginRight={6}
            >
                {props.message}
            </ASText>
        </Container>
    );
};
