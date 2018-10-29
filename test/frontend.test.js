const { expect } = require('chai');
const nock = require('nock');
const data = require('./response');
const app = require('../server');
const request = require('supertest')(app);

describe('GET images', () => {
  beforeEach(() => {
    nock('https://api.flickr.com')
      .get(
        '/services/rest/?method=flickr.galleries.getPhotos&api_key=df47471a0c32855f4356e716a08b9520&gallery_id=66911286-72157692049980335&format=json&nojsoncallback=1&auth_token=72157672836458157-0707d11f8c84c03e&api_sig=dfdb8b24fba57f05417f0f04acaa5c99'
      )
      .reply(200, data);
  });
  it('returns images', done => {
    request.get('/api').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
    done();
  });
});
