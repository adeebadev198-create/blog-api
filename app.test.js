const request = require('supertest');
const app = require('./server'); 

describe('Blog API Testing', () => {
    it('GET / should return success message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Blog API is running successfully!');
    });

    it('GET /api/posts should return a posts array', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('posts'); 
    });

    it('POST /api/auth/login should return 400 for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'wrong@test.com', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(400);
    });
});