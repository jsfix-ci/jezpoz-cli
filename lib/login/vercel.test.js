const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const childProcessStub = sinon.stub();
const vercelLogin = proxyquire('./vercel.js', {
  'child_process': {
    execSync: childProcessStub,
  },
});

test('vercel login - stars a process to login', t => {
  vercelLogin();
  t.truthy(childProcessStub.calledOnce);
  t.truthy(childProcessStub.calledWith('vercel login', {stdio: 'inherit', encoding: 'utf-8'}));
})