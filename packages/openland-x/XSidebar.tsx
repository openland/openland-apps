import * as React from 'react';
import { XView } from 'react-mental';

export interface XSidebarProps {
    title?: string;
}

export function XSidebar(props: XSidebarProps) {
    return (
        <XView
            width={64}
            backgroundColor="#f6f6f6"
            flexGrow={1}
        >
            {}
        </XView>
    );
}