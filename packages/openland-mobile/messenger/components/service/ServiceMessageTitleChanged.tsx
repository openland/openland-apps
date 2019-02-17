import * as React from 'react';
import { Container } from './views/Container';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from '../../../styles/AppStyles';

export interface ServiceMessageTitleChangedProps {
    title: string;
}

export const ServiceMessageTitleChanged = (props: ServiceMessageTitleChangedProps) => {
    return (
        <Container>
            New group name: <ASText fontWeight={TextStyles.weight.medium}>{props.title}</ASText>
        </Container>
    );
};
