const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const relay = new Gpio(process.env.RELAY_GPIO_PIN, 'high');
console.log(`Opening relay`)
relay.writeSync(process.env.RELAY_ON)
setTimeout(() => {
    console.log(`Closing relay`)
    relay.writeSync(process.env.RELAY_OFF)
    setTimeout(() => {
        relay.unexport()
    }, process.env.RELAY_TIMEOUT)
}, process.env.RELAY_TIMEOUT)







