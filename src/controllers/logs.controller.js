const path = require('path')
const fs = require('fs')


exports.systemLogs = (req, res, next) => {
    fs.readFile(path.join(__dirname, `../../config/logs/app.log.${new Date().toISOString().split('T')[0]}`), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        res.status(200).send(data)
    })
};