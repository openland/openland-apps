import * as React from 'react';
import { withData } from '../components/withData';
import { ErrorPage } from '../components/ErrorPage';

export default withData('Error', class Error extends React.Component<{ statusCode: number | null }> {
    static async getInitialProps(ctx: any) {
        const statusCode = ctx.res ? ctx.res.statusCode : ctx.err ? ctx.err.statusCode : null;
        return { statusCode };
    }
    render() {
        return <ErrorPage statusCode={this.props.statusCode} />;
    }
});