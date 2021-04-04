const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const promptsSelectStub = sinon.stub();
const sanityNextStub = sinon.stub();

const loginIndex = proxyquire('./index.js', {
  'prompts': {
    prompts: {
      select: promptsSelectStub,
    },
  },
  './SanityNext': sanityNextStub,
});

test('jezcli new', async (t) => {
  promptsSelectStub.returns(Promise.resolve('sanityNext'));
  await loginIndex();
  t.truthy(sanityNextStub.calledOnce);
})