const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const childProcessStub = sinon.stub();
const githubLogin = proxyquire('./github.js', {
  'child_process': {
    execSync: childProcessStub,
  },
});

test('github login - stars a process to login', t => {
  githubLogin();
  t.truthy(childProcessStub.calledOnce);
  t.truthy(childProcessStub.calledWith('gh auth login', {stdio: 'inherit', encoding: 'utf-8'}));
})