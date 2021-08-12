const request = require('supertest')
const app = require('../app')
const { sequelize, User, Report } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let data = {
    email : 'arnold@mail.com',
    password : 'secret'
}
let data2 = {
    email : 'adiel@mail.com',
    password : 'secret'
}
let reportData = {
    description: 'kasus pembunuhan tikus di jalan raya',
    location: 'Jl. Tanah kusir, jakarta selatan'
}


describe('Report routes',()=>{
    let userToken, userToken2, user2Report
    beforeAll(done => {
        User.create(data)
          .then(user => {
            userToken = generateToken({ id: user.id }, 'secret')
            return User.create(data2)
          })
          .then(user2 => {
            userToken2 = generateToken({ id: user2.id }, 'secret')
            return Report.create({
              description: 'kasus pencurian ayam sebanyak dua kandang',
              location: 'Jl. Jeruk Perum Asp, Gorontalo',
              userId: user2.id
            })
          })
          .then(report => {
            user2Report = report
            done()
          })
          .catch(err => {
            done(err)
          })
    })
    afterAll(done => {
        queryInterface
          .bulkDelete('Users', {})
          .then(() => queryInterface.bulkDelete('Reports', {}))
          .then(() => done())
          .catch(err => done(err))
    })
    describe('POST /reports',()=> {
        describe('Success process',()=> {
            test('should create a new report with status code 201',(done)=>{
                request(app)
                    .post('/reports')
                    .send(reportData)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('report', res.body.report)
                        expect(res.body.report).toHaveProperty('id', expect.any(Number))
                        expect(res.body.report).toHaveProperty('userId', expect.any(Number))
                        expect(res.body.report).toHaveProperty('description', expect.any(String))
                        expect(res.body.report).toHaveProperty('location', expect.any(String))
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Error process',()=>{
            test('should send an error wtih status 400 because of location null validation',(done)=>{
                const withoutLocation = { ...reportData }
                delete withoutLocation.location
                request(app)
                    .post('/reports')
                    .send(withoutLocation)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Location cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty location validation',(done)=>{
                const emptyLocation = { ...reportData, location: '' }
                request(app)
                    .post('/reports')
                    .send(emptyLocation)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Location is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of description null validation',(done)=>{
                const withoutDescription = { ...reportData }
                delete withoutDescription.description
                request(app)
                    .post('/reports')
                    .send(withoutDescription)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Description cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty description validation',(done)=>{
                const emptyDescription = { ...reportData, description: '' }
                request(app)
                    .post('/reports')
                    .send(emptyDescription)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Description is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 401 because of not provide the access_token',(done)=>{
                request(app)
                    .post('/reports')
                    .send(reportData)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'you must login first')
                        expect(res.status).toBe(401)  
                        done()
                    })
            })
        })
    })
    describe('DELETE /reports',()=> {
        describe('Error process',()=> {
            test('should send an error with status 401 because invalid access_token',(done)=>{
                request(app)
                    .delete('/reports/' + user2Report.id)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'not authorized')
                        expect(res.status).toBe(401)
                        done()
                    })
            })
            test('should send an error with status 404 if report not found',(done)=>{
                request(app)
                    .delete('/reports/99999')
                    .set('access_token', userToken2)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Report not found')
                        expect(res.status).toBe(404)
                        done()
                    })
            })
        })
        describe('Success process',()=> {
            test('should send a success message with status code 200',(done)=>{
                request(app)
                    .delete('/reports/' + user2Report.id)
                    .set('access_token', userToken2)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Successfully delete data')
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })
})
