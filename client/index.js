const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // how do we prove to the server we're on the nice list?

  // create a merkle tree for the whole list
  const merkleTree = new MerkleTree(niceList);

  // find the proof that norman block is in the list
  const name = process.argv.slice(2).join(' ');
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  console.log(`proof: ${JSON.stringify(proof)}`);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name, proof
  });

  console.log({ gift });
}

main();