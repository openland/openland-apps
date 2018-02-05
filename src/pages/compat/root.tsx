import * as React from 'react';

require('../../components/Navigation/withPage');

export default class Redirect extends React.Component {
    static async getInitialProps(ctx: any) {
        if (ctx.res) {
            ctx.res.writeHead(302, {Location: '/sf'});
            ctx.res.end();
        } else {
            document.location.pathname = '/sf';
        }
        return {};
    }

    render() {
        return <div/>;
    }
}