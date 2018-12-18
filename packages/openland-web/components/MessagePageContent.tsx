import * as React from 'react';
import { XContent } from 'openland-x-layout/XContent';
import { XView } from 'react-mental';

export function MessagePageContent(props: { title: string; children?: any }) {
    return (
        <>
            <XView
                fontSize={24}
                color="#000000"
                fontWeight="600"
                flexDirection="row"
                justifyContent="center"
                marginBottom={12}
            >
                {props.title}
            </XView>
            <XContent>{props.children}</XContent>
        </>
    );
}
