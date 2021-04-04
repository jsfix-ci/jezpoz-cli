const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const promptsSelectStub = sinon.stub();
const sanityLoginStub = sinon.stub();
const vercelLoginStub = sinon.stub();
const githubLoginStub = sinon.stub();

const promptsStub = {
  prompts: {
    select: promptsSelectStub,
  },
};
const index = proxyquire('./index.js', {
  'prompts': promptsStub,
  './sanity.js': sanityLoginStub,
  './vercel.js': vercelLoginStub,
  './github.js': githubLoginStub,
});

test('jezcli login - selected sanity', async (t) => {
  promptsSelectStub.returns(Promise.resolve('sanity'));
  sanityLoginStub.returns(Promise.resolve());
  await index();
  t.truthy(sanityLoginStub.calledOnce);
});

test('jezcli login - selected vercel', async (t) => {
  promptsSelectStub.returns(Promise.resolve('vercel'));
  sanityLoginStub.returns(Promise.resolve());
  await index();
  t.truthy(vercelLoginStub.calledOnce);
});

test('jezcli login - selected github', async (t) => {
  promptsSelectStub.returns(Promise.resolve('github'));
  sanityLoginStub.returns(Promise.resolve());
  await index();
  t.truthy(githubLoginStub.calledOnce);
});
