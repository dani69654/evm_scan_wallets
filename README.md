# Script_GenerateMnem_Check_Balance
A script to generate random 12 words mnemonic and checking balances.

**How to use it:**

- Add your Infutra key in line 2 : ```const web3 = new Web3('https://mainnet.infura.io/v3/**Infura Key**');```
- Get a word list file from internet.
- Add the path to your wordlist in line 10: ```require('fs').readFileSync('**path to wordList file**', 'utf-8')```
- Open your terminal, cd to project path then ```node Generate_Addresses_From_Seed.js```.

<h1> If you find a wallet with Ether inside please DO NOT take them, this project has been created for learning ONLY </h1>
