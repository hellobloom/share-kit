import * as util from './util'
import {IVerifiedData} from './types'

const mockData: IVerifiedData[] = [
  {
    tx: '0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8',
    stage: 'mainnet',
    rootHash: '0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f',
    target: {
      type: 'phone',
      data: '+16195550587',
      nonce: 'c3877038-79a9-477d-8037-9826032e6af5',
      version: '1.0.0',
    },
    proof: [
      {
        position: 'right',
        data: '0x662a74ce03d761ab066d0fc8306f474534fa5fdb087ad88baf067caefe1c026f',
      },
      {
        position: 'right',
        data: '0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b',
      },
    ],
  },
  {
    tx: '0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8',
    stage: 'mainnet',
    rootHash: '0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f',
    target: {
      type: 'email',
      data: 'test@bloom.co',
      nonce: 'b3877038-79a9-477d-8037-9826032e6af4',
      version: '1.0.0',
    },
    proof: [
      {
        position: 'left',
        data: '0x2b81050468ea28d94e5db2ee6ae59e3cf03ab6f2da8c5f79c10e4d982af86844',
      },
    ],
  },
  {
    tx: '0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8',
    stage: 'mainnet',
    rootHash: '0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f',
    target: {
      type: 'full-name',
      data: 'John Bloom',
      nonce: 'a3877038-79a9-477d-8037-9826032e6af0',
      version: '1.0.0',
    },
    proof: [
      {
        position: 'left',
        data: '0x07b51789d6bbe5cb084c502b03168adafbbb58ad5fff2af9f612b2b9cf54c31f',
      },
      {
        position: 'right',
        data: '0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b',
      },
    ],
  },
]

test('Verifying Merkle Proof', () => {
  expect(
    mockData.every(data => {
      return util.verifyProof(data)
    })
  ).toBeTruthy()
})
