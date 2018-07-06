import * as React from 'react';

export class MessageTextComponent extends React.PureComponent<{ message: string }> {
    render() {
        return <span>{this.props.message}</span>;
    }
}