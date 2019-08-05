const server = require('./');
const expect = require('chai').expect

describe('Stub Server', () => {
  // @todo - this is a pointless test
  it('should not export a function', () => {
    expect(server).to.be.a('function');
  });

});