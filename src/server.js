const compression = require('compression');
const express = require('express')
const next = require('next')
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(compression());
        if (process.env.NODE_ENV === 'production') {
            server.use(redirectToHTTPS());
        }

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })