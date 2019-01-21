const files = require('./_files.json');
const cp = require('child_process');

(async function doConvert() {
    for (let i of files.icons) {
        for (let s of i.sizes) {
            let proc = cp.exec('rsvg-convert -w ' + s + ' ./packages/openland-mobile/assets/sources/' + i.src + ' -o ./packages/openland-mobile/assets/' + i.name + '-' + s + '.png');
            await new Promise((r) => proc.on('exit', () => {
                r();
            }));
        }
    }
})();