const path = require('path')
const Gpio = require('onoff').Gpio
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const relay = new Gpio(process.env.RELAY_GIPO_PIN, 'high');
relay.read()
    .then(() => {
        console.log(`ON (${process.env.RELAY_ON})`)
        relay.writeSync(process.env.RELAY_ON)
    })
    .then(() => {
        setTimeout(() => {
            console.log(`OFF (${process.env.RELAY_OFF})`)
            relay.writeSync(process.env.RELAY_OFF)
        }, process.env.RELAY_TIMEOUT)
    })
    .then(() => {
        setTimeout(() => {
            console.log(`UNEXPORT`)
            relay.unexport();
        }, process.env.RELAY_TIMEOUT)
    })
    .then(() => {
        return false; //res.json({"Status": "Ok", "Message": "Door triggered"})
    })
    .catch(err => console.log(err))








