const RPC = require('small-rpc');
const rpc = new RPC();
const ProgramRegistry = require('./rpc/ProgramRegistry');
const Trademark = require('./rpc/Trademark');
const Patent = require('./rpc/Patent')

rpc.setModule('ProgramRegistry',ProgramRegistry);
rpc.setModule('Trademark',Trademark );
rpc.setModule('Patent', Patent);

module.exports = rpc;
