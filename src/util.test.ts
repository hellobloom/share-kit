import * as util from './util'
import {IVerifiedDataLegacy, IVerifiedDataBatch, DataVersions} from './types'
import {HashingLogic} from '@bloomprotocol/attestations-lib'
import {
  IBloomMerkleTreeComponents,
  IBloomMerkleTreeComponentsLegacy,
  IBloomBatchMerkleTreeComponents,
} from '@bloomprotocol/attestations-lib/dist/src/HashingLogic'

// tslint:disable:max-line-length
const validBatchMerkleTreeComponents: IBloomBatchMerkleTreeComponents = {
  subject: '0xf30a6a398fcbf9941c9beccfe15d9f79607595bb',
  version: 'Batch-Attestation-Tree-1.0.0',
  attester: '0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb',
  rootHash: '0x673e50bd93a315563a1b8fa881f15e1e82fad1234156e615da72fe7a52a27bc7',
  claimNodes: [
    {
      attester: '0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb',
      claimNode: {
        aux: '0xf73acebc6a244dac041f88ad1b92893b76178bc9b951bf1aaf2c3ded3b1fca51',
        data: {
          data: '{}',
          nonce: 'caf11ee55185b00199781280be1654db2bc8e09eeef8dab3826cbb2c2f197341',
          version: '2.0.0',
        },
        type: {
          type: 'twitter',
          nonce: '1ade84d71e09ec0e5638a02652088485ba6d6bbba647d68b298830142eb97c8d',
          provider: 'Bloom',
        },
        issuance: {
          dataHash: '0xa5e6716ba62fad630843687c641038d21af315fa4db615820df86693fbc6f65b',
          typeHash: '0x072c5be7d768ecbdf610aa4ec27376817f4244451199d242ab84bd96c757bf34',
          issuanceDate: '2018-12-30T19:00:41.61+00:00',
          expirationDate: '2023-12-30T19:00:41.61+00:00',
          localRevocationToken: '0x5e7b45a125afd65c9965ea53e2102a3b1c7872f0ff70ee548f1ddaa80b2303dc',
          globalRevocationToken: '0xe883e0749cf253106142b5db245738511b455ad465c494d0b8f3fc19450208c5',
        },
      },
      attesterSig:
        '0xc03ae657238e9f3573d06ed3aa88d439d67dba5870ca110ea220e0d7f048b10b1f9ea4c93cd1005685cb4feb248d96482decb3419c5ef16a819a697705f934f11c',
    },
  ],
  layer2Hash: '0x63d2e6af1d0109c5cf999c7ff69462715a7f8a708f6ceaa224ec04ae41937df4',
  subjectSig:
    '0xaaa67b9264c40c666b3ad03aa325af66845ee7fe2d8748d3e86ce8b1a8e4e82e38dd8e8932e4637ad862ed47e884bb30200db216fe5a5d6c3eb139a620cfe5f41c',
  attesterSig:
    '0x89ed9a9b694b96fb659b329e371904fec74c2ab1dcc55e44af873393945a7e5371c8b79a0529f2a60199b0f9e851201638fe6c5b76ed4bccdd6182eb56606df61b',
  checksumSig:
    '0x6098bac9848dd407eb712b745375a91cba41d2594afa362452dc26c855eb6e8e3bb65813ec420b2e026738f882c0da60c5683785a2547297d4cc46be4023971d1b',
  paddingNodes: [
    '0xb493b6fe89bae8be3aa1b0174b38c47f996226b9935d38d71f5eed72f1dc4494',
    '0x13d498e4369ee7f70f3ea88a90e209235b9827d471284270d68b064d4e83fe5c',
    '0xa649d89111dcf44961081a22f9ea552219fa838489a554376d47bc48ca02064f',
    '0x114ccb9cc42369f7de0e4ae2f3939d23bed58424646eb489fe34ceeecbd3cc13',
    '0xff037caba017515eaea71e30ffbb6aebf81c5673e004e8d29db9f9fa423bb0ac',
    '0x8def819d09cd6fb82f17c37e4751c87cbec7406a9febe8db0deb9f8b102428b2',
    '0x8dbee5cea4d9e6a51f01a0516c0bc8d4c781d5c06d8d75078656d19ed6d7282c',
    '0xc5cccb2b35d5ac5fb8f9e0ddb7b08fac99b929c42bf5044ba22675cc81bdfb93',
    '0x480431e793392ca449b465e8de1d70876db580ab66715d25c3c9eff4b4ec46e7',
    '0x734e40fcc0a35240917cb3b6fa95d0e7f9f2158ad9e98e07019e7ba5c73ffa56',
    '0x4913a311108f4e92c0a5a7b51b6635435f5a6d432ce52553b56c45bddad6e489',
    '0x74030cade09207f800dd68682452716fbee71b0255cba3941556b5974d744846',
    '0x9dd839bcdcb96552d9fb968e1841622687f0b6596689f02acacf775740190664',
    '0x148f4363359fce3451df4b411f0a3bc94dd1db7196d6b22d3993a06c94594d58',
  ],
  requestNonce: '0x5224132b139f352097349f14b3c7e21face52b3f2a10b4c1c3dfd5801b0cf4bb',
  rootHashNonce: '0xd668a1c1e8658602fdace7f5c3c6f6413bec46d33a4f30860b9e83ceb7a71f2f',
  batchLayer2Hash: '0x4277c5b13cafa4093ae750b8fd704743619c2ff95243b18c78955ec13820260a',
  contractAddress: '0x313a0dc2a954f8d196ce72fef175f4403b7121ca',
  batchAttesterSig:
    '0x35aa174bad359fffbfa296942bf165df2cae9a543604c05dcad3f6e640b56b5c456ca7efada013dafde52ffc12616025a9573b40bd5efb9388d97e5387a614851c',
}

const validMerkleTreeComponentsLegacy: IBloomMerkleTreeComponentsLegacy = {
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

// Based on an mainnet email attestation and corresponding merkle tree components
// https://etherscan.io/tx/0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6#decodetab
test('Verifying layer2Hash, attester address, and merkle proof', () => {
  // tslint:disable:max-line-length
  const signedAttestationHash = HashingLogic.hashMessage(validMerkleTreeComponentsLegacy.dataNodes[0].signedAttestation)
  const merkleTree = HashingLogic.getMerkleTreeFromComponentsLegacy(validMerkleTreeComponentsLegacy)
  const proof = util.formatMerkleProofForShare(merkleTree.getProof(util.toBuffer(signedAttestationHash)))
  const emailShareData: IVerifiedDataLegacy = {
    version: DataVersions.legacy,
    tx: '0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6',
    layer2Hash: validMerkleTreeComponentsLegacy.layer2Hash,
    rootHash: validMerkleTreeComponentsLegacy.rootHash,
    rootHashNonce: validMerkleTreeComponentsLegacy.rootHashNonce,
    proof,
    stage: 'mainnet',
    target: validMerkleTreeComponentsLegacy.dataNodes[0],
    attester: '0x40b469b080c4b034091448d0e59880d823b2fc18',
  }

  expect(util.verifyOffChainDataIntegrity(emailShareData)).toHaveLength(0)
})

test('Verifying layer2Hash, attester address, and merkle proof', () => {
  const signedAttestationHash = HashingLogic.hashMessage(validBatchMerkleTreeComponents.claimNodes[0].attesterSig)
  const merkleTree = HashingLogic.getMerkleTreeFromComponents(validBatchMerkleTreeComponents)
  const proof = util.formatProofForShare(merkleTree.getProof(util.toBuffer(signedAttestationHash)))
  const twitterShareData: IVerifiedDataBatch = {
    version: DataVersions.batch,
    batchLayer2Hash: validBatchMerkleTreeComponents.batchLayer2Hash,
    batchAttesterSig: validBatchMerkleTreeComponents.batchAttesterSig,
    subjectSig: validBatchMerkleTreeComponents.subjectSig,
    requestNonce: validBatchMerkleTreeComponents.requestNonce,
    layer2Hash: validBatchMerkleTreeComponents.layer2Hash,
    rootHash: validBatchMerkleTreeComponents.rootHash,
    rootHashNonce: validBatchMerkleTreeComponents.rootHashNonce,
    proof,
    stage: 'mainnet',
    target: validBatchMerkleTreeComponents.claimNodes[0],
    attester: validBatchMerkleTreeComponents.attester,
    subject: validBatchMerkleTreeComponents.attester,
  }

  expect(util.verifyOffChainDataIntegrity(twitterShareData)).toHaveLength(0)
})

test('Verify ResponseData that is structured incorrectly does not validate.', async () => {
  const options: util.IValidateResponseDataOptions = {validateOnChain: false}

  const undefinedResponseData = await util.validateUntypedResponseData(undefined, options)
  expect(undefinedResponseData.data).toHaveLength(0)
  expect(undefinedResponseData.errors).toHaveLength(1)
  expect(undefinedResponseData.errors.map(x => x.key)).toContain('missingResponseData')

  const nullResponseData = await util.validateUntypedResponseData(null, options)
  expect(nullResponseData.data).toHaveLength(0)
  expect(nullResponseData.errors).toHaveLength(1)
  expect(nullResponseData.errors.map(x => x.key)).toContain('missingResponseData')

  const emptyObject = await util.validateUntypedResponseData({}, options)
  expect(emptyObject.data).toHaveLength(0)
  expect(emptyObject.errors).toHaveLength(5)
  expect(emptyObject.errors.map(x => x.key)).toContain('ResponseData.token')
  expect(emptyObject.errors.map(x => x.key)).toContain('ResponseData.subject')
  expect(emptyObject.errors.map(x => x.key)).toContain('ResponseData.data')
  expect(emptyObject.errors.map(x => x.key)).toContain('ResponseData.packedData')
  expect(emptyObject.errors.map(x => x.key)).toContain('ResponseData.signature')

  const badOptions = {validateOnChain: true}
  const badOptionsValidate = await util.validateUntypedResponseData(
    {
      token: 'fake',
      subject: '0x0',
      data: [{}],
      packedData: '0x0',
      signature: '0x0',
    },
    badOptions
  )
  expect(badOptionsValidate.data).toHaveLength(0)
  expect(badOptionsValidate.errors).toHaveLength(1)
  expect(badOptionsValidate.errors.map(x => x.key)).toContain('invalidOptions')
})
