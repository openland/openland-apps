import * as utils from './utils';
import * as path from 'path';
import * as measureApi from './measureApi';
import * as constants from './constants';

export const preparePage = async () => {
    const res = await utils.copyUserDirAndLaunchPuppeteer({
        userDataDir: path.join(utils.getProfilesDir(), constants.chromeProfile),
    });
    const browser = res.browser;

    const page = await browser.newPage();
    return { browser, page };
};

export const runMeasureAndDump = async ({
    measureName,
    puppeteerWork,
}: {
    measureName: string;
    puppeteerWork: () => Promise<any>;
}) => {
    const res = await puppeteerWork();
    await measureApi.writeMeasure({ measureName, value: res });
};
