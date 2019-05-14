import * as Validation from './Validation'
import {HashingLogic} from '@bloomprotocol/attestations-lib'
import * as EthU from 'ethereumjs-util'
import {
  formatMerkleProofForShare,
  getOnChainCredential,
  getBatchCredential,
  getPresentationProof,
  getVerifiablePresentation,
  hashCredentials,
} from './util'
import * as ethereumjsWallet from 'ethereumjs-wallet'
import {IVerifiableCredential} from './types'
const ethSigUtil = require('eth-sig-util')

const aliceWallet = ethereumjsWallet.fromPrivateKey(
  new Buffer('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', 'hex')
)
const alicePrivkey = aliceWallet.getPrivateKey()
const bobWallet = ethereumjsWallet.fromPrivateKey(
  new Buffer('ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f', 'hex')
)

const bobPrivkey = bobWallet.getPrivateKey()
const bobAddress = bobWallet.getAddressString()

const emailAttestationData: HashingLogic.IAttestationData = {
  data: 'test@bloom.co',
  nonce: 'a3877038-79a9-477d-8037-9826032e6af0',
  version: '1.0.0',
}

const emailAttestationType: HashingLogic.IAttestationType = {
  type: 'email',
  nonce: 'a3877038-79a9-477d-8037-9826032e6af1',
  provider: 'Bloom',
}

const emailIssuanceNode: HashingLogic.IIssuanceNode = {
  localRevocationToken: '0x5a35e46865c7a4e0a5443b03d17d60c528896881646e6d58d3c4ad90ef84448e',
  globalRevocationToken: '0xe04448fe19da4c3d85d6e646188628825c86d71b30b5445a0e4a7c56864e53a7',
  dataHash: '0xd1696aa0222c2ee299efa58d265eaecc4677d8c88cb3a5c7e60bc5957fff514a',
  typeHash: '0x5aa3911df2dd532a0a03c7c6b6a234bb435a31dd9616477ef6cddacf014929df',
  issuanceDate: '2016-02-01T00:00:00.000Z',
  expirationDate: '2018-02-01T00:00:00.000Z',
}

const emailAuxHash = '0x3a25e46865c7a4e0a5445b03b17d68c529826881647e6d58d3c4ad91ef83440f'

const emailAttestation: HashingLogic.IAttestationLegacy = {
  data: emailAttestationData,
  type: emailAttestationType,
  aux: emailAuxHash,
}

const emailIssuedClaimNode: HashingLogic.IIssuedClaimNode = {
  data: emailAttestationData,
  type: emailAttestationType,
  aux: emailAuxHash,
  issuance: emailIssuanceNode,
}

const phoneAttestationData: HashingLogic.IAttestationData = {
  data: '+17203600587',
  nonce: 'a3877038-79a9-477d-8037-9826032e6af0',
  version: '1.0.0',
}
const phoneAttestationType: HashingLogic.IAttestationType = {
  type: 'phone',
  nonce: 'a3877038-79a9-477d-8037-9826032e6af0',
  provider: 'Bloom',
}

const phoneAuxHash = '0x303438fe19da4c3d85d6e746188618925c86d71b30b5443a0e4a7c56864e52b5'

const phoneAttestation: HashingLogic.IAttestationLegacy = {
  data: phoneAttestationData,
  type: phoneAttestationType,
  aux: phoneAuxHash,
}

const contractAddress = '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'

const legacyComponents = HashingLogic.getSignedMerkleTreeComponentsLegacy(
  [emailAttestation, phoneAttestation],
  alicePrivkey
)

const components = HashingLogic.getSignedMerkleTreeComponents(
  [emailAttestation, phoneAttestation],
  emailIssuedClaimNode.issuance.issuanceDate,
  emailIssuedClaimNode.issuance.expirationDate,
  alicePrivkey
)

const onChainCredential = getOnChainCredential(
  bobAddress,
  [],
  '0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6',
  'mainnet',
  components,
  components.claimNodes[0]
)

const requestNonce = HashingLogic.generateNonce()

const bobSubjectSig = ethSigUtil.signTypedData(bobPrivkey, {
  data: HashingLogic.getAttestationAgreement(contractAddress, 1, components.layer2Hash, requestNonce),
})

const batchComponents = HashingLogic.getSignedBatchMerkleTreeComponents(
  components,
  contractAddress,
  bobSubjectSig,
  bobAddress,
  requestNonce,
  alicePrivkey
)

const batchCredential = getBatchCredential([], 'mainnet', batchComponents, batchComponents.claimNodes[1])

const presentationToken = HashingLogic.generateNonce()
const presentationDomain = 'https://bloom.co/receiveData'
const presentationProof = getPresentationProof(bobAddress, presentationToken, presentationDomain, [
  batchCredential,
  onChainCredential,
])
const presentationSig = HashingLogic.signHash(
  EthU.toBuffer(HashingLogic.hashMessage(HashingLogic.orderedStringify(presentationProof))),
  bobPrivkey
)
const presentation = getVerifiablePresentation(
  presentationToken,
  [batchCredential, onChainCredential],
  presentationProof,
  presentationSig
)

test('Validation.isValidPositionString', () => {
  expect(Validation.isValidPositionString('left')).toBeTruthy()
  expect(Validation.isValidPositionString('right')).toBeTruthy()
  expect(Validation.isValidPositionString('')).toBeFalsy()
  expect(Validation.isValidPositionString('up')).toBeFalsy()
})

test('Validation.isValidStageString', () => {
  expect(Validation.isValidStageString('mainnet')).toBeTruthy()
  expect(Validation.isValidStageString('rinkeby')).toBeTruthy()
  expect(Validation.isValidStageString('local')).toBeTruthy()
  expect(Validation.isValidStageString('')).toBeFalsy()
  expect(Validation.isValidStageString('home')).toBeFalsy()
})

test('Validation.isValidMerkleProofArray', () => {
  const testLeaves = HashingLogic.getPadding(1)
  const validMerkleTree = HashingLogic.getMerkleTreeFromLeaves(testLeaves)
  const validMerkleProof = validMerkleTree.getProof(EthU.toBuffer(testLeaves[1]))
  const shareableMerkleProof = formatMerkleProofForShare(validMerkleProof)
  expect(Validation.isValidMerkleProofArray(validMerkleProof)).toBeFalsy()
  expect(Validation.isValidMerkleProofArray(shareableMerkleProof)).toBeTruthy()
  expect(Validation.isValidMerkleProofArray([])).toBeFalsy()
})

test('Validation.isValidLegacyDataNode', () => {
  expect(Validation.isValidLegacyDataNode(legacyComponents.dataNodes[0])).toBeTruthy()
  expect(Validation.isValidLegacyDataNode(components.claimNodes[0])).toBeFalsy()
})

test('Validation.isValidClaimNode', () => {
  expect(Validation.isValidClaimNode(legacyComponents.dataNodes[0])).toBeFalsy()
  expect(Validation.isValidClaimNode(components.claimNodes[0])).toBeTruthy()
})

test('Validation.isValidVerifiedData', () => {
  expect(Validation.isValidVerifiedData(onChainCredential.proof.data)).toBeTruthy()
  expect(Validation.isValidVerifiedData(batchCredential.proof.data)).toBeTruthy()
})

test('Validation.isOptionalArrayOfAuthorizations', () => {
  expect(Validation.isOptionalArrayOfAuthorizations([])).toBeTruthy()
})

test('Validation.formatMerkleProofForVerify', () => {
  const testLeaves = HashingLogic.getPadding(1)
  const validMerkleTree = HashingLogic.getMerkleTreeFromLeaves(testLeaves)
  const validMerkleProof = validMerkleTree.getProof(EthU.toBuffer(testLeaves[1]))
  const shareableMerkleProof = formatMerkleProofForShare(validMerkleProof)
  const verifiableMerkleProof = Validation.formatMerkleProofForVerify(shareableMerkleProof)
  expect(verifiableMerkleProof).toEqual(validMerkleProof)
})

test('Validation.verifyCredentialMerkleProof', () => {
  expect(Validation.verifyCredentialMerkleProof(onChainCredential.proof.data)).toBeTruthy()
  expect(Validation.verifyCredentialMerkleProof(batchCredential.proof.data)).toBeTruthy()
  const invalidProof = JSON.parse(JSON.stringify(batchCredential.proof.data))
  invalidProof.proof[0].data = ''
  expect(Validation.verifyCredentialMerkleProof(invalidProof)).toBeFalsy()
})

test('Validation.isValidCredentialProof', () => {
  expect(Validation.isValidCredentialProof(onChainCredential.proof)).toBeTruthy()
  expect(Validation.isValidCredentialProof(batchCredential.proof)).toBeTruthy()
})

test('Validation.isValidCredentialSubject', () => {
  expect(Validation.isValidCredentialSubject(onChainCredential.credentialSubject)).toBeTruthy()
  expect(Validation.isValidCredentialSubject(batchCredential.credentialSubject)).toBeTruthy()
})

test('Validation.proofMatchesSubject', () => {
  expect(Validation.proofMatchesSubject(onChainCredential.proof, onChainCredential)).toBeTruthy()
  expect(Validation.proofMatchesSubject(batchCredential.proof, onChainCredential)).toBeFalsy()
  expect(Validation.proofMatchesSubject(batchCredential.proof, batchCredential)).toBeTruthy()
  expect(Validation.proofMatchesSubject(onChainCredential.proof, batchCredential)).toBeFalsy()
})

test('Validation.isArrayOfNonEmptyStrings', () => {
  expect(Validation.isArrayOfNonEmptyStrings([])).toBeFalsy()
  expect(Validation.isArrayOfNonEmptyStrings([''])).toBeFalsy()
  expect(Validation.isArrayOfNonEmptyStrings(['a'])).toBeTruthy()
})

test('Validation.isArrayOfVerifiableCredentials', () => {
  expect(Validation.isArrayOfVerifiableCredentials([onChainCredential, batchCredential])).toBeTruthy()
  expect(Validation.isArrayOfVerifiableCredentials([])).toBeFalsy()
})

test('Validation.isValidPresentationProof', () => {
  expect(Validation.isValidPresentationProof(presentationProof)).toBeTruthy()
  expect(Validation.isValidPresentationProof(onChainCredential)).toBeFalsy()
})

test('Validation.proofMatchesCredential', () => {
  expect(Validation.proofMatchesCredential(presentationProof, presentation)).toBeTruthy()
  expect(
    Validation.proofMatchesCredential(
      getPresentationProof(bobAddress, presentationToken, presentationDomain, [onChainCredential, batchCredential]),
      presentation
    )
  ).toBeTruthy()
  expect(
    Validation.proofMatchesCredential(
      getPresentationProof(bobAddress, presentationToken, presentationDomain, [batchCredential]),
      presentation
    )
  ).toBeFalsy()
})

test('Validation.packedDataMatchesProof', () => {
  expect(Validation.packedDataMatchesProof(presentation.packedData, presentation)).toBeTruthy()
  expect(Validation.packedDataMatchesProof(presentationToken, presentation)).toBeFalsy()
})

test('Validation.tokenMatchesProof', () => {
  expect(Validation.tokenMatchesProof(presentationToken, presentation)).toBeTruthy()
  expect(Validation.tokenMatchesProof(HashingLogic.generateNonce(), presentation)).toBeFalsy()
})

test('Validation.validatePresentationSignature', () => {
  expect(Validation.validatePresentationSignature(presentationSig, presentation)).toBeTruthy()

  expect(
    Validation.validatePresentationSignature(
      HashingLogic.signHash(
        alicePrivkey,
        EthU.toBuffer(HashingLogic.hashMessage(HashingLogic.orderedStringify(presentationProof)))
      ),
      presentation
    )
  ).toBeFalsy()
})

test('Validation.isValidVerifiablePresentation', () => {
  expect(Validation.isValidVerifiablePresentation(presentation)).toBeTruthy()
  expect(Validation.isValidVerifiablePresentation(onChainCredential)).toBeFalsy()
})

const reverseObject = (obj: Object) => {
  var newObject = {}
  var keys = []

  for (var key of Object.keys(obj)) {
    keys.push(key)
  }

  for (var i = keys.length - 1; i >= 0; i--) {
    var value = obj[keys[i]]
    newObject[keys[i]] = value
  }

  return newObject
}

test('hashCredentials returns same hash no matter order of array', () => {
  const hashA = hashCredentials([batchCredential, onChainCredential])
  const hashB = hashCredentials([onChainCredential, batchCredential])
  expect(hashA).toBe(hashB)
  const hashC = hashCredentials([batchCredential, onChainCredential, batchCredential])
  const hashD = hashCredentials([onChainCredential, batchCredential, batchCredential])
  expect(hashC).toBe(hashD)
  const sortedCopyBatch = reverseObject(batchCredential)
  const hashF = hashCredentials([sortedCopyBatch as IVerifiableCredential, onChainCredential])
  expect(hashA).toBe(hashF)
})
