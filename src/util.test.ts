import * as util from './util'
import {IVerifiedData} from './types'
import {HashingLogic} from '@bloomprotocol/attestations-lib'
import {IBloomMerkleTreeComponents} from '@bloomprotocol/attestations-lib/dist/src/HashingLogic'

// Based on an mainnet email attestation and corresponding merkle tree components
// https://etherscan.io/tx/0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6#decodetab
test('Verifying layer2Hash, attester address, and merkle proof', () => {
  // tslint:disable:max-line-length
  const merkleTreeComponents: IBloomMerkleTreeComponents = {
    rootHash: '0xfa0147ea749ba09f692162665de44b74801cfbeb16308aaf5788e87d0e1a09a1',
    dataNodes: [
      {
        attestationNode: {
          aux: '0x480f7971777eda1e6e6804f35435f5ae163623bf1404bda8f1018600f89d757f',
          data: {
            data: 'eddiehedges@gmail.com',
            nonce: '5ee82099c52e30dc801131e12972fff1b8f90230dd268b04665c7385d959984b',
            version: '2.0.0',
          },
          link: {
            local: '0xdb81eabcbd65153a64b8c0e843e822c9c1f64bfbe5bf2481734a73288798b1b0',
            global: '0x97e9ad0b20ba0f0528efef244c4fe6ef11f5a6b0c7b2667064080cd6d81ca5ca',
            dataHash: '0xfd6a015fccf1a4140a40b939fc8755841324e3b3cc09cf02d325fb378aa72cbf',
            typeHash: '0xb98d14777c16823502b7c962bf576b00b6f9f23d12c2c8a3bc11699a2dcfe8da',
          },
          type: {
            type: 'email',
            nonce: 'fe11a2cb674207c0120e0058de3f5c60935ffa0abbb62c22c439ffa07c409022',
            provider: 'Bloom',
          },
        },
        signedAttestation:
          '0x4181089dad636fd35985e77a29c9b634bdf23254336bba6507ea0e2d75959bc71edb5c9265e91eeaf274ba1c7f992f4e802125ce02b02203e11704243f49235b1c',
      },
    ],
    layer2Hash: '0x6cca42a6266f647be85fba506fccc9925a995fee74fe08fe619c6a37cfbcb9ca',
    checksumSig:
      '0x068d4348cad148f1b768b464becddbbe5b9643782545ba91bd46de9fc0dd769f0dae8d36e0eb00913055d5bc9c6fcb4b0be733cb36046fd0da0ea5ecf5fc8f031b',
    paddingNodes: [
      '0xf16c379434bef8f2fdacc79d507d278e3bacc2288d6b6897082e4c127b41ffe7',
      '0xc15e45159839629cb3006f1ad182c970f1279fa8faf7fff91fd967d895d320e0',
      '0x10dca4bf55edf10c4e743cd0e0fbbfc3a893e5432577187f1ee40bd17c3e4d71',
      '0x8be5191e55e938cca9bfdafdd8497b3fee10dc67cf5aec06a21cd5d3215477eb',
      '0x31b5a691edcba21a4fda7cc9383f954f129a4c5e97fe5c038e9f4c6e93cda22e',
      '0x871926ac31ac3314d5dc7dff83ab392d05549e1df4e40215064dc2acb7730239',
      '0xf8da5b084a9c4b9cf1b2ed684d80a7d96f34ce2c3a0b5d1c3d9c602e96672102',
      '0x39457c0604b3ad8fcd1f44a9a97f5f8c975c1dec847a2720b98a5a7f6a1bec97',
      '0x5f03c7ac52ef6ba176278a1ad1faae5b82b431047a77b614739281b30e33be89',
      '0x596e55f7ec195a7884bdd0b7ebb6a038796206a57f1062d4a97db5a55547e058',
      '0x0feeab588ac8bcab0801c26a2821c4e66a9d1f4613629ddff8dd73da40278256',
      '0xe45ee67ff362cec3c5a43df463f3e119b463151d571e4136621f74c0352336bc',
      '0xc6783a9df936c58514d5189dba82698f8cd21ca83392f91ec1463851caa3880a',
      '0x5c0fe232b0ab54bade933e074bb689b7751be2a6451dbba7f0eaad5cc9d68ff0',
    ],
    rootHashNonce: '0xa6a7d2b6d495bb12c0bb79d82bf5952ea8d5f14ceb948d5bf076b5b4c5f16517',
    signedRootHash:
      '0x434686f4ec981fc4e99c336c13c26a6f6d167918f9bbf04bb77ad85201bec74049c8516cc7683743eda44550160e4ae2c616ae9919c3360e5eb921c874579e491b',
  }
  // tslint:enable:max-line-length

  const signedAttestationHash = HashingLogic.hashMessage(merkleTreeComponents.dataNodes[0].signedAttestation)
  const merkleTree = HashingLogic.getMerkleTreeFromComponents(merkleTreeComponents)
  const proof = util.formatProofForShare(merkleTree.getProof(util.toBuffer(signedAttestationHash)))
  const emailShareData: IVerifiedData = {
    tx: '0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6',
    layer2Hash: merkleTreeComponents.layer2Hash,
    rootHash: merkleTreeComponents.rootHash,
    rootHashNonce: merkleTreeComponents.rootHashNonce,
    proof,
    stage: 'mainnet',
    target: merkleTreeComponents.dataNodes[0],
    attester: '0x40b469b080c4b034091448d0e59880d823b2fc18',
  }

  expect(util.verifyOffChainDataIntegrity(emailShareData, [])).toHaveLength(0)
})
