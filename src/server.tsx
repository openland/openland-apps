import * as compression from 'compression';
import * as express from 'express';
import * as next from 'next';
import { redirectToHTTPS } from 'express-http-to-https';
// import * as proxy from 'http-proxy-middleware';
import { RequestHandler } from 'express';
import * as Routes from './routes';
import { graphiqlExpress } from 'apollo-server-express';

const port = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev, dir: __dirname });
const handle = Routes.getRequestHandler(app);
const endpoint = process.env.API_ENDPOINT || 'http://localhost:9000';
const bindHost = dev ? 'localhost' : '0.0.0.0';

async function start() {
    await app.prepare();
    const server = express();
    server.use(compression() as RequestHandler);
    if (process.env.APP_REDIRECT_HTTPS === 'true') {
        server.use(redirectToHTTPS());
    }

    server.get('/config.js', (req, res) => {
        res.send('window.server = { "endpoint": "' + endpoint + '" }');
    });

    server.use('/sandbox', graphiqlExpress({ endpointURL: endpoint + '/api' }));

    server.get('*', handle);

    server.listen(port, bindHost, (err: any) => {
        if (err) { throw err; }
        // tslint:disable
        console.log(`> Ready on http://${bindHost}:${port}`);
        // tslint:enable
    });
}

// Hack for handling Ctrl-C
process.on('SIGINT', function () {
    process.exit();
});

start();