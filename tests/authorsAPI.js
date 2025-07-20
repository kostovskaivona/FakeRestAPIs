import request from 'supertest';
import { expect } from 'chai';
import assert from 'assert';

const baseUrl = 'https://fakerestapi.azurewebsites.net';

describe('Author API Tests', function () {
    it('should get all authors', async function () {
        const getAuthorsRes = await request(baseUrl)
            .get('/api/v1/Authors')
            .expect(res => {
                res.body.forEach(author => {
                    expect(author).to.have.property('id');
                    expect(author).to.have.property('idBook');
                    expect(author).to.have.property('firstName');
                    expect(author).to.have.property('lastName');
                });
            })
            .expect(200);
        expect(getAuthorsRes.status).to.equal(200);
        expect(getAuthorsRes.body).to.be.an('array');
        expect(getAuthorsRes.body.length).to.be.greaterThan(0);
    });

    it('should create a new author', async function () {
        const postAuthorRes = await request(baseUrl)
            .post('/api/v1/Authors')
            .send({
                id: 700,
                idBook: 177,
                firstName: 'Bono',
                lastName: 'TheDog'
            })
            .expect(200);
        expect(postAuthorRes.body).to.deep.include({
            id: 700,
            idBook: 177,
            firstName: 'Bono',
            lastName: 'TheDog'
        });
    });

    it('should get author by ID', async function () {
        const getAuthorByIdRes = await request(baseUrl)
            .get('/api/v1/Authors/70')
            .expect(200);
        expect(getAuthorByIdRes.body.id).to.equal(70);
        expect(getAuthorByIdRes.body.idBook).to.be.a('number');
        expect(getAuthorByIdRes.body.firstName).to.equal('First Name 70');
        expect(getAuthorByIdRes.body.lastName).to.equal('Last Name 70');
    });

    it('should update author by ID', async function () {
        const putAuthorRes = await request(baseUrl)
            .put('/api/v1/Authors/70')
            .send({
                id: 700,
                idBook: 177,
                firstName: 'Abc',
                lastName: 'Def'
            })
            .expect(200);
        assert.equal(putAuthorRes.status, 200);
        assert.equal(putAuthorRes.body.id, 700);
        assert.equal(putAuthorRes.body.idBook, 177);
        assert.equal(putAuthorRes.body.firstName, 'Abc');
        assert.equal(putAuthorRes.body.lastName, 'Def');
    });

    it('should delete author by ID', async function () {
        const deleteAuthorRes = await request(baseUrl)
            .delete('/api/v1/Authors/70')
            .expect(200);
        assert.equal(deleteAuthorRes.status, 200);
    });
});
