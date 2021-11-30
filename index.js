const { spinner } = require('./utils')
const { Web3Factory } = require('./modules/web3Factory')
const { SendGrid } = require('./modules/sendGrid')
const env = require('./modules/env')

async function scan() {
  try {
    // Sendgrid instance
    const sendGrid = new SendGrid()

    // Build web3 instance
    const ethereumInstance = new Web3Factory(env.ETHEREUM_RPC_NODE, 'ethereum')

    // Start spinner
    spinner.start('Scanning blockchain')

    // Scan blockchain
    while (true) {
      try {
        const ethereumScanResult = await ethereumInstance.scanNetwork()
        if (ethereumScanResult.balance) {
          console.log(ethereumScanResult)
          await sendGrid.sendEmail(ethereumScanResult)
          break
        }
      } catch (error) {
        throw new Error('Unexpected error occurred', error.message || error)
      }
    }

    // Stop spinner
    spinner.stop()
  } catch (error) {
    throw new Error(error.message || error)
  }
}

scan()
