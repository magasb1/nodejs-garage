require('dotenv').config
const Gpio = require('onoff').Gpio

const activateRelay = () => {
    const relay = new Gpio(process.env.RELAY_GIPO_PIN, 'out');
    relay.read()
      .then(() => console.log(`ON`) & relay.write(process.env.RELAY_ON))
      .then(() => setTimeout(() => { 
          console.log(`OFF`)
          relay.write(process.env.RELAY_OFF) 
          setTimeout(() => {
            relay.unexport()
          }, process.env.RELAY_TIMEOUT)
        }, process.env.RELAY_TIMEOUT ))
      .catch( err => console.log(err))
};

module.exports = activateRelay;