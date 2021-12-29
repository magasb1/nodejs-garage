require('dotenv').config
const Gpio = require('onoff').Gpio

const activateRelay = () => {
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
    .catch(err => console.log(err))


  process.on('SIGINT', () => {
    relay.unexport();
  })
};

module.exports = activateRelay;