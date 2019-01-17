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
            New room name:{' '}
            <ASText
                color="#fff"
                fontWeight={TextStyles.weight.medium}
                fontSize={12}
                lineHeight={17}
                marginLeft={6}
                marginRight={6}
            >
                {props.title}
            </ASText>
        </Container>
    );
};
