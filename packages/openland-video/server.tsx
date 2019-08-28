import * as React from 'react';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import './all'; // Init registry
import { VideoRender } from './VideoRender';
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
import * as fs from 'fs';
import fetch, { Request } from 'node-fetch';
import { unlink as unlinkRaw, createReadStream } from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

const exec = util.promisify(execRaw);
const unlink = util.promisify(unlinkRaw);

XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

const baseCss = `
.x {
    display: flex;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
}
`;

const app = express();
app.post('/create', bodyParser.json(), (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const args = req.body.arguments;
    if (typeof name !== 'string') {
        throw new Error('name is not provided');
    }
    if (typeof args !== 'object') {
        throw new Error('arguments are not provided');
    }

    const video = VideoRegistry.resolve(name);
    const batchSize = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE, 10) : 50;

    (async () => {
        try {
            const tmpFile = await new Promise<string>((resolve, reject) => tmp.file({ postfix: '.mp4' }, (err, path) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(path);
                }
            }));
            const fps = 30;

            try {
                await renderVideo(<VideoRender name={name} />, {
                    duration: video.duration / 1000,
                    width: 360,
                    height: 360,
                    scale: 2,
                    path: tmpFile,
                    fps: fps,
                    batchSize: batchSize,
                    customRenderer: (el) => {
                        let rendered = renderStaticOptimized(() => ReactDOM.renderToStaticMarkup(el));
                        return { body: rendered.html, css: baseCss + rendered.css };
                    },
                    customScreenshoter: async (src, dst, width, height, scale) => {
                        let start = Date.now();
                        let contents = fs.readFileSync(src, 'utf8');
                        console.log('requested');
                        let screenshot = await fetch(new Request('http://35.202.176.43/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                src: contents,
                                width: width,
                                height: height,
                                scale: scale
                            })
                        }));
                        console.log('Screenshotted in ' + (Date.now() - start) + ' ms');
                        start = Date.now();
                        const fileStream = fs.createWriteStream(dst);
                        await new Promise((resolve, reject) => {
                            screenshot.body.pipe(fileStream);
                            screenshot.body.on("error", (err) => {
                                reject(err);
                            });
                            fileStream.on("finish", function () {
                                resolve();
                            });
                        });
                        console.log('Screenshot Saved in ' + (Date.now() - start) + ' ms (' + dst + ')');
                    },
                    customEncoder: async (count, width, height, dir, out) => {
                        let start = Date.now();
                        if (process.platform === 'darwin') {
                            await exec(`./utils/splitter-macos -dir=${dir} -width=${width} -height=${height} -count=${count}`);
                        } else {
                            await exec(`/app/splitter-linux-amd64 -dir=${dir} -width=${width} -height=${height} -count=${count}`);
                        }
                        console.log('Frames split in ' + (Date.now() - start) + ' ms');
                        start = Date.now();
                        await new Promise((resolve, reject) => {
                            ffmpeg(dir + '/frame-%d.png')
                                .inputOption('-r ' + fps)
                                .outputOption('-pix_fmt yuv420p')
                                .outputOption('-r ' + fps)
                                .output(out)
                                .withSize(`${width}x${height}`)
                                .on('end', () => {
                                    resolve();
                                })
                                .on('error', (e) => {
                                    reject(e);
                                })
                                .run();
                        });
                        console.log('Video encoded in ' + (Date.now() - start) + ' ms');
                    }
                });

                // Upload
                let form = new FormData();
                form.append('UPLOADCARE_STORE', '1');
                form.append('UPLOADCARE_PUB_KEY', 'b70227616b5eac21ba88');
                form.append('file', createReadStream(tmpFile));

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