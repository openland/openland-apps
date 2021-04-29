const puppeteer = require('puppeteer')
const readline = require('readline')

// ids: joinRoomAuth, authEmail, authEmailNext, authEmailInput, authCodeInput-${i}, authCodeNext, joinRoom

let urlPath = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://next.openland.com'

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

(async () => {
    const username = await askQuestion('user id with chat:')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${urlPath}/${username.trim()}`)

    const click = (id) => page.waitForSelector(id).then(d => d.click());
    const loaded = () => page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await click('#joinRoomAuth')
    await loaded()
    await click('#authEmail')
    await loaded()
    const emailInput = await page.waitForSelector('#authEmailInput')
    await emailInput.focus();
    await delay(500)
    const email = await askQuestion('email is:')
    await emailInput.type(email.trim(), { delay: 50 })
    await click('#authEmailNext')
    await loaded()
    const codeInput = await page.waitForSelector('#authCodeInput-0')
    await codeInput.focus()
    await delay(500)
    const code = await askQuestion('code is:')
    await codeInput.type(code.trim(), { delay: 50 })
    await click('#authCodeNext')
    await loaded()
    await page.waitForSelector('#joinRoom', { visible: true })
    await click('#joinRoom')
})();