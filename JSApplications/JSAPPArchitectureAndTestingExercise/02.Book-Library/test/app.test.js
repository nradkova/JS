const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const DEBUG = false;

const mockData = require('./mock-data.json');

const endpoints = {
    getAllBooks: '/jsonstore/collections/books',
    addBook: '/jsonstore/collections/books',
    editBook: '/jsonstore/collections/books/',
    deleteBook: '/jsonstore/collections/books/'
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
        this.timeout(20000);
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

    describe('load books', () => {
        it('show all books', async () => {
            const endpoint = '**' + endpoints.getAllBooks;
            page.route(endpoint, route => route.fulfill(json(mockData)));

            await page.goto(host);

            await Promise.all([
                page.waitForResponse(endpoint),
                page.click('text=LOAD ALL BOOKS')
            ])

            const [firstBook, firstAuthor] = await page.$$eval('td', t => t.map(s => s.textContent));
            assert.equal('AAA', firstAuthor);
            assert.equal('aaa', firstBook);

        });
    })
    
    describe('add book', () => {
        it('add makes correct API call', async () => {
            const endpoint = '**' + endpoints.addBook;
            const author = 'CCC';
            const title = 'ccc';

            page.route(endpoint, route => route.fulfill(json({ author, title })));

            await page.goto(host);

            const form = await page.waitForSelector('[id="createForm"]')
            await page.fill('[name="title"]', title);
            await page.fill('[name="author"]', author);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('text=Submit')
            ]);

            const postData = JSON.parse(response.request().postData());
            assert.equal(author, postData.author);
            assert.equal(title, postData.title);

            let authorInput = await page.$eval('[name="author"]', el => el.value);
            let contentInput = await page.$eval('[name="title"]', el => el.value);

            assert.equal('', authorInput);
            assert.equal('', contentInput);
        });

        it('no API call is made with incomplete input data', async () => {
            const endpoint = '**' + endpoints.addBook;
            const author = '';
            const title = 'ccc';

            page.route(endpoint, route => route.fulfill(json({ author, title })));

            await page.goto(host);

            const form = await page.waitForSelector('[id="createForm"]');

            await page.fill('[name="title"]', title);
            await page.fill('[name="author"]', author);

            await page.click('text=Submit');

            let authorInput = await page.$eval('[name="author"]', el => el.value);
            let contentInput = await page.$eval('[name="title"]', el => el.value);

            assert.equal(author, authorInput);
            assert.equal(title, contentInput);
        });
    });

    describe('CRUD', () => {
        beforeEach(async () => {
            const endpoint = '**' + endpoints.getAllBooks;
            page.route(endpoint, route => route.fulfill(json(mockData)));

            await page.goto(host);

            await Promise.all([
                page.waitForResponse(endpoint),
                page.click('text=LOAD ALL BOOKS')
            ])
        });

        it('edit makes correct API call', async () => {
            const endpoint = '**' + endpoints.editBook + '1';
            const author = 'CCC';
            const title = 'ccc';
            page.route(endpoint, route => route.fulfill(json({ author, title })));

            await page.click('text=Edit');
            await page.waitForSelector('[id="editForm"]');

            await page.fill('[id="editForm"] >> [name="title"]', title);
            await page.fill('[id="editForm"] >> [name="author"]', author);

            const [request] = await Promise.all([
                page.waitForRequest(endpoint),
                page.click('text=Save')
            ]);

            assert.equal(request.method(), 'PUT');
        });

        it('delete makes correct API call', async () => {
            const endpoint = '**' + endpoints.deleteBook + '1';

            page.on('dialog', dialog => dialog.accept());

            const [request] = await Promise.all([
                page.waitForRequest(endpoint),
                page.click('text=Delete')
            ]);

            assert.equal(request.method(), 'DELETE');
        });
    });
});
