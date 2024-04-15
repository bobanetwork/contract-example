import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
import {ethers} from 'hardhat'
import {Contract, Signer, BigNumber} from 'ethers'

let YourContract: Contract

let signer: Signer
let signerAddress: string

describe('your tests', async () => {
    beforeEach(async () => {
        signer = (await ethers.getSigners())[0]
        signerAddress = await signer.getAddress()
        const YourContractFactory = await ethers.getContractFactory('YourContract')
        YourContract = await YourContractFactory.deploy()
        await YourContract.deployed()
        console.log('Contract deployed at: ', YourContract.address)
    })

    it('always succeeds', async () => {
       expect(1).to.be.eq(1)
    })

    it('contract deployed', async () => {
        expect(YourContract?.address).to.not.be.eq('')
    })
})

