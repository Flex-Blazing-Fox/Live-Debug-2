const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

let data = {
    email : 'arnold@mail.com',
    password : 'secret'
}
let data2 = {
    email : 'adiel@mail.com',
    password : 'secret'
}

describe('User routes',()=>{
    describe('POST /register',()=> {
        afterAll((done) => {
            queryInterface.bulkDelete('Users', {})
              .then(_ => done())
              .catch(err => done(err))
        })
        describe('Success process',()=> {
            test('should send an object (email,id) with status code 201',(done)=>{
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('email', data.email)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Error process',()=>{
            test('should send an error wtih status 400 because of email null validation',(done)=>{
                const withoutEmail = { ...data }
                delete withoutEmail.email
                request(app)
                    .post('/register')
                    .send(withoutEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Email cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty email validation',(done)=>{
                const emptyEmail = { ...data, email: '' }
                request(app)
                    .post('/register')
                    .send(emptyEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Email is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of duplicate email',(done)=>{
                const duplicateEmail = { ...data }
                request(app)
                    .post('/register')
                    .send(duplicateEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Email is already exists')
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of invalid email format',(done)=>{
                const invalidEmail = { ...data, email: "arnold.com" }
                request(app)
                    .post('/register')
                    .send(invalidEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Invalid email format')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error with status 400 because password null validation',(done)=>{
                const withoutPassword = { ...data }
                delete withoutPassword.password
                request(app)
                    .post('/register')
                    .send(withoutPassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Password cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty email validation',(done)=>{
                const emptyPassword = { ...data, password: '' }
                request(app)
                    .post('/register')
                    .send(emptyPassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Password is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error with status 400 because password min 6 validation',(done)=>{
                const falsePassFormat = { ...data, password: 'hai' }
                request(app)
                    .post('/register')
                    .send(falsePassFormat)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Password min 6 character')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
        })
    })
    describe('POST /login',()=> {
        beforeAll(done => {
            User.create(data2)
              .then(_ => {
                done()
              })
              .catch(err => {
                done(err)
              })
        })
        afterAll((done) => {
            queryInterface.bulkDelete('Users', {})
              .then(_ => done())
              .catch(err => done(err))
        })
        describe('Success process',()=> {
            test('should send an object (access_token,email,id) with status code 200',(done)=>{
                request(app)
                    .post('/login')
                    .send(data2)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('email', data2.email)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('Error process',()=> {
            test('should send an error with status 400 because invalid email',(done)=>{
                const falseEmail = { ...data, email: 'ziady@mail.com' }
                request(app)
                    .post('/login')
                    .send(falseEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Invalid email/password')
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error with status 400 because invalid password',(done)=>{
                const falsePassword = { ...data, password: 'salah' }
                request(app)
                    .post('/login')
                    .send(falsePassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Invalid email/password')
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
        })
    })
})
