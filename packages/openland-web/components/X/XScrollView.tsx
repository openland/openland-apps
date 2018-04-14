import * as React from 'react';
import Glamorous from 'glamorous';

const ScrollView = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    // overflowY: 'scroll'
});

const ContainerInner = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
});

export function XScrollView(props: { children: any, className?: string }) {
    return (
        <ScrollView className={props.className}>
            <ContainerInner>
                {props.children}
            </ContainerInner>
        </ScrollView>
    );
}