const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

/* const relay = new Gpio(process.env.RELAY_GPIO_PIN, 'high');
console.log(`Opening relay`)
relay.writeSync(1)
setTimeout(() => {
    console.log(`Closing relay`)
    relay.writeSync(0)
    setTimeout(() => {
        relay.unexport()
    }, 500)
}, 4500)
 */


/**
 * Reed switch wiring
 * https://raspberrypi.stackexchange.com/a/34948
 */

 sensorStatus: async () => {
    const SENSOR_PIN = process.env.SENSOR_GPIO_PIN || 15
    const sensor = new Gpio(SENSOR_PIN, 'in', 'both');
    await sensor.read().then((value) => { return value })
)

sensorStatus()




