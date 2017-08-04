import * as React from 'react';
import { Segment, Label, Container } from 'semantic-ui-react';

export interface CardProps {
    title: string;
    description?: string;
    source?: { title: string, link: string };
}

export function Card(props: React.Props<{}> & CardProps) {
    return (
        <Segment>
            {props.description != null && (
                <span>{props.description}</span>
            )}
            {props.description == null && (
                <Label attached="top left">{props.title}</Label>
            )}
            {props.children}
            {props.source != null && (
                <Container textAlign="right">
                    <a href={props.source.link}>Source: {props.source.title}</a>
                </Container>
            )}
        </Segment>
    );
}