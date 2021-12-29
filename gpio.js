const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const relay = new Gpio(process.env.RELAY_GPIO_PIN, 'high');
console.log(`Opening relay`)
relay.writeSync(1)
setTimeout(() => {
    console.log(`Closing relay`)
    relay.writeSync(0)
    setTimeout(() => {
        relay.unexport()
    }, process.env.RELAY_TIMEOUT)
}, process.env.RELAY_TIMEOUT)







