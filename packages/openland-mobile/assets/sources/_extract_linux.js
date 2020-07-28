/*
this file will be maintained by @krigga
for whatever reason, _extract.js did not generate any files for me and simply stopped with no exception
I can only guess that rsvg-convert locks files from reading on linux and does not on mac (hence running it one process by one helped), but I have no proof for that
ignore this file if you are not using linux
*/

const files = require('./_files.json');
const cp = require('child_process');
const fs = require('fs');

(async function doConvert() {
    try {
        for (let i of files.icons) {
            console.log(i.src);
            let suffix = '.png';
            if (i.suffix) {
                suffix = '.' + i.suffix + '.png'
            }
            for (let s of i.sizes) {
                if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + suffix)) {
                    fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + suffix);
                }
                if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@2x' + suffix)) {
                    fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@2x' + suffix);
                }
                if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@3x' + suffix)) {
                    fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@3x' + suffix);
                }
                let proc1 = cp.exec('rsvg-convert -w ' + s + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + suffix);
                await new Promise((r) => proc1.on('exit', (code) => {
                    // console.log(code);
                    r();
                }));
                let proc2 = cp.exec('rsvg-convert -w ' + (s * 2) + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '@2x' + suffix);
                await new Promise((r) => proc2.on('exit', (code) => {
                    // console.log(code);
                    r();
                }));
                let proc3 = cp.exec('rsvg-convert -w ' + (s * 3) + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '@3x' + suffix);
                await new Promise((r) => proc3.on('exit', (code) => {
                    // console.log(code);
                    r();
                }));
            }
        }
    } catch (e) {
        console.warn(e);
    }
})();