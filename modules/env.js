require('dotenv').config()

module.exports = env = {
  ETHEREUM_RPC_NODE: process.env.ETHEREUM_PRC_NODE,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
}
