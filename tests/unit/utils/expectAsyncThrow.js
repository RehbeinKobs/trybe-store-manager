const { expect } = require('chai');

const expectAsyncThrowError = async (fn) => {
  let error = null;
  try {
    await fn();
  } catch (err) {
    error = err;
  }
  expect(error).to.be.an('Error');
}

module.exports = {
  expectAsyncThrowError,
};
