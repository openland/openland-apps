import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { Container } from './views/Container';

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
