import * as React from 'react';

require('../../components/withPage');

export default class Redirect extends React.Component {
    static async getInitialProps(ctx: any) {
        if (ctx.res) {
            ctx.res.writeHead(302, {Location: '/projects'});
            ctx.res.end();
        } else {
            document.location.pathname = '/projects';
        }
    }

    render() {
        return <div/>;
    }
}