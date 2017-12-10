import * as compression from 'compression';
import * as express from 'express';
import * as next from 'next';
import { redirectToHTTPS } from 'express-http-to-https';
import * as proxy from 'http-proxy-middleware';
import { RequestHandler } from 'express';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev, dir: __dirname });
const handle = app.getRequestHandler();
const endpoint = process.env.API_ENDPOINT || 'http://localhost:9000';

async function start() {
    await app.prepare();
    const server = express();
    server.use(compression() as RequestHandler);
    if (process.env.NODE_ENV === 'production') {
        server.use(redirectToHTTPS());
    }

    server.get('/config.js', (req, res) => {
        res.send('window.server = { "endpoint": "' + endpoint + '" }');
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) { throw err; }
        // tslint:disable
        console.log(`> Ready on http://localhost:${port}`);
        // tslint:enable
    });
}

start();