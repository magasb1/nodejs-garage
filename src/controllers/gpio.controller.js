const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = {
  activateRelay: (req, res, next) => {
    const relay = new Gpio(process.env.RELAY_GPIO_PIN, 'high');
    
    console.log(`Opening relay`)
    relay.write(1)
    setTimeout(() => {
      console.log(`Closing relay`)
      relay.write(0)
      setTimeout(() => {
        relay.unexport()
      }, process.env.RELAY_TIMEOUT)
    }, process.env.RELAY_TIMEOUT)

    return res.json({ "Status": "Ok", "Message": "Door triggered" })
  }
}