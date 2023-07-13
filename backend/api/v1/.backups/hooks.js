const request = require('request');
const Tenant = require('../models/Tenant');
const Agent = require('../models/Agent');

// register root hooks to be executed for all test files
module.exports.mochaHooks = async () => {
  const hooks = {
    beforeAll(done) {
      this.baseUrl = 'http://localhost:5000/api/v1';
      // enable cookies for all requests, and json body
      const baseRequest = request.default({ jar: true, json: true });
      this.rq = baseRequest;
      console.log(Object.entries(baseRequest)); // SCAFF
      // create default/dummy tenant and agent
      const tData = {
        firstName: 't1firstName',
        lastName: 't1lastName',
        email: 't1@gmail.com',
        password: 't1pwd',
        phone: '2347064859204',
        isAgent: 'false',
      };
      const aData = {
        firstName: 'a1firstName',
        lastName: 'a1lastName',
        email: 'a1@gmail.com',
        password: 'a1pwd',
        isAgent: 'true',
      };
      const reqOpts = {
        url: 'http://localhost:5000/api/vi/users',
        body: tData,
      };
      baseRequest.post(reqOpts, (err, res, bdy) => {
        if (res.statusCode === 201) {
          // tenant creation success; create agent
          reqOpts.body = aData;
          baseRequest.post(reqOpts, (err, res, bdy) => {
            if (res.statusCode !== 201) {
              console.log(res.statusCode, bdy);
            }

            if (err) {
              done(err);
            } else {
              done();
            }
          });
        } else {
          // tenant creation failed
          console.log(res.statusCode, bdy);

          if (err) {
            done(err);
          }
        }
      });
    },
    async afterAll() {
      // drop agent and tenant collections; clean up
      await Tenant.deleteMany({});
      await Agent.deleteMany({});
    },
    afterEach(done) {
      // logout from session
      const url = `${this.baseUrl}/logout`;
      this.rq.post(url, (err, res, bdy) => {
        if (err) {
          done(err);
        }

        if (res.statusCode !== 200) {
          console.log(res.statusCode, bdy);
        } else {
          done();
        }
      });
    },
  };
  return hooks;
};
