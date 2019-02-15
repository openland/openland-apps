import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { Container } from './views/Container';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

export interface ServiceMessageDefaultProps {
    message?: string;
    theme: ConversationTheme;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    if (typeof props.message !== 'string') {
        return null;
    }

    return (
        <Container theme={props.theme}>
            <ASText
                color="#fff"
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
