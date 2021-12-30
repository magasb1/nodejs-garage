const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = {
  activateRelay: async (req, res, next) => {
    const RELAY_PIN = process.env.RELAY_GPIO_PIN || 4
    const TIMEOUT = process.env.RELAY_TIMEOUT || 500
    const relay = new Gpio(RELAY_PIN, 'high');

    console.log(`Opening relay`)
    relay.write(1)
    setTimeout(() => {
      console.log(`Closing relay`)
      relay.write(0)
      setTimeout(() => {
        relay.unexport()
      }, TIMEOUT)
    }, TIMEOUT)

    return res.json({ "Status": "Ok", "Message": "Door triggered" })
  },

  sensorStatus: async (req, res, next) => {
    const SENSOR_PIN = process.env.SENSOR_GPIO_PIN || 15
    const sensor = new Gpio(SENSOR_PIN, 'in', 'both');
    var doorStatus

    await sensor.read()
      .then((value) => { 
        var doorStatus = value ? "Lukket" : "Åpen"
      })

      return res.json({ "Status": "Ok", "Message": doorStatus })
  }
}