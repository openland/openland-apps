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
import * as tmp from 'tmp';
import * as util from 'util';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import { unlink as unlinkRaw, createReadStream } from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

const exec = util.promisify(execRaw);
const unlink = util.promisify(unlinkRaw);

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
            const tmpFile = await new Promise<string>((resolve, reject) => tmp.file({ postfix: '.264' }, (err, path) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(path);
                }
            }));
            const fps = 24;

            try {
                await renderVideo(video.el, {
                    duration: video.duration,
                    width: 360,
                    height: 360,
                    scale: 2,
                    path: tmpFile,
                    fps: fps,
                    batchSize: 60,
                    customRenderer: (el) => {
                        let rendered = renderStaticOptimized(() => ReactDOM.renderToStaticMarkup(el));
                        return { body: rendered.html, css: rendered.css };
                    },
                    customScreenshoter: async (src, dst, width, height, scale) => {
                        await exec(`google-chrome-unstable --disable-dev-shm-usage --no-sandbox --disable-gpu --disable-software-rasterizer --headless --screenshot=${dst} --window-size=${width}x${height} --high-dpi-support=1 --force-device-scale-factor=${scale} --device-scale-factor=${scale} file://${src}`);
                    },
                    customEncoder: async (count, width, height, dir, out) => {
                        const start = Date.now();
                        await exec(`/app/encoder-linux-amd64 -width=${width} -height=${height} -out=${out} -dir=${dir} -count=${count}`);
                        console.log('Encoded in ' + (Date.now() - start) + ' ms');
                    }
                });

                const muxedFileName = await new Promise<string>((resolve, reject) => tmp.file({ postfix: '.mp4' }, (err, path) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(path);
                    }
                }));

                await new Promise<void>((resolve, reject) => {
                    ffmpeg(tmpFile)
                        .addInputOption(`-r ${fps}`)
                        .addOutputOption('-c copy')
                        .addOutput(muxedFileName)
                        .on('end', () => {
                            resolve();
                        })
                        .on('error', (e) => {
                            reject(e);
                        })
                        .run();
                });

                // Upload
                let form = new FormData();
                form.append('UPLOADCARE_STORE', '1');
                form.append('UPLOADCARE_PUB_KEY', 'b70227616b5eac21ba88');
                form.append('file', createReadStream(muxedFileName));

                let uploadRes = await fetch(
                    'https://upload.uploadcare.com/base/',
                    { method: 'POST', body: form }
                );

                res.send({ file: (await uploadRes.json()).file });
            } finally {
                unlink(tmpFile);
            }
        } catch (e) {
            console.warn(e);
            res.status(500)
                .send('Internal error');
        }
    })();
});

app.listen(3001, () => console.log(`Video Microservice is listening on port ${3001}!`));