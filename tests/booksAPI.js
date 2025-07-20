import request from 'supertest';
import { expect } from 'chai';
import assert from 'assert';

const baseUrl = process.env.BASE_URL || 'https://fakerestapi.azurewebsites.net';

describe('Book API Tests', function () {
    it('should get all books', async function () {
        const getBooksRes = await request(baseUrl)
            .get('/api/v1/Books')
            .expect(200);
        expect(getBooksRes.status).to.equal(200);
        expect(getBooksRes.body).to.be.an('array');
        expect(getBooksRes.body.length).to.be.greaterThan(0);
    });

    it('should create a new book', async function () {
        const postBookRes = await request(baseUrl)
            .post('/api/v1/Books')
            .send({
                id: 70,
                title: 'Book1',
                description: 'description',
                pageCount: 10,
                excerpt: 'string',
                publishDate: '2025-07-20T19:00:06.57Z'
            })
            .expect(200);
        expect(postBookRes.body).to.deep.include({
            id: 70,
            title: 'Book1',
            description: 'description',
            pageCount: 10,
            excerpt: 'string',
            publishDate: '2025-07-20T19:00:06.57Z'
        });
    });

    it('should get book by ID', async function () {
        const getBookByIdRes = await request(baseUrl)
            .get('/api/v1/Books/70')
            .expect(200);
        expect(getBookByIdRes.body.id).to.equal(70);
        expect(getBookByIdRes.body.title).to.equal('Book 70');
        expect(getBookByIdRes.body.pageCount).to.equal(7000);
        expect(getBookByIdRes.body.publishDate).to.contain('2025-05-11');
    });

    it('should update book by ID', async function () {
        const putBookRes = await request(baseUrl)
            .put('/api/v1/Books/70')
            .send({
                id: 70,
                title: 'Updated Book',
                description: 'Updated description',
                pageCount: 20,
                excerpt: 'Updated excerpt',
                publishDate: '2025-07-20T19:00:06.570Z'
            })
            .expect(200);
        assert.equal(putBookRes.status, 200);
        assert.equal(putBookRes.body.id, 70);
        assert.equal(putBookRes.body.title, 'Updated Book');
        assert.equal(putBookRes.body.description, 'Updated description');
        assert.equal(putBookRes.body.pageCount, 20);
        assert.equal(putBookRes.body.excerpt, 'Updated excerpt');
        assert.equal(putBookRes.body.publishDate, '2025-07-20T19:00:06.57Z');
    });

    it('should delete book by ID', async function () {
        const deleteBookRes = await request(baseUrl)
            .delete('/api/v1/Books/70')
            .expect(200);
        assert.equal(deleteBookRes.status, 200);
    });
});
