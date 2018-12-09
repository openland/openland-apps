import * as constants from './constants';

describe('Performance Test remote', async () => {
    it('check next', async () => {
        try {
            require.resolve('puppeteer');
            const openlandQueries = require('./openlandQueries');
            const puppeteerApi = require('./puppeteerApi');
            await puppeteerApi.runMeasureAndDump({
                measureName: 'next',
                puppeteerWork: async () => {
                    const res = await openlandQueries.checkTransitionsBetweenChannels(
                        {
                            dialogsPair: constants.dialogsPair,
                            numberOfMeasures: 4,
                        },
                    );

                    return res;
                },
            });
        } catch (err) {
            console.log(err);
        }
    });
});
