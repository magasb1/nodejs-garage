require('dotenv').config
const Gpio = require('onoff').Gpio

const activateRelay = () => {
    const relay = new Gpio(process.env.RELAY_GIPO_PIN, 'out');
    relay.read()
      .then(() => relay.write(process.env.RELAY_ON))
      .then(() => setTimeout(() => { 
          relay.write(process.env.RELAY_OFF) 
          setTimeout(() => {
            relay.unexport()
          }, process.env.RELAY_TIMEOUT)
        }, process.env.RELAY_TIMEOUT ))
      .catch( err => console.log(err))
};

module.exports = activateRelay;