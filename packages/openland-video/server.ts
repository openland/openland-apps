import * as express from 'express';
import * as bodyParser from 'body-parser';
import './all'; // Init registry
import { VideoRegistry } from './VideoRegistry';
import { renderVideo } from '@openland/react-video-renderer';
import { XStyleFactoryRegistry } from 'react-mental';
import { css } from 'glamor';
import { renderStaticOptimized } from 'glamor/server';
import * as ReactDOM from 'react-dom/server';
import { exec as execRaw } from 'child_process';
import * as util from 'util';
const exec = util.promisify(execRaw);

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
                fps: 20,
                batchSize: 60,
                customRenderer: (el) => {
                    let rendered = renderStaticOptimized(() => ReactDOM.renderToStaticMarkup(el));
                    return { body: rendered.html, css: rendered.css };
                },
                customScreenshoter: async (src, dst, width, height, scale) => {
                    await exec(`google-chrome-unstable --disable-dev-shm-usage --no-sandbox --disable-gpu --disable-software-rasterizer --headless --screenshot=${dst} --window-size=${width}x${height} --device-scale-factor=${scale} file://${src}`);
                },
                customEncoder: async (count, width, height, dir, out) => {
                    await exec(`/app/encoder-linux-amd64 -width=${width} -height=${height} -fps=${30} -out=${out} -dir=${dir} -count=${count}`);
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