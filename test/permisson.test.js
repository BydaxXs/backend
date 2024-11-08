const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

    describe('validado Permisos', () =>{
        it('Deberia encontrar la Ruta de obtener permisos', async () => {
            const response = await request(app)
            .get('/permissons/getPermissons').send();
            expect(response.status).toBe(200);
        });
    });