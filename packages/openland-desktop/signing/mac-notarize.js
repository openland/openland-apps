require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    return await notarize({
        appBundleId: 'com.openland.mac',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: 'secure@openland.com',
        appleIdPassword: `oyzt-iksk-fwzb-oxbh`,
    });
};