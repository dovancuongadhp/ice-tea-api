//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('product',()=>{
    beforeEach((done)=>{
        done();
    })
    /*
     * Test the /GET route
     */
    describe('/GET product', () => {
        it('it should GET all the product', (done) => {
            chai.request(server)
                .get('/api-products/getAllProducts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
})