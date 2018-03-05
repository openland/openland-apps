import * as React from 'react';

export default class Error extends React.Component<{ statusCode: number }> {
    static getInitialProps(ctx: any) {
        const statusCode = ctx.res ? ctx.res.statusCode : ctx.err ? ctx.err.statusCode : null;
        return { statusCode }
    }

    render() {
        return <div>{this.props.statusCode.toString()}</div>
    }
}