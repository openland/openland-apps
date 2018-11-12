import * as compression from 'compression';
import * as express from 'express';
import * as next from 'next';
import { redirectToHTTPS } from 'express-http-to-https';
import * as proxy from 'http-proxy-middleware';
import { RequestHandler } from 'express';
import * as Routes from './routes';
import { graphiqlExpress } from 'apollo-server-express';
import * as Morgan from 'morgan';
import * as url from 'url';

// tslint:disable
console.log('Starting...');
// tslint:enable

const port = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev, dir: __dirname });
const handle = Routes.getRequestHandler(app);
const endpoint = process.env.API_ENDPOINT || 'http://localhost:9000';
const bindHost = dev ? '0.0.0.0' : '0.0.0.0';

async function start() {
    await app.prepare();
    const server = express();

    //
    // Health
    //
    server.get('/status', (req, res) => res.send('Welcome to Openland!'));

    //
    // Enable Loggin
    //
    server.use(Morgan('tiny'));

    //
    // Compression
    //
    server.use(compression() as RequestHandler);

    //
    // Redirect
    //
    if (process.env.APP_REDIRECT_HTTPS === 'true') {
        server.use(redirectToHTTPS());
    }

    //
    // API Proxy
    //
    server.use('/graphql', proxy({
        changeOrigin: true,
        target: endpoint,
        ws: true,
        pathRewrite: function (path: string) {
            return '/api';
        }
    }));

    //
    // Auth API Proxy
    //
    server.use('/authenticate', proxy({
        changeOrigin: true,
        target: endpoint,
        pathRewrite: function (path: string) {
            return '/v2/auth';
        }
    }));

    //
    // GraphiQL Sandbox
    //
    server.use('/sandbox', graphiqlExpress(req => ({
        endpointURL: '/graphql',
        subscriptionsEndpoint: url.format({
            host: req!!.get('host'),
            protocol: req!!.get('host') !== 'localhost' ? 'wss' : 'ws',
            pathname: '/graphql'
        })
    })));

    //
    // Favicon support endpoint
    //
    server.get('/favicon.ico', (req, res) => res.sendFile(__dirname + '/static/favicon.ico'));
    server.get('/worker.js', (req, res) => res.sendFile(__dirname + '/worker.js'));
    server.get('/browserconfig.xml', (req, res) => res.sendFile(__dirname + '/static/browserconfig.xml'));

    //
    // Serving static directory
    //
    server.use('/static', express.static(__dirname + '/static', {
        maxAge: '1h'
    }));

    //
    // Main Handler
    //
    server.get('*', handle);

    //
    // Starting Server
    //
    server.listen(port, bindHost, (err: any) => {
        if (err) { throw err; }
        // tslint:disable
        console.log(`> Ready on http://${bindHost}:${port}`);
        // tslint:enable
    });
}

// Hack for handling Ctrl-C
process.on('SIGINT', function () {
    console.warn('Exiting: received SIGINT');
    process.exit();
});
process.on('SIGTERM', function () {
    console.warn('Exiting: received SIGTERM');
    process.exit();
});

start();