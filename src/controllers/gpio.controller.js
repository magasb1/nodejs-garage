const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = {
  activateRelay: (req, res, next) => {
    const relay = new Gpio(process.env.RELAY_GIPO_PIN, 'out');
    relay.read()
      .then(() => {
        console.log(`ON (${process.env.RELAY_ON})`)
        relay.writeSync(process.env.RELAY_ON)
      })
      .then(() => setTimeout(() => {
        console.log(`OFF (${process.env.RELAY_OFF})`)
        relay.writeSync(process.env.RELAY_OFF)
      }, process.env.RELAY_TIMEOUT))
      .then(() => {
        relay.unexport();
        return res.json({"Status": "Ok", "Message": "Door triggered"})
      })
      .catch(err => console.log(err))
  }
}