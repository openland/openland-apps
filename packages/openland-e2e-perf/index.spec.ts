import * as puppeteerApi from './puppeteerApi';
import * as constants from './constants';
import * as openlandQueries from './openlandQueries';

describe('Performance Test remote', async () => {
    it('check next', async () => {
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
    });
});
