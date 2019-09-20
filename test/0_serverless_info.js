const ServerlessInfo = require('../api/serverless-info');
const expect = require('chai').expect;

(async () => {

  describe('Serverless Info', function () {

    this.timeout(1000 * 5);
    let info = null;

    it('should load ServerlessInfo class', async () => {
      info = await new ServerlessInfo().Load();
      expect(info.data).to.not.equal(null);
    });

    it('should contain data', () => {
      expect(info.data).to.not.equal({});
    })

    it('should contain Stacks property in data', () => {
      expect(info.data.describeStacks).to.have.property('Stacks');
    })

    it('should contain StackResourceSummaries property in data', () => {
      expect(info.data.listStackResources).to.have.property('StackResourceSummaries');
    })

  });

})();