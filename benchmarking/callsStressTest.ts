import { OpenlandClient } from '../packages/openland-api/spacex';
import { WebEngine } from '@openland/spacex';
import { Definitions } from '../packages/openland-api/spacex.web';
import fetch from 'node-fetch';
import * as readline from 'readline';

const asyncRun = (cb: () => Promise<void>) => {
    (async () => {
        await cb();
    })();
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function backoff<T>(callback: () => Promise<T>): Promise<T> {
    while (true) {
        try {
            return await callback();
        } catch (e) {
            await delay(100);
        }
    }
}

const API_BASE = 'https://api.openland.com/';

function createClient(token?: string) {
    let engine = new WebEngine(Definitions, {
        endpoint: 'wss://api.openland.com/api',
        connectionParams: { ['x-openland-token']: token },
        protocol: 'openland',
    });
    return new OpenlandClient({ engine: engine });
}

async function apiCall(method: string, params: any) {
    let res = await fetch(API_BASE + method, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {'Content-Type': 'application/json'}
    });
    return await res.json();
}

async function fetchToken(userNo: number) {
    const userEmailCode = ('000000' + userNo.toString()).slice(-6);
    const authCode = userEmailCode[5].toString().repeat(6);
    const userName = `test${userEmailCode}`;
    const userEmail = `${userName}@openland.com`;

    let {session} = await apiCall('auth/sendCode', {
        email: userEmail
    });

    let {authToken} = await apiCall('auth/checkCode', {
        session,
        code: authCode
    });

    let {accessToken} = await apiCall('auth/getAccessToken', {
        session,
        authToken
    });

    return accessToken as string;
}

async function getClientForUser(userNo: number) {
    let token = await backoff(async () => await fetchToken(userNo));
    let client = createClient(token);

    // Create profile if needed
    let account = await backoff(() => client.queryAccount());
    if (!account.sessionState.isProfileCreated) {
        await backoff(async () => {
            await client.mutateProfileCreate({
                input: {
                    firstName: 'Test',
                    lastName: 'User'
                }
            });
        });
    }

    return client;
}

async function promt(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        }),
    );
}

async function promtNumber(query: string) {
    return parseInt(await promt(query), 10);
}

let joinedCount = 0;

async function handleUser(userNo: number, config: { voiceChatHolderShortName: string }) {
    let client = await getClientForUser(userNo);

    let shortName = await backoff(() => client.queryAuthResolveShortName({ shortname: config.voiceChatHolderShortName }));
    if (!shortName.item) {
        console.log('wrong shortname was provided');
        process.abort();
        return;
    }
    if (shortName.item.__typename !== 'User') {
        console.log(config.voiceChatHolderShortName, 'is not user');
        process.abort();
        return;
    }
    let holderId = shortName.item.id;
    let chatHolder = await backoff(() => client.queryUser({ userId: holderId }));
    if (!chatHolder.user.currentVoiceChat) {
        console.log('No active voice chat was found');
        process.abort();
        return;
    }

    let voiceChatId = chatHolder.user.currentVoiceChat.id;

    await backoff(() =>  client.mutateVoiceChatJoin({ id: voiceChatId }));
    let conference = await backoff(() => client.queryConference({ id: voiceChatId }));
    let conferenceId = conference.conference.id;
    let conferenceJoinRes = await backoff(() =>  client.mutateConferenceJoin({ id: conferenceId }));
    let peerId = conferenceJoinRes.conferenceJoin.peerId;

    asyncRun(async () => {
        await backoff(() =>  client.mutateConferenceKeepAlive({ id: conferenceId, peerId: peerId }));
        await delay(5000);
    });

    console.log('joined', ++joinedCount);
}

async function main() {
    let fromUserNo = await promtNumber('From user number:\n');
    const toUserNo = await promtNumber('To user number:\n');
    const username = await promt('User shortname with chat\n');

    for (let i = 0; i < toUserNo; i++) {
        handleUser(fromUserNo, { voiceChatHolderShortName: username });
        fromUserNo++;
    }
}

main();