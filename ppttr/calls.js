const puppeteer = require('puppeteer')
const readline = require('readline')

// ids: joinRoomAuth, authEmail, authEmailNext, authEmailInput, authCodeInput-${i}, authCodeNext, authName, authNameNext, joinRoom
const isDev = process.env.NODE_ENV === 'dev'
const urlPath = isDev ? 'http://localhost:3000/' : 'https://next.openland.com/'

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const main = async (shortname) => {
    const userEmailCode = Math.floor(100000 + Math.random() * 900000)
    // const userEmailCode = 999999
    const userName = `test${userEmailCode}`
    const userEmail = `${userName}@openland.com`
    const userCode = userEmailCode.toString()[5].repeat(6)

    // const browser = await puppeteer.launch({ headless: isDev ? false : undefined })
    const browser = await puppeteer.connect({
        browserWSEndpoint: 'wss://chrome.browserless.io?token=6c11b2ba-17e0-49cf-85f7-0644d15cc1fa',
    })
    const page = await browser.newPage()
    await page.goto(`${urlPath}${shortname.trim()}`)

    console.log('page loaded')

    const click = (id) => page.waitForSelector(id, { visible: true }).then(d => d.click());
    const loaded = () => page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await click('#joinRoomAuth')
    await loaded()
    console.log('web login')

    await click('#authEmail')
    await loaded()

    console.log('email login')
    const emailInput = await page.waitForSelector('#authEmailInput')
    await emailInput.focus();
    await delay(500)
    await emailInput.type(userEmail, { delay: 50 })
    await click('#authEmailNext')
    await loaded()

    console.log('code page')
    const codeInput = await page.waitForSelector('#authCodeInput-0')
    await codeInput.focus()
    await delay(500)
    await codeInput.type(userCode, { delay: 50 })
    await loaded()

    if (page.url().search('createProfile') !== -1) {
        console.log('create user page')
        await page.waitForSelector('#authName')
        const nameInput = await page.waitForSelector('#authName')
        await nameInput.focus();
        await delay(500)
        await nameInput.type(userName, { delay: 50 })
        await click('#authNameNext')
        await loaded()
    }

    console.log('navigate to user')
    await page.waitForSelector('#joinRoom', { visible: true })
    await click('#joinRoom')
    await loaded()
    console.log('joined success')
}

(async () => {
    const iterations = await askQuestion('how iterations?:')
    const username = await askQuestion('user shortname with chat:')
    for (let i = 0; i < Number(iterations || 1); i++) {
        main(username)
    }
})()