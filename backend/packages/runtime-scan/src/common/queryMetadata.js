const {
  chain: { getApi },
} = require("@osn/scan-common");

async function getMetadata(blockHeight) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const metadata = await api.rpc.state.getMetadata(blockHash);
  return metadata.toJSON();
}

module.exports = {
  getMetadata,
};
