import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XIcon } from 'openland-x/XIcon';

const TargetContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    color: '#A7B8C4',
    '> i': {
        fontSize: 17
    }
});

const Content = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

interface XTooltipProps {
    title?: string;
    type?: 'info' | 'error' | 'warning';
}

export class XTooltipHint extends React.Component<XTooltipProps> {

    render() {

        let content: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            content.push(i);

        }

        return (
            <XPopper
                showOnHover={true}
                content={(
                    <Content> {content} </Content>
                )}
            >
                <TargetContent>
                    <XIcon icon={this.props.type ? this.props.type : 'error'} />
                </TargetContent>
            </XPopper>
        );
    }
}