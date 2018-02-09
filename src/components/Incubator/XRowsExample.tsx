import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../X/XButton';
import { XView } from '../X/XView';

interface XCardExampleProps {
    children?: any,
    headerTitle: string,
    headerDescription: string
}

export const Title = Glamorous.span({
    fontSize: '24px',
    lineHeight: '34px',
    fontWeight: 500,
})

export const Text = Glamorous.span({
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px'
})

export function XCardExample(props: XCardExampleProps) {
    return (
        <XView>
            <XView>
                <Title>
                    {props.headerTitle}
                </Title>
                <XView>
                    <Text>
                        {props.headerDescription}
                    </Text>
                    <a>description inline child components</a>
                </XView>
            </XView>
            <XView>
                <XView justifyContent="space-between" direction="row">
                    <Title>Header title example with component</Title>
                    <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                </XView>
                <XView>
                    <Text>{props.headerDescription}</Text>
                    <a>description column child components</a>
                </XView>
            </XView>
            <XView>
                <XView justifyContent="space-between" direction="row">
                    <XView>
                        <Text>{props.headerDescription}</Text>
                        <a>description column child components</a>
                    </XView>
                    <XView justifyContent="space-between" direction="row">
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                    </XView>
                </XView>
            </XView>
        </XView>
    )
}