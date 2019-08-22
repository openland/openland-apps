import * as express from 'express';
import * as bodyParser from 'body-parser';
import './all'; // Init registry
import { VideoRegistry } from './VideoRegistry';
import { renderVideo } from '@openland/react-video-renderer';
import { XStyleFactoryRegistry } from 'react-mental';
import { css } from 'glamor';
import { renderStaticOptimized } from 'glamor/server';
import * as ReactDOM from 'react-dom/server';
XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

const app = express();
app.post('/create', bodyParser.json(), (req, res) => {
    const name = req.body.name;
    const args = req.body.arguments;
    if (typeof name !== 'string') {
        throw new Error('name is not provided');
    }
    if (typeof args !== 'object') {
        throw new Error('arguments are not provided');
    }

    const video = VideoRegistry.resolve(name);

    (async () => {
        try {
            await renderVideo(video.el, {
                duration: video.duration,
                width: 360,
                height: 360,
                scale: 2,
                path: 'out.mp4',
                spriteRendering: false,
                customRenderer: (el) => {
                    let rendered = renderStaticOptimized(() => ReactDOM.renderToStaticMarkup(el));
                    return { body: rendered.html, css: rendered.css };
                }
            });
            res.send('ok!');
        } catch (e) {
            console.warn(e);
            // res.send('ok!');
        }
    })();
});

app.listen(3001, () => console.log(`Video Microservice is listening on port ${3001}!`));