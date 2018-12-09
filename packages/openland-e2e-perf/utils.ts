import * as os from 'os';
import * as Rsync from 'rsync';
import * as tmp from 'tmp';
import * as puppeteer from 'puppeteer';

export const repeatArray = (array: string[], repeatNumber: number) => {
    let res: string[] = [];

    for (let index = 0; index < repeatNumber; index++) {
        res = res.concat(array);
    }
    return res;
};

export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const runAndMeasureAsyncAction = async ({
    array,
    someAsyncAction,
}: {
    array: any[];
    someAsyncAction: any;
}) => {
    const result: any = [];
    let i = 0;
    for await (const iteratable of array) {
        await delay(1000);

        let hrstart: any;
        let pause = 0;

        await someAsyncAction(
            iteratable,
            () => {
                hrstart = process.hrtime();
            },
            () => {
                const hrend = process.hrtime(hrstart);
                const preciseMilliSeconds = hrend[1] / 1000000;
                const preciseWithoutPause = preciseMilliSeconds - pause;
                if (preciseWithoutPause < 0) {
                    console.log('drop negative measure');
                } else {
                    result.push(preciseWithoutPause);
                    if (i === 0) {
                        console.log(`execute on ${iteratable} 
  in ${preciseWithoutPause}
  `);
                    } else {
                        console.log(
                            `execute on: ${iteratable} 
  with previous: ${array[i - 1]} 
  in ${preciseWithoutPause}
  `,
                        );
                    }
                }
            },
            (pauseVal: number) => {
                pause += pauseVal;
            },
        );

        i++;
    }
    return result;
};

export const copyUserDirAndLaunchPuppeteer = async ({
    userDataDir,
}: {
    userDataDir: string;
}) => {
    // const { name: tempDir } = tmp.dirSync();

    // await copyFromTo({
    //     from: userDataDir + '/',
    //     to: tempDir,
    // });

    const browser = await puppeteer.launch({
        args: [
            "--proxy-server='direct://'",
            '--proxy-bypass-list=*',
            // `--user-data-dir=${tempDir}`,
        ],

        headless: false,
    });
    return { browser };
    // return { browser, tempDir };
};

export const getProfilesDir = () =>
    `${os.homedir()}/chrome-profiles-repository`;

export const copyFromTo = async ({
    from,
    to,
}: {
    from: string;
    to: string;
}) => {
    const rsync = new Rsync()
        .shell('ssh')
        .flags('az')
        .recursive()
        .source(from)
        .destination(to);

    await new Promise((resolve, reject) => {
        rsync.execute((error, code, cmd) => {
            if (error) {
                reject({ error, code });
            }
            resolve(code);
        });
    });
};
