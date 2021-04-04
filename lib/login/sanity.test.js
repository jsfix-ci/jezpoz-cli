const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const childProcessStub = sinon.stub();
const sanityLogin = proxyquire('./sanity.js', {
  'child_process': {
    execSync: childProcessStub,
  },
});

test('sanity login - stars a process to login', t => {
  sanityLogin();
  t.truthy(childProcessStub.calledOnce);
  t.truthy(childProcessStub.calledWith('sanity login', {stdio: 'inherit', encoding: 'utf-8'}));
})