const files = require('./_files.json');
const cp = require('child_process');

(async function doConvert() {
    for (let i of files.icons) {
        for (let s of i.sizes) {
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