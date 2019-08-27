const RPC = require('small-rpc');
const rpc = new RPC();
const Patent = require('./rpc/Patent');

rpc.setModule('Patent', Patent);

module.exports = rpc;
