const files = require('./_files.json');
const cp = require('child_process');
const fs = require('fs');

(async function doConvert() {
    for (let i of files.icons) {
        for (let s of i.sizes) {
            if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + '.png')) {
                fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + '.png');
            }
            if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@2x.png')) {
                fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@2x.png');
            }
            if (fs.existsSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@3x.png')) {
                fs.unlinkSync('packages/openland-mobile/assets/' + i.src + '-' + s + '@3x.png');
            }
            let proc1 = cp.exec('rsvg-convert -w ' + s + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '.png');
            let proc2 = cp.exec('rsvg-convert -w ' + (s * 2) + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '@2x.png');
            let proc3 = cp.exec('rsvg-convert -w ' + (s * 3) + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '@3x.png');
            await new Promise((r) => proc1.on('exit', () => {
                r();
            }));
            await new Promise((r) => proc2.on('exit', () => {
                r();
            }));
            await new Promise((r) => proc3.on('exit', () => {
                r();
            }));
        }
    }
})();