//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/index');

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
                 
                    res.body.should.have.property('message').eql('oke');
                    res.body.should.have.property('status').eql(200);   res.body.should.be.a('object');
                    res.body.data[0].should.have.property('price').eql("3000");
                    done();
                });
        });
        it('it should GET product by id', (done) => {
            let id = '63e5ecede08955523fee736d';
            chai.request(server)
                .get('/api-products/getProductById/'+id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('data').be.a('object');
                    res.body.data.should.have.property('price').eql("3000");
                    done();
                });
        });

    });
})