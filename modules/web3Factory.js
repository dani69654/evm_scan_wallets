const Web3 = require('web3')
const eth = require('ethers')
const bip39 = require('bip39')
const hdkey = require('ethereumjs-wallet')

class Web3Factory {
  path = "m/44'/60'/0'/0/0"
  blockchain = ''

  constructor(_provider, _blockchain) {
    if (!_provider) throw new Error('Invalid provider')
    this.web3 = new Web3(_provider)
    this.blockchain = _blockchain
  }

  generateRandomAddresses() {
    const entropy = eth.utils.randomBytes(16)
    const mnemonic = eth.utils.entropyToMnemonic(entropy)
    const hdwallet = hdkey.hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic))
    const wallet = hdwallet.derivePath(this.path).getWallet()
    const address = `0x${wallet.getAddress().toString('hex')}`
    return { address, mnemonic }
  }

  async getAddressBalance(_address, _mnemonic) {
    return {
      address: _address,
      balance: Number(await this.web3.eth.getBalance(_address)),
      mnemonic: _mnemonic,
      blockchain: this.blockchain,
    }
  }

  async scanNetwork() {
    const { address, mnemonic } = this.generateRandomAddresses()
    const addressData = await this.getAddressBalance(address, mnemonic)
    return addressData
  }
}

module.exports = { Web3Factory }
