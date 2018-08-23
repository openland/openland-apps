import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';

const EmptySearchWrapper = Glamorous(XVertical)({
    paddingTop: 85,
    paddingBottom: 85
});

const EmptySearchBlockTitle = Glamorous.div({
    fontSize: 18,
    letterSpacing: -0.2,
    color: '#334562'
});

export class EmptySearchBlock extends React.Component {
    render() {
        return (
            <EmptySearchWrapper separator={12} alignItems="center">
                <XVertical separator={9}>
                    <img src="/static/X/directory-empty.svg" />
                    <EmptySearchBlockTitle>No results found</EmptySearchBlockTitle>
                </XVertical>
            </EmptySearchWrapper>
        );
    }
}