# Generate random addresses and check balances

A script that generates random 12 words mnemonic, derives the address and check for balance. <br>

![alt text](https://im3.ezgif.com/tmp/ezgif-3-a72e60facdf3.gif)

## How to use it

- Run `npm i`

- Create a `.env` file in the root directory <br>
  The env file should look like this (the Sendgrid api key is not mandatory):

```js
  ETHEREUM_PRC_NODE =
  SENDGRID_API_KEY =
```

- If the Sendgrid api is set, you must set the sender and the receiver email addresses (modules/sendgrid)

```js
this.message = {
  to: null,
  from: null,
  subject: '[Wallet Scan Script] - New wallet found',
  text: '',
}
```

- Run `npm start`

## In case a valid wallet is found

The wallet information (mnemonic, address, amount of tokens hold) is displayed in the console. <br>
If the Sendgrid API key is set, the script sends an email.
