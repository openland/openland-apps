import * as utils from './utils';
import * as math from './math';
import * as constants from './constants';
import * as puppeteerApi from './puppeteerApi';

const NUMBER_OF_MEASURES = 10;

export const goToSiteAndWaitItToLoad = async ({
    page,
    baseUrl = constants.baseUrl,
}: {
    page: any;
    baseUrl?: string;
}) => {
    await page.goto(baseUrl);
    const listOfDialogsClassName = '.title';
    await page.waitForSelector(listOfDialogsClassName);
};

export const clickDialogByName = async ({
    dialogName,
    page,
}: {
    dialogName: any;
    page: any;
}) => {
    return page.evaluate((myDialogName: any) => {
        const elem = [].slice
            .call(document.querySelectorAll('.title'))
            .find((el: any) => {
                return el.childNodes[0].textContent === myDialogName;
            });

        return elem.parentNode.click();
    }, dialogName);
};

export const clickAndWaitDialodLoad = async ({
    page,
    dialogName,
    pauseFunction = utils.delay,
}: {
    page: any;
    dialogName: any;
    pauseFunction?: Function;
}) => {
    await clickDialogByName({
        dialogName,
        page,
    });
    await pauseFunction(10);
    await page.waitFor(
        () =>
            document.querySelectorAll('.full-message, .compact-message').length,
    );
};

export const checkLoadingOfChannels = async ({
    dialogsPair,
    numberOfMeasures = NUMBER_OF_MEASURES,
}: {
    dialogsPair: string[];
    numberOfMeasures?: number;
}) => {
    const result = await utils.runAndMeasureAsyncAction({
        array: utils.repeatArray(['Bugs'], numberOfMeasures),
        someAsyncAction: async (
            dialogName: string,
            startMeasure: Function,
            endMeasure: Function,
            pauseFunction: Function,
        ) => {
            const { page, browser } = await puppeteerApi.preparePage();
            await goToSiteAndWaitItToLoad({ page });
            await utils.delay(100);
            await clickAndWaitDialodLoad({
                dialogName: '@openland/frontend',
                page,
            });
            startMeasure();
            await clickAndWaitDialodLoad({
                dialogName: 'Bugs',
                page,
                pauseFunction,
            });
            endMeasure();
            await utils.delay(200);
            await browser.close();
        },
    });

    return math.getMeanVarianceMedianAndRange(result);
};

export const checkTransitionsBetweenChannels = async ({
    dialogsPair,
    numberOfMeasures = NUMBER_OF_MEASURES,
}: {
    dialogsPair: string[];
    numberOfMeasures?: number;
}) => {
    const { page, browser } = await puppeteerApi.preparePage();

    await goToSiteAndWaitItToLoad({ page });
    // await utils.runAndMeasureAsyncAction({
    //     array: utils.repeatArray(dialogsPair, 1),
    //     someAsyncAction: async (dialogName: string) => {
    //         await clickAndWaitDialodLoad({
    //             dialogName,
    //             page,
    //         });
    //     },
    // });

    // const result = await utils.runAndMeasureAsyncAction({
    //     array: utils.repeatArray(dialogsPair, numberOfMeasures),
    //     someAsyncAction: async (
    //         dialogName: string,
    //         startMeasure: Function,
    //         endMeasure: Function,
    //         pauseFunction: Function,
    //     ) => {
    //         startMeasure();
    //         await clickAndWaitDialodLoad({
    //             dialogName,
    //             page,
    //             pauseFunction,
    //         });
    //         endMeasure();
    //     },
    // });

    await browser.close();

    // return math.getMeanVarianceMedianAndRange(result);
};
