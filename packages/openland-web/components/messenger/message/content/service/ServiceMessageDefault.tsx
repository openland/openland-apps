import * as React from 'react';
import { Container } from './views/Container';

export interface ServiceMessageDefaultProps {
    message: string;
    otherParams: any;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    return <Container>{props.message}</Container>;
};
