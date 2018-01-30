import * as React from 'react';

require('../../components/withPage');

export default class Redirect extends React.Component {
    static async getInitialProps(ctx: any) {
        if (ctx.res) {
            ctx.res.writeHead(302, {Location: '/sf/projects'});
            ctx.res.end();
        } else {
            document.location.pathname = '/sf/projects';
        }
    }

    render() {
        return <div/>;
    }
}