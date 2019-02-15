import * as React from 'react';
import { Container } from './views/Container';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from '../../../styles/AppStyles';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

export interface ServiceMessageTitleChangedProps {
    title: string;
    theme: ConversationTheme;
}

export const ServiceMessageTitleChanged = (props: ServiceMessageTitleChangedProps) => {
    return (
        <Container theme={props.theme}>
            New room name: <ASText fontWeight={TextStyles.weight.medium}>{props.title}</ASText>
        </Container>
    );
};
