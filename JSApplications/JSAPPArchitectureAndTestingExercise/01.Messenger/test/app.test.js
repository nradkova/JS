const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const DEBUG = true;

const mockData = require('./mock-data.json');

const endpoints = {
    refresh: '/jsonstore/messenger',
    send: '/jsonstore/messenger'
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let browser;
let page;

describe('E2E tests', function () {
    if (DEBUG) {
        this.timeout(120000);
    } else {
        this.timeout(6000);
    }

    before(async () => {
        if (DEBUG) {
            browser = await chromium.launch({ headless: false, slowMo: 2000 });
        } else {
            browser = await chromium.launch();
        }
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    describe('load messages', () => {
        it('show all messages', async () => {
            const endpoint = '**' + endpoints.refresh;
            await page.route(endpoint, route => route.fulfill(json(mockData)));

            await page.goto(host);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('text=Refresh')
            ]);

            const value = await page.$eval('#messages', el => el.value);
            const expected = 'aaa: Hello\nbbb: Hello'
            assert.equal(value, expected)
        });
    });
    
    describe('send messages', () => {
        it('send makes correct API call', async () => {
            const endpoint = '**' + endpoints.refresh;
            const author = 'ccc';
            const content = 'Hi';

            await page.route(endpoint, route => route.fulfill(json({ author, content })));

            await page.goto(host);

            await page.fill('[id="author"]', author);
            await page.fill('[id="content"]', content);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[id="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            assert.equal(author, postData.author);
            assert.equal(content, postData.content);

            let authorInput = await page.$eval('#author', el => el.value);
            let contentInput = await page.$eval('#content', el => el.value);

            assert.equal('', authorInput);
            assert.equal('', contentInput);
        });
    });
});