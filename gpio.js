const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const relay = new Gpio(process.env.RELAY_GPIO_PIN, 'high');
relay.writeSync(process.env.RELAY_ON)
setTimeout(() => {
    relay.writeSync(process.env.RELAY_OFF)
}, process.env.RELAY_TIMEOUT)








